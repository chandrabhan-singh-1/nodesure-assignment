import { create } from "zustand";
import type { Animal } from "../types";
import { apiService } from "../lib/api";

interface AnimalStore {
  animals: Animal[];
  selectedAnimal: Animal | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAnimals: () => Promise<void>;
  selectAnimal: (id: string) => Promise<void>;
  clearError: () => void;
  updateAnimalRaisedAmount: (animalId: string, amount: number) => void;
}

export const useAnimalStore = create<AnimalStore>((set, get) => ({
  animals: [],
  selectedAnimal: null,
  loading: false,
  error: null,

  fetchAnimals: async () => {
    set({ loading: true, error: null });
    try {
      const animals = await apiService.getAllAnimals();
      set({ animals, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch animals",
        loading: false,
      });
    }
  },

  selectAnimal: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const animal = await apiService.getAnimalById(id);
      set({ selectedAnimal: animal, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch animal",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),

  updateAnimalRaisedAmount: (animalId: string, amount: number) => {
    const { animals, selectedAnimal } = get();

    // Update in animals list
    const updatedAnimals = animals.map((animal) =>
      animal._id === animalId
        ? { ...animal, raisedAmount: animal.raisedAmount + amount }
        : animal
    );

    // Update selected animal if it matches
    const updatedSelectedAnimal =
      selectedAnimal?._id === animalId
        ? {
            ...selectedAnimal,
            raisedAmount: selectedAnimal.raisedAmount + amount,
          }
        : selectedAnimal;

    set({
      animals: updatedAnimals,
      selectedAnimal: updatedSelectedAnimal,
    });
  },
}));
