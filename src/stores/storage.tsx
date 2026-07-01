import {create} from "zustand";
import { persist } from "zustand/middleware";
import  { Category } from "@/types/category";
import {dataDir,notesDir} from "@/constants/paths"


interface StorageState {
    categories: Category[];
    initialiseStorage: () => void;
    addCategory: (category: Category) => void;
    removeCategory: (categoryId: number) => void;
    updateCategory: (categoryId: number, updatedCategory: Partial<Category>) => void;
    
    }


    const handleAddCategory = (categories: Category[], category: Category): Partial<StorageState> => {
        return { categories: [...categories, category] };
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
            removeCategory: (categoryId) => set((state) => ({ categories: state.categories.filter((cat) => cat.id !== categoryId) })),
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

export default useStorage;