type ModuleHeroProps = {
  title: string;
  description: string;
};

export default function ModuleHero({ title, description }: ModuleHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/70 via-emerald-100/50 to-orange-100/70" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -bottom-12 left-0 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="relative px-8 py-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          Módulo
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}