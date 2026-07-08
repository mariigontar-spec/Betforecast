(function () {
  const NEXT_MATCHES = [
    {
      home: 'France',
      away: 'Morocco',
      round: 'Quarterfinal',
      date: '09 Jul, 23:00',
      venue: 'Bay Area Stadium',
      confidence: 'AI Confidence 72%',
      homePercent: 47,
      drawPercent: 28,
      awayPercent: 25,
      pick: 'France DNB',
      advice: 'Quarterfinal edge: France draw no bet with controlled goal line',
      text: 'France bring the deeper squad and higher knockout experience, while Morocco keep upset value through compact defending and fast transitions.',
      homeLogo: 'https://flagcdn.com/w160/fr.png',
      awayLogo: 'https://flagcdn.com/w160/ma.png'
    },
    {
      home: 'Spain',
      away: 'Belgium',
      round: 'Quarterfinal',
      date: '10 Jul, 22:00',
      venue: 'World Cup Quarterfinal',
      confidence: 'AI Confidence 70%',
      homePercent: 44,
      drawPercent: 29,
      awayPercent: 27,
      pick: 'Spain DNB',
      advice: 'Spain slight edge: possession control keeps the safer side on Spain',
      text: 'Spain project cleaner possession stability, while Belgium remain dangerous if the game opens early.',
      homeLogo: 'https://flagcdn.com/w160/es.png',
      awayLogo: 'https://flagcdn.com/w160/be.png'
    },
    {
      home: 'Norway',
      away: 'England',
      round: 'Quarterfinal',
      date: '12 Jul, 00:00',
      venue: 'World Cup Quarterfinal',
      confidence: 'AI Confidence 69%',
      homePercent: 29,
      drawPercent: 30,
      awayPercent: 41,
      pick: 'England DNB',
      advice: 'England narrow edge, but Norway goal threat keeps risk medium',
      text: 'England rate higher for game control, but Norway’s direct attacking profile keeps the upset window open.',
      homeLogo: 'https://flagcdn.com/w160/no.png',
      awayLogo: 'https://flagcdn.com/w160/gb-eng.png'
    },
    {
      home: 'Argentina',
      away: 'Switzerland',
      round: 'Quarterfinal',
      date: '12 Jul, 04:00',
      venue: 'Kansas City',
      confidence: 'AI Confidence 74%',
      homePercent: 52,
      drawPercent: 27,
      awayPercent: 21,
      pick: 'Argentina Win',
      advice: 'Argentina edge: stronger knockout ceiling against Swiss structure',
      text: 'Argentina’s late-game quality gives them the stronger profile, while Switzerland bring discipline and penalty-shootout danger.',
      homeLogo: 'https://flagcdn.com/w160/ar.png',
      awayLogo: 'https://flagcdn.com/w160/ch.png'
    }
  ];

  const LATEST_RESULTS = [
    {
      match: 'Argentina vs Egypt',
      score: '3-2',
      note: 'Argentina advanced after a late comeback in Atlanta'
    },
    {
      match: 'Switzerland vs Colombia',
      score: '0-0 · pens 4-3',
      note: 'Switzerland advanced after penalties in Vancouver'
    }
  ];

  function injectFixCss() {
    const old = document.getElementById('bf-home-fix-css');
    if (old) old.remove();

    const style = document.createElement('style');
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

      body.site-skin-1win #matches-container,
      body.site-skin-1win #results-container {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        overflow: visible !important;
      }

      body.site-skin-1win .bf-home-list {
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        width: 100% !important;
        max-width: 100% !important;
      }

      body.site-skin-1win .bf-home-list-card {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 14px !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        padding: 16px !important;
        border: 1px solid rgba(94,224,164,.12) !important;
        border-radius: 16px !important;
        background: rgba(2,11,19,.34) !important;
        box-sizing: border-box !important;
      }

      body.site-skin-1win .bf-home-list-content {
        flex: 1 1 auto !important;
        min-width: 0 !important;
        max-width: 100% !important;
      }

      body.site-skin-1win .bf-home-list-card,
      body.site-skin-1win .bf-home-list-card * {
        writing-mode: horizontal-tb !important;
        text-orientation: mixed !important;
        transform: none !important;
        letter-spacing: normal !important;
        word-break: normal !important;
        overflow-wrap: normal !important;
      }

      body.site-skin-1win .bf-home-list-card strong {
        display: block !important;
        color: #fff !important;
        font-size: 16px !important;
        line-height: 1.3 !important;
        font-weight: 900 !important;
        white-space: normal !important;
      }

      body.site-skin-1win .bf-home-list-card small {
        display: block !important;
        margin-top: 6px !important;
        color: rgba(248,250,252,.66) !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
        white-space: normal !important;
      }

      body.site-skin-1win .bf-home-list-pill {
        flex: 0 0 auto !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-width: max-content !important;
        padding: 8px 12px !important;
        border-radius: 999px !important;
        color: #06120d !important;
        background: #5ee0a4 !important;
        font-size: 12px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        white-space: nowrap !important;
      }

      @media (max-width: 768px) {
        body.site-skin-1win .bf-team-logo-wrap {
          width: 88px !important;
          height: 88px !important;
        }

        body.site-skin-1win .bf-home-list-card {
          flex-direction: column !important;
          align-items: flex-start !important;
        }

        body.site-skin-1win .bf-home-list-pill {
          align-self: flex-start !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setImage(id, src, alt) {
    const img = document.getElementById(id);
    if (!img) return;
    img.src = src;
    img.alt = alt || '';
    img.style.visibility = 'visible';
  }

  function setBar(id, percent) {
    const bar = document.getElementById(id);
    if (bar) bar.style.width = percent + '%';
  }

  function fixFeaturedCard() {
    const m = NEXT_MATCHES[0];
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
    setText('wcMatchStatus', 'Next match');
    setText('wcVenue', m.venue);
    setText('wcPredictionText', m.text);
    setImage('wcHomeLogo', m.homeLogo, m.home + ' flag');
    setImage('wcAwayLogo', m.awayLogo, m.away + ' flag');
    setBar('wcHomeBar', m.homePercent);
    setBar('wcDrawBar', m.drawPercent);
    setBar('wcAwayBar', m.awayPercent);
  }

  function fixPredictionTable() {
    const table = document.querySelector('.bf-predictions-table');
    if (!table) return;

    table.innerHTML = `
      <div class="bf-prediction-row bf-prediction-head">
        <span>Match</span><span>League</span><span>Home</span><span>Draw</span><span>Away</span><span>AI Pick</span>
      </div>
      ${NEXT_MATCHES.map(function (m) {
        return `
          <div class="bf-prediction-row">
            <strong>${m.home} vs ${m.away}</strong>
            <span>World Cup · ${m.round}</span>
            <b>${m.homePercent}%</b>
            <b>${m.drawPercent}%</b>
            <b>${m.awayPercent}%</b>
            <em>${m.pick}</em>
          </div>
        `;
      }).join('')}
    `;
  }

  function fixLowerCards() {
    const upcoming = document.getElementById('matches-container');
    const results = document.getElementById('results-container');

    if (upcoming) {
      upcoming.innerHTML = `
        <div class="bf-home-list">
          ${NEXT_MATCHES.map(function (m, index) {
            return `
              <article class="bf-home-list-card">
                <div class="bf-home-list-content">
                  <strong>${m.home} vs ${m.away}</strong>
                  <small>${m.date} · ${m.venue}</small>
                </div>
                <span class="bf-home-list-pill">${index === 0 ? 'Next' : 'QF'}</span>
              </article>
            `;
          }).join('')}
        </div>
      `;
    }

    if (results) {
      results.innerHTML = `
        <div class="bf-home-list">
          ${LATEST_RESULTS.map(function (r) {
            return `
              <article class="bf-home-list-card">
                <div class="bf-home-list-content">
                  <strong>${r.match}</strong>
                  <small>${r.note}</small>
                </div>
                <span class="bf-home-list-pill">${r.score}</span>
              </article>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  function fixSearchPresets() {
    const input = document.getElementById('match-search-input');
    if (input) input.placeholder = 'e.g. France vs Morocco';

    const tags = document.querySelector('.bf-tags');
    if (tags) {
      tags.innerHTML = `
        <button>France vs Morocco</button>
        <button>Spain vs Belgium</button>
        <button>Norway vs England</button>
        <button>Argentina vs Switzerland</button>
      `;
    }
  }

  function fixSectionTitle() {
    const title = document.querySelector('.bf-predictions-section h2');
    if (title) title.textContent = 'Next World Cup Quarterfinal AI Predictions';
  }

  function patchSearchModel() {
    const input = document.getElementById('match-search-input');
    const button = document.getElementById('match-search-btn');
    const result = document.getElementById('match-search-result');
    if (!input || !button || !result) return;

    const data = {};
    NEXT_MATCHES.forEach(function (m) {
      data[(m.home + ' vs ' + m.away).toLowerCase()] = m;
    });

    function analyze(value) {
      const q = String(value || '').trim();
      if (!q) {
        result.textContent = 'Enter a match to see probabilities and AI reasoning.';
        input.focus();
        return;
      }

      const m = data[q.toLowerCase().replace(/\s+/g, ' ')] || NEXT_MATCHES[0];
      result.innerHTML = `
        <div class="bf-live-result">
          <h3>${m.home} vs ${m.away}</h3>
          <p>
            <strong>Home:</strong> ${m.homePercent}% ·
            <strong>Draw:</strong> ${m.drawPercent}% ·
            <strong>Away:</strong> ${m.awayPercent}%<br>
            <strong>AI pick:</strong> ${m.pick}<br>
            <strong>Confidence:</strong> ${m.confidence.replace('AI Confidence ', '')}<br>
            ${m.text}
          </p>
        </div>
      `;
    }

    button.onclick = function () {
      analyze(input.value);
    };

    input.onkeydown = function (event) {
      if (event.key === 'Enter') analyze(input.value);
    };

    document.querySelectorAll('.bf-tags button').forEach(function (tag) {
      tag.onclick = function () {
        input.value = tag.textContent.trim();
        analyze(input.value);
      };
    });
  }

  function run() {
    injectFixCss();
    fixSearchPresets();
    fixSectionTitle();
    fixFeaturedCard();
    fixPredictionTable();
    fixLowerCards();
    patchSearchModel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.addEventListener('load', run);
  setTimeout(run, 500);
  setTimeout(run, 1200);
})();
