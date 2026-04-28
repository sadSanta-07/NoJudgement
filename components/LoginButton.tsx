"use client";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Image
          src={session.user?.image || ""}
          alt="User profile"
          width={64}
          height={64}
          className="rounded-full"
        />
        <p className="text-lg font-semibold">
          Welcome {session.user?.name}
        </p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
      Login with Google
    </button>
  );
}