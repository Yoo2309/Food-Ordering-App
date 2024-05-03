import { Token } from "../types/types";

export const fetchLogout = async (
  access_token: string,
  url: string,
  method: string
) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Đăng xuất xảy ra lỗi!");
  }
};
export const fetchUserData = async (token: string, url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export const fetchForgotPwd = async (email: string, url: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    return response;
  } catch {}
};

//Loi's API
export const refresh_token_Loi = async (refresh_token: string) => {
  try {
    const response = await fetch(
      `https://back-end-zens-training.vercel.app/api/refresh-token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    return response;
  } catch {}
};
export const fetchChangePwd_Loi = async (body: {}) => {
  console.log("fetch");
  try {
    const response = await fetch(
      `https://back-end-zens-training.vercel.app/api/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch {}
};
//Bach's API
export const refresh_token_Bach = async (token: Token) => {
  try {
    const response = await fetch(
      `https://zens-restaurant.azurewebsites.net/api/v1/auth/regenerate-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        }),
      }
    );
    return response;
  } catch {}
};
export const fetchChangePwd_Bach = async (token: string, body: {}) => {
  try {
    const response = await fetch(
      `https://zens-restaurant.azurewebsites.net/api/v1/auth/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch {}
};
//Ha's API
export const fetchChangePwd_Ha = async (token: string, body: {}) => {
  try {
    const response = await fetch(
      `https://ha-food-api.zenslab.com/api/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    return response;
  } catch {}
};
