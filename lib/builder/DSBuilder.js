/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.js');

/**
 * @file DSBuilder.ts
 * @desc 数据源配置构建器
 */
var DSBuilder = /** @class */ (function () {
    function DSBuilder(manager) {
        this.manager = manager;
    }
    Object.defineProperty(DSBuilder.prototype, "key", {
        /** 实例获取数据源的key */
        get: function () {
            return this.constructor.key;
        },
        enumerable: false,
        configurable: true
    });
    /** 获取功能场景的value */
    DSBuilder.prototype.getFeatValueByKey = function (feat) {
        return utils.getFeatValueByKey(feat);
    };
    /** 获取功能场景的label */
    DSBuilder.prototype.getFeatLabelByKey = function (feat) {
        return utils.getFeatLabelByKey(feat);
    };
    DSBuilder.prototype.filterByFeat = function (feat) {
        return feat && this.features.includes(feat);
    };
    return DSBuilder;
}());
var builderFactory = new Map();
/** 注册数据源构造器 */
var registerDSBuilder = function (klass) {
    if (builderFactory.has(klass.key)) {
        console.warn("[amis-editor][DSBuilder] duplicate DSBuilder\u300C".concat(klass.key, "\u300D"));
    }
    /** 重名覆盖 */
    builderFactory.set(klass.key, klass);
};

exports.DSBuilder = DSBuilder;
exports.builderFactory = builderFactory;
exports.registerDSBuilder = registerDSBuilder;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
