import APIConfiguration from 'api/conf';
import { EAPIEndpoint, EAPIEndpointMethods } from 'enums/_';
import { IAPIMethods } from 'types/_';

export default class APIEndpoint {
	private url: string;

	private headers: HeadersInit = {
		'Content-Type': 'application/json;charset=utf-8'
	};

	public get;

	public post;

	constructor(endpoint: EAPIEndpoint, methods: IAPIMethods) {
		this.url = `https://${APIConfiguration.baseUrl}/${endpoint}?api_token=${APIConfiguration.token}`;

		if (methods.get !== undefined) {
			this.get = async (requestBody?: typeof methods.get) => {
				const body = requestBody ? JSON.stringify(requestBody) : undefined;
				const options: RequestInit = {
					...{
						method: EAPIEndpointMethods.GET,
						headers: this.headers,
						body: body
					}
				};

				const res = await fetch(this.url, options);
				const json = await res.json();
				return json.data;
			};
		}

		if (methods.post !== undefined) {
			this.post = async (requestBody: typeof methods.post) => {
				const body = requestBody ? JSON.stringify(requestBody) : undefined;
				const options: RequestInit = {
					...{
						method: EAPIEndpointMethods.POST,
						headers: this.headers,
						body: body
					}
				};

				const res = await fetch(this.url, options);
				const json = await res.json();
				return json.data;
			};
		}
	}
}
