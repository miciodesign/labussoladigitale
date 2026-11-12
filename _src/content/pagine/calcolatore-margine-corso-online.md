---
title: Calcolatore del margine di un corso online
slug: calcolatore-margine-corso-online
description: Inserisci il prezzo del corso e gli iscritti al mese: vedi quanto ti resta con systeme.io, Teachable, Thinkific, Podia e LearnWorlds dopo canone e commissioni. Prezzi verificati.
---
Quanto ti resta davvero di un corso venduto online? Dipende dal canone della piattaforma, dalla commissione sulle vendite e da quella del gestore dei pagamenti. Inserisci i tuoi numeri e il calcolo ti mostra le piattaforme una sotto l'altra, dalla più conveniente alla meno conveniente. Funziona nel tuo browser: non salviamo niente di ciò che scrivi.

<form id="calc-corsi" class="calc" onsubmit="return false">
<div class="calc-grid">
<label>Prezzo del corso (€)<input id="c-prezzo" type="number" inputmode="decimal" min="0" step="1" value="149"></label>
<label>Iscritti al mese<input id="c-iscritti" type="number" inputmode="numeric" min="0" step="1" value="20"></label>
<label>Pagamento della piattaforma<select id="c-fatt"><option value="annuale">Annuale (canone più basso)</option><option value="mensile">Mensile</option></select></label>
<label>Gestore pagamenti, percentuale (%)<input id="c-gpct" type="number" inputmode="decimal" min="0" step="0.1" value="2.9"></label>
<label>Gestore pagamenti, quota fissa (€)<input id="c-gfisso" type="number" inputmode="decimal" min="0" step="0.05" value="0.30"></label>
</div>
</form>

<div id="calc-out" class="calc-out" aria-live="polite"></div>

<div class="box" markdown="1">
**Come leggere il risultato.** Prezzi rilevati sulle pagine ufficiali il <span id="calc-data">1 novembre 2026</span>. Gli importi in dollari sono trattati come euro, un'approssimazione per eccesso. Dal risultato vanno ancora tolti IVA, se la applichi, e le tasse del tuo regime: parlane con il commercialista prima di fissare il prezzo. Il 2,9% + 0,30 € è il valore tipico di Stripe e puoi cambiarlo. Su Thinkific la commissione per Stripe e PayPal non è pubblicata e può aggiungersi: chiedila prima di aprire l'account.
</div>

## Per approfondire

- [Vendere un corso online: piattaforme, costi, margini](/insegnare-quello-che-sai/vendere-corso-online-guida/): il confronto completo, con le community e i webinar.
- [Thinkific, Teachable o systeme.io: dove vendere il primo corso](/insegnare-quello-che-sai/thinkific-teachable-systeme-io-primo-corso/): i tre nomi più cercati, con il conto su un corso da 149 €.
- Come scegliamo e verifichiamo i prezzi: [Trasparenza](/trasparenza/).

<script src="/assets/calcolatore-corsi.js" defer></script>
