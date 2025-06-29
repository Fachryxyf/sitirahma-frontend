// src/services/pdfReportService.js

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdfReport = (searchResult) => {
  if (!searchResult || !searchResult.sortedBooks || searchResult.sortedBooks.length === 0) {
    alert("Tidak ada data untuk dibuat laporan.");
    return;
  }

  const doc = new jsPDF();
  const { query, sortedBooks } = searchResult;
  const totalPagesExp = '{total_pages_count_string}';
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- Fungsi untuk Header & Footer ---
  const pageHeader = (data) => {
    // PERUBAHAN: Logo dihapus total

    // PERBAIKAN: Posisi teks diubah menjadi rata tengah untuk tampilan kop surat
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(44, 62, 80); // #2c3e50
    doc.text('Perpustakaan Digital SMPN 257 Jakarta Timur', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Laporan Analisis Rekomendasi Buku', pageWidth / 2, 27, { align: 'center' });
    
    // Garis Pemisah
    doc.setDrawColor(52, 73, 94); // #34495e
    doc.setLineWidth(0.5);
    doc.line(data.settings.margin.left, 35, pageWidth - data.settings.margin.right, 35);
  };
  
  const pageFooter = (data) => {
    let str = "Halaman " + data.pageNumber;
    if (typeof doc.putTotalPages === 'function') {
      str = str + " dari " + totalPagesExp;
    }
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(str, data.settings.margin.left, pageHeight - 10);
  };

  // --- Tabel 1: Ringkasan Hasil Rekomendasi (TOP 10) ---
  const summaryHead = [["Peringkat", "Judul Buku", "Penulis", "Skor Relevansi"]];
  const summaryBody = sortedBooks.slice(0, 10).map((book, index) => [
    index + 1,
    book.judul,
    book.penulis,
    book.score.toFixed(2)
  ]);

  autoTable(doc, {
    head: summaryHead,
    body: summaryBody,
    theme: 'grid',
    styles: { font: 'Helvetica', cellPadding: 3, fontSize: 10 },
    headStyles: {
      fillColor: [52, 73, 94],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    columnStyles: {
      0: { halign: 'center', cellWidth: 20 },
      1: { halign: 'left' },
      2: { halign: 'left' },
      3: { halign: 'center', cellWidth: 30 }
    },
    didDrawPage: (data) => {
      pageHeader(data);
      doc.setFontSize(12);
      doc.setTextColor(44, 62, 80);
      doc.text(`Hasil Pencarian untuk Kata Kunci: "${query}"`, data.settings.margin.left, 47);
      pageFooter(data);
    },
    margin: { top: 55 }, // Margin disesuaikan dengan tinggi kop surat baru
  });

  // --- Tabel 2: Detail Laporan Bobot Kata Kunci per Buku ---
  let currentY = doc.lastAutoTable.finalY;

  sortedBooks.slice(0, 5).forEach((book, index) => {
    // Cek jika butuh halaman baru
    if (currentY > pageHeight - 60) {
      doc.addPage();
      currentY = 0;
    }
    
    const detailTitleY = currentY === 0 ? 45 : currentY + 15;
    if (currentY === 0) { // Jika ini halaman baru
        pageHeader({ settings: { margin: { left: 14, right: 14 } } });
    }

    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
    doc.text(`Detail Bobot #${index + 1}: ${book.judul}`, 14, detailTitleY);
    
    const tableBody = [];
    if (book.reportTerms) {
        if(book.reportTerms.title.length > 0) tableBody.push([`Di Judul`, book.reportTerms.title.join(', '), '+3.0 per kata']);
        if(book.reportTerms.author.length > 0) tableBody.push([`Di Penulis`, book.reportTerms.author.join(', '), '+2.5 per kata']);
        if(book.reportTerms.keywords.length > 0) tableBody.push([`Di Keywords`, book.reportTerms.keywords.join(', '), '+2.0 per kata']);
        if(book.reportTerms.synopsis.length > 0) tableBody.push([`Di Sinopsis`, book.reportTerms.synopsis.join(', '), '+1.0 per kemunculan']);
    }
    
    autoTable(doc, {
        startY: detailTitleY + 5,
        head: [[{ content: `Analisis Kecocokan Kata Kunci (Skor Total: ${book.score.toFixed(2)})`, colSpan: 3, styles: { halign: 'center', fillColor: [44, 62, 80] } }]],
        body: [
          [{ content: 'Lokasi', styles: { fontStyle: 'bold' } }, { content: 'Kata Kunci Cocok', styles: { fontStyle: 'bold' } }, { content: 'Bobot Poin', styles: { fontStyle: 'bold' } }],
          ...tableBody
        ],
        theme: 'striped',
        styles: { font: 'Helvetica', cellPadding: 3, fontSize: 10 },
        headStyles: { halign: 'center', fillColor: [127, 140, 141] },
        columnStyles: { 0: { fontStyle: 'bold' }, 2: { halign: 'center' } },
        didDrawPage: (data) => {
            pageFooter(data);
        }
    });
    
    currentY = doc.lastAutoTable.finalY;
  });

  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPagesExp);
  }

  doc.save(`Laporan Rekomendasi - ${query}.pdf`);
};