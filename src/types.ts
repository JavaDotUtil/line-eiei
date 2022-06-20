export interface Class {
	name: string;
	time_start: string;
	time_end: string;
	teacher: string;
}

export interface Day {
	day: string;
	class: Class[];
}
export interface timetable {
	days: Day[];
}
