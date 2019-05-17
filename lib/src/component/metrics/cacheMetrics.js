"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var formatter_1 = require("../../formatter");
var reactstrap_1 = require("reactstrap");
var CacheMetrics = /** @class */ (function (_super) {
    __extends(CacheMetrics, _super);
    function CacheMetrics() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterNaN = function (input) { return (isNaN(input) ? 0 : input); };
        return _this;
    }
    CacheMetrics.prototype.render = function () {
        var _this = this;
        var _a = this.props, cacheMetrics = _a.cacheMetrics, twoDigitAfterPointFormat = _a.twoDigitAfterPointFormat;
        return (React.createElement("div", null,
            React.createElement("h3", null, "Ehcache statistics"),
            React.createElement(reactstrap_1.Table, null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Cache Name"),
                        React.createElement("th", null, "Cache Hits"),
                        React.createElement("th", null, "Cache Misses"),
                        React.createElement("th", null, "Cache Gets"),
                        React.createElement("th", null, "Cache Hit %"),
                        React.createElement("th", null, "Cache Miss %"))),
                React.createElement("tbody", null, Object.keys(cacheMetrics).map(function (key) { return (React.createElement("tr", { key: key },
                    React.createElement("td", null, key),
                    React.createElement("td", null, cacheMetrics[key]['cache.gets.hit']),
                    React.createElement("td", null, cacheMetrics[key]['cache.gets.miss']),
                    React.createElement("td", null, cacheMetrics[key]['cache.gets.miss'] + cacheMetrics[key]['cache.gets.hit']),
                    React.createElement("td", null,
                        React.createElement(formatter_1.TextFormat, { value: _this.filterNaN(100 *
                                cacheMetrics[key]['cache.gets.hit'] /
                                (cacheMetrics[key]['cache.gets.hit'] + cacheMetrics[key]['cache.gets.miss'])), type: "number", format: twoDigitAfterPointFormat })),
                    React.createElement("td", null,
                        React.createElement(formatter_1.TextFormat, { value: _this.filterNaN(100 *
                                cacheMetrics[key]['cache.gets.miss'] /
                                (cacheMetrics[key]['cache.gets.hit'] + cacheMetrics[key]['cache.gets.miss'])), type: "number", format: twoDigitAfterPointFormat })))); })))));
    };
    return CacheMetrics;
}(React.Component));
exports.CacheMetrics = CacheMetrics;
//# sourceMappingURL=cacheMetrics.js.map