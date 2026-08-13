import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Register from "./components/Register";
import Forgotpassword from "./components/Forgotpassword";
import Resetpassword from "./components/Resetpassword";
import Dashboard from "./components/Dashboard"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route  path="/resetpassword/:token" element={<Resetpassword />} />
             <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
