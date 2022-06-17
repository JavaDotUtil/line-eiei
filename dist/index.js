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
Object.defineProperty(exports, "__esModule", { value: true });
// index.js
const router_1 = require("bottender/router");
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
        yield context.sendText('เอ่อ');
    });
}
module.exports = function App(context) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, router_1.router)([
            (0, router_1.text)('hi', SayHi),
            (0, router_1.text)('java', javaThing),
            (0, router_1.text)('เกินปุยมุ้ย', kernPai),
            (0, router_1.text)('ง่วง', sleepy),
            (0, router_1.text)('ตารางสอน', timeTable),
            (0, router_1.text)('*', Unknown),
        ]);
    });
};
function checkClass(timetable) {
    var hour = new Date().getHours().toString();
    var minute = new Date().getMinutes().toString();
    var weekday = new Date().getDay() - 1; //0,4
    //mock test
    //var hour: string = "10";
    //var minute: string = "20";
    //var weekday = 0; //0,4
    if (weekday > 4 || weekday < 0) {
        return undefined;
    }
    if (hour.length < 2) {
        hour = `0${hour.toString()}`;
    }
    if (minute.length < 2) {
        minute = `0${minute.toString()}`;
    }
    //mock test
    // var timestart: string[] = timetable.days[weekday].class.map(
    //   (e: Class) => e.time_start
    // );
    // var timeend: string[] = timetable.days[weekday].class.map(
    //   (e: Class) => e.time_end
    // );
    var currentClassDirty = timetable.days[weekday].class.map((subject, index) => {
        if (new Date(`1991-08-31T${subject.time_start}`) < new Date(`1991-08-31T${hour}:${minute}:00`)) {
            if (new Date(`1991-08-31T${subject.time_end}`) > new Date(`1991-08-31T${hour}:${minute}:00`)) {
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
