/**
 * @file utils
 * @desc builder用到的 utils
 */
import { __read, __values } from "tslib";
import isObjectLike from 'lodash/isObjectLike';
import { DSFeature } from './constants';
export var getFeatValueByKey = function (feat) {
    var _a;
    return "".concat((_a = DSFeature === null || DSFeature === void 0 ? void 0 : DSFeature[feat]) === null || _a === void 0 ? void 0 : _a.value);
};
export var getFeatLabelByKey = function (feat) {
    var _a;
    return "".concat((_a = DSFeature === null || DSFeature === void 0 ? void 0 : DSFeature[feat]) === null || _a === void 0 ? void 0 : _a.label);
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
            return isObjectLike(item)
                ? _traverseSchemaDeep(item, mapper, cache)
                : item;
        });
    };
    if (Array.isArray(schema)) {
        return mapArray(schema);
    }
    try {
        for (var _b = __values(Object.entries(schema)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            var result = mapper(key, value, schema);
            var _e = __read(result, 2), updatedKey = _e[0], updatedValue = _e[1];
            if (updatedKey === '__proto__') {
                continue;
            }
            if (isObjectLike(updatedValue)) {
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
export var traverseSchemaDeep = function (schema, mapper) {
    if (!isObjectLike(schema)) {
        return schema;
    }
    if (Array.isArray(schema)) {
        return schema;
    }
    return _traverseSchemaDeep(schema, mapper);
};
/** CRUD列类型转 Form 表单类型 */
export var displayType2inputType = function (inputType) {
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
