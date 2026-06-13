import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { fetchCurrentUser } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";


function App() {
 const dispatch = useDispatch();


 
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);










  return <>
  <AppRoutes />
  </>;
}

export default App;