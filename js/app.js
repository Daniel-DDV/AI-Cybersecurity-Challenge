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
    
    // Always show both buttons
    restartButton.style.display = 'block';
    shareButton.style.display = 'block';
}

// Share results
function shareOnLinkedIn() {
    const percentage = (score / questions.length) * 100;
    const formattedPercentage = percentage.toFixed(1);
    const baseUrl = 'https://apps.civiqs.ai/ai-cybersecurity-challenge';
    
    // Construct the text with proper line breaks
    let messageText;
    if (percentage >= 70) {
        messageText = 
            `🏆 Yes! Ik heb de AI & Cybersecurity Challenge gehaald met ${formattedPercentage}%!` +
            `${String.fromCharCode(10)}${String.fromCharCode(10)}` +
            `Durf jij de uitdaging ook aan? Test je kennis over AI & Cybersecurity en verdien je eigen certificaat. 💪` +
            `${String.fromCharCode(10)}${String.fromCharCode(10)}` +
            `#AICybersecurity #DigitaleVeiligheid #ChallengeAccepted`;
    } else {
        messageText = 
            `🎯 Ik heb net ${formattedPercentage}% gescoord op de AI & Cybersecurity Challenge!` +
            `${String.fromCharCode(10)}${String.fromCharCode(10)}` +
            `Denk jij dat je het beter kunt? Probeer het zelf en test je kennis! 💪` +
            `${String.fromCharCode(10)}${String.fromCharCode(10)}` +
            `#AICybersecurity #DigitaleVeiligheid #ChallengeAccepted`;
    }

    // Add the URL at the end of the message
    messageText += `${String.fromCharCode(10)}${String.fromCharCode(10)}${baseUrl}`;
    
    // Construct the sharing URL with properly encoded parameters
    const shareUrl = 'https://www.linkedin.com/feed/?' + new URLSearchParams({
        shareActive: true,
        text: messageText
    }).toString();
    
    window.open(shareUrl, 'LinkedInShare', 'width=600,height=600');
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
