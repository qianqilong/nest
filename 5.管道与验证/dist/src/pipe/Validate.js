"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const common_1 = require("@nestjs/common");
class validate extends common_1.ValidationPipe {
    mapChildrenToValidationErrors(error, parentPath) {
        const errors = super.mapChildrenToValidationErrors(error, parentPath);
        errors.map((error) => {
            for (const key in error.constraints) {
                error.constraints[key] = error.property + ':' + error.constraints[key];
            }
        });
        return errors;
    }
}
exports.validate = validate;
//# sourceMappingURL=Validate.js.map