// Scroll reveal
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach(function (el) { io.observe(el); });
})();

// Copy address
(function () {
  var btn = document.getElementById("copyAddress");
  if (!btn) return;
  var address = "462 Sweeten Creek Rd, Asheville, NC 28803";
  var original = btn.textContent;
  btn.addEventListener("click", function () {
    function done() {
      btn.textContent = "Copied!";
      setTimeout(function () { btn.textContent = original; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(done, function () {
        btn.textContent = address;
      });
    } else {
      btn.textContent = address;
    }
  });
})();
