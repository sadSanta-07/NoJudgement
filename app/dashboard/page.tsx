import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.user?.name}</p>
    </div>
  );
}