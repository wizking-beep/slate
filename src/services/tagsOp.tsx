import { File } from "expo-file-system";
import { notesDir, dataDir } from "@/constants/paths";
import { Category } from "@/types/category";


//the file that stores all tags in Document/slate-data/tags.json
const tagIndex = new File(dataDir, "tags.json");

const initialiseTagFile = async () => {
  if (!(tagIndex.exists)) {
    tagIndex.create();
    tagIndex.write(JSON.stringify([], null, 2));
  }
};

const readTagsArray = async (): Promise<Category[]> => {
  try {
    await initialiseTagFile();
    const content = await tagIndex.text();
    
    if (!content || content.trim() === '') {
      return [];
    }
    
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (parseError) {
      console.error('Error parsing tags JSON:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error reading tags:', error);
    return [];
  }
};

const writeTagsArray = async (tags: Category[]): Promise<void> => {
  try {
    //first get the existing tags in file
    const existingTags = await readTagsArray();
    //merge the existing tags with the new tags and remove duplicates
    const mergedTags = [...new Set([...existingTags, ...tags.map(tag => tag.id)])];

    //write the merged tags to file
     tagIndex.write(JSON.stringify(mergedTags, null, 2));
  } catch (error) {
    console.error('Error writing tags:', error);
    throw error;
  }
}

const  removeTagFromFile = async (tagId: string): Promise<void> => {
  try {
    const tags = await readTagsArray();
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    await writeTagsArray(updatedTags);
  } catch (error) {
    console.error('Error removing tag:', error);
    throw error;
  }
}

export { readTagsArray, writeTagsArray, removeTagFromFile };