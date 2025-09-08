<script lang="ts">
   type Category = {
    name: string;
    slug: string;        // for href: /categories/[slug]
    jobs?: number;       // optional count
    icon?: string;       // emoji or icon text (e.g. "💻" or "🎨")
    image?: string;      // optional small png/svg instead of emoji
    accent?: "primary" | "secondary" | "accent" | "warning" | "info" | "success";
  };

  export let title = "Featured Categories";
  export let blurb = "Browse popular areas employers are actively hiring for";
  export let viewAllHref = "/categories";

  // sample data (replace at callsite)
  export let categories: Category[] = [
    { name: "Software & IT", slug: "software-it", jobs: 128, icon: "💻", accent: "primary" },
    { name: "Design & Creative", slug: "design-creative", jobs: 76, icon: "🎨", accent: "accent" },
    { name: "Marketing", slug: "marketing", jobs: 64, icon: "📣", accent: "warning" },
    { name: "Finance & Accounting", slug: "finance", jobs: 40, icon: "💼", accent: "info" },
    { name: "Operations", slug: "operations", jobs: 33, icon: "⚙️", accent: "secondary" },
    { name: "Customer Support", slug: "support", jobs: 51, icon: "👋", accent: "success" },
    { name: "HR & People", slug: "hr", jobs: 22, icon: "🧑🏽‍🤝‍🧑🏻" },
    { name: "Content & Copy", slug: "content", jobs: 28, icon: "✍️" }
  ];

  const ringMap: Record<NonNullable<Category["accent"]>, string> = {
    primary: "ring-primary/20 bg-primary/10 text-primary",
    secondary: "ring-secondary/20 bg-secondary/10 text-secondary",
    accent: "ring-accent/20 bg-accent/10 text-accent",
    warning: "ring-warning/20 bg-warning/10 text-warning",
    info: "ring-info/20 bg-info/10 text-info",
    success: "ring-success/20 bg-success/10 text-success"
  };
</script>

<section class="bg-base-100">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
    <!-- Header -->
    <div class="flex items-end justify-between gap-4">
      <div class="max-w-2xl">
        <h2 class="text-2xl sm:text-3xl font-extrabold">{title}</h2>
        <p class="mt-1 text-sm sm:text-base text-base-content/80">{blurb}</p>
      </div>
      <a href={viewAllHref} class="btn btn-ghost btn-sm hidden sm:inline-flex">View all</a>
    </div>

    <!-- Grid -->
    <div class="mt-6 grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {#each categories as c}
        <a
          href={`/categories/${c.slug}`}
          class="group card border border-base-200 bg-base-100 hover:shadow-md transition-shadow"
          data-sveltekit-preload-data
        >
          <div class="card-body p-4 sm:p-5">
            <div class="flex items-center gap-3">
              <!-- Icon circle -->
              <div
                class={`h-10 w-10 rounded-full grid place-items-center ring-1 ${!c.accent ? 'bg-base-200 text-base-content/80' : ringMap[c.accent]}`}
              >
                {#if c.image}
                  <img src={c.image} alt={`${c.name} icon`} class="h-6 w-6 object-contain" />
                {:else}
                  <span class="text-lg leading-none">{c.icon ?? "🧩"}</span>
                {/if}
              </div>

              <div class="min-w-0">
                <h3 class="font-semibold truncate group-hover:text-primary">
                  {c.name}
                </h3>
                {#if c.jobs !== undefined}
                  <p class="text-xs text-base-content/70">{c.jobs} jobs</p>
                {/if}
              </div>
            </div>

            <!-- tiny chips / tags area (optional) -->
            <!-- <div class="mt-3 flex flex-wrap gap-1.5 text-[11px] opacity-80">
              <span class="badge badge-ghost">Intern</span>
              <span class="badge badge-ghost">NYSC</span>
              <span class="badge badge-ghost">Remote</span>
            </div> -->
          </div>
        </a>
      {/each}
    </div>

    <!-- Mobile 'View all' -->
    <div class="mt-5 sm:hidden">
      <a href={viewAllHref} class="btn btn-ghost btn-sm w-full">View all categories</a>
    </div>
  </div>
</section>
