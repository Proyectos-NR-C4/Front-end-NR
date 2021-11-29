import { useMutation } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { useAuth } from "context/authContext";
import { LOGIN } from "graphql/auth/mutations";
import useFormData from "hooks/useFormData";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router"; // "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();
  const [login,{ data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    login({ variables: formData });
  };

  useEffect(() => {
    if (mutationData) {
      if (mutationData.login.token) {
        setToken(mutationData.login.token);
        navigate("/");
      }
    }
  }, [mutationData, setToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <h1 className="text-xl font-bold text-gray-700">Iniciar Sesión</h1>
      <form
        className="flex flex-col"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <Input name="correo" type="email" label="Correo" required={true} />
        <Input
          name="password"
          type="password"
          label="Contraseña"
          required={true}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Iniciar Sesión"
        />
      </form>
      <span>¿No tienes una cuenta?</span>
      <Link to="/auth/register">
        <span className="text-blue-700">Regístrate</span>
      </Link>
    </div>
  );
};

export default Login;
