import { useForm } from "react-hook-form";
import { fetchChangePwd_Bach } from "../API/API";
import { CurrentUser, ChangePwdInfoBach, APIName } from "../types/types";
import md5 from "md5";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ChangePassword: React.FC<{
  user: CurrentUser;
  handllogout: () => Promise<void>;
}> = ({ user, handllogout }) => {
  const { id } = useParams();
  const {
    handleSubmit: SubmitChangePwd,
    register: changePwd_data,
    formState: { errors },
    getValues,
  } = useForm<ChangePwdInfoBach>();

  const submitChangePassword_Bach = async (changePwd_data: ChangePwdInfoBach) => {
    const response = await fetchChangePwd_Bach(user.token.accessToken, {
      oldPassword: md5(changePwd_data.oldPassword),
      newPassword: changePwd_data.newPassword,
      confirmPassword: changePwd_data.confirmPassword,
      email: user.userInfo.email,
    });
    if (response?.ok) {
      toast.success("Đổi mật khẩu thành công!");
      handllogout();
    } else {
      toast.info("Đổi mật khẩu thất bại!");
    }
  };

  const handleChangePassword = (changePwd_data: ChangePwdInfoBach) => {
    switch (id) {
      case APIName.Bach:
        submitChangePassword_Bach(changePwd_data);
        break;
    }
  };

  return (
    <form onSubmit={SubmitChangePwd(handleChangePassword)}>
      <div className="w-[540px] h-[344px] left-[56px] top-[340px] absolute flex-col justify-start items-start gap-7 inline-flex">
        <div className="w-[540px] h-24 flex flex-col gap-4">
          <div className="text-gray-900 text-base font-medium font-['Inter'] leading-snug tracking-tight">
            Current Password
          </div>
          <div className="w-[540px] h-[58px] bg-white rounded-xl border border-gray-100 flex items-center justify-evenly">
            <input
              placeholder="Current Password"
              className="w-[432px] h-[21px] border-transparent focus:outline-none focus:ring-0 text-gray-400 text-base font-medium font-['Inter'] leading-snug tracking-tight"
              {...changePwd_data("oldPassword", { required: true })}
            />
            <span className="text-red">
              {errors.oldPassword?.type === "required" && "*"}
            </span>
          </div>
        </div>
        <div className="w-[540px] h-24 flex flex-col gap-4">
          <div className="text-gray-900 text-base font-medium font-['Inter'] leading-snug tracking-tight">
            New Password
          </div>
          <div>
            <div className="w-[540px] h-[58px] bg-white rounded-xl border border-gray-100 flex items-center justify-evenly">
              <input
                placeholder="New Password"
                className="w-[432px] h-[21px] border-transparent focus:outline-none focus:ring-0 text-gray-400 text-base font-medium font-['Inter'] leading-snug tracking-tight"
                {...changePwd_data("newPassword", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              />
              <span className="text-red">
                {errors.newPassword?.type === "required" && "*"}
              </span>
            </div>
            {errors.newPassword?.type === "pattern" && (
              <div className="text-red text-[10px]">
                "Ít nhất 8 ký tự, một chữ hoa, một chữ thường, một chữ số, một
                ký tự đặc biệt"
              </div>
            )}
          </div>
        </div>
        <div className="w-[540px] h-24 flex flex-col gap-4">
          <div className="left-0 text-gray-900 text-base font-medium font-['Inter'] leading-snug tracking-tight">
            Confirm Password
          </div>
          <div>
            <div className="w-[540px] h-[58px] left-0  bg-white rounded-xl border border-gray-100 flex items-center justify-evenly">
              <input
                placeholder="Confirm Password"
                className="w-[432px] h-[21px] border-transparent focus:outline-none focus:ring-0 text-gray-400 text-base font-medium font-['Inter'] leading-snug tracking-tight"
                {...changePwd_data("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues("newPassword") || "Mật khẩu không khớp",
                })}
              ></input>
              <span className="text-red">
                {errors.confirmPassword?.type === "required" && "*"}
              </span>
            </div>
            {errors.confirmPassword?.type === "validate" && (
              <div className="text-red text-[10px]">"Mật khẩu không khớp"</div>
            )}
          </div>
        </div>
      </div>
      <button className="w-[540px] h-[58px] left-[56px] top-[764px] absolute">
        <div className="w-[540px] h-[58px] left-0 top-0 absolute bg-primary-500 rounded-xl" />
        <div className="left-[199px] top-[18px] absolute text-center text-white text-base font-medium font-['Inter'] leading-snug tracking-tight">
          Change Password
        </div>
      </button>
    </form>
  );
};

export default ChangePassword;
