type SectionProps = {
  id: string;
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
};

export function Section({
  id,
  children,
  wide = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-14 py-28 sm:py-32 ${className}`}
    >
      <div
        className={`mx-auto px-6 ${wide ? "max-w-5xl" : "max-w-3xl"}`}
      >
        {children}
      </div>
    </section>
  );
}
