import AllTasks from "./pages/AllTasks";
import CompletedTask from "./pages/CompletedTask";
import Home from "./pages/Home";
import ImportantTask from "./pages/ImportantTask";
import { Routes, Route, useNavigate } from "react-router-dom";
import IncompletedTask from "./pages/IncompletedTask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (id && token) {
      dispatch(authActions.login({ id, token }));
    } else if (!isLoggedIn) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<ImportantTask />} />
          <Route path="/completedTasks" element={<CompletedTask />} />
          <Route path="/incompletedTasks" element={<IncompletedTask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
