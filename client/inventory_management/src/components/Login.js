import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { loggedInContext } from "./Logged-In-Context";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, setLoggedIn, setUser_id } = useContext(loggedInContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status === 200) {
        let jsonres = await res.json();
        setUser_id(jsonres[0].user_id);
        setLoggedIn(true);
        navigate("/MyInventory");
      } else {
        alert("Username/Password not found!");
      }
    });
  };

  const handleNewAccount = () => {
    navigate("/new-account");
  };


  return (
    <div style={{ marginTop: "5%", paddingBottom: "40%" }}>
      <h2>Log In</h2>
      <br />

      <form>
        <label style={{ marginBottom: 15 }}>
          <input
            required
            type="text"
            name="username"
            placeholder="Enter Username"
            style={{ padding: 15, borderRadius: 5, textAlign: "center" }}
            onInput={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            style={{ padding: 15, borderRadius: 5, textAlign: "center" }}
            onInput={(e) => setPassword(e.target.value)}
          />
        </label>
        <br></br>
        <br></br>
        <input
          type="submit"
          className="btn btn-dark "
          value="Submit"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
      <br></br>
      <button
        type="button"
        className="btn btn-dark "
        onClick={() => handleNewAccount()}
      >
        Create New Account
      </button>
    </div>
  );
}