/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var isEmpty = require('lodash/isEmpty');
var isObject = require('lodash/isObject');
var remove = require('lodash/remove');
var pickBy = require('lodash/pickBy');
var cloneDeep = require('lodash/cloneDeep');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEmpty__default = /*#__PURE__*/_interopDefaultLegacy(isEmpty);
var isObject__default = /*#__PURE__*/_interopDefaultLegacy(isObject);
var remove__default = /*#__PURE__*/_interopDefaultLegacy(remove);
var pickBy__default = /*#__PURE__*/_interopDefaultLegacy(pickBy);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

function findAndUpdate(arr, compareFn, target) {
    if (!target) {
        return arr;
    }
    var result = cloneDeep__default["default"](arr);
    var idx = result.findIndex(function (item) { return compareFn(item); });
    if (~idx) {
        result.splice(idx, 1, target);
    }
    return result;
}
/** 深度删除 */
var deepRemove = function (obj, predicate, checkAll) {
    if (checkAll === void 0) { checkAll = false; }
    var waitProcess = [obj];
    var find = false;
    var _loop_1 = function () {
        if (find) {
            return "break";
        }
        var item = waitProcess.pop();
        if (Array.isArray(item)) {
            remove__default["default"](item, function (val) {
                var res = predicate(val);
                if (res && !checkAll) {
                    find = true;
                }
                return res;
            });
            waitProcess.push.apply(waitProcess, tslib.__spreadArray([], tslib.__read(item), false));
            return "continue";
        }
        if (!isObject__default["default"](item)) {
            return "continue";
        }
        Object.entries(item).forEach(function (_a) {
            var _b = tslib.__read(_a, 2), key = _b[0], value = _b[1];
            if (isObject__default["default"](value) && predicate(value)) {
                delete item[key];
                checkAll || (find = true);
            }
            waitProcess.push(value);
        });
    };
    while (waitProcess.length) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    return find;
};
var findObj = function (obj, predicate, stop) {
    var waitProcess = [obj];
    while (waitProcess.length) {
        var item = waitProcess.shift();
        if (Array.isArray(item)) {
            waitProcess.push.apply(waitProcess, tslib.__spreadArray([], tslib.__read(item), false));
            continue;
        }
        if (!isObject__default["default"](item) || (stop && stop(item))) {
            continue;
        }
        if (predicate(item)) {
            return item;
        }
        waitProcess.push.apply(waitProcess, tslib.__spreadArray([], tslib.__read(Object.values(pickBy__default["default"](item, function (val, key) { return !String(key).startsWith('__'); }))), false));
    }
};
/** schema 中查找 */
var findSchema = function (schema, predicate) {
    var scope = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        scope[_i - 2] = arguments[_i];
    }
    if (scope.length === 0) {
        return findObj(schema, predicate);
    }
    var region = null;
    while ((region = scope.shift())) {
        var res = findObj(schema[region], predicate);
        if (res) {
            return res;
        }
    }
    return null;
};
/** headerToolbar 和 footerToolbar 布局换成 flex 包裹 container */
var addSchema2Toolbar = function (schema, content, position, align) {
    var region = "".concat(position, "Toolbar");
    var buildFlex = function (items) {
        if (items === void 0) { items = []; }
        return ({
            type: 'flex',
            items: items,
            style: {
                position: 'static'
            },
            direction: 'row',
            justify: 'flex-start',
            alignItems: 'stretch'
        });
    };
    var buildContainer = function (align, body) {
        if (body === void 0) { body = []; }
        return ({
            type: 'container',
            body: body,
            wrapperBody: false,
            style: tslib.__assign({ flexGrow: 1, flex: '1 1 auto', position: 'static', display: 'flex', flexBasis: 'auto', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'stretch' }, (align
                ? {
                    justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
                }
                : {}))
        });
    };
    if (!schema[region] ||
        isEmpty__default["default"](schema[region]) ||
        !Array.isArray(schema[region])) {
        var isArr = Array.isArray(schema[region]);
        var newSchema = buildFlex([
            buildContainer('left', isArr || !schema[region] ? [] : [schema[region]]),
            buildContainer('right')
        ]);
        (isArr && schema[region].push(newSchema)) || (schema[region] = [newSchema]);
    }
    // 尝试放到左面第一个，否则只能放外头了
    try {
        // 优先判断没有右边列的情况，避免都走到catch里造成嵌套层数过多的问题
        if (align === 'right' && schema[region][0].items.length < 2) {
            schema[region][0].items.push(buildContainer('right'));
        }
        schema[region][0].items[align === 'left' ? 0 : schema[region][0].items.length - 1].body.push(content);
    }
    catch (e) {
        var olds = tslib.__spreadArray([], tslib.__read(schema[region]), false);
        schema[region].length = 0;
        schema[region].push(buildFlex([
            buildContainer('left', olds),
            buildContainer('right', content)
        ]));
    }
};

exports.addSchema2Toolbar = addSchema2Toolbar;
exports.deepRemove = deepRemove;
exports.findAndUpdate = findAndUpdate;
exports.findObj = findObj;
exports.findSchema = findSchema;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
