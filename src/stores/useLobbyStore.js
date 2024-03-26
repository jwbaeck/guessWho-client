import { create } from "zustand";

const useLobbyStore = create(set => ({
  users: [],
  isLiar: null,
  currentUserId: null,
  setUsers: users => set(() => ({ users })),
  setIsLiar: isLiar => set({ isLiar }),
  setCurrentUserId: currentUserId => set({ currentUserId }),
  addUser: user => set(state => ({ users: [...state.users, user] })),
  updateUserStream: (userId, stream) =>
    set(state => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, stream, hasEntered: true } : user,
      ),
    })),
  usersCount: () => set(state => state.users.length),
  setUserEntered: (userId, hasEntered) =>
    set(state => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, hasEntered } : user,
      ),
    })),
}));

export default useLobbyStore;
