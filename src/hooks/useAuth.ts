import { getUser } from "../store/auth.store";

export const useAuth = () => {
  const user = getUser();

  return {
    user,
    isAuthenticated: !!user,
  };
};
