import AdminRoute from "../../PrivateRouter/AdminRoute";
import PrivateRouter from "../../PrivateRouter/PrivateRouter";
import Login from "../Authetication/Login/Login";
import Register from "../Authetication/Register/Register";
import AddDoctor from "../Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../Dashboard/AddDoctor/ManageDoctors";
import AllUser from "../Dashboard/AllUser/AllUser";
import DashboardLayout from "../Dashboard/DashboardLayout";
import Payment from "../Dashboard/Payment/Payment";
import Main from "../layout/Main";
import MyAppointment from "../MyAppointment/MyAppointment";
import About from "../pages/About/About";
import Appointment from "../pages/Appointment/Appointment";
import Home from "../pages/Home/Home";
import Reviews from "../pages/Reviews/Reviews";
import DisplayError from "../shared/DisplayError/DisplayError";

const { createBrowserRouter } = require("react-router-dom");

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/reviews',
                element: <PrivateRouter> <Reviews></Reviews></PrivateRouter>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter> <DashboardLayout></DashboardLayout></PrivateRouter>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/manage-doctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`),
                element: <AdminRoute><Payment></Payment></AdminRoute>
            },
        ]
    }
]);