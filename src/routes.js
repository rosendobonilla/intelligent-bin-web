import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
//import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import Feed from "views/examples/Feed.jsx";

/*
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
 */

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/feed",
    name: "Red",
    icon: "ni ni-planet text-blue",
    component: Feed,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Historial de basura",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Mi perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/signup",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];

export default routes;
