import { RouterProvider } from "react-router-dom";
import './App.css'
import { CoreRouter } from "./project/core/CoreRouting";

function App() {
  // console.log("%c" + "App-root", cStyle("#ffffff", "#7d639a"));

  return (
    <>
      <RouterProvider router={CoreRouter} />
    </>
  );
}
export default App
