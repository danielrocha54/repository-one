export class Car {
	private _internalId: number;
	private _year: number;
	private _manufacturer: string;
	private _model: string;

	constructor(internalId: number, year: number, manufacturer: string, model: string) {
		this._internalId = internalId;
		this._year = year;
		this._manufacturer = manufacturer;
		this._model = model;
	}

	public get internalId(): number {
		return this._internalId;
	}

	public get year(): number {
		return this._year;
	}

	public get manufacturer(): string {
		return this._manufacturer;
	}

	public get model(): string {
		return this._model;
	}
}