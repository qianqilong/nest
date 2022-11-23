"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevModule = void 0;
const common_1 = require("@nestjs/common");
const dev_service_1 = require("./dev.service");
const dev_controller_1 = require("./dev.controller");
const hd_module_1 = require("../hd/hd.module");
let DevModule = class DevModule {
};
DevModule = __decorate([
    (0, common_1.Module)({
        imports: [hd_module_1.HdModule],
        providers: [dev_service_1.DevService],
        controllers: [dev_controller_1.DevController],
    })
], DevModule);
exports.DevModule = DevModule;
//# sourceMappingURL=dev.module.js.map