// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const progressBar = document.getElementById('progress-bar');
const questionCounter = document.getElementById('question-counter');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackContent = document.getElementById('feedback-content');
const feedbackText = document.getElementById('feedback-text');
const finalScoreElement = document.getElementById('final-score');
const scoreMessage = document.querySelector('.score-message');
const badgeContainer = document.getElementById('badge-container');
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
let hasAnsweredCorrectly = false;

// Initialize quiz
function startQuiz() {
    audioStart.play();
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

// Display current question
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    updateProgress();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'pixel-font');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    hasAnsweredCorrectly = false;
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
    if (hasAnsweredCorrectly) return;
    
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    
    if (correct) {
        audioCorrect.play();
        selectedButton.classList.add('correct');
        score++;
        hasAnsweredCorrectly = true;
    } else {
        audioWrong.play();
        selectedButton.classList.add('wrong');
    }
    
    showFeedback(correct, selectedButton);
}

function showFeedback(correct, selectedButton) {
    feedbackContainer.classList.remove('hidden');
    feedbackContent.className = correct ? 'feedback-correct' : 'feedback-wrong';
    
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(answer => answer.text === selectedButton.innerText);
    
    feedbackText.innerHTML = `${correct ? '✅ Correct!' : '❌ Incorrect!'}\n\n${selectedAnswer.explanation}`;
    
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });
    
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.classList.add('btn', 'pixel-font');
    
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerHTML = 'Quiz Afronden';
        nextBtn.onclick = showEndScreen;
    } else {
        nextBtn.innerHTML = 'Volgende Vraag';
        nextBtn.onclick = () => {
            audioClick.play();
            currentQuestionIndex++;
            setNextQuestion();
        };
    }
    
    // Remove any existing next button
    const existingNextBtn = document.getElementById('next-btn');
    if (existingNextBtn) {
        existingNextBtn.remove();
    }
    
    // Add the new next button
    feedbackContainer.appendChild(nextBtn);
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    questionCounter.innerText = `Vraag ${currentQuestionIndex + 1}/${questions.length}`;
}

// Display end screen
function showEndScreen() {
    audioEnd.play();
    quizScreen.classList.remove('active');
    endScreen.classList.add('active');
    
    const percentage = (score / questions.length) * 100;
    const formattedPercentage = percentage.toFixed(1);
    
    finalScoreElement.textContent = `${score} van de ${questions.length} vragen correct (${formattedPercentage}%)`;
    
    // Clear previous badge if exists
    badgeContainer.innerHTML = '';
    
    if (percentage >= 70) {
        badgeContainer.innerHTML = `
            <div class="badge">
                <img src="assets/images/award.png" alt="Achievement Badge" class="badge-image">
                <h3>Gefeliciteerd!</h3>
                <p>Je hebt de AI & Cybersecurity Challenge succesvol afgerond!</p>
            </div>
        `;
        scoreMessage.textContent = "Uitstekend werk! Je hebt bewezen dat je de basisprincipes van AI & Cybersecurity goed begrijpt.";
    } else {
        scoreMessage.textContent = "Je hebt helaas niet de vereiste 70% gehaald. Probeer het nog een keer!";
    }
    
    // Show both retry and share buttons
    restartButton.style.display = 'block';
    if (percentage >= 70) {
        shareButton.style.display = 'block';
    } else {
        shareButton.style.display = 'none';
    }
}

// Share results
function shareOnLinkedIn() {
    const percentage = (score / questions.length) * 100;
    const formattedPercentage = percentage.toFixed(1);
    
    const shareText = encodeURIComponent(
        `Ik heb de AI & Cybersecurity Challenge succesvol afgerond met een score van ${formattedPercentage}%! 🏆\n\nTest jouw kennis over AI & Cybersecurity ook en verdien je certificaat! #AICybersecurity #DigitaleVeiligheid #Certificaat`
    );
    
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://apps.civiqs.ai/ai-cybersecurity-challenge')}&title=${shareText}`;
    window.open(shareUrl, '_blank');
}

// Restart quiz
function restartQuiz() {
    audioClick.play();
    endScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    hasAnsweredCorrectly = false;
}

// Event listeners
startButton.addEventListener('click', startQuiz);
shareButton.addEventListener('click', shareOnLinkedIn);
restartButton.addEventListener('click', restartQuiz);
