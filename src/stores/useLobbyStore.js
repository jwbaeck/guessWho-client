import { create } from "zustand";

const useLobbyStore = create(set => ({
  users: [],
  setUsers: users => set(() => ({ users })),
  addUser: user => set(state => ({ users: [...state.users, user] })),
  usersCount: () => set(state => state.users.length),
}));

export default useLobbyStore;
