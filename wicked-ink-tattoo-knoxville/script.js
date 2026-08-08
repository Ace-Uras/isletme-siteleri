// Builds a prefilled mailto: draft to the shop's public booking address.
// Nothing is sent from the page itself.
(function () {
  var form = document.getElementById("idea-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var tur = form.querySelector('input[name="tur"]:checked');
    var idea = document.getElementById("idea").value.trim();

    var subject = (tur ? tur.value : "An idea") + " - via your website";
    var lines = [
      "Hi Wicked Ink,",
      "",
      idea || "(describe your idea here)",
      "",
      "Thanks!"
    ];

    window.location.href =
      "mailto:wicked.inktn@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  });
})();
