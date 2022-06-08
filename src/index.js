// index.js
const { router, text } = require('bottender/router');

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
  await context.sendText('IDK');
}

module.exports = async function App(context) {
  return router([
    text('hi', SayHi),
    text('java', javaThing),
    text('เกินปุยมุ้ย', kernPai),
    text('ง่วง', sleepy),
    text('ตารางสอน', timeTable),
    text('*', Unknown),
  ]);
};
