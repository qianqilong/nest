"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNoExists = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
function IsNoExists(table, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsConfirmedRule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    const prisma = new client_1.PrismaClient();
                    const flag = await prisma[table].findFirst({
                        where: {
                            [args.property]: value,
                        },
                    });
                    return !Boolean(flag);
                },
            },
        });
    };
}
exports.IsNoExists = IsNoExists;
//# sourceMappingURL=isNoExists.rule.js.map