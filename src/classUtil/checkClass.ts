
import { ClassNativeTime } from '../types';
import type { Class, timetable } from '../types';
export function checkClass(
    timetable: timetable, date: Date
  ): { subject: ClassNativeTime; index: number | null; weekday: number } | null {
    var weekday = date.getDay() - 1; //0,4
    var dmy = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    //mock test
    //hour = "14";
    //minute = "25";
    //weekday = 1; //0,4
  
    if (weekday > 4 || weekday < 0) {
      return null;
    }
  
    //เติม 0 ด้านหน้า 1 กลายเป็น 01
    let hour = ('0' + date.getHours()).slice(-2);
    let minute = ('0' + date.getMinutes()).slice(-2);
  
    // var timestart: string[] = timetable.days[weekday].class.map(
    //   (e: Class) => e.time_start
    // );
    // var timeend: string[] = timetable.days[weekday].class.map(
    //   (e: Class) => e.time_end
    // );
  
    let currentClassWithoutBreak: Class[] = timetable.days[weekday].class.filter((subject: Class) => {
      return !subject.name.includes("พัก");
    });
  
    let currentClassWithBreakList = timetable.days[weekday].class.filter((subject: Class) => {
      return subject.name.includes("พัก");
    }).map((subject: Class) => {
      return { subject: subject, index: null }
    });
  
    let currentClassList = [...currentClassWithoutBreak.map((subject: Class, index: number) => {
  
  
      return { subject: subject, index: index };
    }), ...currentClassWithBreakList].map(({ subject: subject, index: index }) => {
      let ClassNative: ClassNativeTime = {
        time_start: new Date(`${dmy}T${subject.time_start}`),
        teacher: subject.teacher,
        name: subject.name,
        time_end: new Date(`${dmy}T${subject.time_end}`)
      }
      return { subject: ClassNative, index };
    });
    let currentClass = currentClassList.filter((currentClass) => {
      if (
        currentClass.subject.time_start < new Date(`${dmy}T${hour}:${minute}:00`) &&
        currentClass.subject.time_end > new Date(`${dmy}T${hour}:${minute}:00`)
      ) {
        return true;
      }
      return false;
    }
    )[0];
    console.log(currentClass);
    return currentClass ? { subject: currentClass.subject, index: currentClass.index, weekday: weekday } : null;
  }