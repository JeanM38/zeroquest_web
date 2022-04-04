import {
    Link,
    Outlet,
} from "react-router-dom";
import { Header } from "../style/UIStyle";
import { NavLink } from "../style/UIStyle";

export const Layout = () => {
    return (
      <div>
        <Header>
            <h1>ZeroQuest!</h1>
            <NavLink to="board">Board</NavLink>
        </Header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
}