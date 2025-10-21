let currentQuestion = 1;
const totalQuestions = 3;
let answers = {};
let userName = '';

document.getElementById('startBtn').addEventListener('click', startQuiz);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('submitBtn').addEventListener('click', submitQuiz);
document.getElementById('sendToWhatsApp').addEventListener('click', sendToWhatsApp);

function startQuiz() {
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        alert('Masukkan nama dulu!');
        return;
    }
    userName = nameInput.value;
    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
}

function nextQuestion() {
    const answerInput = document.getElementById(`answer${currentQuestion}`);
    if (!answerInput.value.trim()) {
        alert('Isi jawaban dulu!');
        return;
    }
    
    answers[`q${currentQuestion}`] = answerInput.value;
    
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
    
    let summary = `Nama: ${userName}\n`;
    for (let i = 1; i <= totalQuestions; i++) {
        summary += `Pertanyaan ${i}: ${answers[`q${i}`]}\n`;
    }
    document.getElementById('answersSummary').textContent = summary;
}

function sendToWhatsApp() {
    let message = `Jawaban Kuis Pendaftaran:\nNama: ${userName}\n`;
    for (let i = 1; i <= totalQuestions; i++) {
        message += `Pertanyaan ${i}: ${answers[`q${i}`]}\n`;
    }
    const phoneNumber = '1234567890'; // Ganti dengan nomor WhatsApp tujuan (tanpa +)
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
