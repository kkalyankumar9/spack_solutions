import { ToastContainer } from "react-toastify";
import Registration from "./Components/registration";
import MainRoutes from "./Routes/mainRoutes";

function App() {
  return (
    <div>
      <MainRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
