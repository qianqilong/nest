"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./seeds/user");
const category_1 = require("./seeds/category");
const article_1 = require("./seeds/article");
function run() {
    (0, user_1.user)();
    (0, category_1.category)();
    (0, article_1.article)();
}
run();
//# sourceMappingURL=seed.js.map