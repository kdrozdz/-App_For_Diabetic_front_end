import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import help from "../forAll/help";
const { url } = help;

const cookies = new Cookies();

const Login = () => {
  const [isLoing, setIsLogin] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [is_staff, setIsStaff] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMsg("");
  }, [isLoing]);

  const logto = (e) => {
    if (isLoing) {
      setMsg("Ładuję dane !!");
      Axios.post(`${url}/auth/`, {
        username,
        password,
      })
        .then((res) =>
          cookies.set("token", res.data.token, cookies.set("id", res.data.id))
        )
        .then((res) => {
          window.location.href = "/app";
        })
        .catch((err) => setMsg("Nie poprawne hasło / login"));
    } else {
      if (password === password2) {
        Axios.post(`${url}/users/`, {
          username,
          password,
          is_staff,
        }).then((res) => {
          if (typeof res.data === "string") {
            setMsg(res.data);
          } else {
            setIsLogin(!isLoing);
          }
        });
      } else alert("Hasła się nie zgadzają");
    }
  };

  return (
    <div className="start">
      <div id="login">
        {msg && <p>{msg}</p>}
        {isLoing ? <h1>Login</h1> : <h1>Zarejestruj sie</h1>}
        <span>Login</span> <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <span>Hasło</span> <br />
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLoing && (
          <>
            <br />
            <span>Powtórz Hasło</span> <br />
            <input
              type="text"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <br />
            <span>Czy jesteś lekarzem ?</span>
            <input type="checkbox" onChange={(e) => setIsStaff(!is_staff)} />
          </>
        )}
        <br />
        <br />
        <button onClick={logto}>{isLoing ? "Zaloguj" : "Zarejestruj"}</button>
        <br />
        <button onClick={() => setIsLogin(!isLoing)}>
          {!isLoing ? "Zaloguj" : "Zarejestruj"}
        </button>
      </div>
      <div className="info">
        <h3>
          It can take a few seconds becouse i'm using the free heroku version
          <br />
        </h3>
        Login: lek1 password: lek1 - doctor
        <br />
        Login: pac1 password: pac1 - patient
        <br />
        Login: pac2 password: pac2 - patient
      </div>
    </div>
  );
};

export default Login;
