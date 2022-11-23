"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function create(count = 1, callback) {
    for (let i = 0; i < count; i++) {
        callback(prisma);
    }
}
exports.create = create;
//# sourceMappingURL=helper.js.map