import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Instructors from "../pages/Instructors/Instructors";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageUsers from "../pages/Dashboard/Admin/users/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/users/UpdateUser";
import Classes from "../pages/classes/Classes";
import ErrorPage from "../pages/error/ErrorPage";
import AddClass from "../pages/Dashboard/Instructors/AddClass";
import MyClasses from "../pages/Dashboard/Instructors/MyClasses";
import InstructorCP from "../pages/Dashboard/Instructors/InstructorCP";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import AdminRoute from "./Privet/AdminRoute";
import InstructorRoute from "./Privet/InstructorRoute";
import StudentRoute from "./Privet/StudentRoute";
import PrivetRoute from "./Privet/PrivetRoute";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import UpdateClass from "../pages/Dashboard/Instructors/UpdateClass";
import SingleClass from "../pages/classes/SingleClass";
import About from "../pages/about/about";
import HerbalStore from "../pages/herbalstore/HerbalStore";
import Therapy from "../pages/therapy/Therapy";
import ContactUs from "../pages/contact/ContactUs";
import SingleTherapy from "../pages/therapy/SingleTherapy"
import SingleHerbal from "../pages/herbalstore/SingleHerbal";
import TrendingPage from "../pages/Dashboard/Student/Trending/trending";
const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "herbalstore",
                element: <HerbalStore/>
            },
            {
                path: "therapies",
                element: <Therapy/>
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "classes",
                element: <Classes />
            },
            {
                path: "contact",
                element: <ContactUs />
            },
            {
                path: "/trending",
                element: <TrendingPage />
            },
            {
                path: "class/:id",
                element: <SingleClass/>,
                loader: ({ params }) => fetch(`${BACKEND_URL}/class/${params.id}`),
            },
            {
                path: "therapies/:id",
                element: <SingleTherapy />, // create this component to show therapy details
                loader: ({ params }) => fetch(`${BACKEND_URL}/therapies/${params.id}`)},
                {
                    path: "herbal_products/:id",
                    element: <SingleHerbal />,
                    loader: ({ params }) =>
                      fetch(`${BACKEND_URL}/herbal_products/${params.id}`), // 👈 loader
                  }
              
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <PrivetRoute><Dashboard /></PrivetRoute>
            },
            // * ADMIN ROUTES
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'update-user/:id',
                element: <AdminRoute><UpdateUser /></AdminRoute>,
                loader: ({ params }) => fetch(`${BACKEND_URL}/users/${params.id}`),
            },
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: 'manage-class',
                element: <AdminRoute><ManageClasses /></AdminRoute>
            },
            // * INSTRUCTOR ROUTES
            {
                path: 'instructor-cp',
                element: <InstructorRoute><InstructorCP /></InstructorRoute>
            },
            {
                path: 'add-class',
                element: <InstructorRoute><AddClass /></InstructorRoute>
            },
            {
                path: 'my-classes',
                element: <InstructorRoute><MyClasses /></InstructorRoute>
            },
            {
                path: 'update/:id',
                element: <InstructorRoute><UpdateClass /></InstructorRoute>,
                loader: ({ params }) => fetch(`${BACKEND_URL}/class/${params.id}`),
            },
            // * STUDENT ROUTES
            {
                path: 'student-cp',
                element: <StudentRoute><StudentCP /></StudentRoute>
            },
            {
                path: 'my-selected',
                element: <StudentRoute><SelectedClass /></StudentRoute>
            },
            {
                path: 'user/payment',
                element: <StudentRoute><Payment /></StudentRoute>
            },
            {
                path: 'my-payments',
                element: <StudentRoute><MyPaymentHistory /></StudentRoute>
            },
            {
                path: 'apply-instructor',
                element: <StudentRoute><AsInstructor /></StudentRoute>
            },
            {
                path: 'enrolled-class',
                element: <StudentRoute><EnrolledClasses /></StudentRoute>
            }
        ]
    }
])