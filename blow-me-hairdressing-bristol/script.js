// Live OPEN/CLOSED status readout, computed from real hours (Europe/London time).
const HOURS = {
  1: null,            // Monday: closed
  2: [10 * 60, 20 * 60],
  3: [10 * 60, 19 * 60],
  4: [10 * 60, 20 * 60],
  5: [10 * 60, 20 * 60],
  6: [9 * 60, 16 * 60 + 30],
  0: null,            // Sunday: closed
};

function updateStatus() {
  const el = document.getElementById('status-readout');
  if (!el) return;

  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Europe/London' })
  );
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const todayHours = HOURS[day];

  if (todayHours && minutes >= todayHours[0] && minutes < todayHours[1]) {
    el.textContent = 'OPEN NOW';
    el.style.color = '#4AF626';
  } else {
    el.textContent = 'CLOSED';
    el.style.color = '#E61919';
  }
}

updateStatus();
setInterval(updateStatus, 60000);
