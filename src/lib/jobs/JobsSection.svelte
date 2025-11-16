<script lang="ts">
  import FilterSidebar from './FilterSidebar.svelte';
  import JobCard from './JobCard.svelte';

  // mock jobs – replace with API results
  export let jobs = [
    {
      id: '1',
      title: 'MARKETING GRADUATE',
      badges: ['NYSC Placement'],
      negotiable: true,
      urgent: true,
      daysLeft: 1
    },
    {
      id: '2',
      title: 'Admin Intern',
      role: 'Admin',
      badges: ['Internships'],
      location: 'Lagos',
      pay: '₦80,000/month',
      urgent: true,
      daysLeft: 1
    },
    {
      id: '3',
      title: 'Customer Experience Intern',
      role: 'Customer Service',
      badges: ['Internships'],
      location: 'Anthony',
      negotiable: true,
      daysLeft: 1
    }
  ];

  let sort = 'Oldest'; // demo
  function clearAll() {
    // hook: clear filters and maybe refresh jobs
    // for now do nothing
  }
</script>

<section class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
  <!-- header row -->
  <div class="flex items-center justify-between mb-4 md:mb-6">
    <div class="flex items-center gap-3">
      <!-- Mobile "Filter" trigger lives inside FilterSidebar collapse -->
      <h2 class="text-lg md:text-xl font-semibold">{jobs.length} Jobs</h2>
      <button class="btn btn-link btn-xs md:hidden" on:click={clearAll}>
        Clear All
      </button>
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
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
          {#each ['Oldest', 'Newest', 'Salary (High→Low)', 'Salary (Low→High)'] as s}
            <li><button on:click={() => (sort = s)}>{s}</button></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- grid: sidebar + list -->
  <div class="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-5 md:gap-8">
    <FilterSidebar on:clear={clearAll} />

    <div class="space-y-4 md:space-y-5">
      {#each jobs as job}
        <JobCard {job} />
      {/each}
    </div>
  </div>
</section>
