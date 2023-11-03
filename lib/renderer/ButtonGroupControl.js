/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var cx = require('classnames');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var ButtonGroupControl = /** @class */ (function (_super) {
    tslib.__extends(ButtonGroupControl, _super);
    function ButtonGroupControl(props) {
        return _super.call(this, props) || this;
    }
    ButtonGroupControl.prototype.render = function () {
        var _a = this.props, options = _a.options, value = _a.value, onChange = _a.onChange, classnames = _a.classnames;
        var cls = classnames || cx__default["default"];
        return (React__default["default"].createElement("div", { className: cls('ButtonGroup', 'icon-ButtonList') }, options &&
            options.map(function (item) { return (React__default["default"].createElement(amis.Button, { key: item.value, onClick: function () { return onChange(item.value); }, level: value === item.value ? 'primary' : 'default', tooltip: item.label, active: value === item.value }, amis.hasIcon(item.icon) ? (React__default["default"].createElement(amis.Icon, { icon: item.icon, className: cx__default["default"]('icon', item.iconClassName) })) : item.icon ? (React__default["default"].createElement("i", { className: cx__default["default"](item.icon, item.iconClassName) })) : (item.label))); })));
    };
    return ButtonGroupControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ButtonGroupControlRenderer, _super);
    function ButtonGroupControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupControlRenderer = tslib.__decorate([
        amis.FormItem({
            type: 'icon-button-group'
        })
    ], ButtonGroupControlRenderer);
    return ButtonGroupControlRenderer;
})(ButtonGroupControl));

exports["default"] = ButtonGroupControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
