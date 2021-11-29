import { useMutation } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import DropDown from "components/Dropdown";
import Input from "components/Input";
import { REGISTRO } from "graphql/auth/mutations";
import useFormData from "hooks/useFormData";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Enum_Rol } from "utils/enum";
import { useNavigate } from "react-router";
import { useAuth } from "context/authContext";

const Register = () => {
  const {setToken} = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [
    registro,
    { data: mutationData, loading: mutationLoading, erro: mutationError },
  ] = useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (mutationData) {
      if (mutationData.registro.token) {
        setToken(mutationData.registro.token);
        navigate("/");
      }
    }
  }, [mutationData, setToken, navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="flex text-3xl font-bold my-4">Regístrate</h1>
      <form
        className="flex-col"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <div className="grid grid-cols-2 gap-5">
          <Input label="Nombre" name="nombre" type="text" required />
          <Input label="Apellido" name="apellido" type="text" required />
          <Input label="Documento" name="identificacion" type="text" required />
          <DropDown
            label="Rol deseado"
            name="rol"
            required={true}
            options={Enum_Rol}
          />
          <Input label="Correo" name="correo" type="email" required={true} />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            required={true}
          />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Registrarme"
        />
      </form>
      <span>¿Ya tienes una cuenta?</span>
      <Link to="/auth/login"></Link>
      <span className="text-blue-700">Inicia sesión</span>
    </div>
  );
};

export default Register;
