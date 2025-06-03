import styled from "styled-components";

export const DebouncedSearchBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

export const SearchBar = styled.input`
  width: 250px;
  border: 1px solid red;
  border-radius: 5px;
  margin-top: 20px;
`;

export const SearchList = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  min-width: 210px;

  li {
    list-style-type: none;
    border: 1px solid white;
    margin-bottom: 5px;
    padding: 0 5px;
  }
`;
