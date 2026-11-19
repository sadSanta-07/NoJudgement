import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Settings from "@/components/Settings";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="rounded-[22px] bg-[#fcfbf8] border border-[#e8e6e1] p-12 text-center font-mono text-sm text-[#6a625a]">
        Please log in to manage your account settings.
      </div>
    );
  }

  return <Settings />;
}
