import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "graphql/proyectos/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import { Enum_EstadoProyecto, Enum_FaseProyecto} from "utils/enum";

const IndexProyectos = () => {
  const { data, error, loading } = useQuery(GET_PROYECTOS);

  useEffect(() => {}, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando  los proyectos");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={["ADMINISTRADOR"]}>
      <div>
        Datos Proyectos:
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Presupuesto</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Fase</th>
              <th>Lider</th>
              <th>Objetivos</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Proyectos ? (
              <>
                {data.Proyectos.map((p) => {
                  return (
                    <tr key={p._id}>
                      <td>{p.nombre}</td>
                      <td>{p.presupuesto}</td>
                      <td>{p.fechaIncio}</td>
                      <td>{p.fechaFin}</td>
                      <td>{Enum_EstadoProyecto[p.estado]}</td>
                      <td>{Enum_FaseProyecto[p.fase]}</td>
                      <td>{p.lider}</td>
                      <td>{p.objetivo}</td>
                      
                      <td>
                        <Link to={`/proyectos/editar/${p._id}`}>
                          <i className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexProyectos;
