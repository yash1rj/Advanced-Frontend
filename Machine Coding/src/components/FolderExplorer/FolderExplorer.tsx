import styled from "styled-components";
import { FolderStructure } from "./types";

const Directory = styled.p<{ directoryType: string }>`
  ${(p) =>
    p.directoryType === "Folder" &&
    `&:before {
        content: "▶";
        width: 20px;
        height: auto;
        display: inline-block;
    }`}

  margin-left: ${(p) => (p.directoryType === "File" ? "20px" : "")};
`;

const FolderExplorer = ({
  folderStructure,
}: {
  folderStructure: FolderStructure;
}) => {
  console.log("folderStructure", folderStructure);
  return (
    <div style={{ marginLeft: "20px" }}>
      {folderStructure?.map((folderInfo: FolderStructure[0]) => {
        return (
          <>
            <Directory directoryType={folderInfo.type} key={folderInfo.id}>
              {folderInfo.name}
            </Directory>
            {folderInfo.type === "Folder" && (
              <FolderExplorer folderStructure={folderInfo.content} />
            )}
          </>
        );
      })}
    </div>
  );
};

export default FolderExplorer;
