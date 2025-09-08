<script lang="ts">
  import { onMount } from "svelte";

  // Customize these per page/brand
  export let id = "jbn-top-notice-v1"; // change to invalidate old dismissals
  export let message = "Subscribe for job alerts by email";
  export let href = "/subscribe";
  export let ctaLabel = "Subscribe"; // not shown if empty

  // Right-side quick links (phone, email, etc.)
  export let links: Array<{ label: string; href: string; icon?: "phone" | "mail" | "help" }> = [
    { label: "+234 700 000 0000", href: "tel:+2347000000000", icon: "phone" },
    { label: "help@jbn.ng", href: "mailto:help@jbn.ng", icon: "mail" }
  ];

  let open = true;
  const storageKey = `notice:${id}`;

  onMount(() => {
    try {
      open = localStorage.getItem(storageKey) !== "closed";
    } catch { /* SSR-safe */ }
  });

  function dismiss() {
    open = false;
    try { localStorage.setItem(storageKey, "closed"); } catch {}
  }

  const Icon = {
    mail: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.3-.5 7.6 5.1L19.5 6H4.3Zm15.2 2.1-7.4 5a1 1 0 0 1-1.1 0L3.6 8.1V17.5c0 .28.22.5.5.5h15c.28 0 .5-.22.5-.5V8.1Z"/></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.27.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"/></svg>`,
    help: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm0 15.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 6a3.75 3.75 0 0 1 3.75 3.75c0 1.57-.9 2.43-2.02 3.28-.92.69-1.48 1.17-1.48 1.97v.25a1 1 0 1 1-2 0v-.25c0-1.76 1.29-2.75 2.24-3.45.88-.66 1.26-1.02 1.26-1.8A1.75 1.75 0 0 0 12 7.5a1.75 1.75 0 0 0-1.75 1.75 1 1 0 0 1-2 0A3.75 3.75 0 0 1 12 6Z"/></svg>`
  } as const;
</script>

{#if open}
  <div
    class="w-full bg-primary text-primary-content"
    role="region"
    aria-label="Site notification"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-center justify-between gap-3 py-1.5">
        <!-- Left: message / CTA -->
        <a href={href} class="flex items-center gap-2 hover:opacity-90">
          {@html Icon.mail}
          <span class="text-xs sm:text-sm underline underline-offset-2">
            {message}
          </span>
        </a>

        <!-- Right: quick links + dismiss -->
        <div class="flex items-center gap-3">
          <ul class="hidden md:flex items-center gap-4 text-xs">
            {#each links as l}
              <li class="flex items-center gap-1">
                {@html Icon[l.icon ?? "mail"]}
                <a class="link link-hover" href={l.href}>{l.label}</a>
              </li>
            {/each}
          </ul>

          <button
            type="button"
            class="btn btn-ghost btn-xs text-primary-content/80 hover:text-primary-content"
            aria-label="Dismiss notification"
            on:click={dismiss}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.17 7.1 4.3A1 1 0 0 0 5.7 5.7L10.6 10.6 5.7 15.5a1 1 0 1 0 1.4 1.4L12 12.83l4.9 4.87a1 1 0 0 0 1.4-1.42l-4.87-4.9 4.87-4.9Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
