// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const questionCounter = document.getElementById('question-counter');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackContent = document.getElementById('feedback-content');
const feedbackText = document.getElementById('feedback-text');
const finalScoreElement = document.getElementById('final-score');
const badgeTitle = document.getElementById('badge-title');
const shareButton = document.getElementById('share-btn');
const restartButton = document.getElementById('restart-btn');

// Audio Elements
const audioStart = document.getElementById('audio-start');
const audioCorrect = document.getElementById('audio-correct');
const audioWrong = document.getElementById('audio-wrong');
const audioClick = document.getElementById('audio-click');
const audioEnd = document.getElementById('audio-end');

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// Initialize quiz
function startQuiz() {
    audioStart.play();
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Display current question
function showQuestion() {
    resetState();
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionCounter.innerText = `Vraag ${questionNo}/20`;
    progressBar.style.width = `${(questionNo / 20) * 100}%`;
    
    questionElement.innerText = currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset question state
function resetState() {
    feedbackContainer.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    
    if (correct) {
        score++;
        audioCorrect.play();
        feedbackContainer.className = 'feedback-correct';
    } else {
        audioWrong.play();
        feedbackContainer.className = 'feedback-wrong';
    }
    
    feedbackText.innerText = shuffledQuestions[currentQuestionIndex].explanation;
    feedbackContainer.classList.remove('hidden');
    
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.style.backgroundColor = '#4CAF50';
        }
    });
    
    // Remove any existing event listeners from the next button
    nextButton.replaceWith(nextButton.cloneNode(true));
    // Get the fresh reference to the button
    const freshNextButton = document.getElementById('next-btn');
    
    if (currentQuestionIndex < questions.length - 1) {
        freshNextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            showQuestion();
        }, { once: true });
    } else {
        freshNextButton.addEventListener('click', showEndScreen, { once: true });
    }
}

// Display end screen
function showEndScreen() {
    audioEnd.play();
    quizScreen.classList.remove('active');
    endScreen.classList.add('active');
    finalScoreElement.textContent = score;
    
    // Determine badge based on score
    let badgeText = '';
    if (score >= 18) {
        badgeText = 'AI & Cybersecurity Expert! 🏆';
    } else if (score >= 15) {
        badgeText = 'Digital Security Pro! 🌟';
    } else if (score >= 12) {
        badgeText = 'Security Enthusiast! 📚';
    } else {
        badgeText = 'Security Beginner! 🌱';
    }
    badgeTitle.textContent = badgeText;
}

// Share results
function shareResults() {
    const text = `Ik heb ${score} van de 20 vragen goed beantwoord in de AI & Cybersecurity Challenge! #AICyberChallenge`;
    if (navigator.share) {
        navigator.share({
            title: 'AI & Cybersecurity Challenge Resultaat',
            text: text
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Resultaat gekopieerd naar klembord!');
    }
}

// Event listeners
startButton.addEventListener('click', startQuiz);
shareButton.addEventListener('click', shareResults);
restartButton.addEventListener('click', () => {
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
});
