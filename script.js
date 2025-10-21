let currentQuestion = 1;
const totalQuestions = 3;
let score = 0;
const answers = { q1: 'Jakarta', q2: '4', q3: 'Biru' };

document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('submitBtn').addEventListener('click', submitQuiz);
document.getElementById('sendToWhatsApp').addEventListener('click', sendToWhatsApp);

function nextQuestion() {
    const selected = document.querySelector(`input[name=q${currentQuestion}]:checked`);
    if (!selected) {
        alert('Pilih jawaban dulu!');
        return;
    }
    
    if (selected.value === answers[`q${currentQuestion}`]) {
        score++;
    }
    
    document.getElementById(`q${currentQuestion}`).style.display = 'none';
    currentQuestion++;
    
    if (currentQuestion <= totalQuestions) {
        document.getElementById(`q${currentQuestion}`).style.display = 'block';
    } else {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'block';
    }
}

function submitQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').textContent = `Skor Anda: ${score}/${totalQuestions}`;
}

function sendToWhatsApp() {
    const message = `Hasil Kuis Pendaftaran: Skor ${score}/${totalQuestions}. Nama: [Masukkan nama Anda]`;
    const phoneNumber = '6285236039799'; // Ganti dengan nomor WhatsApp tujuan (tanpa +)
    const url = `https://wa.me/6285236039799${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
