"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./ui/Button";

interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function LoginButton({
  label = "Log In",
  variant = "primary",
  size = "md",
}: Props) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-[5px] bg-[#f1efea] border border-[#e8e6e1]">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User avatar"}
              width={26}
              height={26}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-[26px] h-[26px] rounded-full bg-[#1d1c1a] text-[#fbfaf7] text-xs flex items-center justify-center font-bold">
              {session.user?.name?.charAt(0) || "U"}
            </div>
          )}
          <span className="text-sm font-medium text-[#1d1c1a] hidden sm:inline">
            {session.user?.name?.split(" ")[0]}
          </span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-3 py-1.5 text-xs font-mono font-medium rounded-[5px] bg-[#f1efea] hover:bg-[#e8e6e1] text-[#6a625a] hover:text-[#1d1c1a] border border-[#e8e6e1] transition-all cursor-pointer active:translate-y-[1px]"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => signIn("google")}
    >
      {label}
    </Button>
  );
}
