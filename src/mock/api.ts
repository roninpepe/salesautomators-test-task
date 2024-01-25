import { EAPIFields, EArea, EJobSource, EJobType } from 'enums/_';
import { IAPIRequestBodyDeals, IUser } from 'types/_';

export const technician: IUser = {
	id: 13205625,
	name: 'Mikita Bieły',
	email: 'zhp92451@zbock.com',
	has_pic: 0,
	pic_hash: null,
	active_flag: true,
	value: 13205625
};
export const newDealRequestBody: IAPIRequestBodyDeals = {
	title: 'New test deal',
	[EAPIFields.first_name]: 'John',
	[EAPIFields.last_name]: 'Smith',
	[EAPIFields.phone]: '88005553535',
	[EAPIFields.email]: 'someone@example.com',
	[EAPIFields.type]: EJobType.Recall,
	[EAPIFields.source]: EJobSource.Pinellas,
	[EAPIFields.description]: 'Lorem ipsum',
	[EAPIFields.address]: '123 William St, New York, NY 10038, США',
	[EAPIFields.area]: EArea.Tampa,
	[EAPIFields.date]: '2035-12-31',
	[EAPIFields.time_start]: '00:00:00',
	[EAPIFields.time_end]: '23:55:00',
	[EAPIFields.technician]: technician.id
};
