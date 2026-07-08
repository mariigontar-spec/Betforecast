(function () {
  const MATCHES = [
    {
      home: 'France',
      away: 'Morocco',
      stage: 'Quarterfinal',
      date: '09 Jul, 23:00',
      venue: 'Bay Area Stadium',
      homePercent: 47,
      drawPercent: 28,
      awayPercent: 25,
      confidence: 72,
      pick: 'France DNB',
      tag: 'Next match',
      advice: 'France draw no bet with controlled goal line',
      text: 'France have the deeper squad and stronger knockout profile. Morocco keep upset value through compact defending and fast transitions.',
      homeLogo: 'https://flagcdn.com/w160/fr.png',
      awayLogo: 'https://flagcdn.com/w160/ma.png'
    },
    {
      home: 'Spain',
      away: 'Belgium',
      stage: 'Quarterfinal',
      date: '10 Jul, 22:00',
      venue: 'World Cup Quarterfinal',
      homePercent: 44,
      drawPercent: 29,
      awayPercent: 27,
      confidence: 70,
      pick: 'Spain DNB',
      tag: 'Quarterfinal',
      advice: 'Spain possession edge keeps the safer side on Spain',
      text: 'Spain project cleaner possession stability. Belgium remain dangerous if the game opens early.',
      homeLogo: 'https://flagcdn.com/w160/es.png',
      awayLogo: 'https://flagcdn.com/w160/be.png'
    },
    {
      home: 'Norway',
      away: 'England',
      stage: 'Quarterfinal',
      date: '12 Jul, 00:00',
      venue: 'World Cup Quarterfinal',
      homePercent: 29,
      drawPercent: 30,
      awayPercent: 41,
      confidence: 69,
      pick: 'England DNB',
      tag: 'Quarterfinal',
      advice: 'England narrow edge, Norway goal threat keeps risk medium',
      text: 'England rate higher for control. Norway’s direct attack keeps the upset window open.',
      homeLogo: 'https://flagcdn.com/w160/no.png',
      awayLogo: 'https://flagcdn.com/w160/gb-eng.png'
    },
    {
      home: 'Argentina',
      away: 'Switzerland',
      stage: 'Quarterfinal',
      date: '12 Jul, 04:00',
      venue: 'Kansas City',
      homePercent: 52,
      drawPercent: 27,
      awayPercent: 21,
      confidence: 74,
      pick: 'Argentina Win',
      tag: 'Quarterfinal',
      advice: 'Argentina edge against Swiss structure',
      text: 'Argentina’s late-game quality gives them the stronger profile. Switzerland bring discipline and penalty danger.',
      homeLogo: 'https://flagcdn.com/w160/ar.png',
      awayLogo: 'https://flagcdn.com/w160/ch.png'
    }
  ];

  const RESULTS = [
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

  function cleanText(value) {
    return String(value || '')
      .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
      .trim();
  }

  function injectCss() {
    const old = document.getElementById('bf-home-clean-css');
    if (old) old.remove();

    const style = document.createElement('style');
    style.id = 'bf-home-clean-css';
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

      body.site-skin-1win .bf-predictions-section,
      body.site-skin-1win .bf-panel {
        overflow: hidden !important;
      }

      body.site-skin-1win .bf-clean-predictions {
        display: block !important;
        width: 100% !important;
        min-width: 0 !important;
        overflow: visible !important;
        border: 0 !important;
        background: transparent !important;
      }

      body.site-skin-1win .bf-clean-grid {
        display: grid !important;
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        gap: 14px !important;
        width: 100% !important;
      }

      body.site-skin-1win .bf-clean-match-card {
        display: flex !important;
        flex-direction: column !important;
        min-width: 0 !important;
        min-height: 190px !important;
        padding: 18px !important;
        border-radius: 20px !important;
        border: 1px solid rgba(94,224,164,.14) !important;
        background: rgba(2,11,19,.42) !important;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.03) !important;
      }

      body.site-skin-1win .bf-clean-match-card,
      body.site-skin-1win .bf-clean-match-card *,
      body.site-skin-1win .bf-clean-list-card,
      body.site-skin-1win .bf-clean-list-card * {
        writing-mode: horizontal-tb !important;
        text-orientation: mixed !important;
        transform: none !important;
        word-break: normal !important;
        overflow-wrap: normal !important;
        letter-spacing: normal !important;
      }

      body.site-skin-1win .bf-clean-card-top {
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        gap: 10px !important;
        margin-bottom: 14px !important;
      }

      body.site-skin-1win .bf-clean-match-title {
        display: block !important;
        color: #fff !important;
        font-size: 17px !important;
        line-height: 1.25 !important;
        font-weight: 900 !important;
        white-space: normal !important;
      }

      body.site-skin-1win .bf-clean-stage,
      body.site-skin-1win .bf-clean-pill {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: fit-content !important;
        max-width: 100% !important;
        padding: 7px 10px !important;
        border-radius: 999px !important;
        color: #06120d !important;
        background: #5ee0a4 !important;
        font-size: 12px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        white-space: nowrap !important;
      }

      body.site-skin-1win .bf-clean-stage {
        color: rgba(248,250,252,.9) !important;
        background: rgba(94,224,164,.16) !important;
        border: 1px solid rgba(94,224,164,.18) !important;
      }

      body.site-skin-1win .bf-clean-meta {
        display: block !important;
        margin-top: auto !important;
        color: rgba(248,250,252,.68) !important;
        font-size: 13px !important;
        line-height: 1.4 !important;
        white-space: normal !important;
      }

      body.site-skin-1win .bf-clean-probs {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 8px !important;
        margin: 14px 0 !important;
      }

      body.site-skin-1win .bf-clean-probs div {
        padding: 10px 8px !important;
        border-radius: 14px !important;
        background: rgba(255,255,255,.035) !important;
        text-align: center !important;
      }

      body.site-skin-1win .bf-clean-probs span {
        display: block !important;
        margin-bottom: 4px !important;
        color: rgba(248,250,252,.58) !important;
        font-size: 10px !important;
        font-weight: 900 !important;
        text-transform: uppercase !important;
      }

      body.site-skin-1win .bf-clean-probs b {
        display: block !important;
        color: #fff !important;
        font-size: 17px !important;
        line-height: 1 !important;
      }

      body.site-skin-1win .model-view {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 18px !important;
        align-items: stretch !important;
      }

      body.site-skin-1win .model-view > .bf-panel {
        min-width: 0 !important;
        width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
      }

      body.site-skin-1win #matches-container,
      body.site-skin-1win #results-container {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        overflow: visible !important;
      }

      body.site-skin-1win .bf-clean-list {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 12px !important;
        width: 100% !important;
      }

      body.site-skin-1win .bf-clean-list-card {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        align-items: center !important;
        gap: 14px !important;
        width: 100% !important;
        min-width: 0 !important;
        padding: 16px !important;
        border-radius: 16px !important;
        border: 1px solid rgba(94,224,164,.12) !important;
        background: rgba(2,11,19,.38) !important;
      }

      body.site-skin-1win .bf-clean-list-card strong {
        display: block !important;
        color: #fff !important;
        font-size: 16px !important;
        line-height: 1.3 !important;
        font-weight: 900 !important;
        white-space: normal !important;
      }

      body.site-skin-1win .bf-clean-list-card small {
        display: block !important;
        margin-top: 6px !important;
        color: rgba(248,250,252,.68) !important;
        font-size: 13px !important;
        line-height: 1.45 !important;
        white-space: normal !important;
      }

      @media (max-width: 1100px) {
        body.site-skin-1win .bf-clean-grid,
        body.site-skin-1win .model-view {
          grid-template-columns: 1fr !important;
        }
      }

      @media (min-width: 1101px) and (max-width: 1320px) {
        body.site-skin-1win .bf-clean-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }

      @media (max-width: 768px) {
        body.site-skin-1win .bf-team-logo-wrap {
          width: 88px !important;
          height: 88px !important;
        }

        body.site-skin-1win .bf-clean-list-card {
          grid-template-columns: 1fr !important;
          align-items: flex-start !important;
        }

        body.site-skin-1win .bf-clean-pill {
          justify-self: start !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = cleanText(text);
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

  function renderFeaturedCard() {
    const m = MATCHES[0];
    setText('wcConfidence', 'AI Confidence ' + m.confidence + '%');
    setText('wcHomeTeam', m.home);
    setText('wcAwayTeam', m.away);
    setText('wcHomeNote', m.stage);
    setText('wcAwayNote', m.stage);
    setText('wcVersus', 'VS');
    setText('wcAdvice', m.advice);
    setText('wcHomePercent', m.homePercent + '%');
    setText('wcDrawPercent', m.drawPercent + '%');
    setText('wcAwayPercent', m.awayPercent + '%');
    setText('wcMatchDate', m.date);
    setText('wcMatchStatus', m.tag);
    setText('wcVenue', m.venue);
    setText('wcPredictionText', m.text);
    setImage('wcHomeLogo', m.homeLogo, m.home + ' flag');
    setImage('wcAwayLogo', m.awayLogo, m.away + ' flag');
    setBar('wcHomeBar', m.homePercent);
    setBar('wcDrawBar', m.drawPercent);
    setBar('wcAwayBar', m.awayPercent);
  }

  function renderPredictions() {
    const title = document.querySelector('.bf-predictions-section h2');
    const box = document.querySelector('.bf-predictions-table');
    if (title) title.textContent = 'Next World Cup Quarterfinal AI Predictions';
    if (!box) return;

    box.className = 'bf-predictions-table bf-clean-predictions';
    box.textContent = '';
    box.innerHTML = `
      <div class="bf-clean-grid">
        ${MATCHES.map(function (m) {
          return `
            <article class="bf-clean-match-card">
              <div class="bf-clean-card-top">
                <strong class="bf-clean-match-title">${m.home} vs ${m.away}</strong>
                <span class="bf-clean-stage">${m.stage}</span>
              </div>
              <div class="bf-clean-probs">
                <div><span>Home</span><b>${m.homePercent}%</b></div>
                <div><span>Draw</span><b>${m.drawPercent}%</b></div>
                <div><span>Away</span><b>${m.awayPercent}%</b></div>
              </div>
              <span class="bf-clean-pill">${m.pick}</span>
              <small class="bf-clean-meta">${m.date} · ${m.venue}</small>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderLowerPanels() {
    const upcoming = document.getElementById('matches-container');
    const results = document.getElementById('results-container');

    if (upcoming) {
      upcoming.textContent = '';
      upcoming.innerHTML = `
        <div class="bf-clean-list">
          ${MATCHES.map(function (m, index) {
            return `
              <article class="bf-clean-list-card">
                <div>
                  <strong>${m.home} vs ${m.away}</strong>
                  <small>${m.date} · ${m.venue}</small>
                </div>
                <span class="bf-clean-pill">${index === 0 ? 'Next' : 'QF'}</span>
              </article>
            `;
          }).join('')}
        </div>
      `;
    }

    if (results) {
      results.textContent = '';
      results.innerHTML = `
        <div class="bf-clean-list">
          ${RESULTS.map(function (r) {
            return `
              <article class="bf-clean-list-card">
                <div>
                  <strong>${r.match}</strong>
                  <small>${r.note}</small>
                </div>
                <span class="bf-clean-pill">${r.score}</span>
              </article>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  function renderSearch() {
    const input = document.getElementById('match-search-input');
    const button = document.getElementById('match-search-btn');
    const result = document.getElementById('match-search-result');
    const tags = document.querySelector('.bf-tags');

    if (input) input.placeholder = 'e.g. France vs Morocco';
    if (tags) {
      tags.innerHTML = MATCHES.map(function (m) {
        return `<button type="button">${m.home} vs ${m.away}</button>`;
      }).join('');
    }

    if (!input || !button || !result) return;

    const data = {};
    MATCHES.forEach(function (m) {
      data[(m.home + ' vs ' + m.away).toLowerCase()] = m;
    });

    function analyze(value) {
      const query = cleanText(value);
      if (!query) {
        result.textContent = 'Enter a match to see probabilities and AI reasoning.';
        return;
      }

      const m = data[query.toLowerCase().replace(/\s+/g, ' ')] || MATCHES[0];
      result.innerHTML = `
        <div class="bf-live-result">
          <h3>${m.home} vs ${m.away}</h3>
          <p><strong>Home:</strong> ${m.homePercent}% · <strong>Draw:</strong> ${m.drawPercent}% · <strong>Away:</strong> ${m.awayPercent}%<br><strong>AI pick:</strong> ${m.pick}<br><strong>Confidence:</strong> ${m.confidence}%<br>${m.text}</p>
        </div>
      `;
    }

    button.onclick = function () { analyze(input.value); };
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
    injectCss();
    renderFeaturedCard();
    renderPredictions();
    renderLowerPanels();
    renderSearch();
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
