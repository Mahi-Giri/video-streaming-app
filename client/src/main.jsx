import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./components/Livestreaming/SocketContext.jsx";
createRoot(document.getElementById("root")).render(
    <PersistGate persistor={persistor}>
        
        <Provider store={store}>
            <SocketProvider>
            <App />
            <ToastContainer />
            </SocketProvider>
            
        </Provider>
    </PersistGate>
);
