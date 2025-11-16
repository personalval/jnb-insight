<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import FilterSidebar from '$lib/jobs/FilterSidebar.svelte';
  import JobCard from '$lib/jobs/JobCard.svelte';
  import JobCardSkeleton from '$lib/jobs/JobCardSkeleton.svelte';
    import JobSearchHero from '$lib/jobs/JobSearchHero.svelte';
    import Navbar from '$lib/Home/Navbar.svelte';

  let keyword = '';
  let city = 'All Cities';
  let category = 'All Categories';

  let selectedFilters: string[] = [];

  let sort = 'Oldest';
  let pageNum = 1;
  let pageSize = 10;

  let jobs: any[] = [];
  let total = 0;
  let loading = false;

  // ---------- URL <-> STATE ----------
  function readParams() {
    const sp = $page.url.searchParams;
    keyword = sp.get('kw') ?? '';
    city = sp.get('city') ?? 'All Cities';
    category = sp.get('cat') ?? 'All Categories';
    sort = sp.get('sort') ?? 'Oldest';
    pageNum = Number(sp.get('page') ?? 1);
    pageSize = Number(sp.get('ps') ?? 10);
    selectedFilters = (sp.get('filters') ?? '').split(',').filter(Boolean);
  }

  function writeParams(opts: Partial<Record<string, string | number | string[]>> = {}) {
    const sp = new URLSearchParams($page.url.searchParams);
    const set = (k: string, v: any) => {
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) sp.delete(k);
      else sp.set(k, Array.isArray(v) ? v.join(',') : String(v));
    };

    set('kw', opts.kw ?? keyword);
    set('city', opts.city ?? city);
    set('cat', opts.cat ?? category);
    set('sort', opts.sort ?? sort);
    set('page', opts.page ?? pageNum);
    set('ps', opts.ps ?? pageSize);
    set('filters', opts.filters ?? selectedFilters);

    goto(`/jobs?${sp.toString()}`, { replaceState: true, noScroll: true, keepfocus: true });
  }

  // ---------- DATA FETCH (mocked) ----------
  // Replace with your real API call.
  async function fetchJobs({
    kw, city, cat, filters, sort, page, ps
  }: {
    kw: string; city: string; cat: string; filters: string[]; sort: string; page: number; ps: number;
  }): Promise<{ items: any[]; total: number }> {
    loading = true;

    // simulate network + filter on a local array for demo
    const seed: any[] = [
      { id: '1', title: 'MARKETING GRADUATE', badges: ['NYSC Placement'], negotiable: true, urgent: true, daysLeft: 1 },
      { id: '2', title: 'Admin Intern', role: 'Admin', badges: ['Internships'], location: 'Lagos', pay: '₦80,000/month', urgent: true, daysLeft: 1 },
      { id: '3', title: 'Customer Experience Intern', role: 'Customer Service', badges: ['Internships'], location: 'Anthony', negotiable: true, daysLeft: 1 },
      { id: '4', title: 'Marketing Intern', badges: ['Internships'], location: 'Abuja', daysLeft: 3 },
      { id: '5', title: 'Graduate Trainee – Ops', badges: ['Graduate Trainee'], daysLeft: 5 }
    ];

    await new Promise(r => setTimeout(r, 600)); // skeleton visible

    let filtered = seed;

    if (kw) filtered = filtered.filter(j => j.title.toLowerCase().includes(kw.toLowerCase()));
    if (city && city !== 'All Cities') filtered = filtered.filter(j => (j.location ?? '').toLowerCase() === city.toLowerCase());
    if (cat && cat !== 'All Categories') {
      // simple demo: match any badge
      filtered = filtered.filter(j => (j.badges ?? []).some((b: string) => b.toLowerCase().includes(cat.toLowerCase())));
    }
    if (filters?.length) {
      // example mapping (align ids to your FilterSidebar groups)
      const map: Record<string, (j: any) => boolean> = {
        entry: j => /entry/i.test(j.title),
        graduate: j => /graduate/i.test(j.title) || (j.badges ?? []).includes('Graduate Trainee'),
        intern: j => /intern/i.test(j.title) || (j.badges ?? []).includes('Internships'),
        nysc: j => (j.badges ?? []).includes('NYSC Placement'),
        siwes: _ => false
      };
      filtered = filtered.filter(j => filters.some(fid => map[fid]?.(j)));
    }

    if (sort === 'Newest') filtered = filtered.slice().reverse();

    const start = (page - 1) * ps;
    const items = filtered.slice(start, start + ps);
    loading = false;
    return { items, total: filtered.length };
  }

  // ---------- REACTIVITY ----------
  // Initialize from URL on first mount
  onMount(() => { readParams(); });

  // React to URL changes (browser nav, etc.)
  $: if ($page.url) {
    readParams();
    // fetch when any param changes
    (async () => {
      const { items, total: t } = await fetchJobs({
        kw: keyword, city, cat: category, filters: selectedFilters, sort, page: pageNum, ps: pageSize
      });
      jobs = items;
      total = t;
    })();
  }

  // ---------- HANDLERS ----------
  function onHeroSearch(e: CustomEvent<{ keyword: string; city: string; category: string }>) {
    const { keyword: kw, city: c, category: cat } = e.detail;
    // reset to page 1 when searching
    writeParams({ kw, city: c, cat, page: 1 });
  }

  function onFiltersChange(e: CustomEvent<{ selected: string[] }>) {
    selectedFilters = e.detail.selected;
    writeParams({ filters: selectedFilters, page: 1 });
  }

  function clearFilters() {
    selectedFilters = [];
    writeParams({ filters: [], page: 1 });
  }

  function setSort(v: string) {
    writeParams({ sort: v, page: 1 });
  }

  function gotoPage(p: number) {
    if (p < 1) return;
    const max = Math.max(1, Math.ceil(total / pageSize));
    writeParams({ page: Math.min(p, max) });
  }
</script>
<Navbar />
<!-- HERO -->
<JobSearchHero
  cities={['All Cities', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan']}
  categories={['All Categories', 'Internships', 'Graduate Trainee', 'NYSC Placement']}
  on:search={onHeroSearch}
/>

<!-- LIST + FILTERS -->
<section class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
  <!-- header row -->
  <div class="flex items-center justify-between mb-4 md:mb-6">
    <div class="flex items-center gap-3">
      <h2 class="text-lg md:text-xl font-semibold">
        {#if loading}{total}{:else}{total}{/if} Jobs
      </h2>
      <button class="btn btn-link btn-xs md:hidden" on:click={clearFilters}>Clear All</button>
    </div>

    <div class="flex items-center gap-3">
      <span class="hidden md:inline text-sm text-base-content/70">Sort by</span>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-sm">
          {sort}
          <svg class="w-4 h-4 ml-1 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m6 9 6 6 6-6" stroke-width="2"/>
          </svg>
        </label>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow">
          {#each ['Oldest', 'Newest'] as s}
            <li><button on:click={() => setSort(s)}>{s}</button></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- grid -->
  <div class="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-5 md:gap-8">
    <FilterSidebar on:change={onFiltersChange} on:clear={clearFilters} />

    <div class="space-y-4 md:space-y-5">
      {#if loading}
        {#each Array(5) as _}<JobCardSkeleton />{/each}
      {:else if jobs.length === 0}
        <div class="card bg-base-100 border border-base-300 rounded-2xl">
          <div class="card-body items-center text-center">
            <div class="skeleton rounded-full h-16 w-16 mb-3"></div>
            <h3 class="font-semibold">No results</h3>
            <p class="text-base-content/70">Try adjusting your filters or keywords.</p>
            <div class="mt-2">
              <button class="btn btn-ghost btn-sm" on:click={clearFilters}>Clear all filters</button>
            </div>
          </div>
        </div>
      {:else}
        {#each jobs as job}<JobCard {job} />{/each}
      {/if}

      <!-- PAGINATION -->
      {#if !loading && total > pageSize}
        <div class="flex items-center justify-between pt-2">
          <div class="text-sm text-base-content/70">
            Page {pageNum} of {Math.max(1, Math.ceil(total / pageSize))}
          </div>
          <div class="join">
            <button class="btn join-item" on:click={() => gotoPage(pageNum - 1)} disabled={pageNum <= 1}>Prev</button>
            <!-- simple 1..N (show up to 5) -->
            {#each Array(Math.min(5, Math.max(1, Math.ceil(total / pageSize)))) as _, i}
              {#if (i + 1) <= Math.ceil(total / pageSize)}
                <button
                  class="btn join-item {pageNum === i + 1 ? 'btn-primary' : ''}"
                  on:click={() => gotoPage(i + 1)}
                >{i + 1}</button>
              {/if}
            {/each}
            <button class="btn join-item" on:click={() => gotoPage(pageNum + 1)}
              disabled={pageNum >= Math.ceil(total / pageSize)}>Next</button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

