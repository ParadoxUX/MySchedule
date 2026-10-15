import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addLesson, updateLesson } from "../store/lessonsSlice";
import { DAYS, type DayOfWeek, type Lesson } from "../types";

interface LessonFormProps {
  editingLesson: Lesson | null;
  onClose: () => void;
}

const emptyLesson = (): Lesson => ({
  id: crypto.randomUUID(),
  subject: "",
  teacher: "",
  room: "",
  day: DAYS[0].key,
  startTime: "08:30",
  endTime: "10:10",
  task: "",
  taskDone: false,
});

export default function LessonForm({
  editingLesson,
  onClose,
}: LessonFormProps) {
  const dispatch = useAppDispatch();
  const [lesson, setLesson] = useState<Lesson>(editingLesson ?? emptyLesson());

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!lesson.subject.trim()) return;

    if (editingLesson) {
      dispatch(updateLesson(lesson));
    } else {
      dispatch(addLesson(lesson));
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 space-y-3"
      >
        <h2 className="text-lg font-bold">
          {editingLesson ? "Редактировать" : "Новое занятие"}
        </h2>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          placeholder={`Предмет`}
          value={lesson.subject}
          onChange={(event) =>
            setLesson({ ...lesson, subject: event.target.value })
          }
        />
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          placeholder={`Преподаватель`}
          value={lesson.teacher}
          onChange={(event) =>
            setLesson({ ...lesson, teacher: event.target.value })
          }
        />
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          placeholder={`Кабинет`}
          value={lesson.room}
          onChange={(event) =>
            setLesson({ ...lesson, room: event.target.value })
          }
        />
        <select
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          value={lesson.day}
          onChange={(event) =>
            setLesson({ ...lesson, day: event.target.value as DayOfWeek })
          }
        >
          {DAYS.map((d) => (
            <option key={d.key} value={d.key}>
              {d.label}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="time"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
            value={lesson.startTime}
            onChange={(event) =>
              setLesson({ ...lesson, startTime: event.target.value })
            }
          />
          <input
            type="time"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
            value={lesson.endTime}
            onChange={(event) =>
              setLesson({ ...lesson, endTime: event.target.value })
            }
          />
        </div>

        <textarea
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          placeholder="Задание"
          rows={3}
          value={lesson.task}
          onChange={(event) =>
            setLesson({ ...lesson, task: event.target.value })
          }
        ></textarea>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-100 font-medium"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-blue-100 text-white font-medium"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
