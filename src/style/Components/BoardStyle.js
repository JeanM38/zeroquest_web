import styled from "styled-components"

export const ChapterEditor = styled.div`
  display: flex;
  align-items: center;
  max-height: calc(100vh - 70px);
  overflow: hidden;
  background-image: url("${process.env.PUBLIC_URL}/Resources/Images/smoke-bg-16-9.jpg");
  background-color: black;
  background-size: 100vw calc(100vh - 70px);
`

export const DecksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  max-width: 30%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Deck = styled.div`
  margin-bottom: ${props => props.mb ? "20px" : "0"};
  padding: 10px;
  border-radius: 5px;
  background-color: lightgrey;

  h1 {
    margin: 0;
    text-align: center;
  }
`

export const DeckItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const GridWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(26, 1fr);
  grid-template-rows: repeat(19, 1fr);
  grid-auto-flow: row;
  gap: 0px;
  background-image: url("${process.env.PUBLIC_URL}/Resources/Images/board.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  box-shadow: -5px 5px 15px -3px rgba(0,0,0,0.6);
`