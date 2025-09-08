<script lang="ts">
  export let title = "How we can help";
  export let blurb = "Making your job search easy";

  type Item = {
    title: string;
    desc: string;
    cta?: string;
    href?: string;
    icon?: "profile" | "search" | "handshake" | "rocket";
  };

  export let items: Item[] = [
    {
      title: "Create Your Profile",
      desc: "Simple steps to build a great profile that showcases your skills & goals.",
      cta: "Get started",
      href: "/signup",
      icon: "profile"
    },
    {
      title: "Discover Opportunities",
      desc: "Find internships, trainee roles and entry-level jobs across Nigeria & remote.",
      cta: "Get started",
      href: "/jobs",
      icon: "search"
    },
    {
      title: "Connect With Employers",
      desc: "Apply, connect, and interview with companies that are hiring for your skills.",
      cta: "Get started",
      href: "/employers",
      icon: "handshake"
    },
    {
      title: "Launch Your Career",
      desc: "Level up with resources, career tips, and a community to help you grow.",
      cta: "Get started",
      href: "/resources",
      icon: "rocket"
    }
  ];

  const Icon = {
    profile: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' class='h-5 w-5'><path d='M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z'/></svg>`,
    search: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' class='h-5 w-5'><path d='M10 4a6 6 0 1 1 0 12A6 6 0 0 1 10 4Zm7.71 12.29 3 3-1.42 1.42-3-3 1.42-1.42Z'/></svg>`,
    handshake: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' class='h-5 w-5'><path d='M8.59 13.41 7 12l5-5 1.59 1.59L10.17 12l2.82 2.83a2 2 0 1 1-2.83 2.83L7 14.5l1.59-1.09ZM2 7h4v10H2V7Zm16 0h4v10h-4V7Zm-1.5 1.5-4.79-3.2a2 2 0 0 0-2.57.42L6 9.5v5l3.33 2.36a2.5 2.5 0 0 0 3.14-.28l3.03-3.03L18.5 15V8.5Z'/></svg>`,
    rocket: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' class='h-5 w-5'><path d='M12 2c3.31 0 6 2.69 6 6v1l-6 6-1 5-3-3 5-1 6-6h1c0-3.31-2.69-6-6-6ZM5 22l2.5-2.5L5 17l-2.5 2.5L5 22Z'/></svg>`
  } as const;
</script>

<section class="bg-base-100">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
    <!-- Heading -->
    <div class="max-w-2xl">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-base-content">{title}</h2>
      <p class="mt-1 text-sm sm:text-base text-base-content/80">{blurb}</p>
    </div>

    <!-- Features -->
    <div class="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
      {#each items as it}
        <article class="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
          <div class="card-body p-5">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-primary/10 text-primary grid place-items-center">
                {@html Icon[it.icon ?? "search"]}
              </div>
              <h3 class="font-semibold text-base">{it.title}</h3>
            </div>

            <p class="mt-2 text-sm text-base-content/80">
              {it.desc}
            </p>

            <div class="card-actions mt-4">
              {#if it.cta && it.href}
                <a href={it.href} class="btn btn-primary btn-sm">{it.cta}</a>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
