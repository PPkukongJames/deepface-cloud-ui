import { RouterProvider } from "react-router-dom";
import './App.css'
import { CoreRouter } from "./project/core/CoreRouting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from 'notistack';
function App() {

  const queryClient = new QueryClient()
  // console.log("%c" + "App-root", cStyle("#ffffff", "#7d639a"));

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
      <RouterProvider router={CoreRouter} />
      </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}
export default App
