import * as Styles from "./styles";
import logoImg from "../../assets/images/logo.png"
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const appName = import.meta.env.VITE_APP_NAME || "Admin";

export const Login = () => {
  const [email, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { doLogin, isLoadingLogin } = useAuth();
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }
    doLogin(email, password).then(() => {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    }).catch((error) => {
      toast.error(error.message);
    });
  };

  return (
    <Styles.Container>
      <Styles.Content>
        <img
          src={logoImg}
          alt={appName}
          className={isLoadingLogin ? "loading" : ""}
        />
        <Styles.Form onSubmit={(event) => handleLogin(event)}>
          <Styles.FormGroup>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              disabled={isLoadingLogin}
              onChange={(event) => setLogin(event.target.value)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleLogin(event);
                }
              }}
            />
          </Styles.FormGroup>
          <Styles.FormGroup>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              disabled={isLoadingLogin}
              onChange={(event) => setPassword(event.target.value)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleLogin(event);
                }
              }}
            />
          </Styles.FormGroup>
          <Styles.FormGroup>
            <button
              type="submit"
              disabled={isLoadingLogin}
            >
              {isLoadingLogin ? "AGUARDE..." : "LOGIN"}
            </button>
          </Styles.FormGroup>
        </Styles.Form>
      </Styles.Content>
    </Styles.Container>
  );
};
