import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileSticky from "@/components/MobileSticky";
import FloatingCTA from "@/components/FloatingCTA";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileSticky />
            <FloatingCTA />
        </>
    );
}
