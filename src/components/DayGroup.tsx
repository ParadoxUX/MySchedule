import type { Lesson, DayOfWeek } from "../types";
import { DAYS } from "../types";
import LessonCard from "./LessonCard";

interface DayGroupProps {
  day: DayOfWeek;
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
}

export default function DayGroup({ day, lessons, onEdit }: DayGroupProps) {
  const today = new Date();

  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const isToday = DAYS[todayIndex]?.key === day;
  const dayLabel = DAYS.find((d) => d.key === day)?.label ?? day;

  return (
    <section className="mb-6">
      <h2
        className={`text-sm font-semibold uppercase tracking-wide mb-3
                ${isToday ? "text-blue-600" : "text-gray-400"}
                `}
      >
        {dayLabel}
        {isToday && <span className="ml-2 text-xs">(сегодня)</span>}
      </h2>
      {lessons.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Занятий нет</p>
      ) : (
        lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onEdit={onEdit} />
        ))
      )}
    </section>
  );
}
