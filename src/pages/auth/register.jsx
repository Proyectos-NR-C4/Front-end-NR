import { useMutation } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import DropDown from "components/Dropdown";
import Input from "components/Input";
import { REGISTRO } from "graphql/usuarios/auth/mutations";
import useFormData from "hooks/useFormData";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Enum_Rol } from "utils/enum";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [
    registro,
    { data: dataMutation, loading: loadingMutation, erro: errorMUtation },
  ] = useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    console.log('data mutation', dataMutation);
    if (dataMutation) {
      if (dataMutation.registro.token) {
        localStorage.setItem('token', dataMutation.registro.token);
        navigate('/');
      }
    }
  }, [dataMutation]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <h1 className="text-3xl font-bold my-4">Regístrate</h1>
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
          <Input label="Correo" name="correo" type="email" required />
          <Input label="Contraseña" name="password" type="password" required />
        </div>
        <ButtonLoading
          disable={Object.keys(formData).length === 0}
          loading={false}
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
