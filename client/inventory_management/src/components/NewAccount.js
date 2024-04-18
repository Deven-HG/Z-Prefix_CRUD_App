import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loggedInContext } from "./Logged-In-Context";

export default function NewAccount() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setUser_id } = useContext(loggedInContext);


  const request_data = {
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: password,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/new-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_data)
    }).then((res) => {
      if (res.status === 409) {
        alert("Username is already in use, please try a different username");
      } else {
        window.confirm("Account has been created!");
        setLoggedIn(true)
        navigate("/MyInventory");
      }
    });
  };

  return (
    <div style={{paddingBottom: '50%'}}>
      <h1 style={{ paddingBottom: '30px' }}>Create A New Account</h1>

      <form

        onSubmit={(event) => handleSubmit(event)}
      >
        <label style={{ marginBottom: 25}}>

          <input
            type="text"
            placeholder="Enter First Name"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <br/>
        <label style={{ marginBottom: 25}}>

          <input
            type="text"
            placeholder="Enter Last Name"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <br/>
        <label style={{ marginBottom: 25}}>
          <input
            type="text"
            placeholder="Enter Username"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br/>
        <label style={{ marginBottom: 25}}>

          <input
            type="password"
            placeholder="Enter Password"
            style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
        <button className="btn btn-dark" type="submit">Submit</button>
      </form>
    </div>
  );
}