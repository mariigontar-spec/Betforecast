const FINAL_FOCUS_MATCHES = [
  {
    id: 'final',
    fixtureId: '53452537',
    league: 'World Cup Final',
    status: 'NS',
    statusLong: 'Scheduled',
    statusCategory: 'scheduled',
    date: '19 Jul 2026',
    time: '22:00 Tallinn · 21:00 Spain · 16:00 Argentina · 15:00 Miami',
    stadium: 'New York New Jersey Stadium',
    home: 'Spain',
    away: 'Argentina',
    homeLogo: 'https://flagcdn.com/w160/es.png',
    awayLogo: 'https://flagcdn.com/w160/ar.png',
    homeShort: 'ESP',
    awayShort: 'ARG',
    projectedScore: 'vs',
    homePct: 37,
    drawPct: 30,
    awayPct: 33,
    confidence: 69,
    bestTip: 'Final: support your colours',
    goalsLean: 'Tight final line',
    btts: 'Pressure match',
    xgHome: '1.4',
    xgAway: '1.3',
    shotsHome: '12',
    shotsAway: '11',
    possessionHome: '58%',
    possessionAway: '42%',
    summary: 'Spain and Argentina are the main event now. The final deserves first screen priority: Spain bring control and rhythm, Argentina bring champion nerve and knockout fire. Pick your side and follow every signal until the last whistle.',
    factors: ['World Cup Final', 'Spain control', 'Argentina transition threat', 'Miami 15:00 / Spain 21:00 / Argentina 16:00'],
    timeline: [
      { minute: 'Now', text: 'Final focus: Spain vs Argentina is the priority match on Betforecast.' },
      { minute: '0-20', text: 'Spain will try to lock the ball and slow Argentina transitions early.' },
      { minute: '20-60', text: 'Argentina can flip the match if they turn pressure into direct attacks.' },
      { minute: '70-90', text: 'The final stretch belongs to composure, substitutions and one clean moment.' }
    ],
    formHome: ['W', 'W', 'W', 'W', 'W'],
    formAway: ['W', 'W', 'W', 'W', 'W'],
    homeStats: [
      'Finalist: Spain',
      'Route: beat France 2-0 in the semifinal',
      'Match style: possession control and patient pressure',
      'Support angle: back La Roja for rhythm and structure'
    ],
    awayStats: [
      'Finalist: Argentina',
      'Route: beat England 2-1 in the semifinal',
      'Match style: direct punch and champion mentality',
      'Support angle: back Argentina for late-game nerve'
    ],
    quickInsightTitle: 'Final spark',
    quickInsight: 'This is the match to put first: Spain can own the tempo, but Argentina only need one transition or one late moment to turn the final into chaos.',
    related: [
      { id: 'third-place', home: 'France', away: 'England', league: 'Third Place Playoff' },
      { id: 'france-spain', home: 'France', away: 'Spain', league: 'Semifinal result · Spain 2-0' },
      { id: 'england-argentina', home: 'England', away: 'Argentina', league: 'Semifinal result · Argentina 2-1' }
    ]
  },
  {
    id: 'third-place',
    fixtureId: '53452539',
    league: 'Third Place Playoff',
    status: 'NS',
    statusLong: 'Scheduled',
    statusCategory: 'scheduled',
    date: '19 Jul 2026',
    time: '00:00 Tallinn · 23:00 Spain · 18:00 Argentina · 17:00 Miami',
    stadium: 'Miami Stadium',
    home: 'France',
    away: 'England',
    homeLogo: 'https://flagcdn.com/w160/fr.png',
    awayLogo: 'https://flagcdn.com/w160/gb-eng.png',
    homeShort: 'FRA',
    awayShort: 'ENG',
    projectedScore: 'vs',
    homePct: 39,
    drawPct: 29,
    awayPct: 32,
    confidence: 61,
    bestTip: 'Bronze battle',
    goalsLean: 'Open late',
    btts: 'Possible',
    xgHome: '1.3',
    xgAway: '1.2',
    shotsHome: '11',
    shotsAway: '10',
    possessionHome: '53%',
    possessionAway: '47%',
    summary: 'France and England meet for bronze, but the match page keeps the final above everything. This game is the last chance to finish the tournament on the podium.',
    factors: ['Bronze final', 'Recovery after semifinal defeat', 'Squad rotation risk', 'Miami evening kickoff'],
    timeline: [
      { minute: 'Now', text: 'Bronze final sits behind the Spain vs Argentina title match in priority.' },
      { minute: '0-30', text: 'Early energy will show which side has recovered emotionally.' },
      { minute: '30-70', text: 'Midfield control and wide attacks can decide the rhythm.' },
      { minute: '70-90', text: 'Late substitutions can open the bronze match fast.' }
    ],
    formHome: ['L', 'W', 'W', 'W', 'W'],
    formAway: ['L', 'W', 'W', 'W', 'W'],
    homeStats: ['Team: France', 'Stage: Third Place Playoff', 'Kickoff: 00:00 Tallinn', 'Motivation: podium finish'],
    awayStats: ['Team: England', 'Stage: Third Place Playoff', 'Kickoff: 17:00 Miami', 'Motivation: bronze medal'],
    quickInsightTitle: 'Bronze read',
    quickInsight: 'France vs England is emotional and open, but the homepage and match page priority remains the Spain vs Argentina final.',
    related: [
      { id: 'final', home: 'Spain', away: 'Argentina', league: 'World Cup Final' },
      { id: 'france-spain', home: 'France', away: 'Spain', league: 'Semifinal result · Spain 2-0' },
      { id: 'england-argentina', home: 'England', away: 'Argentina', league: 'Semifinal result · Argentina 2-1' }
    ]
  },
  {
    id: 'france-spain',
    league: 'Semifinal Result',
    status: 'FT',
    statusLong: 'Match Finished',
    statusCategory: 'finished',
    date: '14 Jul 2026',
    time: 'FT',
    stadium: 'Dallas Stadium',
    home: 'France',
    away: 'Spain',
    homeLogo: 'https://flagcdn.com/w160/fr.png',
    awayLogo: 'https://flagcdn.com/w160/es.png',
    homeShort: 'FRA',
    awayShort: 'ESP',
    projectedScore: '0 - 2',
    finalScore: '0 - 2',
    homePct: 0,
    drawPct: 0,
    awayPct: 100,
    confidence: 100,
    bestTip: 'Spain advanced',
    goalsLean: 'Under 2.5',
    btts: 'No',
    summary: 'Spain beat France 2-0 and moved into the World Cup final.',
    factors: ['Result confirmed', 'Spain finalist', 'France to bronze match'],
    timeline: [
      { minute: 'FT', text: 'Spain defeated France 2-0.' },
      { minute: 'Next', text: 'Spain now face Argentina in the World Cup final.' }
    ],
    related: [
      { id: 'final', home: 'Spain', away: 'Argentina', league: 'World Cup Final' },
      { id: 'third-place', home: 'France', away: 'England', league: 'Third Place Playoff' }
    ]
  },
  {
    id: 'england-argentina',
    league: 'Semifinal Result',
    status: 'FT',
    statusLong: 'Match Finished',
    statusCategory: 'finished',
    date: '15 Jul 2026',
    time: 'FT',
    stadium: 'Atlanta Stadium',
    home: 'England',
    away: 'Argentina',
    homeLogo: 'https://flagcdn.com/w160/gb-eng.png',
    awayLogo: 'https://flagcdn.com/w160/ar.png',
    homeShort: 'ENG',
    awayShort: 'ARG',
    projectedScore: '1 - 2',
    finalScore: '1 - 2',
    homePct: 0,
    drawPct: 0,
    awayPct: 100,
    confidence: 100,
    bestTip: 'Argentina advanced',
    goalsLean: 'Over 2.5',
    btts: 'Yes',
    summary: 'Argentina beat England 2-1 and joined Spain in the World Cup final.',
    factors: ['Result confirmed', 'Argentina finalist', 'England to bronze match'],
    timeline: [
      { minute: 'FT', text: 'Argentina defeated England 2-1.' },
      { minute: 'Next', text: 'Argentina now face Spain for the World Cup title.' }
    ],
    related: [
      { id: 'final', home: 'Spain', away: 'Argentina', league: 'World Cup Final' },
      { id: 'third-place', home: 'France', away: 'England', league: 'Third Place Playoff' }
    ]
  }
];

async function loadMatchPage() {
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('id') || params.get('fixture') || params.get('match');
  const legacyGame = params.get('game');

  try {
    let match = null;
    let related = [];

    const staticRequested = findStaticFocusMatch(requestedId || legacyGame);

    try {
      const cached = await loadWorldCupCache();
      const fixtures = Array.isArray(cached.fixtures) ? cached.fixtures : [];

      if (requestedId) {
        const selectedFixture = findFixtureById(fixtures, requestedId);
        if (selectedFixture) {
          related = buildRelatedFixtures(fixtures, selectedFixture);
          match = mapFixtureToMatch(selectedFixture, related, cached.updatedAt);
        }
      }
    } catch (cacheError) {
      console.warn('[Match cache]', cacheError);
    }

    if (!match && staticRequested) {
      match = cloneMatch(staticRequested);
    }

    if (!match && requestedId) {
      match = await loadApiFixture(requestedId);
    }

    if (!match && legacyGame) {
      match = await loadLegacyMatch(legacyGame);
    }

    if (!match) {
      match = cloneMatch(FINAL_FOCUS_MATCHES[0]);
    }

    renderMatch(match);
  } catch (error) {
    console.error('Failed to load match page:', error);
    renderMatchError();
  }
}

async function loadWorldCupCache() {
  const response = await fetch(`/data/wc-2026.json?v=${Date.now()}`, {
    method: 'GET',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`World Cup cache failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.fixtures)) {
    throw new Error('World Cup cache is empty or invalid');
  }

  return data;
}

function findStaticFocusMatch(value) {
  const normalized = normalizeAlias(value);
  if (!normalized) return null;

  return FINAL_FOCUS_MATCHES.find((match) => {
    const names = normalizeAlias(`${match.home} ${match.away}`);
    const reverseNames = normalizeAlias(`${match.away} ${match.home}`);
    const vsNames = normalizeAlias(`${match.home} vs ${match.away}`);
    const reverseVsNames = normalizeAlias(`${match.away} vs ${match.home}`);

    return [
      normalizeAlias(match.id),
      normalizeAlias(match.fixtureId),
      normalizeAlias(match.league),
      names,
      reverseNames,
      vsNames,
      reverseVsNames
    ].includes(normalized);
  }) || null;
}

function normalizeAlias(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cloneMatch(match) {
  return JSON.parse(JSON.stringify(match));
}

function findFixtureById(fixtures, requestedId) {
  if (!requestedId) return null;

  return fixtures.find((item) => {
    return String(item?.fixture?.id || '') === String(requestedId);
  }) || null;
}

function buildRelatedFixtures(fixtures, currentFixture) {
  const currentId = String(currentFixture?.fixture?.id || '');
  const currentRound = currentFixture?.league?.round || '';
  const now = Date.now();

  return fixtures
    .filter((item) => String(item?.fixture?.id || '') !== currentId)
    .sort((a, b) => {
      const aPriority = fixturePriority(a);
      const bPriority = fixturePriority(b);
      if (aPriority !== bPriority) return aPriority - bPriority;

      const aSameRound = a?.league?.round === currentRound ? 0 : 1;
      const bSameRound = b?.league?.round === currentRound ? 0 : 1;
      if (aSameRound !== bSameRound) return aSameRound - bSameRound;

      const aFuture = new Date(a?.fixture?.date || 0).getTime() >= now ? 0 : 1;
      const bFuture = new Date(b?.fixture?.date || 0).getTime() >= now ? 0 : 1;
      if (aFuture !== bFuture) return aFuture - bFuture;

      return (a?.fixture?.timestamp || 0) - (b?.fixture?.timestamp || 0);
    })
    .slice(0, 4)
    .map((item) => ({
      id: item.fixture?.id,
      home: item.teams?.home?.name || 'Home',
      away: item.teams?.away?.name || 'Away',
      league: item.league?.round || item.league?.name || 'World Cup 2026'
    }));
}

function fixturePriority(item) {
  const home = item?.teams?.home?.name || '';
  const away = item?.teams?.away?.name || '';
  const round = item?.league?.round || '';

  if (isTeamPair(home, away, 'Spain', 'Argentina')) return 0;
  if (String(round).toLowerCase().includes('final')) return 1;
  if (isTeamPair(home, away, 'France', 'England')) return 2;
  return 10;
}

function isTeamPair(home, away, a, b) {
  const h = String(home).toLowerCase();
  const aw = String(away).toLowerCase();
  const one = String(a).toLowerCase();
  const two = String(b).toLowerCase();
  return (h === one && aw === two) || (h === two && aw === one);
}

function mapFixtureToMatch(item, related = [], updatedAt = '') {
  const fixture = item.fixture || {};
  const league = item.league || {};
  const teams = item.teams || {};
  const goals = item.goals || {};
  const score = item.score || {};

  const home = teams.home || {};
  const away = teams.away || {};
  const statusShort = fixture.status?.short || 'NS';
  const statusLong = fixture.status?.long || statusShort;
  const statusCategory = getStatusCategory(statusShort);
  const hasScore = hasNumber(goals.home) && hasNumber(goals.away);
  const penalty = score.penalty || {};
  const hasPenalty = hasNumber(penalty.home) && hasNumber(penalty.away);
  const homeName = home.name || 'Home Team';
  const awayName = away.name || 'Away Team';
  const prediction = getSyntheticPrediction(homeName, awayName);

  const scoreText = hasScore
    ? `${goals.home} - ${goals.away}${hasPenalty ? ` (${penalty.home}-${penalty.away} pens)` : ''}`
    : 'vs';

  const dateObj = fixture.date ? new Date(fixture.date) : null;

  return {
    id: String(fixture.id || ''),
    league: league.round || league.name || 'FIFA World Cup 2026',
    status: statusShort,
    statusLong,
    statusCategory,
    minute: fixture.status?.elapsed ? `${fixture.status.elapsed}'` : '',
    date: formatDate(dateObj),
    time: statusCategory === 'live' ? fixture.status?.elapsed ? `${fixture.status.elapsed}'` : 'Live' : formatTime(dateObj),
    stadium: fixture.venue?.name || fixture.venue?.city || 'World Cup venue',
    home: homeName,
    away: awayName,
    homeLogo: home.logo || '',
    awayLogo: away.logo || '',
    homeShort: getShortName(homeName),
    awayShort: getShortName(awayName),
    projectedScore: scoreText,
    finalScore: statusCategory === 'finished' ? scoreText : '',
    liveScore: statusCategory === 'live' ? scoreText : '',
    homePct: prediction.home,
    drawPct: prediction.draw,
    awayPct: prediction.away,
    confidence: prediction.confidence,
    summary: buildSummary(homeName, awayName, statusCategory, scoreText, league.round, updatedAt),
    bestTip: getBestTip(homeName, awayName, goals.home, goals.away, statusCategory, prediction),
    goalsLean: hasScore ? Number(goals.home) + Number(goals.away) > 2.5 ? 'Over 2.5' : 'Under 2.5' : 'Market pending',
    btts: hasScore ? Number(goals.home) > 0 && Number(goals.away) > 0 ? 'Yes' : 'No' : statusCategory === 'live' ? 'Live' : 'Pending',
    xgHome: '-',
    xgAway: '-',
    shotsHome: '-',
    shotsAway: '-',
    possessionHome: '-',
    possessionAway: '-',
    factors: buildFactors(statusCategory, league.round, fixture.venue?.name),
    timeline: buildTimeline(homeName, awayName, statusCategory, scoreText, statusLong, fixture.status?.elapsed),
    formHome: ['W', 'D', 'W', 'L', 'W'],
    formAway: ['D', 'W', 'L', 'W', 'D'],
    homeStats: [
      `Round: ${league.round || 'World Cup'}`,
      `Status: ${statusLong}`,
      `Venue: ${fixture.venue?.name || 'TBA'}`,
      'Cache source: World Cup JSON'
    ],
    awayStats: [
      `Kickoff: ${formatDateTime(dateObj)}`,
      `Score: ${scoreText}`,
      'Prediction model: synthetic',
      `Fixture ID: ${fixture.id || 'N/A'}`
    ],
    quickInsight: buildQuickInsight(homeName, awayName, statusCategory),
    related
  };
}

async function loadApiFixture(fixtureId) {
  if (typeof BF_API === 'undefined' || !BF_API.baseUrl || !BF_API.key) {
    return null;
  }

  const response = await fetch(`${String(BF_API.baseUrl).replace(/\/+$/, '')}/fixtures?id=${encodeURIComponent(fixtureId)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-apisports-key': BF_API.key,
      'x-rapidapi-host': BF_API.host || 'v3.football.api-sports.io'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`API fixture failed: ${response.status}`);
  }

  const data = await response.json();
  const apiMatch = data.response?.[0];

  return apiMatch ? mapFixtureToMatch(apiMatch, [], 'Live API fallback') : null;
}

async function loadLegacyMatch(gameId) {
  try {
    const response = await fetch('data/matches.json', {
      cache: 'no-store'
    });

    if (!response.ok) return null;

    const matches = await response.json();
    return matches.find((item) => String(item.id) === String(gameId)) || null;
  } catch {
    return null;
  }
}

function renderMatch(match) {
  const isLive = match.statusCategory === 'live' || match.status === 'live';
  const isFinished = match.statusCategory === 'finished' || match.status === 'finished';

  const homeName = match.home || 'Home Team';
  const awayName = match.away || 'Away Team';

  const homeShort = match.homeShort || getShortName(homeName);
  const awayShort = match.awayShort || getShortName(awayName);

  const projectedScore = match.projectedScore || match.predictedScore || match.liveScore || match.finalScore || 'vs';

  const heroScore = isLive
    ? match.liveScore || projectedScore
    : isFinished
    ? match.finalScore || projectedScore
    : projectedScore;

  const confidence = typeof match.confidence === 'number' ? match.confidence : 74;
  const homePct = typeof match.homePct === 'number' ? match.homePct : 47;
  const drawPct = typeof match.drawPct === 'number' ? match.drawPct : 28;
  const awayPct = typeof match.awayPct === 'number' ? match.awayPct : 25;

  const summary =
    match.summary ||
    `${homeName} vs ${awayName} is profiled by our model as a balanced matchup with clear pressure phases, scoring windows, and game-state shifts to watch.`;

  const scoreParts = String(heroScore || projectedScore).split('-');
  const homeGoals = Number(scoreParts[0]?.trim());
  const awayGoals = Number(scoreParts[1]?.trim());
  const hasScore = Number.isFinite(homeGoals) && Number.isFinite(awayGoals);
  const totalGoals = hasScore ? homeGoals + awayGoals : null;

  const bestTip = match.bestTip || (hasScore
    ? homeGoals > awayGoals
      ? 'Home Win'
      : awayGoals > homeGoals
      ? 'Away Win'
      : 'Draw'
    : isLive
    ? 'Live Match'
    : 'Match Preview');

  const goalsLean = match.goalsLean || (hasScore
    ? totalGoals > 2.5
      ? 'Over 2.5'
      : 'Under 2.5'
    : 'Market pending');

  const btts = match.btts || (hasScore
    ? homeGoals > 0 && awayGoals > 0
      ? 'Yes'
      : 'No'
    : isLive
    ? 'Live'
    : 'Pending');

  const quickInsight =
    match.quickInsight ||
    `The key swing factor in ${homeName} vs ${awayName} is who controls momentum after the first major chance.`;

  const xgHome = match.xgHome ?? '-';
  const xgAway = match.xgAway ?? '-';
  const shotsHome = match.shotsHome ?? '-';
  const shotsAway = match.shotsAway ?? '-';
  const possessionHome = match.possessionHome ?? '-';
  const possessionAway = match.possessionAway ?? '-';

  const dateText = match.date || (isLive ? 'Live Today' : isFinished ? 'Finished' : 'Matchday');
  const timeText = isLive ? match.minute || match.time || 'Live' : match.time || 'TBA';
  const stadiumText = match.stadium || 'World Cup venue';

  const factors =
    Array.isArray(match.factors) && match.factors.length
      ? match.factors
      : [isLive ? 'Live momentum' : 'Match context', 'Chance quality', 'Game-state pressure'];

  const timeline =
    Array.isArray(match.timeline) && match.timeline.length
      ? match.timeline
      : buildTimeline(homeName, awayName, isFinished ? 'finished' : isLive ? 'live' : 'scheduled', heroScore, match.statusLong, match.minute);

  const formHome =
    Array.isArray(match.formHome) && match.formHome.length
      ? match.formHome
      : ['W', 'D', 'W', 'L', 'W'];

  const formAway =
    Array.isArray(match.formAway) && match.formAway.length
      ? match.formAway
      : ['D', 'W', 'L', 'W', 'D'];

  const homeStats =
    Array.isArray(match.homeStats) && match.homeStats.length
      ? match.homeStats
      : [
          `xG trend: ${xgHome}`,
          `Projected shots: ${shotsHome}`,
          `Possession lean: ${possessionHome}`,
          `Status: ${match.status || 'NS'}`
        ];

  const awayStats =
    Array.isArray(match.awayStats) && match.awayStats.length
      ? match.awayStats
      : [
          `xG trend: ${xgAway}`,
          `Projected shots: ${shotsAway}`,
          `Possession lean: ${possessionAway}`,
          `Status: ${match.status || 'NS'}`
        ];

  setText('match-league-badge', match.league || 'FIFA World Cup 2026');
  setText('match-title', `${homeName} vs ${awayName}`);
  setText(
    'match-subtitle',
    match.id === 'final'
      ? 'Finalist priority mode: Spain and Argentina are now first on the match page. Choose your colours and follow the World Cup title fight.'
      : isLive
      ? `Live match view with current score, momentum cues, probability balance, and risk signals for ${homeName} vs ${awayName}.`
      : isFinished
      ? `Finished match view with result, score context, and model-based breakdown for ${homeName} vs ${awayName}.`
      : `World Cup preview with probability, projected score, game-state risk, and form comparison for ${homeName} vs ${awayName}.`
  );

  setText('match-date', dateText);
  setText('match-time', timeText);
  setText('match-stadium', stadiumText);

  setText(
    'match-confidence-pill',
    isLive ? `LIVE ${match.minute || ''}`.trim() : isFinished ? `Result ${match.status || 'FT'}` : `Confidence ${confidence}%`
  );

  setText('team-home-short', homeShort);
  setText('team-away-short', awayShort);
  setText('team-home-name', homeName);
  setText('team-away-name', awayName);
  setText('projected-score', heroScore);

  setLogo('team-home-logo', match.homeLogo, homeName);
  setLogo('team-away-logo', match.awayLogo, awayName);

  setText('prob-home', `${homePct}%`);
  setText('prob-draw', `${drawPct}%`);
  setText('prob-away', `${awayPct}%`);
  setText('prob-home-label', `${homeName} Win`);
  setText('prob-away-label', `${awayName} Win`);

  setWidth('hero-bar-home', `${homePct}%`);
  setWidth('hero-bar-draw', `${drawPct}%`);
  setWidth('hero-bar-away', `${awayPct}%`);

  setText('match-summary', summary);
  setText('best-tip', bestTip);
  setText('goals-lean', goalsLean);
  setText('btts-signal', btts);

  const factorTags = document.getElementById('factor-tags');
  if (factorTags) {
    factorTags.innerHTML = '';
    factors.forEach((factor) => {
      const span = document.createElement('span');
      span.textContent = factor;
      factorTags.appendChild(span);
    });
  }

  setText('xg-home-team', homeName);
  setText('xg-away-team', awayName);
  setText('shots-home-team', homeName);
  setText('shots-away-team', awayName);
  setText('pos-home-team', homeName);
  setText('pos-away-team', awayName);

  setText('xg-home', xgHome);
  setText('xg-away', xgAway);
  setText('shots-home', shotsHome);
  setText('shots-away', shotsAway);
  setText('pos-home', possessionHome);
  setText('pos-away', possessionAway);

  setWidth('confidence-fill', `${confidence}%`);
  setText('confidence-value', `${confidence}%`);

  setText('form-home-title', homeName);
  setText('form-away-title', awayName);

  const formHomeBadges = document.getElementById('form-home-badges');
  const formAwayBadges = document.getElementById('form-away-badges');

  if (formHomeBadges) {
    formHomeBadges.innerHTML = '';
    formHome.forEach((item) => formHomeBadges.appendChild(createFormBadge(item)));
  }

  if (formAwayBadges) {
    formAwayBadges.innerHTML = '';
    formAway.forEach((item) => formAwayBadges.appendChild(createFormBadge(item)));
  }

  const formHomeList = document.getElementById('form-home-list');
  const formAwayList = document.getElementById('form-away-list');

  if (formHomeList) {
    formHomeList.innerHTML = '';
    homeStats.forEach((item) => formHomeList.appendChild(createStatListItem(item)));
  }

  if (formAwayList) {
    formAwayList.innerHTML = '';
    awayStats.forEach((item) => formAwayList.appendChild(createStatListItem(item)));
  }

  setText('quick-insight-title', match.quickInsightTitle || 'What can flip this match?');
  setText('quick-insight-text', quickInsight);

  const timelineList = document.getElementById('timeline-list');
  if (timelineList) {
    timelineList.innerHTML = '';
    timeline.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'timeline-item glow-hover';
      row.innerHTML = `
        <div class="timeline-minute">${escapeHtml(item.minute)}</div>
        <div class="timeline-text">${escapeHtml(item.text)}</div>
      `;
      timelineList.appendChild(row);
    });
  }

  const keySignals = document.getElementById('key-signal-list');
  if (keySignals) {
    keySignals.innerHTML = '';

    [
      ['Status', (match.statusLong || match.status || 'NS').toUpperCase()],
      ['Best Tip', bestTip],
      ['Goals Lean', goalsLean],
      ['BTTS', btts],
      ['Model Confidence', `${confidence}%`],
      ['Key Factors', factors.join(' · ')]
    ].forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'key-signal-item glow-hover';
      row.innerHTML = `
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      `;
      keySignals.appendChild(row);
    });
  }

  const relatedList = document.getElementById('related-match-list');
  if (relatedList) {
    relatedList.innerHTML = '';

    const relatedMatches = Array.isArray(match.related) && match.related.length ? match.related : [];

    if (!relatedMatches.length) {
      relatedList.innerHTML = `
        <div class="standings-empty">
          Related matches will appear here soon.
        </div>
      `;
    } else {
      relatedMatches.slice(0, 4).forEach((item) => {
        const a = document.createElement('a');
        a.className = 'related-match-item glow-hover';
        a.href = `match.html?fixture=${encodeURIComponent(item.id || '')}`;
        a.innerHTML = `
          <strong>${escapeHtml(item.home || 'Home')} vs ${escapeHtml(item.away || 'Away')}</strong>
          <span>${escapeHtml(item.league || 'World Cup 2026')}</span>
        `;
        relatedList.appendChild(a);
      });
    }
  }

  initGlowHover();
}

function renderMatchError() {
  setText('match-league-badge', 'World Cup Final');
  setText('match-title', 'Spain vs Argentina');
  setText('match-subtitle', 'Finalist priority mode is loading. Spain and Argentina are the main match focus.');
  setText('projected-score', 'vs');
  setText('match-confidence-pill', 'Final Focus');
}

function getStatusCategory(status = '') {
  const normalized = String(status).toUpperCase();

  if (['FT', 'AET', 'PEN'].includes(normalized)) return 'finished';
  if (['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'INT'].includes(normalized)) return 'live';
  return 'scheduled';
}

function getSyntheticPrediction(home = 'Home', away = 'Away') {
  if (isTeamPair(home, away, 'Spain', 'Argentina')) {
    return { home: 37, draw: 30, away: 33, confidence: 69 };
  }

  if (isTeamPair(home, away, 'France', 'England')) {
    return { home: 39, draw: 29, away: 32, confidence: 61 };
  }

  const seed = `${home}-${away}`
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const homePct = 40 + (seed % 13);
  const drawPct = 24 + (seed % 7);
  const awayPct = Math.max(18, 100 - homePct - drawPct);
  const confidence = 63 + (seed % 18);

  return {
    home: homePct,
    draw: drawPct,
    away: awayPct,
    confidence
  };
}

function getBestTip(home, away, homeGoals, awayGoals, statusCategory, prediction) {
  if (hasNumber(homeGoals) && hasNumber(awayGoals)) {
    if (Number(homeGoals) > Number(awayGoals)) return `${home} Win`;
    if (Number(awayGoals) > Number(homeGoals)) return `${away} Win`;
    return 'Draw';
  }

  if (statusCategory === 'live') return 'Live Match';

  const max = Math.max(prediction.home, prediction.draw, prediction.away);
  if (max === prediction.home) return `${home} or Draw`;
  if (max === prediction.away) return `${away} or Draw`;
  return 'Draw protection';
}

function buildSummary(home, away, statusCategory, scoreText, round, updatedAt) {
  if (statusCategory === 'finished') {
    return `${home} vs ${away} finished ${scoreText}. This cached match page keeps the result and context available without calling the live API on every visit.`;
  }

  if (statusCategory === 'live') {
    return `${home} vs ${away} is currently live. The page is using cached World Cup data first, with API fallback only when needed.`;
  }

  return `${home} vs ${away} is listed in the ${round || 'World Cup 2026 schedule'}. This preview is built from the local World Cup cache${updatedAt ? ` updated at ${formatDateTime(new Date(updatedAt))}` : ''}.`;
}

function buildFactors(statusCategory, round, venue) {
  const factors = [round || 'World Cup phase', venue || 'Venue context'];

  if (statusCategory === 'finished') {
    factors.push('Result confirmed');
  } else if (statusCategory === 'live') {
    factors.push('Live game-state');
  } else {
    factors.push('Pre-match model lean');
  }

  return factors;
}

function buildTimeline(home, away, statusCategory, scoreText, statusLong, elapsed) {
  if (statusCategory === 'finished') {
    return [
      { minute: 'FT', text: `${home} vs ${away} finished ${scoreText}.` },
      { minute: 'Model', text: 'Post-match context is read from the local World Cup cache.' },
      { minute: 'Signal', text: 'Result, venue, round, and related matches stay available without repeated API calls.' }
    ];
  }

  if (statusCategory === 'live') {
    return [
      { minute: elapsed ? `${elapsed}'` : 'Live', text: `${home} vs ${away} is marked as ${statusLong || 'live'}.` },
      { minute: 'Now', text: 'Momentum, score effects, and substitutions are the key live variables.' },
      { minute: 'Next', text: 'The model view should be refreshed after the cache updates.' }
    ];
  }

  return [
    { minute: '0-20', text: `${home} and ${away} should start by testing structure, press resistance, and transition control.` },
    { minute: '20-45', text: 'Set pieces and second balls can become the first serious edge.' },
    { minute: '45-70', text: 'This phase usually decides whether the match stays balanced or tilts toward one side.' },
    { minute: '70-90', text: 'Late game-state pressure becomes the biggest forecast variable.' }
  ];
}

function buildQuickInsight(home, away, statusCategory) {
  if (statusCategory === 'finished') {
    return `For ${home} vs ${away}, the useful read is not just the score but how the result changes pressure for the next World Cup round.`;
  }

  if (statusCategory === 'live') {
    return `For ${home} vs ${away}, the next goal or major card can flip the model faster than possession numbers alone.`;
  }

  return `For ${home} vs ${away}, the opening 20 minutes should tell us whether this is a controlled match or a transition-heavy one.`;
}

function hasNumber(value) {
  return value !== null && value !== undefined && Number.isFinite(Number(value));
}

function formatDate(date) {
  if (!date || Number.isNaN(date.getTime())) return 'Date TBA';

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function formatTime(date) {
  if (!date || Number.isNaN(date.getTime())) return 'Time TBA';

  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDateTime(date) {
  if (!date || Number.isNaN(date.getTime())) return 'TBA';

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getShortName(name = '') {
  const words = String(name).trim().split(/\s+/).filter(Boolean);

  if (!words.length) return 'TBA';

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  return words
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setWidth(id, value) {
  const el = document.getElementById(id);
  if (el) el.style.width = value;
}

function createFormBadge(value) {
  const span = document.createElement('span');
  span.textContent = value;

  if (value === 'W') span.className = 'form-win';
  else if (value === 'D') span.className = 'form-draw';
  else span.className = 'form-loss';

  return span;
}

function createStatListItem(text) {
  const li = document.createElement('li');

  if (String(text).includes(': ')) {
    const [label, ...rest] = String(text).split(': ');
    const value = rest.join(': ');
    li.innerHTML = `${escapeHtml(label)}: <strong>${escapeHtml(value)}</strong>`;
  } else {
    li.textContent = text;
  }

  return li;
}

function initGlowHover() {
  document.querySelectorAll('.glow-hover').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--x', `${event.clientX - rect.left}px`);
      el.style.setProperty('--y', `${event.clientY - rect.top}px`);
    });
  });
}

function setLogo(id, src, alt) {
  const img = document.getElementById(id);
  if (!img || !src) return;

  img.src = src;
  img.alt = alt || 'Team logo';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

loadMatchPage();
