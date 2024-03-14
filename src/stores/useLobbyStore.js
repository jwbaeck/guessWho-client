import { create } from "zustand";

const useLobbyStore = create(set => ({
  users: [],
  isLiar: null,
  setUsers: users => set(() => ({ users })),
  setIsLiar: isLiar => set({ isLiar }),
  addUser: user => set(state => ({ users: [...state.users, user] })),
  usersCount: () => set(state => state.users.length),
}));

export default useLobbyStore;
