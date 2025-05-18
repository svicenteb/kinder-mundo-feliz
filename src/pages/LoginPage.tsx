
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-kindergarten-background py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-kindergarten-primary">KinderCRM</h1>
          </Link>
          <h2 className="mt-6 text-xl font-bold text-gray-900">
            Iniciar sesión en su cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿No tiene cuenta?{" "}
            <Link
              to="/register"
              className="text-kindergarten-primary hover:underline"
            >
              Regístrese
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
