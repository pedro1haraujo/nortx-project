import { AllRoutes } from "./components/AllRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  return (
    <>
      <AllRoutes />
      <ToastContainer />
    </>
  )
};
