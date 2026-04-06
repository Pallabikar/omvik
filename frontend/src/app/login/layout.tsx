import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legacy Portal Login",
    description: "Authenticated access to the OMVIK heritage registry and client sanctuary.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
