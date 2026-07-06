(function () {
  function injectFixCss() {
    var old = document.getElementById('bf-home-fix-css');
    if (old) old.remove();

    var style = document.createElement('style');
    style.id = 'bf-home-fix-css';
    style.textContent = `
      body.site-skin-1win .bf-predictions-table,
      body.site-skin-1win #matches-container,
      body.site-skin-1win #results-container {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        overflow: visible !important;
      }

      body.site-skin-1win .bf-predictions-table::before,
      body.site-skin-1win .bf-predictions-table::after,
      body.site-skin-1win .bf-prediction-row::before,
      body.site-skin-1win .bf-prediction-row::after {
        content: none !important;
        display: none !important;
      }

      body.site-skin-1win .bf-prediction-row {
        display: grid !important;
        grid-template-columns: 1.35fr .95fr .65fr .65fr .65fr 1fr !important;
        gap: 14px !important;
        min-width: 860px !important;
        align-items: center !important;
        padding: 14px 18px !important;
      }

      body.site-skin-1win .bf-prediction-row > * {
        display: block !important;
        white-space: nowrap !important;
        text-align: left !important;
        writing-mode: horizontal-tb !important;
        text-orientation: mixed !important;
        transform: none !important;
      }

      body.site-skin-1win .bf-home-list {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 10px !important;
        width: 100% !important;
        max-width: 100% !important;
      }

      body.site-skin-1win .bf-home-list-card {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        gap: 12px !important;
        align-items: center !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        padding: 14px !important;
        border: 1px solid rgba(94,224,164,.12) !important;
        border-radius: 16px !important;
        background: rgba(2,11,19,.34) !important;
      }

      body.site-skin-1win .bf-home-list-card,
      body.site-skin-1win .bf-home-list-card * {
        writing-mode: horizontal-tb !important;
        text-orientation: mixed !important;
        transform: none !important;
        letter-spacing: normal !important;
        word-break: normal !important;
      }

      body.site-skin-1win .bf-home-list-card strong {
        display: block !important;
        color: #fff !important;
        font-size: 15px !important;
        line-height: 1.25 !important;
        font-weight: 900 !important;
        white-space: normal !important;
      }

      body.site-skin-1win .bf-home-list-card small {
        display: block !important;
        margin-top: 5px !important;
        color: rgba(248,250,252,.66) !important;
        font-size: 12px !important;
        line-height: 1.35 !important;
        white-space: normal !important;
      }

      body.site-skin-1win .bf-home-list-pill {
        justify-self: end !important;
        min-width: max-content !important;
        padding: 7px 10px !important;
        border-radius: 999px !important;
        color: #06120d !important;
        background: #5ee0a4 !important;
        font-size: 12px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        white-space: nowrap !important;
      }

      @media (max-width: 768px) {
        body.site-skin-1win .bf-prediction-row { min-width: 760px !important; }
        body.site-skin-1win .bf-home-list-card { grid-template-columns: 1fr !important; }
        body.site-skin-1win .bf-home-list-pill { justify-self: start !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function fixFeaturedCard() {
    setText('wcConfidence', 'AI Confidence 45%');
    setText('wcHomeTeam', 'Portugal');
    setText('wcAwayTeam', 'Spain');
    setText('wcHomeNote', 'Round of 16');
    setText('wcAwayNote', 'Round of 16');
    setText('wcVersus', 'VS');
    setText('wcAdvice', 'Combo double chance: draw or Spain and -3.5 goals');
    setText('wcHomePercent', '31%');
    setText('wcDrawPercent', '29%');
    setText('wcAwayPercent', '40%');
    setText('wcMatchDate', '06 Jul, 22:00');
    setText('wcMatchStatus', 'Scheduled');
    setText('wcVenue', 'AT&T Stadium');
    setText('wcPredictionText', 'Prediction considers form, squad depth, recent tempo and available World Cup data.');
  }

  function fixPredictionTable() {
    var table = document.querySelector('.bf-predictions-table');
    if (!table) return;
    table.innerHTML = `
      <div class="bf-prediction-row bf-prediction-head"><span>Match</span><span>League</span><span>Home</span><span>Draw</span><span>Away</span><span>AI Pick</span></div>
      <div class="bf-prediction-row"><strong>Portugal vs Spain</strong><span>World Cup</span><b>31%</b><b>29%</b><b>40%</b><em>Spain DNB</em></div>
      <div class="bf-prediction-row"><strong>Brazil vs Argentina</strong><span>International</span><b>42%</b><b>28%</b><b>30%</b><em>Brazil Win</em></div>
      <div class="bf-prediction-row"><strong>Germany vs France</strong><span>Europe</span><b>34%</b><b>31%</b><b>35%</b><em>France DNB</em></div>
    `;
  }

  function fixLowerCards() {
    var upcoming = document.getElementById('matches-container');
    var results = document.getElementById('results-container');

    if (upcoming) {
      upcoming.innerHTML = `
        <div class="bf-home-list">
          <article class="bf-home-list-card"><div><strong>Portugal vs Spain</strong><small>06 Jul, 22:00 · AT&T Stadium</small></div><span class="bf-home-list-pill">Upcoming</span></article>
          <article class="bf-home-list-card"><div><strong>Brazil vs Argentina</strong><small>International · AI watchlist</small></div><span class="bf-home-list-pill">Preview</span></article>
        </div>
      `;
    }

    if (results) {
      results.innerHTML = `
        <div class="bf-home-list">
          <article class="bf-home-list-card"><div><strong>Mexico vs England</strong><small>06 Jul, 04:00 · Estadio Banorte</small></div><span class="bf-home-list-pill">2-3</span></article>
        </div>
      `;
    }
  }

  function run() {
    injectFixCss();
    fixFeaturedCard();
    fixPredictionTable();
    fixLowerCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.addEventListener('load', run);
  setTimeout(run, 500);
})();
