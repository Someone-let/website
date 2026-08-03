type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900">Contact</h1>
      <p className="mt-4 text-base text-gray-600">
        This is the contact page for the {locale.toUpperCase()} locale.
      </p>
    </main>
  );
}
