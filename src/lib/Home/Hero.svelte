<script lang="ts">
  import { createEventDispatcher } from "svelte";

  // Configurable props
  export let title = "We Are Building Nigeria’s\nFuture Workforce";
  export let subtitle =
    "JBN connects students, interns, NYSC members, and entry-level talent with employers. Discover internships, graduate roles, and early careers with employers ready to grow.";
  export let imageSrc = "/images/hero-laptop.png"; // replace with your asset
  export let imageAlt = "Smiling candidate using a laptop";
export let floatImage = "/images/tip-2.png";
  export let showBadge = true;

  // Search form (emit event and also support querystring navigation)
  const dispatch = createEventDispatcher();
  let q = "";
  let location = "All Cities";

  function submit(e: Event) {
    e.preventDefault();
    // emit for parent handlers and fallback navigate with qs
    dispatch("search", { q, location });
    // SvelteKit navigate via link—no js router import needed
    const params = new URLSearchParams({ q, location });
    window.location.href = `/jobs?${params.toString()}`;
  }
</script>

<section class="bg-primary text-primary-content">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid lg:grid-cols-2 gap-8 items-center py-10 sm:py-14 lg:py-16">
      <!-- Left: copy + search -->
      <div class="order-2 lg:order-1">
        {#if showBadge}
          <div class="badge badge-secondary badge-outline mb-4">
            Connecting talent & employers
          </div>
        {/if}

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight whitespace-pre-line">
          {title}
        </h1>

        <p class="mt-3 sm:mt-4 text-sm sm:text-base/7 opacity-90 max-w-xl">
          {subtitle}
        </p>

        <!-- Search Bar -->
        <form class="mt-5 sm:mt-6" on:submit={submit}>
          <div
            class="bg-base-100 text-base-content rounded-2xl p-2 shadow-lg border border-base-200
                   flex flex-col sm:flex-row gap-2 items-stretch"
          >
            <div class="flex items-center gap-2 flex-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm7.707 12.293 3 3-1.414 1.414-3-3 1.414-1.414Z"/>
              </svg>
              <input
                type="text"
                placeholder="Job title, skill, or company"
                class="input input-ghost w-full focus:outline-none"
                bind:value={q}
                aria-label="Search by job title, skill, or company"
              />
            </div>

            <div class="divider divider-horizontal hidden sm:flex my-0" />

            <div class="flex items-center gap-2 px-2 sm:w-64">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
              </svg>
              <select class="select select-ghost w-full focus:outline-none" bind:value={location} aria-label="Location">
                <option>All Cities</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
                <option>Ibadan</option>
                <option>Remote</option>
              </select>
            </div>

            <button type="submit" class="btn btn-secondary shrink-0 sm:w-auto w-full">
              Search
            </button>
          </div>

          <!-- quick chips under the bar (optional) -->
          <div class="mt-3 flex flex-wrap gap-2 text-xs opacity-90">
            <span class="badge badge-outline bg-base-100">Internships</span>
            <span class="badge badge-outline bg-base-100">Graduate trainee</span>
            <span class="badge badge-outline bg-base-100">Entry level</span>
            <span class="badge badge-outline bg-base-100">NYSC</span>
          </div>
        </form>

        <!-- CTA buttons -->
        <div class="mt-5 flex items-center gap-3">
          <a href="/jobs" class="btn btn-accent">Find jobs</a>
          <a href="/post-job" class="btn btn-outline text-primary-content border-primary-content/40 hover:border-primary-content">
            Post a job
          </a>
        </div>
      </div>

      <!-- Right: image/card -->
      <div class="order-1 lg:order-2 relative">
        <!-- yellow halo behind image -->
        <div class="absolute -z-10 left-1/2 -translate-x-1/2 top-6 h-44 w-44 sm:h-60 sm:w-60 rounded-full bg-warning/90 blur-[2px]" />
        <div class="rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-w-sm mx-auto">
          <img src={imageSrc} alt={imageAlt} class="w-full h-auto object-cover" loading="eager" />
        </div>

        
        <!-- floating subscribe image -->
        <div class="absolute -bottom-16 right-10 sm:-bottom-8 sm:-right-10">
          <img
            src={floatImage}
            alt={imageAlt}
            class="w-28 sm:w-36 drop-shadow-xl rounded-xl"
          />
        </div>

        <!-- small floating cookie/consent-like bubble (optional) -->
        <div class="absolute right-2 -bottom-4 sm:right-6 sm:-bottom-6">
          <div class="tooltip tooltip-left" data-tip="We’ll never share your data">
            <button class="btn btn-circle btn-neutral btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
