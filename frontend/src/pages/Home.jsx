export default function Home({ handleLogout }) {
    return (
        <>
            <p>Hello Home</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}