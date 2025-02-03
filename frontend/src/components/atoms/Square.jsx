import styled, { keyframes } from "styled-components"

const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
`

const Rect = styled.rect`
    width: 1rem;
    height: 1rem;
    fill: #fff;
    animation: ${pulse} 3s linear infinite alternate;
`

export default function Square() {
    return (
        <svg>
            <Rect />
        </svg>
    )
}