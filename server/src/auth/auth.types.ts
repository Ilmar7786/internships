export interface IJWTPayload {
	id: string
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
