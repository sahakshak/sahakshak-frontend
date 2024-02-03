export default function AuthenticationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen bg-slate-500">
      <div className="flex justify-center items-center h-full">{children}</div>
    </section>
  );
}
