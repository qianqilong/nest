"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configser = void 0;
const development_config_1 = require("./config/development.config");
const production_config_1 = require("./config/production.config");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '../.env') });
console.log(process.env.NODE_ENV);
exports.Configser = {
    provide: 'Configser',
    useValue: process.env.NODE_ENV === 'development'
        ? development_config_1.developmentConfig
        : production_config_1.productionConfig,
};
//# sourceMappingURL=config.service.js.map