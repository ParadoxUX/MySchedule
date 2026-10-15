import { useState } from "react";
import { DAYS } from "../types";
import type { Lesson } from "../types";
import { useAppSelector } from "../store/hooks";
import DayGroup from "../components/DayGroup";
import LessonForm from "../components/LessonForm";

export default function ScheduleScreen() {
  const lessons = useAppSelector((state) => state.lessons.items);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Lesson | null>(null);

  function handleEdit(lesson: Lesson) {
    setEditing(lesson);
    setShowForm(true);
  }

  function handleClose() {
    setEditing(null);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">MySchedule</h1>
      </header>

      <main className="p-4">
        {DAYS.map((day) => {
          // 1. Фильтруем уроки для конкретного дня
          // 2. Сортируем их по времени начала (чтобы пары шли по порядку)
          const dayLessons = [...lessons]
            .filter((lesson) => lesson.day === day.key)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <DayGroup
              key={day.key}
              day={day.key}
              lessons={dayLessons}
              onEdit={handleEdit}
            />
          );
        })}
      </main>

      {showForm && <LessonForm editingLesson={editing} onClose={handleClose} />}
    </div>
  );
}
