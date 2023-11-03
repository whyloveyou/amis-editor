/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __decorate } from 'tslib';
import React__default from 'react';
import { Button, hasIcon, Icon, FormItem } from 'amis';
import cx from 'classnames';

var ButtonGroupControl = /** @class */ (function (_super) {
    __extends(ButtonGroupControl, _super);
    function ButtonGroupControl(props) {
        return _super.call(this, props) || this;
    }
    ButtonGroupControl.prototype.render = function () {
        var _a = this.props, options = _a.options, value = _a.value, onChange = _a.onChange, classnames = _a.classnames;
        var cls = classnames || cx;
        return (React__default.createElement("div", { className: cls('ButtonGroup', 'icon-ButtonList') }, options &&
            options.map(function (item) { return (React__default.createElement(Button, { key: item.value, onClick: function () { return onChange(item.value); }, level: value === item.value ? 'primary' : 'default', tooltip: item.label, active: value === item.value }, hasIcon(item.icon) ? (React__default.createElement(Icon, { icon: item.icon, className: cx('icon', item.iconClassName) })) : item.icon ? (React__default.createElement("i", { className: cx(item.icon, item.iconClassName) })) : (item.label))); })));
    };
    return ButtonGroupControl;
}(React__default.Component));
/** @class */ ((function (_super) {
    __extends(ButtonGroupControlRenderer, _super);
    function ButtonGroupControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupControlRenderer = __decorate([
        FormItem({
            type: 'icon-button-group'
        })
    ], ButtonGroupControlRenderer);
    return ButtonGroupControlRenderer;
})(ButtonGroupControl));

export { ButtonGroupControl as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
