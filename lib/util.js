/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var amis = require('amis');
var isString = require('lodash/isString');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isString__default = /*#__PURE__*/_interopDefaultLegacy(isString);

/**
 * 布局配置项，数值设置时需要
 */
var isAuto = function (value) {
    if (value && isString__default["default"](value) && /^((a)|(au)|(aut)|(auto))$/.test(value)) {
        return true;
    }
    return false;
};
/**
 * 用于列表类展示组件在 filterProps 中获取编辑态 value 值
 */
var resolveArrayDatasource = function (_a, defaultSource) {
    var data = _a.data, value = _a.value, source = _a.source;
    if (defaultSource === void 0) { defaultSource = '$items'; }
    return Array.isArray(value)
        ? value
        : // resolveVariable 不支持 ${items} 格式，导致预览态无数据
            amis.resolveVariableAndFilter(typeof source === 'string' ? source : defaultSource, data, '| raw');
};
var schemaToArray = function (value) {
    return value && Array.isArray(value) ? value : [value];
};
var schemaArrayFormat = function (value) {
    return value && Array.isArray(value) && value.length === 1 ? value[0] : value;
};
/**
 * 解析选项值类型
 * @param options
 * @returns
 */
var resolveOptionType = function (options) {
    var _a;
    if (!options) {
        return 'string';
    }
    // 默认options内选项是同类型
    var option = options[0];
    if (typeof option === 'object') {
        option = amis.findTree(options, function (item) { return item.value !== undefined; });
    }
    var value = (_a = option === null || option === void 0 ? void 0 : option.value) !== null && _a !== void 0 ? _a : option;
    return value !== undefined ? typeof value : 'string';
};
/**
 * 将组件配置里面的公式进行转义，一般是文本组件编辑器里直接显示公式所用
 *
 * @param conf 组件schema 配置
 * @param keys 转义的字段key列表
 * @returns 转义后的配置
 */
function escapeFormula(conf, keys) {
    if (keys === void 0) { keys = ['tpl']; }
    return amis.JSONValueMap(conf, function (value, key) {
        if (keys.includes(String(key)) && /(^|[^\\])\$\{.+\}/.test(value)) {
            return value.replace(/\${/g, ' \\${');
        }
        return value;
    });
}

exports.escapeFormula = escapeFormula;
exports.isAuto = isAuto;
exports.resolveArrayDatasource = resolveArrayDatasource;
exports.resolveOptionType = resolveOptionType;
exports.schemaArrayFormat = schemaArrayFormat;
exports.schemaToArray = schemaToArray;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
