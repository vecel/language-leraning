import styled from "styled-components"

const StyledSpan = styled.span`
    display: inline-block;
    padding: 0.1em 0.2rem;
    color: red;
    font-size: 0.9em; 
    font-family: inherit;
    height: 1.3rem;
    text-align: left;
`

export default function ErrorMessage({ message }) {
    return (
        <StyledSpan>{message}</StyledSpan>
    )
}