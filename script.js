// script.js
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const inputPage = document.getElementById('input-page');
    const categoryPage = document.getElementById('category-page');
    const quizPage = document.getElementById('quiz-page');
    const userForm = document.getElementById('user-form');
    const userNameSpan = document.getElementById('user-name');
    const categories = document.querySelectorAll('.category');
    const instagramBtn = document.getElementById('instagram-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const questionContainer = document.getElementById('question-container');
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const resultDiv = document.getElementById('result');
    const scoreEl = document.getElementById('score');
    const backBtn = document.getElementById('back-to-categories');
    const timerEl = document.getElementById('timer');
    const timeLeftEl = document.getElementById('time-left');

    let userData = JSON.parse(localStorage.getItem('userData')) || null;
    let currentCategory = '';
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 600; // 10 minutes in seconds
    let questions = [];

    // Dummy questions (30 per category, but for demo, 3 per category)
    const allQuestions = {
        penalaran: [
            { question: "Jika harga BBM naik, maka ongkos transportasi juga naik. Saat ini, harga BBM sedang naik. Kesimpulan logis yang dapat ditarik adalah?", options: ["ongkos transportasi tidak naik", "Kenaikan harga BBM disebabkan oleh kenaikan ongkos transportasi.", "Ongkos transportasi juga naik", "Harga BBM dan ongkos transportasi tidak naik."], answer: 2 },
            { question: "Semua pegawai kantor X wajib mengenakan kemeja. Sebagian pegawai kantor X menyukai warna biru. Kesimpulan yang paling tepat adalah?", options: ["Sebagian pegawai kantor X wajib mengenakan kemeja dan menyukai warna biru.", "Sebagian pegawai kantor X mengenakan kemeja biru.", "semua yang menyukai warna biru adalah pegawai kantor X", "semua pegawai kantor X harus memakai kemeja"], answer: 0 },
            { question: "Semua bunga mawar berduri. Sebagian tanaman berduri tidak berbau harum. Kesimpulan yang benar adalah...", options: ["Semua tanaman berduri adalah mawar", "Sebagian bunga mawar tidak berbau harum", "Semua bunga berbau harum adalah mawar", "Tidak ada bunga mawar yang tidak berduri"], answer: 3 },

            { question: "Jika semua dokter adalah manusia dan sebagian manusia adalah perokok, maka...", options: ["Semua dokter pasti perokok", "Tidak ada dokter yang perokok", "Sebagian dokter mungkin perokok", "Semua perokok adalah dokter"], answer: 2 },

            { question: "Semua ikan hidup di air. Paus hidup di air. Kesimpulan yang benar adalah...", options: ["Paus adalah ikan", "Semua makhluk air adalah ikan", "Paus bukan ikan", "Tidak dapat disimpulkan"], answer: 3 },

            { question: "Jika hujan turun maka tanah basah. Sekarang tanah tidak basah. Kesimpulan yang logis adalah...", options: ["Hujan tidak turun", "Hujan turun sedikit", "Tanah tidak bisa basah", "Hujan deras"], answer: 0 },

            { question: "Semua siswa pandai matematika suka logika. Andi tidak suka logika. Kesimpulannya...", options: ["Andi tidak pandai matematika", "Andi pandai matematika", "Semua siswa seperti Andi", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Jika harga BBM naik, maka harga barang naik. Sekarang harga barang naik. Kesimpulan yang paling tepat adalah...", options: ["Harga BBM pasti naik", "Harga BBM tidak naik", "Ada faktor lain yang menyebabkan harga naik", "Semua faktor sama saja"], answer: 2 },

            { question: "Semua burung bisa terbang. Kelelawar bisa terbang. Kesimpulannya...", options: ["Kelelawar adalah burung", "Semua hewan terbang adalah burung", "Tidak semua yang bisa terbang adalah burung", "Semua burung adalah kelelawar"], answer: 2 },

            { question: "Jika dia rajin belajar, maka dia lulus. Dia tidak lulus. Kesimpulannya...", options: ["Dia rajin belajar", "Dia tidak rajin belajar", "Dia malas tapi lulus", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Semua kucing suka ikan. Tom adalah kucing. Kesimpulannya...", options: ["Tom suka ikan", "Tom tidak suka ikan", "Tom bukan kucing", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Semua manusia akan mati. Semua raja adalah manusia. Kesimpulannya...", options: ["Semua raja tidak akan mati", "Semua raja akan mati", "Sebagian manusia adalah raja", "Tidak ada manusia yang mati"], answer: 1 },

            { question: "Jika lampu menyala, berarti listrik ada. Sekarang listrik padam. Kesimpulan:", options: ["Lampu menyala", "Lampu padam", "Lampu rusak", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Tidak semua siswa suka pelajaran fisika. Kesimpulan yang benar adalah...", options: ["Semua siswa benci fisika", "Ada siswa yang tidak suka fisika", "Semua siswa suka fisika", "Tidak ada siswa yang suka fisika"], answer: 1 },

            { question: "Semua presiden adalah pemimpin. Semua pemimpin adalah manusia. Kesimpulan yang benar adalah...", options: ["Semua manusia presiden", "Semua manusia pemimpin", "Semua presiden manusia", "Sebagian manusia bukan pemimpin"], answer: 2 },

            { question: "Semua A adalah B. Tidak ada C yang B. Kesimpulan:", options: ["Tidak ada A yang C", "Semua C adalah A", "Sebagian A adalah C", "Semua B adalah C"], answer: 0 },

            { question: "Jika aku makan pedas, aku minum air. Aku minum air. Kesimpulan:", options: ["Aku pasti makan pedas", "Aku tidak makan pedas", "Mungkin aku makan pedas", "Tidak bisa disimpulkan"], answer: 2 },

            { question: "Semua siswa memakai seragam. Budi memakai seragam. Kesimpulan yang logis adalah...", options: ["Budi siswa", "Semua pemakai seragam adalah siswa", "Tidak semua siswa memakai seragam", "Tidak bisa disimpulkan"], answer: 3 },

            { question: "Jika hari ini libur, maka sekolah tutup. Sekolah tidak tutup. Kesimpulan:", options: ["Hari ini bukan libur", "Hari ini libur", "Hari ini hujan", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Semua ilmuwan suka berpikir kritis. Sebagian siswa suka berpikir kritis. Kesimpulan yang benar adalah...", options: ["Semua siswa ilmuwan", "Semua ilmuwan siswa", "Sebagian siswa mungkin ilmuwan", "Tidak ada hubungan"], answer: 2 },

            { question: "Tidak semua orang kaya bahagia. Kesimpulan yang benar adalah...", options: ["Semua orang miskin bahagia", "Ada orang kaya yang tidak bahagia", "Semua orang kaya tidak bahagia", "Tidak ada orang kaya"], answer: 1 },

            { question: "Semua buah mengandung vitamin. Jeruk adalah buah. Kesimpulan:", options: ["Jeruk tidak mengandung vitamin", "Jeruk mengandung vitamin", "Jeruk bukan buah", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Jika motor mogok, maka aku terlambat. Sekarang aku tidak terlambat. Kesimpulan:", options: ["Motor mogok", "Motor tidak mogok", "Motor mogok tapi diperbaiki", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Semua yang jujur dipercaya. Rina dipercaya. Kesimpulan yang tepat:", options: ["Rina jujur", "Rina tidak jujur", "Rina mungkin jujur", "Tidak bisa disimpulkan"], answer: 2 },

            { question: "Semua pohon berakar. Beberapa tanaman berakar. Kesimpulan:", options: ["Semua tanaman adalah pohon", "Semua pohon adalah tanaman", "Tidak semua tanaman pohon", "Semua berakar adalah tanaman"], answer: 2 },

            { question: "Semua seniman kreatif. Tidak semua orang kreatif seniman. Kesimpulan yang benar adalah...", options: ["Semua orang seniman", "Semua seniman tidak kreatif", "Semua seniman kreatif, tapi tidak sebaliknya", "Tidak bisa disimpulkan"], answer: 2 },

            { question: "Jika aku lapar maka aku makan. Aku tidak makan. Kesimpulan:", options: ["Aku lapar", "Aku tidak lapar", "Aku tidur", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Semua hewan mamalia menyusui. Kucing menyusui. Kesimpulan:", options: ["Kucing mamalia", "Semua mamalia kucing", "Semua hewan menyusui", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Jika belajar, maka nilai bagus. Nilai tidak bagus. Kesimpulan:", options: ["Belajar", "Tidak belajar", "Nilai dihapus", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Semua guru adalah pendidik. Sebagian pendidik bukan guru. Kesimpulan yang benar adalah...", options: ["Semua pendidik guru", "Semua guru bukan pendidik", "Ada pendidik yang bukan guru", "Semua guru bukan pendidik"], answer: 2 },
            // ... (repeat to 30, but for brevity, only 3 shown)
        ],
        literasi: [
            { question: "Bacalah kalimat berikut! 'Rapat akan dilaksanakan pada hari Senin mendatang di aula sekolah.' Arti kata 'mendatang' pada kalimat tersebut adalah...", options: ["Sudah lewat", "Akan datang", "Sedang berlangsung", "Baru saja selesai"], answer: 1 },

            { question: "Gagasan utama dari sebuah paragraf biasanya terletak pada...", options: ["Kalimat pertama atau terakhir", "Kalimat penjelas", "Kalimat tanya", "Kalimat tambahan"], answer: 0 },

            { question: "Kalimat yang efektif adalah...", options: ["Para siswa-siswi sedang belajar di kelas.", "Dia pergi ke pasar membeli sayur.", "Budi dan saya sedang belajar kelompok.", "Para murid-murid berkumpul di lapangan."], answer: 2 },

            { question: "Sinonim kata 'cerdas' adalah...", options: ["Lamban", "Pintar", "Bodoh", "Lupa"], answer: 1 },

            { question: "Antonim kata 'optimis' adalah...", options: ["Pesimis", "Antusias", "Gigih", "Percaya diri"], answer: 0 },

            { question: "Perhatikan kalimat berikut! 'Pohon itu tumbuh tinggi sekali.' Makna kata 'tinggi' pada kalimat tersebut adalah...", options: ["Derajat", "Nilai moral", "Ukuran vertikal", "Jabatan"], answer: 2 },

            { question: "Kalimat yang menggunakan ejaan yang benar adalah...", options: ["Ayah membeli buku, pensil, dan penghapus.", "Ayah membeli buku pensil dan, penghapus.", "Ayah membeli, buku, pensil dan penghapus.", "Ayah membeli buku pensil, dan penghapus."], answer: 0 },

            { question: "Kalimat yang tidak efektif adalah...", options: ["Kami akan mengadakan rapat besok pagi.", "Para tamu undangan dimohon kehadirannya.", "Ia memesan makanan melalui aplikasi.", "Para siswa-siswi sedang berolahraga."], answer: 3 },

            { question: "Makna ungkapan 'buah tangan' adalah...", options: ["Buah hasil kebun", "Hadiah dari bepergian", "Tangan yang memegang buah", "Buah yang lezat"], answer: 1 },

            { question: "Kalimat yang menunjukkan makna konotatif adalah...", options: ["Dia bekerja keras demi masa depan.", "Wajahnya bersinar setelah mendapat kabar baik.", "Lampu itu bersinar sangat terang.", "Air sungai mengalir deras sekali."], answer: 1 },

            { question: "Kalimat berikut yang termasuk kalimat majemuk adalah...", options: ["Ani membaca buku.", "Sinta memasak di dapur.", "Rani belajar sedangkan Dika bermain.", "Ibu tidur di kamar."], answer: 2 },

            { question: "Makna kata 'objektif' adalah...", options: ["Sesuai kenyataan", "Berdasarkan perasaan", "Tidak masuk akal", "Bersifat pribadi"], answer: 0 },

            { question: "Kalimat yang mengandung majas personifikasi adalah...", options: ["Matahari tersenyum menyambut pagi.", "Dia berlari secepat kilat.", "Wajahnya pucat seperti kapas.", "Langit gelap menyelimuti malam."], answer: 0 },

            { question: "Kalimat berikut yang termasuk kalimat imperatif adalah...", options: ["Jangan buang sampah sembarangan!", "Kami sedang belajar di kelas.", "Dia membaca buku di taman.", "Hari ini cuaca sangat cerah."], answer: 0 },

            { question: "Kalimat yang mengandung majas hiperbola adalah...", options: ["Suara petir itu membelah langit.", "Hatinya sekeras batu.", "Kakinya panjang sekali.", "Aku menunggumu seribu tahun lamanya."], answer: 3 },

            { question: "Gagasan utama dari paragraf disebut juga dengan...", options: ["Ide pokok", "Kalimat penjelas", "Ringkasan", "Kesimpulan"], answer: 0 },

            { question: "Kalimat berikut yang termasuk kalimat deklaratif adalah...", options: ["Apakah kamu sudah makan?", "Tolong tutup pintunya!", "Hari ini aku akan pergi ke perpustakaan.", "Ayo kita belajar bersama!"], answer: 2 },

            { question: "Kalimat yang menggunakan tanda baca yang salah adalah...", options: ["Hari ini, kami belajar di laboratorium.", "Dia berkata, 'Aku akan datang besok.'", "Selamat ulang tahun, Rina!", "Ibu berkata aku harus belajar."], answer: 3 },

            { question: "Makna kata 'transparan' adalah...", options: ["Tembus pandang", "Sulit dimengerti", "Rahasia", "Berwarna gelap"], answer: 0 },

            { question: "Kalimat berikut yang termasuk kalimat persuasif adalah...", options: ["Buanglah sampah pada tempatnya agar lingkungan bersih!", "Kami belajar setiap hari.", "Dia sedang membaca buku.", "Hari ini matahari bersinar terik."], answer: 0 },

            { question: "Kalimat yang memiliki kesalahan logika adalah...", options: ["Setiap malam aku tidur.", "Budi minum nasi di dapur.", "Kami pergi ke sekolah setiap pagi.", "Ibu memasak sayur di dapur."], answer: 1 },

            { question: "Kalimat 'Dia sedang membaca buku di taman' termasuk kalimat...", options: ["Perintah", "Tanya", "Berita", "Seruan"], answer: 2 },

            { question: "Makna kata 'ekspresif' adalah...", options: ["Tidak menunjukkan emosi", "Menunjukkan perasaan dengan jelas", "Menutup diri dari orang lain", "Suka berdiam diri"], answer: 1 },

            { question: "Kalimat yang mengandung majas metafora adalah...", options: ["Dia bunga desa yang cantik.", "Daun-daun menari tertiup angin.", "Air sungai mengalir deras.", "Langit menangis di sore hari."], answer: 0 },

            { question: "Kalimat berikut yang termasuk kalimat interogatif adalah...", options: ["Apakah kamu sudah menyelesaikan tugasmu?", "Jangan lupa bawa buku!", "Hari ini aku sakit.", "Ayo kita pergi sekarang!"], answer: 0 },

            { question: "Makna kata 'relevan' adalah...", options: ["Tidak berhubungan", "Sesuai atau berkaitan", "Berlebihan", "Samar-samar"], answer: 1 },

            { question: "Kalimat 'Andi lebih tinggi dari Rudi' termasuk kalimat...", options: ["Perbandingan", "Perintah", "Pertanyaan", "Seruan"], answer: 0 },

            { question: "Kalimat yang menggunakan ejaan tidak tepat adalah...", options: ["Saya membeli tiga buah buku.", "Dia tinggal di Jl. Merdeka Raya No. 10.", "Kami pergi ke sekolah setiap hari.", "Dia berkata 'Aku lapar.' tanpa koma."], answer: 3 },

            { question: "Makna kata 'prioritas' adalah...", options: ["Hal yang diutamakan", "Hal yang diabaikan", "Hal yang kecil", "Hal yang tidak penting"], answer: 0 },

            { question: "Kalimat berikut yang termasuk kalimat ajakan adalah...", options: ["Ayo kita belajar bersama di perpustakaan!", "Dia sedang membaca buku.", "Hari ini cuaca sangat cerah.", "Aku sudah mengerjakan PR."], answer: 0 },

            { question: "Kalimat 'Ia berjuang tanpa mengenal lelah demi bangsa' mengandung makna...", options: ["Kesombongan", "Kegigihan", "Kesedihan", "Kemarahan"], answer: 1 }
            // ...
        ],
        logika: [
            { question: "Semua mawar bunga. Semua bunga tanaman. Maka...", options: ["Semua tanaman mawar", "Semua mawar tanaman", "Sebagian tanaman bukan bunga", "Tidak ada hubungan"], answer: 1 },

            { question: "Jika A lebih tinggi dari B, dan B lebih tinggi dari C, maka...", options: ["C paling tinggi", "A paling tinggi", "B paling tinggi", "A paling pendek"], answer: 1 },

            { question: "Jika hari ini Rabu, maka dua hari setelah besok adalah hari...", options: ["Sabtu", "Minggu", "Senin", "Jumat"], answer: 0 },

            { question: "Semua kucing suka susu. Beberapa hewan suka susu. Maka...", options: ["Semua hewan adalah kucing", "Sebagian hewan mungkin kucing", "Tidak ada kucing yang suka susu", "Semua hewan suka susu"], answer: 1 },

            { question: "Urutan yang benar melanjutkan deret: 2, 4, 8, 16, ...", options: ["18", "20", "24", "32"], answer: 3 },

            { question: "Jika 3x = 12, maka nilai x adalah...", options: ["2", "3", "4", "6"], answer: 2 },

            { question: "Sinta lebih muda dari Rina, tetapi lebih tua dari Dita. Siapa yang paling tua?", options: ["Sinta", "Rina", "Dita", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Semua guru memakai seragam. Beberapa pegawai memakai seragam. Maka...", options: ["Semua pegawai guru", "Sebagian pegawai mungkin guru", "Tidak ada guru pegawai", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Deret berikut: 5, 10, 20, 40, ... Angka selanjutnya adalah...", options: ["50", "60", "80", "70"], answer: 2 },

            { question: "Jika 10 orang memakan 10 roti dalam 10 menit, maka 20 orang memakan 20 roti dalam waktu...", options: ["5 menit", "10 menit", "20 menit", "30 menit"], answer: 1 },

            { question: "Semua burung bisa terbang. Ayam adalah burung. Maka...", options: ["Ayam bisa terbang", "Semua yang terbang ayam", "Semua ayam tidak bisa terbang", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Pola huruf: A, C, F, J, O, ... Huruf selanjutnya adalah...", options: ["T", "U", "V", "W"], answer: 0 },

            { question: "Jika 1 = 3, 2 = 6, 3 = 9, maka 5 = ...", options: ["10", "15", "20", "25"], answer: 1 },

            { question: "Semua A adalah B. Semua B adalah C. Maka...", options: ["Semua C adalah A", "Semua A adalah C", "Sebagian C bukan A", "Tidak ada hubungan"], answer: 1 },

            { question: "Jika tidak hujan maka jalan kering. Sekarang jalan basah. Maka...", options: ["Hujan turun", "Tidak hujan", "Mendung", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Pola angka: 2, 6, 12, 20, ... Angka selanjutnya adalah...", options: ["24", "28", "30", "32"], answer: 1 },

            { question: "Jika Budi bukan dokter, maka dia perawat. Budi bukan perawat. Maka...", options: ["Budi dokter", "Budi bukan dokter", "Budi pasien", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Kata yang berbeda makna dari yang lain adalah...", options: ["Biru", "Merah", "Hijau", "Dingin"], answer: 3 },

            { question: "Andi berumur dua kali umur Beni. Jika Beni 10 tahun, maka umur Andi adalah...", options: ["15", "18", "20", "25"], answer: 2 },

            { question: "Semua manusia bernapas. Hewan juga bernapas. Maka...", options: ["Semua manusia hewan", "Semua hewan manusia", "Manusia dan hewan sama-sama bernapas", "Tidak ada hubungan"], answer: 2 },

            { question: "Deret: 3, 6, 12, 24, ... angka selanjutnya adalah...", options: ["36", "40", "48", "50"], answer: 2 },

            { question: "Jika angka 7 digandakan dan dikurangi 3 hasilnya...", options: ["10", "11", "12", "13"], answer: 1 },

            { question: "Pola: Senin, Rabu, Jumat, Minggu, ... Hari selanjutnya adalah...", options: ["Selasa", "Kamis", "Senin", "Selasa lagi"], answer: 1 },

            { question: "Jika 5 + 3 = 28, 9 + 1 = 90, maka 7 + 2 = ...", options: ["63", "72", "81", "90"], answer: 1 },

            { question: "Semuanya berwarna merah. Beberapa berwarna biru. Maka...", options: ["Semua merah biru", "Beberapa bukan merah", "Ada yang berwarna merah dan biru", "Tidak ada biru"], answer: 2 },

            { question: "Jika semua pemain bola berlatih, dan Andi tidak berlatih, maka...", options: ["Andi bukan pemain bola", "Andi pemain bola", "Andi pelatih", "Tidak bisa disimpulkan"], answer: 0 },

            { question: "Pola angka: 1, 1, 2, 3, 5, 8, 13, ... Angka selanjutnya adalah...", options: ["18", "20", "21", "22"], answer: 2 },

            { question: "Jika 4 kucing menangkap 4 tikus dalam 4 menit, maka 8 kucing menangkap 8 tikus dalam waktu...", options: ["2 menit", "4 menit", "6 menit", "8 menit"], answer: 1 },

            { question: "Semua mahasiswa rajin belajar. Deni tidak rajin belajar. Maka...", options: ["Deni mahasiswa", "Deni bukan mahasiswa", "Deni guru", "Tidak bisa disimpulkan"], answer: 1 },

            { question: "Jika 2x + 3 = 9, maka nilai x adalah...", options: ["2", "3", "4", "5"], answer: 1 }
];
            // ...
        ],
        tebak: [
           { question: "Kalau ayam bisa berenang, berarti dia ikut les apa?", options: ["Renang gaya dada", "Renang gaya bebas", "Ayam gaya bebas", "Ayam gaya dada"], answer: 2 },
           { question: "Kenapa kucing kalau jatuh dari genteng suka kabur?", options: ["Malu", "Takut dimarahi", "Lupa jalan pulang", "Gentengnya tinggi"], answer: 0 },
           { question: "Apa bedanya kamu sama kalender?", options: ["Kalender banyak tanggalnya", "Kamu nggak punya tanggal", "Kamu nggak berguna", "Kamu suka dirobek"], answer: 1 },
           { question: "Kenapa kursi gak pernah sekolah?", options: ["Karena udah punya kaki", "Karena gak bisa jalan", "Karena gak punya otak", "Karena udah pinter duduk"], answer: 3 },
           { question: "Kalau ada ikan naik motor, dia mau ke mana?", options: ["Ke laut", "Ke dealer", "Ke jalan tol", "Ke sirkus"], answer: 2 },
           { question: "Kenapa huruf A selalu di depan?", options: ["Karena sombong", "Karena alfabet", "Karena paling tua", "Karena gak mau antre"], answer: 1 },
           { question: "Apa bedanya nasi goreng sama kamu?", options: ["Nasi goreng bisa dimakan", "Kamu bisa dimarahin", "Nasi goreng enak, kamu enggak", "Nasi goreng panas, kamu dingin"], answer: 2 },
           { question: "Kenapa sandal gak pernah iri sama sepatu?", options: ["Karena dia legowo", "Karena udah cocok di tempatnya", "Karena gak punya hati", "Karena sepatu bau"], answer: 0 },
           { question: "Kalau sapi bisa main gitar, lagu apa yang dia nyanyikan?", options: ["Cowboy Junior", "Sapi Bali Menangis", "Udder Pressure", "Gombloh – Kebyar-Kebyar"], answer: 2 },
           { question: "Kenapa tukang parkir selalu tenang?", options: ["Karena sudah terbiasa ngatur", "Karena banyak duit receh", "Karena hidupnya terparkir", "Karena sabar banget"], answer: 0 },
           { question: "Apa yang lebih cepat dari cahaya?", options: ["Chat mantan dibalas", "Emosi ibu", "Ketiduran waktu belajar", "Bayangan ninja"], answer: 1 },
           { question: "Kenapa pisang suka dikupas?", options: ["Karena malu", "Karena biar dimakan", "Karena kulitnya kotor", "Karena pengen tampil apa adanya"], answer: 3 },
           { question: "Kalau gajah masuk kulkas, apa yang terjadi?", options: ["Kulkasnya rusak", "Gajahnya kedinginan", "Pintu gak bisa nutup", "Semua benar"], answer: 3 },
           { question: "Kenapa hujan turun, gak naik?", options: ["Karena namanya turun hujan", "Karena berat air", "Karena kalau naik namanya nyuci awan", "Karena gravitasi cinta"], answer: 2 },
           { question: "Kalau kamu kehabisan bensin di jalan, apa yang kamu lakukan?", options: ["Dorong", "Nangis", "Telepon mantan", "Jalan kaki sambil nyanyi"], answer: 0 },
           { question: "Apa bedanya kucing sama kamu?", options: ["Kucing lucu, kamu ngelucu", "Kucing punya bulu, kamu punya utang", "Kucing bisa meong, kamu bisa ngeluh", "Kucing bisa dijilat, kamu dijilat hidup"], answer: 2 },
           { question: "Kenapa spidol suka hilang?", options: ["Karena dia gak tahan tekanan", "Karena sering dipinjam", "Karena stress di papan tulis", "Karena pengen jadi mistis"], answer: 1 },
           { question: "Kalau mobil bisa ngomong, dia bakal bilang apa?", options: ["‘Capek, bro!’", "‘Isi bensin dulu!’", "‘Nyalain AC dong!’", "‘Aku ingin bebas’"], answer: 0 },
           { question: "Apa yang punya gigi tapi gak bisa gigit?", options: ["Sisir", "Gergaji", "Kunci Inggris", "Harapan"], answer: 0 },
           { question: "Kenapa meja gak pernah berdiri di atas kursi?", options: ["Karena malu lebih tinggi", "Karena gak bisa naik", "Karena posisinya udah tetap", "Karena bukan manusia"], answer: 2 },
           { question: "Kalau kamu disuruh milih, lebih baik kehilangan dompet atau sinyal?", options: ["Dompet", "Sinyal", "Dua-duanya", "Gak bisa milih, aku bingung"], answer: 0 },
           { question: "Kenapa bulan suka muncul malam hari?", options: ["Karena takut panas", "Karena shift malam", "Karena romantis", "Karena matahari udah lembur siang"], answer: 1 },
           { question: "Kalau semut ikut olimpiade, cabang apa yang dia ikuti?", options: ["Lari estafet", "Angkat gula", "Panahan", "Catur"], answer: 1 },
           { question: "Apa yang bisa terbang tapi gak punya sayap?", options: ["Waktu", "Mimpi", "Uang", "Semua benar"], answer: 3 },
           { question: "Kenapa sendok gak pernah marah?", options: ["Karena sabar", "Karena selalu diaduk", "Karena hidupnya manis", "Karena udah biasa sendirian"], answer: 2 },
           { question: "Apa yang selalu di depan tapi gak pernah jalan?", options: ["Pintu", "Kamera depan", "Masa depan", "Cermin"], answer: 2 },
           { question: "Kalau jagung ikut kontes kecantikan, dia menang kategori apa?", options: ["Manis", "Kuning Cerah", "Serat Sehat", "Populer"], answer: 0 },
           { question: "Kenapa bantal disebut bantal?", options: ["Karena ‘banting kepala’ disingkat", "Karena ‘ban-tal’ gabungan dari bahan ban dan tal", "Karena enak ditaruh kepala", "Karena gak ada nama lain"], answer: 2 },
           { question: "Kalau hujan pakai jas hujan, kalau badai pakai apa?", options: ["Jas badai", "Payung raksasa", "Doa", "Netflix"], answer: 2 },
           { question: "Kenapa ayam suka berkokok pagi-pagi?", options: ["Karena alarmnya bunyi", "Karena habis sahur", "Karena ngingetin kamu bangun", "Karena belum punya HP"], answer: 3 }
]
            // ...
        ]
    };

    // Check if user data exists
    if (userData) {
        showCategoryPage();
    } else {
        showInputPage();
    }

    // Form submit
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const hobby = document.getElementById('hobby').value;
        userData = { name, age, hobby };
        localStorage.setItem('userData', JSON.stringify(userData));
        showCategoryPage();
    });

    // Show pages
    function showInputPage() {
        inputPage.classList.remove('hidden');
        categoryPage.classList.add('hidden');
        quizPage.classList.add('hidden');
    }

    function showCategoryPage() {
        inputPage.classList.add('hidden');
        categoryPage.classList.remove('hidden');
        quizPage.classList.add('hidden');
        userNameSpan.textContent = userData.name;
    }

    function showQuizPage() {
        inputPage.classList.add('hidden');
        categoryPage.classList.add('hidden');
        quizPage.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        loadQuestion();
        if (['penalaran', 'logika'].includes(currentCategory)) {
            startTimer();
        } else {
            timerEl.style.display = 'none';
        }
    }

    // Category buttons
    categories.forEach(cat => {
        cat.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-btn')) {
                currentCategory = cat.dataset.category;
                questions = allQuestions[currentCategory];
                currentQuestionIndex = 0;
                score = 0;
                timeLeft = 600;
                showQuizPage();
            }
        });
    });

    // Instagram button
    instagramBtn.addEventListener('click', () => {
        window.open('https://www.instagram.com/rayhanmohammad?igsh=MWR6d2x5cDN2c3d1', '_blank');
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userData');
        userData = null;
        showInputPage();
    });

    // Load question
    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showResult();
            return;
        }
        const q = questions[currentQuestionIndex];
        questionEl.textContent = q.question;
        optionsEl.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.classList.add('option');
            btn.textContent = opt;
            btn.addEventListener('click', () => selectOption(idx, q.answer));
            optionsEl.appendChild(btn);
        });
        nextBtn.classList.add('hidden');
    }

    // Select option
    function selectOption(selected, correct) {
        const options = document.querySelectorAll('.option');
        options.forEach((opt, idx) => {
            if (idx === correct) {
                opt.classList.add('correct');
            } else if (idx === selected && idx !== correct) {
                opt.classList.add('incorrect');
            }
            opt.disabled = true;
        });
        if (selected === correct) score++;
        nextBtn.classList.remove('hidden');
    }

    // Next button
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    // Timer
    function startTimer() {
        timerEl.style.display = 'block';
        timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeLeftEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showResult();
            }
        }, 1000);
    }

    // Show result
    function showResult() {
        clearInterval(timer);
        questionContainer.classList.add('hidden');
        resultDiv.classList.remove('hidden');
        scoreEl.textContent = score;
    }

    // Back to categories
    backBtn.addEventListener('click', showCategoryPage);
});
