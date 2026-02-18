export type localStrategyResponse = {
    auth: {
        token: string
    },
    user: {
        id: number,
        name: string,
        email: string,
    }
}