import Footer from "@/components/shared/View/Footer";

export default function StyledLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="!pt-[8rem] max-sm:!pt-[5rem] wrapper">
      {children}
      <Footer />
    </section>
  );
}
