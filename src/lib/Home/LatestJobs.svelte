<script lang="ts">
   type Job = {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location: string;            // e.g. "Lagos · Hybrid"
    type?: string;               // e.g. "Internship", "Full-time"
    level?: string;              // e.g. "Entry", "NYSC"
    salary?: string;             // e.g. "₦200k–₦300k"
    tags?: string[];             // ["React", "Figma", "SQL"]
    postedAt: string | Date;     // ISO date or Date
    href: string;                // /jobs/slug-or-id
  };

  export let title = "Latest jobs";
  export let subtitle = "Fresh roles posted by employers hiring now";
  export let jobs: Job[] = [];

  // pagination
  export let page = 1;
  export let perPage = 8;
  export let total = 0;
  export let baseHref = "/jobs"; // keeps existing other qs
  export let showViewAll = true;

  // simple “time ago”
  function timeAgo(d: string | Date) {
    const t = typeof d === "string" ? new Date(d) : d;
    const sec = Math.floor((Date.now() - t.getTime()) / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    if (sec < 60) return `${sec}s ago`;
    if (min < 60) return `${min}m ago`;
    if (hr < 24) return `${hr}h ago`;
    if (day < 7) return `${day}d ago`;
    return t.toLocaleDateString();
  }

  function qp(n: number) {
    const url = new URL(baseHref, typeof window === "undefined" ? "http://localhost" : window.location.origin);
    const current = typeof window !== "undefined" ? new URL(window.location.href) : url;
    // copy existing query params except page/perPage (we’ll set anew)
    current.searchParams.forEach((v, k) => {
      if (!["page", "perPage"].includes(k)) url.searchParams.set(k, v);
    });
    url.searchParams.set("page", String(n));
    url.searchParams.set("perPage", String(perPage));
    return url.pathname + "?" + url.searchParams.toString();
  }

  const totalPages = Math.max(1, Math.ceil(total / perPage));
</script>

<section class="bg-base-100">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
    <!-- header -->
    <div class="flex items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl sm:text-3xl font-extrabold">{title}</h2>
        <p class="mt-1 text-sm sm:text-base text-base-content/80">{subtitle}</p>
      </div>
      {#if showViewAll}
        <a href="/jobs" class="btn btn-ghost btn-sm hidden sm:inline-flex">View all</a>
      {/if}
    </div>

    {#if jobs.length === 0}
      <div class="mt-8 rounded-box border border-base-200 p-8 text-center">
        <p class="text-base-content/70">No jobs yet. Check back soon or <a class="link" href="/jobs">browse all</a>.</p>
      </div>
    {:else}
      <!-- list -->
      <div class="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
        {#each jobs as job}
          <a href={job.href} class="card border border-base-200 bg-base-100 hover:shadow-md transition-shadow">
            <div class="card-body p-4 sm:p-5">
              <div class="flex items-start gap-3">
                <!-- logo -->
                <div class="avatar">
                  <div class="w-12 h-12 rounded-xl ring-1 ring-base-200 bg-base-200 overflow-hidden">
                    {#if job.companyLogo}
                      <img src={job.companyLogo} alt={`${job.company} logo`} class="w-full h-full object-cover" loading="lazy" />
                    {:else}
                      <div class="w-full h-full grid place-items-center font-bold text-base-content/50">
                        {job.company?.[0] ?? "•"}
                      </div>
                    {/if}
                  </div>
                </div>

                <!-- main -->
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-semibold text-base md:text-lg truncate">{job.title}</h3>
                    {#if job.type}<span class="badge badge-ghost badge-sm">{job.type}</span>{/if}
                    {#if job.level}<span class="badge badge-ghost badge-sm">{job.level}</span>{/if}
                  </div>
                  <div class="mt-1 text-sm text-base-content/70 truncate">
                    {job.company} • {job.location}
                  </div>

                  {#if job.tags?.length}
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      {#each job.tags.slice(0, 5) as t}
                        <span class="badge badge-outline">{t}</span>
                      {/each}
                    </div>
                  {/if}

                  <div class="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    {#if job.salary}
                      <span class="font-medium">{job.salary}</span>
                    {/if}
                    <span class="text-base-content/60">•</span>
                    <span class="text-base-content/70">{timeAgo(job.postedAt)}</span>
                  </div>
                </div>

                <!-- actions -->
                <div class="hidden sm:flex flex-col items-end gap-2">
                  <button class="btn btn-ghost btn-xs" aria-label="Save job" on:click|preventDefault={() => { /* hook */ }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2Z"/></svg>
                  </button>
                  <span class="text-xs text-base-content/60">{timeAgo(job.postedAt)}</span>
                </div>
              </div>

              <div class="card-actions mt-4">
                <span class="hidden sm:block flex-1"></span>
                <span class="sm:hidden text-xs text-base-content/60">{timeAgo(job.postedAt)}</span>
                <span class="flex-1"></span>
                <span class="hidden md:block"></span>
                <button class="btn btn-primary btn-sm" on:click={() => window.location.href = job.href}>Apply</button>
              </div>
            </div>
          </a>
        {/each}
      </div>

      <!-- pagination -->
      <div class="mt-6 flex items-center justify-between">
        <div class="text-sm text-base-content/70">
          Showing <span class="font-medium">{Math.min((page-1)*perPage+1, total)}</span>
          to <span class="font-medium">{Math.min(page*perPage, total)}</span>
          of <span class="font-medium">{total}</span> jobs
        </div>

        <div class="join">
          <a class="join-item btn btn-sm" aria-disabled={page<=1} href={page<=1 ? undefined : qp(page-1)}>Prev</a>
          <span class="join-item btn btn-sm btn-ghost no-animation pointer-events-none">
            {page} / {totalPages}
          </span>
          <a class="join-item btn btn-sm" aria-disabled={page>=totalPages} href={page>=totalPages ? undefined : qp(page+1)}>Next</a>
        </div>
      </div>
    {/if}

    <!-- mobile view-all -->
    {#if showViewAll}
      <div class="mt-5 sm:hidden">
        <a href="/jobs" class="btn btn-ghost btn-sm w-full">View all jobs</a>
      </div>
    {/if}
  </div>
</section>
