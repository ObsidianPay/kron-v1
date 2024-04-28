import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:
      "Sign in | Kron",
    description: "Kron is a dashboard that helps you manage your business and keep track of your finances.",
  };

export default function Page() {
return (
    <div className="flex justify-center items-center h-screen">
        <SignIn path="/sign-in" />
    </div>
);
}