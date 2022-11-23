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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const isConfirmed_rule_1 = require("./rules/isConfirmed.rule");
const isNoExists_rule_1 = require("./rules/isNoExists.rule");
class UserinfoDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '用户名不能为空！' }),
    (0, isNoExists_rule_1.IsNoExists)('user', { message: '用户已经存在！' }),
    __metadata("design:type", String)
], UserinfoDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '密码不能为空！' }),
    (0, class_validator_1.Validate)(isConfirmed_rule_1.IsConfirmed, { message: '确认密码输入错误！' }),
    __metadata("design:type", String)
], UserinfoDTO.prototype, "password", void 0);
exports.default = UserinfoDTO;
//# sourceMappingURL=user.dto.js.map