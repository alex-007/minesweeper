export type Action<P> = {
	type: string;
	payload?: P | Error;
	error?: boolean;
}

export enum ActionStatus {
	Started,
	Completed,
	Failed
}
