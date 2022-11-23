"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const mockjs_1 = require("mockjs");
const prisma = new client_1.PrismaClient();
async function run() {
    await prisma.article.create({
        data: {
            title: mockjs_1.Random.ctitle(),
            content: mockjs_1.Random.cparagraph(10, 50),
        },
    });
    await prisma.user.create({
        data: {
            username: 'admin',
            password: '123456',
        },
    });
}
run();
//# sourceMappingURL=seed.js.map