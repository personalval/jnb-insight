<!-- src/lib/JobSearchHero.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // demo data – swap with your API data later
  export let cities = ['All Cities', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'];
  export let categories = ['All Categories', 'Engineering', 'Design', 'Marketing', 'Product'];

  let keyword = '';
  let city = cities[0];
  let category = categories[0];

  function clearAll() {
    keyword = '';
    city = cities[0];
    category = categories[0];
    dispatch('clear');
  }

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    dispatch('search', { keyword: keyword.trim(), city, category });
  }
</script>

<section
  class="relative min-h-[260px] flex items-center justify-center overflow-hidden"
  aria-label="Job search"
>
  <div class="absolute inset-0 bg-[url('https://intenvolt.com/wp-content/uploads/2023/08/Picsart_25-08-22_20-32-56-721.png')] bg-cover bg-center"></div>
  <div class="absolute inset-0 bg-base-100/60 dark:bg-base-100/50 backdrop-blur-[1px]"></div>

  <div class="relative z-10 w-full max-w-6xl px-4 md:px-6">
    <h1 class="text-center text-3xl md:text-5xl font-bold text-base-content mb-6 md:mb-8">
      Find Your Dream Jobs
    </h1>

<form class="w-full" role="search" aria-label="Job search form" on:submit|preventDefault={onSubmit}>
  <div
    class="rounded-2xl bg-base-100 shadow-xl border border-base-300/60 overflow-hidden mb-6 mt-3"
  >
    <!-- mobile: stacked; desktop: 4-column grid with buttons on one row -->
    <div
      class="flex flex-col md:grid md:grid-cols-[1fr_auto_auto_minmax(260px,1fr)] md:items-stretch"
    >
      <!-- keywords -->
      <label
        class="flex items-center gap-3 px-4 py-3 border-b border-base-300/60 md:border-b-0 md:border-l first:md:border-l-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="7" stroke-width="2" />
          <path d="m21 21-4.3-4.3" stroke-width="2" />
        </svg>
        <input
          class="input input-ghost w-full focus:outline-none"
          type="search"
          placeholder="Jobs title or keywords"
          bind:value={keyword}
          aria-label="Job title or keywords"
        />
      </label>

      <!-- city -->
      <div
        class="px-4 py-3 flex items-center gap-3 border-b border-base-300/60 md:border-b-0 md:border-l"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2v20" stroke-width="2" />
          <path d="M19 13H5" stroke-width="2" />
        </svg>
        <select class="select select-ghost w-full" bind:value={city} aria-label="City">
          {#each cities as c}<option value={c}>{c}</option>{/each}
        </select>
      </div>

      <!-- category -->
      <div
        class="px-4 py-3 flex items-center gap-3 border-b border-base-300/60 md:border-b-0 md:border-l"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 7h18" stroke-width="2" />
          <path d="M3 12h18" stroke-width="2" />
          <path d="M3 17h18" stroke-width="2" />
        </svg>
        <select class="select select-ghost w-full" bind:value={category} aria-label="Category">
          {#each categories as c}<option value={c}>{c}</option>{/each}
        </select>
      </div>

      <div class="p-3 md:p-4 md:border-l">
        <div
          class="flex flex-col gap-3 md:flex-row md:items-center md:justify-end"
        >
          <button
            type="button"
            class="btn btn-ghost border border-base-300 rounded-full md:rounded-full md:btn-ghost md:px-5"
            on:click={clearAll}
            aria-label="Clear filters"
          >
            Clear
          </button>
          <button
            type="submit"
            class="btn btn-primary rounded-full md:rounded-full md:px-6"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</form>

  </div>
</section>

<style>
  h1 { word-spacing: 0.05em; }
</style>
