import { create } from 'zustand'

export const useHabitStore = create((set) => ({
  habits: [],
  loading: false,
  setHabits: (habits) => set({ habits }),
  setLoading: (loading) => set({ loading }),
  addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
  updateHabit: (id, data) => set((state) => ({
    habits: state.habits.map(h => h._id === id ? { ...h, ...data } : h)
  })),
  removeHabit: (id) => set((state) => ({
    habits: state.habits.filter(h => h._id !== id)
  })),
}))
