export const getAllValues = (obj: object): string[] =>
	Object.values(obj).flatMap(value =>
		typeof value === 'object' ? getAllValues(value) : value
	)
