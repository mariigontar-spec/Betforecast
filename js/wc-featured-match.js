(function () {
  const TODAY_MATCHES = [
    {
      home: 'Argentina',
      away: 'Egypt',
      round: 'Round of 16',
      date: '07 Jul, 19:00',
      venue: 'Mercedes-Benz Stadium',
      confidence: 'AI Confidence 76%',
      homePercent: 62,
      drawPercent: 23,
      awayPercent: 15,
      pick: 'Argentina win',
      advice: 'Argentina edge: win market with cautious total-goals control',
      text: 'Argentina carry the stronger knockout profile, while Egypt remain dangerous on counters and set pieces.',
      homeLogo: 'https://flagcdn.com/w160/ar.png',
      awayLogo: 'https://flagcdn.com/w160/eg.png'
    },
    {
      home: 'Switzerland',
      away: 'Colombia',
      round: 'Round of 16',
      date: '07 Jul, 23:00',
      venue: 'BC Place',
      confidence: 'AI Confidence 68%',
      homePercent: 32,
      drawPercent: 31,
      awayPercent: 37,
      pick: 'Colombia DNB',
      advice: 'Narrow Colombia edge: draw no bet looks safer than straight win',
      text: 'Colombia have the attacking edge, but Switzerland’s structure keeps the draw probability high.',
      homeLogo: 'https://flagcdn.com/w160/ch.png',
      awayLogo: 'https://flagcdn.com/w160/co.png'
    }
  ];

  function injectFixCss() {
    var old = document.getElementById('bf-home-fix-css');
    if (old) old.remove();

    var style = document.createElement('style');
    style.id = 'bf-home-fix-css';
    style.textContent = `
      body.site-skin-1win .bf-team-logo-wrap {
        width: 104px !important;
        height: 104px !important;
        margin: 0 auto 14px !important;
        border-radius: 50% !important;
        overflow: hidden !important;
        background: rgba(255,255,255,.08) !important;
        border: 1px solid rgba(255,255,255,.10) !important;
        display: grid !important;
        place-items: center !important;
      }

      body.site-skin-1win .bf-team-logo-img {
        width: 118% !important;
        height: 118% !important;
        padding: 0 !important;
        object-fit: cover !important;
        transform: scale(1.06) !important;
      }

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
        body.site-skin-1win .bf-team-logo-wrap { width: 88px !important; height: 88px !important; }
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

  function setImage(id, src, alt) {
    var img = document.getElementById(id);
    if (!img) return;
    img.src = src;
    img.alt = alt || '';
    img.style.visibility = 'visible';
  }

  function setBar(id, percent) {
    var bar = document.getElementById(id);
    if (bar) bar.style.width = percent + '%';
  }

  function fixFeaturedCard() {
    var m = TODAY_MATCHES[0];
    setText('wcConfidence', m.confidence);
    setText('wcHomeTeam', m.home);
    setText('wcAwayTeam', m.away);
    setText('wcHomeNote', m.round);
    setText('wcAwayNote', m.round);
    setText('wcVersus', 'VS');
    setText('wcAdvice', m.advice);
    setText('wcHomePercent', m.homePercent + '%');
    setText('wcDrawPercent', m.drawPercent + '%');
    setText('wcAwayPercent', m.awayPercent + '%');
    setText('wcMatchDate', m.date);
    setText('wcMatchStatus', 'Today');
    setText('wcVenue', m.venue);
    setText('wcPredictionText', m.text);
    setImage('wcHomeLogo', m.homeLogo, m.home + ' flag');
    setImage('wcAwayLogo', m.awayLogo, m.away + ' flag');
    setBar('wcHomeBar', m.homePercent);
    setBar('wcDrawBar', m.drawPercent);
    setBar('wcAwayBar', m.awayPercent);
  }

  function fixPredictionTable() {
    var table = document.querySelector('.bf-predictions-table');
    if (!table) return;

    table.innerHTML = `
      <div class="bf-prediction-row bf-prediction-head"><span>Match</span><span>League</span><span>Home</span><span>Draw</span><span>Away</span><span>AI Pick</span></div>
      ${TODAY_MATCHES.map(function (m) {
        return `<div class="bf-prediction-row"><strong>${m.home} vs ${m.away}</strong><span>World Cup · ${m.round}</span><b>${m.homePercent}%</b><b>${m.drawPercent}%</b><b>${m.awayPercent}%</b><em>${m.pick}</em></div>`;
      }).join('')}
    `;
  }

  function fixLowerCards() {
    var upcoming = document.getElementById('matches-container');
    var results = document.getElementById('results-container');

    if (upcoming) {
      upcoming.innerHTML = `
        <div class="bf-home-list">
          ${TODAY_MATCHES.map(function (m) {
            return `<article class="bf-home-list-card"><div><strong>${m.home} vs ${m.away}</strong><small>${m.date} · ${m.venue}</small></div><span class="bf-home-list-pill">Today</span></article>`;
          }).join('')}
        </div>
      `;
    }

    if (results) {
      results.innerHTML = `
        <div class="bf-home-list">
          <article class="bf-home-list-card"><div><strong>Portugal vs Spain</strong><small>06 Jul · Spain advanced to face Belgium in the quarterfinals</small></div><span class="bf-home-list-pill">Latest</span></article>
          <article class="bf-home-list-card"><div><strong>USA vs Belgium</strong><small>06 Jul · Round of 16 completed</small></div><span class="bf-home-list-pill">Latest</span></article>
        </div>
      `;
    }
  }

  function fixSearchPresets() {
    var input = document.getElementById('match-search-input');
    if (input) input.placeholder = 'e.g. Argentina vs Egypt';

    var tags = document.querySelector('.bf-tags');
    if (tags) {
      tags.innerHTML = '<button>Argentina vs Egypt</button><button>Switzerland vs Colombia</button>';
    }
  }

  function fixSectionTitle() {
    var title = document.querySelector('.bf-predictions-section h2');
    if (title) title.textContent = 'Today’s World Cup AI Predictions';
  }

  function run() {
    injectFixCss();
    fixSearchPresets();
    fixSectionTitle();
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
