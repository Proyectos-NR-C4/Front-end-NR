import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
  mutation EditarProyecto(
    $_id: String!
    $nombre: String!
    $presupuesto: long!
    $fechaInicio: Date!
    $fechaFin: Date!
    $estado: Enum_EstadoProyecto!
    $fase: Enum_FaseProyecto!
    $lider: String!
  ) {
    editarProyecto(
      _id: $_id
      presupuesto: $presupuesto
      fechaIncio: $fechaIncio
      fechaFin: $fechaFin
      estado: $estado
      fase: $fase
      lider: $lider
    ) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider
    }
  }
`;

export { EDITAR_PROYECTO };