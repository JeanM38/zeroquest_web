import { Outlet } from "react-router-dom";
import { Header, NavLink, NavLinkList, Btn } from "../style/Components/UIStyle";

export const Layout = () => {
    return (
      <div>
        <Header>
            <h1>ZeroQuest</h1>
            <NavLinkList>
              <NavLink to="account">Account</NavLink>
              <NavLink to="board">Creations</NavLink>
              <NavLink to="news">News</NavLink>
              <NavLink to="faq">FAQ</NavLink>
              <NavLink to="contact">Contact</NavLink>
            </NavLinkList>
            <Btn>Play Now</Btn>
        </Header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    );
}