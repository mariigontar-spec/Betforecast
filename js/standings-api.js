document.addEventListener("DOMContentLoaded", function () {
  alert("standings-api connected");

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
