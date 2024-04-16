import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from './redux/actions/auth'

import AuthVerify from './common/authVerify'
// import App from "./App";
import Home from "./pages/home.js";
import PageNotFound from "./404.js";
import SignIn from "./pages/login.js";
import SignUp from "./pages/signup.js";
import Profile from "./pages/profile.js";
import UserTable from "./pages/userTable.js";
import FormSample from "./pages/forms/formSample.js";
import Room from "./pages/luckydraw/room.js";
import SpankRoom from "./pages/luckydraw/spankRoom.js";
import LuckyDrawRoom from "./pages/luckydraw/luckyDrawRoom.js";


// function processMessage(message) {
//   console.log('Message processed:', message)
//   setTimeout(() => {
//     // Emit acknowledgment to the server
//     socket.emit('acknowledge')
//     console.log('Acknowledgment sent after 3 seconds')
//   }, 3000)
// }
function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/room" element={<Room />} />
            <Route path="/user/room/spank" element={<SpankRoom />} />
            <Route path="/user/room/lucky" element={<LuckyDrawRoom />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        {user?.roles === 3 ? (
          <>
            <Route path="/user/list" element={<UserTable />} />
            <Route path="/form_g1" element={<FormSample />} />
          </>
        ) : null}
        {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <AuthVerify logOut={logOut} />
    </div>
  );
}

export default App
