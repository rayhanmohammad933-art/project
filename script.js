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
            { question: "Apa hasil dari 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
            { question: "Siapa presiden pertama Indonesia?", options: ["Soekarno", "Suharto", "Habibie", "Gus Dur"], answer: 0 },
            // ... (repeat to 30, but for brevity, only 3 shown)
        ],
        literasi: [
            { question: "Apa sinonim dari 'bahagia'?", options: ["Sedih", "Senang", "Marah", "Takut"], answer: 1 },
            // ...
        ],
        logika: [
            { question: "Jika A > B dan B > C, maka?", options: ["A > C", "A < C", "A = C", "Tidak tahu"], answer: 0 },
            // ...
        ],
        tebak: [
            { question: "Apa yang punya kepala tapi tidak punya badan?", options: ["Ular", "Pin", "Koin", "Jam"], answer: 3 },
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
