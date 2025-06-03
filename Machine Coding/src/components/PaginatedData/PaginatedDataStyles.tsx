import styled from "styled-components";

export const ProductList = styled.table`
  display: flex;
  flex-direction: column;
  justify-self: center;

  thead {
    background-color: beige;
    color: black;

    tr {
      text-align: start;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

export const PaginationBlocks = styled.button<{
  selected?: boolean;
  isDots?: boolean;
}>`
  padding: 2.5px;
  border: 0.5px solid lightblue;
  border-radius: 5px;
  margin: 2.5px;
  min-width: 25px;
  text-align: center;
  background: ${(p) => (p.selected ? "gold" : "")};
  font-weight: ${(p) => (p.isDots ? 800 : "")};
`;
