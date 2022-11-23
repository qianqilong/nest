"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const client_1 = require("@prisma/client");
const mockjs_1 = require("mockjs");
const prisma = new client_1.PrismaClient();
async function user() {
    for (let i = 0; i < 20; i++) {
        await prisma.user.create({
            data: {
                email: mockjs_1.Random.email(),
                password: '123456',
                github: mockjs_1.Random.email(),
                avatar: mockjs_1.Random.image('300x300'),
            },
        });
    }
}
exports.user = user;
//# sourceMappingURL=user%20copy%202.js.map