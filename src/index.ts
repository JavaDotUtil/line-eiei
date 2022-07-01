import { ClassNativeTime } from './types';
// index.js
import { router, text } from 'bottender/router';
import type { Class, timetable, names, person } from './types';
import fs from 'fs';
import { LineContext } from 'bottender';
import humanizeDuration from "humanize-duration";
//hi
async function SayHi(context: LineContext) {
  await context.sendText('hi');
}

//java
async function javaThing(context: LineContext) {
  await context.sendText('เท่ห์มาก');
}

//เกินปุยมุ้ย
async function kernPai(context: LineContext) {
  await context.sendText('นั่นดิ');
}

//ง่วง
async function sleepy(context: LineContext) {
  await context.sendText('ง่วงเหมือนกันอยากนอน');
}

//เจ้านาย
async function Jaonay(context: LineContext) {
  await context.sendText("ที่รักหยุดเรื้อน");
}
//หุบปากดิ้
async function Stfu(context: LineContext) {
  await context.sendText("หุบไม่ได้");
}

//เตะ
async function Kick(context: LineContext) {
  await context.sendText("เตะเอ็งก่อนคนแรกเลย");
}

//จาว่าคนดี
async function IsJavaWasAGoodGuy(context: LineContext) {
  await context.sendText("คนดีศรีธัญญามากครับ");
}

//ใครถาม
async function whoask(context: LineContext) {
  await context.sendText("I asked");
}

//ตารางสอน
async function timeTable(context: LineContext) {
  await context.sendImage({
    originalContentUrl:
      'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
    previewImageUrl:
      'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
  });
}

//Command Not Found
async function Unknown(context: LineContext) {
  let names: names = JSON.parse(
    fs.readFileSync('./data/nameReply.json', { encoding: 'utf8', flag: 'r' })
  );
  let per: person[] = names.names.filter((el) => {
    return (el.name.toLowerCase() == (context.event.text as string).toLowerCase())
  })
  if (context.event.isText && per.length !== 0) {
    await context.sendText(per[0].reply);
    return;
  }

}
async function who(context: LineContext) {
  await context.sendText('พ่อเองลูก');

}

module.exports = async function App(context: LineContext) {
  return router([
    text("hi", SayHi),
    //text("java", javaThing),
    text("เกินปุยมุ้ย", kernPai),
    text("ง่วง", sleepy),
    text("ตารางสอน", timeTable),
    text("thissubject", Subject),
    text("ใครวะ", who),
    text("เจ้านาย", Jaonay),
    text("หุบปากดิ้", Stfu),
    text("เตะมันออกดิ้", Kick),
    text("จาว่าเป็นคนดีมั้ย", IsJavaWasAGoodGuy),
    text("ใครถาม", whoask),
    text("who asked", whoask),
    text("Who asked", whoask),
    text("who ask", whoask),
    text("Who ask", whoask),
    text("*", Unknown)
  ]);
};

//เช็คคาบ
async function Subject(context: LineContext) {
  let data: timetable = JSON.parse(
    fs.readFileSync('./data/room.json', { encoding: 'utf8', flag: 'r' })
  );
  let currentClass = checkClass(data); //ไอตัวนี้จะปล่อย class ออกมาตามเวลา
  if (currentClass) {
    //ถ้าทราบค่า
    //let indexWithoutBreak = currentClass.index - Math.ceil((currentClass.index / 2));
    let timeleft = (currentClass.subject.time_end.getTime() - new Date().getTime());


    await context.sendText(`คาบตอนนี้คือ ${currentClass.subject.name}${currentClass.index ? ` (${currentClass.index + 1})` : ""}
เวลา ${currentClass.subject.time_start.toLocaleTimeString('th-TH')}-${currentClass.subject.time_end.toLocaleTimeString('th-TH')}
${currentClass.subject.teacher ? "ครู " + currentClass.subject.teacher : ""}
เหลือเวลาอีก ${humanizeDuration(timeleft, { language: "th", units: ["h", "m"], round: true })}
    `);
  } else { // undefined
    await context.sendText(`ตอนนี้ไม่มีเรียน`);
  }
}

function checkClass(
  timetable: timetable
): { subject: ClassNativeTime; index: number | null; weekday: number } | null {
  var hour: string = new Date().getHours().toString();
  var minute: string = new Date().getMinutes().toString();
  var weekday = new Date().getDay() - 1; //0,4
  var dat = function () { var s = new Date(); return `${s.getFullYear()}-${('0' + (s.getMonth() + 1)).slice(-2)}-${('0' + s.getDate()).slice(-2)}` }();
  //mock test
  //hour = "14";
  //minute = "25";
  //weekday = 1; //0,4

  if (weekday > 4 || weekday < 0) {
    return null;
  }

  //เติม 0 ด้านหน้า 1 กลายเป็น 01
  if (hour.length < 2) {
    hour = `0${hour}`;
  }
  if (minute.length < 2) {
    minute = `0${minute}`;
  }

  // var timestart: string[] = timetable.days[weekday].class.map(
  //   (e: Class) => e.time_start
  // );
  // var timeend: string[] = timetable.days[weekday].class.map(
  //   (e: Class) => e.time_end
  // );

  var currentClassWithoutBreak: Class[] = timetable.days[weekday].class.filter((subject: Class) => {
    return !subject.name.includes("พัก");
  });

  var currentClassList = currentClassWithoutBreak.map((subjec: Class, index: number) => {
    let s: ClassNativeTime = {
      time_start: new Date(`${dat}T${subjec.time_start}`),
      teacher: subjec.teacher,
      name: subjec.name,
      time_end: new Date(`${dat}T${subjec.time_end}`)
    }

    return { subject: s, index, weekday };
  })
  var currentClass = currentClassList.filter((currentClass) => {
    if (
      currentClass.subject.time_start < new Date(`${dat}T${hour}:${minute}:00`)
    ) {

      if (
        currentClass.subject.time_end > new Date(`${dat}T${hour}:${minute}:00`)
      ) {
        return true;
      }
      return false;
    }
  }
  )[0];

  return currentClass ? { subject: currentClass.subject, index: currentClass.index, weekday: weekday } : null;

  // currentClassDirty = currentClassDirty.filter((e) => e !== undefined);

  // //console.log(c);
  // if (currentClassDirty !== undefined) {
  //   if (currentClassDirty.length != 0) {
  //     //console.log("hidd")

  //     return currentClassDirty[0];
  //   } else {
  //     return undefined;
  //   }
  // } else {
  //   return undefined;
  // }
}
//cr.
