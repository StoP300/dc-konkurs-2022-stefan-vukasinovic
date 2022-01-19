import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!authCtx.isLoggedIn && (
          <Route path="/" element={<Login></Login>}></Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/" element={<Home></Home>}></Route>
        )}
      </Routes>
    </Layout>
  );
}
export default App;


