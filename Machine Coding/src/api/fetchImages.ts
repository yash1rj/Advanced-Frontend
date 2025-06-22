export const fetchImagesList = async (pageNum?: number, limit?: number) => {
  try {
    const pageNumQuery = pageNum && pageNum > 0 ? `page=${pageNum}` : "";
    const limitQuery = limit && limit > 0 ? `limit=${limit}` : "";

    const rawResults = await fetch(
      `https://picsum.photos/v2/list${
        pageNum || limit ? "?" : ""
      }${pageNumQuery}${pageNumQuery.length > 0 ? "&" : ""}${limitQuery}`
    );
    const resultsJson = await rawResults.json();
    return resultsJson;
  } catch (error) {
    throw new Error();
  }
};
