import { create } from "zustand";

const useGameResultStore = create(set => ({
  isLiarCorrectlyIdentified: false,
  votes: {},
  topVotedUserId: null,
  setGameResult: result => set(() => result),
}));

export default useGameResultStore;
