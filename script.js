// Data kuis (pertanyaan, opsi, jawaban benar)
const questions = [
    {
        question: "Apa yang dimaksud dengan 'engagement' di media sosial?",
        options: {
            A: "Jumlah pengikut",
            B: "Interaksi pengguna seperti like, komentar, dan share",
            C: "Jumlah postingan",
            D: "Waktu online"
        },
        correct: "B"
    },
    {
        question: "Platform media sosial mana yang paling cocok untuk berbagi gambar dan video pendek?",
        options: {
            A: "LinkedIn",
            B: "Instagram",
            C: "Twitter",
            D: "Facebook"
        },
        correct: "B"
    },
    {
        question: "Apa fungsi utama dari hashtag (#) di media sosial?",
        options: {
            A: "Menyembunyikan postingan",
            B: "Mengkategorikan konten agar mudah ditemukan",
            C: "Menambah jumlah like",
            D: "Mengubah warna teks"
        },
        correct: "B"
    },
    {
        question: "Apa yang harus dilakukan jika akun media sosial Anda diretas?",
        options: {
            A: "Mengabaikannya",
            B: "Mengubah kata sandi dan mengaktifkan autentikasi dua faktor",
            C: "Menghapus akun",
            D: "Berbagi dengan teman"
        },
        correct: "B"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// Elemen DOM
const quizSection = document.getElementById('quiz-section');
const registrationSection = document.getElementById('registration-section');
const successSection = document.getElementById('success-section');
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-questions');
const questionText = document.getElementById('question-text');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const optionC = document.getElementById('option-c');
const optionD = document.getElementById('option-d');
const validationMessage = document.getElementById('validation-message');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const registrationForm = document.getElementById('registration-form');
const thankYouMessage = document.getElementById('thank-you-message');
const quizSummary = document.getElementById('quiz-summary');
const resetBtn = document.getElementById('reset-btn');

// Fungsi untuk menampilkan pertanyaan
function showQuestion(index) {
    const q = questions[index];
    questionNumber.textContent = index + 1;
    questionText.textContent = q.question;
    optionA.textContent = q.options.A;
    optionB.textContent = q.options.B;
    optionC.textContent = q.options.C;
    optionD.textContent = q.options.D;

    // Reset radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => radio.checked = false);
    if (userAnswers[index]) {
        document.querySelector(`input[name="answer"][value="${userAnswers[index]}"]`).checked = true;
    }

    // Update tombol
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === questions.length - 1 ? 'Lanjut ke Pendaftaran' : 'Selanjutnya';
    validationMessage.style.display = 'none';
}

// Event listener untuk tombol Sebelumnya
prevBtn.addEventListener('click', () => {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
});

// Event listener untuk tombol Selanjutnya
nextBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        validationMessage.style.display = 'block';
        return;
    }
    userAnswers[currentQuestionIndex] = selected.value;
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        // Hitung skor
        score = userAnswers.reduce((acc, ans, idx) => acc + (ans === questions[idx].correct ? 1 : 0), 0);
        showRegistration();
    }
});

// Fungsi untuk menampilkan formulir pendaftaran
function showRegistration() {
    quizSection.classList.remove('active');
    registrationSection.classList.add('active');
}

// Event listener untuk submit formulir
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const classMajor = document.getElementById('class-major').value;
    const phone = document.getElementById('phone').value;
    const socialMedia = document.querySelector('input[name="social-media"]:checked').value;

    // Validasi sederhana (sudah ada required di HTML)
    if (!fullName || !classMajor || !phone || !socialMedia) {
        alert('Harap isi semua bidang.');
        return;
    }

    // Simulasi pengiriman data (dalam aplikasi nyata, kirim ke server)
    console.log('Data Pendaftaran:', { fullName, classMajor, phone, socialMedia, score });

    showSuccess(fullName, score);
});

// Fungsi untuk menampilkan halaman sukses
function showSuccess(name, quizScore) {
    registrationSection.classList.remove('active');
    successSection.classList.add('active');
    thankYouMessage.textContent = `Terima kasih, ${name}! Data Anda telah kami terima.`;
    quizSummary.textContent = `Anda menjawab ${quizScore} dari ${questions.length} pertanyaan dengan benar.`;
}

// Event listener untuk tombol Kembali ke Awal
resetBtn.addEventListener('click', () => {
    location.reload();
});

// Inisialisasi
showQuestion(currentQuestionIndex);
