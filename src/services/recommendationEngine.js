// src/services/recommendationEngine.js

// --- Bagian 1: Text Preprocessing ---

/**
 * Menyediakan daftar kata umum (stop words) dalam Bahasa Indonesia.
 * @returns {Set<string>} - Satu set kata-kata umum.
 */
const getStopWords = () => {
  // VERSI LENGKAP DAN BENAR
  return new Set([
    'ada', 'adalah', 'adanya', 'adapun', 'agak', 'agaknya', 'agar', 'akan', 'akankah', 'akhir', 'akhiri', 'akhirnya',
    'aku', 'akulah', 'amat', 'amatlah', 'anda', 'andalah', 'antar', 'antara', 'antaranya', 'apa', 'apaan', 'apabila',
    'apakah', 'apalagi', 'apatah', 'artinya', 'asal', 'asalkan', 'atas', 'atau', 'ataukah', 'ataupun', 'awal', 'awalnya',
    'bagai', 'bagaikan', 'bagaimana', 'bagaimanakah', 'bagaimanapun', 'bagi', 'bagian', 'bahkan', 'bahwa', 'bahwasanya',
    'baik', 'bakal', 'bakalan', 'balik', 'banyak', 'bapak', 'baru', 'bawah', 'beberapa', 'begini', 'beginian', 'beginikah',
    'beginilah', 'begitu', 'begitukah', 'begitulah', 'begitupun', 'bekerja', 'belakang', 'belakangan', 'belum', 'belumlah',
    'benar', 'benarkah', 'benarlah', 'berada', 'berakhir', 'berakhirlah', 'berakhirnya', 'berapa', 'berapakah', 'berapalah',
    'berapapun', 'berarti', 'berawal', 'berbagai', 'berdatangan', 'beri', 'berikan', 'berikut', 'berikutnya', 'berjumlah',
    'berkali-kali', 'berkata', 'berkehendak', 'berkeinginan', 'berkenaan', 'berlainan', 'berlalu', 'berlangsung', 'berlebihan',
    'bermacam', 'bermacam-macam', 'bermaksud', 'bermula', 'bersama', 'bersama-sama', 'bersiap', 'bersiap-siap', 'bertanya',
    'bertanya-tanya', 'berturut', 'berturut-turut', 'bertutur', 'berujar', 'berupa', 'besar', 'betul', 'betulkah', 'biasa',
    'biasanya', 'bila', 'bilakah', 'bisa', 'bisakah', 'boleh', 'bolehkah', 'bolehlah', 'buat', 'bukan', 'bukankah', 'bukanlah',
    'bukunya', 'bulan', 'bung', 'cara', 'caranya', 'cukup', 'cukupkah', 'cukuplah', 'cuma', 'dahulu', 'dalam', 'dan', 'dapat',
    'dari', 'daripada', 'datang', 'dekat', 'demi', 'demikian', 'demikianlah', 'dengan', 'depan', 'di', 'dia', 'diakhiri',
    'diakhirinya', 'dialah', 'diantara', 'diantaranya', 'diberi', 'diberikan', 'diberikannya', 'dibuat', 'dibuatnya', 'didapat',
    'didatangkan', 'digunakan', 'diibaratkan', 'diibaratkannya', 'diingat', 'diingatkan', 'diinginkan', 'dijawab', 'dijelaskan',
    'dijelaskannya', 'dikarenakan', 'dikatakan', 'dikatakannya', 'dikerjakan', 'diketahui', 'diketahuinya', 'dikiranya', 'dilakukan',
    'dilalui', 'dilihat', 'dimaksud', 'dimaksudkan', 'dimaksudkannya', 'dimaksudnya', 'diminta', 'dimintai', 'dimisalkan',
    'dimulai', 'dimulailah', 'dimulainya', 'dimungkinkan', 'dini', 'dipastikan', 'diperbuat', 'diperbuatnya', 'dipergunakan',
    'diperkirakan', 'diperlihatkan', 'diperlukan', 'diperlukannya', 'dipersoalkan', 'dipertanyakan', 'dipunyai', 'diri', 'dirinya',
    'disampaikan', 'disebut', 'disebutkan', 'disebutkannya', 'disini', 'disinilah', 'ditambahkan', 'ditambahkannya', 'ditanya',
    'ditanyai', 'ditanyakan', 'ditegaskan', 'diterima', 'ditujukan', 'ditunjuk', 'ditunjuki', 'ditunjukkan', 'ditunjukkannya',
    'dituturkan', 'dituturkannya', 'diucapkan', 'diucapkannya', 'diungkapkan', 'dong', 'dua', 'dulu', 'empat', 'enggak', 'enggaknya',
    'entah', 'entahlah', 'guna', 'gunakan', 'hal', 'hampir', 'hanya', 'hanyalah', 'hari', 'harus', 'haruslah', 'harusnya', 'hendak',
    'hendaklah', 'hendaknya', 'hingga', 'ia', 'ialah', 'ibarat', 'ibaratnya', 'ibu', 'ikut', 'ingat', 'ingat-ingat', 'ingin',
    'inginkah', 'inginkan', 'ini', 'inikah', 'inilah', 'itu', 'itukah', 'itulah', 'jadi', 'jadilah', 'jadinya', 'jangan', 'janganlah',
    'jauh', 'jawab', 'jawaban', 'jawabnya', 'jelas', 'jelaskan', 'jelaslah', 'jelasnya', 'jika', 'jikalau', 'juga', 'jumlah',
    'jumlahnya', 'justru', 'kala', 'kalau', 'kalaulah', 'kalaupun', 'kali', 'kalian', 'kami', 'kamilah', 'kamu', 'kamulah', 'kan',
    'kapan', 'kapankah', 'kapanpun', 'karena', 'karenanya', 'kasus', 'kata', 'katakan', 'katakanlah', 'katanya', 'ke', 'keadaan',
    'kebetulan', 'kecil', 'kedua', 'keduanya', 'keinginan', 'kelamaan', 'kelihatan', 'kelihatannya', 'kelima', 'keluar', 'kembali',
    'kemudian', 'kemungkinan', 'kemungkinannya', 'kena', 'kenapa', 'kepada', 'kepadanya', 'kerja', 'kesampaian', 'keseluruhan',
    'keseluruhannya', 'keterlaluan', 'ketika', 'khususnya', 'kini', 'kinilah', 'kira', 'kira-kira', 'kiranya', 'kita', 'kitalah',
    'kok', 'lagi', 'lagian', 'lah', 'lain', 'lainnya', 'lalu', 'lama', 'lamanya', 'lanjut', 'lanjutnya', 'lebih', 'lewat', 'lima',
    'luar', 'macam', 'maka', 'makanya', 'makin', 'malah', 'malahan', 'mampu', 'mampukah', 'mana', 'manakala', 'manalagi', 'masa',
    'masalah', 'masalahnya', 'masih', 'masihkah', 'masing', 'masing-masing', 'mau', 'maupun', 'melainkan', 'melakukan', 'melalui',
    'melihat', 'melihatnya', 'memang', 'memastikan', 'memberi', 'memberikan', 'membuat', 'memerlukan', 'memihak', 'meminta',
    'memintakan', 'memisalkan', 'memperbuat', 'mempergunakan', 'memperkirakan', 'memperlihatkan', 'mempersiapkan', 'mempersoalkan',
    'mempertanyakan', 'mempunyai', 'memulai', 'menambahkan', 'menandaskan', 'menanti', 'menanti-nanti', 'menantikan', 'menanya',
    'menanyai', 'menanyakan', 'mendapat', 'mendapatkan', 'mendatang', 'mendatangi', 'mendatangkan', 'menegaskan', 'mengakhiri',
    'mengapa', 'mengatakan', 'mengatakannya', 'mengenai', 'mengerjakan', 'mengetahui', 'menggunakan', 'menghendaki', 'mengibaratkan',
    'mengibaratkannya', 'mengingat', 'mengingatkan', 'menginginkan', 'mengira', 'mengucapkan', 'mengucapkannya', 'mengungkapkan',
    'menjadi', 'menjawab', 'menjelaskan', 'menuju', 'menunjuk', 'menunjuki', 'menunjukkan', 'menunjuknya', 'menurut', 'menuturkan',
    'menuturkannya', 'menyampaikan', 'menyebutkan', 'menyeluruh', 'menyiapkan', 'merasa', 'mereka', 'merekalah', 'merupakan',
    'meski', 'meskipun', 'meyakini', 'meyakinkan', 'minta', 'mirip', 'misal', 'misalkan', 'misalnya', 'mula', 'mulai', 'mulailah',
    'mulanya', 'mungkin', 'mungkinkah', 'nah', 'naik', 'namun', 'nanti', 'nantinya', 'nyaris', 'nyatanya', 'oleh', 'olehnya', 'pada',
    'padahal', 'padanya', 'pak', 'paling', 'panjang', 'pantas', 'para', 'pasti', 'pastilah', 'penting', 'pentingnya', 'per',
    'percuma', 'perlu', 'perlukah', 'perlunya', 'pernah', 'persoalan', 'pertama', 'pertama-tama', 'pertanyaan', 'pertanyakan', 'pihak',
    'pihaknya', 'pukul', 'pula', 'pun', 'punya', 'rasa', 'rasanya', 'rata', 'rupanya', 'saat', 'saatnya', 'saja', 'sajalah', 'saling',
    'sama', 'sama-sama', 'sambil', 'sampai', 'sampai-sampai', 'sampaikan', 'sana', 'sangat', 'sangatlah', 'sangkut', 'satu', 'saya',
    'sayalah', 'se', 'sebab', 'sebabnya', 'sebagai', 'sebagaimana', 'sebagainya', 'sebagian', 'sebaik', 'sebaik-baiknya', 'sebaiknya',
    'sebaliknya', 'sebanyak', 'sebelum', 'sebelumnya', 'sebenarnya', 'seberapa', 'sebesar', 'sebetulnya', 'sebisanya', 'sebuah', 'sebut',
    'sebutlah', 'sebutnya', 'secara', 'secukupnya', 'sedang', 'sedangkan', 'sedemikian', 'sedikit', 'sedikitnya', 'seenaknya', 'segala',
    'segalanya', 'segera', 'seharusnya', 'sehingga', 'seingat', 'sejak', 'sejauh', 'sejenak', 'sejumlah', 'sekadar', 'sekadarnya', 'sekali',
    'sekali-kali', 'sekalian', 'sekaligus', 'sekalipun', 'sekarang', 'sekaranglah', 'sekecil', 'seketika', 'sekiranya', 'sekitar',
    'sekitarnya', 'sekurang-kurangnya', 'sekurangnya', 'sela', 'selain', 'selaku', 'selalu', 'selama', 'selama-lamanya', 'selamanya',
    'selanjutnya', 'seluruh', 'seluruhnya', 'semacam', 'semakin', 'semakinlah', 'semata', 'semata-mata', 'semaunya', 'sementara',
    'semisal', 'semisalnya', 'sempat', 'semua', 'semuanya', 'semula', 'sendiri', 'sendirian', 'sendirinya', 'seoalah-olah', 'seorang',
    'sepanjang', 'sepantasnya', 'sepantasnyalah', 'seperlunya', 'seperti', 'sepertinya', 'sepihak', 'sering', 'seringnya', 'serta',
    'serupa', 'sesaat', 'sesampai', 'sesegera', 'sesekali', 'seseorang', 'sesuatu', 'sesuatunya', 'sesudah', 'sesudahnya', 'setelah',
    'setempat', 'setengah', 'seterusnya', 'setiap', 'setiba', 'setibanya', 'setidak-tidaknya', 'setidaknya', 'setinggi', 'seusai',
    'sewaktu', 'siap', 'siapa', 'siapakah', 'siapapun', 'sini', 'sinilah', 'suatu', 'sudah', 'sudahkah', 'sudahlah', 'supaya',
    'tadi', 'tadinya', 'tahu', 'tahun', 'tak', 'tama', 'tambah', 'tambahnya', 'tampak', 'tampaknya', 'tandas', 'tandasnya', 'tanpa',
    'tanya', 'tanyakan', 'tanyanya', 'tapi', 'tegas', 'tegasnya', 'telah', 'tempat', 'tengah', 'tentang', 'tentu', 'tentulah', 'tentunya',
    'tepat', 'terakhir', 'terang', 'terbanyak', 'terbilang', 'terbuat', 'terdiri', 'terhadap', 'terhadapnya', 'teringat', 'teringat-ingat',
    'terjadi', 'terjadilah', 'terjadinya', 'terkira', 'terlalu', 'terlebih', 'terlihat', 'termasuk', 'ternyata', 'tersampaikan', 'tersebut',
    'tersebutlah', 'tertentu', 'tertuju', 'terus', 'terutama', 'tetap', 'tetapi', 'tiap', 'tiba', 'tiba-tiba', 'tidak', 'tidaklah',
    'tidakkah', 'tiga', 'tinggi', 'toh', 'tunjuk', 'turut', 'tutur', 'tuturnya', 'ucap', 'ucapnya', 'ujar', 'ujarnya', 'umum', 'umumnya',
    'ungkap', 'ungkapnya', 'untuk', 'usah', 'usai', 'wah', 'wahai', 'waktu', 'waktunya', 'walau', 'walaupun', 'while', 'ya', 'yaitu',
    'yakin', 'yakni', 'yang'
  ]);
};

const preprocess = (text) => {
  if (!text) return [];
  const stopWords = getStopWords();
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(token => token && !stopWords.has(token));
};

// --- Implementasi Algoritma Hibrida v7.0 ---

export const searchAndRecommend = (query, books) => {
  // 1. Preprocess query dari pengguna
  const queryTokens = new Set(preprocess(query));

  if (queryTokens.size === 0) {
    return { query, sortedBooks: [] };
  }

  const recommendations = [];
  const currentYear = new Date().getFullYear();
  const baseYear = 2010; // Tahun dasar untuk perhitungan bonus

  // 2. Iterasi ke setiap buku untuk menghitung skor
  for (const book of books) {
    let score = 0;
    const matchedIn = {
      title: new Set(),
      keywords: new Set(),
      synopsis: new Set(),
      author: new Set(), // Baru
      publisher: new Set() // Baru
    };

    const bookTitleTokens = preprocess(book.judul);
    const bookSynopsisTokens = preprocess(book.sinopsis);
    const bookAuthorTokens = preprocess(book.penulis);
    const bookPublisherTokens = preprocess(book.penerbit);

    // 3. Iterasi setiap kata kunci dari query untuk pembobotan konten
    for (const token of queryTokens) {
      // Bobot +3.0 jika ditemukan di judul
      if (bookTitleTokens.includes(token)) {
        score += 3.0;
        matchedIn.title.add(token);
      }
      
      // Bobot +2.0 jika ditemukan di array keywords
      if (book.keywords && book.keywords.includes(token)) {
        score += 2.0;
        matchedIn.keywords.add(token);
      }

      // Bobot +1.0 untuk setiap kemunculan di sinopsis
      const synopsisOccurrences = bookSynopsisTokens.filter(word => word === token).length;
      if (synopsisOccurrences > 0) {
        score += (synopsisOccurrences * 1.0);
        matchedIn.synopsis.add(token);
      }

      // --- v7.0: Tambahan Bobot Penulis & Penerbit ---
      // Bobot +2.5 jika ditemukan di nama penulis
      if (bookAuthorTokens.includes(token)) {
        score += 2.5;
        matchedIn.author.add(token);
      }

      // Bobot +1.5 jika ditemukan di nama penerbit
      if (bookPublisherTokens.includes(token)) {
        score += 1.5;
        matchedIn.publisher.add(token);
      }
    }

    // --- v7.0: Tambahan Bobot Tahun Terbit ---
    if (book.tahunTerbit && book.tahunTerbit >= baseYear) {
      const yearBonus = (book.tahunTerbit - baseYear) / (currentYear - baseYear);
      score += yearBonus; // Bonus maksimal +1.0 untuk buku tahun ini
    }

    // 4. Hanya masukkan buku yang memiliki skor ke dalam hasil
    if (score > 0) {
      recommendations.push({ 
        ...book, 
        score,
        reportTerms: { // Diperbarui untuk laporan yang lebih kaya
            title: Array.from(matchedIn.title),
            keywords: Array.from(matchedIn.keywords),
            synopsis: Array.from(matchedIn.synopsis),
            author: Array.from(matchedIn.author),
            publisher: Array.from(matchedIn.publisher),
        }
      });
    }
  }

  // 5. Urutkan buku berdasarkan skor tertinggi
  const sortedBooks = recommendations.sort((a, b) => b.score - a.score);

  return {
    query: query,
    sortedBooks: sortedBooks,
  };
};