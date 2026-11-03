// All blog content lives here. Add a new object to publish a new post.
const AUTHORS = {
  aria: { name: 'Aria Mehta', role: 'Design Lead', initials: 'AM', gradient: 'from-pink-500 to-orange-400' },
  leo: { name: 'Leo Fernandes', role: 'Senior Engineer', initials: 'LF', gradient: 'from-brand-500 to-cyan-400' },
  sam: { name: 'Sam Okafor', role: 'Editor', initials: 'SO', gradient: 'from-emerald-500 to-lime-400' },
};

const CATEGORIES = {
  Design: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
  Development: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  Productivity: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Lifestyle: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Tech: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
};

const POSTS = [
  {
    slug: 'designing-calm-interfaces',
    title: 'Designing Calm Interfaces in a Noisy World',
    excerpt: 'Why the best products feel quiet, and the practical rules we use to strip away visual noise without losing personality.',
    category: 'Design',
    author: 'aria',
    date: '2026-10-28',
    readTime: 7,
    featured: true,
    tags: ['UI', 'Minimalism', 'UX'],
    content: `
      <p>Every notification, badge and blinking cursor competes for a slice of attention. Calm design is the craft of deciding which of those deserve to exist at all.</p>
      <h2>Start by removing, not adding</h2>
      <p>Before reaching for a new component, ask whether an existing element can do the job. Most screens we audit can lose a third of their elements with no loss in clarity.</p>
      <blockquote>Good design is as little design as possible. Less, but better.</blockquote>
      <h2>Three rules we follow</h2>
      <ul>
        <li><strong>One primary action per view.</strong> If everything is bold, nothing is.</li>
        <li><strong>Whitespace is a feature.</strong> Space groups ideas better than borders do.</li>
        <li><strong>Motion with purpose.</strong> Animate to explain change, never to decorate.</li>
      </ul>
      <h2>Personality without noise</h2>
      <p>Calm doesn't mean bland. A single expressive typeface, a confident accent colour, or a well-timed micro-interaction can carry an entire brand while the rest of the interface stays out of the way.</p>
      <p>The goal is simple: let people finish what they came to do, and leave feeling lighter than when they arrived.</p>
    `,
  },
  {
    slug: 'modern-css-you-should-know',
    title: '10 Modern CSS Features You Should Be Using Today',
    excerpt: 'Container queries, :has(), subgrid and more. A tour of the CSS features that quietly replaced half of our JavaScript.',
    category: 'Development',
    author: 'leo',
    date: '2026-10-22',
    readTime: 9,
    tags: ['CSS', 'Frontend', 'Web'],
    content: `
      <p>CSS has changed more in the last few years than in the decade before. Many patterns that needed JavaScript are now a single line of CSS.</p>
      <h2>Container queries</h2>
      <p>Components can finally respond to the size of their container instead of the viewport. Cards, sidebars and widgets become truly reusable.</p>
      <pre><code>.card-wrapper { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 2fr; }
}</code></pre>
      <h2>The :has() selector</h2>
      <p>The long-awaited "parent selector" lets you style an element based on what it contains. Form validation states, empty states and layout tweaks get dramatically simpler.</p>
      <h2>Also worth learning</h2>
      <ul>
        <li>Subgrid for aligned nested layouts</li>
        <li>Native CSS nesting</li>
        <li><code>clamp()</code> for fluid typography</li>
        <li>View transitions for smooth page changes</li>
        <li>Cascade layers to tame specificity</li>
      </ul>
      <p>Pick one feature this week and refactor a component with it. You'll be surprised how much code disappears.</p>
    `,
  },
  {
    slug: 'deep-work-routine',
    title: 'The 90-Minute Deep Work Routine That Changed My Year',
    excerpt: 'A simple, repeatable system for protecting focus time, plus the tools and habits that make it stick.',
    category: 'Productivity',
    author: 'sam',
    date: '2026-10-15',
    readTime: 6,
    tags: ['Focus', 'Habits'],
    content: `
      <p>Twelve months ago my calendar looked like a game of Tetris. Today I get more meaningful work done before lunch than I used to in a whole day.</p>
      <h2>The routine</h2>
      <ol>
        <li><strong>Define one outcome</strong> the night before.</li>
        <li><strong>Go offline</strong> for 90 minutes: phone in another room, notifications off.</li>
        <li><strong>Work in a single tab</strong> or a single document.</li>
        <li><strong>Stop on time</strong> and write two lines about where to pick up.</li>
      </ol>
      <blockquote>Focus is not about willpower. It's about designing an environment where distraction is inconvenient.</blockquote>
      <h2>Why 90 minutes?</h2>
      <p>It's long enough to reach a state of flow and short enough to stay sustainable every day. Two sessions are plenty for most knowledge work.</p>
      <p>Try it for two weeks. Keep a tiny log of what you shipped in each session, and watch the compounding effect.</p>
    `,
  },
  {
    slug: 'slow-mornings',
    title: 'In Praise of Slow Mornings',
    excerpt: 'What happened when I stopped checking my phone for the first hour of the day, and why I am never going back.',
    category: 'Lifestyle',
    author: 'aria',
    date: '2026-10-09',
    readTime: 5,
    tags: ['Wellbeing', 'Mindfulness'],
    content: `
      <p>For years my mornings began in someone else's inbox. Then I tried an experiment: no screens until I'd had coffee, a walk and ten minutes with a notebook.</p>
      <h2>The first week was hard</h2>
      <p>The urge to check was almost physical. But by day five the quiet felt less like an absence and more like space.</p>
      <h2>What changed</h2>
      <ul>
        <li>I started the workday with my own priorities, not other people's.</li>
        <li>My afternoon energy dip almost disappeared.</li>
        <li>I began reading books again, about one a fortnight.</li>
      </ul>
      <p>You don't need an hour. Start with fifteen minutes and protect them fiercely.</p>
    `,
  },
  {
    slug: 'ai-tools-for-developers',
    title: 'AI Pair Programming: What Actually Works in 2026',
    excerpt: 'After a year of shipping with AI assistants, here is our honest take on where they shine and where they still need a human.',
    category: 'Tech',
    author: 'leo',
    date: '2026-10-02',
    readTime: 8,
    tags: ['AI', 'Tools', 'Workflow'],
    content: `
      <p>AI assistants are now part of most developers' daily toolkit. The question is no longer "should I use them?" but "how do I use them well?"</p>
      <h2>Where they shine</h2>
      <ul>
        <li>Scaffolding boilerplate and tests</li>
        <li>Explaining unfamiliar codebases</li>
        <li>Refactoring with clear, well-scoped instructions</li>
      </ul>
      <h2>Where humans still lead</h2>
      <p>Architecture decisions, product trade-offs and understanding what users actually need remain deeply human work. Treat the assistant like a fast, eager colleague: give context, review its output, and own the result.</p>
      <blockquote>The best results come from developers who write clear specs. Prompting well is just communicating well.</blockquote>
      <p>Our advice: start with small, reviewable tasks and expand as trust grows.</p>
    `,
  },
  {
    slug: 'color-systems-that-scale',
    title: 'Building Colour Systems That Scale',
    excerpt: 'From a single brand colour to a full accessible palette with light and dark themes, step by step.',
    category: 'Design',
    author: 'aria',
    date: '2026-09-24',
    readTime: 10,
    tags: ['Color', 'Design Systems', 'Accessibility'],
    content: `
      <p>A colour system is more than a palette. It's a set of decisions about meaning, contrast and hierarchy that every designer and developer can rely on.</p>
      <h2>Start with tokens</h2>
      <p>Separate <em>raw colours</em> (indigo-500) from <em>semantic tokens</em> (text-primary, surface-raised). Components should only ever reference semantic tokens.</p>
      <h2>Check contrast early</h2>
      <p>Aim for a 4.5:1 contrast ratio for body text. Test every combination in both light and dark mode, not just the ones on your hero screen.</p>
      <h2>Dark mode is not inverted light mode</h2>
      <p>Pure black backgrounds with pure white text cause eye strain. Use deep, slightly tinted greys and reduce saturation on accent colours.</p>
      <p>Document everything, and your palette will survive many redesigns.</p>
    `,
  },
  {
    slug: 'javascript-performance-tips',
    title: 'Practical JavaScript Performance Tips for Real Websites',
    excerpt: 'Forget micro-benchmarks. These are the changes that made our pages load in under a second.',
    category: 'Development',
    author: 'leo',
    date: '2026-09-17',
    readTime: 7,
    tags: ['JavaScript', 'Performance'],
    content: `
      <p>Most performance problems on real websites have nothing to do with clever algorithms. They come from shipping too much code and doing work at the wrong time.</p>
      <h2>Ship less JavaScript</h2>
      <p>Audit your bundle. Remove unused dependencies, lazy-load below-the-fold widgets, and prefer native browser features over libraries.</p>
      <h2>Defer non-critical work</h2>
      <pre><code>requestIdleCallback(() => {
  loadAnalytics();
});</code></pre>
      <h2>Images matter more than code</h2>
      <ul>
        <li>Use modern formats like AVIF and WebP</li>
        <li>Always set width and height to avoid layout shift</li>
        <li>Add <code>loading="lazy"</code> to off-screen images</li>
      </ul>
      <p>Measure with real-user data, fix the biggest bottleneck, and repeat.</p>
    `,
  },
  {
    slug: 'minimal-desk-setup',
    title: 'A Minimal Desk Setup for Maximum Focus',
    excerpt: 'Fewer gadgets, better light, and the one accessory that improved my posture more than any chair.',
    category: 'Lifestyle',
    author: 'sam',
    date: '2026-09-08',
    readTime: 4,
    tags: ['Workspace', 'Minimalism'],
    content: `
      <p>My desk used to be covered in gadgets I thought would make me productive. Clearing it out did more for my focus than any of them.</p>
      <h2>The essentials</h2>
      <ul>
        <li>One good monitor at eye level</li>
        <li>A warm desk lamp for evenings</li>
        <li>A plant, because green is calming</li>
        <li>A laptop stand: the posture upgrade nobody talks about</li>
      </ul>
      <p>Everything else lives in a drawer. If I need it, I take it out. When I'm done, it goes back.</p>
    `,
  },
  {
    slug: 'notion-to-plain-text',
    title: 'Why I Moved My Notes Back to Plain Text',
    excerpt: 'Fancy tools come and go. Plain text files are fast, portable and will still open in twenty years.',
    category: 'Productivity',
    author: 'sam',
    date: '2026-08-30',
    readTime: 5,
    tags: ['Notes', 'Tools'],
    content: `
      <p>I've tried every note-taking app on the market. Each promised to be my "second brain". Each eventually became a cluttered attic.</p>
      <h2>The case for plain text</h2>
      <ul>
        <li><strong>Speed:</strong> opens instantly, searches instantly.</li>
        <li><strong>Portability:</strong> works with any editor on any device.</li>
        <li><strong>Longevity:</strong> no vendor lock-in, ever.</li>
      </ul>
      <p>A folder of Markdown files, a simple naming convention and a sync service is all I need. The fewer features, the more I actually write.</p>
    `,
  },
];
