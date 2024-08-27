export default function Layout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="container py-6 lg:py-8">
      {children}
      {modal}
    </main>
  );
}
