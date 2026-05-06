import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//import LogoutButton from "@/components/LoginButton"
import MatchButton from "@/components/MatchButton";
import Settings from "@/components/Settings";
import Footer from "@/components/Footer";

export default async function Dashboard() {

const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
        <Settings />
        {/* <div className="justify-center"><LogoutButton /></div> */}
        <Footer />
    </div>
    
  );
}

