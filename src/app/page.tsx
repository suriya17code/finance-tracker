//  this file is to render the  default page or 
//  inital page after login page

import { redirect } from "next/navigation";
 
export default function Home() {
  redirect("/login")
}
