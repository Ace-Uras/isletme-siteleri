(function () {
  "use strict";

  var form = document.getElementById("inquiry-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("f-name").value.trim();
    var idea = document.getElementById("f-idea").value.trim();
    var contact = document.getElementById("f-contact").value.trim();

    var subject = "Consultation request" + (name ? " from " + name : "");
    var bodyLines = [];
    if (name) bodyLines.push("Name: " + name);
    if (contact) bodyLines.push("Best way to reach me: " + contact);
    bodyLines.push("");
    bodyLines.push("What I'm picturing:");
    bodyLines.push(idea || "(add style, placement, size, and any reference here)");

    var mailto =
      "mailto:tatlyfestudios1@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(bodyLines.join("\n"));

    window.location.href = mailto;
  });
})();
