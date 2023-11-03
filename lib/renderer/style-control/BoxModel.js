/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var cx = require('classnames');
var React = require('react');
var mobxReact = require('mobx-react');
var camelCase = require('lodash/camelCase');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var util = require('../../util.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var camelCase__default = /*#__PURE__*/_interopDefaultLegacy(camelCase);

/**
 * @file  BoxModel
 * @description 盒模型控件，支持编辑 margin & padding
 */
function BoxModel(_a) {
    var value = _a.value, onChange = _a.onChange;
    var directions = ['left', 'right', 'top', 'bottom'];
    function handleChange(styleName) {
        return function (e) {
            var _a, _b;
            var inputValue = e.target.value;
            if (!inputValue) {
                onChange(tslib.__assign(tslib.__assign({}, value), (_a = {}, _a[styleName] = undefined, _a)));
                return;
            }
            // 数字类型或带有合法单位的字符串都支持
            if (amisEditorCore.isNumeric(inputValue) ||
                util.isAuto(inputValue) ||
                /^(-?(\d*\.)?\d+)((px)|(em)|(%)|(ex)|(ch)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(cm)|(mm)|(in)|(pt)|(pc))$/.test(inputValue)) {
                onChange(tslib.__assign(tslib.__assign({}, value), (_b = {}, _b[styleName] = inputValue, _b)));
            }
        };
    }
    function renderBoxItem(item) {
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            directions.map(function (direction) {
                var propsName = camelCase__default["default"]("".concat(item, "-").concat(direction));
                return (React__default["default"].createElement("input", { key: propsName, placeholder: "0", className: "ae-BoxModel-input ".concat(direction), type: "text", onChange: handleChange(propsName), value: (value === null || value === void 0 ? void 0 : value[propsName]) || '' }));
            }),
            React__default["default"].createElement("div", { className: "ae-BoxModel-title" }, item.toUpperCase()),
            ['lt', 'lb', 'rt', 'rb'].map(function (position) { return (React__default["default"].createElement("div", { key: position, className: cx__default["default"]('ae-BoxModel-line', position) })); })));
    }
    return (React__default["default"].createElement("div", { className: "mx-2 ae-BoxModel" },
        React__default["default"].createElement("div", { className: "ae-BoxModel-inner" },
            React__default["default"].createElement("div", { className: "ae-BoxModel" },
                React__default["default"].createElement("div", { className: "ae-BoxModel-inner" }),
                renderBoxItem('padding'))),
        renderBoxItem('margin')));
}
mobxReact.observer(BoxModel);
/** @class */ ((function (_super) {
    tslib.__extends(BoxModelRenderer, _super);
    function BoxModelRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxModelRenderer.prototype.render = function () {
        return React__default["default"].createElement(BoxModel, tslib.__assign({}, this.props));
    };
    BoxModelRenderer = tslib.__decorate([
        amis.FormItem({ type: 'style-box-model' })
    ], BoxModelRenderer);
    return BoxModelRenderer;
})(React__default["default"].Component));
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
