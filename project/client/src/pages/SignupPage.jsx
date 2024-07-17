import React, { useState } from "react";
import Form from "../components/Form";
import { login, signup } from "../services/api";

const SignupPage = () => {
  // console.log("rendering auth");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupRes = await signup(username, password);

    if (signupRes.ok) {
      const signinRes = await login(username, password);
      if (signinRes.ok) {
        const data = await signinRes.json();
        localStorage.setItem("token", data.token);
        window.location.href = "/";
        // console.log(data.token);
      }
    } else {
      console.log("error signing up");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-800 opacity-50 flex items-center md:flex md:md:justify-center md:items-center">
      <div className="bg-sky-50 min-h-96 w-screen h-2/4 md:w-96 md:rounded-md">
        <div className="p-5 md:p-10 flex flex-col h-full">
          <h1 className="">Sign up</h1>
          <Form
            handleSubmit={handleSubmit}
            setUsername={setUsername}
            setPassword={setPassword}
            isLoginForm={false}
            isWrongPassword={false}
            password={password}
            username={username}
          />
          <a href="/" className="text-center mt-2 hover:text-sky-900">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
