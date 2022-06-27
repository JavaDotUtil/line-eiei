// index.js
import { router, text } from 'bottender/router';
import type { Class, timetable, names, person } from './types';
import fs from 'fs';
//hi
async function SayHi(context) {
  await context.sendText('hi');
}

//java
async function javaThing(context) {
  await context.sendText('เท่ห์มาก');
}

//เกินปุยมุ้ย
async function kernPai(context) {
  await context.sendText('นั่นดิ');
}

//ง่วง
async function sleepy(context) {
  await context.sendText('ง่วงเหมือนกันอยากนอน');
}

//เจ้านาย
async function Jaonay(context) {
  await context.sendText("ที่รักหยุดเรื้อน");
}
//หุบปากดิ้
async function Stfu(context) {
  await context.sendText("หุบไม่ได้");
}

//เตะ
async function Kick(context) {
  await context.sendText("เตะเอ็งก่อนคนแรกเลย");
}

//จาว่าคนดี
async function IsJavaWasAGoodGuy(context) {
  await context.sendText("คนดีศรีธัญญามากครับ");
}

//ใครถาม
async function whoask(context) {
  await context.sendText("I asked");
}

//ตารางสอน
async function timeTable(context) {
  await context.sendImage({
    originalContentUrl:
      'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
    previewImageUrl:
      'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
  });
}

//Command Not Found
async function Unknown(context) {
  let names: names = JSON.parse(
    fs.readFileSync('./data/nameReply.json', { encoding: 'utf8', flag: 'r' })
  );
  let per = names.names.filter((el) => {
    return (el.name.toLowerCase() == (context.event.text as string).toLowerCase())
  })
  if (context.event.isText && per.length !== 0) {
    await context.sendText(per[0].reply);
    return;
  }
  
}
async function who(context) {
  await context.sendText('พ่อเองลูก');
  
}

module.exports = async function App(context) {
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
async function Subject(context) {
  let data: timetable = JSON.parse(
    fs.readFileSync('./data/room.json', { encoding: 'utf8', flag: 'r' })
  );
  let currentClass = checkClass(data); //ไอตัวนี้จะปล่อย class ออกมาตามเวลา
  let indexWithoutBreak = currentClass.index - Math.ceil((currentClass.index / 2));
  if (currentClass) {
    //ถ้าทราบค่า
    await context.sendText(`คาบตอนนี้คือ ${currentClass.subject.name} (${indexWithoutBreak})
    \nเวลา ${currentClass.subject.time_start}-${currentClass.subject.time_end}
    ${currentClass.subject.teacher ? "\nครู " + currentClass.subject.teacher : ""}
    `);
  } else { // undefined
    await context.sendText(`ตอนนี้ไม่มีเรียน`);
  }
}

function checkClass(
  timetable: timetable
): { subject: Class; index: number; weekday: number } | undefined {
  var hour: string = new Date().getHours().toString();
  var minute: string = new Date().getMinutes().toString();
  var weekday = new Date().getDay() - 1; //0,4

  //mock test
  //hour = "08";
  //minute = "51";
  //weekday = 0; //0,4

  if (weekday > 4 || weekday < 0) {
    return undefined;
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
  var currentClassDirty = timetable.days[weekday].class.map(
    (subject: Class, index: number) => {
      if (
        new Date(`1991-08-31T${subject.time_start}`) <
        new Date(`1991-08-31T${hour}:${minute}:00`)
      ) {
        if (
          new Date(`1991-08-31T${subject.time_end}`) >
          new Date(`1991-08-31T${hour}:${minute}:00`)
        ) {
          return { subject, index, weekday };
        }
        return;
      }
      return;
    }
  );
  //console.log(c);

  currentClassDirty = currentClassDirty.filter((e) => e !== undefined);

  //console.log(c);
  if (currentClassDirty !== undefined) {
    if (currentClassDirty.length != 0) {
      //console.log("hidd")

      return currentClassDirty[0];
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}
//cr.
