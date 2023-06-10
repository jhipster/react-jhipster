"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMetrics = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const formatter_1 = require("../../formatter");
const reactstrap_1 = require("reactstrap");
const number_utils_1 = require("../../util/number-utils");
class CacheMetrics extends react_1.default.Component {
    render() {
        const { cacheMetrics, twoDigitAfterPointFormat } = this.props;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("h3", null, "Cache statistics"),
            react_1.default.createElement(reactstrap_1.Table, null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Cache Name"),
                        react_1.default.createElement("th", null, "Cache Hits"),
                        react_1.default.createElement("th", null, "Cache Misses"),
                        react_1.default.createElement("th", null, "Cache Gets"),
                        react_1.default.createElement("th", null, "Cache Hit %"),
                        react_1.default.createElement("th", null, "Cache Miss %"))),
                react_1.default.createElement("tbody", null, Object.keys(cacheMetrics).map(key => (react_1.default.createElement("tr", { key: key },
                    react_1.default.createElement("td", null, key),
                    react_1.default.createElement("td", null, cacheMetrics[key]['cache.gets.hit']),
                    react_1.default.createElement("td", null, cacheMetrics[key]['cache.gets.miss']),
                    react_1.default.createElement("td", null, cacheMetrics[key]['cache.gets.miss'] + cacheMetrics[key]['cache.gets.hit']),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(formatter_1.TextFormat, { value: (0, number_utils_1.nanToZero)((100 * cacheMetrics[key]['cache.gets.hit']) /
                                (cacheMetrics[key]['cache.gets.hit'] + cacheMetrics[key]['cache.gets.miss'])), type: "number", format: twoDigitAfterPointFormat })),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(formatter_1.TextFormat, { value: (0, number_utils_1.nanToZero)((100 * cacheMetrics[key]['cache.gets.miss']) /
                                (cacheMetrics[key]['cache.gets.hit'] + cacheMetrics[key]['cache.gets.miss'])), type: "number", format: twoDigitAfterPointFormat })))))))));
    }
}
exports.CacheMetrics = CacheMetrics;
//# sourceMappingURL=cacheMetrics.js.map