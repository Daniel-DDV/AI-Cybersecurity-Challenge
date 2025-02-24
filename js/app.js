// Quiz State Management
class QuizState {
    constructor() {
        if (!window.questions || !Array.isArray(window.questions) || window.questions.length === 0) {
            throw new Error('Geen quiz vragen gevonden!');
        }
        this.questions = window.questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasAnswered = false;
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasAnswered = false;
    }
}

// Quiz UI Management
class QuizUI {
    constructor() {
        // Screen elements
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.endScreen = document.getElementById('end-screen');

        // Quiz elements
        this.questionElement = document.getElementById('question');
        this.answersContainer = document.getElementById('answers');
        this.feedbackElement = document.getElementById('feedback');
        this.scoreElement = document.getElementById('score');
        this.progressBar = document.getElementById('progress-bar');
        this.questionCounter = document.querySelector('.current-question');

        // Button elements
        this.startButton = document.getElementById('start-btn');
        this.restartButton = document.getElementById('restart-btn');
        this.nextButton = document.getElementById('next-question');

        // End screen elements
        this.finalScoreElement = document.getElementById('final-score');
        this.scoreMessageElement = document.querySelector('.score-message');
        this.badgeImage = document.querySelector('.badge-image');
        this.badgeTitle = document.getElementById('badge-title');

        // Audio elementen
        this.sounds = {
            start: new Audio('assets/audio/start.mp3'),
            correct: new Audio('assets/audio/correct.mp3'),
            wrong: new Audio('assets/audio/wrong.mp3'),
            click: new Audio('assets/audio/click.mp3'),
            end: new Audio('assets/audio/end.mp3')
        };

        // Share button
        this.shareButton = document.getElementById('share-btn');

        if (!this.validateElements()) {
            throw new Error('Niet alle vereiste DOM elementen zijn gevonden.');
        }
    }

    validateElements() {
        return this.startScreen && this.quizScreen && this.endScreen && 
               this.questionElement && this.answersContainer && this.feedbackElement &&
               this.startButton && this.restartButton && this.nextButton &&
               this.finalScoreElement && this.scoreMessageElement && this.badgeImage && this.badgeTitle;
    }

    showScreen(screen) {
        // Verberg eerst alle schermen
        [this.startScreen, this.quizScreen, this.endScreen].forEach(s => {
            s.classList.remove('active');
        });

        // Toon het gewenste scherm
        screen.classList.add('active');
    }

    displayQuestion(question) {
        // Reset UI elements
        this.questionElement.textContent = question.question;
        this.answersContainer.innerHTML = '';
        this.feedbackElement.innerHTML = '';
        this.feedbackElement.className = 'feedback';
        this.nextButton.style.display = 'none';
        
        // Create answer buttons
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'btn answer-btn';
            button.textContent = answer.text;
            button.setAttribute('role', 'radio');
            button.setAttribute('aria-checked', 'false');
            button.setAttribute('data-index', index);
            button.dataset.correct = answer.correct;
            this.answersContainer.appendChild(button);
        });
    }

    showFeedback(isCorrect, explanation) {
        this.feedbackElement.textContent = explanation;
        this.feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        this.nextButton.style.display = 'block';
    }

    updateProgressBar(currentQuestion, totalQuestions) {
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        this.progressBar.style.width = `${progress}%`;
        this.progressBar.setAttribute('aria-valuenow', progress);
        this.questionCounter.textContent = currentQuestion + 1;
    }

    showEndScreen(score, totalQuestions) {
        this.showScreen(this.endScreen);
        const percentage = (score / totalQuestions) * 100;
        this.finalScoreElement.textContent = `Score: ${score}/${totalQuestions}`;
        
        let message, badgeTitle;
        if (percentage >= 80) {
            message = "Uitstekend! Je bent een echte cybersecurity expert! 🏆";
            badgeTitle = "AI & Cybersecurity Expert";
        } else if (percentage >= 60) {
            message = "Goed gedaan! Je hebt een stevige basiskennis! 🌟";
            badgeTitle = "AI & Cybersecurity Professional";
        } else {
            message = "Je kunt je kennis nog verbeteren. Blijf leren! 📚";
            badgeTitle = "AI & Security Student";
        }
        
        this.scoreMessageElement.textContent = message;
        this.badgeImage.src = 'assets/images/award.png';
        this.badgeImage.alt = badgeTitle;
        this.badgeTitle.textContent = badgeTitle;

        // Speel eindsound
        this.playSound('end');
    }

    clearFeedback() {
        this.feedbackElement.innerHTML = '';
        this.answersContainer.querySelectorAll('.answer-btn').forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'incorrect');
            button.setAttribute('aria-checked', 'false');
        });
    }

    // Geluid afspelen
    playSound(soundName) {
        try {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        } catch (error) {
            console.warn('Geluid kon niet worden afgespeeld:', error);
        }
    }
}

// Quiz Controller
class QuizController {
    constructor() {
        this.state = new QuizState();
        this.ui = new QuizUI();
        this.setupEventListeners();
    }

    async initialize() {
        try {
            // Setup accessibility
            this.setupAccessibility();
            
        } catch (error) {
            console.error('Error initializing quiz:', error);
            this.handleError('Er is een fout opgetreden bij het laden van de quiz.');
        }
    }

    setupEventListeners() {
        // Start Quiz
        this.ui.startButton.addEventListener('click', () => {
            this.ui.playSound('start');
            this.startQuiz();
        });

        // Answer Selection
        this.ui.answersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-btn')) {
                this.handleAnswerSelection(e.target);
            }
        });

        // Keyboard Navigation
        this.ui.answersContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (e.target.classList.contains('answer-btn')) {
                    this.handleAnswerSelection(e.target);
                }
            }
        });

        // Next Question
        this.ui.nextButton.addEventListener('click', () => {
            this.ui.playSound('click');
            this.showNextQuestion();
        });

        // Restart Quiz
        this.ui.restartButton.addEventListener('click', () => {
            this.ui.playSound('start');
            this.startQuiz();
        });

        this.ui.shareButton.addEventListener('click', () => this.shareResults());
    }

    setupAccessibility() {
        // Set initial ARIA states
        this.ui.answersContainer.setAttribute('role', 'radiogroup');
        this.ui.answersContainer.setAttribute('aria-label', 'Antwoordopties');
        
        // Add keyboard navigation
        this.enableKeyboardNavigation();
    }

    enableKeyboardNavigation() {
        this.ui.answersContainer.addEventListener('keydown', (e) => {
            const buttons = Array.from(this.ui.answersContainer.querySelectorAll('.answer-btn'));
            const currentIndex = buttons.indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
                    buttons[prevIndex].focus();
                    break;
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    const nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
                    buttons[nextIndex].focus();
                    break;
            }
        });
    }

    startQuiz() {
        this.state = new QuizState();
        this.ui.showScreen(this.ui.quizScreen);
        this.showQuestion();
    }

    showQuestion() {
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
        this.ui.displayQuestion(currentQuestion);
        this.ui.updateProgressBar(this.state.currentQuestionIndex, this.state.questions.length);
        this.ui.clearFeedback();
        this.state.hasAnswered = false;
    }

    async handleAnswerSelection(selectedButton) {
        if (this.state.hasAnswered) return;
        
        const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
        const selectedAnswerIndex = parseInt(selectedButton.dataset.index);
        const isCorrect = selectedButton.dataset.correct === 'true';

        // Speel het juiste geluid
        this.ui.playSound(isCorrect ? 'correct' : 'wrong');

        // Update UI for selected answer
        this.ui.answersContainer.querySelectorAll('.answer-btn').forEach(button => {
            button.setAttribute('aria-checked', 'false');
            button.disabled = true;
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });
        selectedButton.setAttribute('aria-checked', 'true');
        selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Show feedback
        const selectedAnswer = currentQuestion.answers[selectedAnswerIndex];
        this.ui.showFeedback(isCorrect, selectedAnswer.explanation);
        
        if (isCorrect) {
            this.state.score++;
        }

        this.state.hasAnswered = true;
        
        // Enable or hide next button based on quiz progress
        if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
            this.ui.nextButton.disabled = false;
        } else {
            this.ui.nextButton.style.display = 'none';
            setTimeout(() => this.endQuiz(), 1500);
        }
    }

    showNextQuestion() {
        if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
            this.state.currentQuestionIndex++;
            this.state.hasAnswered = false;
            
            // Reset UI before showing next question
            this.ui.feedbackElement.className = 'feedback';
            this.ui.nextButton.style.display = 'none';
            this.ui.nextButton.disabled = true;
            
            this.showQuestion();
        }
    }

    endQuiz() {
        this.ui.showScreen(this.ui.endScreen);
        this.ui.showEndScreen(this.state.score, this.state.questions.length);
    }

    handleError(message) {
        // Toon gebruiksvriendelijke foutmelding
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.setAttribute('role', 'alert');
        errorMessage.textContent = message;
        this.ui.startScreen.prepend(errorMessage);
    }

    async shareResults() {
        const score = this.state.score;
        const total = this.state.questions.length;
        const shareText = `Ik heb ${score} van de ${total} vragen goed beantwoord in de AI & Cybersecurity Challenge! Doe jij het beter? 🎯`;
        
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'AI & Cybersecurity Challenge Score',
                    text: shareText,
                });
            } else {
                await navigator.clipboard.writeText(shareText);
                this.ui.shareButton.textContent = 'Gekopieerd!';
                setTimeout(() => {
                    this.ui.shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Delen';
                }, 2000);
            }
        } catch (error) {
            console.warn('Delen niet mogelijk:', error);
        }
    }
}

// Start de quiz wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Wacht even om er zeker van te zijn dat questions.js is geladen
        setTimeout(() => {
            window.quizController = new QuizController();
            window.quizController.initialize();
        }, 100);
    } catch (error) {
        console.error('Error initializing quiz:', error);
        // Toon een gebruiksvriendelijke foutmelding
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Er is een fout opgetreden bij het laden van de quiz. Vernieuw de pagina om het opnieuw te proberen.';
        document.querySelector('.container').appendChild(errorDiv);
    }
});
