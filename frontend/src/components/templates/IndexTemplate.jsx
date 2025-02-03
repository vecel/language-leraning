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
    border-bottom: 1px solid #fff5;
    // display: flex;
    // flex-direction: row;
    // align-items: center;
    display: grid;
    grid-template-columns: 20rem auto 20rem;
`

const Main = styled.main`
    margin: auto;
    max-width: 64rem;
    border-left: var(--dashed-line);
    border-right: var(--dashed-line);
    display: flex;
    flex-direction: column;
    align-items: center;
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