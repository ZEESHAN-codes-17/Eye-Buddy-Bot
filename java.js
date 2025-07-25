/**
 * Color Blindness Assistant Bot
 * A comprehensive chatbot for color blindness education and testing
 */
class ColorBlindnessBot {
    constructor() {
        this.knowledge = this.initializeKnowledge();
        this.testData = this.initializeTestData();
        this.currentTestIndex = 0;
        this.correctAnswers = 0;
        this.isTestActive = false;
        this.recognition = null;

        this.initialize();
    }

    /**
     * Initialize the bot with all necessary components
     */
    initialize() {
        this.setupEventListeners();
        this.setupSpeechRecognition();
        this.loadVoices();
        this.sendWelcomeMessage();
    }

    /**
     * Initialize knowledge base with structured data
     */
    initializeKnowledge() {
        return {
            greetings: {
                hello: [
                    "Hi there!", 
                    "Hello! How can I help you today?", 
                    "Hey! I'm your color blindness assistant!", 
                    "Welcome! What would you like to know about color blindness?"
                ],
                who: ["I am your Color Blindness Chatbot. What would you like to know about color blindness?"],
                goodbye: [
                    "Goodbye! Take care!", 
                    "See you later!", 
                    "Thanks for chatting!", 
                    "Have a great day!"
                ],
                thanks: [
                    "You're welcome!", 
                    "Happy to help!", 
                    "Glad I could assist!", 
                    "No problem at all!"
                ],
                okay: ["Great! What else would you like to ask?"],
                howAreYou: ["I'm fine and good! How can I help you today?"],
                video: ["Here's the video demonstration!"]
            },
            overview: {
                what: "Color blindness is a condition that affects how people see colors. It occurs when the cone cells in your eyes don't properly detect color differences. Most people with color blindness can still see colors, just differently than others do.",
                
                types: {
                    main: "There are several types of color blindness, each affecting color vision differently:",
                    protanopia: "Complete inability to see 🔴 red color. 🔴 Red appears ⚫ black, and certain shades of orange, 🟡 yellow, and 🟢 green all appear 🟡 yellow.",
                    deuteranopia: "Complete inability to see 🟢 green color. 🟢 Green appears beige, and reds appear brownish-yellow.",
                    tritanopia: "Very rare form where 🔵 blue appears 🟢 green and 🟡 yellow appears violet or light grey.",
                    monochromacy: "Complete inability to perceive color, seeing everything in shades of gray."
                },

                cause: `Color blindness occurs when photoreceptor cells in the retina, called cones, don't function properly. The retina contains three types of cones, each sensitive to red, green, or blue light wavelengths.

Main causes include:
1. Genetic Factors: The most common cause is inherited genetic mutation. Genes for red and green cone cells are on the X chromosome, making males more susceptible.
2. Eye or Optic Nerve Damage: Injuries, diseases like glaucoma or macular degeneration, or chemical exposure can damage the retina.
3. Medications or Health Conditions: Some medications or conditions like diabetes or multiple sclerosis can affect color vision.`,

                symptoms: "Common signs include difficulty distinguishing between certain colors, trouble matching colors, problems seeing colors in dim light, and frequently misidentifying colors.",

                diagnosis: `Color blindness can be diagnosed through specific tests:

1. Ishihara Test: Uses colored dot patterns to detect red-green color blindness
2. Anomaloscope: Device-based test for precise diagnosis
3. Farnsworth-Munsell 100 Hue Test: Arranging colored chips to identify subtle deficiencies
4. Online Tests: Initial screening (less reliable than clinical tests)

💡 I can provide the Ishihara Test, but visiting an eye care professional is recommended for proper diagnosis.`,

                treatment: "There's no cure for inherited color blindness, but special glasses, contact lenses, and mobile apps can help distinguish colors better.",

                impact: "Color blindness can affect daily activities like choosing clothes, cooking, and career options, but with adjustments, most people live normal lives.",

                copingStrategies: "People with color blindness can use strategies like labeling, seeking help with color-based tasks, or using mobile apps and technology to differentiate colors.",

                advancesInResearch: "Research in gene therapy, retinal implants, and specialized glasses is progressing. Studies are exploring ways to enhance color perception for those with color blindness.",

                adaptiveTechnologies: {
                    apps: "Mobile apps like 'Color Blind Pal' and 'EnChroma' help distinguish colors.",
                    glasses: "Special glasses like 'EnChroma' and 'Colorlite' enhance color perception by filtering specific light wavelengths.",
                    screenFilters: "Software like 'ColorOracle' changes screen colors to simulate color blindness."
                },

                prevalence: {
                    globalStats: "Approximately 8% of men and 0.5% of women worldwide experience some form of color blindness.",
                    statisticsByRegion: {
                        "North America": "Around 8% of men and 0.5% of women are affected.",
                        "Europe": "About 8% of men and less than 1% of women experience color blindness.",
                        "Asia": "6-7% of men are affected, with similar rates for women.",
                        "Africa": "Approximately 5-6% of men are affected, with much lower incidence in women."
                    }
                }
            },

            keywords: {
                who: ["your purpose", "what do you do", "who are u", "who are you", "purpose", "made"],
                next: ["okay", "ok", "good", "nice", "more"],
                test: ["test", "ishihara", "color test", "open test", "blindness test"],
                types: ["types", "different types", "kinds of color blindness", "color vision deficiency types"],
                symptoms: ["symptom", "signs", "issues", "difficulty", "symptoms"],
                treatment: ["treatment", "cure", "solutions", "fix", "manage", "treatments"],
                cause: ["causes", "cause", "how it happens", "reason", "happens", "factors"],
                impact: ["impact", "effect", "affects", "problems caused", "daily life impact"],
                diagnosis: ["diagnosis", "checkup", "test for", "how to know", "detect", "distinguish", "difference"],
                what: ["define", "explain", "color blindness meaning", "what do you know", "color blindness", "colorblindness"],
                coping: ["coping", "strategies", "living with", "adjustments", "dealing with color blindness"],
                research: ["research", "studies", "advances", "breakthroughs", "new treatments"],
                technology: ["adaptive technologies", "apps", "glasses", "screen filters"],
                prevalence: ["prevalence", "how many people", "percentage", "statistics", "how common"],
                howAreYou: ["how are you", "how r u", "how're you", "how you doing", "what's up"],
                video: ["video", "video demonstration", "show video", "demonstration", "demo"]
            },

            videos: {
                demo: [{
                    url: 'https://youtu.be/a1bUxdz-ZR0?si=fRqypOZtAef8sric',
                    title: "Understanding Color Blindness"
                }]
            }
        };
    }

    /**
     * Initialize test data for Ishihara color blindness test
     */
    initializeTestData() {
        return [
            { imgSrc: 'https://zenitharoma.store/wp-content/uploads/2024/11/plate1.gif', correctDigit: '12', correctWord: 'twelve' },
            { imgSrc: 'https://zenitharoma.store/wp-content/uploads/2024/11/plate2.jpg', correctDigit: '8', correctWord: 'eight' },
            { imgSrc: 'https://zenitharoma.store/wp-content/uploads/2024/11/plate3.webp', correctDigit: '6', correctWord: 'six' },
            { imgSrc: 'https://zenitharoma.store/wp-content/uploads/2024/11/plate4.webp', correctDigit: '29', correctWord: 'twenty nine' },
            { imgSrc: 'https://www.colorlitelens.com/images/Ishihara/Ishihara_01.jpg', correctDigit: '74', correctWord: 'seventy four' },
            { imgSrc: 'https://zenitharoma.store/wp-content/uploads/2024/11/plate6.png', correctDigit: '3', correctWord: 'three' },
            { imgSrc: 'https://zenitharoma.store/wp-content/uploads/2024/11/plate7.jpg', correctDigit: '15', correctWord: 'fifteen' },
            { imgSrc: 'https://zenitharoma.store/wp-content/uploads/2024/11/platelast.gif', correctDigit: 'orange line', correctWord: 'orange' },
            { imgSrc: 'https://www.colorlitelens.com/images/Ishihara/Ishihara_03.jpg', correctDigit: '16', correctWord: 'sixteen' },
            { imgSrc: 'https://www.colorlitelens.com/images/Ishihara/Ishihara_04.jpg', correctDigit: '2', correctWord: 'two' },
            { imgSrc: 'https://www.colorlitelens.com/images/Ishihara/Ishihara_07.jpg', correctDigit: '45', correctWord: 'forty five' },
            { imgSrc: 'https://www.colorlitelens.com/images/Ishihara/Ishihara_09.jpg', correctDigit: '97', correctWord: 'ninety seven' },
            { imgSrc: 'https://www.colorlitelens.com/images/Ishihara/Ishihara_11.jpg', correctDigit: '42', correctWord: 'forty two' }
        ];
    }

    /**
     * Set up all event listeners for user interactions
     */
    setupEventListeners() {
        // Quick reply buttons
        document.querySelectorAll('.quick-reply').forEach(button => {
            button.addEventListener('click', () => this.handleQuickReply(button.textContent));
        });

        // Main input and send button
        const sendButton = document.getElementById('send-button');
        const userInput = document.getElementById('user-input');
        const voiceButton = document.getElementById('voice-btn');
        const testButton = document.getElementById('test-button');

        if (sendButton && userInput) {
            sendButton.addEventListener('click', () => this.handleUserInput());
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserInput();
            });
        }

        if (voiceButton) {
            voiceButton.addEventListener('click', () => this.toggleVoiceInput());
        }

        if (testButton) {
            testButton.addEventListener('click', () => this.startColorBlindnessTest());
        }
    }

    /**
     * Set up speech recognition functionality
     */
    setupSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            console.warn('Speech recognition not supported in this browser');
            return;
        }

        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            window.speechSynthesis.cancel();
            const transcript = event.results[0][0].transcript;
            const userInput = document.getElementById('user-input');
            if (userInput) {
                userInput.value = transcript;
                this.handleUserInput();
            }
        };

        this.recognition.onend = () => {
            const voiceButton = document.getElementById('voice-btn');
            if (voiceButton) voiceButton.classList.remove('listening');
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            const voiceButton = document.getElementById('voice-btn');
            if (voiceButton) voiceButton.classList.remove('listening');
        };
    }

    /**
     * Toggle voice input on/off
     */
    toggleVoiceInput() {
        if (!this.recognition) {
            this.displayMessage("Speech recognition is not supported in this browser.", false);
            return;
        }

        const voiceButton = document.getElementById('voice-btn');
        if (!voiceButton) return;

        if (voiceButton.classList.contains('listening')) {
            this.recognition.stop();
            window.speechSynthesis.cancel();
        } else {
            voiceButton.classList.add('listening');
            this.recognition.start();
        }
    }

    /**
     * Handle user input from text field
     */
    handleUserInput() {
        window.speechSynthesis.cancel();
        const userInput = document.getElementById('user-input');
        const message = userInput?.value.trim();

        if (!message) return;

        this.displayMessage(message, true);
        this.processUserInput(message);
        if (userInput) userInput.value = '';
    }

    /**
     * Handle quick reply button clicks
     */
    handleQuickReply(question) {
        this.displayMessage(question, true);
        this.processUserInput(question);
    }

    /**
     * Display message in chat interface
     */
    displayMessage(message, isUser) {
        const chatContainer = document.getElementById('chat-container');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        if (!isUser) {
            this.speakResponse(message);
        }
    }

    /**
     * Convert text to speech
     */
    speakResponse(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.7;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }

    /**
     * Process user input and generate appropriate response
     */
    processUserInput(input) {
        const lowercaseInput = input.toLowerCase();

        // Handle test responses
        if (this.isTestActive) {
            this.handleTestAnswer(input);
            return;
        }

        // Check for specific keywords and respond accordingly
        if (this.containsKeywords(lowercaseInput, this.knowledge.keywords.howAreYou)) {
            this.respondWithRandom(this.knowledge.greetings.howAreYou);
        } else if (this.containsKeywords(lowercaseInput, this.knowledge.keywords.video)) {
            this.showVideoDemo();
        } else if (this.isGreeting(lowercaseInput)) {
            this.respondWithRandom(this.knowledge.greetings.hello);
        } else if (this.isFarewell(lowercaseInput)) {
            this.respondWithRandom(this.knowledge.greetings.goodbye);
        } else if (this.isThankYou(lowercaseInput)) {
            this.respondWithRandom(this.knowledge.greetings.thanks);
        } else if (this.containsKeywords(lowercaseInput, this.knowledge.keywords.test)) {
            this.startColorBlindnessTest();
        } else {
            this.handleTopicQuestions(lowercaseInput);
        }
    }

    /**
     * Handle topic-specific questions
     */
    handleTopicQuestions(input) {
        let response = "";

        if (this.containsKeywords(input, this.knowledge.keywords.types)) {
            response = this.formatTypesResponse();
        } else if (this.containsKeywords(input, this.knowledge.keywords.cause)) {
            response = this.knowledge.overview.cause;
        } else if (this.containsKeywords(input, this.knowledge.keywords.symptoms)) {
            response = this.knowledge.overview.symptoms;
        } else if (this.containsKeywords(input, this.knowledge.keywords.treatment)) {
            response = this.knowledge.overview.treatment;
        } else if (this.containsKeywords(input, this.knowledge.keywords.impact)) {
            response = this.knowledge.overview.impact;
        } else if (this.containsKeywords(input, this.knowledge.keywords.diagnosis)) {
            response = this.knowledge.overview.diagnosis;
        } else if (this.containsKeywords(input, this.knowledge.keywords.coping)) {
            response = this.knowledge.overview.copingStrategies;
        } else if (this.containsKeywords(input, this.knowledge.keywords.research)) {
            response = this.knowledge.overview.advancesInResearch;
        } else if (this.containsKeywords(input, this.knowledge.keywords.technology)) {
            response = this.formatAdaptiveTechnologies();
        } else if (this.containsKeywords(input, this.knowledge.keywords.prevalence)) {
            response = this.formatPrevalenceResponse();
        } else if (this.containsKeywords(input, this.knowledge.keywords.next)) {
            response = this.knowledge.greetings.okay[0];
        } else if (this.containsKeywords(input, this.knowledge.keywords.who)) {
            response = this.knowledge.greetings.who[0];
        } else if (this.containsKeywords(input, this.knowledge.keywords.what)) {
            response = this.knowledge.overview.what;
        } else {
            response = "I'm not sure about that. Try asking about types of color blindness, symptoms, treatments, global statistics, or request a diagnosis test.";
        }

        this.displayMessage(response, false);
    }

    /**
     * Start the color blindness test
     */
    startColorBlindnessTest() {
        this.isTestActive = true;
        this.currentTestIndex = 0;
        this.correctAnswers = 0;
        
        this.displayMessage("Let's start the Ishihara Color Blindness Test. I'll show you several plates, and you'll need to identify the number you see in each one. Let's begin!", false);
        setTimeout(() => this.showNextTestPlate(), 2000);
    }

    /**
     * Display the next test plate
     */
    showNextTestPlate() {
        if (this.currentTestIndex >= this.testData.length) {
            this.concludeTest();
            return;
        }

        const currentPlate = this.testData[this.currentTestIndex];
        const chatContainer = document.getElementById('chat-container');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');

        // Create and add image
        const img = document.createElement('img');
        img.src = currentPlate.imgSrc;
        img.style.cssText = `
            max-width: 220px;
            height: 220px;
            display: block;
            margin: 5px auto;
            border-radius: 30px;
        `;
        messageDiv.appendChild(img);

        // Add question text
        const questionText = document.createElement('p');
        questionText.textContent = "What number do you see in this image? You may see a digit or colored line.";
        messageDiv.appendChild(questionText);

        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    /**
     * Handle test answer submission
     */
    handleTestAnswer(answer) {
        const currentPlate = this.testData[this.currentTestIndex];
        const normalizedAnswer = answer.trim().toLowerCase();
        
        if (normalizedAnswer === currentPlate.correctDigit.toLowerCase() || 
            normalizedAnswer === currentPlate.correctWord.toLowerCase()) {
            this.correctAnswers++;
            this.displayMessage("Correct! Well done! 👍", false);
        } else {
            this.displayMessage(`That's not quite right. The number was ${currentPlate.correctDigit} (${currentPlate.correctWord})`, false);
        }

        this.currentTestIndex++;
        setTimeout(() => {
            if (this.currentTestIndex < this.testData.length) {
                this.showNextTestPlate();
            } else {
                this.concludeTest();
            }
        }, 2000);
    }

    /**
     * Conclude the test and provide results
     */
    concludeTest() {
        this.isTestActive = false;
        const score = (this.correctAnswers / this.testData.length) * 100;
        
        let assessment = "";
        if (score >= 70) {
            assessment = "Your color vision appears to be normal! 🎉";
        } else if (score >= 50) {
            assessment = "You may have mild color vision deficiency. Consider consulting an eye care professional for a complete evaluation.";
        } else {
            assessment = "You may have significant color vision deficiency. It's recommended to schedule an appointment with an eye care professional for a thorough examination.";
        }

        const finalMessage = `Test completed!
Your score: ${this.correctAnswers} out of ${this.testData.length} (${score.toFixed(1)}%)

${assessment}

Remember: This is just a screening test and not a medical diagnosis. For accurate results, please consult an eye care professional.`;

        this.displayMessage(finalMessage, false);
    }

    /**
     * Show video demonstration
     */
    showVideoDemo() {
        const video = this.knowledge.videos.demo[0];
        const chatContainer = document.getElementById('chat-container');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');

        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video-wrapper');

        const iframe = document.createElement('iframe');
        iframe.src = video.url.replace("youtu.be", "www.youtube.com/embed").split("?")[0];
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        videoWrapper.appendChild(iframe);
        messageDiv.appendChild(videoWrapper);

        const titleText = document.createElement('p');
        titleText.textContent = video.title;
        messageDiv.appendChild(titleText);

        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        this.displayMessage("Here's a video demonstration about color blindness. I hope this helps explain the concept better!", false);
    }

    // Utility methods
    containsKeywords(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    isGreeting(text) {
        const greetings = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"];
        return greetings.some(greeting => text.includes(greeting));
    }

    isThankYou(text) {
        const thanks = ["thanks", "thank you", "thanks a lot"];
        return thanks.some(thank => text.includes(thank));
    }

    isFarewell(text) {
        const farewells = ["bye", "goodbye", "see you", "farewell", "take care"];
        return farewells.some(farewell => text.includes(farewell));
    }

    respondWithRandom(responses) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        this.displayMessage(randomResponse, false);
    }

    formatTypesResponse() {
        const types = this.knowledge.overview.types;
        return `${types.main}\n\n1. Protanopia: ${types.protanopia}\n2. Deuteranopia: ${types.deuteranopia}\n3. Tritanopia: ${types.tritanopia}\n4. Monochromacy: ${types.monochromacy}`;
    }

    formatAdaptiveTechnologies() {
        const tech = this.knowledge.overview.adaptiveTechnologies;
        return `Adaptive Technologies for Color Blindness:\n\n• Apps: ${tech.apps}\n• Glasses: ${tech.glasses}\n• Screen Filters: ${tech.screenFilters}`;
    }

    formatPrevalenceResponse() {
        const prevalence = this.knowledge.overview.prevalence;
        return `Color Blindness Prevalence Statistics:\n\n• Global: ${prevalence.globalStats}\n• North America: ${prevalence.statisticsByRegion["North America"]}\n• Europe: ${prevalence.statisticsByRegion["Europe"]}\n• Asia: ${prevalence.statisticsByRegion["Asia"]}\n• Africa: ${prevalence.statisticsByRegion["Africa"]}\n\nColor blindness is more common in men due to X-linked inheritance patterns.`;
    }

    sendWelcomeMessage() {
        const welcomeMessage = "Hello! I'm here to help you learn about color blindness. What would you like to know?";
        this.displayMessage(welcomeMessage, false);
    }

    loadVoices() {
        // Load available voices for speech synthesis
        if ('speechSynthesis' in window) {
            speechSynthesis.getVoices();
        }
    }
}

// Initialize the bot when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new ColorBlindnessBot();
});

