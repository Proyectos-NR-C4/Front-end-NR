import { gql } from "@apollo/client";

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      identificacion
      nombre
      apellido
      correo
      estado
      rol
    }
  }
`;

const GET_USUARIO = gql `
    query Usuario($_id: String!) {
  Usuario(_id: $_id) {
    _id
      identificacion
      nombre
      apellido
      correo
      estado
      rol
  }
}
`
export { GET_USUARIOS, GET_USUARIO };
