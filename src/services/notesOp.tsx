import { File } from "expo-file-system";
import { notesDir, dataDir } from "@/constants/paths";
import { Category } from "@/types/category";
import { NotesMetadata } from "@/types/note";
import * as Crypto from "expo-crypto";

// the notes file  Document/slate-data/notes.json that stores all notes metadata
const noteIndex = new File(dataDir, "notes.json");

// Initialize the file if it doesn't exist
const initializeNoteIndex = async () => {
  if (!( noteIndex.exists)) {
     noteIndex.create();
    // Initialize with empty array
     noteIndex.write(JSON.stringify([], null, 2));
  }
};

// Read and parse notes array
const readNotesArray = async (): Promise<NotesMetadata[]> => {
  try {
    await initializeNoteIndex();
    const content = await noteIndex.text();
    
    if (!content || content.trim() === '') {
      return [];
    }
    
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (parseError) {
      console.error('Error parsing notes JSON:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
};

// Write notes array to file
const writeNotesArray = async (notes: NotesMetadata[]): Promise<void> => {
  try {
     noteIndex.write(JSON.stringify(notes, null, 2));
  } catch (error) {
    console.error('Error writing notes:', error);
    throw error;
  }
};

// Save note metadata
const saveNoteMeta = async (metadata: NotesMetadata): Promise<void> => {
  try {
    // Get existing notes
    const notes = await readNotesArray();
    
    // Check if note already exists (update) or push new
    const existingIndex = notes.findIndex(note => note.id === metadata.id);
    
    if (existingIndex !== -1) {
      // Update existing note
      notes[existingIndex] = { 
        ...notes[existingIndex], 
        ...metadata,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Add new note
      notes.push({
        ...metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    // Write back to file
    await writeNotesArray(notes);
  } catch (error) {
    console.error('Error saving note metadata:', error);
    throw error;
  }
};

// Create a new note file
const createNoteFile = async (
  title: string, 
  content: string, 
  category: Category
): Promise<string> => {
  try {
    // Generate unique ID
    const id = Crypto.randomUUID();
    const file = new File(notesDir, id);
    
    // Create file if it doesn't exist
    if (!( file.exists)) {
       file.create();
    }
    
    // Write the file content
    file.write(`##${title}\n---\n${content}`);
    
    // Save metadata
    const metadata: NotesMetadata = {
      id,
      title,
      category,
      filePath: `${notesDir}/${id}`,
      favorite: false,
      pinned: false,
      archived: false,
      trash: false,
      dirty: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await saveNoteMeta(metadata);
    
    return id;
  } catch (error) {
    console.error('Error creating note file:', error);
    throw error;
  }
};

// Update an existing note file
const updateNoteFile = async (
  fileId: string,
  title: string,
  content: string,
  category: Category
): Promise<void> => {
  try {
    const nFile = new File(notesDir, fileId);
    
    // Check if file exists
    if (!( nFile.exists)) {
      throw new Error(`Note file ${fileId} does not exist`);
    }
    
    // Update the file content
     nFile.write(`##${title}\n---\n${content}`);
    
    // Update metadata
    const metadata: NotesMetadata = {
      id: fileId,
      title,
      category,
      favorite: false,
        pinned: false,
        archived: false,
    trash: false,
    dirty: false,
      filePath: `${notesDir}/${fileId}`,
      updatedAt: new Date().toISOString()
    };
    
    await saveNoteMeta(metadata);
  } catch (error) {
    console.error('Error updating note file:', error);
    throw error;
  }
};

// Read a note file
const readNoteFile = async (fileId: string): Promise<string> => {
  try {
    const rFile = new File(notesDir, fileId);
    
    if (!(rFile.exists)) {
      throw new Error(`Note file ${fileId} does not exist`);
    }
    
    return await rFile.text();
  } catch (error) {
    console.error('Error reading note file:', error);
    throw error;
  }
};

// Delete a note file
const deleteFile = async (fileId: string): Promise<void> => {
  try {
    const dFile = new File(notesDir, fileId);
    
    if (dFile.exists) {
       dFile.delete();
      
      // Also remove from metadata
      const notes = await readNotesArray();
      const filteredNotes = notes.filter(note => note.id !== fileId);
      
      if (filteredNotes.length !== notes.length) {
        await writeNotesArray(filteredNotes);
      }
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Utility function to get all note metadata
const getAllNotesMetadata = async (): Promise<NotesMetadata[]> => {
  return await readNotesArray();
};

// Utility function to get a single note by ID
const getNoteById = async (id: string): Promise<NotesMetadata | null> => {
  const notes = await readNotesArray();
  return notes.find(note => note.id === id) || null;
};

export {
  createNoteFile,
  updateNoteFile,
  readNoteFile,
  deleteFile,
  getAllNotesMetadata,
  getNoteById,
  saveNoteMeta,
  initializeNoteIndex
};