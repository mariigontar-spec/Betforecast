(function () {
  const MATCHES = [
    {
      home: 'Spain',
      away: 'Argentina',
      stage: 'World Cup Final',
      date: '19 Jul',
      time: '22:00 Tallinn',
      localTimes: 'Miami 15:00 - Spain 21:00 - Argentina 16:00',
      venue: 'New York New Jersey Stadium, USA',
      homePercent: 41,
      drawPercent: 30,
      awayPercent: 29,
      confidence: 78,
      pick: 'Spain edge',
      tag: 'Final',
      advice: 'PICK YOUR SIDE: SPAIN OR ARGENTINA. THE TROPHY NIGHT IS HERE.',
      text: 'Spain bring control, rhythm and pressure. Argentina bring champion nerve, final experience and a fearless late-game punch.',
      homeLogo: 'https://flagcdn.com/w160/es.png',
      awayLogo: 'https://flagcdn.com/w160/ar.png'
    },
    {
      home: 'France',
      away: 'England',
      stage: 'Bronze Final',
      date: '18 Jul',
      time: '00:00 Tallinn',
      localTimes: 'Miami 17:00 - Spain 23:00 - Argentina 18:00',
      venue: 'Miami Stadium, Miami, USA',
      homePercent: 39,
      drawPercent: 29,
      awayPercent: 32,
      confidence: 64,
      pick: 'France slight lean',
      tag: 'Bronze',
      advice: 'ONE LAST PUSH FOR THE PODIUM. SUPPORT YOUR TEAM TO THE WHISTLE.',
      text: 'France and England meet for third place after semifinal defeats. France hold a narrow model edge, but England remain dangerous in transition.',
      homeLogo: 'https://flagcdn.com/w160/fr.png',
      awayLogo: 'https://flagcdn.com/w160/gb-eng.png'
    }
  ];

  const RESULTS = [
    { match: 'England vs Argentina', score: '1-2', note: 'Argentina advanced to the World Cup final' },
    { match: 'France vs Spain', score: '0-2', note: 'Spain advanced to the World Cup final' },
    { match: 'Argentina vs Switzerland', score: '3-1', note: 'Argentina advanced to the semifinal' }
  ];

  function cleanText(value) {
    return String(value || '')
      .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
      .replace(/[·•]/g, '-')
      .trim();
  }

  function injectHomepagePopup() {
    if (document.getElementById('bf-home-popup-zone')) return;

    const popup = document.createElement('ins');
    popup.id = 'bf-home-popup-zone';
    popup.className = 'ins-zone bf-popup-zone';
    popup.setAttribute('data-zone', '161907');
    popup.setAttribute('aria-hidden', 'true');
    popup.style.position = 'absolute';
    popup.style.left = '-9999px';
    popup.style.top = '0';
    popup.style.width = '1px';
    popup.style.height = '1px';
    popup.style.overflow = 'hidden';
    document.body.insertBefore(popup, document.body.firstChild);
  }

  function injectCss() {
    const old = document.getElementById('bf-home-clean-css');
    if (old) old.remove();

    const style = document.createElement('style');
    style.id = 'bf-home-clean-css';
    style.textContent = `
      body.site-skin-1win .bf-popup-zone{position:absolute!important;left:-9999px!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important}
      body.site-skin-1win .bf-team-logo-wrap{width:104px!important;height:104px!important;margin:0 auto 14px!important;border-radius:50%!important;overflow:hidden!important;background:rgba(255,255,255,.08)!important;border:1px solid rgba(255,255,255,.10)!important;display:grid!important;place-items:center!important}
      body.site-skin-1win .bf-team-logo-img{width:118%!important;height:118%!important;padding:0!important;object-fit:cover!important;transform:scale(1.06)!important}
      body.site-skin-1win .bf-ai-predicts{width:100%!important;max-width:100%!important}
      body.site-skin-1win .bf-clean-predictions{display:block!important;width:100%!important;min-width:0!important;overflow:visible!important;border:0!important;background:transparent!important}
      body.site-skin-1win .bf-clean-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:14px!important;width:100%!important}
      body.site-skin-1win .bf-clean-match-card{display:flex!important;flex-direction:column!important;min-width:0!important;min-height:190px!important;padding:18px!important;border-radius:20px!important;border:1px solid rgba(94,224,164,.14)!important;background:rgba(2,11,19,.34)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)!important}
      body.site-skin-1win .bf-clean-match-card,body.site-skin-1win .bf-clean-match-card *,body.site-skin-1win .bf-line-panels,body.site-skin-1win .bf-line-panels *{writing-mode:horizontal-tb!important;text-orientation:mixed!important;transform:none!important;word-break:normal!important;overflow-wrap:normal!important;letter-spacing:normal!important;box-sizing:border-box!important}
      body.site-skin-1win .bf-clean-card-top{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;gap:10px!important;margin-bottom:14px!important}
      body.site-skin-1win .bf-clean-match-title{color:#fff!important;font-size:18px!important;line-height:1.25!important;font-weight:900!important}
      body.site-skin-1win .bf-clean-stage,body.site-skin-1win .bf-clean-pill,body.site-skin-1win .bf-line-badge,body.site-skin-1win .bf-line-score{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:fit-content!important;max-width:100%!important;padding:7px 10px!important;border-radius:999px!important;color:#06120d!important;background:#5ee0a4!important;font-size:12px!important;line-height:1!important;font-weight:900!important;white-space:nowrap!important}
      body.site-skin-1win .bf-clean-stage{color:rgba(248,250,252,.9)!important;background:rgba(94,224,164,.16)!important;border:1px solid rgba(94,224,164,.18)!important}
      body.site-skin-1win .bf-clean-meta{display:block!important;margin-top:auto!important;color:rgba(248,250,252,.72)!important;font-size:13px!important;line-height:1.45!important}
      body.site-skin-1win .bf-time-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;margin-top:10px!important}
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
      @media(max-width:1100px){body.site-skin-1win .bf-clean-grid,body.site-skin-1win .model-view.bf-line-panels{grid-template-columns:1fr!important}}
      @media(max-width:768px){body.site-skin-1win .bf-team-logo-wrap{width:88px!important;height:88px!important}body.site-skin-1win .bf-line-panel{padding:24px 18px!important}body.site-skin-1win .bf-line-head h2{font-size:30px!important}body.site-skin-1win .bf-line-row{grid-template-columns:1fr auto!important;gap:12px!important}body.site-skin-1win .bf-line-date{grid-column:1/-1!important;display:flex!important;gap:8px!important;align-items:baseline!important}.bf-time-grid{grid-template-columns:1fr!important}}
    `;
    document.head.appendChild(style);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = cleanText(text);
  }

  function setImage(id, src, alt) {
    const el = document.getElementById(id);
    if (el) {
      el.src = src;
      el.alt = alt || '';
      el.style.visibility = 'visible';
    }
  }

  function setBar(id, percent) {
    const el = document.getElementById(id);
    if (el) el.style.width = percent + '%';
  }

  function splitTimes(times) {
    return String(times || '')
      .split(' - ')
      .map(function (part) {
        const pieces = part.split(' ');
        return { label: pieces[0] || '', time: pieces.slice(1).join(' ') || '' };
      });
  }

  function renderFeaturedCard() {
    const match = MATCHES[0];
    setText('wcConfidence', 'AI Confidence ' + match.confidence + '%');
    setText('wcHomeTeam', match.home);
    setText('wcAwayTeam', match.away);
    setText('wcHomeNote', match.stage);
    setText('wcAwayNote', match.stage);
    setText('wcVersus', 'VS');
    setText('wcAdvice', match.advice);
    setText('wcHomePercent', match.homePercent + '%');
    setText('wcDrawPercent', match.drawPercent + '%');
    setText('wcAwayPercent', match.awayPercent + '%');
    setText('wcMatchDate', match.date + ', ' + match.time);
    setText('wcMatchStatus', match.tag);
    setText('wcVenue', match.venue);
    setText('wcPredictionText', match.text + ' Match times: ' + match.localTimes + '.');
    setImage('wcHomeLogo', match.homeLogo, match.home + ' flag');
    setImage('wcAwayLogo', match.awayLogo, match.away + ' flag');
    setBar('wcHomeBar', match.homePercent);
    setBar('wcDrawBar', match.drawPercent);
    setBar('wcAwayBar', match.awayPercent);

    const boxes = document.querySelectorAll('#wcFeaturedCard .bf-probs > div');
    const labels = [match.home + ' Win', 'Draw', match.away + ' Win'];
    boxes.forEach(function (box, index) {
      const label = box.querySelector('small');
      if (label) label.textContent = labels[index];
    });

    const actions = document.querySelectorAll('#wcFeaturedCard .bf-featured-actions a');
    if (actions[0]) actions[0].textContent = 'Final Match Details';
    if (actions[1]) actions[1].textContent = 'AI Final Preview';
  }

  function renderHero() {
    const pill = document.querySelector('.bf-hero-left > .bf-pill');
    const title = document.querySelector('.bf-hero-left > h1');
    const intro = document.querySelector('.bf-hero-left > p');
    const featuredTitle = document.querySelector('.bf-featured-top strong');

    if (pill) pill.textContent = 'World Cup Final Weekend';
    if (title) title.innerHTML = 'Choose your colours. <span>Back your final team.</span>';
    if (intro) intro.textContent = 'Spain and Argentina play for the trophy. France and England fight for bronze. Pick your side, check the kickoff times and support your team until the final whistle.';
    if (featuredTitle) featuredTitle.textContent = 'World Cup Final Focus';
  }

  function renderPredictions() {
    const title = document.querySelector('.bf-predictions-section h2');
    const box = document.querySelector('.bf-predictions-table');

    if (title) title.textContent = 'Final Weekend AI Predictions';
    if (!box) return;

    box.className = 'bf-predictions-table bf-clean-predictions';
    box.innerHTML = '<div class="bf-clean-grid">' + MATCHES.map(function (match) {
      const times = splitTimes(match.localTimes)
        .map(function (item) { return '<span>' + item.label + '<b>' + item.time + '</b></span>'; })
        .join('');

      return '<article class="bf-clean-match-card"><div class="bf-clean-card-top"><strong class="bf-clean-match-title">' + match.home + ' vs ' + match.away + '</strong><span class="bf-clean-stage">' + match.stage + '</span></div><div class="bf-clean-probs"><div><span>' + match.home + '</span><b>' + match.homePercent + '%</b></div><div><span>Draw</span><b>' + match.drawPercent + '%</b></div><div><span>' + match.away + '</span><b>' + match.awayPercent + '%</b></div></div><span class="bf-clean-pill">' + match.pick + '</span><div class="bf-time-grid">' + times + '</div><small class="bf-clean-meta">' + match.date + ' - ' + match.venue + '</small></article>';
    }).join('') + '</div>';
  }

  function renderLowerPanels() {
    const view = document.querySelector('.model-view');
    if (!view) return;

    view.className = 'model-view bf-line-panels';
    view.innerHTML = '<article class="bf-line-panel"><div class="bf-line-head"><h2>Final Matches</h2><span>Support your team</span></div><div class="bf-line-list">' + MATCHES.map(function (match) {
      return '<div class="bf-line-row"><span class="bf-line-date"><span>' + match.date + '</span><b>' + match.time + '</b></span><span class="bf-line-main"><strong>' + match.home + ' vs ' + match.away + '</strong><small>' + match.stage + ' - ' + match.localTimes + '</small></span><span class="bf-line-badge">' + match.tag + '</span></div>';
    }).join('') + '</div></article><article class="bf-line-panel"><div class="bf-line-head"><h2>Latest Results</h2><span>Road to final</span></div><div class="bf-line-list">' + RESULTS.map(function (result) {
      return '<div class="bf-line-row"><span class="bf-line-date"><span>Last</span><b>Match</b></span><span class="bf-line-main"><strong>' + result.match + '</strong><small>' + result.note + '</small></span><span class="bf-line-score">' + result.score + '</span></div>';
    }).join('') + '</div></article>';
  }

  function renderSearch() {
    const input = document.getElementById('match-search-input');
    const button = document.getElementById('match-search-btn');
    const result = document.getElementById('match-search-result');
    const tags = document.querySelector('.bf-tags');

    if (input) input.placeholder = 'Spain vs Argentina';
    if (tags) {
      tags.innerHTML = MATCHES.map(function (match) {
        return '<button type="button">' + match.home + ' vs ' + match.away + '</button>';
      }).join('');
    }

    if (!input || !button || !result) return;

    function analyze(value) {
      const query = cleanText(value).toLowerCase();
      const match = MATCHES.find(function (item) {
        return (item.home + ' vs ' + item.away).toLowerCase() === query;
      }) || MATCHES[0];

      result.innerHTML = '<div class="bf-live-result"><h3>' + match.home + ' vs ' + match.away + '</h3><p><strong>' + match.home + ' win:</strong> ' + match.homePercent + '% - <strong>Draw:</strong> ' + match.drawPercent + '% - <strong>' + match.away + ' win:</strong> ' + match.awayPercent + '%<br><strong>Kickoff:</strong> ' + match.localTimes + '<br><strong>Venue:</strong> ' + match.venue + '<br><strong>AI pick:</strong> ' + match.pick + '<br><strong>Confidence:</strong> ' + match.confidence + '%<br>' + match.text + '</p></div>';
    }

    button.onclick = function () { analyze(input.value); };
    input.onkeydown = function (event) { if (event.key === 'Enter') analyze(input.value); };

    document.querySelectorAll('.bf-tags button').forEach(function (tag) {
      tag.onclick = function () {
        input.value = tag.textContent.trim();
        analyze(input.value);
      };
    });
  }

  function run() {
    injectHomepagePopup();
    injectCss();
    renderFeaturedCard();
    renderHero();
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
