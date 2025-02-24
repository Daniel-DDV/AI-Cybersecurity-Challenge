// Quiz vragen en antwoorden
window.questions = [
    {
        question: "Je wilt snel een audio-opname van een vergadering laten transcriberen. Wat is de veiligste optie?",
        answers: [
            { 
                text: "Een gratis transcriptie-app uit de App Store downloaden die je collega aanraadt", 
                correct: false,
                explanation: "Gratis apps kunnen gevoelige informatie delen zonder dat je het weet en voldoen mogelijk niet aan veiligheidseisen."
            },
            { 
                text: "De opname naar je privé-e-mail sturen en thuis transcriberen met je eigen AI-tools", 
                correct: false,
                explanation: "Het versturen van werkgerelateerde informatie naar privé-accounts en het gebruik van ongeautoriseerde tools schendt meestal het informatiebeleid."
            },
            { 
                text: "De door je organisatie goedgekeurde transcriptiedienst gebruiken", 
                correct: true,
                explanation: "Door goedgekeurde diensten te gebruiken, blijft gevoelige informatie binnen de beveiligde omgeving van je organisatie en wordt voldaan aan de compliance-eisen."
            }
        ]
    },
    {
        question: "Een collega stuurt je via WhatsApp een link naar een document over een urgent project. Wat doe je?",
        answers: [
            { 
                text: "Direct op de link klikken, het is immers een collega die je vertrouwt", 
                correct: false,
                explanation: "Zelfs bekenden kunnen gehackt zijn of per ongeluk kwaadaardige links delen."
            },
            { 
                text: "De collega via een ander kanaal (telefonisch of in persoon) vragen of zij deze link daadwerkelijk heeft gestuurd", 
                correct: true,
                explanation: "Door via een ander kanaal te verifiëren, bescherm je jezelf tegen phishing en spoofing-aanvallen waarbij aanvallers zich voordoen als bekenden."
            },
            { 
                text: "De link doorsturen naar andere teamleden om te vragen of zij het document ook hebben ontvangen", 
                correct: false,
                explanation: "Het doorsturen van verdachte links kan leiden tot verdere verspreiding van malware of phishing-aanvallen."
            }
        ]
    },
    {
        question: "Je gebruikt ChatGPT voor je werk. Welke informatie kun je veilig delen?",
        answers: [
            { 
                text: "Geanonimiseerde beleidsteksten zonder persoonsgegevens", 
                correct: false,
                explanation: "Zelfs geanonimiseerde data kan potentieel herleidbaar zijn tot individuen of gevoelige informatie bevatten."
            },
            { 
                text: "Interne vergadernotulen zonder gevoelige informatie", 
                correct: false,
                explanation: "Vergadernotulen kunnen nog steeds vertrouwelijke informatie bevatten die niet gedeeld mag worden met externe partijen."
            },
            { 
                text: "Geen van beide, je mag geen werkinformatie delen met externe AI-tools zonder toestemming", 
                correct: true,
                explanation: "Externe AI-tools zoals ChatGPT slaan gebruikersgegevens op, wat kan leiden tot onbedoelde datadeling. Toestemming van je organisatie is nodig."
            }
        ]
    },
    {
        question: "Een nieuwe AI-tool belooft je werkprocessen te versnellen. Wat is de juiste aanpak?",
        answers: [
            { 
                text: "De tool meteen installeren en uitproberen om te zien of het werkt", 
                correct: false,
                explanation: "Het installeren van ongeautoriseerde software kan leiden tot beveiligingsrisico's en compatibiliteitsproblemen."
            },
            { 
                text: "Eerst toestemming vragen aan je leidinggevende voordat je het gebruikt", 
                correct: false,
                explanation: "Leidinggevenden zijn mogelijk niet op de hoogte van de beveiligingsrisico's en technische vereisten van de tool."
            },
            { 
                text: "De tool eerst voorleggen aan de IT-afdeling voor een veiligheidscheck en daarna formele goedkeuring aanvragen", 
                correct: true,
                explanation: "IT-afdelingen moeten nieuwe software evalueren op veiligheidsrisico's en compatibiliteit voordat deze wordt gebruikt in de werkomgeving."
            }
        ]
    },
    {
        question: "Je werkt thuis aan een beleidsdocument. Wat is de veiligste manier om dit te doen?",
        answers: [
            { 
                text: "Op je privé-laptop werken en het document later naar je werkmail sturen", 
                correct: false,
                explanation: "Het gebruik van privé-apparaten en het versturen van werkgerelateerde informatie naar persoonlijke accounts kan leiden tot beveiligingsrisico's."
            },
            { 
                text: "Werken op je dienst-laptop met VPN-verbinding en het document opslaan in de beveiligde werkomgeving", 
                correct: true,
                explanation: "Werken via een VPN op je dienst-laptop zorgt voor een beveiligde verbinding en houdt alle data binnen de beveiligde werkomgeving."
            },
            { 
                text: "Werken op een openbare computer en het document opslaan in je persoonlijke cloud-opslag", 
                correct: false,
                explanation: "Openbare computers en persoonlijke cloud-opslag zijn niet beveiligd en kunnen leiden tot datadiefstal of ongeautoriseerde toegang."
            }
        ]
    },
    {
        question: "Je ontdekt dat een AI-model dat gebruikt wordt voor besluitvorming vooroordelen vertoont tegen bepaalde bevolkingsgroepen. Wat doe je?",
        answers: [
            { 
                text: "Niets, alle AI-systemen hebben wel enige vorm van bias", 
                correct: false,
                explanation: "Hoewel bias in AI-systemen gebruikelijk is, moet het worden aangepakt om discriminatie te voorkomen."
            },
            { 
                text: "Het direct melden bij de verantwoordelijke en aandringen op evaluatie en correctie van het model", 
                correct: true,
                explanation: "Bias in AI-systemen voor overheidsbeslissingen kan leiden tot discriminatie en moet direct worden aangepakt om eerlijke behandeling te waarborgen."
            },
            { 
                text: "De resultaten handmatig corrigeren zonder het probleem te melden", 
                correct: false,
                explanation: "Het handmatig corrigeren van resultaten zonder het onderliggende probleem aan te pakken lost de oorzaak niet op en kan leiden tot verdere fouten."
            }
        ]
    },
    {
        question: "Je ontvangt een voicemail waarin je directeur je met spoed vraagt om geld over te maken naar een nieuw rekeningnummer. Wat doe je?",
        answers: [
            { 
                text: "Je maakt het geld direct over; je directeur klinkt gehaast en het is urgent", 
                correct: false,
                explanation: "Het direct overmaken van geld zonder verificatie kan leiden tot financiële verliezen door oplichting."
            },
            { 
                text: "Je controleert persoonlijk bij je directeur of dit verzoek legitiem is via een ander communicatiekanaal", 
                correct: true,
                explanation: "Persoonlijke verificatie via een ander kanaal is essentieel om deepfake audio-aanvallen tegen te gaan, die steeds overtuigender worden."
            },
            { 
                text: "Je stuurt een e-mail naar het bekende e-mailadres van je directeur om te bevestigen", 
                correct: false,
                explanation: "E-mails kunnen worden gehackt of gespoofd, waardoor verificatie via een ander kanaal noodzakelijk is."
            }
        ]
    },
    {
        question: "Een AI-tool die je gebruikt voor een rapport geeft informatie die onjuist lijkt. Wat is de beste actie?",
        answers: [
            { 
                text: "Je neemt de informatie over, AI maakt zelden fouten", 
                correct: false,
                explanation: "AI kan fouten maken, en het overnemen van onjuiste informatie kan leiden tot onjuiste conclusies."
            },
            { 
                text: "Je verifieert de gegevens met betrouwbare bronnen voordat je ze gebruikt", 
                correct: true,
                explanation: "AI kan hallucineren of onjuiste informatie genereren; verificatie met betrouwbare bronnen is essentieel voor accuraatheid."
            },
            { 
                text: "Je gebruikt de informatie, maar voegt een disclaimer toe dat het van AI afkomstig is", 
                correct: false,
                explanation: "Het toevoegen van een disclaimer is niet voldoende om de risico's van onjuiste informatie te mitigeren."
            }
        ]
    },
    {
        question: "Je werk aan een gevoelig project. Welke optie is het veiligst voor het delen van documenten?",
        answers: [
            { 
                text: "De documenten delen via WeTransfer met een wachtwoord in een aparte e-mail", 
                correct: false,
                explanation: "Het delen van documenten via onbeveiligde kanalen en het gebruik van wachtwoorden via e-mail kan leiden tot beveiligingsrisico's."
            },
            { 
                text: "De beveiligde samenwerkingsomgeving van je organisatie gebruiken", 
                correct: true,
                explanation: "Beveiligde samenwerkingsomgevingen van de organisatie zijn specifiek ontworpen om aan security- en compliance-eisen te voldoen."
            },
            { 
                text: "Een gedeelde map aanmaken in je persoonlijke Dropbox-account", 
                correct: false,
                explanation: "Persoonlijke cloud-opslag is niet beveiligd en kan leiden tot ongeautoriseerde toegang tot gevoelige informatie."
            }
        ]
    },
    {
        question: "Je krijgt een videogesprek van iemand die zegt van een partnerorganisatie te zijn en dringend toegang nodig heeft tot een gedeeld systeem. Wat doe je?",
        answers: [
            { 
                text: "Je geeft de toegangsgegevens omdat het urgent klinkt en de persoon betrouwbaar lijkt", 
                correct: false,
                explanation: "Het verstrekken van toegangsgegevens zonder verificatie kan leiden tot ongeautoriseerde toegang tot gevoelige informatie."
            },
            { 
                text: "Je controleert de identiteit van de persoon via officiële kanalen voordat je actie onderneemt", 
                correct: true,
                explanation: "Identiteitsverificatie via officiële kanalen is essentieel, vooral nu deepfake-video's steeds realistischer worden."
            },
            { 
                text: "Je verwijst de persoon direct door naar je leidinggevende zonder verdere controle", 
                correct: false,
                explanation: "Het doorverwijzen van de persoon zonder verificatie kan leiden tot verdere beveiligingsrisico's."
            }
        ]
    },
    {
        question: "Wat moet je doen als een AI-tool een grote hoeveelheid persoonsgegevens verwerkt voor analyse?",
        answers: [
            { 
                text: "Zorgen dat alleen geanonimiseerde gegevens worden gebruikt en een DPIA (gegevensbeschermingseffectbeoordeling) wordt uitgevoerd", 
                correct: true,
                explanation: "Een DPIA is wettelijk verplicht bij grootschalige verwerking van persoonsgegevens en anonimisering vermindert privacy-risico's."
            },
            { 
                text: "De analyse uitvoeren omdat AI de gegevens toch niet begrijpt zoals een mens dat doet", 
                correct: false,
                explanation: "AI kan gegevens verwerken en analyseren, maar dit betekent niet dat het geen risico's voor de privacy met zich meebrengt."
            },
            { 
                text: "Zo min mogelijk mensen inlichten om privacyrisico's te beperken", 
                correct: false,
                explanation: "Het beperken van de kennis over de verwerking van persoonsgegevens is niet voldoende om privacyrisico's te mitigeren."
            }
        ]
    },
    {
        question: "Je collega gebruikt AI om brieven aan burgers te schrijven. Wat is de beste aanpak?",
        answers: [
            { 
                text: "Alle brieven direct versturen; AI maakt geen fouten", 
                correct: false,
                explanation: "AI kan fouten maken, en het direct versturen van brieven zonder controle kan leiden tot onjuiste of ongepaste communicatie."
            },
            { 
                text: "Steekproefsgewijs controleren op fouten en ongepaste toon", 
                correct: false,
                explanation: "Steekproefsgewijs controleren is niet voldoende om alle fouten en ongepaste formuleringen te detecteren."
            },
            { 
                text: "Elke brief zorgvuldig controleren op accuraatheid, toon en passendheid voordat deze wordt verzonden", 
                correct: true,
                explanation: "AI kan fouten, onjuistheden of ongepaste formuleringen bevatten; menselijke controle waarborgt kwaliteit en correcte communicatie."
            }
        ]
    },
    {
        question: "Je ontdekt een datalek bij je afdeling. Wat doe je eerst?",
        answers: [
            { 
                text: "Je meldt het direct bij de Autoriteit Persoonsgegevens", 
                correct: false,
                explanation: "Het direct melden bij de Autoriteit Persoonsgegevens zonder interne melding kan leiden tot onnodige vertragingen en onjuiste afhandeling."
            },
            { 
                text: "Je informeert eerst je leidinggevende en de privacy officer van je organisatie", 
                correct: true,
                explanation: "Volgens protocollen moet je eerst intern melden zodat de juiste procedures in gang kunnen worden gezet door verantwoordelijke functionarissen."
            },
            { 
                text: "Je probeert eerst zelf het lek te dichten voordat je iemand informeert", 
                correct: false,
                explanation: "Het zelf proberen te dichten van het lek zonder interne melding kan leiden tot verdere beveiligingsrisico's en onjuiste afhandeling."
            }
        ]
    },
    {
        question: "Je herkent dat een AI-model dat je organisatie gebruikt mogelijk bevooroordeeld is bij het analyseren van subsidieaanvragen. Wat is de beste aanpak?",
        answers: [
            { 
                text: "Het systeem blijven gebruiken maar alleen voor een eerste screening", 
                correct: false,
                explanation: "Het blijven gebruiken van een bevooroordeeld systeem kan leiden tot onjuiste beslissingen en discriminatie."
            },
            { 
                text: "Dit melden en aandringen op onderzoek naar de trainingsdata en algoritmes van het model", 
                correct: true,
                explanation: "Systematische bias moet bij de bron worden aangepakt door het model en de trainingsdata te onderzoeken en te corrigeren."
            },
            { 
                text: "De aanbeveling negeren omdat AI niet geschikt is voor beleidsbeslissingen", 
                correct: false,
                explanation: "Het negeren van de aanbeveling zonder onderzoek naar de oorzaak van de bias is niet voldoende om het probleem op te lossen."
            }
        ]
    },
    {
        question: "Je vindt een USB-stick op de parkeerplaats van het kantoor met het logo van je organisatie erop. Wat doe je?",
        answers: [
            { 
                text: "De USB-stick aansluiten op je computer om te zien wat erop staat en wie de eigenaar is", 
                correct: false,
                explanation: "Het aansluiten van de USB-stick op je computer kan leiden tot malware-infecties en beveiligingsrisico's."
            },
            { 
                text: "De USB-stick afgeven bij de receptie of lost-and-found zonder deze te openen", 
                correct: false,
                explanation: "Het afgeven van de USB-stick zonder onderzoek kan leiden tot ongeautoriseerde toegang tot gevoelige informatie."
            },
            { 
                text: "De USB-stick inleveren bij de IT-afdeling zonder deze aan te sluiten op apparatuur", 
                correct: true,
                explanation: "De IT-afdeling kan de USB-stick veilig onderzoeken in een geïsoleerde omgeving om malware te detecteren; dit is een bekende aanvalsmethode."
            }
        ]
    },
    {
        question: "Wanneer moet je extra kritisch zijn op de output van een AI-systeem?",
        answers: [
            { 
                text: "Als het antwoorden geeft over zeer recente gebeurtenissen of specifieke details", 
                correct: true,
                explanation: "AI-systemen hebben vaak beperkte of verouderde kennis en kunnen 'hallucineren' bij vragen over recente gebeurtenissen of zeer specifieke details."
            },
            { 
                text: "Als het een populair AI-systeem is dat veel gebruikt wordt binnen je organisatie", 
                correct: false,
                explanation: "Populariteit is geen garantie voor de nauwkeurigheid of betrouwbaarheid van een AI-systeem."
            },
            { 
                text: "Als het antwoorden geeft die kort en bondig zijn", 
                correct: false,
                explanation: "Korte en bondige antwoorden kunnen nog steeds onjuist of onvolledig zijn."
            }
        ]
    },
    {
        question: "Je bent op een openbare wifi, bijvoorbeeld in de trein. Hoe werk je veilig?",
        answers: [
            { 
                text: "Alleen websites bezoeken die beginnen met https://", 
                correct: false,
                explanation: "HTTPS is niet voldoende om je gegevens te beschermen tegen afluisteren op openbare netwerken."
            },
            { 
                text: "Een VPN-verbinding gebruiken die door je organisatie is goedgekeurd", 
                correct: true,
                explanation: "Een VPN creëert een beveiligde tunnel voor al je internetverkeer, waardoor je gegevens beschermd zijn tegen afluisteren op openbare netwerken."
            },
            { 
                text: "Geen vertrouwelijke informatie bekijken als er mensen kunnen meekijken op je scherm", 
                correct: false,
                explanation: "Het vermijden van vertrouwelijke informatie is niet voldoende om je gegevens te beschermen tegen afluisteren op openbare netwerken."
            }
        ]
    },
    {
        question: "Een AI-tool stelt voor om een grootschalige beleidswijziging door te voeren op basis van zijn analyse. Wat doe je?",
        answers: [
            { 
                text: "De aanbeveling direct implementeren omdat AI objectiever is dan menselijke beleidsmakers", 
                correct: false,
                explanation: "AI kan bevooroordeeld zijn en menselijke evaluatie is nodig om de betrouwbaarheid te beoordelen."
            },
            { 
                text: "De onderliggende data, aannames en methoden kritisch evalueren voordat je een beslissing neemt", 
                correct: true,
                explanation: "Kritische evaluatie van de onderliggende data en methoden is essentieel om de betrouwbaarheid van AI-aanbevelingen te beoordelen."
            },
            { 
                text: "De aanbeveling negeren omdat AI niet geschikt is voor beleidsbeslissingen", 
                correct: false,
                explanation: "Het negeren van de aanbeveling zonder evaluatie is niet voldoende om de betrouwbaarheid te beoordelen."
            }
        ]
    },
    {
        question: "Je krijgt een telefoontje waarin iemand zich voordoet als je collega maar met een vreemde stem vanwege 'verkoudheid'. Deze persoon vraagt om gevoelige informatie. Wat doe je?",
        answers: [
            { 
                text: "Je deelt de informatie omdat je de collega wilt helpen", 
                correct: false,
                explanation: "Het delen van gevoelige informatie zonder verificatie kan leiden tot ongeautoriseerde toegang."
            },
            { 
                text: "Je belt de echte collega via het bekende telefoonnummer om te verifiëren of het verzoek legitiem is", 
                correct: true,
                explanation: "Door de echte collega te bellen via een bekend nummer, bescherm je jezelf tegen stemimitatie en voice deepfakes."
            },
            { 
                text: "Je stuurt de informatie via e-mail naar het werkadres van de collega", 
                correct: false,
                explanation: "E-mails kunnen worden gehackt of gespoofd, waardoor verificatie via een ander kanaal noodzakelijk is."
            }
        ]
    },
    {
        question: "Wat is de meest effectieve manier om te voorkomen dat AI-tools onbedoeld gevoelige overheidsinformatie lekken?",
        answers: [
            { 
                text: "AI-tools volledig verbieden binnen de organisatie", 
                correct: false,
                explanation: "Het volledig verbieden van AI-tools is niet praktisch en kan innovatie belemmeren."
            },
            { 
                text: "Duidelijk beleid opstellen over welke gegevens gedeeld mogen worden, beveiligde AI-omgevingen creëren, en medewerkers opleiden", 
                correct: true,
                explanation: "Een combinatie van beleid, beveiligde omgevingen en opleiding biedt een evenwichtige aanpak die zowel veiligheid als innovatie mogelijk maakt."
            },
            { 
                text: "Alleen gebruik maken van gratis, openbare AI-tools die geen data opslaan", 
                correct: false,
                explanation: "Gratis, openbare AI-tools zijn mogelijk niet beveiligd en kunnen nog steeds gevoelige informatie lekken."
            }
        ]
    }
];
