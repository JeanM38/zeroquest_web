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
    border-radius: ${props => props.rounded ? "var(--radius)" : "unset"};
    text-transform: uppercase;
    font-family: var(--morpheus);
    border: 1px solid var(--gold);
    background-color: ${props => props.primary ? "var(--gold)" : "var(--dark-grey)"};
    color: ${props => props.primary ? "var(--dark-grey)" : "var(--light-grey)"};
    cursor: pointer;
    transition: var(--transition-out);
    margin-bottom: ${props => props.mb ? "var(--s1)" : "unset"};

    &:hover {
        transition: var(--transition-in);
        background-color: ${props => props.primary ? "var(--gold)" : "var(--gold)"};
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: var(--s1);
    margin-bottom: ${props => props.mb ? "var(--s2)" : "unset"};
`

export const InputText = styled.input`
    padding: var(--s1);
    border: none;
    outline: none;
    border-radius: var(--radius);
    color: var(--light-grey);
    font-family: var(--cyrunicorn);
    background: rgba(var(--dark-grey-rgb), var(--opacity));
`

export const TextArea = styled.textarea`
    padding: var(--s1);
    border: none;
    outline: none;
    border-radius: var(--radius);
    color: var(--light-grey);
    font-family: var(--cyrunicorn);
    background: rgba(var(--dark-grey-rgb), var(--opacity));
    resize: vertical;
`

export const ResultMessage = styled.div`
    text-align: center;
    padding: var(--s1) var(--s1) var(--s1) var(--s1);
    background: var(--${props => props.type}) url("${process.env.PUBLIC_URL}/Resources/icons/${props => props.type}.svg") no-repeat scroll center left var(--s1);
    color: white;
    border-radius: var(--radius);
    font-family: var(--morpheus);
`