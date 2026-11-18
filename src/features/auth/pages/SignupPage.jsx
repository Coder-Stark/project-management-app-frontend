import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";
import SignupForm from "../components/SignupForm.jsx";

export default function SignupPage() {
  return (
    <AuthCard
      title="Create account"
      subtitle="Sign up to start managing your projects."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}