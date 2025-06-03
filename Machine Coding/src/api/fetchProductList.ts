export const fetchProductList = async (query: string) => {
  try {
    if (query.length) {
      const rawResults = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const resultsJson = await rawResults.json();
      return resultsJson.products;
    }
  } catch (error) {
    throw new Error();
  }
};
