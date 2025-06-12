export const fetchImagesList = async () => {
  try {
    const rawResults = await fetch(`https://picsum.photos/v2/list`);
    const resultsJson = await rawResults.json();
    return resultsJson;
  } catch (error) {
    throw new Error();
  }
};
