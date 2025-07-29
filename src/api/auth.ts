import axios from "axios";

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      "https://notely-server-2.onrender.com/api/auth/register",
      userData,
    );
    return res.data;
  } catch {
    throw new Error("Registration failed");
  }
};

export const loginUser = async (credentials: {
  loginCredentials: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      "https://notely-server-2.onrender.com/api/auth/login",
      credentials,
    );
    return res.data;
  } catch {
    throw new Error("Login failed");
  }
};
