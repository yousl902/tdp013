import React, { useState } from "react";
import Form from "../components/Form";
import { login } from "../services/api";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(password, username);

    if (!res.ok) {
      setIsWrongPassword(true);
      setUsername("");
      setPassword("");
      e.target.reset();
    } else {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/";
      // console.log(data.token);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-800 opacity-50 flex items-center md:flex md:md:justify-center md:items-center">
      <div className="bg-sky-50 min-h-96 w-screen h-2/4 md:w-96 md:rounded-md">
        <div className="p-5 md:p-10 flex flex-col h-full">
          <h1 className="">Sign in</h1>
          <Form
            handleSubmit={handleSubmit}
            setUsername={setUsername}
            setPassword={setPassword}
            isLoginForm={true}
            isWrongPassword={isWrongPassword}
            password={password}
            username={username}
          />
          <a href="/signup" className="text-center mt-2 hover:text-sky-900">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
