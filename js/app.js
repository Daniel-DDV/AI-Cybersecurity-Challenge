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

        // Audio setup
        this.audioContext = null;
        this.audioBuffers = {};
        this.audioInitialized = false;
        this.audioEnabled = true;

        // Audio initialisatie voorbereiden
        this.initAudio();

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

    async initAudio() {
        try {
            // Creëer AudioContext meteen (maar nog niet starten)
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Laad alle geluiden
            const audioFiles = {
                start: 'assets/audio/start.mp3',
                correct: 'assets/audio/correct.mp3',
                wrong: 'assets/audio/wrong.mp3',
                click: 'assets/audio/click.mp3',
                end: 'assets/audio/end.mp3'
            };

            // Laad alle audiobestanden parallel
            const bufferPromises = Object.entries(audioFiles).map(async ([name, url]) => {
                try {
                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();
                    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                    this.audioBuffers[name] = audioBuffer;
                } catch (error) {
                    console.warn(`Kon geluid ${name} niet laden:`, error);
                }
            });

            await Promise.all(bufferPromises);
            this.audioInitialized = true;

            // Luister naar verschillende gebruikersinteracties om audio te activeren
            const activateAudio = async () => {
                if (this.audioContext.state === 'suspended') {
                    await this.audioContext.resume();
                }
            };

            ['click', 'touchstart', 'touchend'].forEach(event => {
                document.addEventListener(event, activateAudio, { once: false });
            });

        } catch (error) {
            console.warn('Audio setup mislukt:', error);
            this.audioEnabled = false;
        }
    }

    async playSound(soundName) {
        if (!this.audioEnabled || !this.audioInitialized || !this.audioBuffers[soundName]) {
            return;
        }

        try {
            // Zorg dat de context actief is
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            // Creëer een nieuwe buffer source voor elke keer dat we het geluid afspelen
            const source = this.audioContext.createBufferSource();
            source.buffer = this.audioBuffers[soundName];
            
            // Verbind met de output
            source.connect(this.audioContext.destination);
            
            // Start het geluid
            source.start(0);

        } catch (error) {
            console.warn(`Geluid ${soundName} afspelen mislukt:`, error);
        }
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
        // Start button
        this.ui.startButton.addEventListener('click', () => {
            this.ui.playSound('start');  // Voeg start geluid toe
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
        this.state.reset();
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

    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }

    getLinkedInShareUrl(shareUrl, shareText) {
        if (this.isIOS()) {
            // iOS: Gebruik LinkedIn app URL schema
            return `linkedin://shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        } else {
            // Desktop & Android: Gebruik share-offsite URL
            return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        }
    }

    async shareResults() {
        const score = this.state.score;
        const total = this.state.questions.length;
        const percentage = Math.round((score / total) * 100);
        
        // Bepaal de badge en tekst
        let badgeText;
        if (percentage >= 80) {
            badgeText = "AI & Cybersecurity Expert";
        } else if (percentage >= 60) {
            badgeText = "AI & Cybersecurity Professional";
        } else {
            badgeText = "AI & Security Student";
        }

        const shareUrl = 'https://apps.civiqs.ai/ai-cybersecurity-challenge';
        const messageText = 
            `🏆 Yes! Ik heb de AI & Cybersecurity Challenge voltooid als ${badgeText} met ${score}/${total} punten (${percentage}%)!\n\n` +
            `Durf jij de uitdaging ook aan? Test je kennis over AI & Cybersecurity en verdien je eigen certificaat. 💪\n\n` +
            `#AICybersecurity #DigitaleVeiligheid #ChallengeAccepted`;
        
        // Check of het een mobiel apparaat is
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile && navigator.share) {
            try {
                // Voor mobiel: gebruik native share functionaliteit
                await navigator.share({
                    title: 'AI & Cybersecurity Challenge Score',
                    text: messageText,
                    url: shareUrl
                });
            } catch (error) {
                console.warn('Native delen niet mogelijk:', error);
                // Fallback: open LinkedIn share in nieuwe tab
                const linkedInUrl = this.getLinkedInShareUrl(shareUrl, messageText);
                
                if (this.isIOS()) {
                    // Voor iOS proberen we eerst de LinkedIn app te openen
                    window.location.href = linkedInUrl;
                    
                    // Na een korte timeout, als de app niet opent, fallback naar de web versie
                    setTimeout(() => {
                        window.location.href = this.getLinkedInShareUrl(shareUrl, messageText);
                    }, 500);
                } else {
                    // Voor andere platformen direct openen
                    window.location.href = linkedInUrl;
                }
            }
        } else {
            // Desktop: open LinkedIn share in popup
            const linkedInUrl = this.getLinkedInShareUrl(shareUrl, messageText);
            const width = 600;
            const height = 600;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;
            
            window.open(
                linkedInUrl,
                'linkedin-share-dialog',
                `width=${width},height=${height},left=${left},top=${top}`
            );
        }
    }

    openLinkedInShare(url, text) {
        // LinkedIn parameters
        const linkedInParams = new URLSearchParams({
            text: text
        }).toString();

        const linkedInUrl = `https://www.linkedin.com/feed/post/new/?${linkedInParams}`;
        
        // Open in popup op desktop, nieuwe tab op mobiel
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = linkedInUrl;
        } else {
            const width = 600;
            const height = 600;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;
            
            window.open(
                linkedInUrl,
                'linkedin-share-dialog',
                `width=${width},height=${height},left=${left},top=${top}`
            );
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
