<script>
    import TopNoticeBar from "$lib/Home/TopNoticeBar.svelte";
    import Navbar from "$lib/Home/Navbar.svelte";
    import Hero from "$lib/Home/Hero.svelte";
    import ConnectingSection from "$lib/Home/ConnectingSection.svelte";
    import HowWeHelp from "$lib/Home/HowWeHelp.svelte";
    import FeaturedCategories from "$lib/Home/FeaturedCategories.svelte";
    import LatestJobs from "$lib/Home/LatestJobs.svelte";
    import WhyChooseJbn from "$lib/Home/WhyChooseJBN.svelte";

    export let data;

  const { jobs, total, page, perPage } = data.latest;

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
<FeaturedCategories/>
<LatestJobs  
title="Latest jobs"
  subtitle="Fresh roles posted by employers hiring now"
  {jobs}
  {total}
  {page}
  {perPage}
  baseHref="/"/>


  <WhyChooseJbn />