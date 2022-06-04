
// index.js
const { router, text } = require('bottender/router');
//ใช้ // เพื่อคอมเมนต์
async function SayHi(context) {
  await context.sendText('hi');
}

async function Unknown(context) {
  await context.sendText('ไม่รู้เรื่อง');
}

async function javathing(context) {
  await context.sendText('เท่ห์มาก');
}

async function timetable(context) {
  await context.sendImage({
    originalContentUrl: 'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
    previewImageUrl: 'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
  });
}

module.exports = async function App(context) {
  return router([text('hi', SayHi), text('java', javathing),text('ตารางสอน', timetable), text('*', Unknown)]);
};