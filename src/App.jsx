import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/Pages/Root"
import Feed from "./components/Pages/Feed"
import Profile from "./components/Pages/Profile"
import Auth from "./components/Pages/Auth"
import Location from "./components/Pages/Location"
import NewPost from "./components/Pages/NewPost"

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
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
