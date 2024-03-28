import { useEffect, useState } from "react";
import { User } from "../../types/user.entity";

import axios from "axios";
import { BASE_URL } from "../../env";
import { Link } from "react-router-dom";
import LogOff from "./components/LogOff";

export const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const findUser = async () => {
      const token: string | null = localStorage.getItem("jwt");
      try {
        const response = await axios.get(`${BASE_URL}users/getByID`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (e) {
        console.log("erro");
      }
    };
    findUser();
  }, []);

  return (
    <div className="w-screen h-screen bg-red-950 text-white font-oswald flex flex-col">
      <div className="p-5 mt-10 mx-10 w-fit text-3xl bg-login-gray flex gap-x-5">
        <span>Bem vindo(a), {user?.username}</span>
        <LogOff />
      </div>
      <Link
        to="/mesas"
        className="bg-login-gray mt-10 mx-10 w-fit text-3xl p-2"
      >
        Mesas
      </Link>
      <Link
        to="/mestrando"
        className="bg-login-gray mt-10 mx-10 w-fit text-3xl p-2"
      >
        Mestrando
      </Link>
    </div>
  );
};

export default HomePage;
