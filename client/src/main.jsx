import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FcmToken from "./utils/FcmToken.jsx";

createRoot(document.getElementById("root")).render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            {/* <App /> */}
            <FcmToken/>
            <ToastContainer />
        </Provider>
    </PersistGate>
);
