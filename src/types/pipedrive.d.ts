export interface IUser {
	id: number;
	name: string;
	email: string;
	has_pic: number;
	pic_hash: string | null;
	active_flag: boolean;
	value: number;
}
