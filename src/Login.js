import React, { useState } from "react";
import axios from "axios";

export default function Login() {
    const [termekek, setTermekek] = useState([]);

    return (
        <form onSubmit={async (e) => {
          e.preventDefault();
          const token = await axios({
            method: 'POST',
            url: 'https://jwt.sulla.hu/login',
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              username: document.getElementById("username").value,
              password: document.getElementById("password").value
            }
          })
            .then((res) => {
              return res.data.token;
            })
            .catch((error) => {
              console.log(error)
            })
    
          await axios({
            headers: {
              "Authorization": `Bearer ${token}`,
            },
            method: 'GET',
            url: 'https://jwt.sulla.hu/termekek',
          })
            .then((res) => {
              setTermekek(res.data);
            })
            .catch((error) => {
              console.log(error)
            })
        }}>
          <div className='container' style={{ textAlign: 'center' }}>
            <h1>JWT Login</h1>
            <br />
            <label>Username: <input id="username" type="text" className='form-control' placeholder='Username' /></label>
            <br />
            <br />
            <label>Password: <input id="password" type="password" className='form-control' placeholder='Password' /></label>
            <br />
            <br />
            <input type="submit" value="Login" className='btn btn-primary' />
          </div>
          <br />
          {
            termekek.map((item) => {
              return (
                <div className="container" style={{ textAlign: 'center' }}>
                <h1>Termékek</h1>
                <div key={item.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{item.id}</h5>
                            <h5 className="card-title">{item.name}</h5>
                            <h5 className="card-title">{item.price}</h5>
                        </div>
                </div>
            </div>
              )
            })
          }
        </form>
      );
}