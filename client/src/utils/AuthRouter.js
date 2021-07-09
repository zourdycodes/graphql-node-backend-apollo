import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./context/auth";
import * as ROUTES from "../constants/routes";

// save route paths
export const AuthRoute = ({ component: Component, ...restProps }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...restProps}
      render={(props) =>
        user ? <Redirect to={ROUTES.HOME} /> : <Component {...props} />
      }
    />
  );
};
