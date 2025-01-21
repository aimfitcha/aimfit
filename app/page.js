import Image from "next/image";
import UserDashboard from "./component/UserDashboard";

export default function Home() {
  console.log(process.env.DATABASE_URL);
  
  return (
   <UserDashboard></UserDashboard>
  );
}
