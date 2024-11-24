import {
  createBrowserRouter,
  // createHashRouter,
} from "react-router-dom";
import HomePage from "../module/deepface/page/FirstPage";
import Loginpage from "../module/deepface/page/LogInPage";
import SearchPage from "../module/deepface/page/SearchPage";
// import { DeepfaceRouting } from "../module/deepface/DeepfaceRouting";
// import LoginPage from "../module/deepface/page/LogInPage";

export const CoreRouter = createBrowserRouter([
  // {
  //     path: "/",
  //     element: <LoginPage />,
  //     children: [{
  //       path: "/login",
  //     }]
    
  // },
  {
    path: "/login",
    element: <Loginpage />,
    // children: [
    //   {
    //     path: "upload",
    //     element: <ProfilePage />,
    //   },
    //   {
    //     path: "settings",
    //     element: <SettingsPage />,
    //   },
    // ],
  },
  {
    path: "homepage",
    element: <HomePage />,
  },
  {
    path: "search",
    element: <SearchPage />,
  }
  // {
  //   children: [
  //     {
  //       // สำหรับกำหนด path default โดยให้ redirect ไปหน้าค้นหา
  //       path: "",
  //       element: <Navigate to={"deepface"} />,
  //     },
  //     {
  //       path: 'deepface',
  //       children: DeepfaceRouting
  //     }
  //   ],
  // },
]);