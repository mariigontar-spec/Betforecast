function injectHomeAdhitBackground() {
  const zoneId = "163743";
  const slotId = "bf-adhit-background-zone";
  const styleId = "bf-adhit-background-style";

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      #bf-adhit-background-zone {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 1px !important;
        height: 1px !important;
        overflow: visible !important;
        z-index: 1 !important;
      }
    `;
    document.head.appendChild(style);
  }

  if (
    document.getElementById(slotId) ||
    document.querySelector(`ins.ins-zone[data-zone="${zoneId}"]`)
  ) {
    return;
  }

  const slot = document.createElement("ins");
  slot.id = slotId;
  slot.className = "ins-zone";
  slot.dataset.zone = zoneId;

  document.body.insertBefore(slot, document.body.firstChild);
}

function loadHomeSiteSkinManager() {
  const scriptId = "bf-site-skin-manager-loader";

  if (document.getElementById(scriptId)) {
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = "/js/site-skin-manager.js?v=2";
  script.defer = true;
  document.head.appendChild(script);
}

function animateMetricValue(el, target, suffix = "") {
  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);

    el.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

function initAiMetricsAnimation() {
  const metrics = document.querySelectorAll(".metric-value[data-target]");
  if (!metrics.length) return;

  const aiBanner = document.querySelector(".ai-focus-banner");
  if (!aiBanner) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;

          metrics.forEach((metric) => {
            const target = parseInt(metric.dataset.target, 10);
            const suffix = metric.dataset.suffix || "";
            animateMetricValue(metric, target, suffix);
          });

          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  observer.observe(aiBanner);
}

injectHomeAdhitBackground();

document.addEventListener("DOMContentLoaded", () => {
  injectHomeAdhitBackground();
  loadHomeSiteSkinManager();
  initAiMetricsAnimation();
});
