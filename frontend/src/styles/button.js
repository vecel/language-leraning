import { css } from "styled-components"

const BaseButton = css`
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: ${props => props.$primary ? '#fff' : '#1a1a1a' };
    color: ${props => props.$primary ? '#1a1a1a' : 'inherit' };
    cursor: pointer;
    transition: border-color 0.25s;
    &:hover {
        border-color: ${props => props.$primary ? 'var(--dark)' : 'var(--accent)' };
        color: ${props => props.$primary ? '#1a1a1a' : '#fff' };
    }
    &:focus,
    &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
`

export default BaseButton