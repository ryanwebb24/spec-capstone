 import { useDispatch } from "react-redux";
 import { useNavigate } from "react-router-dom";
 import { logout } from "../../../redux/slices/authSlice";
 
 export function action() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  dispatch(logout())
  navigate("/feed")
 }