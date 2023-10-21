declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_URL: string;
        jwtSecrectKey: string;
        jwtRefreshTokenKey: string;
    }
}