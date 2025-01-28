import AuthForm from "../components/molecules/AuthForm";

export default function Authorization({ handleLogin }) {
    return (
        <>
            <p>Hello Authorization</p>
            <AuthForm handleLogin={handleLogin} />
        </>
    )
}