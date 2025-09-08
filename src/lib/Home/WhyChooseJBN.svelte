<script lang="ts">
  export let title = "Why choose JBN Insight";
  export let blurb =
    "Actionable market data, hiring trends, and career insights tailored to Nigeria’s early-career ecosystem.";

  // Trust metrics (left column)
  export let stats: { label: string; value: string; hint?: string }[] = [
    { label: "Active jobs tracked", value: "25k+", hint: "across 40+ categories" },
    { label: "Employers engaged", value: "1.2k+", hint: "from startups to enterprises" },
    { label: "Candidate profiles", value: "80k+", hint: "students, interns, NYSC, entry-level" }
  ];

  // Benefits (right column cards)
  type Benefit = {
    title: string;
    desc: string;
    icon?: "radar" | "bolt" | "target" | "chart" | "shield" | "bell";
  };

  export let benefits: Benefit[] = [
    {
      title: "Real-time job market radar",
      desc: "We aggregate jobs and compensation signals across trusted sources to keep you ahead.",
      icon: "radar"
    },
    {
      title: "Insightful analytics",
      desc: "Role demand, skills heatmaps, and trends that guide smarter hiring and applications.",
      icon: "chart"
    },
    {
      title: "Targeted alerts",
      desc: "Custom notifications by category, city, and skill—no noise, just what matters.",
      icon: "bell"
    }
  ];

  const Icon = {
    radar: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Zm0 4a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6Zm6.7-2.7-6 6 1.4 1.4 6-6-1.4-1.4Z"/></svg>`,
    bolt:  `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 21v-7H7l6-11v7h4l-6 11Z"/></svg>`,
    target:`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2Zm0 5a5 5 0 1 0 5 5h-2a3 3 0 1 1-3-3V7Zm1 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h2v16H4V4Zm14 10h2v6h-2v-6ZM10 10h2v10h-2V10Zm6-6h2v16h-2V4Z"/></svg>`,
    shield:`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"/></svg>`,
    bell:  `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm8-6v-4a8 8 0 1 0-16 0v4l-2 2v1h20v-1l-2-2Z"/></svg>`
  } as const;
</script>

<section class="bg-base-100">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
    <!-- Header -->
    <div class="max-w-3xl">
      <h2 class="text-2xl sm:text-3xl font-extrabold">{title}</h2>
      <p class="mt-2 text-sm sm:text-base text-base-content/80">{blurb}</p>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <!-- Left: stats & trust -->
      <div class="bg-base-100 border border-base-200 rounded-2xl p-5 sm:p-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {#each stats as s}
            <div class="rounded-xl bg-base-200/50 p-4">
              <div class="text-2xl font-extrabold text-primary">{s.value}</div>
              <div class="text-sm font-medium mt-1">{s.label}</div>
              {#if s.hint}<div class="text-xs opacity-70 mt-0.5">{s.hint}</div>{/if}
            </div>
          {/each}
        </div>

        <div class="mt-5 divider my-5"></div>

        <!-- tiny checklist -->
        <ul class="space-y-2 text-sm">
          <li class="flex items-start gap-2">
            <span class="text-success mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
            </span>
            Verified sources & deduplicated listings
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
            </span>
            Skills-based tagging and search
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41Z"/></svg>
            </span>
            Privacy-first alerts (no spam)
          </li>
        </ul>
      </div>

      <!-- Right: benefit cards -->
      <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {#each benefits as b}
          <article class="card bg-base-100 border border-base-200 hover:shadow-md transition-shadow">
            <div class="card-body p-5">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center">
                  {@html Icon[b.icon ?? "chart"]}
                </div>
                <h3 class="font-semibold">{b.title}</h3>
              </div>
              <p class="mt-2 text-sm text-base-content/80">{b.desc}</p>
            </div>
          </article>
        {/each}

        <!-- callout card -->
        <article class="card bg-primary text-primary-content">
          <div class="card-body p-5">
            <h3 class="card-title">Get insights in your inbox</h3>
            <p class="text-primary-content/90 text-sm">
              Weekly trend recap, top roles, and salary signals—no fluff.
            </p>
            <div class="mt-3 join">
              <input type="email" placeholder="you@email.com" class="input input-bordered join-item w-full" />
              <a href="/subscribe" class="btn btn-secondary join-item">Subscribe</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
