import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations"; 
import DropDown from "components/Dropdown";
import { Enum_EstadoProyecto } from "utils/enum";
import { Enum_FaseProyecto } from "utils/enum";

const EditarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  const [
    editarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarProyecto({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success("Proyecto modificado correctamente");
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error("Error modificando el proyecto");
    }

    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className="flew flex-col w-full h-full items-center justify-center p-10">
      <Link to="/proyectos">
        <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
        Editar Proyecto
      </h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col items-center justify-center"
      >
        <Input
          label="Nombre del proyecto:"
          type="text"
          name="nombre"
          defaultValue={queryData.Proyecto.nombre}
          required={true}
        />
        <Input
          label="Presupuesto del proyecto:"
          type="numb"
          name="presupuesto"
          defaultValue={queryData.Proyecto.presupuesto}
          required={true}
        />
        <Input
          label="Fecha Inicio:"
          type="date"
          name="fechaInicio"
          defaultValue={queryData.Proyecto.fechaInicio}
          required={true}
        />
        <Input
          label="Fecha Fin:"
          type="date"
          name="fechaFin"
          defaultValue={queryData.Proyecto.fechaFin}
          required={true}
        />
        <DropDown
          label="Estado del Proyecto:"
          name="estado"
          defaultValue={queryData.Proyecto.estado}
          required={true}
          options={Enum_EstadoProyecto}
        />
        <DropDown
          label="Fase del Proyecto:"
          name="fase"
          defaultValue={queryData.Proyecto.fase}
          required={true}
          options={Enum_FaseProyecto}
        />
        <DropDown
          label="Lidere del Proyecto:"
          name="lider"
          defaultValue={queryData.Proyecto.lider}
          required={true}
          options={''}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Confirmar"
        />
      </form>
    </div>
  );
};

export default EditarProyecto;
