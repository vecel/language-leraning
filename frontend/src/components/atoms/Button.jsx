import styled from "styled-components"
import BaseButton from "../../styles/button"

const StyledButton = styled.button`
    ${BaseButton}
`

export default function Button({ primary, children }) {
    return (
        <StyledButton $primary={primary}>
            {children}
        </StyledButton>
    )
}