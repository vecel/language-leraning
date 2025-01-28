import styled from "styled-components"

const StyledInput = styled.input`
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em; 
    font-family: inherit;
    background-color: #333;
    cursor: text;
    transition: border-color 0.25s;
    &:hover,
    &:focus {
        border-color: #646cff;
    }
    &:focus {
        outline: none;
    }
`

export default function FormInput({ name, type, onChange }) {
    return (
        <StyledInput 
            name={name}
            type={type}
            placeholder={name}
            onChange={onChange}
            required
        />
    )
}