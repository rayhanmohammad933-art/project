const questions = [
    { correct: "Jakarta" },
    { correct: "4" },
    { correct: "Biru" },
    { correct: "Soekarno" },
    { correct: "Bumi" }
];

let currentQuestion = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    showQuestion(currentQuestion);
});

function showQuestion(index) {
    const qElements = document.querySelectorAll('.question');
    qElements.forEach(q => q.classList.add('hidden'));
    document.getElementById(`q${index + 1}`).classList.remove('hidden');
}

document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', (e) => {
        const answer = e.target.getAttribute('data-answer');
        if (answer === questions[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        } else {
            showResult();
        }
    });
});

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('score').textContent = `Skor Anda: ${score}/${questions.length}`;
    if (score >= 3) {
        setTimeout(() => {
            document.getElementById('result').classList.add('hidden');
            document.getElementById('registration').classList.remove('hidden');
        }, 2000);
    }
}

document.getElementById('retry').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('registration').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    showQuestion(currentQuestion);
});

document.getElementById('regForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pendaftaran dikirim ke nomor yang di tuju.');
    // Gabungkan data pendaftaran dan jawaban menjadi pesan
        let message = `Data Pendaftaran:\nNama: ${registrationData.name}\nEmail: ${registrationData.email}\n\nJawaban Kuis:\n`;
        message += answers.join('\n');
        // Nomor WhatsApp tujuan (ganti dengan nomor yang benar, format internasional tanpa +)
        const whatsappNumber = '6285236039799'; // Contoh: 628123456789
        // Buat URL WhatsApp dengan pesan
        const whatsappUrl = `https://wa.me/6285236039799${whatsappNumber}?text=${encodeURIComponent(message)}`;
        // Buka WhatsApp di tab baru
        window.open(whatsappUrl, '_blank');
    });
});
