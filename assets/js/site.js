// Mito Games: увеличение скриншотов. Без сторонних библиотек и счётчиков.
(function () {
  var dlg = document.querySelector("dialog.lb");
  if (!dlg || typeof dlg.showModal !== "function") return;
  var img = dlg.querySelector("img");
  document.querySelectorAll(".gallery button[data-full]").forEach(function (b) {
    b.addEventListener("click", function () {
      img.src = b.getAttribute("data-full");
      img.alt = b.querySelector("img").alt;
      dlg.showModal();
    });
  });
  dlg.querySelector("button").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
})();
