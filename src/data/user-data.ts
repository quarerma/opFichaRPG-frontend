import axios from "axios";
import { BASE_URL } from "../env";
import { User } from "../types/user.entity";
import { QueryClient } from "@tanstack/react-query";

const token: string | null = localStorage.getItem("jwt");

export async function getUserData(queryClient: QueryClient) {
  const cachedData = queryClient.getQueryData<User>(["user"]);

  if (cachedData) {
    return cachedData;
  }

  try {
    console.log("fez fetch");
    const response = await axios.get(`${BASE_URL}users/getByID`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as User;
  } catch (e) {
    console.log("erro");
  }
}
