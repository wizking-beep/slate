import { Directory,Paths } from "expo-file-system";

export const dataDir = new Directory(Paths.document,"slateData")
export const notesDir = new Directory(Paths.document, "slateData/notes");