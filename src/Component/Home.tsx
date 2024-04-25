import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  refresh_login,
  fetchUserData,
  refreshToken,
} from "../redux/slices/authSlice";

const Home = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let access_token = Cookies.get("accessToken");
    let refresh_token = Cookies.get("refreshToken");
    if (refresh_token) {
      if (access_token) {
        dispatch(
          refresh_login({
            accessToken: access_token,
            refreshToken: refresh_token,
          })
        );
      } else {
        console.log("refresh");
        dispatch(refreshToken(refresh_token.replace(/"/g, "")));
      }
    }
  }, []);
  useEffect(() => {
    if (user.token.accessToken) {
      dispatch(fetchUserData(user.token.accessToken.replace(/"/g, "")));
    }
  }, [user.token]);
  return (
    <div className="flex items-center justify-between flex-col my-5 ">
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
  );
};

export default Home;
