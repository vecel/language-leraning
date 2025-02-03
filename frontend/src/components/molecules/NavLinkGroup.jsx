import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`

export default function NavLinkGroup({ children }) {
    return (
        <Container>
            {children}
        </Container>
    )
}