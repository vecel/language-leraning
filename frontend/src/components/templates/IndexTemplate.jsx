import React from "react"
import styled from "styled-components"

const Root = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.header`
    align-self: stretch;
    height: 3.5rem;
`

const Main = styled.main`
    margin: auto;
    max-width: 64rem;
`

export default function IndexTemplate({ children }) {

    return (
        <Root>
            <Header>
                {children[0]}
            </Header>
            <Main>
                {children[1]}
            </Main>
        </Root>
    )
}