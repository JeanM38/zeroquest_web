import styled from "styled-components"

export const ChapterEditor = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`

export const DecksWrapper = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
`

export const Deck = styled.div`
  border-radius: 5px;
  background-color: lightgrey;
  margin-bottom: ${props => props.mb ? "20px" : "0"};
  padding: 10px;

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
  display: flex;
  justify-content: center;
  width: 80%;
  position: relative;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(26, 1fr);
  grid-template-rows: repeat(19, 1fr);
  grid-auto-flow: row;
  gap: 0px;
  background-image: url("${process.env.PUBLIC_URL}/Resources/board.jpg");
  background-size: contain;
`