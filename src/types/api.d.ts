import { EAPIFields, EArea, EJobSource, EJobType } from 'enums/_';
import { IUser } from './pipedrive';

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
	[EAPIFields.address]: string;
	[EAPIFields.area]: EArea;
}
export interface IAPIDealsSchedule {
	[EAPIFields.date]: string;
	[EAPIFields.time_start]: string;
	[EAPIFields.time_end]: string;
	[EAPIFields.technician]: number;
}

export interface IAPIRequestBodyDeals
	extends IAPIDealsClient,
		IAPIDealsJob,
		IAPIDealsLocation,
		IAPIDealsSchedule {
	title: string;
}

export interface IAPIResponseDeals extends IAPIRequestBodyDeals {
	id: number;
	[EAPIFields.technician]: IUser;
}
