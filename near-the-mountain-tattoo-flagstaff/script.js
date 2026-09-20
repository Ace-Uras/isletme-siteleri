// Reveal-on-scroll for major content blocks
const revealTargets = document.querySelectorAll('.artist-copy, .practice-copy, .inline-quote, .visit-info, .visit-hours, .statement blockquote');
revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Live open/closed status — Arizona (America/Phoenix) does not observe DST.
const HOURS = {
  0: null,
  1: null,
  2: [11, 19],
  3: [11, 19],
  4: [11, 19],
  5: [11, 19],
  6: [11, 19],
};

function getPhoenixParts() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Phoenix',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date());

  const map = {};
  parts.forEach((p) => { map[p.type] = p.value; });

  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    day: weekdayMap[map.weekday],
    hour: parseInt(map.hour, 10),
    minute: parseInt(map.minute, 10),
  };
}

function updateStatus() {
  const badge = document.getElementById('status-badge');
  const text = document.getElementById('status-text');
  if (!badge || !text) return;

  const { day, hour, minute } = getPhoenixParts();
  const todaysHours = HOURS[day];
  const nowDecimal = hour + minute / 60;

  const isOpen = todaysHours && nowDecimal >= todaysHours[0] && nowDecimal < todaysHours[1];

  badge.classList.remove('open', 'closed');
  badge.classList.add(isOpen ? 'open' : 'closed');
  text.textContent = isOpen ? 'Open now' : 'Closed now';

  document.querySelectorAll('.hours-list li').forEach((li) => {
    li.classList.toggle('today', parseInt(li.dataset.day, 10) === day);
  });
}

updateStatus();
setInterval(updateStatus, 60000);
