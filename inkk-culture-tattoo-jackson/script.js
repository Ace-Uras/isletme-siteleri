(function () {
  "use strict";

  var TZ = "America/Chicago";

  // day -> [openHour, openMinute, closeHour, closeMinute] in 24h, or null if closed
  var HOURS = {
    0: null,              // Sunday
    1: [10, 0, 20, 0],     // Monday
    2: [10, 0, 20, 0],     // Tuesday
    3: [10, 0, 20, 0],     // Wednesday
    4: [10, 0, 20, 0],     // Thursday
    5: [12, 0, 22, 0],     // Friday
    6: [12, 0, 22, 0]      // Saturday
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

    return { day: day, minutes: hour * 60 + minute };
  }

  function updateStatus() {
    var statusEl = document.getElementById("live-status");
    if (!statusEl) return;

    var now = getChicagoNow();
    var todayHours = HOURS[now.day];
    var isOpen = false;

    if (todayHours) {
      var openMin = todayHours[0] * 60 + todayHours[1];
      var closeMin = todayHours[2] * 60 + todayHours[3];
      isOpen = now.minutes >= openMin && now.minutes < closeMin;
    }

    statusEl.classList.remove("is-open", "is-closed");
    statusEl.classList.add(isOpen ? "is-open" : "is-closed");
    statusEl.textContent = isOpen ? "Open now" : "Closed now";

    var rows = document.querySelectorAll("#hours-table tr[data-day]");
    rows.forEach(function (row) {
      var rowDay = parseInt(row.getAttribute("data-day"), 10);
      row.classList.toggle("is-today", rowDay === now.day);
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000);

  // Scroll reveal
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".oath__inner, .hands__tile, .door__inner"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  }
})();
