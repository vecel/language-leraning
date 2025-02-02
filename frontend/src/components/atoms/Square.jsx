import styled, { keyframes } from "styled-components"

const pulse = keyframes`
    to {
        opacity: 0.3;
    }
`

const Animation = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    animation: ${pulse} 1.5s ease-in-out infinite alternate; 
`

export default function Square() {
    return (
        <Animation />
    )
}