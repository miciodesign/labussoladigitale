# Piano editoriale La Bussola Digitale

Regole per chi scrive (persona o sistema automatico):

- Ogni articolo va in `_src/content/articoli/AAAA-MM-GG-slug.md` con front matter: title, slug, category, date, description, (pillar: true solo per le guide di partenza), image e image_png se c'è un'illustrazione in `_src/static/img/`.
- Tipi: A = confronto strumenti (2-4 strumenti reali, tabella con prezzo in euro e data di rilevazione, pro/contro, un consiglio chiaro per tipo di lettore: forfettario, professionista, piccola società, studente); P = problema risolto passo per passo ("come fare X"); I = informativo.
- Lunghezza: A e P 1.000-1.500 parole, I 800-1.200. Tono: pratico, diretto, seconda persona, niente gergo, niente elenchi di virtù. Nessun tema legato a servizi ambientali, rifiuti, energia, pubblica amministrazione o attività di rappresentanza.
- Ogni articolo linka la guida di partenza della sua sezione e almeno un altro articolo del sito. I link ai produttori sono normali finché il programma di affiliazione non è approvato; alla approvazione il link viene sostituito su tutti gli articoli. I link esterni ricevono automaticamente rel="nofollow sponsored".
- Disclosure: il template la inserisce in testa a ogni articolo; non ripeterla nel testo.
- Illustrazione: per le guide di partenza creare un SVG schematico 1200x700 (palette: #f6f4ef fondo, #16213a inchiostro, #1f9d6a verde, #4fd1a5 verde chiaro, #e2e0d8 linee; font Outfit) e il PNG corrispondente.
- Dopo la scrittura: `python3 _src/build.py`, controllo link interni, commit e push su main. Aggiornare lo stato qui sotto.
- Controllo prezzi mensile (il 1° di ogni mese, attività pianificata separata): per ogni articolo pubblicato si riaprono le pagine ufficiali elencate in "Fonti e prezzi verificati" e si confrontano con i prezzi scritti nel testo. Se un prezzo è cambiato si correggono tabella, testo e sezione fonti, si aggiorna la data di rilevazione e si aggiunge `updated: AAAA-MM-GG` nel front matter (la data di pubblicazione resta quella originale). Se un prezzo non è più verificabile si scrive "prezzo non pubblicato". Se un prezzo è invariato si aggiorna solo la data di rilevazione nella sezione fonti. Niente articoli di news: le novità entrano nel sito solo come aggiornamenti delle guide esistenti; se in un mese cambiano i prezzi di almeno tre strumenti, si può pubblicare una nota breve (tipo I, 500-800 parole) "Cosa è cambiato nei prezzi: <mese anno>" che rimanda alle guide aggiornate. Il registro dei controlli è qui sotto.

## Registro controlli prezzi

- (nessun controllo ancora eseguito; primo controllo previsto il 1° novembre 2026)

Stato: [ ] da scrivere · [x] pubblicato

## Guide di partenza (una per sezione) e Kit

- [x] 0 P Kit di partenza per chi apre partita IVA: gli strumenti essenziali in una pagina · fatturare-e-incassare (pillar)
- [x] 1 I Fatturare e incassare da partita IVA: software, conto, pagamenti · fatturare-e-incassare
- [x] 2 I Farsi trovare e vendere senza agenzia: sito, email, CRM · vendere-e-farsi-trovare (pillar)
- [x] 3 I Organizzare il lavoro da soli o in pochi: firma, moduli, progetti, automazioni · organizzare-il-lavoro (pillar)
- [x] 4 I Vendere un corso online: piattaforme, costi, margini · insegnare-quello-che-sai (pillar)
- [x] 5 I Lavorare con l'AI senza perdere tempo: gli strumenti che servono davvero · lavorare-con-l-ai (pillar)
- [x] 6 I Imparare online nel 2026: piattaforme, lingue, certificazioni · imparare (pillar)

## Coda, in ordine di pubblicazione (3 a settimana: lunedì, mercoledì, venerdì)

- [x] 7 A Miglior software di fatturazione elettronica per forfettari · fatturare-e-incassare · pubblicato 2026-10-19
- [x] 7b A Lavorare in viaggio senza rischi: VPN ed eSIM a confronto (NordVPN, Surfshark o Proton VPN; Saily, Airalo, Holafly) · organizzare-il-lavoro · confronto onesto, non recensione di un solo prodotto; link ai produttori normali, i link affiliati li applica config.json · pubblicato 2026-10-21
- [x] 8 A Email marketing per chi parte: MailerLite, Brevo, GetResponse a confronto · vendere-e-farsi-trovare · pubblicato 2026-10-23
- [x] 10 A Thinkific, Teachable o systeme.io: dove vendere il primo corso · insegnare-quello-che-sai · pubblicato 2026-10-26
- [x] 9 A Moduli online: Tally, Typeform, Jotform a confronto · organizzare-il-lavoro · pubblicato 2026-10-28
- [x] 11 A Trascrivere le riunioni con l'AI: Fireflies, tl;dv e alternative · lavorare-con-l-ai · pubblicato 2026-10-30 (prezzi tl;dv non verificabili: pagina dinamica)
- [ ] 12 A Imparare l'inglese online: Babbel, Preply, italki a confronto · imparare
- [ ] 13 A Conto business per partita IVA: Qonto, Wise, Revolut, Finom · fatturare-e-incassare
- [ ] 14 P Come fare un sito professionale senza agenzia in un weekend · vendere-e-farsi-trovare
- [ ] 15 A Firma digitale dei contratti: PandaDoc, Yousign e alternative · organizzare-il-lavoro
- [ ] 16 A Community a pagamento: Skool, Circle, Mighty Networks · insegnare-quello-che-sai
- [ ] 17 A Sottotitoli e video brevi con l'AI: Submagic, Descript, InVideo · lavorare-con-l-ai
- [ ] 18 A Coursera, edX, Udemy: quale piattaforma per quale obiettivo · imparare
- [ ] 19 A POS per piccole attività: SumUp e alternative · fatturare-e-incassare
- [ ] 20 A CRM per chi lavora da solo: HubSpot gratuito, Pipedrive e alternative · vendere-e-farsi-trovare
- [ ] 21 A Automazioni senza codice: Make, Zapier e alternative · organizzare-il-lavoro
- [ ] 22 P Come organizzare un webinar che vende · insegnare-quello-che-sai
- [ ] 23 A Scrivere con l'AI: Jasper, Writesonic e quando basta ChatGPT · lavorare-con-l-ai
- [ ] 24 A Corsi creativi online: Domestika e Skillshare a confronto · imparare
- [ ] 25 P Preventivi: come farli, farli firmare e farli pagare · organizzare-il-lavoro
- [ ] 26 A Hosting per un sito piccolo: SiteGround, Hostinger e alternative · vendere-e-farsi-trovare
- [ ] 27 A Imparare a programmare: Codecademy, DataCamp e alternative · imparare
- [ ] 28 A Chatbot per Instagram e WhatsApp: Manychat e alternative · lavorare-con-l-ai
- [ ] 29 A Correttori e parafrasi: Grammarly, QuillBot e quando servono · imparare
- [ ] 30 P Come passare da Notion a un'alternativa che paga meglio il tuo tempo · organizzare-il-lavoro
