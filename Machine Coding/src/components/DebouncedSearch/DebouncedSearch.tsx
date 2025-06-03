import { useEffect, useState } from "react";
import {
  DebouncedSearchBody,
  SearchBar,
  SearchList,
} from "./DebouncedSearchStyles";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchProductList } from "../../api/fetchProductList";

const SEARCH_STATES = {
  init: "NOT_STARTED",
  loading: "LOADING",
  loaded: "LOADED",
  failed: "FETCH_FAILED",
};

const DebouncedSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [fetchState, setFetchState] = useState<string>(SEARCH_STATES.init);

  const fetchList = async (searchQuery: string) => {
    try {
      if (searchQuery.length) {
        const results = await fetchProductList(searchQuery);
        setList(results);
        setFetchState(SEARCH_STATES.loaded);
      } else {
        setFetchState(SEARCH_STATES.init);
        setList([]);
      }
    } catch (error) {
      setFetchState(SEARCH_STATES.failed);
      setList([]);
    }
  };

  const debouncedListFetch = useDebounce(() => fetchList(query), 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    debouncedListFetch();
  }, [query]);

  return (
    <DebouncedSearchBody>
      <SearchBar
        type="text"
        placeholder="Enter search value"
        value={query}
        onChange={handleSearch}
      />
      <SearchList>
        {fetchState === SEARCH_STATES.init ? (
          <p>Type to search for products !</p>
        ) : fetchState === SEARCH_STATES.loading ? (
          <p>LOADING...</p>
        ) : fetchState === SEARCH_STATES.failed ? (
          <p>Error occured while fetching Products !</p>
        ) : list.length > 0 ? (
          list?.map((listItem: any) => (
            <li key={listItem.id}>{listItem.title}</li>
          ))
        ) : (
          <p>No products found !</p>
        )}
      </SearchList>
    </DebouncedSearchBody>
  );
};

export default DebouncedSearch;
