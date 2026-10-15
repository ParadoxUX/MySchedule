import { useAppDispatch } from "../store/hooks";
import { deleteLesson, toggleTaskDone } from "../store/lessonsSlice";
import type { Lesson } from "../types";

interface LessonCardProps {
  lesson: Lesson;
  onEdit: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson, onEdit }: LessonCardProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {lesson.startTime} - {lesson.endTime}
        </span>
      </div>
      <h3 className="text-lg font-medium text-gray-900">{lesson.subject}</h3>
      <p className="text-sm text-gray-500">{lesson.teacher}</p>
      <p className="text-sm text-gray-600 mt-2">Кабинет: {lesson.room}</p>

      {lesson.task && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Задание</p>
          <p
            className={`text-sm ${
              lesson.taskDone ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {lesson.task}
          </p>
        </div>
      )}
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        {lesson.task && (
          <button
            onClick={() => dispatch(toggleTaskDone(lesson.id))}
            className="text-xs px-3 py-1 rounded bg-green-50 text-green-700 font-medium"
          >
            {lesson.taskDone ? "Снять отметку" : "Выполнено"}
          </button>
        )}
        <button
          onClick={() => onEdit(lesson)}
          className="text-xs px-3 py-1 rounded bg-gray-50 text-green-700 font-medium"
        >
          Редактировать
        </button>
        <button
          onClick={() => dispatch(deleteLesson(lesson.id))}
          className="text-xs px-3 py-1 rounded bg-red-50 text-red-600 font-medium"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
