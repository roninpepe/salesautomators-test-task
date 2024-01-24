export enum EAPIEndpointMethods {
	GET = 'GET',
	POST = 'POST'
}

export enum EAPIFields {
	// Client details
	first_name = '6a6e24e54afdadef2546ee2f0e4138c76b6114f0',
	last_name = '3e7e0443460e38d05861a378d4aaf61525b45e82',
	phone = '1c1f664e0c2f1dd67e672952984c1df8e5b3ac9e',
	email = 'e3200394778ff68902e308c4c170675cf17e3452',
	// Job details
	type = 'd4002dd7f32cff2bcac03290a3af115ca1d35c9b',
	source = '5c689a2cb2679782cc74ab12fdbca70c76719033',
	description = '3c0dbf06f2a017a9e7662e56c41d5ab1a82675a6',
	// Service location
	addres = '93accd14f4daf923b39eb7819d049cd5e6ee1c5e',
	area = '99447659e02022674c1c87a574f485395d175e50',
	// Scheduled
	date = 'df988f19e7204a746b6f17873549b772dff4d103',
	time_start = '5396cddfceb5c3a992aa94f2cd396667e4376100',
	time_end = 'dcbf88fc2e69e6fb70bffc2b9bf9d7c57bca648c',
	technician = 'e43ca6358b90472447a86edbdd480540099ca9f4'
}

export enum EArea {
	Tampa = 'Tampa Bay',
	Miami = 'Miami',
	Orlando = 'Orlando',
	Houston = 'Houston',
	Charlotte = 'Charlotte',
	Austin = 'Austin'
}
export enum EJobType {
	Recall = 'Recall Job',
	Smth = 'smth'
}
export enum EJobSource {
	Pinellas = 'GL Pinellas',
	Smth = 'smth'
}

export enum EAPIEndpoint {
	Deals = 'deals',
	Users = 'users'
}
