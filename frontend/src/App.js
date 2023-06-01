import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {useEffect} from 'react'
import './App.css';

function App() {
  const router = createBrowserRouter([
    { path: '/app', element: <HomePage />, index: true}
  ])

  // After phoenix leads to index, begin using react router with this reroute.
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/app");
    }
  }, []);

  return (
     <RouterProvider router={router}/>
  );
}

function HomePage() {
  const style = { padding: "8px" };
  return (
    <div style={style}>
      <p>Mock Home page for now</p>
    </div>
  );
}

export default App;
