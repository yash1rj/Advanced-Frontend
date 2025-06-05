import styled from "styled-components";
import { FolderStructure } from "./types";
import { useState } from "react";

const Folder = styled.button<{ isOpen: boolean }>`
  display: flex;
  background-color: gold;
  margin-left: 0px;
  min-width: 80px;
  font-size: 20px;
  line-height: 24px;

  &:before {
    content: "${(p) => (p.isOpen ? "▼" : "▶")}";
    width: 20px;
    height: auto;
    display: inline-block;
    margin-right: 5px;
  }
`;

const File = styled.p`
  margin-left: 20px;
  background-color: blue;
  max-width: max-content;
  font-size: 20px;
  line-height: 24px;
`;

const FolderExplorer = ({
  folderDirectory,
}: {
  folderDirectory: FolderStructure;
}) => {
  const [showFolder, setShowFolders] = useState(false);

  const handleFolderClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowFolders((prevShowFoldersFlag) => !prevShowFoldersFlag);
  };
  return (
    <div style={{ margin: "15px" }}>
      {folderDirectory.type === "File" && <File>{folderDirectory.name}</File>}
      {folderDirectory.type === "Folder" && (
        <>
          <Folder isOpen={showFolder} onClick={handleFolderClick}>
            {folderDirectory.name}
          </Folder>
          {showFolder &&
            folderDirectory.content?.map((folderInfo) => (
              <FolderExplorer folderDirectory={folderInfo} />
            ))}
        </>
      )}
    </div>
  );
};

export default FolderExplorer;
