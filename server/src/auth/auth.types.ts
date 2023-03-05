export interface IJWTPayload {
	id: number
}

export interface IAuth {
	user: IAuthUser
	accessToken: string
}

export interface IAuthUser {
	id: number
	email: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export class Tokens implements ITokens {
	accessToken: string
	refreshToken: string
}
