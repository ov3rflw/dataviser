// stores/userStore.js
import { create } from 'zustand';
import { io } from 'socket.io-client';

let socket = null;

const useUserStore = create((set, get) => ({
  users: [],
  loading: true,
  
  initialize: async () => {
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
      set({ users: JSON.parse(cachedUsers), loading: false });
    }
    
    await get().fetchUsers();
    
    if (!socket) {
      socket = io('http://localhost:3001/');
      
      socket.on('new_user_available', (newUser) => {
        console.log('Nouvel utilisateur disponible:', newUser);
        get().addUser(newUser);
      });
      
      socket.on('user_deleted', (userId) => {
        get().removeUser(userId);
      });
    }
  },
  
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/userList');
      if (!response.ok) throw new Error('Erreur réseau');
      
      const data = await response.json();
      set({ users: data, loading: false });
      
      localStorage.setItem('users', JSON.stringify(data));
      localStorage.setItem('usersLastUpdated', new Date().toISOString());
    } catch (error) {
      console.error('Erreur de chargement des utilisateurs:', error);
      set({ loading: false });
    }
  },
  
  addUser: (newUser) => {
    const { users } = get();
    
    if (users.some(user => user.id === newUser.id)) {
      return;
    }
    
    const updatedUsers = [...users, newUser];
    set({ users: updatedUsers });
    
    // Mettre à jour le cache
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  },
  
  removeUser: (userId) => {
    const { users } = get();
    const updatedUsers = users.filter(user => user.id !== userId);
    
    set({ users: updatedUsers });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  },

  // utilisé par customDatePicker
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },
  
  cleanup: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
}));

export default useUserStore;