import Router from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log(`App is Running in ${process.env.REACT_APP_ENV} Environment`);

const App = () => {
  return (
    <HelmetProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Router />
    </HelmetProvider>
  );
};

export default App;
