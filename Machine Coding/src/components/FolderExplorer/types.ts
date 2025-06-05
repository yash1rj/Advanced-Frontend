export type FolderStructure = {
  id: string;
  name: string;
  type: string;
  content: FolderStructure;
}[];
