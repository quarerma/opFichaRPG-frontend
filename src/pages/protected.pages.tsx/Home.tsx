import { useEffect, useState } from "react";
import { User } from "../../types/user.entity";

import axios from "axios";
import { BASE_URL } from "../../env";

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
        console.log(user);
      } catch (e) {
        console.log("erro");
      }
    };
    findUser();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-4xl">{user?.username}</h1>
    </div>
  );
};

export default HomePage;
