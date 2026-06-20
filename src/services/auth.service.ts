const dummyUsers = [
  {
    id: 1,
    name: "Admin Kabupaten",
    email: "admin@sleman.go.id",
    password: "admin123",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Operator Kelurahan",
    email: "operator@sleman.go.id",
    password: "operator123",
    role: "OPERATOR",
  },
];

export const loginService = async (email: string, password: string) => {
  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    throw new Error("Email atau password salah");
  }

  return user;
};
