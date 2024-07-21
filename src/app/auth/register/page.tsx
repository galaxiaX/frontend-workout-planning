import { RegisterView } from "@/sections/auth/register/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register page",
};

const LoginPage = () => {
  return <RegisterView />;
};

export default LoginPage;
