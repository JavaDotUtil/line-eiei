
// index.js
import { router, text } from 'bottender/router';
import type { timetable, names, person } from './types';
import fs from 'fs';
import { LineContext } from 'bottender';
import humanizeDuration from "humanize-duration";
import { checkClass } from './classUtil/checkClass';
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
  let DateNow = new Date();//new Date(2022, 7, 1, 8, 20, 0);
  let data: timetable = JSON.parse(
    fs.readFileSync('./data/room.json', { encoding: 'utf8', flag: 'r' })
  );
  let currentClass = checkClass(data, DateNow); //ไอตัวนี้จะปล่อย class ออกมาตามเวลา
  if (currentClass) {
    //ถ้าทราบค่า
    //let indexWithoutBreak = currentClass.index - Math.ceil((currentClass.index / 2));
    let timeleft = (currentClass.subject.time_end.getTime() - DateNow.getTime());


    await context.sendText(`คาบตอนนี้คือ ${currentClass.subject.name}${currentClass.index !== null ? ` (${currentClass.index + 1})` : ""}
เวลา ${currentClass.subject.time_start.toLocaleTimeString('th-TH')}-${currentClass.subject.time_end.toLocaleTimeString('th-TH')}
${currentClass.subject.teacher ? "ครู " + currentClass.subject.teacher : ""}
เหลือเวลาอีก ${humanizeDuration(timeleft, { language: "th", units: ["h", "m"], round: true })}
    `);
  } else { // undefined
    await context.sendText(`ตอนนี้ไม่มีเรียน`);
  }
}

//cr.
