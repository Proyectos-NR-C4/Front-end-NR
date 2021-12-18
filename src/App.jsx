import React, { useEffect, useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Index from "pages/Index";
import IndexUsuarios from "pages/usuarios";
import EditarUsuario from "pages/usuarios/editar";
import AuthLayouth from "layouts/AuthLayouth";
import Register from "pages/auth/register";
import Login from "pages/auth/login";
import jwt_decode from "jwt-decode";
import IndexAvance from "pages/avances";
import IndexProyectos from "pages/proyectos";
import IndexInscripciones from "pages/inscripciones/index";
import NuevoProyecto from "pages/proyectos/NuevoProyecto";
import { AuthContext } from "context/authContext";
import "styles/globals.css";
import "styles/tabla.css";

// import PrivateRoute from 'components/PrivateRoute';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  //uri: "https://servidor-back-qgl.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem("token"));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    console.log("set token", token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<Index />} />
                <Route path="/usuarios" element={<IndexUsuarios />} />
                <Route path="/usuarios/editar/:_id" element={<EditarUsuario />}/>
                <Route path="/proyectos" element={<IndexProyectos />} />
                <Route path="/proyectos/nuevo" element={<NuevoProyecto />} />
                <Route path="/avance" element={<IndexAvance />} />
                <Route path="/inscripcion" element={<IndexInscripciones />} />
              </Route>
              <Route path="/auth" element={<AuthLayouth />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
