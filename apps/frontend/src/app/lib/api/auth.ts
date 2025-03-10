import httpClient from "../httpClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return httpClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return httpClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
