// Gradient Nail — live open/closed status + hours highlight + scroll reveal

(function () {
  const HOURS = {
    0: [10.5, 17],   // Sunday
    1: [9.5, 19],
    2: [9.5, 19],
    3: [9.5, 19],
    4: [9.5, 19],
    5: [9.5, 19],
    6: [9.5, 19],
  };
  const TZ = "Pacific/Honolulu";

  function honoluluNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const map = {};
    parts.forEach((p) => (map[p.type] = p.value));
    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const day = dayMap[map.weekday];
    const hour = parseInt(map.hour, 10) + parseInt(map.minute, 10) / 60;
    return { day, hour };
  }

  function updateStatus() {
    const dot = document.getElementById("statusDot");
    const text = document.getElementById("statusText");
    if (!dot || !text) return;

    const { day, hour } = honoluluNow();
    const [open, close] = HOURS[day];
    const isOpen = hour >= open && hour < close;

    dot.classList.toggle("open", isOpen);
    dot.classList.toggle("closed", !isOpen);

    if (isOpen) {
      text.textContent = "Open now (Honolulu time)";
    } else {
      text.textContent = "Closed right now (Honolulu time)";
    }

    document.querySelectorAll("#hoursTable tr").forEach((row) => {
      row.classList.toggle("today", Number(row.dataset.day) === day);
    });
  }

  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
