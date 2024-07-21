import { LoginView } from "@/sections/auth/login/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login page",
};

const LoginPage = () => {
  return <LoginView />;
};

export default LoginPage;
