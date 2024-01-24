import { EAPIFields, EArea, EJobSource, EJobType } from 'enums/_';
import { IUser } from 'types/_';

export interface IAPIMethods {
	post?: object | null;
	get?: object | null;
}

export interface IAPIDealsClient {
	[EAPIFields.first_name]: string;
	[EAPIFields.last_name]: string;
	[EAPIFields.phone]: string;
	[EAPIFields.email]: string;
}
export interface IAPIDealsJob {
	[EAPIFields.type]: EJobType;
	[EAPIFields.source]: EJobSource;
	[EAPIFields.description]?: string;
}
export interface IAPIDealsLocation {
	[EAPIFields.addres]: string;
	[EAPIFields.area]: EArea;
}
export interface IAPIDealsSchedule {
	[EAPIFields.date]: string;
	[EAPIFields.time_start]: string;
	[EAPIFields.time_end]: string;
	[EAPIFields.technician]: IUser;
}

export interface IAPIRequestBodyDeals
	extends IAPIDealsClient,
		IAPIDealsJob,
		IAPIDealsLocation,
		IAPIDealsSchedule {
	title: string;
}
