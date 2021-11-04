import { bool, cleanEnv, host, num, port, str, } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        JWT_SECRET: str(),
        JWT_TIMEOUT_DURATION: str(),
        JWT_SALT: num({ default: 12 }),
        // MONGO_PASSWORD: str(),
        // MONGO_PATH: str(),
        // MONGO_USER: str(),
        TYPEORM_CONNECTION: str(),
        TYPEORM_HOST: host(),
        TYPEORM_PORT: port(),
        TYPEORM_USERNAME: str(),
        TYPEORM_PASSWORD: str(),
        TYPEORM_DATABASE: str(),
        TYPEORM_SYNCHRONIZE: bool(),
        TYPEORM_LOGGING: bool(),
        TYPEORM_ENTITIES: str(),
        PORT: port(),
    });
}

export default validateEnv;