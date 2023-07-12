import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/Pages/Root"
import Feed from "./components/Pages/Feed"
import Profile from "./components/Pages/Profile"
import Auth from "./components/Pages/Auth/Auth"
import Location from "./components/Pages/Location"
import NewPost from "./components/Pages/NewPost"
import {action as logoutAction} from "./components/Pages/Auth/Logout"

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "feed",
        element: <Feed />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "login",
        element: <Auth />
      },
      {
        path: "location",
        element: <Location />
      },
      {
        path: "post",
        element: <NewPost />
      }
    ]
  },
  {
    path: "/logout",
    action: logoutAction
  }
])

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
