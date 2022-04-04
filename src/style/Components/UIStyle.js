import styled from "styled-components";
import { CustomLink } from "../../Components/UI/CustomLink";

export const Header = styled.nav`
    display: flex;
    align-items: center;
    height: var(--s3);
    padding: var(--s1) var(--s3);
    column-gap: var(--s2);
    background-color: var(--dark-grey);

    h1 {
        font-family: var(--morpheus);
        color: var(--light-grey);
        font-weight: 500;
    }
`;

export const NavLinkList = styled.ul`
    display: flex;
    flex-direction: row;
    width: 100%;
    column-gap: var(--s2);
    list-style: none;
`;

export const NavLink = styled(CustomLink)`
    color: var(--light-grey);
    font-family: var(--cyrunicorn);
    text-decoration: none;
    transition: var(--transition-out);

    &.active,
    &:hover,
    &:focus
    {
        color: var(--gold);
        transition: var(--transition-in);
    }
`

export const Btn = styled.button`
    min-width: var(--btn-width);
    padding: var(--s1) 0;
    border-radius: ${props => props.br ? "var(--radius)" : "unset"};
    text-transform: uppercase;
    font-family: var(--morpheus);
    border: 1px solid var(--gold);
    background-color: var(--dark-grey);
    color: var(--light-grey);
    cursor: pointer;
    transition: var(--transition-out);

    &:hover {
        transition: var(--transition-in);
        background-color: var(--gold);
    }
`;