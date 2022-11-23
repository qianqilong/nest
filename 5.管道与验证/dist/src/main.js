"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const article_filter_1 = require("./filter/article.filter");
const Validate_1 = require("./pipe/Validate");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new Validate_1.validate());
    app.useGlobalFilters(new article_filter_1.ArticleFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map