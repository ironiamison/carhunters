const steps = [
  {
    num: "01",
    title: "Tier 1",
    body: "Four entry-level spots. Combined pool under 2 SOL. Complete all four to advance.",
  },
  {
    num: "02",
    title: "Unlock",
    body: "Each tier has four cars. Spot every car in a tier and the next group of four opens.",
  },
  {
    num: "03",
    title: "Collect",
    body: "Four tiers, escalating SOL rewards. Verified proof. Payout from escrow.",
  },
];

export function ProcessStrip() {
  return (
    <section className="border-y border-border-subtle bg-surface">
      <div className="container-main grid gap-12 py-16 sm:grid-cols-3 lg:gap-16 lg:py-20">
        {steps.map((step) => (
          <div key={step.num}>
            <span className="text-xs tabular-nums text-accent">{step.num}</span>
            <h3 className="mt-4 text-lg font-light text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
