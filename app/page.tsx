import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-black">
      <h1>Landing Page</h1>
      <SignedIn>
        <Button>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <Button>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </SignedOut>
    </main>
  );
}
