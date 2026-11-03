// Shared layout (header/footer), theme toggle, and per-page rendering
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const page = document.body.dataset.page;

  const NAV = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'blog.html', label: 'Blog', id: 'blog' },
    { href: 'about.html', label: 'About', id: 'about' },
    { href: 'contact.html', label: 'Contact', id: 'contact' },
  ];

  const ICONS = {
    sun: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/></svg>',
    moon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    menu: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    arrow: '<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
    clock: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    x: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    github: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    link: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  };

  /* ---------- Helpers ---------- */
  const formatDate = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const postImage = (p, w = 1200, h = 800) => `https://picsum.photos/seed/${p.slug}/${w}/${h}`;

  const badge = (cat) =>
    `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${CATEGORIES[cat] || ''}">${cat}</span>`;

  const avatar = (a, size = 'w-9 h-9 text-xs') =>
    `<span class="${size} shrink-0 rounded-full bg-gradient-to-br ${a.gradient} grid place-items-center font-bold text-white">${a.initials}</span>`;

  const sortedPosts = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  function postCard(p) {
    const a = AUTHORS[p.author];
    return `
      <article class="reveal group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/70 dark:border-slate-800 hover:shadow-soft hover:-translate-y-1 transition duration-300">
        <a href="post.html?slug=${p.slug}" class="block aspect-[16/10] overflow-hidden">
          <img src="${postImage(p, 800, 500)}" alt="" loading="lazy" class="card-img w-full h-full object-cover">
        </a>
        <div class="flex flex-col flex-1 p-6">
          <div class="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            ${badge(p.category)}
            <span class="inline-flex items-center gap-1">${ICONS.clock}${p.readTime} min</span>
          </div>
          <h3 class="mt-4 text-xl font-bold leading-snug text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
            <a href="post.html?slug=${p.slug}">${p.title}</a>
          </h3>
          <p class="mt-3 text-slate-600 dark:text-slate-400 line-clamp-2">${p.excerpt}</p>
          <div class="mt-auto pt-6 flex items-center gap-3">
            ${avatar(a)}
            <div class="text-sm">
              <p class="font-semibold text-slate-800 dark:text-slate-200">${a.name}</p>
              <p class="text-slate-500 dark:text-slate-400">${formatDate(p.date)}</p>
            </div>
          </div>
        </div>
      </article>`;
  }

  function toast(msg) {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-soft text-sm font-medium';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2800);
  }

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  /* ---------- Header & footer ---------- */
  function renderHeader() {
    const links = NAV.map((n) => {
      const active = n.id === page || (page === 'post' && n.id === 'blog');
      return `<a href="${n.href}" class="px-4 py-2 rounded-full text-sm font-medium transition ${
        active
          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
      }">${n.label}</a>`;
    }).join('');

    const mobileLinks = NAV.map((n) =>
      `<a href="${n.href}" class="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 ${n.id === page ? 'bg-slate-100 dark:bg-slate-800' : ''}">${n.label}</a>`
    ).join('');

    $('#site-header').outerHTML = `
      <header id="header" class="sticky top-0 z-50 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 md:h-20">
            <a href="index.html" class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500 grid place-items-center text-white font-serif font-bold text-lg shadow-lg shadow-brand-500/30">I</span>
              <span class="font-serif text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Inkwell</span>
            </a>
            <nav class="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 backdrop-blur">${links}</nav>
            <div class="flex items-center gap-2">
              <button id="theme-toggle" aria-label="Toggle dark mode" class="w-10 h-10 grid place-items-center rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition">
                <span class="dark:hidden">${ICONS.moon}</span><span class="hidden dark:inline">${ICONS.sun}</span>
              </button>
              <a href="#newsletter" class="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/25 transition">Subscribe</a>
              <button id="menu-toggle" aria-label="Open menu" aria-expanded="false" class="md:hidden w-10 h-10 grid place-items-center rounded-full text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">${ICONS.menu}</button>
            </div>
          </div>
          <div id="mobile-menu" class="md:hidden hidden pb-4 space-y-1">${mobileLinks}</div>
        </div>
      </header>`;

    const header = $('#header');
    const onScroll = () => {
      const scrolled = window.scrollY > 10;
      header.classList.toggle('bg-white/80', scrolled);
      header.classList.toggle('dark:bg-slate-950/80', scrolled);
      header.classList.toggle('backdrop-blur-lg', scrolled);
      header.classList.toggle('border-b', scrolled);
      header.classList.toggle('border-slate-200/70', scrolled);
      header.classList.toggle('dark:border-slate-800', scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    $('#theme-toggle').addEventListener('click', () => {
      const dark = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    });

    $('#menu-toggle').addEventListener('click', (e) => {
      const menu = $('#mobile-menu');
      const open = menu.classList.toggle('hidden') === false;
      e.currentTarget.setAttribute('aria-expanded', String(open));
    });
  }

  function renderFooter() {
    const cats = Object.keys(CATEGORIES)
      .map((c) => `<li><a href="blog.html?category=${c}" class="hover:text-white transition">${c}</a></li>`).join('');
    const pages = NAV.map((n) => `<li><a href="${n.href}" class="hover:text-white transition">${n.label}</a></li>`).join('');
    const social = ['x', 'github', 'linkedin']
      .map((s) => `<a href="#" aria-label="${s}" class="w-10 h-10 grid place-items-center rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition">${ICONS[s]}</a>`).join('');

    $('#site-footer').outerHTML = `
      <section id="newsletter" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 scroll-mt-24">
        <div class="reveal relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-purple-600 to-pink-500 px-6 py-14 md:px-16 md:py-20 text-center">
          <div class="absolute inset-0 bg-dots opacity-20"></div>
          <div class="relative max-w-2xl mx-auto">
            <h2 class="font-serif text-3xl md:text-5xl font-semibold text-white leading-tight">Get the best stories in your inbox</h2>
            <p class="mt-4 text-lg text-white/80">One thoughtful email every Sunday. No spam, unsubscribe anytime.</p>
            <form data-newsletter novalidate class="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" required placeholder="you@example.com" aria-label="Email address" class="flex-1 px-5 py-3.5 rounded-full bg-white/15 text-white placeholder-white/60 border border-white/25 focus:outline-none focus:ring-2 focus:ring-white/70 backdrop-blur">
              <button class="px-7 py-3.5 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition">Subscribe</button>
            </form>
            <p class="mt-4 text-sm text-white/70">Join 12,000+ readers.</p>
          </div>
        </div>
      </section>
      <footer class="bg-slate-950 text-slate-400 mt-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div class="lg:col-span-2">
              <a href="index.html" class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500 grid place-items-center text-white font-serif font-bold text-lg">I</span>
                <span class="font-serif text-2xl font-semibold text-white">Inkwell</span>
              </a>
              <p class="mt-4 max-w-sm">Thoughtful writing on design, development and living well. Published weekly by a small team of curious people.</p>
              <div class="mt-6 flex gap-3">${social}</div>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-4">Explore</h4>
              <ul class="space-y-2.5">${pages}</ul>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-4">Topics</h4>
              <ul class="space-y-2.5">${cats}</ul>
            </div>
          </div>
          <div class="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between text-sm">
            <p>&copy; ${new Date().getFullYear()} Inkwell. All rights reserved.</p>
            <p>Made with HTML, Tailwind CSS &amp; JavaScript.</p>
          </div>
        </div>
      </footer>
      <button id="to-top" aria-label="Back to top" class="fixed bottom-6 right-6 z-40 w-12 h-12 grid place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 opacity-0 pointer-events-none transition hover:bg-brand-700">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19V5m-7 7 7-7 7 7"/></svg>
      </button>`;

    const toTop = $('#to-top');
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 600;
      toTop.classList.toggle('opacity-0', !show);
      toTop.classList.toggle('pointer-events-none', !show);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));
  }

  /* ---------- Shared behaviours ---------- */
  function initReveal() {
    const els = $$('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('is-visible'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
  }

  function initNewsletter() {
    $$('form[data-newsletter]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!isEmail(input.value.trim())) {
          toast('Please enter a valid email address.');
          input.focus();
          return;
        }
        form.reset();
        toast('🎉 Thanks for subscribing! Check your inbox.');
      });
    });
  }

  /* ---------- Pages ---------- */
  function renderHome() {
    const posts = sortedPosts();
    const featured = posts.find((p) => p.featured) || posts[0];
    const a = AUTHORS[featured.author];

    $('#featured-post').innerHTML = `
      <a href="post.html?slug=${featured.slug}" class="reveal group grid lg:grid-cols-2 gap-0 bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200/70 dark:border-slate-800 hover:shadow-soft transition">
        <div class="aspect-[16/10] lg:aspect-auto overflow-hidden"><img src="${postImage(featured)}" alt="" class="card-img w-full h-full object-cover"></div>
        <div class="p-8 md:p-12 flex flex-col justify-center">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900">★ Featured</span>
            ${badge(featured.category)}
          </div>
          <h2 class="mt-5 font-serif text-3xl md:text-4xl font-semibold leading-tight text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">${featured.title}</h2>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">${featured.excerpt}</p>
          <div class="mt-8 flex items-center justify-between">
            <div class="flex items-center gap-3">
              ${avatar(a, 'w-11 h-11 text-sm')}
              <div class="text-sm">
                <p class="font-semibold text-slate-800 dark:text-slate-200">${a.name}</p>
                <p class="text-slate-500 dark:text-slate-400">${formatDate(featured.date)} · ${featured.readTime} min read</p>
              </div>
            </div>
            <span class="hidden sm:inline-flex items-center gap-2 font-semibold text-brand-600 dark:text-brand-400">Read ${ICONS.arrow}</span>
          </div>
        </div>
      </a>`;

    $('#latest-posts').innerHTML = posts.filter((p) => p !== featured).slice(0, 6).map(postCard).join('');

    const emoji = { Design: '🎨', Development: '💻', Productivity: '⚡', Lifestyle: '🌿', Tech: '🤖' };
    $('#category-list').innerHTML = Object.keys(CATEGORIES).map((c) => {
      const count = POSTS.filter((p) => p.category === c).length;
      return `
        <a href="blog.html?category=${c}" class="reveal group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 hover:-translate-y-1 transition">
          <span class="text-3xl">${emoji[c]}</span>
          <h3 class="mt-4 font-bold text-slate-900 dark:text-white">${c}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">${count} article${count === 1 ? '' : 's'}</p>
        </a>`;
    }).join('');
  }

  function renderBlog() {
    const params = new URLSearchParams(location.search);
    let active = CATEGORIES[params.get('category')] ? params.get('category') : 'All';
    const search = $('#search');
    search.value = params.get('q') || '';

    const filters = $('#category-filters');
    const drawFilters = () => {
      filters.innerHTML = ['All', ...Object.keys(CATEGORIES)].map((c) =>
        `<button data-cat="${c}" class="px-4 py-2 rounded-full text-sm font-medium border transition ${
          c === active
            ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-500'
        }">${c}</button>`).join('');
    };

    const draw = () => {
      const q = search.value.trim().toLowerCase();
      const list = sortedPosts().filter((p) =>
        (active === 'All' || p.category === active) &&
        (!q || [p.title, p.excerpt, p.category, ...p.tags].join(' ').toLowerCase().includes(q))
      );
      $('#blog-grid').innerHTML = list.map(postCard).join('');
      $('#empty-state').classList.toggle('hidden', list.length > 0);
      $('#result-count').textContent = `${list.length} article${list.length === 1 ? '' : 's'}`;
      initReveal();
    };

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-cat]');
      if (!btn) return;
      active = btn.dataset.cat;
      drawFilters();
      draw();
    });
    search.addEventListener('input', draw);
    $('#reset-filters').addEventListener('click', () => {
      active = 'All';
      search.value = '';
      drawFilters();
      draw();
    });

    drawFilters();
    draw();
  }

  function renderPost() {
    const slug = new URLSearchParams(location.search).get('slug');
    const posts = sortedPosts();
    const idx = posts.findIndex((p) => p.slug === slug);
    const root = $('#post-root');

    if (idx === -1) {
      root.innerHTML = `
        <div class="max-w-xl mx-auto text-center py-32 px-4">
          <p class="text-7xl font-serif text-gradient font-semibold">404</p>
          <h1 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Article not found</h1>
          <p class="mt-2 text-slate-600 dark:text-slate-400">The post you're looking for doesn't exist or has moved.</p>
          <a href="blog.html" class="mt-8 inline-flex px-6 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700">Browse all articles</a>
        </div>`;
      return;
    }

    const p = posts[idx];
    const a = AUTHORS[p.author];
    const prev = posts[idx + 1];
    const next = posts[idx - 1];
    document.title = `${p.title} — Inkwell`;

    const navCard = (post, label, align) => post ? `
      <a href="post.html?slug=${post.slug}" class="group flex-1 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 transition ${align}">
        <p class="text-sm text-slate-500 dark:text-slate-400">${label}</p>
        <p class="mt-1 font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">${post.title}</p>
      </a>` : '<div class="flex-1 hidden sm:block"></div>';

    root.innerHTML = `
      <header class="max-w-3xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 text-center">
        <a href="blog.html?category=${p.category}">${badge(p.category)}</a>
        <h1 class="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white">${p.title}</h1>
        <p class="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400">${p.excerpt}</p>
        <div class="mt-8 flex items-center justify-center gap-3">
          ${avatar(a, 'w-12 h-12 text-sm')}
          <div class="text-left text-sm">
            <p class="font-semibold text-slate-900 dark:text-white">${a.name}</p>
            <p class="text-slate-500 dark:text-slate-400">${formatDate(p.date)} · ${p.readTime} min read</p>
          </div>
        </div>
      </header>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
        <img src="${postImage(p, 1600, 900)}" alt="" class="w-full aspect-[16/9] object-cover rounded-[2rem] shadow-soft">
      </div>

      <div class="max-w-3xl mx-auto px-4 sm:px-6 mt-14">
        <div class="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-semibold prose-a:text-brand-600 prose-blockquote:border-brand-500 prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:not-italic prose-pre:rounded-2xl prose-img:rounded-2xl">
          ${p.content}
        </div>

        <div class="mt-12 flex flex-wrap items-center justify-between gap-4 py-6 border-y border-slate-200 dark:border-slate-800">
          <div class="flex flex-wrap gap-2">
            ${p.tags.map((t) => `<span class="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">#${t}</span>`).join('')}
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-slate-500 dark:text-slate-400 mr-1">Share</span>
            <a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(p.title)}&url=${encodeURIComponent(location.href)}" class="w-10 h-10 grid place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700" aria-label="Share on X">${ICONS.x}</a>
            <a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" class="w-10 h-10 grid place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700" aria-label="Share on LinkedIn">${ICONS.linkedin}</a>
            <button id="copy-link" class="w-10 h-10 grid place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700" aria-label="Copy link">${ICONS.link}</button>
          </div>
        </div>

        <div class="mt-10 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row gap-6 items-start">
          ${avatar(a, 'w-16 h-16 text-lg')}
          <div>
            <p class="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Written by</p>
            <p class="mt-1 text-xl font-bold text-slate-900 dark:text-white">${a.name}</p>
            <p class="text-brand-600 dark:text-brand-400 text-sm font-medium">${a.role} at Inkwell</p>
            <p class="mt-3 text-slate-600 dark:text-slate-400">Writes about ${p.category.toLowerCase()} and the craft of making things people love. Based somewhere with good coffee.</p>
          </div>
        </div>

        <div class="mt-10 flex flex-col sm:flex-row gap-4">
          ${navCard(prev, '← Previous', '')}
          ${navCard(next, 'Next →', 'sm:text-right')}
        </div>
      </div>`;

    $('#copy-link').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(location.href); toast('Link copied to clipboard'); }
      catch (e) { toast('Could not copy link'); }
    });

    const related = posts.filter((x) => x !== p && x.category === p.category);
    const fill = posts.filter((x) => x !== p && x.category !== p.category);
    $('#related-posts').innerHTML = [...related, ...fill].slice(0, 3).map(postCard).join('');

    const bar = $('#progress');
    const updateBar = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(scrollY / h, 1) : 0})`;
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  function initContact() {
    const form = $('#contact-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      $$('[data-required]', form).forEach((field) => {
        const v = field.value.trim();
        const valid = field.type === 'email' ? isEmail(v) : v.length >= (field.tagName === 'TEXTAREA' ? 10 : 2);
        field.closest('div').querySelector('.error').classList.toggle('hidden', valid);
        field.classList.toggle('!border-rose-500', !valid);
        if (!valid) ok = false;
      });
      if (!ok) return;
      form.reset();
      toast("✅ Message sent! We'll get back to you within 48 hours.");
    });
  }

  /* ---------- Boot ---------- */
  renderHeader();
  renderFooter();
  if (page === 'home') renderHome();
  if (page === 'blog') renderBlog();
  if (page === 'post') renderPost();
  if (page === 'contact') initContact();
  initNewsletter();
  initReveal();
})();
