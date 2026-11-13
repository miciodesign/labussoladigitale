/* Quanto costa il tuo kit di strumenti - La Bussola Digitale.
   PREZZI: letti sulle pagine ufficiali tra il 19 ottobre e il 9 novembre 2026 (vedi "fonte" di ogni gruppo).
   "annuo" = costo in un anno. Dollari trattati come euro (approssimazione per eccesso). IVA esclusa dove indicato.
   Aggiornare quando il controllo mensile dei prezzi trova una variazione. */
(function () {
  var G = [
    { id: "fatt", nome: "Fatturazione elettronica", guida: "/fatturare-e-incassare/software-fatturazione-elettronica-forfettari/", opz: [
      ["Aruba Fatturazione Elettronica", 29.9, "29,90 €/anno + IVA dopo i primi 3 mesi a 1 €"],
      ["Fatturazione Italia Start", 49, "49 €/anno + IVA, 150 fatture"],
      ["Fatture in Cloud (Forfettari)", 96, "96 €/anno + IVA dal secondo anno (48 € il primo)"],
      ["Fattura24 Professional", 120, "120 €/anno + IVA dal secondo anno (48 € il primo)"] ] },
    { id: "email", nome: "Email marketing", guida: "/vendere-e-farsi-trovare/email-marketing-mailerlite-brevo-getresponse/", opz: [
      ["MailerLite o Brevo, piano gratuito", 0, "gratuito", 1],
      ["MailerLite Comfort", 129.6, "12 $/mese con sconto 10% annuale; sale con gli iscritti"],
      ["GetResponse Starter", 186.96, "15,58 $/mese con pagamento annuale"] ] },
    { id: "moduli", nome: "Moduli online", guida: "/organizzare-il-lavoro/moduli-online-tally-typeform-jotform/", opz: [
      ["Tally, piano gratuito", 0, "gratuito, moduli illimitati", 1],
      ["Tally Pro", 288, "24 $/mese; l'annuale costa meno ma l'importo non è mostrato"],
      ["Typeform Basic", 336, "28 $/mese con pagamento annuale, 100 risposte al mese"],
      ["Jotform a pagamento", 228, "\"a partire da 19 $ al mese\": verifica nel carrello"] ] },
    { id: "firma", nome: "Firma digitale", guida: "/organizzare-il-lavoro/organizzare-lavoro-guida/", opz: [
      ["Youtrust, piano gratuito", 0, "2 firme al mese", 1],
      ["Youtrust One", 108, "9 €/mese, 1 utente"],
      ["PandaDoc Starter", 228, "19 $/utente/mese annuale"] ] },
    { id: "prog", nome: "Gestione progetti", guida: "/organizzare-il-lavoro/organizzare-lavoro-guida/", opz: [
      ["Trello o Notion, piano gratuito", 0, "gratuito", 1],
      ["Trello Standard", 60, "5 $/utente/mese annuale"],
      ["Notion Plus", 120, "10 $/utente/mese"] ] },
    { id: "auto", nome: "Automazioni", guida: "/organizzare-il-lavoro/organizzare-lavoro-guida/", opz: [
      ["Make o Zapier, piano gratuito", 0, "gratuito (Zapier: 100 task al mese)", 1],
      ["Zapier Professional", 239.88, "da 19,99 $/mese"] ] },
    { id: "ai", nome: "Assistente AI", guida: "/lavorare-con-l-ai/lavorare-con-ai-guida/", opz: [
      ["Assistente AI, piano gratuito", 0, "gratuito (ChatGPT, Claude, Gemini)", 1],
      ["Claude Pro", 200, "200 $/anno con pagamento annuale (20 $/mese)"],
      ["ChatGPT Plus", 240, "20 $/mese"],
      ["Gemini AI Pro", 239.88, "19,99 $/mese"] ] },
    { id: "trasc", nome: "Trascrizione riunioni", guida: "/lavorare-con-l-ai/trascrivere-riunioni-ai-fireflies-tldv/", opz: [
      ["Fireflies o Fathom, piano gratuito", 0, "gratuito", 1],
      ["Otter.ai Pro", 99.96, "8,33 $/mese annuale; non supporta l'italiano"],
      ["Fireflies Pro", 120, "10 $/posto/mese annuale"],
      ["Fathom Premium", 192, "16 $/utente/mese annuale"] ] },
    { id: "pw", nome: "Password manager", guida: "/sicurezza-digitale/", opz: [
      ["Bitwarden, piano gratuito", 0, "gratuito, dispositivi illimitati", 1],
      ["Bitwarden Premium", 19.8, "19,80 $/anno"],
      ["1Password Individual", 35.88, "2,99 $/mese annuale (listino 3,99 $, sconto del primo anno)"] ] },
    { id: "vpn", nome: "VPN", guida: "/organizzare-il-lavoro/vpn-esim-lavorare-in-viaggio/", opz: [
      ["Surfshark Starter", 29.88, "2,49 $/mese su 27 mesi, pagati in una volta (67,23 $); rinnovo non indicato"],
      ["NordVPN Basic", 41.88, "3,49 $/mese su 27 mesi, pagati in una volta (94,23 $); rinnovo 139,08 $/anno"],
      ["Proton VPN Plus", 83.88, "3,49 $/mese su 24 mesi, pagati in una volta (83,76 $); rinnovo 83,88 $/anno"] ] },
    { id: "bk", nome: "Backup e spazio cloud", guida: "/sicurezza-digitale/", opz: [
      ["iCloud+ 200 GB", 35.88, "2,99 €/mese; sincronizza, non è un vero backup"],
      ["Proton Drive Plus 200 GB", 59.88, "4,99 $/mese, solo pagamento mensile"],
      ["Backblaze (un computer)", 99, "99 $/anno, spazio illimitato"] ] },
    { id: "av", nome: "Antivirus", guida: "/sicurezza-digitale/", opz: [
      ["Protezione inclusa nel sistema (Windows, macOS)", 0, "inclusa nel computer", 1],
      ["Bitdefender Total Security, Individual", 49.98, "49,98 € il primo anno; il rinnovo può costare di più"] ] }
  ];
  var f = document.getElementById("calc-kit");
  if (!f) return;
  var out = document.getElementById("calc-kit-out");
  function eur(n) { return n.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
  var h = '<div class="calc-grid">';
  G.forEach(function (g) {
    h += '<label>' + g.nome + '<select id="k-' + g.id + '"><option value="-1">Non lo uso</option>';
    g.opz.forEach(function (o, i) { h += '<option value="' + i + '">' + o[0] + (o[1] ? "" : " (0 €)") + '</option>'; });
    h += '</select></label>';
  });
  h += '</div>';
  f.innerHTML = h;
  function calcola() {
    var tot = 0, righe = "", gratis = [], risp = 0;
    G.forEach(function (g) {
      var v = parseInt(document.getElementById("k-" + g.id).value, 10);
      if (v < 0) return;
      var o = g.opz[v];
      tot += o[1];
      righe += '<tr><td><a href="' + g.guida + '">' + g.nome + '</a><br><small>' + o[0] + ' · ' + o[2] + '</small></td><td>' + eur(o[1]) + '</td><td>' + eur(o[1] / 12) + '</td></tr>';
      if (o[1] > 0) {
        var free = g.opz.filter(function (x) { return x[3]; })[0];
        if (free) { gratis.push(g.nome); risp += o[1]; }
      }
    });
    if (!righe) { out.innerHTML = "<p>Scegli gli strumenti che usi: il totale compare qui sotto.</p>"; return; }
    var html = '<table><thead><tr><th>Strumento</th><th>All’anno</th><th>Al mese</th></tr></thead><tbody>' + righe +
      '<tr class="best"><td><strong>Totale</strong></td><td><strong>' + eur(tot) + '</strong></td><td><strong>' + eur(tot / 12) + '</strong></td></tr></tbody></table>';
    if (gratis.length) {
      html += "<p>Per questi strumenti esiste un piano gratuito (" + gratis.join(", ") + "): se ti basta, risparmi " + eur(risp) + " all’anno e il totale scende a " + eur(tot - risp) + ".</p>";
    } else {
      html += "<p>Per gli strumenti che hai scelto non c'è un'alternativa gratuita nelle nostre guide: se vuoi confrontare, apri la guida di ciascuno.</p>";
    }
    out.innerHTML = html;
  }
  G.forEach(function (g) { document.getElementById("k-" + g.id).addEventListener("change", calcola); });
  calcola();
})();
