import { __decorate, __extends } from "tslib";
/**
 * @file icon按钮组
 */
import React from 'react';
import { FormItem, Button, Icon, hasIcon } from 'amis';
import cx from 'classnames';
var ButtonGroupControl = /** @class */ (function (_super) {
    __extends(ButtonGroupControl, _super);
    function ButtonGroupControl(props) {
        return _super.call(this, props) || this;
    }
    ButtonGroupControl.prototype.render = function () {
        var _a = this.props, options = _a.options, value = _a.value, onChange = _a.onChange, classnames = _a.classnames;
        var cls = classnames || cx;
        return (React.createElement("div", { className: cls('ButtonGroup', 'icon-ButtonList') }, options &&
            options.map(function (item) { return (React.createElement(Button, { key: item.value, onClick: function () { return onChange(item.value); }, level: value === item.value ? 'primary' : 'default', tooltip: item.label, active: value === item.value }, hasIcon(item.icon) ? (React.createElement(Icon, { icon: item.icon, className: cx('icon', item.iconClassName) })) : item.icon ? (React.createElement("i", { className: cx(item.icon, item.iconClassName) })) : (item.label))); })));
    };
    return ButtonGroupControl;
}(React.Component));
export default ButtonGroupControl;
var ButtonGroupControlRenderer = /** @class */ (function (_super) {
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
}(ButtonGroupControl));
export { ButtonGroupControlRenderer };
