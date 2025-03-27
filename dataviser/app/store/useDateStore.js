import { create } from 'zustand';

const useDateStore = create((set) => ({
  selectedDate: null,

  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },
}));

export default useDateStore;
