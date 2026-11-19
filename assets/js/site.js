// Meeto Games: увеличение скриншотов и «шлепок» логотипа как в заставке «Проекта: Реплика». Без сторонних библиотек и счётчиков.
(function () {
  var dlg = document.querySelector("dialog.lb");
  if (dlg && typeof dlg.showModal === "function") {
    var img = dlg.querySelector("img");
    document.querySelectorAll("[data-full]").forEach(function (b) {
      b.addEventListener("click", function () {
        img.src = b.getAttribute("data-full");
        var i = b.querySelector("img"); img.alt = i ? i.alt : "";
        dlg.showModal();
      });
    });
    dlg.querySelector("button").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }

  // Логотип падает сверху (вытянут в полёте), шлёпается — сплющился, отпружинил —, по нему пробегает блик,
  // дальше чуть покачивается. Формулы — из Bunker44/Assets/Bunker/Scripts/UI/Intro.cs (DrawLogo).
  var fx = document.getElementById("logoFx");
  if (!fx) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var shine = fx.querySelector(".shine"), DELAY = 0.65, LAND = 0.26, t0 = null;
  fx.style.opacity = "0";
  function frame(ts) {
    if (t0 === null) t0 = ts;
    var lt = (ts - t0) / 1000 - DELAY;
    if (lt < 0) { requestAnimationFrame(frame); return; }
    var h = fx.offsetHeight || 200, sx = 1, sy = 1, oy = 0, rot = 0;
    if (lt < LAND) {
      var f = lt / LAND; oy = -(1 - f * f) * h * 1.6; sx = 0.9; sy = 1.14;
    } else {
      var a = lt - LAND, bump = Math.exp(-5.5 * a) * Math.cos(17 * a), sway = Math.min(1, a / 1.2);
      sy = 1 - 0.3 * bump; sx = 1 + 0.22 * bump; oy = h * 0.045 * bump + sway * h * 0.014 * Math.sin(a * 2.6 + 1);
      rot = sway * 1.3 * Math.sin(a * 2.2);
    }
    fx.style.opacity = "1";
    fx.style.transform = "translateY(" + oy.toFixed(2) + "px) rotate(" + rot.toFixed(3) + "deg) scale(" + sx.toFixed(4) + "," + sy.toFixed(4) + ")";
    if (shine) {
      var s = (lt - LAND - 0.15) / 0.7;
      shine.style.opacity = s > 0 && s < 1 ? "1" : "0";
      shine.style.backgroundPosition = ((1 - Math.max(0, Math.min(1, s))) * 100).toFixed(1) + "% 0";
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
