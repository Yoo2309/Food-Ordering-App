import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./Pages/Index";

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
        <Route path="/login/:id" Component={Login}></Route>
        <Route path="/signup/:id" Component={SignUp}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
