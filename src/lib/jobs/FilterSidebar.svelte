<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // demo groups – replace with API data as needed
  export let groups: Array<{
    title: string;
    options: Array<{ id: string; label: string; count?: number }>;
  }> = [
    {
      title: 'Jobs Type',
      options: [
        { id: 'entry', label: 'Entry Level', count: 2 },
        { id: 'graduate', label: 'Graduate Trainee', count: 1 },
        { id: 'intern', label: 'Internships', count: 6 },
        { id: 'nysc', label: 'NYSC Placement', count: 7 },
        { id: 'siwes', label: 'SIWES', count: 0 }
      ]
    },
    { title: 'Salary', options: [] }
  ];

  // local selected ids
  let selected = new Set<string>();
  let mobileOpen = false;

  function toggle(id: string) {
    selected.has(id) ? selected.delete(id) : selected.add(id);
    selected = new Set(selected);
    dispatch('change', { selected: Array.from(selected) });
  }

  function clearAll(e?: Event) {
    e?.stopPropagation();
    selected = new Set();
    dispatch('change', { selected: [] });
    dispatch('clear');
  }
</script>

<!-- Mobile: collapsible -->
<div class="md:sticky md:top-20">
  <div class="md:hidden collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
    <input type="checkbox" bind:checked={mobileOpen} />
    <div class="collapse-title text-base-content/90 flex items-center gap-2">
      <svg class="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 6h18M3 12h18M3 18h18" stroke-width="2" />
      </svg>
      Filter
      <button class="btn btn-link btn-xs ml-auto" on:click|stopPropagation={clearAll}>
        Clear All
      </button>
    </div>

    <div class="collapse-content">
      {#each groups as g}
        <h4 class="mt-4 mb-2 font-semibold uppercase text-xs text-base-content/60">{g.title}</h4>

        {#if g.title === 'Salary'}
          <div class="grid grid-cols-3 gap-2 mb-4">
            <input class="input input-bordered input-sm" placeholder="Min" />
            <input class="input input-bordered input-sm" placeholder="Max" />
            <select class="select select-bordered select-sm">
              <option>Rate</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
        {:else}
          <div class="flex flex-col gap-2 mb-4 max-h-56 overflow-auto pr-1">
            {#each g.options as o}
              <label class="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  checked={selected.has(o.id)}
                  on:change={() => toggle(o.id)}
                />
                <span class="label-text">{o.label} {o.count ? `(${o.count})` : ''}</span>
              </label>
            {/each}
          </div>
        {/if}

        <div class="divider my-3"></div>
      {/each}
    </div>
  </div>

  <!-- Desktop: card -->
  <aside class="hidden md:block card bg-base-100 border border-base-300 rounded-2xl">
    <div class="card-body p-5">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-base">Filter</h3>
        <button class="btn btn-link btn-xs" on:click={clearAll}>
          <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18" stroke-width="2" />
          </svg>
          Clear All
        </button>
      </div>

      {#each groups as g, i}
        <div class={i ? 'mt-4 pt-4 border-t' : 'mt-2'}>
          <h4 class="mb-3 font-semibold uppercase text-xs text-base-content/60">{g.title}</h4>

          {#if g.title === 'Salary'}
            <div class="grid grid-cols-3 gap-2">
              <input class="input input-bordered input-sm" placeholder="Min" />
              <input class="input input-bordered input-sm" placeholder="Max" />
              <select class="select select-bordered select-sm">
                <option>Rate</option>
                <option>Month</option>
                <option>Year</option>
              </select>
            </div>
          {:else}
            <div class="flex flex-col gap-2 max-h-64 overflow-auto pr-1">
              {#each g.options as o}
                <label class="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm"
                    checked={selected.has(o.id)}
                    on:change={() => toggle(o.id)}
                  />
                  <span class="label-text">{o.label} {o.count ? `(${o.count})` : ''}</span>
                </label>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </aside>
</div>
