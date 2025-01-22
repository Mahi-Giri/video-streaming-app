import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const userInfo = useSelector((state) => state.user.currentUser);
    return <div>Dashboard</div>;
};

export default Dashboard;
