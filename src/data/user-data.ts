import axios from "axios";
import { BASE_URL } from "../env";
import { User } from "../types/user.entity";

export async function getUserData() {
  const token: string | null = localStorage.getItem("jwt");
  try {
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
