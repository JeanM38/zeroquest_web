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
  height: calc(100vh - 120px);
  overflow-y: scroll;
  padding: var(--s2) 0 var(--s2) var(--s2);

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Deck = styled.div`
  margin-bottom: var(--s2);

  h3 {
    margin: 0;
    padding-bottom: 10px;
    font-family: var(--morpheus);
    font-weight: 500;
    color: var(--gold);
  }
`

export const DeckItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: rgba(var(--dark-grey-rgb), var(--opacity));
  border-radius: var(--radius);
  padding: var(--s1);
`

export const GridWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 100%;

  h1 {
    color: var(--gold);
    font-family: var(--morpheus);
    font-weight: 500;
  }
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