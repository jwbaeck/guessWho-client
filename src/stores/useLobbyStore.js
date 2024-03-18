import { create } from "zustand";

const useLobbyStore = create(set => ({
  users: [],
  isLiar: null,
  setUsers: users => set(() => ({ users })),
  setIsLiar: isLiar => set({ isLiar }),
  addUser: user => set(state => ({ users: [...state.users, user] })),
  updateUserStream: (userId, stream) =>
    set(state => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, stream } : user,
      ),
    })),
  usersCount: () => set(state => state.users.length),
}));

export default useLobbyStore;
