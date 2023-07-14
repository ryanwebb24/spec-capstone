import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/Pages/Root"
import Feed from "./components/Pages/Feed"
import Profile from "./components/Pages/Profile"
import Auth from "./components/Pages/Auth/Auth"
import Location from "./components/Pages/Location"
import NewPost from "./components/Pages/NewPost"
import IndividualPost from "./components/Pages/IndividualPost"
import { useDispatch } from "react-redux"
import { persistData } from "./redux/slices/authSlice"

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
      },
      {
        path: "posts/:id",
        element: <IndividualPost />
      }
    ]
  }
])

function App() {
  const dispatch = useDispatch()
  dispatch(persistData())
  return (
    <RouterProvider router={router} />
  )
}

export default App
