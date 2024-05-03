import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./Pages/Index";
import AuthComponent from "./Pages/AuthPage";
import LoginForm from "./Component/LoginForm";
import SignUpForm from "./Component/SignUpForm";
import ForgotPassword from "./Component/ForgotPassword";
import ChangePasswordLoi from "./Component/ChangePasswordLoi";
import ChangePasswordHa from "./Component/ChangePasswordHa";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position={"bottom-right"}
        autoClose={5000}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <Routes>
        <Route path="/" Component={Index}></Route>
        <Route path="/:id" Component={Index}></Route>
        <Route path="/auth" Component={AuthComponent}>
          <Route path="/auth/login/:id" Component={LoginForm}></Route>
          <Route path="/auth/signup/:id" Component={SignUpForm}></Route>
          <Route
            path="/auth/forgot-password/:id"
            Component={ForgotPassword}
          ></Route>
          <Route
            path="/auth/change-password/Loi"
            Component={ChangePasswordLoi}
          ></Route>
          <Route
            path="/auth/change-password/Ha"
            Component={ChangePasswordHa}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
