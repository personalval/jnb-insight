<script>
    import TopNoticeBar from "$lib/Home/TopNoticeBar.svelte";
    import Navbar from "$lib/Home/Navbar.svelte";
    import Hero from "$lib/Home/Hero.svelte";

</script>
<TopNoticeBar
  id="jbn-top-notice-v1"
  message="Subscribe for job alerts by email"
  href="/subscribe"
/>
<Navbar />
<Hero on:search={(e) => console.log("search:", e.detail)}/>