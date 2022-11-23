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
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let ConfigService = class ConfigService {
    constructor(options, config = {}) {
        this.options = options;
        this.config = config;
        (0, fs_1.readdirSync)(options.path).map(async (file) => {
            if (file.slice(-2) === 'js') {
                const module = await Promise.resolve().then(() => require((0, path_1.join)(options.path, file)));
                this.config = Object.assign(Object.assign({}, this.config), module.default());
            }
        });
    }
    get(path) {
        return path.split('.').reduce((pre, item) => {
            return pre[item];
        }, this.config);
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('options')),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, Object])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map