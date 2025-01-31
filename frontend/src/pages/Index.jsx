import IndexTemplate from "../components/templates/IndexTemplate";
import Nav from "../components/organisms/Nav";
import IndexMain from "../components/organisms/IndexMain";

export default function Index() {
    return (
        <IndexTemplate>
            <Nav />
            <IndexMain />
        </IndexTemplate>
    )
}