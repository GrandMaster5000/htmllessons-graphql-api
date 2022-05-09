import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	async getAll() {
		return [
			{
				_id: 1,
				name: 'Tolik',
			},
		];
	}
}
