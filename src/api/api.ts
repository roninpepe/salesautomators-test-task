import APIEndpoint from 'api/endpoint';
import { EAPIEndpoint } from 'enums/api';
import { newDealRequestBody } from 'mock/api';

export default class API {
	static deals = new APIEndpoint(EAPIEndpoint.Deals, {
		get: null,
		post: newDealRequestBody
	});

	static users = new APIEndpoint(EAPIEndpoint.Users, {
		get: null
	});
}
