import {
  createHashRouter,
  Navigate,
} from "react-router-dom";
import { DeepfaceRouting } from "../module/deepface/DeepfaceRouting";

export const CoreRouter = createHashRouter([
  {
    children: [
      {
        // สำหรับกำหนด path default โดยให้ redirect ไปหน้าค้นหา
        path: "",
        element: <Navigate to={"deepface"} />,
      },
      {
        path: 'deepface',
        children: DeepfaceRouting
      }
    ],
  },
]);