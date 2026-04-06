import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Story",
    description: "Discover the lineage and heritage of OMVIK—the custodians of legendary real estate in Odisha.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
