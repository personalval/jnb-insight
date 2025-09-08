<script>
    import TopNoticeBar from "$lib/Home/TopNoticeBar.svelte";
    import Navbar from "$lib/Home/Navbar.svelte";
    import Hero from "$lib/Home/Hero.svelte";
    import ConnectingSection from "$lib/Home/ConnectingSection.svelte";
    import HowWeHelp from "$lib/Home/HowWeHelp.svelte";

</script>
<TopNoticeBar
  id="jnb-top-notice-v1"
  message="Subscribe for job alerts by email"
  href="/subscribe"
/>
<Navbar />
<Hero on:search={(e) => console.log("search:", e.detail)}/>

<ConnectingSection />
<HowWeHelp />