/* SVITM — shared header + footer injection */
(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "";
  var headerMount = document.getElementById("site-header");
  var footerMount = document.getElementById("site-footer");

  var links = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "about", label: "About Us", href: "about.html" },
    { id: "courses", label: "Courses", href: "courses.html" },
    { id: "centres", label: "Centres", href: "centres.html" },
    { id: "verification", label: "Result & Verification", href: "verification.html" },
    { id: "admissions", label: "Admissions", href: "admissions.html" },
    { id: "contact", label: "Contact Us", href: "contact.html" }
  ];

  function icon(id, cls) {
    return '<svg class="icon ' + (cls || "") + '" aria-hidden="true"><use href="#i-' + id + '"></use></svg>';
  }

  var navLinks = links.map(function (l) {
    var active = l.id === page;
    return '<li><a class="nav-link' + (active ? " is-active" : "") + '" href="' + l.href + '"' +
      (active ? ' aria-current="page"' : "") + '>' + l.label + '</a></li>';
  }).join("");

  var mobileLinks = links.map(function (l) {
    var active = l.id === page;
    return '<a class="nav-link' + (active ? " is-active" : "") + '" href="' + l.href + '"' +
      (active ? ' aria-current="page"' : "") + '>' + l.label + '</a>';
  }).join("");

  if (headerMount) {
    headerMount.innerHTML = [
      '<div class="topbar">',
      '  <div class="container topbar-inner">',
      '    <div class="topbar-left">',
      '      <a class="topbar-link" href="tel:+919315500924">' + icon("phone") + ' +91 93155 00924</a>',
      '      <a class="topbar-link" href="mailto:info@svivekananditm.com">' + icon("mail") + ' info@svivekananditm.com</a>',
      '      <span class="topbar-note">Admissions open 2026–27</span>',
      '    </div>',
      '    <div class="topbar-right">',
      '      <a class="topbar-cta" href="verification.html">' + icon("shield-check", "icon--sm") + ' Verify result ' + icon("arrow-up-right", "icon--sm") + '</a>',
      '      <div class="topbar-social" aria-label="Social media">',
      '        <a href="#" aria-label="Facebook">' + icon("facebook") + '</a>',
      '        <a href="#" aria-label="Instagram">' + icon("instagram") + '</a>',
      '        <a href="#" aria-label="LinkedIn">' + icon("linkedin") + '</a>',
      '        <a href="#" aria-label="YouTube">' + icon("youtube") + '</a>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
      '<header class="masthead">',
      '  <div class="container masthead-inner">',
      '    <a class="brand" href="index.html" aria-label="SVITM home">',
      '      <span class="brand-mark" aria-hidden="true"><span>SV</span></span>',
      '      <span class="brand-text">',
      '        <span class="brand-name">Swami Vivekanand Institute</span>',
      '        <span class="brand-sub">of Technology &amp; Management · Sohna, Haryana</span>',
      '      </span>',
      '    </a>',
      '    <div class="masthead-side">',
      '      <div class="masthead-contact">',
      '        <div class="contact-chip">',
      '          <span class="contact-icon">' + icon("phone") + '</span>',
      '          <span><small>Admission helpline</small><strong>+91 93155 00924</strong></span>',
      '        </div>',
      '        <div class="contact-chip">',
      '          <span class="contact-icon">' + icon("map-pin") + '</span>',
      '          <span><small>Main campus</small><strong>Sohna, Gurugram</strong></span>',
      '        </div>',
      '      </div>',
      '      <a class="btn btn--accent" href="admissions.html#apply">Apply now ' + icon("arrow-right") + '</a>',
      '    </div>',
      '  </div>',
      '</header>',
      '<nav class="navbar" id="siteNav" aria-label="Primary navigation">',
      '  <div class="container nav-inner">',
      '    <button class="nav-toggle" type="button" aria-controls="navList" aria-expanded="false">',
      '      <span class="nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>',
      '      <span>Menu</span>',
      '    </button>',
      '    <ul class="nav-list" id="navList">' + navLinks,
      '      <li class="nav-mobile-cta"><a class="btn btn--accent btn--sm" href="admissions.html#apply">Apply now</a><a class="btn btn--ghost btn--sm" href="verification.html">Verify result</a></li>',
      '    </ul>',
      '    <div class="nav-aside">',
      '      <span>' + icon("phone-call") + '</span>',
      '      <span><small>Talk to a counsellor</small><strong>1800 120 2026</strong></span>',
      '    </div>',
      '  </div>',
      '</nav>'
    ].join("");
  }

  var year = new Date().getFullYear();

  if (footerMount) {
    footerMount.innerHTML = [
      '<footer class="site-footer">',
      '  <div class="container">',
      '    <div class="footer-grid">',
      '      <div class="footer-brand">',
      '        <a class="brand" href="index.html" aria-label="SVITM home">',
      '          <span class="brand-mark" aria-hidden="true"><span>SV</span></span>',
      '          <span class="brand-text"><span class="brand-name">SVITM</span><span class="brand-sub">Technology &amp; Management</span></span>',
      '        </a>',
      '        <p class="footer-about">Swami Vivekanand Institute of Technology &amp; Management is a registered educational society initiative offering industry-led degrees, diplomas and skill programmes across India.</p>',
      '        <div class="footer-affil"><span>Govt. of Haryana registered</span><span>ISO 9001:2015</span><span>NSDC-aligned</span></div>',
      '        <div class="social-row" aria-label="Social media">',
      '          <a href="#" aria-label="Facebook">' + icon("facebook") + '</a>',
      '          <a href="#" aria-label="Instagram">' + icon("instagram") + '</a>',
      '          <a href="#" aria-label="LinkedIn">' + icon("linkedin") + '</a>',
      '          <a href="#" aria-label="YouTube">' + icon("youtube") + '</a>',
      '        </div>',
      '      </div>',
      '      <div class="footer-col">',
      '        <h3 class="footer-title">Explore</h3>',
      '        <div class="footer-links">',
      '          <a href="about.html">About the institute</a>',
      '          <a href="courses.html">Courses &amp; programmes</a>',
      '          <a href="centres.html">Study centres</a>',
      '          <a href="admissions.html">Admissions 2026–27</a>',
      '          <a href="contact.html">Contact us</a>',
      '        </div>',
      '      </div>',
      '      <div class="footer-col">',
      '        <h3 class="footer-title">Student services</h3>',
      '        <div class="footer-links">',
      '          <a href="verification.html">Check result</a>',
      '          <a href="verification.html">Verify certificate</a>',
      '          <a href="admissions.html#apply">Apply online</a>',
      '          <a href="centres.html">Find a centre</a>',
      '          <a href="admissions.html#documents">Documents checklist</a>',
      '        </div>',
      '      </div>',
      '      <div class="footer-col footer-col--newsletter">',
      '        <h3 class="footer-title">Stay in the loop</h3>',
      '        <ul class="footer-contact">',
      '          <li>' + icon("map-pin") + '<span>Baluda Road, Sohna, Gurugram, Haryana 122103</span></li>',
      '          <li>' + icon("phone") + '<a href="tel:+919315500924">+91 93155 00924</a></li>',
      '          <li>' + icon("mail") + '<a href="mailto:info@svivekananditm.com">info@svivekananditm.com</a></li>',
      '        </ul>',
      '        <form class="footer-newsletter" data-demo-form data-demo-message="You are on the demo site — the newsletter was not submitted.">',
      '          <label class="sr-only" for="footerEmail">Email address</label>',
      '          <input class="input" id="footerEmail" name="email" type="email" placeholder="Your email address" required>',
      '          <button class="btn btn--accent" type="submit" aria-label="Subscribe">' + icon("send") + '</button>',
      '        </form>',
      '        <p class="form-note" style="margin-top:.55rem;color:rgba(255,255,255,.42)">Admission alerts, campus news and deadlines.</p>',
      '      </div>',
      '    </div>',
      '    <div class="footer-bottom">',
      '      <p>© ' + year + ' Swami Vivekanand Institute of Technology &amp; Management. All rights reserved.</p>',
      '      <div class="footer-bottom-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="contact.html">Grievance</a><a href="verification.html">Student services</a></div>',
      '      <p class="footer-demo-note"><strong>Demo website</strong> · Built for presentation, not the official site.</p>',
      '    </div>',
      '  </div>',
      '</footer>'
    ].join("");
  }
})();
