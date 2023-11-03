/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __decorate } from 'tslib';
import cx from 'classnames';
import React__default from 'react';
import { observer } from 'mobx-react';
import camelCase from 'lodash/camelCase';
import { FormItem } from 'amis';
import { isNumeric } from 'amis-editor-core';
import { isAuto } from '../../util.js';

/**
 * @file  InsetBoxModel
 * @description 盒模型控件，支持编辑 top、right、bottom、left
 */
function InsetBoxModel(_a) {
    var value = _a.value, onChange = _a.onChange;
    var directions = ['left', 'right', 'top', 'bottom'];
    function handleChange(styleName) {
        return function (e) {
            var _a, _b;
            var inputValue = e.target.value;
            if (!inputValue) {
                onChange(__assign(__assign({}, value), (_a = {}, _a[styleName] = '', _a)));
                return;
            }
            // 数字类型或带有合法单位的字符串都支持
            if (isNumeric(inputValue) ||
                isAuto(inputValue) ||
                /^(-?(\d*\.)?\d+)((px)|(em)|(%)|(ex)|(ch)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(cm)|(mm)|(in)|(pt)|(pc))$/.test(inputValue)) {
                onChange(__assign(__assign({}, value), (_b = {}, _b[styleName] = inputValue, _b)));
            }
        };
    }
    function renderBoxItem(item) {
        return (React__default.createElement(React__default.Fragment, null,
            directions.map(function (direction) {
                var propsName = camelCase("".concat(item, "-").concat(direction));
                return (React__default.createElement("input", { key: propsName, placeholder: "0", className: "ae-BoxModel-input ".concat(direction), type: "text", onChange: handleChange(propsName), value: (value === null || value === void 0 ? void 0 : value[propsName]) || '' }));
            }),
            React__default.createElement("div", { className: "ae-BoxModel-title" }, item.toUpperCase()),
            ['lt', 'lb', 'rt', 'rb'].map(function (position) { return (React__default.createElement("div", { key: position, className: cx('ae-BoxModel-line', position) })); })));
    }
    return (React__default.createElement("div", { className: "mx-2 ae-BoxModel" },
        React__default.createElement("div", { className: "ae-BoxModel-inner" }),
        renderBoxItem('inset')));
}
observer(InsetBoxModel);
/** @class */ ((function (_super) {
    __extends(BoxModelRenderer, _super);
    function BoxModelRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxModelRenderer.prototype.render = function () {
        return React__default.createElement(InsetBoxModel, __assign({}, this.props));
    };
    BoxModelRenderer = __decorate([
        FormItem({ type: 'inset-box-model' })
    ], BoxModelRenderer);
    return BoxModelRenderer;
})(React__default.Component));
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
