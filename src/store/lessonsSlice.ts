import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Lesson } from "../types";

interface LessonsState {
  items: Lesson[];
}

const initialState: LessonsState = {
  items: [
    {
      id: "1",
      subject: "Управление проектами",
      teacher: "Буйницкий П.Е.",
      room: "40",
      day: "wednesday",
      startTime: "08:30",
      endTime: "10:10",
      task: "",
      taskDone: false,
    },
    {
      id: "2",
      subject: "Проектирование и дизайн",
      teacher: "Буйницкий П.Е.",
      room: "40",
      day: "wednesday",
      startTime: "10:20",
      endTime: "12:00",
      task: "",
      taskDone: false,
    },
    {
      id: "3",
      subject: "Разработка кода",
      teacher: "Буйницкий П.Е.",
      room: "40",
      day: "wednesday",
      startTime: "13:00",
      endTime: "14:40",
      task: "Отправить код на GitHub",
      taskDone: false,
    },
  ],
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    addLesson(state, action: PayloadAction<Lesson>) {
      state.items.push(action.payload);
    },
    updateLesson(state, action: PayloadAction<Lesson>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteLesson(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleTaskDone(state, action: PayloadAction<string>) {
      const lesson = state.items.find((item) => item.id === action.payload);
      if (lesson) {
        lesson.taskDone = !lesson.taskDone;
      }
    },
  },
});

export const { addLesson, updateLesson, deleteLesson, toggleTaskDone } =
  lessonSlice.actions;
export default lessonSlice.reducer;
