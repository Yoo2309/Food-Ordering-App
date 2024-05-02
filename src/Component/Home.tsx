import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  refresh_login_Loi,
  fetch_UserData_Loi,
  initialUser,
  logout_Loi,
  handle_login_Loi,
} from "../redux/slices/authSliceLoi";
import {
  refresh_login_Bach,
  fetch_UserData_Bach,
  logout_Bach,
  handle_login_Bach,
} from "../redux/slices/authSliceBach";
import { useNavigate, useParams } from "react-router-dom";
import { APIName, CurrentUser, Token } from "../types/types";
import { toast } from "react-toastify";
import {
  fetch_UserData_Ha,
  logout_Ha,
  refresh_login_Ha,
  refresh_token_Ha,
} from "../redux/slices/authSliceHa";
import {
  fetchLogoutLoi,
  fetchUserDataBach,
  fetchUserDataHa,
  fetchUserDataLoi,
  refresh_token_Bach,
  refresh_token_Loi,
} from "../API/API";

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user: CurrentUser = useSelector((state: RootState) => {
    switch (id) {
      case APIName.Loi:
        return state.rootReducer.userLoi;
      case APIName.Bach:
        return state.rootReducer.userBach;
      case APIName.Ha:
        return state.rootReducer.userHa;
      default:
        return initialUser;
    }
  });
  const dispatch = useDispatch<AppDispatch>();

  const HandleLogout = async () => {
    localStorage.removeItem(`${id}_accessToken`);
    localStorage.removeItem(`${id}_refreshToken`);
    dispatch(logout_Bach());
    navigate("/");
  };

  //Loi's API
  const HandleLogoutLoi = async (access_token: string) => {
    const response = await fetchLogoutLoi(access_token);
    if (response) {
      HandleLogout();
    } else {
      toast.error("Đăng xuất thất bại");
    }
  };
  const HandleRefreshLoginLoi = async (token: Token) => {
    const resp = await fetchUserDataLoi(token.accessToken.replace(/"/g, ""));
    if (resp?.ok) {
      const data = await resp.json();
      dispatch(fetch_UserData_Loi(data));
    } else {
      if (resp?.status === 401) {
        const resp = await refresh_token_Loi(
          token.refreshToken.replace(/"/g, "")
        );
        if (resp) {
          if (resp.status === 200) {
            const data = await resp.json();
            dispatch(handle_login_Loi(data));
          }
        }
      }
    }
  };

  //Bach's API
  const HandlRefreshLoginBach = async (token: Token, id: string) => {
    const resp = await fetchUserDataBach(
      token.accessToken.replace(/"/g, ""),
      id
    );
    if (resp.status === "Active") {
      dispatch(fetch_UserData_Bach(resp));
    } else if (resp?.status === 401) {
      const resp = await refresh_token_Bach({
        accessToken: token.accessToken.replace(/"/g, ""),
        refreshToken: token.refreshToken.replace(/"/g, ""),
      });
      if (resp) {
        if (resp.status === 200) {
          const data = await resp.json();
          dispatch(handle_login_Bach(data));
        } else if (resp.status === 400) {
          toast.info("Phiên đăng nhập hết hạn");
          HandleLogout();
        }
      }
    }
  };

  //Ha's API
  const HandleRefreshLoginHa = async (token: Token) => {
    const resp = await fetchUserDataHa(token.accessToken.replace(/"/g, ""));
    if (resp.ok) {
      const data = await resp.json();
      dispatch(fetch_UserData_Ha(data.data));
    } else if (resp.status === 500) {
      dispatch(refresh_token_Ha(token.refreshToken.replace(/"/g, "")));
    }
  };

  useEffect(() => {
    if (!user.token.accessToken) {
      switch (id) {
        case APIName.Loi:
          let access_token_Loi = localStorage.getItem(`${id}_accessToken`);
          let refresh_token_Loi = localStorage.getItem(`${id}_refreshToken`);
          if (refresh_token_Loi && access_token_Loi) {
            dispatch(
              refresh_login_Loi({
                accessToken: access_token_Loi.replace(/"/g, ""),
                refreshToken: refresh_token_Loi.replace(/"/g, ""),
              })
            );
          } else {
            navigate(`/login/${id}`);
          }
          break;
        case APIName.Bach:
          let access_token_Bach = localStorage.getItem(`${id}_accessToken`);
          let refresh_token_Bach = localStorage.getItem(`${id}_refreshToken`);
          if (access_token_Bach && refresh_token_Bach) {
            dispatch(
              refresh_login_Bach({
                accessToken: access_token_Bach,
                refreshToken: refresh_token_Bach,
              })
            );
          } else {
            navigate(`/login/${id}`);
          }
          break;
        case APIName.Ha:
          let access_token_Ha = localStorage.getItem(`${id}_accessToken`);
          let refresh_token_Ha = localStorage.getItem(`${id}_refreshToken`);
          if (access_token_Ha && refresh_token_Ha) {
            dispatch(
              refresh_login_Ha({
                accessToken: access_token_Ha,
                refreshToken: refresh_token_Ha,
              })
            );
          } else {
            navigate(`/login/${id}`);
          }
          break;
      }
    }
  }, []);

  useEffect(() => {
    switch (id) {
      case APIName.Loi:
        if (user.token.accessToken && user.token.refreshToken) {
          HandleRefreshLoginLoi(user.token);
        }
        break;
      case APIName.Bach:
        if (user.token && user.userInfo.id) {
          HandlRefreshLoginBach(user.token, user.userInfo.id);
        }
        break;
      case APIName.Ha:
        if (user.token.accessToken) {
          HandleRefreshLoginHa(user.token);
        }
        break;
    }
  }, [user.token.accessToken, user.token.refreshToken, user.userInfo.id]);

  return (
    <div>
      <div className="flex justify-end p-8">
        <button
          className="w-fit py-4 px-8 text-xl font-semibold bg-primary-100 rounded-lg hover:bg-primary-900 hover:text-white"
          onClick={() => {
            switch (id) {
              case APIName.Loi:
                HandleLogoutLoi(user.token.accessToken);
                break;
              case APIName.Bach:
                HandleLogout();
                break;
              case APIName.Ha:
                HandleLogout();
                break;
            }
          }}
        >
          LogOut
        </button>
      </div>
      <div className="flex items-center justify-between flex-col ">
        <div className="bg-white px-10 pb-10 pt-2 rounded-md w-[500px] flex flex-col">
          <div className="text-3xl font-bold flex justify-center m-4">
            <h2>THÔNG TIN NGƯỜI DÙNG</h2>
          </div>
          <div className="mb-2">
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios/100/user-male-circle--v1.png"
                alt=""
                className="w-15 h-15"
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-3">
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                User ID
              </div>
              <div className="min-w-48 py-2">{user.userInfo.id}</div>
            </div>
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                FullName
              </div>
              <div className="min-w-48 py-2">{user.userInfo.fullname}</div>
            </div>
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                username
              </div>
              <div className="min-w-48 py-2">{user.userInfo.username}</div>
            </div>
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                email
              </div>
              <div className="min-w-48 py-2">{user.userInfo.email}</div>
            </div>
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                address
              </div>
              <div className="min-w-48 py-2">{user.userInfo.address}</div>
            </div>
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                gender
              </div>
              <div className="min-w-48 py-2">{user.userInfo.gender}</div>
            </div>
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                role
              </div>
              <div className="min-w-48 py-2">{user.userInfo.role}</div>
            </div>
            <div className="flex items-center justify-between text-center border-2 border-gray-100 rounded-[12px]">
              <div className="min-w-48 py-2 bg-gray-200 rounded-r-[12px]">
                DOB
              </div>
              <div className="min-w-48 py-2">{user.userInfo.DOB}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
