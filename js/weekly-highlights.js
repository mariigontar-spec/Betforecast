(() => {
  const screen = document.getElementById("highlights-screen");
  const play = document.getElementById("highlights-play");
  const status = document.getElementById("highlights-status");
  const source = document.getElementById("highlights-source");
  const list = document.getElementById("highlights-clips");
  const CLIP_SECONDS = 4;
  let clips = [];
  let current = 0;
  let player;
  let apiReady = false;
  let failures = 0;
  let timer;
  let observer;

  function select(index) {
    clearInterval(timer);
    current = index;
    const clip = clips[current];
    status.textContent = clip.title;
    source.href = `https://www.youtube.com/watch?v=${clip.videoId}&t=${clip.startSeconds}s`;
    source.hidden = false;
    Array.from(list.children).forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === current))
    );
    if (apiReady) {
      const { videoId, startSeconds, endSeconds } = clip;
      player.loadVideoById({ videoId, startSeconds, endSeconds });
    }
  }

  function start(index) {
    observer?.disconnect();
    failures = 0;
    select(index);
    if (player || play.disabled) return;

    play.disabled = true;
    play.textContent = "Loading player…";
    const host = document.createElement("div");
    host.id = "weekly-youtube-player";
    screen.append(host);

    function showError() {
      clearInterval(timer);
      apiReady = false;
      player?.destroy();
      player = undefined;
      host.remove();
      play.hidden = false;
      play.disabled = false;
      play.textContent = "Retry player";
      status.textContent = "Playback unavailable here. Open the source video.";
    }

    window.onYouTubeIframeAPIReady = () => {
      play.hidden = true;
      player = new window.YT.Player(host, {
        videoId: clips[current].videoId,
        playerVars: { playsinline: 1, origin: location.origin },
        events: {
          onReady() {
            apiReady = true;
            player.mute();
            select(current);
          },
          onStateChange(event) {
            clearInterval(timer);
            if (event.data === window.YT.PlayerState.PLAYING) {
              failures = 0;
              status.textContent = clips[current].title;
              timer = setInterval(() => {
                if (player.getCurrentTime() >= clips[current].endSeconds) {
                  select((current + 1) % clips.length);
                }
              }, 100);
            }
            if (event.data === window.YT.PlayerState.ENDED &&
                player.getCurrentTime() >= clips[current].endSeconds - 0.25) {
              select((current + 1) % clips.length);
            }
          },
          onAutoplayBlocked() {
            status.textContent = "Press Play in the video player to start.";
          },
          onError() {
            if (++failures < clips.length) select((current + 1) % clips.length);
            else showError();
          }
        }
      });
    };

    if (window.YT?.Player) {
      window.onYouTubeIframeAPIReady();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onerror = () => {
        script.remove();
        showError();
      };
      document.head.append(script);
    }
  }

  play.addEventListener("click", () => start(current));

  fetch("/data/weekly-highlights.json", { cache: "no-cache" })
    .then(response => {
      if (!response.ok) throw new Error("Highlights unavailable");
      return response.json();
    })
    .then(data => {
      clips = data.clips.filter(({ title, videoId, startSeconds, endSeconds }) =>
        typeof title === "string" &&
        /^[A-Za-z0-9_-]{11}$/.test(videoId) &&
        Number.isInteger(startSeconds) && startSeconds >= 0 &&
        Number.isInteger(endSeconds) && endSeconds - startSeconds >= 3 &&
        endSeconds - startSeconds <= 5
      ).slice(0, 7).map(clip => ({ ...clip, endSeconds: clip.startSeconds + CLIP_SECONDS }));
      if (!clips.length) throw new Error("No valid highlights");
      document.getElementById("highlights-edition").textContent = data.edition;
      clips.forEach(({ title }, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = title;
        button.addEventListener("click", () => start(index));
        list.append(button);
      });
      play.disabled = false;
      select(0);
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.intersectionRatio >= 0.55) start(current);
        }, { threshold: 0.55 });
        observer.observe(screen);
      }
    })
    .catch(() => {
      status.textContent = "This week’s highlights are currently unavailable.";
      play.hidden = true;
    });
})();
