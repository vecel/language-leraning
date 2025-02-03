import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    cursor: pointer;
    padding: 1rem 2.5rem;
    &:hover {
        background-color: var(--secondary-dark);
        text-decoration: underline;
    }
`

export default function NavLink({ text, link }) {
    return (
        <StyledLink to={link}>
            {text}
        </StyledLink>
    )
}