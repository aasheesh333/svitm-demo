/* SVITM — shared site interactions (nav, reveal, counters, demo actions) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------ mobile nav ----------------------------- */
  var navbar = document.getElementById("siteNav");
  var toggle = navbar ? navbar.querySelector(".nav-toggle") : null;

  function closeNav() {
    if (!navbar || !toggle) return;
    navbar.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  if (navbar && toggle) {
    toggle.addEventListener("click", function () {
      var open = navbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
      if (open) {
        var first = navbar.querySelector(".nav-list a");
        if (first) first.focus({ preventScroll: true });
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navbar.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    navbar.addEventListener("click", function (e) {
      if (e.target.closest(".nav-list a")) closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 990 && navbar.classList.contains("is-open")) closeNav();
    });
  }

  /* ------------------------------ scroll state --------------------------- */
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------- reveals ------------------------------ */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  /* ------------------------------- counters ------------------------------ */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      var decimals = (el.getAttribute("data-count") || "").indexOf(".") > -1 ? 1 : 0;
      if (reduceMotion) {
        el.textContent = prefix + target.toLocaleString("en-IN") + suffix;
        return;
      }
      var start = null;
      var duration = 1300;
      function frame(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = prefix + (decimals
          ? value.toFixed(decimals)
          : Math.round(value).toLocaleString("en-IN")) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    };
    if ("IntersectionObserver" in window) {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countObserver.observe(el); });
    } else {
      counters.forEach(animate);
    }
  }

  /* -------------------------- generic tabs ------------------------------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var buttons = group.querySelectorAll(".tab[data-tab]");
    if (!buttons.length) return;
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.getAttribute("data-tab");
        var groupName = group.getAttribute("data-tabs");
        var scope = groupName ? document.querySelectorAll('[data-tab-panel][data-tab-group="' + groupName + '"]') : document.querySelectorAll("[data-tab-panel]");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === button);
          b.setAttribute("aria-selected", String(b === button));
          b.setAttribute("tabindex", b === button ? "0" : "-1");
        });
        scope.forEach(function (panel) {
          var match = panel.getAttribute("data-tab-panel") === key;
          panel.hidden = !match;
        });
      });
      button.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        var list = Array.prototype.slice.call(buttons);
        var i = list.indexOf(button);
        var next = e.key === "ArrowRight" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
        list[next].click();
        list[next].focus();
      });
    });
  });

  /* -------------------------------- toasts ------------------------------- */
  function ensureToastWrap() {
    var wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      wrap.setAttribute("role", "status");
      wrap.setAttribute("aria-live", "polite");
      document.body.appendChild(wrap);
    }
    return wrap;
  }

  window.showToast = function (message) {
    var wrap = ensureToastWrap();
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-sparkles"></use></svg><span></span>';
    toast.querySelector("span").textContent = message;
    wrap.appendChild(toast);
    window.setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transition = "opacity .25s ease";
      window.setTimeout(function () { toast.remove(); }, 280);
    }, 4200);
  };

  /* ------------------------------ demo forms ----------------------------- */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.checkValidity && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var message = form.getAttribute("data-demo-message") ||
        "Thanks! This is a demo — your details were not submitted.";
      if (window.showToast) window.showToast(message);
      form.reset();
    });
  });

  document.addEventListener("click", function (e) {
    var demo = e.target.closest("[data-demo-action]");
    if (!demo) return;
    if (demo.tagName === "A" && demo.getAttribute("href") && demo.getAttribute("href") !== "#") return;
    e.preventDefault();
    e.stopPropagation();
    var message = demo.getAttribute("data-demo-action") ||
      "This action is disabled in the demo.";
    if (window.showToast) window.showToast(message);
  });

  /* ------------------------------ lightbox ------------------------------- */
  var lightbox = null;
  function getLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement("dialog");
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-label", "Image preview");
    lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image">' +
      '<svg class="icon" aria-hidden="true"><use href="#i-x"></use></svg></button>' +
      '<img alt="">';
    document.body.appendChild(lightbox);
    lightbox.querySelector(".lightbox-close").addEventListener("click", function () { lightbox.close(); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
    return lightbox;
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      var href = trigger.getAttribute("href");
      var src = trigger.getAttribute("data-lightbox") || href;
      var img = trigger.querySelector("img");
      if (!src && img) src = img.currentSrc || img.src;
      if (!src || src === "true") return;
      e.preventDefault();
      var dialog = getLightbox();
      var preview = dialog.querySelector("img");
      preview.src = src;
      preview.alt = (img && img.alt) || trigger.getAttribute("aria-label") || "Campus image";
      if (typeof dialog.showModal === "function") dialog.showModal();
      else window.open(src, "_blank");
    });
  });

  /* -------------------------------- misc --------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  var today = new Date();
  document.querySelectorAll("[data-today]").forEach(function (el) {
    el.textContent = today.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  });
})();
