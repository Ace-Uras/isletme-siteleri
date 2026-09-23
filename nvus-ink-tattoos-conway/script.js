// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Live open/closed status, America/Chicago time, matches Google Places hours
const HOURS = {
  0: null, // Sunday
  1: null, // Monday
  2: [12, 20], // Tuesday
  3: [12, 20], // Wednesday
  4: [12, 20], // Thursday
  5: [12, 21], // Friday
  6: [12, 21], // Saturday
};

function chicagoNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const map = {};
  parts.forEach((p) => (map[p.type] = p.value));
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
  return { day: weekdayIndex, hour: Number(map.hour), minute: Number(map.minute) };
}

function updateStatus() {
  const badge = document.getElementById("status-badge");
  const table = document.getElementById("hours-table");
  if (!badge || !table) return;

  const now = chicagoNow();
  const decimalHour = now.hour + now.minute / 60;
  const todayRange = HOURS[now.day];
  const isOpen = todayRange && decimalHour >= todayRange[0] && decimalHour < todayRange[1];

  badge.textContent = isOpen ? "Open now" : "Closed now";
  badge.classList.toggle("open", isOpen);
  badge.classList.toggle("closed", !isOpen);

  table.querySelectorAll("tr").forEach((row) => {
    row.classList.toggle("today", Number(row.dataset.day) === now.day);
  });
}

updateStatus();
setInterval(updateStatus, 60000);
