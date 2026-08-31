(function () {
  "use strict";

  var TZ = "America/Chicago"; // Huntsville, AL is in the Central time zone

  // day -> [openHour, openMinute, closeHour, closeMinute] in 24h, or null if closed
  // Source: Google Places API (New), verified via bul.py dogrula
  var HOURS = {
    0: null,               // Sunday — closed
    1: null,               // Monday — closed
    2: [12, 0, 20, 0],      // Tuesday
    3: [12, 0, 18, 0],      // Wednesday
    4: [12, 0, 20, 0],      // Thursday
    5: [12, 0, 20, 0],      // Friday
    6: [12, 0, 20, 0]       // Saturday
  };

  function getChicagoNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    }).formatToParts(new Date());

    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });

    var weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var day = weekdayMap[map.weekday];
    var hour = parseInt(map.hour, 10);
    if (hour === 24) hour = 0;
    var minute = parseInt(map.minute, 10);

    return { day: day, minutes: hour * 60 + minute, year: getChicagoYear() };
  }

  function getChicagoYear() {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric" }).formatToParts(new Date());
    var y = parts.find(function (p) { return p.type === "year"; });
    return y ? parseInt(y.value, 10) : new Date().getFullYear();
  }

  function updateStatus() {
    var now = getChicagoNow();
    var todayHours = HOURS[now.day];
    var isOpen = false;

    if (todayHours) {
      var openMin = todayHours[0] * 60 + todayHours[1];
      var closeMin = todayHours[2] * 60 + todayHours[3];
      isOpen = now.minutes >= openMin && now.minutes < closeMin;
    }

    var statusEls = [document.getElementById("live-status"), document.getElementById("live-status-2")];
    statusEls.forEach(function (statusEl) {
      if (!statusEl) return;
      statusEl.classList.remove("is-open", "is-closed");
      statusEl.classList.add(isOpen ? "is-open" : "is-closed");
      statusEl.textContent = isOpen ? "Open now" : "Closed now";
    });

    var rows = document.querySelectorAll("#hours-table tr[data-day]");
    rows.forEach(function (row) {
      var rowDay = parseInt(row.getAttribute("data-day"), 10);
      row.classList.toggle("is-today", rowDay === now.day);
    });

    // Years running — computed live, not hardcoded, so it never goes stale
    var yearsEl = document.getElementById("years-running");
    if (yearsEl) {
      yearsEl.textContent = String(now.year - 1999);
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
})();
