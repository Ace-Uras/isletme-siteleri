(function () {
  "use strict";

  // Mobile nav overlay toggle
  var burger = document.getElementById("burger");
  var overlay = document.getElementById("overlay");

  if (burger && overlay) {
    burger.addEventListener("click", function () {
      var isOpen = overlay.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    overlay.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        overlay.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // Scroll reveal via IntersectionObserver
  var reveals = document.querySelectorAll(".reveal");
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
