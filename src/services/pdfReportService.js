import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoFromFile from '../assets/smp257.png';

export const generatePdfReport = (searchResult) => {
  if (!searchResult || !searchResult.sortedBooks) {
    alert("Data untuk laporan tidak valid.");
    return;
  }

  const { query, sortedBooks: rawBooks } = searchResult;
  
  // PERBAIKAN UTAMA 1: Ubah filter untuk mencocokkan struktur data "datar"
  const sortedBooks = rawBooks.filter(item => item && item.scoreDetails && item.reportTerms);

  if (sortedBooks.length === 0) {
    alert("Tidak ada data valid yang cukup untuk dibuat laporan analisis.");
    return;
  }

  const doc = new jsPDF();
  const totalPagesExp = '{total_pages_count_string}';
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const safeText = (text, fallback = 'N/A') => text || fallback;

  const schoolData = {
    name: 'SMPN 257 JAKARTA TIMUR',
    address: 'Jalan Kel. Rambutan No.50, RT.4/RW.3, Rambutan, Ciracas',
    phone: 'Telp: (021) 8404160',
    email: 'Email: smpn257jkt@gmail.com',
    website: 'Website: https://smpn257jkt.sch.id/'
  };

  const addHeader = () => {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, 45, 'F');

    const logoBase64 = logoFromFile;
    const logoWidth = 25;
    const logoHeight = 25;
    const logoX = 20;
    const logoY = 8;

    doc.addImage(logoBase64, 'WEBP', logoX, logoY, logoWidth, logoHeight);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(schoolData.name, pageWidth / 2, 15, { align: 'center' });
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(schoolData.address, pageWidth / 2, 22, { align: 'center' });
    doc.setFontSize(9);
    doc.text(`${schoolData.phone} | ${schoolData.email}`, pageWidth / 2, 28, { align: 'center' });
    doc.text(schoolData.website, pageWidth / 2, 33, { align: 'center' });
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(20, 38, pageWidth - 20, 38);
    doc.setLineWidth(0.5);
    doc.line(20, 40, pageWidth - 20, 40);
    return 45;
  };

  // Updated footer function dengan parameter isLastPage
  const addFooter = (isLastPage = false) => {
    // Tambahkan disclaimer HANYA di halaman terakhir
    if (isLastPage) {
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100); // Warna abu-abu untuk disclaimer
      doc.text('Laporan ini dibuat secara otomatis oleh sistem dan diverifikasi oleh Pustakawan.', pageWidth / 2, pageHeight - 20, { align: 'center' });
    }
    
    // Timestamp di kiri bawah dengan format yang tepat
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Format waktu dengan detik menggunakan titik sebagai separator (HH.MM.SS)
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const time = `${hours}.${minutes}.${seconds}`;
    
    // Set font dan warna untuk footer timestamp dan halaman
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    // Text kiri: "Dicetak pada: [tanggal] pukul [waktu]"
    doc.text(`Dicetak pada: ${timestamp} pukul ${time}`, 20, pageHeight - 10);
    
    // Text kanan: "Halaman X dari Y"
    const pageInfo = `Halaman ${doc.internal.getCurrentPageInfo().pageNumber} dari ${totalPagesExp}`;
    doc.text(pageInfo, pageWidth - 10, pageHeight - 10, { align: 'right' });
  };
  
  const checkAndAddPage = (currentY, requiredSpace) => {
    if (currentY + requiredSpace > pageHeight - 40) {
      doc.addPage();
      return addHeader();
    }
    return currentY;
  };

  let currentY = addHeader();

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('LAPORAN ANALISIS REKOMENDASI BUKU', pageWidth / 2, currentY + 10, { align: 'center' });
  doc.text('PERPUSTAKAAN DIGITAL', pageWidth / 2, currentY + 17, { align: 'center' });
  doc.setLineWidth(0.5);
  doc.line(20, currentY + 20, pageWidth - 20, currentY + 20);
  currentY += 30;
  
  doc.setFontSize(12);
  doc.setTextColor(44, 62, 80);
  doc.text(`Analisis Pencarian: "${query}"`, 20, currentY);
  currentY += 15;
  
  const totalBooks = sortedBooks.length;
  const avgScore = totalBooks > 0 ? sortedBooks.reduce((sum, item) => sum + item.score, 0) / totalBooks : 0;
  const maxScore = totalBooks > 0 ? sortedBooks.reduce((max, item) => Math.max(max, item.score), 0) : 0;
  const minScore = totalBooks > 0 ? sortedBooks.reduce((min, item) => Math.min(min, item.score), sortedBooks[0].score) : 0;
  const searchStats = sortedBooks.reduce((acc, item) => { // Menggunakan item langsung
    if (item.kategori) acc.categoriesFound.add(item.kategori);
    if (item.reportTerms?.title) acc.titleMatches++;
    if (item.reportTerms?.synopsis) acc.synopsisMatches++;
    return acc;
  }, { categoriesFound: new Set(), titleMatches: 0, synopsisMatches: 0 });

  autoTable(doc, {
    head: [["Metrik", "Nilai", "Keterangan"]],
    body: [
        ["Total Buku Ditemukan", totalBooks.toString(), "Jumlah buku yang relevan"],
        ["Skor Rata-rata", avgScore.toFixed(3), "Rata-rata tingkat kesesuaian"],
        ["Skor Tertinggi", maxScore.toFixed(3), "Buku dengan kesesuaian tertinggi"],
        ["Skor Terendah", minScore.toFixed(3), "Buku dengan kesesuaian terendah"],
        ["Kategori Ditemukan", searchStats.categoriesFound.size.toString(), "Variasi kategori buku yang relevan"],
    ],
    startY: currentY,
    theme: 'grid',
    didDrawPage: addFooter
  });
  currentY = doc.lastAutoTable.finalY + 10;
  
  autoTable(doc, {
    head: [["Rank", "Judul Buku", "Penulis", "Kategori", "Skor"]],
    // PERBAIKAN UTAMA 2: Akses properti langsung dari 'item'
    body: sortedBooks.slice(0, 10).map((item, index) => [
        index + 1,
        safeText(item.judul, 'Tanpa Judul'),
        safeText(item.penulis, 'Tanpa Penulis'),
        safeText(item.kategori, 'Tanpa Kategori'),
        item.score.toFixed(3)
    ]),
    startY: currentY,
    theme: 'striped',
    didDrawPage: addFooter
  });

  currentY = doc.lastAutoTable.finalY + 25;

  currentY = checkAndAddPage(currentY, 100);

  doc.setFont(undefined, 'bold');
  doc.setFontSize(12).setTextColor(44, 62, 80).text('DETAIL ANALISIS SKOR (TOP 5)', 20, currentY);

  doc.setFont(undefined, 'normal');

  currentY += 10;

  sortedBooks.slice(0, 5).forEach((item, index) => {
    currentY = checkAndAddPage(currentY, 80);
    // PERBAIKAN UTAMA 3: Destructuring langsung dari 'item'
    const { reportTerms, scoreDetails } = item;
    const tableBody = [];
    
    const safeJoin = (terms) => (terms || []).join(', ') || 'N/A';

    if (scoreDetails.title) tableBody.push(['Judul Buku', safeJoin(reportTerms.title), 'Bobot Manual', scoreDetails.title.toFixed(3)]);
    if (scoreDetails.author) tableBody.push(['Nama Penulis', safeJoin(reportTerms.author), 'Bobot Manual', scoreDetails.author.toFixed(3)]);
    if (scoreDetails.publisher) tableBody.push(['Penerbit', safeJoin(reportTerms.publisher), 'Bobot Manual', scoreDetails.publisher.toFixed(3)]);
    if (scoreDetails.synopsis) tableBody.push(['Sinopsis', safeJoin(reportTerms.synopsis), 'Skor TF-IDF', scoreDetails.synopsis.toFixed(3)]);
    if (scoreDetails.keywords) tableBody.push(['Keywords', safeJoin(reportTerms.keywords), 'Skor TF-IDF', scoreDetails.keywords.toFixed(3)]);
    if (scoreDetails.yearBonus) tableBody.push(['Bonus Tahun Terbit', `Tahun ${safeText(item.tahunTerbit)}`, 'Bonus Skor', scoreDetails.yearBonus.toFixed(3)]);
    
    autoTable(doc, {
      head: [[{ 
        content: `Analisis #${index + 1}: ${safeText(item.judul, 'Tanpa Judul')} (Total: ${item.score.toFixed(3)})`, 
        colSpan: 4, 
        styles: { halign: 'center', fillColor: [44, 62, 80] } 
      }]],
      body: [
        [{ content: 'Komponen', styles: { fontStyle: 'bold' } }, { content: 'Kata Ditemukan', styles: { fontStyle: 'bold' } }, { content: 'Perhitungan', styles: { fontStyle: 'bold' } }, { content: 'Skor Komponen', styles: { fontStyle: 'bold' } }],
        ...tableBody
      ],
      startY: currentY,
      theme: 'grid',
      didDrawPage: addFooter
    });
    currentY = doc.lastAutoTable.finalY + 10;
  });

  // KESIMPULAN DAN REKOMENDASI
  currentY = doc.lastAutoTable.finalY || currentY;
  currentY = checkAndAddPage(currentY, 150);
  currentY += 15;
  
  doc.setFontSize(12).setTextColor(44, 62, 80).text('KESIMPULAN DAN REKOMENDASI', 20, currentY);
  currentY += 5;
  doc.setLineWidth(0.5).line(20, currentY, pageWidth - 20, currentY);
  currentY += 10;
  
  const conclusions = [
    `Pencarian dengan kata kunci "${query}" menghasilkan ${totalBooks} buku yang relevan.`,
    `Rata-rata skor kesesuaian adalah ${avgScore.toFixed(3)}, menunjukkan tingkat relevansi yang ${avgScore > 0.5 ? 'tinggi' : 'sedang'}.`,
    `Ditemukan ${searchStats.categoriesFound.size} kategori berbeda, menunjukkan variasi topik yang ${searchStats.categoriesFound.size > 3 ? 'luas' : 'terbatas'}.`,
  ];
  
  doc.setFont('Helvetica', 'bold').setFontSize(10).text('Kesimpulan:', 20, currentY);
  currentY += 7;
  doc.setFont('Helvetica', 'normal');
  conclusions.forEach(conclusion => {
    doc.text(`- ${conclusion}`, 25, currentY);
    currentY += 7;
  });

  currentY += 5;
  
  const recommendations = [
    avgScore < 0.3 ? 'Pertimbangkan untuk memperluas kriteria pencarian atau menggunakan sinonim.' : 'Hasil pencarian cukup baik untuk dijadikan dasar rekomendasi.',
    searchStats.categoriesFound.size < 3 ? 'Koleksi dapat diperkaya dengan buku dari kategori yang lebih beragam.' : 'Variasi kategori koleksi sudah memadai.',
    'Prioritaskan pengadaan atau promosi buku dengan skor tertinggi.'
  ];
  
  doc.setFont('Helvetica', 'bold').setFontSize(10).text('Rekomendasi Tindak Lanjut:', 20, currentY);
  currentY += 7;
  doc.setFont('Helvetica', 'normal');
  recommendations.forEach(rec => {
    doc.text(`- ${rec}`, 25, currentY);
    currentY += 7;
  });
  
  currentY = checkAndAddPage(currentY, 80);
  
  // Single signature using table trick (empty left column, content in right)
  const currentDate = new Date();
  const approvalDate = currentDate.toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  
  // Add space before signature
  currentY += 20;
  
  autoTable(doc, {
    body: [
      ['', `Jakarta, ${approvalDate}`],
      ['', 'Penanggung Jawab Perpustakaan,'],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', 'PURYANTI, S.Pd.'],
      ['', 'NIP. 196901102022212002']
    ],
    startY: currentY,
    theme: 'plain',
    styles: { 
      fontSize: 10,
      cellPadding: 2
    },
    columnStyles: {
      0: { cellWidth: 100 }, // Left column (empty)
      1: { halign: 'center', cellWidth: 70 } // Right column (signature)
    },
    didDrawPage: addFooter // Footer untuk halaman-halaman sebelumnya
  });

  // Panggil footer untuk halaman terakhir dengan disclaimer
  addFooter(true);

  // Replace placeholder dengan jumlah halaman sebenarnya
  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPagesExp);
  }

  const fileName = `Laporan_Rekomendasi_${query.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};