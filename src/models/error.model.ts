export class ErrorModel {
	public statusCode: number;
	public message: any;
	public error?: any | null;

	constructor(
		statusCode: number,
		message: any,
		error?: any | null,
	) {
		this.statusCode = statusCode;
		this.message = message;
		this.error = error;
	}
}
