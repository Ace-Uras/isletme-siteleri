// Star Ink: "send your idea" form builds a prefilled email in the visitor's
// own mail app. Nothing is submitted anywhere; mailto only.
(function () {
  var form = document.getElementById("idea-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.elements.name.value.trim();
    var idea = form.elements.idea.value.trim();
    var shop = "either shop";
    var radios = form.elements.shop;
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { shop = radios[i].value; }
    }

    var subject = "Tattoo idea" + (name ? " from " + name : "");
    var lines = [];
    lines.push("Hi Star Ink,");
    lines.push("");
    lines.push(idea ? idea : "I have an idea I would like to talk through.");
    lines.push("");
    lines.push("Preferred shop: " + shop);
    if (name) {
      lines.push("");
      lines.push(name);
    }

    var href = "mailto:starink254@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));

    window.location.href = href;
  });
})();
