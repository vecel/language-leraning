import { Link } from "react-router-dom";

export default function Index() {
    return (
        <>
            <p>Hello Index</p>
            <Link to='/authorization'>Authorization</Link>
        </>
    )
}