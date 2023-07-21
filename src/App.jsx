import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/Pages/Root"
import Home from "./components/Pages/Home"
import Profile from "./components/Pages/Profile"
import Auth from "./components/Pages/Auth/Auth"
import Location from "./components/Pages/Location"
import NewPost from "./components/Pages/NewPost"
import FullIndividualPost from "./components/Pages/IndividualPost/FullIndividualPost"
import { useDispatch } from "react-redux"
import { persistData } from "./redux/slices/authSlice"

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "profile/:id",
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
        element: <FullIndividualPost />
      },
      {
        path: "locations/:id",
        element: <Location />
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
