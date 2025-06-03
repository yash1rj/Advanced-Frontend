import { useEffect, useMemo, useState } from "react";
import { fetchAllProductList } from "../../api/fetchProductList";
import { ProductListData } from "./types";
import {
  PaginationBlocks,
  PaginationContainer,
  ProductList,
} from "./PaginatedDataStyles";
import usePagination from "../../hooks/usePagination";

const paginationConfig = {
  pageSize: 5,
  DOTS: "...",
};

const PaginatedData = () => {
  const [list, setList] = useState<ProductListData[]>([]);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);

  const [paginatedData, totalPages] = useMemo(() => {
    const startIdx = currentPage * paginationConfig.pageSize;
    return [
      list.slice(startIdx, startIdx + paginationConfig.pageSize),
      Math.ceil(list.length / paginationConfig.pageSize) as number,
    ];
  }, [list, currentPage]);

  const paginationRange = usePagination({
    currentPage,
    totalPageCount: totalPages,
  });

  const handleFirstPageNav = () => setCurrentPage(0);
  const handlePrevPageNav = () => setCurrentPage((prevPage) => prevPage - 1);
  const handleSpecificPageNav = (page: number) => setCurrentPage(page);
  const handleNextPageNav = () => setCurrentPage((prevPage) => prevPage + 1);
  const handleLastPageNav = () => setCurrentPage(totalPages - 1);

  const fetchListData = async () => {
    try {
      setListLoading(true);
      const results = await fetchAllProductList();
      setList(results);
      setListLoading(false);
    } catch (error) {
      setList([]);
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <>
      {listLoading ? (
        <p>Loading data ....</p>
      ) : (
        <>
          <ProductList border={1} cellPadding={10}>
            <thead>
              <tr>
                <th style={{ width: "400px" }}>Title</th>
                <th style={{ width: "100px" }}>Category</th>
                <th style={{ width: "100px" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((listItem) => (
                <tr key={listItem.id}>
                  <td style={{ width: "400px" }}>{listItem.title}</td>
                  <td style={{ width: "100px" }}>{listItem.category}</td>
                  <td style={{ width: "100px" }}>{listItem.price}</td>
                </tr>
              ))}
            </tbody>
          </ProductList>
          <PaginationContainer>
            <PaginationBlocks
              disabled={currentPage === 0}
              onClick={handleFirstPageNav}
            >
              ⏪
            </PaginationBlocks>
            <PaginationBlocks
              disabled={currentPage === 0}
              onClick={handlePrevPageNav}
            >
              ◀️
            </PaginationBlocks>
            {paginationRange?.map((pageNumber: number | string, idx) => {
              if (pageNumber === paginationConfig.DOTS) {
                return (
                  <PaginationBlocks isDots={true} key={idx}>
                    ...
                  </PaginationBlocks>
                );
              }

              return (
                <PaginationBlocks
                  key={idx}
                  onClick={() => handleSpecificPageNav(idx)}
                  selected={currentPage === idx}
                >
                  {idx + 1}
                </PaginationBlocks>
              );
            })}
            <PaginationBlocks
              disabled={currentPage === totalPages - 1}
              onClick={handleNextPageNav}
            >
              ▶️
            </PaginationBlocks>
            <PaginationBlocks
              disabled={currentPage === totalPages - 1}
              onClick={handleLastPageNav}
            >
              ⏩
            </PaginationBlocks>
          </PaginationContainer>
        </>
      )}
    </>
  );
};

export default PaginatedData;
