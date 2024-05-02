import { Token } from "../types/types";

//Loi's API
export const fetchUserDataLoi = async (token: string) => {
  try {
    const response = await fetch(
      `https://back-end-zens-training.vercel.app/api/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Đăng xuất xảy ra lỗi!");
  }
};
export const fetchLogoutLoi = async (access_token: string) => {
  try {
    const response = await fetch(
      `https://back-end-zens-training.vercel.app/api/logout`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Đăng xuất xảy ra lỗi!");
  }
};
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

//Bach's API
export const fetchUserDataBach = async (token: string, id: string) => {
  try {
    const response = await fetch(
      `https://zens-restaurant.azurewebsites.net/api/v1/user/profile/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch {}
};
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

//Ha's API
export const fetchUserDataHa = async (token: string) => {
  const response = await fetch("https://ha-food-api.zenslab.com/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
