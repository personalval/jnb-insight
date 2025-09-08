// Mock fetch. Swap for your real API.
export const load = async ({ url, fetch }) => {
  const page = Number(url.searchParams.get("page") ?? 1);
  const perPage = Number(url.searchParams.get("perPage") ?? 8);

  // TODO: replace with `await fetch('/api/jobs/latest?...')`
  const total = 23;
  const start = (page - 1) * perPage;
  const sample = Array.from({ length: Math.min(perPage, Math.max(0, total - start)) }, (_, i) => {
    const idx = start + i + 1;
    return {
      id: `job-${idx}`,
      title: idx % 3 === 0 ? "Frontend Intern (React)" : idx % 3 === 1 ? "Product Design Intern" : "Finance Graduate Trainee",
      company: ["Kuda", "Flutterwave", "Paystack", "Andela"][idx % 4],
      companyLogo: `/images/logos/logo-${(idx % 4) + 1}.svg`, // replace with real logos
      location: ["Lagos · Hybrid", "Abuja · Onsite", "Remote"][idx % 3],
      type: ["Internship", "Full-time"][idx % 2],
      level: ["Entry", "NYSC"][idx % 2],
      salary: idx % 2 ? "₦200k–₦300k" : undefined,
      tags: idx % 3 === 0 ? ["React", "TypeScript", "Tailwind"] :
            idx % 3 === 1 ? ["Figma", "UI", "Prototyping"] :
                            ["Excel", "SQL", "Power BI"],
      postedAt: new Date(Date.now() - (idx * 6 + 30) * 60 * 60 * 1000).toISOString(),
      href: `/jobs/job-${idx}`
    };
  });

  return {
    latest: {
      jobs: sample,
      total,
      page,
      perPage
    }
  };
};
