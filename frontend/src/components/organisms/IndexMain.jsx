import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../atoms/Button";
import Square from "../atoms/Square";

const Container = styled.div`
    // padding: 4rem 0;
    border-left: var(--dashed-line);
    border-right: var(--dashed-line);
`
const VerticalLine = styled.div`
    heigth: 0;
    width: 100%;
    border-bottom: var(--dashed-line);
`
const ButtonContainer = styled.div`
    display: inline-block;
    width: 20rem;
    padding: 2rem 0;
    border-left: var(--dashed-line);
    border-right: var(--dashed-line);
`

const SupportLines = styled.div`
    width: 20rem;
    height: 3rem;
    margin-left: 21.9rem;
    border-left: var(--dashed-line);
    border-right: var(--dashed-line);
`

const Title = styled.h1`
    margin: 2rem 0;
`
const Paragraph = styled.p`
    margin: 2rem;
`

export default function IndexMain() {
    return (
        <>
            <Container>
                <SupportLines />
                <VerticalLine />
                <Title>A title</Title>
                <VerticalLine />
                <Paragraph>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</Paragraph>
                <VerticalLine />
                <ButtonContainer>
                    <Button primary={true}>
                        <Link to='/authorization'>Get Started</Link>
                    </Button>
                </ButtonContainer>
                <VerticalLine />
                <SupportLines />
            </Container>
        </>
    )
}