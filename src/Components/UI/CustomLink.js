import * as React from "react";
import { NavLink } from "react-router-dom";

export const CustomLink = ({ children, to, ...props }) => {
    return (
      <li>
        <NavLink activeClassName={"active"} to={to} {...props}>
          {children}
        </NavLink>
      </li>
    );
}