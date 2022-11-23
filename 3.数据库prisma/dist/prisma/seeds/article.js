"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.article = void 0;
const mockjs_1 = require("mockjs");
const helper_1 = require("../helper");
function article() {
    (0, helper_1.create)(100, async (prisma) => {
        await prisma.article.create({
            data: {
                title: mockjs_1.Random.ctitle(),
                content: mockjs_1.Random.cparagraph(10, 50),
                thumb: mockjs_1.Random.image('文'),
                categoryId: Math.ceil(Math.random() * 10),
            },
        });
    });
}
exports.article = article;
//# sourceMappingURL=article.js.map