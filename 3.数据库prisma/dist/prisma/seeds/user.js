"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mockjs_1 = require("mockjs");
const helper_1 = require("../helper");
function user() {
    (0, helper_1.create)(30, async (prisma) => {
        await prisma.user.create({
            data: {
                email: mockjs_1.Random.email(),
                password: '123456',
                github: mockjs_1.Random.email(),
                avatar: mockjs_1.Random.image('钱'),
            },
        });
    });
}
exports.user = user;
//# sourceMappingURL=user.js.map