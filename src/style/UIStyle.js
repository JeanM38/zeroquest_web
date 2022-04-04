import styled from "styled-components";
import { CustomLink } from "../Components/UI/CustomLink";

export const Header = styled.nav`
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 10px 50px;
    column-gap: 25px;
    background-color: var(--dark-grey);
`;

export const NavLink = styled(CustomLink)`
    color: var(--light-grey);
    font-family: "Cyrunicorn", Helvetica, sans-serif;
    text-decoration: none;
`