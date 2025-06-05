import "./App.css";
import FolderExplorer from "./components/FolderExplorer/FolderExplorer";
import { foldersData } from "./components/FolderExplorer/foldersData";
// import DebouncedSearch from "./components/DebouncedSearch/DebouncedSearch";
// import PaginatedData from "./components/PaginatedData/PaginatedData";
// import Rating from "./components/Rating/Rating";

function App() {
  return (
    <>
      {/* <DebouncedSearch />
      <Rating /> */}
      {/* <PaginatedData /> */}
      <FolderExplorer folderStructure={foldersData} />
    </>
  );
}

export default App;
