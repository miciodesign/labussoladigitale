/* Calcolatore margine corso online - La Bussola Digitale.
   PREZZI: letti sulle pagine ufficiali il 1 novembre 2026. Aggiornare questa tabella
   quando cambia un listino (vedi controllo prezzi mensile) e la data in PREZZI_DATA.
   Importi in dollari trattati come euro (approssimazione per eccesso, come nelle guide). */
(function () {
  var PREZZI_DATA = "1 novembre 2026";
  var PIATTAFORME = [
    { nome: "systeme.io Free", annuale: 0, mensile: 0, pct: 0, fisso: 0, note: "1 corso, 2.000 contatti" },
    { nome: "systeme.io Startup", annuale: 17, mensile: 17, pct: 0, fisso: 0, note: "5 corsi, 5.000 contatti" },
    { nome: "Teachable Starter", annuale: 29, mensile: 39, pct: 7.5, fisso: 0, note: "5 prodotti" },
    { nome: "Teachable Builder", annuale: 69, mensile: 89, pct: 0, fisso: 0, note: "0% con Teachable Payments" },
    { nome: "Thinkific Start", annuale: 82, mensile: 109, pct: 0, fisso: 0, note: "nessun piano gratuito" },
    { nome: "Podia Mover", annuale: 42, mensile: null, pct: 5, fisso: 0, note: "solo pagamento annuale" },
    { nome: "Podia Shaker", annuale: 84, mensile: null, pct: 0, fisso: 0, note: "solo pagamento annuale" },
    { nome: "LearnWorlds Starter", annuale: 44, mensile: 49, pct: 0, fisso: 5, note: "5 $ fissi per iscrizione" },
    { nome: "LearnWorlds Pro Trainer", annuale: 79, mensile: null, pct: 0, fisso: 0, note: "0% di commissione" }
  ];
  var f = document.getElementById("calc-corsi");
  if (!f) return;
  var out = document.getElementById("calc-out");
  function eur(n) {
    return n.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }
  function val(id, def) {
    var v = parseFloat(String(document.getElementById(id).value).replace(",", "."));
    return isFinite(v) && v >= 0 ? v : def;
  }
  function calcola() {
    var prezzo = val("c-prezzo", 0), iscritti = val("c-iscritti", 0);
    var gpct = val("c-gpct", 2.9), gfisso = val("c-gfisso", 0.3);
    var annuale = document.getElementById("c-fatt").value === "annuale";
    var lordo = prezzo * iscritti;
    var gateway = lordo * gpct / 100 + gfisso * iscritti;
    var righe = PIATTAFORME.map(function (p) {
      var canone = annuale ? p.annuale : (p.mensile === null ? p.annuale : p.mensile);
      var comm = lordo * p.pct / 100 + p.fisso * iscritti;
      var resta = lordo - gateway - comm - canone;
      return { p: p, canone: canone, comm: comm, resta: resta, solo_annuale: !annuale && p.mensile === null };
    }).sort(function (a, b) { return b.resta - a.resta; });
    var html = "";
    if (lordo === 0) {
      out.innerHTML = "<p>Inserisci prezzo e numero di iscritti al mese per vedere il confronto.</p>";
      return;
    }
    html += "<p><strong>Incasso lordo:</strong> " + eur(lordo) + " al mese. <strong>Gestore pagamenti:</strong> " + eur(gateway) + ".</p>";
    html += "<table><thead><tr><th>Piattaforma</th><th>Costi</th><th>Ti restano al mese</th><th class=\"hide-s\">Ti restano all’anno</th></tr></thead><tbody>";
    righe.forEach(function (r, i) {
      html += "<tr" + (i === 0 ? ' class="best"' : "") + "><td><strong>" + r.p.nome + "</strong><br><small>" + r.p.note +
        (r.solo_annuale ? " (prezzo annuale)" : "") + "</small></td><td>" + eur(r.canone + r.comm) + "<br><small>canone " + eur(r.canone) + "</small></td>" +
        "<td><strong>" + eur(r.resta) + "</strong></td><td class=\"hide-s\">" + eur(r.resta * 12) + "</td></tr>";
    });
    html += "</tbody></table>";
    var best = righe[0], worst = righe[righe.length - 1];
    html += "<p>Con questi numeri la scelta che lascia di più è <strong>" + best.p.nome + "</strong>: " +
      eur((best.resta - worst.resta) * 12) + " all’anno in più rispetto a <strong>" + worst.p.nome + "</strong>.</p>";
    out.innerHTML = html;
  }
  ["c-prezzo", "c-iscritti", "c-gpct", "c-gfisso", "c-fatt"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", calcola);
    document.getElementById(id).addEventListener("change", calcola);
  });
  var d = document.getElementById("calc-data");
  if (d) d.textContent = PREZZI_DATA;
  calcola();
})();
