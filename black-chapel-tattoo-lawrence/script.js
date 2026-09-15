(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Photo crossfade (Craft / Space section)
  var fadeWrap = document.querySelector("[data-fade]");
  if (fadeWrap && !reduceMotion) {
    var imgs = fadeWrap.querySelectorAll(".fade-img");
    if (imgs.length > 1) {
      var idx = 0;
      setInterval(function () {
        imgs[idx].classList.remove("is-active");
        idx = (idx + 1) % imgs.length;
        imgs[idx].classList.add("is-active");
      }, 5000);
    }
  }

  // Live open/closed status, hours from Google Business (America/Chicago)
  var HOURS = {
    0: null,
    1: null,
    2: [12, 18],
    3: [12, 18],
    4: [12, 18],
    5: [12, 18],
    6: [12, 18]
  };

  function chicagoParts() {
    var fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    });
    var parts = fmt.formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      day: weekdayMap[map.weekday],
      hour: parseInt(map.hour, 10),
      minute: parseInt(map.minute, 10)
    };
  }

  function updateStatus() {
    var badge = document.querySelector("[data-status]");
    if (!badge) return;
    var now = chicagoParts();
    var todayHours = HOURS[now.day];
    var isOpen = false;
    if (todayHours) {
      var minutesNow = now.hour * 60 + now.minute;
      isOpen = minutesNow >= todayHours[0] * 60 && minutesNow < todayHours[1] * 60;
    }
    badge.textContent = isOpen ? "Open now" : "Closed now";
    badge.classList.toggle("open", isOpen);
    badge.classList.toggle("closed", !isOpen);

    var rows = document.querySelectorAll(".hours tr[data-day]");
    rows.forEach(function (row) {
      row.classList.toggle("today", parseInt(row.getAttribute("data-day"), 10) === now.day);
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000);
})();
