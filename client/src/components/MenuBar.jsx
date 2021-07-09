import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export const MenuBar = () => {
  // fixing the path error
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
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
};
