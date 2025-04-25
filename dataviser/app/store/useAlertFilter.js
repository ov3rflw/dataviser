import { create } from "zustand";

const useAlertFilter = create((set) => ({
    selectedFilter: null,
    
    setSelectedFilter: (filter) => {
        set({selectedFilter: filter})
    }
}));