import { Link } from "react-router-dom";
import styled from "styled-components";

import BaseButton from "../../styles/button";

const StyledLink = styled(Link)`
    ${BaseButton}
`

export default function LinkButton({ primary, text, link }) {
    return (
        <StyledLink to={link} $primary={primary}>
            {text}
        </StyledLink>
    )
}