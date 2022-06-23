const App = require('../dist/index.js');
const checkClass = require('../dist/index.js');
const fs = require('fs');


jest.mock("fs");
describe('index.js', () => {
  it('should be defined', () => {
    expect(App).toBeDefined();
  });
});

test('checkClass', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-06-22T09:09:00'));
  let data = JSON.parse(`{
    "days": [
      {
        "day": "Monday",
        "class": [
          {
            "name": "วิทยาศาสตร์",
            "time_start": "08:20:00",
            "time_end": "09:10:00"
          },
          {
            "name": "วิทยาศาสตร์",
            "time_start": "09:10:00",
            "time_end": "10:00:00"
          },
          {
            "name": "คณิตศาสตร์",
            "time_start": "10:00:00",
            "time_end": "10:50:00"
          },
  
          {
            "name": "ภาษาไทย",
            "time_start": "10:50:00",
            "time_end": "11:40:00"
          },
          { "name": "พัก", "time_start": "11:40:00", "time_end": "12:30:00" },
          {
            "name": "ฟิสิกส์เพิ่มเติม",
            "time_start": "12:30:00",
            "time_end": "13:20:00"
          },
          {
            "name": "ฟิสิกส์เพิ่มเติม",
            "time_start": "13:20:00",
            "time_end": "14:10:00"
          },
          {
            "name": "โครงงานวิทยาศาสตร์",
            "time_start": "14:10:00",
            "time_end": "15:00:00"
          },
          {
            "name": "โครงงานวิทยาศาสตร์",
            "time_start": "15:00:00",
            "time_end": "15:50:00"
          }
        ]
      },
      {
        "day": "Tuesday",
        "class": [
          {
            "name": "สังคมศึกษา",
            "time_start": "08:20:00",
            "time_end": "09:10:00"
          },
          {
            "name": "บาสเกตบอล",
            "time_start": "09:10:00",
            "time_end": "10:00:00"
          },
          {
            "name": "ภาษาอังกฤษอ่านเขียน",
            "time_start": "10:00:00",
            "time_end": "10:50:00"
          },
  
          {
            "name": "สุขศึกษา",
            "time_start": "10:50:00",
            "time_end": "11:40:00"
          },
          { "name": "พัก", "time_start": "11:40:00", "time_end": "12:30:00" },
          {
            "name": "เคมี",
            "time_start": "12:30:00",
            "time_end": "13:20:00"
          },
          {
            "name": "วิทยาศาสตร์พื้นฐาน",
            "time_start": "13:20:00",
            "time_end": "14:10:00"
          },
          {
            "name": "การงาน",
            "time_start": "14:10:00",
            "time_end": "15:00:00"
          },
          {
            "name": "IS",
            "time_start": "15:00:00",
            "time_end": "15:50:00"
          }
        ]
      },
      {
        "day": "Wednesday",
        "class": [
          {
            "name": "ชีววิทยา",
            "time_start": "08:20:00",
            "time_end": "09:10:00"
          },
          {
            "name": "ชีววิทยา",
            "time_start": "09:10:00",
            "time_end": "10:00:00"
          },
          {
            "name": "ภาษาไทย",
            "time_start": "10:00:00",
            "time_end": "10:50:00"
          },
  
          {
            "name": "ประวัติศาสตร์",
            "time_start": "10:50:00",
            "time_end": "11:40:00"
          },
          { "name": "พัก", "time_start": "11:40:00", "time_end": "12:30:00" },
          {
            "name": "คณิตศาสตร์เพิ่มเติม",
            "time_start": "12:30:00",
            "time_end": "13:20:00"
          },
          {
            "name": "ภาษาอังกฤษ",
            "time_start": "13:20:00",
            "time_end": "14:10:00"
          },
          {
            "name": "คอมพิวเตอร์ประยุกต์",
            "time_start": "14:10:00",
            "time_end": "15:00:00"
          },
          {
            "name": "ศิลปะ",
            "time_start": "15:00:00",
            "time_end": "15:50:00"
          }
        ]
      },
      {
        "day": "Thursday",
        "class": [
          {
            "name": "คณิตศาสตร์เพิ่มเติม",
            "time_start": "08:20:00",
            "time_end": "09:10:00"
          },
          {
            "name": "ภาษาอังกฤษ",
            "time_start": "09:10:00",
            "time_end": "10:00:00"
          },
          {
            "name": "เคมี",
            "time_start": "10:00:00",
            "time_end": "10:50:00"
          },
  
          {
            "name": "เคมี",
            "time_start": "10:50:00",
            "time_end": "11:40:00"
          },
          { "name": "พัก", "time_start": "11:40:00", "time_end": "12:30:00" },
          {
            "name": "ชีววิทยา",
            "time_start": "12:30:00",
            "time_end": "13:20:00"
          },
          {
            "name": "ภาษาอังกฤษอ่านเขียน",
            "time_start": "13:20:00",
            "time_end": "14:10:00"
          },
          {
            "name": "แนะแนว",
            "time_start": "14:10:00",
            "time_end": "15:00:00"
          },
          {
            "name": "IS",
            "time_start": "15:00:00",
            "time_end": "15:50:00"
          }
        ]
      },
      {
        "day": "Friday",
        "class": [
          {
            "name": "ฟิสิกส์เพิ่มเติม",
            "time_start": "08:20:00",
            "time_end": "09:10:00"
          },
          {
            "name": "ฟิสิกส์เพิ่มเติม",
            "time_start": "09:10:00",
            "time_end": "10:00:00"
          },
          {
            "name": "คณิตศาสตร์เพิ่มเติม",
            "time_start": "10:00:00",
            "time_end": "10:50:00"
          }
        ]
      }
    ]
  }
  `);
  expect(checkClass(data)).toBe(69);
})