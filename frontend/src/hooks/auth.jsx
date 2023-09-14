import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import httpErrorHandler from "../helpers/http-error-handler";
import api from "../http/api";

const authContext = React.createContext();

const checkLocalStorageToken = () => {
  return localStorage.getItem("token") ? true : false;
}

export function useAuth() {
  const initialAuthed = checkLocalStorageToken()
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [authed, setAuthed] = useState(initialAuthed);
  const [isFetchingUser, setIsFetchingUser] = useState(false);

  useEffect(() => {
    const tokenFound = checkLocalStorageToken()
    setAuthed(tokenFound)
  }, [ checkLocalStorageToken() ]);

  return {
    authed,
    isLoadingLogin,
    isFetchingUser,
    fetch() {
      return new Promise(async (resolve, reject) => {
        setIsFetchingUser(true)
        await api.get("/user").then(({ data }) => {
          resolve(data.user)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Nos deparamos com um erro inesperado ao tentar buscar os dados do usuário. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsFetchingUser(false)
        })
      })
    },
    doLogin(email, password) {
      return new Promise(async (resolve, reject) => {
        setIsLoadingLogin(true)

        await api.post("/login", { email, password }).then(({ data }) => {
          localStorage.setItem("token", data.access_token)
          setAuthed(true)
          setIsLoadingLogin(false)
          resolve()
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível realizar o login. Tente novamente mais tarde.'))
        }).finally(() => {
          setIsLoadingLogin(false)
        })
      })
    },
    registrar(name, email, password) {
      return new Promise(async (resolve, reject) => {
        await api.post("/register", { name, email, password }).then(({ data }) => {
          localStorage.setItem("token", data.access_token)
          localStorage.setItem("isAdmin", data.isAdmin)
          localStorage.setItem("isProfessor", data.isProfessor)
          setAuthed(true)
          resolve(data)
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível realizar o cadastro. Tente novamente mais tarde.'))
        })
      })
    },
    logout() {
      return new Promise(async (resolve, reject) => {
        await api.post("/logout").then(() => {
          localStorage.removeItem("token")
          setAuthed(false)
          resolve()
        }).catch(error => {
          reject(httpErrorHandler(error, 'Não foi possível realizar o logout. Tente novamente mais tarde.'))
        })
      })
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
