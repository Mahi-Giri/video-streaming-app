import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { currentUser } = useSelector((store) => store.user);
    console.log(currentUser)
    const isAdmin =currentUser.isAdmin

    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
