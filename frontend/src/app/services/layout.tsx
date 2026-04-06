import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Service Portfolio",
    description: "Explore the Omvik Collection—a curated portfolio of Odisha's most prestigious real estate offerings.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
