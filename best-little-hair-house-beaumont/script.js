(function () {
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  var hours = {
    0: null,
    1: null,
    2: [10 * 60, 18 * 60],
    3: [10 * 60, 18 * 60],
    4: [10 * 60, 19 * 60],
    5: [10 * 60, 14 * 60],
    6: [10 * 60, 14 * 60]
  };

  function updateStatus() {
    var now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    var day = now.getDay();
    var minutes = now.getHours() * 60 + now.getMinutes();
    var todayHours = hours[day];
    var badge = document.getElementById('statusBadge');

    var isOpen = false;
    if (todayHours && minutes >= todayHours[0] && minutes < todayHours[1]) {
      isOpen = true;
    }

    badge.classList.remove('is-open', 'is-closed');
    if (isOpen) {
      badge.textContent = 'Open now';
      badge.classList.add('is-open');
    } else {
      badge.textContent = 'Closed now';
      badge.classList.add('is-closed');
    }

    var rows = document.querySelectorAll('#hoursTable tr');
    rows.forEach(function (row) {
      var rowDay = parseInt(row.getAttribute('data-day'), 10);
      row.classList.toggle('is-today', rowDay === day);
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000);
})();
