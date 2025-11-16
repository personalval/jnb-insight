<script lang="ts">
  export let job: {
    id: string;
    title: string;
    role?: string;
    badges?: string[];
    location?: string;
    pay?: string;
    negotiable?: boolean;
    urgent?: boolean;
    liked?: boolean;
    daysLeft?: number;
  };
</script>

<article
  class="card border border-error/40 rounded-2xl bg-base-100 shadow-sm hover:shadow-md transition"
>
  <div class="card-body p-5">
    <!-- top row -->
    <div class="flex items-start gap-3">
      <h3 class="font-semibold text-lg text-primary flex-1">{job.title}</h3>

      <div class="flex items-center gap-3">
        {#if job.urgent}
          <span title="Urgent" class="text-error">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2v14M12 18v4" stroke-width="2"/>
              <path d="M6 12h12" stroke-width="2"/>
            </svg>
          </span>
        {/if}
        <button class="btn btn-ghost btn-xs" aria-label="Save job">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8Z" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </div>

    {#if job.role}
      <div class="text-sm text-base-content/70 -mt-1">{job.role}</div>
    {/if}

    <!-- badges -->
    <div class="mt-3 flex flex-wrap gap-2">
      {#if job.badges}
        {#each job.badges as b}
          <span class="badge badge-ghost badge-lg">{b}</span>
        {/each}
      {/if}
      {#if job.location}
        <span class="badge badge-ghost badge-lg">
          <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z" stroke-width="2"/><circle cx="12" cy="11" r="2" stroke-width="2"/></svg>
          {job.location}
        </span>
      {/if}
      {#if job.pay}
        <span class="badge badge-ghost badge-lg">Max: {job.pay}</span>
      {/if}
      {#if job.negotiable}
        <span class="badge badge-ghost badge-lg">Negotiable Price</span>
      {/if}
    </div>

    <!-- footer -->
    <div class="mt-4 text-sm text-base-content/70">
      {job.daysLeft ?? 0} days left to apply
    </div>
  </div>
</article>
