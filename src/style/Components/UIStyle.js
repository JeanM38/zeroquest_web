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

export const CheckboxGroup = styled.div`
    display: flex;
    column-gap: var(--s1);
    margin-bottom: ${props => props.mb ? "var(--s2)" : "unset"};

    .container {
      display: block;
      position: relative;
      padding-left: 35px;
      cursor: pointer;
      color: var(--light-grey);
      font-family: var(--cyrunicorn);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
    }
    
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background: rgba(var(--dark-grey-rgb), var(--opacity));
      border-radius: 5px;
    }
    
    .container input:checked ~ .checkmark {
        border: 1px solid var(--gold);
    }
     
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    .container input:checked ~ .checkmark:after {
      display: block;
    }

    .container .checkmark:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid var(--gold);
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
`;