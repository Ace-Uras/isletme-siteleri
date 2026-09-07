(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var toggleIcon = document.getElementById("navToggleIcon");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggleIcon.innerHTML = open
        ? '<use href="#i-x"></use>'
        : '<use href="#i-list"></use>';
    });
    document.querySelectorAll(".primary-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggleIcon.innerHTML = '<use href="#i-list"></use>';
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Live clock in contact section (real local time, service is genuinely 7/24)
  var clockEl = document.getElementById("liveClock");
  if (clockEl) {
    var updateClock = function () {
      var now = new Date();
      var hh = String(now.getHours()).padStart(2, "0");
      var mm = String(now.getMinutes()).padStart(2, "0");
      clockEl.textContent = "Şu an saat " + hh + ":" + mm;
    };
    updateClock();
    setInterval(updateClock, 15000);
  }

  // Quote form -> prefilled WhatsApp message, no backend needed
  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var fields = {
        adSoyad: document.getElementById("adSoyad"),
        telefon: document.getElementById("telefon"),
        alan: document.getElementById("alan"),
      };
      var valid = true;
      Object.keys(fields).forEach(function (key) {
        var input = fields[key];
        var wrap = input.closest(".field");
        if (!input.value.trim()) {
          wrap.classList.add("invalid");
          valid = false;
        } else {
          wrap.classList.remove("invalid");
        }
      });
      if (!valid) return;

      var eposta = document.getElementById("eposta").value.trim();
      var mesaj = document.getElementById("mesaj").value.trim();

      var lines = [
        "Merhaba, Hemen İlaçla üzerinden teklif almak istiyorum.",
        "Ad Soyad: " + fields.adSoyad.value.trim(),
        "Telefon: " + fields.telefon.value.trim(),
        "Alan / Haşere Türü: " + fields.alan.value.trim(),
      ];
      if (eposta) lines.push("E-posta: " + eposta);
      if (mesaj) lines.push("Not: " + mesaj);

      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/905384864103?text=" + text, "_blank", "noopener");
    });

    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        input.closest(".field").classList.remove("invalid");
      });
    });
  }
})();
