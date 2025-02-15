import { create } from 'zustand';

const useContactStore = create((set) => ({
  contacts: [],
  isLoading: true,
  fetchContacts: async () => {
    try {
      const cachedContacts = localStorage.getItem('contacts');
      if (cachedContacts) {
        set({ contacts: JSON.parse(cachedContacts), isLoading: false });
      } else {
        const response = await fetch('/api/userList');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.users && Array.isArray(data.users)) {
          set({ contacts: data || [], isLoading: false });
          localStorage.setItem('contacts', JSON.stringify(data.users));
        } else {
          console.error('Unexpected data format:', data);
          set({ isLoading: false });
        }
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      set({ isLoading: false });
    }
  },
}));

export default useContactStore;
