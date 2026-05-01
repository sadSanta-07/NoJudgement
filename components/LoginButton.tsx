"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  label?: string;
}

export default function LoginButton({ label = "Login" }: Props) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Image
          src={session.user?.image || ""}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full border-2 border-white shadow-sm"
        />

        <p className="text-sm font-medium text-gray-700 hidden sm:block">
          {session.user?.name?.split(" ")[0]}
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-blue-500 shadow-md hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-orange-400 to-blue-500 shadow-md hover:opacity-90 transition"
    >
      {label}
    </button>
  );
}