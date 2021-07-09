import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "../utils/context/auth";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  // fixing the path error
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to={ROUTES.HOME} />

      {/* <Menu.Item
        name="home"
        onClick={handleItemClick}
        as={Link} // behavior
        to={ROUTES.HOME}
      /> */}

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link} // behavior
        to={ROUTES.HOME}
      />

      {/* <Menu.Item
        name="friends"
        active={activeItem === "friends"}
        onClick={handleItemClick}
      /> */}

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to={ROUTES.LOGIN}
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to={ROUTES.REGISTER}
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};
