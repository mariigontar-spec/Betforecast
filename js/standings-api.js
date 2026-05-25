document.addEventListener("DOMContentLoaded", function () {
const tabs = document.querySelectorAll(".standings-view-tab");
const tableView = document.getElementById("standings-table-wrap");
const lastView = document.getElementById("standings-last-wrap");
const upcomingView = document.getElementById("standings-upcoming-wrap");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    const view = tab.dataset.view;

    tabs.forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");

    tableView.classList.toggle("hidden-view", view !== "table");
    lastView.classList.toggle("hidden-view", view !== "last");
    upcomingView.classList.toggle("hidden-view", view !== "upcoming");
  });
});

  const tableWrap = document.getElementById("standings-table-wrap");

  if (!tableWrap) {
    alert("ERROR: standings-table-wrap not found");
    return;
  }

  if (typeof BF_API === "undefined") {
    alert("ERROR: BF_API not found");
    return;
  }

  tableWrap.innerHTML = `
    <div class="standings-loading">
      JS works. Container found. API config found.
    </div>
  `;
});
