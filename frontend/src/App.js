import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import WelcomePage from "./pages/WelcomePage"
import GachaPage from "./pages/GachaPage"
import {WelcomeLoader} from "./pages/WelcomePage"
import {MachineLoader} from "./pages/GachaPage"
import { UserMachineContextProvider } from './context/UserMachineContext'

let App = () => {
  const router = createBrowserRouter([
    {
      path: '/app',
      element: <WelcomePage />,
      index: true,
      loader: WelcomeLoader
    }, 
    {
      path: "/app/gacha/:id", 
      element: <GachaPage />,
      loader: MachineLoader
    }
  ])

  return (
    <UserMachineContextProvider>
      <RouterProvider router={router}/>
    </UserMachineContextProvider>
  );
}

export default App;
