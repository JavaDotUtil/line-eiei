export interface Class {
	name: string;
	time_start: string;
	time_end: string;
}

export interface Day {
	day: string;
	class: Class[];
}
export interface timetable {
	days: Day[];
}
export interface names {
	names: person[];
}
export interface person {
	name: string;
	reply: string;
}