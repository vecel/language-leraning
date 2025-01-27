import AuthForm from "../components/AuthForm/AuthForm";

export default function Authorization({ handleLogin }) {
    return (
        <>
            <p>Hello Authorization</p>
            <AuthForm handleLogin={handleLogin} />
        </>
    )
}