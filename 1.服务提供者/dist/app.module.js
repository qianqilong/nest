"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const hd_service_1 = require("./hd/hd.service");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const config_service_1 = require("./config.service");
const db_service_1 = require("./db/db.service");
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '../.env') });
console.log(process.env.NODE_ENV);
const US = {
    provide: 'US',
    useValue: {
        name: 'nest',
    },
};
const HD = {
    provide: 'HD',
    useClass: process.env.NODE_ENV === 'development' ? hd_service_1.HdService : app_service_1.AppService,
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            HD,
            US,
            config_service_1.Configser,
            {
                provide: 'DbService',
                inject: ['Configser'],
                useFactory(configser) {
                    console.log(configser);
                    return new db_service_1.DbService(configser);
                },
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map