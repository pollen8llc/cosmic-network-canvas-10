import { HomeIcon, UserIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Login from "./components/Login.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <PrivateRoute><Index /></PrivateRoute>,
  },
  {
    title: "Login",
    to: "/login",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Login />,
  },
];