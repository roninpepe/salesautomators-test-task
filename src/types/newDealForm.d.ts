interface IFieldsClient {
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
}
interface IFieldsJob {
	type: EJobType;
	source: EJobSource;
	description?: string;
}
interface IFieldsLocation {
	address: { label: string };
	area: EArea;
}
interface IFieldsSchedule {
	date: string;
	time_start: string;
	time_end: string;
	technician: number;
}

export interface IFields
	extends IFieldsClient,
		IFieldsJob,
		IFieldsLocation,
		IFieldsSchedule {}
