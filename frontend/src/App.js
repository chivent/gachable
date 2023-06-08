import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import WelcomePage from "./pages/WelcomePage"
import GachaPage from "./pages/GachaPage"
import {WelcomeLoader} from "./pages/WelcomePage"
import {MachineLoader} from "./pages/GachaPage"
import { UserMachineContextProvider } from './context/UserMachineContext'
import { MockServerContextProvider } from './context/MockServerContext'
import { WindowContextProvider } from './context/WindowContext'

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
    <WindowContextProvider>
      <MockServerContextProvider>
        <UserMachineContextProvider>
          <RouterProvider router={router}/>
        </UserMachineContextProvider>
      </MockServerContextProvider>
    </WindowContextProvider>
  );
}

export default App;
