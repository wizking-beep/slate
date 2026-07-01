import {create} from "zustand";
import { persist } from "zustand/middleware";
import  { Category } from "@/types/category";
import {dataDir,notesDir} from "@/constants/paths";
import {readTagsArray} from "@/services/tagsOp";


interface StorageState {
    categories: Category[];
    initialiseStorage: () => void;
    addCategory: (category: Category) => void;
    removeCategory: (categoryId: string) => void;
    updateCategory: (categoryId: string, updatedCategory: Partial<Category>) => void;
    
    }

    const handleAddCategory = (categories: Category[], category: Category): Partial<StorageState> => {
        const existingCategory = categories.find((cat) => cat.label.toLowerCase() === category.label.toLowerCase());
        if (existingCategory) {
            // If the category already exists, update it instead of adding a new one
            return {
                categories: categories.map((cat) =>
                    cat.label.toLowerCase() === category.label.toLowerCase() ? { ...cat, ...category } : cat
                ),
            };
        }
        return { categories: [...categories, category] };
    }

    const handleRemoveCategory = (categories: Category[], categoryId: string): Partial<StorageState> => {
        return { categories: categories.filter((cat) => cat.id !== categoryId) };
    }


const useStorage = create<StorageState>()(
    persist(
        (set) => ({
            categories: [],
            initialiseStorage: () => {
                if(!dataDir.exists){
                    dataDir.create({intermediates:true})
                }

                if(!notesDir.exists){
                    notesDir.create({intermediates:true})
                }
            },
            addCategory: (category) => set((state) => handleAddCategory(state.categories, category)),
            removeCategory: (categoryId) => set((state) => handleRemoveCategory(state.categories, categoryId)),
            updateCategory: (categoryId, updatedCategory) =>
                set((state) => ({
                    categories: state.categories.map((cat) =>
                        cat.id === categoryId ? { ...cat, ...updatedCategory } : cat
                    ),
                })),
        }),
        {
            name: "storage-state", // unique name for the storage
        }
    )
);

    // Load data asynchronously after store is created
    readTagsArray().then((tagArray) => {
    useStorage.setState({ categories: tagArray });
    }).catch((error) => {
    console.error("Failed to load tags:", error);
    });

export default useStorage;