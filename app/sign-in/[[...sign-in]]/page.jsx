import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <SignIn afterSignInUrl={process.env.NEXT_PUBLIC_MAIN_LOGIN_URL}/>;
}