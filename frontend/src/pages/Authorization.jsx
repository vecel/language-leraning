import AuthForm from "../components/molecules/AuthForm";
import styled from "styled-components";

const Template = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`

export default function Authorization({ handleLogin }) {

    return (
        <Template>
            <AuthForm handleLogin={handleLogin} />
        </Template>
    )
}