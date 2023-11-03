/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * 组件专有动作选择器
 */
// 动作基本配置项
var BASE_ACTION_PROPS = [
    'actionType',
    '__actionDesc',
    'preventDefault',
    'stopPropagation',
    'expression'
    // 'outputVar'
];
var CmptActionSelect = /** @class */ (function (_super) {
    tslib.__extends(CmptActionSelect, _super);
    function CmptActionSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CmptActionSelect.prototype.onChange = function (option) {
        var formStore = this.props.formStore;
        var removeKeys = {};
        // 保留必须字段，其他过滤掉
        Object.keys(formStore.data).forEach(function (key) {
            if (!tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(BASE_ACTION_PROPS), false), [
                'componentId',
                '__rendererName',
                '__cmptTreeSource',
                '__cmptId'
            ], false).includes(key)) {
                removeKeys[key] = undefined;
            }
        });
        formStore.setValues(tslib.__assign(tslib.__assign({}, removeKeys), { args: undefined, groupType: option.value, __cmptActionDesc: option.description }));
        this.props.onChange(option.value);
    };
    CmptActionSelect.prototype.render = function () {
        var _a = this.props, data = _a.data, formStore = _a.formStore;
        // 根据type 从组件树中获取actions
        var actions = data.pluginActions[data.__rendererName] || [];
        return (React__default["default"].createElement(amis.Select, { value: formStore.data.groupType, className: "cmpt-action-select", options: actions.map(function (item) { return ({
                label: item.actionLabel,
                value: item.actionType,
                description: item.description
            }); }), onChange: this.onChange.bind(this), clearable: false }));
    };
    return CmptActionSelect;
}(React__default["default"].Component));

exports.BASE_ACTION_PROPS = BASE_ACTION_PROPS;
exports["default"] = CmptActionSelect;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
