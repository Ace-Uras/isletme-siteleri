/* La Vie Nail Spa — live open/closed chip + price picker.
   Hours source: brief.json (Mon–Sat 9–19, Sun 10–18), Boise = America/Boise. */

(function () {
  "use strict";

  /* ---------- live open/closed indicator ---------- */
  var HOURS = {
    0: { open: 10, close: 18 }, // Sunday
    1: { open: 9, close: 19 },
    2: { open: 9, close: 19 },
    3: { open: 9, close: 19 },
    4: { open: 9, close: 19 },
    5: { open: 9, close: 19 },
    6: { open: 9, close: 19 }  // Saturday
  };

  function boiseNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Boise",
        weekday: "short", hour: "numeric", minute: "numeric", hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return {
        day: days[map.weekday],
        minutes: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10)
      };
    } catch (e) {
      return null; // if Intl/timeZone unavailable, leave chip neutral
    }
  }

  function fmt(h) {
    var ampm = h < 12 ? "AM" : "PM";
    var hr = h % 12; if (hr === 0) hr = 12;
    return hr + " " + ampm;
  }

  function updateChip() {
    var chip = document.getElementById("open-chip");
    var text = document.getElementById("open-chip-text");
    var live = document.getElementById("hours-live");
    if (!chip || !text) return;

    var now = boiseNow();
    if (!now) { text.textContent = "Mon–Sat 9–7 · Sun 10–6"; return; }

    var h = HOURS[now.day];
    var openMin = h.open * 60, closeMin = h.close * 60;
    var isOpen = now.minutes >= openMin && now.minutes < closeMin;

    if (isOpen) {
      chip.classList.remove("closed");
      text.textContent = "Open now · until " + fmt(h.close);
      if (live) live.textContent = "Open right now in Boise, doors close at " + fmt(h.close) + " today.";
    } else {
      chip.classList.add("closed");
      var nextDay = now.minutes < openMin ? now.day : (now.day + 1) % 7;
      var nh = HOURS[nextDay];
      var when = now.minutes < openMin ? "opens " + fmt(h.open) + " today" : "opens " + fmt(nh.open) + " tomorrow";
      text.textContent = "Closed · " + when;
      if (live) live.textContent = "Closed right now, " + when + ".";
    }

    // highlight today's row
    var rows = document.querySelectorAll(".hours-table tr");
    rows.forEach(function (r) { r.classList.remove("today"); });
    var todayRow = document.querySelector(
      now.day === 0 ? 'tr[data-days="sun"]' : 'tr[data-days="mon-sat"]'
    );
    if (todayRow) todayRow.classList.add("today");
  }

  updateChip();
  setInterval(updateChip, 60000);

  /* ---------- price picker ---------- */
  var PRICES = {
    mani:    { regular: { p: "$25", l: "Regular manicure" }, gel: { p: "$35", l: "Gel manicure" } },
    pedi:    { regular: { p: "$37", l: "Regular pedicure" }, gel: { p: "$45", l: "Gel pedicure" } },
    fullset: { flat: { p: "from $50", l: "Full set (acrylic)" } },
    fillin:  { flat: { p: "from $40", l: "Fill-in" } }
  };

  var picker = document.querySelector("[data-picker]");
  if (!picker) return;
  var priceEl = document.getElementById("picker-price");
  var labelEl = document.getElementById("picker-label");
  var finishGroup = document.getElementById("finish-group");

  function currentValue(name) {
    var el = picker.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  function updatePicker() {
    var svc = currentValue("svc");
    var entry = PRICES[svc];
    var result;
    if (entry.flat) {
      finishGroup.classList.add("disabled");
      finishGroup.setAttribute("aria-disabled", "true");
      result = entry.flat;
    } else {
      finishGroup.classList.remove("disabled");
      finishGroup.removeAttribute("aria-disabled");
      result = entry[currentValue("finish") || "regular"];
    }
    priceEl.textContent = result.p;
    labelEl.textContent = result.l;
  }

  picker.addEventListener("change", updatePicker);
  updatePicker();
})();
