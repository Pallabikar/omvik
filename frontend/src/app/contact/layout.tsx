import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Infrastructure",
    description: "Connect with the OMVIK sanctuary for premium real estate inquiries and heritage investments.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
