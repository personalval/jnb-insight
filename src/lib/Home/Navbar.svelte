<script lang="ts">
  import { page } from "$app/stores";
  import { derived } from "svelte/store";

  // site routes (edit labels/paths as needed)
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Categories", href: "/categories" },
    { label: "Jobs", href: "/jobs" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" }
  ];

  // right-side actions
  export let showLogin = true;
  export let showPostJob = true;

  const pathname = derived(page, ($p) => $p.url.pathname);

  const isActive = (path: string, current: string) =>
    current === path || (path !== "/" && current.startsWith(path));

  let open = false;
  function toggle() { open = !open; }
  function close() { open = false; }
</script>

<!-- Sticky, translucent on scroll; sits under the top notice bar -->
<header class="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-200">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="navbar min-h-14 px-0">
      <!-- Left: brand + burger -->
      <div class="navbar-start gap-2">
        <button
          class="btn btn-ghost btn-square lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          on:click={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
          </svg>
        </button>

        <a href="/" class="flex items-center gap-2">
          <!-- swap for your logo -->
          <div class="h-8 w-8 rounded bg-primary text-primary-content grid place-items-center font-bold">J</div>
          <span class="font-semibold tracking-tight">jbn</span>
        </a>
      </div>

      <!-- Center: desktop links -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          {#each links as l}
            <li>
              <a
                href={l.href}
                class="px-3 border-b-2 border-transparent hover:border-primary"
                data-sveltekit-preload-data
                class:!border-primary={ $page.url && isActive(l.href, $page.url.pathname) }
              >
                {l.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Right: actions -->
      <div class="navbar-end gap-2">
        <!-- search icon (mobile like the screenshot) -->
        <a href="/search" class="btn btn-ghost btn-square hidden sm:flex" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm7.707 12.293 3 3-1.414 1.414-3-3 1.414-1.414Z"/>
          </svg>
        </a>

        {#if showLogin}
          <a href="/login" class="btn btn-ghost btn-sm">Login</a>
        {/if}

        {#if showPostJob}
          <a href="/post-job" class="btn btn-primary btn-sm">Post a job</a>
        {/if}
      </div>
    </div>
  </nav>

  <!-- Mobile sheet -->
  <div class="lg:hidden">
    <div
      class="fixed inset-0 bg-black/30 transition-opacity duration-200"
      class:hidden={!open}
      on:click={close}
      aria-hidden="true" />
    <div
      class="fixed top-0 left-0 right-0 origin-top bg-base-100 shadow-lg border-b border-base-200
                 transition-transform duration-200"
      style="transform: translateY({open ? '0%' : '-100%'})"
      role="dialog" aria-modal="true" aria-label="Mobile menu"
    >
      <div class="px-4 sm:px-6 py-3 flex items-center justify-between">
        <span class="font-semibold">Menu</span>
        <button class="btn btn-ghost btn-square" aria-label="Close menu" on:click={close}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.17 7.1 4.3A1 1 0 0 0 5.7 5.7L10.6 10.6 5.7 15.5a1 1 0 1 0 1.4 1.4L12 12.83l4.9 4.87a1 1 0 0 0 1.4-1.42l-4.87-4.9 4.87-4.9Z"/>
          </svg>
        </button>
      </div>

      <div class="px-4 sm:px-6 pb-4">
        <ul class="menu menu-sm bg-base-100 rounded-box w-full">
          {#each links as l}
            <li>
              <a
                href={l.href}
                on:click={close}
                class="py-2"
                class:!active={$page.url && isActive(l.href, $page.url.pathname)}
              >
                {l.label}
              </a>
            </li>
          {/each}
          <li class="menu-title mt-2">Account</li>
          {#if showLogin}<li><a href="/login" on:click={close}>Login</a></li>{/if}
          {#if showPostJob}
            <li class="mt-2">
              <a href="/post-job" class="btn btn-primary btn-sm w-full" on:click={close}>Post a job</a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </div>
</header>

<style>
  /* active state underline with spacing like the desktop mock */
  a[class*="!border-primary"] { border-bottom-width: 2px; }
  .menu :global(li > a[class~="!active"]) { color: hsl(var(--p)); font-weight: 600; }
</style>
