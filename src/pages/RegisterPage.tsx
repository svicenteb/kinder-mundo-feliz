
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-kindergarten-background py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-kindergarten-primary">KinderCRM</h1>
          </Link>
          <h2 className="mt-6 text-xl font-bold text-gray-900">
            Crear una nueva cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿Ya tiene una cuenta?{" "}
            <Link
              to="/login"
              className="text-kindergarten-primary hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
