// Hide the landing hero until its entrance animation starts; give up after 3 s so nothing stays hidden.
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) { document.documentElement.classList.add("pre"); setTimeout(() => document.documentElement.classList.remove("pre"), 3000); }
