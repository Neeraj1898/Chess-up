import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            history("/", { state: { id: email } });
          } else if (res.data == "notexist") {
            alert("User not found");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Login flex flex-col justify-center items-center h-screen">
      <div className="container w-96 h-3/5 bg-black bg-opacity-50  rounded-md text-white flex flex-col justify-center items-center p-5">
        <h1 className="text-4xl font-bold mb-9">Log In</h1>
        <form
          className="flex flex-col text-black justify-center items-center"
          action="POST"
        >
          <div className="form-control mt-5 p-2 w-full">
            <input
              type="email"
              className="w-full rounded-3xl p-2"
              id="email"
              name="email"
              placeholder="Username"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-control mt-5 p-2 w-full">
            <input
              type="password"
              className="w-full rounded-3xl p-2"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            onClick={submit}
            className="btn w-1/3 m-7 p-2 bg-blue-300 rounded-xl"
          >
            Submit
          </button>
          <p className="text-white mt-3">
            Don't have an account?
            <Link to="/signup" className="text-blue-300">
              &nbsp;Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;