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

// Live open/closed status, Amarillo TX = America/Chicago
(function () {
  var HOURS = {
    0: [12 * 60, 17 * 60],       // Sunday
    1: [9 * 60 + 30, 19 * 60],   // Monday
    2: [9 * 60 + 30, 19 * 60],
    3: [9 * 60 + 30, 19 * 60],
    4: [9 * 60 + 30, 19 * 60],
    5: [9 * 60 + 30, 19 * 60],
    6: [9 * 60 + 30, 19 * 60]    // Saturday
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
    var open = now.minutes >= range[0] && now.minutes < range[1];

    var dot = document.getElementById("status-dot");
    var text = document.getElementById("status-text");
    if (dot && text) {
      dot.classList.toggle("is-open", open);
      dot.classList.toggle("is-closed", !open);
      text.textContent = open ? "Open now" : "Closed now";
    }

    document.querySelectorAll("#hours-table tr").forEach(function (row) {
      row.classList.toggle("is-today", parseInt(row.dataset.day, 10) === now.day);
    });
  }

  update();
  setInterval(update, 60000);
})();
