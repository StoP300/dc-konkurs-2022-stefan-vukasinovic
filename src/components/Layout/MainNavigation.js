import { useContext } from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.scss";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className="wrap">
      {isLoggedIn && (
        <Link to="/">
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        </Link>
      )}
    </div>
  );
};

export default MainNavigation;
