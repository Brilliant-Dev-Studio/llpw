import { login } from "../actions";
import PasswordField from "./PasswordField";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="guilloche-bg flex flex-1 flex-col items-center justify-center px-6 py-20">
      <form
        action={login}
        className="relative w-full max-w-sm rounded-sm border border-hairline bg-paper/70 p-8 shadow-[0_20px_60px_-25px_rgba(26,26,26,0.3)]"
      >
        <span className="register-mark left-2 top-2" />
        <span className="register-mark right-2 top-2" />
        <span className="register-mark bottom-2 left-2" />
        <span className="register-mark bottom-2 right-2" />

        <p className="font-ledger text-xs uppercase tracking-widest text-ink-soft">
          LLPW Admin
        </p>
        <h1 className="mt-1 font-display text-2xl italic text-text-primary">
          Sign in to continue
        </h1>

        {error && (
          <p className="mt-4 rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            Incorrect password.
          </p>
        )}

        <PasswordField />

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-primary px-6 py-3 font-ledger text-sm uppercase tracking-widest text-primary-contrast shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] transition-colors hover:bg-primary-dark"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
