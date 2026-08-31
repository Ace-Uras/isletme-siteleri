(function () {
  "use strict";

  // Hours: Mon–Sat 10:00–19:00 local (America/Detroit), Sun closed.
  var HOURS = {
    0: null,
    1: [10, 19],
    2: [10, 19],
    3: [10, 19],
    4: [10, 19],
    5: [10, 19],
    6: [10, 19],
  };

  function getDetroitParts() {
    var fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Detroit",
      hour12: false,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    var parts = fmt.formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var weekdayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      day: weekdayIndex[map.weekday],
      hour: parseInt(map.hour, 10),
      minute: parseInt(map.minute, 10),
    };
  }

  function updateStatus() {
    var dot = document.getElementById("status-dot");
    var text = document.getElementById("status-text");
    if (!dot || !text) return;

    var now = getDetroitParts();
    var range = HOURS[now.day];
    var minutesNow = now.hour * 60 + now.minute;
    var isOpen = !!range && minutesNow >= range[0] * 60 && minutesNow < range[1] * 60;

    dot.classList.remove("open", "closed");
    dot.classList.add(isOpen ? "open" : "closed");

    if (isOpen) {
      var closeHour = range[1];
      var closeLabel = closeHour > 12 ? (closeHour - 12) + ":00 PM" : closeHour + ":00 AM";
      text.textContent = "Open now, closing at " + closeLabel + " (Ann Arbor time)";
    } else {
      text.textContent = "Closed right now, see hours below";
    }
  }

  function highlightToday() {
    var now = getDetroitParts();
    var row = document.querySelector('.hours-table tr[data-day="' + now.day + '"]');
    if (row) row.classList.add("today");
  }

  updateStatus();
  highlightToday();
  window.setInterval(updateStatus, 60000);
})();
