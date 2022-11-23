"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const db_service_1 = require("./db/db.service");
let AppController = class AppController {
    constructor(appService, hdService, dbService) {
        this.appService = appService;
        this.hdService = hdService;
        this.dbService = dbService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getHd() {
        return this.hdService.findone();
    }
    getDb() {
        return this.dbService.connect();
    }
};
__decorate([
    (0, common_1.Get)('a'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('hd'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHd", null);
__decorate([
    (0, common_1.Get)('db'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getDb", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('HD')),
    __param(2, (0, common_1.Inject)('DbService')),
    __metadata("design:paramtypes", [app_service_1.AppService, Object, db_service_1.DbService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map