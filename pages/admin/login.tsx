import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const SignIn = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="w-full m-10 flex h-full justify-center items-center">
      <div className="flex bg-slate-100  p-8 flex-col max-w-md rounded-md w-full shadow-sm ">
        <h1 className="flex font-bold text-lg my-3 justify-center items-center">
          Admin Dashboard
        </h1>
        <input
          placeholder="username"
          className="w-full my-2 p-1 flex h-9 rounded-sm outline-none border border-gray-500 focus:outline-teal-500 text-gray-600"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="w-full mt-3 mb-2  p-1 flex h-9 rounded-sm outline-none border border-gray-500 focus:outline-teal-500 text-gray-600"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={SignIn}
          className=" text-right flex justify-center items-center mt-4 rounded-md w-20 py-2 px-3 bg-teal-700 text-white text-sm font-semibold"
        >
          Sign In
        </button>
        {error && (
          <span className="text-red-600 text-sm font-normal pt-3 text-left">
            Wrong Credentials!
          </span>
        )}
      </div>
    </div>
  );
};

export default login;
