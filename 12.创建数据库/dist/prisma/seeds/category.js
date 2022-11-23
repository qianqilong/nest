"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const mockjs_1 = require("mockjs");
const helper_1 = require("../helper");
async function category() {
    await (0, helper_1.create)(10, async (prisma) => {
        await prisma.category.create({
            data: {
                title: mockjs_1.Random.ctitle(),
            },
        });
    });
}
exports.category = category;
//# sourceMappingURL=category.js.map