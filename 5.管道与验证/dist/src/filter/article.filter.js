"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleFilter = void 0;
const common_1 = require("@nestjs/common");
let ArticleFilter = class ArticleFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof common_1.BadRequestException) {
            const responseObject = exception.getResponse();
            return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                code: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                message: responseObject.message.map((error) => {
                    const info = error.split(':');
                    return { field: info[0], message: info[1] };
                }),
            });
        }
        return response;
    }
};
ArticleFilter = __decorate([
    (0, common_1.Catch)()
], ArticleFilter);
exports.ArticleFilter = ArticleFilter;
//# sourceMappingURL=article.filter.js.map