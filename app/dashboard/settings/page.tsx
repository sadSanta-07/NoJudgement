import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LoginButton"
import MatchButton from "@/components/MatchButton";;

export default async function Dashboard() {

const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.user?.name}</p>
       <LogoutButton />

       <MatchButton
  level="beginner"
  topic="general"
  userId={session.user?.email || "user1"}
/>

    </div>
  );
}