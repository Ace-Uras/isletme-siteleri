// Scroll reveal
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
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
  items.forEach(function (el) { observer.observe(el); });
})();

// Live open/closed status, Shreveport LA = America/Chicago
// Mon-Thu 13:00-22:00, Fri-Sat 13:00-24:00 (midnight), Sun closed
(function () {
  var HOURS = {
    0: null,                     // Sunday - closed
    1: [13 * 60, 22 * 60],       // Monday
    2: [13 * 60, 22 * 60],
    3: [13 * 60, 22 * 60],
    4: [13 * 60, 22 * 60],
    5: [13 * 60, 24 * 60],       // Friday - to midnight
    6: [13 * 60, 24 * 60]        // Saturday - to midnight
  };

  function chicagoParts() {
    var fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    var parts = fmt.formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var dayNames = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var hour = parseInt(map.hour, 10);
    if (hour === 24) hour = 0;
    return {
      day: dayNames[map.weekday],
      minutes: hour * 60 + parseInt(map.minute, 10)
    };
  }

  function update() {
    var now = chicagoParts();
    var range = HOURS[now.day];
    var open = !!range && now.minutes >= range[0] && now.minutes < range[1];

    var dot = document.getElementById("status-dot");
    var text = document.getElementById("status-text");
    if (dot && text) {
      dot.classList.remove("is-open", "is-closed");
      dot.classList.add(open ? "is-open" : "is-closed");
      text.textContent = open ? "Open now" : "Closed now";
    }

    var rows = document.querySelectorAll(".visit__hours-row");
    rows.forEach(function (row) {
      var day = parseInt(row.getAttribute("data-day"), 10);
      row.classList.toggle("is-today", day === now.day);
    });
  }

  update();
  setInterval(update, 60000);
})();
