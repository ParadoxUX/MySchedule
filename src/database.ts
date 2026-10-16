import SQLite from 'react-native-sqlite-2';
import type { Lesson, DayOfWeek } from './types';

const db = SQLite.openDatabase('schedule.db', '1.0', '', 1);

/**
 * Инициализация: создаём таблицу, если её нет.
 * Вызывать один раз при старте приложения.
 */
export function initDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS lessons (
          id TEXT PRIMARY KEY NOT NULL,
          subject TEXT NOT NULL,
          teacher TEXT,
          room TEXT,
          day TEXT NOT NULL,
          startTime TEXT NOT NULL,
          endTime TEXT NOT NULL,
          task TEXT,
          taskDone INTEGER NOT NULL DEFAULT 0
        )`,
        [],
        () => resolve(),
        (_, error) => { reject(error); return true; }
      );
    });
  });
}

export function getAllLessons(): Promise<Lesson[]> {
  return new Promise((resolve) => {
    db.transaction((txn) => {
      txn.executeSql(
        'SELECT * FROM lessons',
        [],
        (_, results) => {
          const items: Lesson[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            items.push({
              id: row.id,
              subject: row.subject,
              teacher: row.teacher ?? '',
              room: row.room ?? '',
              day: row.day as DayOfWeek,
              startTime: row.startTime,
              endTime: row.endTime,
              task: row.task ?? '',
              taskDone: row.taskDone === 1,
            });
          }
          resolve(items);
        },
        (_, error) => {
          console.warn('getAllLessons error:', error?.message);
          resolve([]);
          return true;
        }
      );
    });
  });
}

export function insertLesson(lesson: Lesson): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO lessons (id, subject, teacher, room, day, startTime, endTime, task, taskDone)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lesson.id,
          lesson.subject,
          lesson.teacher,
          lesson.room,
          lesson.day,
          lesson.startTime,
          lesson.endTime,
          lesson.task,
          lesson.taskDone ? 1 : 0,
        ],
        () => resolve(),
        (_, error) => { reject(error); return true; }
      );
    });
  });
}

export function updateLesson(lesson: Lesson): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        `UPDATE lessons SET subject = ?, teacher = ?, room = ?, day = ?,
          startTime = ?, endTime = ?, task = ?, taskDone = ? WHERE id = ?`,
        [
          lesson.subject,
          lesson.teacher,
          lesson.room,
          lesson.day,
          lesson.startTime,
          lesson.endTime,
          lesson.task,
          lesson.taskDone ? 1 : 0,
          lesson.id,
        ],
        () => resolve(),
        (_, error) => { reject(error); return true; }
      );
    });
  });
}

export function deleteLesson(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        'DELETE FROM lessons WHERE id = ?',
        [id],
        () => resolve(),
        (_, error) => { reject(error); return true; }
      );
    });
  });
}
