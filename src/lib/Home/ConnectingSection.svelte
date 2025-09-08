<script lang="ts">
  export let title = "Connecting Talent and Employers";
  export let blurb =
    "Whether you’re looking to hire or get hired, JBN bridges the gap by connecting employers with talented students, graduates, and young professionals ready to grow.";

  // You can replace these illustration paths with your own SVG/PNG
  export let employerIllustration = "/images/illus/employee.svg";
  export let candidateIllustration = "/images/illus/candidate.svg";
</script>

<section class="bg-base-100">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
    <!-- Heading -->
    <div class="max-w-3xl">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-base-content">
        {title}
      </h2>
      <p class="mt-2 text-sm sm:text-base/7 text-base-content/80">
        {blurb}
      </p>
    </div>

    <!-- Cards -->
    <div class="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
      <!-- For Employers -->
      <article class="card bg-primary text-primary-content shadow-lg overflow-hidden">
        <div class="card-body p-5 sm:p-6">
          <div class="flex items-center gap-3">
            <div class="h-14 w-14 rounded-full bg-base-100/20 grid place-items-center overflow-hidden">
              <img src={employerIllustration} alt="Employer illustration" class="h-12 w-12 object-contain" />
            </div>
            <h3 class="card-title text-lg sm:text-xl">For Employers</h3>
          </div>

          <p class="mt-2 text-primary-content/90 text-sm">
            Post jobs, manage applicants, and grow your early-career pipeline with smart tools.
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="badge badge-outline border-primary-content/30 text-primary-content">Internships</span>
            <span class="badge badge-outline border-primary-content/30 text-primary-content">Graduate roles</span>
            <span class="badge badge-outline border-primary-content/30 text-primary-content">Entry level</span>
          </div>

          <div class="card-actions mt-5">
            <a href="/employers/post" class="btn btn-secondary">Post jobs free</a>
            <a href="/employers" class="btn btn-ghost text-primary-content">Learn more</a>
          </div>
        </div>
      </article>

      <!-- For Candidates -->
      <article class="card bg-primary text-primary-content shadow-lg overflow-hidden">
        <div class="card-body p-5 sm:p-6">
          <div class="flex items-center gap-3">
            <div class="h-14 w-14 rounded-full bg-base-100/20 grid place-items-center overflow-hidden">
              <img src={candidateIllustration} alt="Candidate illustration" class="h-12 w-12 object-contain" />
            </div>
            <h3 class="card-title text-lg sm:text-xl">For Candidates</h3>
          </div>

          <p class="mt-2 text-primary-content/90 text-sm">
            Create a strong profile, upload your CV, and get discovered by employers.
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span class="badge badge-outline border-primary-content/30 text-primary-content">Career tips</span>
            <span class="badge badge-outline border-primary-content/30 text-primary-content">NYSC</span>
            <span class="badge badge-outline border-primary-content/30 text-primary-content">Entry level</span>
          </div>

          <div class="card-actions mt-5">
            <a href="/candidates/upload-cv" class="btn btn-accent">Upload your CV free</a>
            <a href="/candidates" class="btn btn-ghost text-primary-content">Learn more</a>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
