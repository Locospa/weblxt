import { redirect } from "next/navigation";
import { getAdminSession } from "../../lib/admin-auth";
import { loginAction } from "./actions";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;
  const errorMessage = params?.error ?? "";
  const successMessage = params?.success ?? "";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-10">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
            Acceso privado
          </p>
          <h1 className="mt-3 text-3xl font-black">Login administrador</h1>
          <p className="mt-2 text-white/75">
            Solo el administrador puede ingresar al módulo de gestión.
          </p>

          {successMessage && (
            <p className="mt-6 rounded-xl border border-emerald-200/30 bg-emerald-500/10 px-4 py-3 text-emerald-200">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="mt-6 rounded-xl border border-red-200/30 bg-red-500/10 px-4 py-3 text-red-200">
              {errorMessage}
            </p>
          )}

          <form action={loginAction} className="mt-6 grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-white/90">
                Usuario
              </label>
              <input
                name="username"
                type="text"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-white/90">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-2xl bg-gradient-to-r from-orange-400 via-yellow-400 to-cyan-400 px-6 py-3 text-sm font-black text-slate-950 shadow transition hover:scale-[1.01]"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}