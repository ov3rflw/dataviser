import { io } from 'socket.io-client';

const { createContext, useState, useEffect, useCallback, useMemo } = require("react");

export const contactContext = createContext (undefined);

export const ContactContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedDate, setSelectedDate] = useState()

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/userList');
          if (!response.ok) throw new Error('Erreur réseau');
          
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Erreur de chargement des utilisateurs:', error);
        } finally {
            setLoading(false);
        }
    }, [])

    const addUser = useCallback((newUser) => {
      if (users.some(user => user.id === newUser.id)) {
        return;
      }
      
      const updatedUsers = [...users, newUser];

      setUsers(updatedUsers);
    }, [users])

    const removeUser = useCallback((userId) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        
        setUsers(updatedUsers);
    }, [users])

    useEffect(() => {
        const cachedUsers = localStorage.getItem('users');
        if (cachedUsers) {
            setUsers(JSON.parse(cachedUsers));
            setLoading(false);
        }

        fetchUsers();

        const socket = io('http://localhost:3001/')

        socket.on('user_created', () => {
            fetchUsers()
        });
            
        socket.on('user_deleted', () => {
            fetchUsers()
        });

        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        // Mettre à jour le cache
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('usersLastUpdated', new Date().toISOString());
    }, [users])

    return(
        <contactContext.Provider value={{
            users,
            loading,
            addUser,
            removeUser
        }}>
            { children }
        </contactContext.Provider>
    )
}