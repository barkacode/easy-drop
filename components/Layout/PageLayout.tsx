export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:px-20 ">
      <main className="flex flex-col w-full gap-8 ">
        {children}
      </main>
    </div>
  );
}