"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.js
const router_1 = require("bottender/router");
const fs_1 = __importDefault(require("fs"));
//hi
function SayHi(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.sendText('hi');
    });
}
//java
function javaThing(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.sendText('เท่ห์มาก');
    });
}
//เกินปุยมุ้ย
function kernPai(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.sendText('นั่นดิ');
    });
}
//ง่วง
function sleepy(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.sendText('ง่วงเหมือนกันอยากนอน');
    });
}
//ตารางสอน
function timeTable(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.sendImage({
            originalContentUrl: 'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
            previewImageUrl: 'https://cdn.discordapp.com/attachments/981449206902456330/982667735362314320/IMG_1419.jpg',
        });
    });
}
//Command Not Found
function Unknown(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let names = JSON.parse(fs_1.default.readFileSync('./data/nameReply.json', { encoding: 'utf8', flag: 'r' }));
        let per = names.names.filter((el) => {
            return (el.name.toLowerCase() == context.event.text.toLowerCase());
        });
        if (context.event.isText && per.length !== 0) {
            yield context.sendText(per[0].reply);
            return;
        }
        yield context.sendText('เอ่อ');
    });
}
module.exports = function App(context) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, router_1.router)([
            (0, router_1.text)('hi', SayHi),
            //text('java', javaThing),
            (0, router_1.text)('เกินปุยมุ้ย', kernPai),
            (0, router_1.text)('ง่วง', sleepy),
            (0, router_1.text)('ตารางสอน', timeTable),
            (0, router_1.text)('thissubject', Subject),
            (0, router_1.text)('*', Unknown),
        ]);
    });
};
//เช็คคาบ
function Subject(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.parse(fs_1.default.readFileSync('./data/room.json', { encoding: 'utf8', flag: 'r' }));
        let currentClass = checkClass(data); //ไอตัวนี้จะปล่อย class ออกมาตามเวลา
        if (currentClass) {
            //ถ้าทราบค่า
            yield context.sendText(`คาบตอนนี้คือ ${currentClass.subject.name} (${currentClass.index})
    \nเวลา ${currentClass.subject.time_start}-${currentClass.subject.time_end}
    `);
        }
        else {
            // undefined
            yield context.sendText(`ตอนนี้ไม่มีคาบ`);
        }
    });
}
function checkClass(timetable) {
    var hour = new Date().getHours().toString();
    var minute = new Date().getMinutes().toString();
    var weekday = new Date().getDay() - 1; //0,4
    //mock test
    // hour = "10";
    // minute = "20";
    // weekday = 0; //0,4
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
    let index;
    var currentClassDirty = timetable.days[weekday].class.map((subject) => {
        if (subject.name !== 'พัก') {
            index = +1;
        }
        if (new Date(`1991-08-31T${subject.time_start}`) <
            new Date(`1991-08-31T${hour}:${minute}:00`)) {
            if (new Date(`1991-08-31T${subject.time_end}`) >
                new Date(`1991-08-31T${hour}:${minute}:00`)) {
                return { subject, index, weekday };
            }
            return;
        }
        return;
    });
    //console.log(c);
    currentClassDirty = currentClassDirty.filter((e) => e !== undefined);
    //console.log(c);
    if (currentClassDirty !== undefined) {
        if (currentClassDirty.length != 0) {
            //console.log("hidd")
            return currentClassDirty[0];
        }
        else {
            return undefined;
        }
    }
    else {
        return undefined;
    }
}
//cr.
