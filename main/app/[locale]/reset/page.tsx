import Link from "next/link";

export default async function ResetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Password reset</h1>
        <p className="mt-3 text-sm text-slate-600">
          This flow is not wired yet, but you can return to the sign-in page.
        </p>
        <Link
          href={`/${locale}/sign-in`}
          className="mt-6 inline-flex text-sm font-medium text-slate-900 underline"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
