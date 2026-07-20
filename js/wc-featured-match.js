(function () {
  const FINAL = {
    home: 'Spain',
    away: 'Argentina',
    stage: 'World Cup Final',
    date: '19 Jul',
    time: 'Full time after extra time',
    localTimes: 'New York 15:00 - London 20:00 - Tallinn 22:00 - Buenos Aires 16:00',
    venue: 'New York New Jersey Stadium, USA',
    homeScore: 1,
    awayScore: 0,
    scorer: 'Ferran Torres 106 min',
    tag: 'Champions',
    advice: 'SPAIN ARE THE 2026 FIFA WORLD CUP CHAMPIONS',
    text: 'Spain defeated Argentina 1-0 after extra time. Ferran Torres scored the winning goal in the 106th minute as Spain lifted their second World Cup trophy.',
    homeLogo: 'https://flagcdn.com/w160/es.png',
    awayLogo: 'https://flagcdn.com/w160/ar.png'
  };

  const RESULTS = [
    { match: 'Spain vs Argentina', score: '1-0 AET', note: 'Spain won the World Cup final with a 106th-minute goal from Ferran Torres' },
    { match: 'France vs England', score: '4-6', note: 'England secured third place in the ten-goal bronze final' },
    { match: 'England vs Argentina', score: '1-2', note: 'Argentina advanced to the World Cup final' },
    { match: 'France vs Spain', score: '0-2', note: 'Spain advanced to the World Cup final' }
  ];

  function cleanText(value) {
    return String(value || '')
      .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
      .replace(/[·•]/g, '-')
      .trim();
  }

  function injectHomepagePopup() {
    if (window.__BF_HOME_POPUP_161907__) return;
    window.__BF_HOME_POPUP_161907__ = true;
    window._aso = window._aso || {};
    window._aso.queue = window._aso.queue || [];
    window._aso.queue.push(function () {
      window._ASO.PuOptions = { idzone: 161907 };
      window._ASO.loadPuHelper();
    });
  }

  function injectCss() {
    const old = document.getElementById('bf-home-clean-css');
    if (old) old.remove();
    const style = document.createElement('style');
    style.id = 'bf-home-clean-css';
    style.textContent = `
      body.site-skin-1win .bf-team-logo-wrap{width:104px!important;height:104px!important;margin:0 auto 14px!important;border-radius:50%!important;overflow:hidden!important;background:rgba(255,255,255,.08)!important;border:1px solid rgba(255,255,255,.10)!important;display:grid!important;place-items:center!important}
      body.site-skin-1win .bf-team-logo-img{width:118%!important;height:118%!important;padding:0!important;object-fit:cover!important;transform:scale(1.06)!important}
      body.site-skin-1win .bf-ai-predicts{width:100%!important;max-width:100%!important}
      body.site-skin-1win .bf-clean-predictions{display:block!important;width:100%!important;min-width:0!important;overflow:visible!important;border:0!important;background:transparent!important}
      body.site-skin-1win .bf-clean-grid{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))!important;gap:14px!important;width:100%!important}
      body.site-skin-1win .bf-clean-match-card{display:flex!important;flex-direction:column!important;min-width:0!important;min-height:190px!important;padding:18px!important;border-radius:20px!important;border:1px solid rgba(94,224,164,.14)!important;background:rgba(2,11,19,.34)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)!important}
      body.site-skin-1win .bf-clean-match-card,body.site-skin-1win .bf-clean-match-card *,body.site-skin-1win .bf-line-panels,body.site-skin-1win .bf-line-panels *{writing-mode:horizontal-tb!important;text-orientation:mixed!important;transform:none!important;word-break:normal!important;overflow-wrap:normal!important;letter-spacing:normal!important;box-sizing:border-box!important}
      body.site-skin-1win .bf-clean-card-top{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:10px!important;margin-bottom:14px!important}
      body.site-skin-1win .bf-clean-match-title{color:#fff!important;font-size:18px!important;line-height:1.25!important;font-weight:900!important}
      body.site-skin-1win .bf-clean-stage,body.site-skin-1win .bf-clean-pill,body.site-skin-1win .bf-line-badge,body.site-skin-1win .bf-line-score{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:fit-content!important;max-width:100%!important;padding:7px 10px!important;border-radius:999px!important;color:#06120d!important;background:#5ee0a4!important;font-size:12px!important;line-height:1!important;font-weight:900!important;white-space:nowrap!important}
      body.site-skin-1win .bf-clean-stage{color:rgba(248,250,252,.9)!important;background:rgba(94,224,164,.16)!important;border:1px solid rgba(94,224,164,.18)!important}
      body.site-skin-1win .bf-clean-meta{display:block!important;margin-top:auto!important;color:rgba(248,250,252,.72)!important;font-size:13px!important;line-height:1.45!important}
      body.site-skin-1win .bf-time-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;margin-top:10px!important}
      body.site-skin-1win .bf-time-grid span{display:block!important;padding:8px!important;border-radius:12px!important;background:rgba(255,255,255,.04)!important;color:rgba(248,250,252,.76)!important;font-size:12px!important;line-height:1.2!important;text-align:center!important}
      body.site-skin-1win .bf-time-grid b{display:block!important;color:#fff!important;font-size:14px!important}
      body.site-skin-1win .bf-clean-probs{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;margin:14px 0!important}
      body.site-skin-1win .bf-clean-probs div{padding:10px 8px!important;border-radius:14px!important;background:rgba(255,255,255,.035)!important;text-align:center!important}
      body.site-skin-1win .bf-clean-probs span{display:block!important;margin-bottom:4px!important;color:rgba(248,250,252,.58)!important;font-size:10px!important;font-weight:900!important;text-transform:uppercase!important}
      body.site-skin-1win .bf-clean-probs b{display:block!important;color:#fff!important;font-size:17px!important;line-height:1!important}
      body.site-skin-1win .model-view.bf-line-panels{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:22px!important;width:100%!important;align-items:start!important;border:0!important;background:transparent!important;box-shadow:none!important}
      body.site-skin-1win .bf-line-panel{width:100%!important;min-width:0!important;padding:30px 32px!important;border-radius:28px!important;border:1px solid rgba(94,224,164,.16)!important;background:linear-gradient(180deg,rgba(18,38,55,.96),rgba(8,20,32,.98))!important;box-shadow:0 18px 50px rgba(0,0,0,.26)!important;overflow:hidden!important}
      body.site-skin-1win .bf-line-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;margin-bottom:20px!important}
      body.site-skin-1win .bf-line-head h2{margin:0!important;color:#fff!important;font-size:34px!important;line-height:1!important;letter-spacing:-.05em!important}
      body.site-skin-1win .bf-line-head span{padding:8px 12px!important;border-radius:999px!important;color:rgba(248,250,252,.72)!important;background:rgba(255,255,255,.055)!important;font-size:12px!important;font-weight:900!important;text-transform:uppercase!important;white-space:nowrap!important}
      body.site-skin-1win .bf-line-list{display:grid!important;gap:0!important;width:100%!important}
      body.site-skin-1win .bf-line-row{display:grid!important;grid-template-columns:100px minmax(0,1fr) auto!important;align-items:center!important;gap:18px!important;width:100%!important;padding:15px 0!important;border:0!important;border-bottom:1px solid rgba(94,224,164,.13)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}
      body.site-skin-1win .bf-line-row:first-child{padding-top:0!important}body.site-skin-1win .bf-line-row:last-child{padding-bottom:0!important;border-bottom:0!important}
      body.site-skin-1win .bf-line-date{display:grid!important;gap:4px!important;color:rgba(248,250,252,.58)!important;font-size:12px!important;line-height:1.1!important;text-transform:uppercase!important;white-space:nowrap!important}
      body.site-skin-1win .bf-line-date b{color:#fff!important;font-size:17px!important}
      body.site-skin-1win .bf-line-main strong{display:block!important;color:#fff!important;font-size:18px!important;line-height:1.22!important;font-weight:900!important}
      body.site-skin-1win .bf-line-main small{display:block!important;margin-top:5px!important;color:rgba(248,250,252,.68)!important;font-size:13px!important;line-height:1.35!important}
      body.site-skin-1win .bf-line-badge,body.site-skin-1win .bf-line-score{justify-self:end!important}
      @media(max-width:1100px){body.site-skin-1win .model-view.bf-line-panels{grid-template-columns:1fr!important}}
      @media(max-width:768px){body.site-skin-1win .bf-team-logo-wrap{width:88px!important;height:88px!important}body.site-skin-1win .bf-line-panel{padding:24px 18px!important}body.site-skin-1win .bf-line-head h2{font-size:30px!important}body.site-skin-1win .bf-line-row{grid-template-columns:1fr auto!important;gap:12px!important}body.site-skin-1win .bf-line-date{grid-column:1/-1!important;display:flex!important;gap:8px!important;align-items:baseline!important}.bf-time-grid{grid-template-columns:1fr!important}}
    `;
    document.head.appendChild(style);
  }

  function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = cleanText(text); }
  function setImage(id, src, alt) { const el = document.getElementById(id); if (el) { el.src = src; el.alt = alt || ''; el.style.visibility = 'visible'; } }
  function setBar(id, percent) { const el = document.getElementById(id); if (el) el.style.width = percent + '%'; }

  function renderFeaturedCard() {
    setText('wcConfidence', 'Tournament complete');
    setText('wcHomeTeam', FINAL.home);
    setText('wcAwayTeam', FINAL.away);
    setText('wcHomeNote', 'World champions');
    setText('wcAwayNote', 'Runners-up');
    setText('wcVersus', FINAL.homeScore + '-' + FINAL.awayScore);
    setText('wcAdvice', FINAL.advice);
    setText('wcHomePercent', FINAL.homeScore);
    setText('wcDrawPercent', 'AET');
    setText('wcAwayPercent', FINAL.awayScore);
    setText('wcMatchDate', FINAL.date);
    setText('wcMatchStatus', 'Full time');
    setText('wcVenue', FINAL.venue);
    setText('wcPredictionText', FINAL.text);
    setImage('wcHomeLogo', FINAL.homeLogo, FINAL.home + ' flag');
    setImage('wcAwayLogo', FINAL.awayLogo, FINAL.away + ' flag');
    setBar('wcHomeBar', 100);
    setBar('wcDrawBar', 0);
    setBar('wcAwayBar', 0);
    const boxes = document.querySelectorAll('#wcFeaturedCard .bf-probs > div');
    const labels = ['Spain', 'Match status', 'Argentina'];
    boxes.forEach(function (box, index) { const label = box.querySelector('small'); if (label) label.textContent = labels[index]; });
    const actions = document.querySelectorAll('#wcFeaturedCard .bf-featured-actions a');
    if (actions[0]) actions[0].textContent = 'View Final Result';
    if (actions[1]) actions[1].textContent = 'Tournament Insights';
  }

  function renderHero() {
    const pill = document.querySelector('.bf-hero-left > .bf-pill');
    const title = document.querySelector('.bf-hero-left > h1');
    const intro = document.querySelector('.bf-hero-left > p');
    const featuredTitle = document.querySelector('.bf-featured-top strong');
    if (pill) pill.textContent = 'World Cup 2026 Complete';
    if (title) title.innerHTML = 'Spain are champions. <span>The final whistle has blown.</span>';
    if (intro) intro.textContent = 'Spain defeated Argentina 1-0 after extra time to win the 2026 FIFA World Cup. Review the final result and the decisive matches from the closing weekend.';
    if (featuredTitle) featuredTitle.textContent = 'World Cup Final Result';
  }

  function renderPredictions() {
    const title = document.querySelector('.bf-predictions-section h2');
    const box = document.querySelector('.bf-predictions-table');
    if (title) title.textContent = '2026 World Cup Final Recap';
    if (!box) return;
    box.className = 'bf-predictions-table bf-clean-predictions';
    box.innerHTML = '<div class="bf-clean-grid"><article class="bf-clean-match-card"><div class="bf-clean-card-top"><strong class="bf-clean-match-title">Spain 1-0 Argentina</strong><span class="bf-clean-stage">After extra time</span></div><div class="bf-clean-probs"><div><span>Champion</span><b>Spain</b></div><div><span>Winning goal</span><b>106 min</b></div><div><span>Runner-up</span><b>Argentina</b></div></div><span class="bf-clean-pill">Spain champions</span><div class="bf-time-grid"><span>Scorer<b>Ferran Torres</b></span><span>Final status<b>Complete</b></span></div><small class="bf-clean-meta">19 Jul - New York New Jersey Stadium, USA</small></article></div>';
  }

  function renderLowerPanels() {
    const view = document.querySelector('.model-view');
    if (!view) return;
    view.className = 'model-view bf-line-panels';
    view.innerHTML = '<article class="bf-line-panel"><div class="bf-line-head"><h2>Upcoming Matches</h2><span>Tournament complete</span></div><div class="bf-line-list"><div class="bf-line-row"><span class="bf-line-date"><span>World Cup</span><b>Complete</b></span><span class="bf-line-main"><strong>No upcoming matches</strong><small>The 2026 FIFA World Cup ended with Spain winning the final on 19 July.</small></span><span class="bf-line-badge">Finished</span></div></div></article><article class="bf-line-panel"><div class="bf-line-head"><h2>Latest Results</h2><span>Final weekend</span></div><div class="bf-line-list">' + RESULTS.map(function (result) {
      return '<div class="bf-line-row"><span class="bf-line-date"><span>Final</span><b>Result</b></span><span class="bf-line-main"><strong>' + result.match + '</strong><small>' + result.note + '</small></span><span class="bf-line-score">' + result.score + '</span></div>';
    }).join('') + '</div></article>';
  }

  function renderSearch() {
    const input = document.getElementById('match-search-input');
    const button = document.getElementById('match-search-btn');
    const result = document.getElementById('match-search-result');
    const tags = document.querySelector('.bf-tags');
    if (input) input.placeholder = 'Spain vs Argentina';
    if (tags) tags.innerHTML = '<button type="button">Spain vs Argentina</button>';
    if (!input || !button || !result) return;
    function analyze() {
      result.innerHTML = '<div class="bf-live-result"><h3>Spain 1-0 Argentina</h3><p><strong>Status:</strong> Full time after extra time<br><strong>Winner:</strong> Spain<br><strong>Winning goal:</strong> Ferran Torres, 106th minute<br><strong>Venue:</strong> ' + FINAL.venue + '<br>' + FINAL.text + '</p></div>';
    }
    button.onclick = analyze;
    input.onkeydown = function (event) { if (event.key === 'Enter') analyze(); };
    document.querySelectorAll('.bf-tags button').forEach(function (tag) { tag.onclick = function () { input.value = tag.textContent.trim(); analyze(); }; });
  }

  function run() { injectHomepagePopup(); injectCss(); renderFeaturedCard(); renderHero(); renderPredictions(); renderLowerPanels(); renderSearch(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', run);
  setTimeout(run, 500);
  setTimeout(run, 1200);
})();