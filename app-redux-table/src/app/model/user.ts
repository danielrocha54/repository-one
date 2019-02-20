export class User {
	private _username: string;
	private _password: string;
	private _firstname: string;
	private _lastname: string;

	constructor(username: string, password: string, firstname: string, lastname: string) {
		this._username = username;
		this._password = password;
		this._firstname = firstname;
		this._lastname = lastname;
	}

	public get username(): string {
		return this._username;
	}

	public get password(): string {
		return this._password;
	}

	public get firstname(): string {
		return this._firstname;
	}

	public get lastname(): string {
		return this._lastname;
	}
}