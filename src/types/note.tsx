import { Category } from "./category";

export interface NotesMetadata  {
    id:string,
    title:string,
    filePath:string,
    category:Category,
    createdAt?:string,
    updatedAt:string,
    favorite:boolean,
    pinned:boolean,
    archived:boolean,
    trash:boolean,
    dirty:boolean
}