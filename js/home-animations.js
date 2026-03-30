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

document.addEventListener("DOMContentLoaded", () => {
  initAiMetricsAnimation();
});
