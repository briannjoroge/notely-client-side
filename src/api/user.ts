import axiosWithAuth from "./client";

export const fetchUserIdentities = async () => {
  const response = await axiosWithAuth.get("/user/identity");
  return response.data.users;
};

export const updateUserProfile = async (data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
}) => {
  const res = await axiosWithAuth.put("/user", data);
  return res.data.user;
};

export const checkCurrentPassword = async (
  currentPassword: string,
): Promise<boolean> => {
  const res = await axiosWithAuth.post("/user/password/check-match", {
    currentPassword,
  });
  return res.data.valid;
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axiosWithAuth.put("/user/password", data);
  return res.data.message;
};
