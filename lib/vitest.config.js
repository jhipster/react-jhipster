"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("vitest/config");
const plugin_react_1 = tslib_1.__importDefault(require("@vitejs/plugin-react"));
exports.default = (0, config_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    test: {
        setupFiles: './tests/setup.ts',
    },
});
//# sourceMappingURL=vitest.config.js.map