import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./utils/context/auth";
import { AuthRoute } from "./utils/AuthRouter";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MenuBar } from "./components/MenuBar";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />

          <Route exact path={ROUTES.HOME} component={Home} />
          <AuthRoute exact path={ROUTES.LOGIN} component={Login} />
          <AuthRoute exact path={ROUTES.REGISTER} component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
};
