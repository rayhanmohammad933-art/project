let currentQuestion = 1;
const totalQuestions = 3;


document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('submitBtn').addEventListener('click', submitQuiz);
document.getElementById('sendToWhatsApp').addEventListener('click', sendToWhatsApp);
 
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
    
}

function sendToWhatsApp() {
    const phoneNumber = '6285236039799'; // Ganti dengan nomor WhatsApp tujuan (tanpa +)
    const url = `https://wa.me/6285236039799${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
