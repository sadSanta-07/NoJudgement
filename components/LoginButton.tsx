"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  label?: string;
  variant?: "primary" | "ghost";
}

export default function LoginButton({ label = "Login", variant = "primary" }: Props) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Image
          src={session.user?.image || ""}
          alt="User profile"
          width={34}
          height={34}
          className="rounded-full"
        />

        <p className="text-sm font-medium text-black/70 hidden sm:block">
          {session.user?.name?.split(" ")[0]}
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-3 py-1.5 rounded-full text-sm font-medium 
          text-black/70 hover:text-black transition"
        >
          Logout
        </button>
      </div>
    );
  }

  const base = "px-4 py-2 rounded-full text-sm font-medium transition";

  const styles =
    variant === "primary"
      ? "bg-black text-white hover:bg-black/90 shadow-md"
      : "text-black/70 hover:text-black";

  return (
    <button
      onClick={() => signIn("google")}
      className={`${base} ${styles}`}
    >
      {label}
    </button>
  );
}