import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";
import LoginForm from "../components/LoginForm.jsx";

export default function LoginPage() {
  return (
    <AuthCard
      title="Log in"
      subtitle="Welcome back. Enter your details to continue."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}