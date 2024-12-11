import {
  createBrowserRouter,
  Navigate,
  // createHashRouter,
} from "react-router-dom";
import HomePage from "../module/deepface/page/FirstPage";
import Loginpage from "../module/deepface/page/LogInPage";
import SearchPage from "../module/deepface/page/SearchPage";
// import { DeepfaceRouting } from "../module/deepface/DeepfaceRouting";
// import LoginPage from "../module/deepface/page/LogInPage";

export const CoreRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
]);