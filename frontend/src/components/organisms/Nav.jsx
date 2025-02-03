import styled from "styled-components";
import LinkButton from "../atoms/LinkButton";
import Logo from "../atoms/Logo";
import NavLink from "../atoms/NavLink";
import NavLinkGroup from "../molecules/NavLinkGroup";

const Container = styled.div`
    align-self: center;
    justify-self: end;
    padding: 0 2rem;
`

export default function Nav() {
    return (
        <>
            <Logo />
            <NavLinkGroup>
                <NavLink text='Home' />
                <NavLink text='About' />
                <NavLink text='Contact' />
            </NavLinkGroup>
            <Container>
                <LinkButton primary={true} text='Log In' link='/authorization' />
            </Container>
        </>
    )
}