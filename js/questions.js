const questions = [
    {
        question: "Je wilt snel een audio-opname van een vergadering laten transcriberen. Wat is de veiligste optie?",
        answers: [
            { text: "Een gratis transcriptie-app uit de App Store downloaden die je collega aanraadt", correct: false },
            { text: "De opname naar je privé-e-mail sturen en thuis transcriberen met je eigen AI-tools", correct: false },
            { text: "De door je organisatie goedgekeurde transcriptiedienst gebruiken", correct: true }
        ],
        explanation: "Door goedgekeurde diensten te gebruiken, blijft gevoelige informatie binnen de beveiligde omgeving van je organisatie en wordt voldaan aan de compliance-eisen."
    },
    {
        question: "Een collega stuurt je via WhatsApp een link naar een document over een urgent project. Wat doe je?",
        answers: [
            { text: "Direct op de link klikken, het is immers een collega die je vertrouwt", correct: false },
            { text: "De collega via een ander kanaal (telefonisch of in persoon) vragen of zij deze link daadwerkelijk heeft gestuurd", correct: true },
            { text: "De link doorsturen naar andere teamleden om te vragen of zij het document ook hebben ontvangen", correct: false }
        ],
        explanation: "Door via een ander kanaal te verifiëren, bescherm je jezelf tegen phishing en spoofing-aanvallen waarbij aanvallers zich voordoen als bekenden."
    },
    {
        question: "Je gebruikt ChatGPT voor je werk. Welke informatie kun je veilig delen?",
        answers: [
            { text: "Geanonimiseerde beleidsteksten zonder persoonsgegevens", correct: false },
            { text: "Interne vergadernotulen zonder gevoelige informatie", correct: false },
            { text: "Geen van beide, je mag geen werkinformatie delen met externe AI-tools zonder toestemming", correct: true }
        ],
        explanation: "Externe AI-tools zoals ChatGPT slaan gebruikersgegevens op, wat kan leiden tot onbedoelde datadeling. Toestemming van je organisatie is nodig."
    },
    {
        question: "Een nieuwe AI-tool belooft je werkprocessen te versnellen. Wat is de juiste aanpak?",
        answers: [
            { text: "De tool meteen installeren en uitproberen om te zien of het werkt", correct: false },
            { text: "Eerst toestemming vragen aan je leidinggevende voordat je het gebruikt", correct: false },
            { text: "De tool eerst voorleggen aan de IT-afdeling voor een veiligheidscheck en daarna formele goedkeuring aanvragen", correct: true }
        ],
        explanation: "IT-afdelingen moeten nieuwe software evalueren op veiligheidsrisico's en compatibiliteit voordat deze wordt gebruikt in de werkomgeving."
    },
    {
        question: "Je werkt thuis aan een beleidsdocument. Wat is de veiligste manier om dit te doen?",
        answers: [
            { text: "Op je privé-laptop werken en het document later naar je werkmail sturen", correct: false },
            { text: "Werken op je dienst-laptop met VPN-verbinding en het document opslaan in de beveiligde werkomgeving", correct: true },
            { text: "Werken op een openbare computer en het document opslaan in je persoonlijke cloud-opslag", correct: false }
        ],
        explanation: "Werken via een VPN op je dienst-laptop zorgt voor een beveiligde verbinding en houdt alle data binnen de beveiligde werkomgeving."
    },
    {
        question: "Je ontdekt dat een AI-model dat gebruikt wordt voor besluitvorming vooroordelen vertoont tegen bepaalde bevolkingsgroepen. Wat doe je?",
        answers: [
            { text: "Niets, alle AI-systemen hebben wel enige vorm van bias", correct: false },
            { text: "Het direct melden bij de verantwoordelijke en aandringen op evaluatie en correctie van het model", correct: true },
            { text: "De resultaten handmatig corrigeren zonder het probleem te melden", correct: false }
        ],
        explanation: "Bias in AI-systemen voor overheidsbeslissingen kan leiden tot discriminatie en moet direct worden aangepakt om eerlijke behandeling te waarborgen."
    },
    {
        question: "Je ontvangt een voicemail waarin je directeur je met spoed vraagt om geld over te maken naar een nieuw rekeningnummer. Wat doe je?",
        answers: [
            { text: "Je maakt het geld direct over; je directeur klinkt gehaast en het is urgent", correct: false },
            { text: "Je controleert persoonlijk bij je directeur of dit verzoek legitiem is via een ander communicatiekanaal", correct: true },
            { text: "Je stuurt een e-mail naar het bekende e-mailadres van je directeur om te bevestigen", correct: false }
        ],
        explanation: "Persoonlijke verificatie via een ander kanaal is essentieel om deepfake audio-aanvallen tegen te gaan, die steeds overtuigender worden."
    },
    {
        question: "Een AI-tool die je gebruikt voor een rapport geeft informatie die onjuist lijkt. Wat is de beste actie?",
        answers: [
            { text: "Je neemt de informatie over, AI maakt zelden fouten", correct: false },
            { text: "Je verifieert de gegevens met betrouwbare bronnen voordat je ze gebruikt", correct: true },
            { text: "Je gebruikt de informatie, maar voegt een disclaimer toe dat het van AI afkomstig is", correct: false }
        ],
        explanation: "AI kan hallucineren of onjuiste informatie genereren; verificatie met betrouwbare bronnen is essentieel voor accuraatheid."
    },
    {
        question: "Je werk aan een gevoelig project. Welke optie is het veiligst voor het delen van documenten?",
        answers: [
            { text: "De documenten delen via WeTransfer met een wachtwoord in een aparte e-mail", correct: false },
            { text: "De beveiligde samenwerkingsomgeving van je organisatie gebruiken", correct: true },
            { text: "Een gedeelde map aanmaken in je persoonlijke Dropbox-account", correct: false }
        ],
        explanation: "Beveiligde samenwerkingsomgevingen van de organisatie zijn specifiek ontworpen om aan security- en compliance-eisen te voldoen."
    },
    {
        question: "Je krijgt een videogesprek van iemand die zegt van een partnerorganisatie te zijn en dringend toegang nodig heeft tot een gedeeld systeem. Wat doe je?",
        answers: [
            { text: "Je geeft de toegangsgegevens omdat het urgent klinkt en de persoon betrouwbaar lijkt", correct: false },
            { text: "Je controleert de identiteit van de persoon via officiële kanalen voordat je actie onderneemt", correct: true },
            { text: "Je verwijst de persoon direct door naar je leidinggevende zonder verdere controle", correct: false }
        ],
        explanation: "Identiteitsverificatie via officiële kanalen is essentieel, vooral nu deepfake-video's steeds realistischer worden."
    },
    {
        question: "Wat moet je doen als een AI-tool een grote hoeveelheid persoonsgegevens verwerkt voor analyse?",
        answers: [
            { text: "Zorgen dat alleen geanonimiseerde gegevens worden gebruikt en een DPIA (gegevensbeschermingseffectbeoordeling) wordt uitgevoerd", correct: true },
            { text: "De analyse uitvoeren omdat AI de gegevens toch niet begrijpt zoals een mens dat doet", correct: false },
            { text: "Zo min mogelijk mensen inlichten om privacyrisico's te beperken", correct: false }
        ],
        explanation: "Een DPIA is wettelijk verplicht bij grootschalige verwerking van persoonsgegevens en anonimisering vermindert privacy-risico's."
    },
    {
        question: "Je collega gebruikt AI om brieven aan burgers te schrijven. Wat is de beste aanpak?",
        answers: [
            { text: "Alle brieven direct versturen; AI maakt geen fouten", correct: false },
            { text: "Steekproefsgewijs controleren op fouten en ongepaste toon", correct: false },
            { text: "Elke brief zorgvuldig controleren op accuraatheid, toon en passendheid voordat deze wordt verzonden", correct: true }
        ],
        explanation: "AI kan fouten, onjuistheden of ongepaste formuleringen bevatten; menselijke controle waarborgt kwaliteit en correcte communicatie."
    },
    {
        question: "Je ontdekt een datalek bij je afdeling. Wat doe je eerst?",
        answers: [
            { text: "Je meldt het direct bij de Autoriteit Persoonsgegevens", correct: false },
            { text: "Je informeert eerst je leidinggevende en de privacy officer van je organisatie", correct: true },
            { text: "Je probeert eerst zelf het lek te dichten voordat je iemand informeert", correct: false }
        ],
        explanation: "Volgens protocollen moet je eerst intern melden zodat de juiste procedures in gang kunnen worden gezet door verantwoordelijke functionarissen."
    },
    {
        question: "Je herkent dat een AI-model dat je organisatie gebruikt mogelijk bevooroordeeld is bij het analyseren van subsidieaanvragen. Wat is de beste aanpak?",
        answers: [
            { text: "Het systeem blijven gebruiken maar alleen voor een eerste screening", correct: false },
            { text: "Dit melden en aandringen op onderzoek naar de trainingsdata en algoritmes van het model", correct: true },
            { text: "De aanbeveling negeren omdat AI niet geschikt is voor beleidsbeslissingen", correct: false }
        ],
        explanation: "Systematische bias moet bij de bron worden aangepakt door het model en de trainingsdata te onderzoeken en te corrigeren."
    },
    {
        question: "Je vindt een USB-stick op de parkeerplaats van het kantoor met het logo van je organisatie erop. Wat doe je?",
        answers: [
            { text: "De USB-stick aansluiten op je computer om te zien wat erop staat en wie de eigenaar is", correct: false },
            { text: "De USB-stick afgeven bij de receptie of lost-and-found zonder deze te openen", correct: false },
            { text: "De USB-stick inleveren bij de IT-afdeling zonder deze aan te sluiten op apparatuur", correct: true }
        ],
        explanation: "De IT-afdeling kan de USB-stick veilig onderzoeken in een geïsoleerde omgeving om malware te detecteren; dit is een bekende aanvalsmethode."
    },
    {
        question: "Wanneer moet je extra kritisch zijn op de output van een AI-systeem?",
        answers: [
            { text: "Als het antwoorden geeft over zeer recente gebeurtenissen of specifieke details", correct: true },
            { text: "Als het een populair AI-systeem is dat veel gebruikt wordt binnen je organisatie", correct: false },
            { text: "Als het antwoorden geeft die kort en bondig zijn", correct: false }
        ],
        explanation: "AI-systemen hebben vaak beperkte of verouderde kennis en kunnen 'hallucineren' bij vragen over recente gebeurtenissen of zeer specifieke details."
    },
    {
        question: "Je bent op een openbare wifi, bijvoorbeeld in de trein. Hoe werk je veilig?",
        answers: [
            { text: "Alleen websites bezoeken die beginnen met https://", correct: false },
            { text: "Een VPN-verbinding gebruiken die door je organisatie is goedgekeurd", correct: true },
            { text: "Geen vertrouwelijke informatie bekijken als er mensen kunnen meekijken op je scherm", correct: false }
        ],
        explanation: "Een VPN creëert een beveiligde tunnel voor al je internetverkeer, waardoor je gegevens beschermd zijn tegen afluisteren op openbare netwerken."
    },
    {
        question: "Een AI-tool stelt voor om een grootschalige beleidswijziging door te voeren op basis van zijn analyse. Wat doe je?",
        answers: [
            { text: "De aanbeveling direct implementeren omdat AI objectiever is dan menselijke beleidsmakers", correct: false },
            { text: "De onderliggende data, aannames en methoden kritisch evalueren voordat je een beslissing neemt", correct: true },
            { text: "De aanbeveling negeren omdat AI niet geschikt is voor beleidsbeslissingen", correct: false }
        ],
        explanation: "Kritische evaluatie van de onderliggende data en methoden is essentieel om de betrouwbaarheid van AI-aanbevelingen te beoordelen."
    },
    {
        question: "Je krijgt een telefoontje waarin iemand zich voordoet als je collega maar met een vreemde stem vanwege 'verkoudheid'. Deze persoon vraagt om gevoelige informatie. Wat doe je?",
        answers: [
            { text: "Je deelt de informatie omdat je de collega wilt helpen", correct: false },
            { text: "Je belt de echte collega via het bekende telefoonnummer om te verifiëren of het verzoek legitiem is", correct: true },
            { text: "Je stuurt de informatie via e-mail naar het werkadres van de collega", correct: false }
        ],
        explanation: "Door de echte collega te bellen via een bekend nummer, bescherm je jezelf tegen stemimitatie en voice deepfakes."
    },
    {
        question: "Wat is de meest effectieve manier om te voorkomen dat AI-tools onbedoeld gevoelige overheidsinformatie lekken?",
        answers: [
            { text: "AI-tools volledig verbieden binnen de organisatie", correct: false },
            { text: "Duidelijk beleid opstellen over welke gegevens gedeeld mogen worden, beveiligde AI-omgevingen creëren, en medewerkers opleiden", correct: true },
            { text: "Alleen gebruik maken van gratis, openbare AI-tools die geen data opslaan", correct: false }
        ],
        explanation: "Een combinatie van beleid, beveiligde omgevingen en opleiding biedt een evenwichtige aanpak die zowel veiligheid als innovatie mogelijk maakt."
    }
];
