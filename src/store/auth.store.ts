export const saveUser = (user: any) => {
  localStorage.setItem("ews_user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("ews_user");

  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("ews_user");
};
