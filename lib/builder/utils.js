/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var isObjectLike = require('lodash/isObjectLike');
var constants = require('./constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isObjectLike__default = /*#__PURE__*/_interopDefaultLegacy(isObjectLike);

/**
 * @file utils
 * @desc builder用到的 utils
 */
var getFeatValueByKey = function (feat) {
    var _a;
    return "".concat((_a = constants.DSFeature === null || constants.DSFeature === void 0 ? void 0 : constants.DSFeature[feat]) === null || _a === void 0 ? void 0 : _a.value);
};
var getFeatLabelByKey = function (feat) {
    var _a;
    return "".concat((_a = constants.DSFeature === null || constants.DSFeature === void 0 ? void 0 : constants.DSFeature[feat]) === null || _a === void 0 ? void 0 : _a.label);
};
var _traverseSchemaDeep = function (schema, mapper, cache) {
    var e_1, _a;
    if (cache === void 0) { cache = new WeakMap(); }
    var target = {};
    if (cache.has(schema)) {
        return cache.get(schema);
    }
    cache.set(schema, target);
    var mapArray = function (arr) {
        return arr.map(function (item) {
            return isObjectLike__default["default"](item)
                ? _traverseSchemaDeep(item, mapper, cache)
                : item;
        });
    };
    if (Array.isArray(schema)) {
        return mapArray(schema);
    }
    try {
        for (var _b = tslib.__values(Object.entries(schema)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = tslib.__read(_c.value, 2), key = _d[0], value = _d[1];
            var result = mapper(key, value, schema);
            var _e = tslib.__read(result, 2), updatedKey = _e[0], updatedValue = _e[1];
            if (updatedKey === '__proto__') {
                continue;
            }
            if (isObjectLike__default["default"](updatedValue)) {
                updatedValue = Array.isArray(updatedValue)
                    ? mapArray(updatedValue)
                    : _traverseSchemaDeep(updatedValue, mapper, cache);
            }
            target[updatedKey] = updatedValue;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return target;
};
var traverseSchemaDeep = function (schema, mapper) {
    if (!isObjectLike__default["default"](schema)) {
        return schema;
    }
    if (Array.isArray(schema)) {
        return schema;
    }
    return _traverseSchemaDeep(schema, mapper);
};
/** CRUD列类型转 Form 表单类型 */
var displayType2inputType = function (inputType) {
    if (!inputType || typeof inputType !== 'string') {
        return inputType;
    }
    var map = {
        tpl: 'input-text',
        image: 'input-image',
        date: 'input-date',
        progress: 'input-number',
        status: 'tag',
        mapping: 'tag',
        list: 'input-table'
    };
    return map.hasOwnProperty(inputType) ? map[inputType] : inputType;
};

exports.displayType2inputType = displayType2inputType;
exports.getFeatLabelByKey = getFeatLabelByKey;
exports.getFeatValueByKey = getFeatValueByKey;
exports.traverseSchemaDeep = traverseSchemaDeep;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
