export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col w-full gap-8 p-4">{children}</div>;
}
