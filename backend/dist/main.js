"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
<<<<<<< HEAD
=======
const cookieParser = require("cookie-parser");
>>>>>>> implement the sockets successfully
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });
<<<<<<< HEAD
=======
    app.use(cookieParser());
>>>>>>> implement the sockets successfully
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map