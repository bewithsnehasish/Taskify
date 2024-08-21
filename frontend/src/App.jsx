import AllTasks from "./pages/AllTasks";
import CompletedTask from "./pages/CompletedTask";
import Home from "./pages/Home";
import ImportantTask from "./pages/ImportantTask";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IncompletedTask from "./pages/IncompletedTask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white h-screen p-2 relative">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
            <Route path="/importantTasks" element={<ImportantTask />} />
            <Route path="/completedTasks" element={<CompletedTask />} />
            <Route path="/incompletedTasks" element={<IncompletedTask />} />
          </Route>
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
