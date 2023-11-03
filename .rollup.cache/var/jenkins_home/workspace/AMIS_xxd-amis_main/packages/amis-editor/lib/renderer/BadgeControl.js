/**
 * @file 角标控件
 */
import { __assign, __decorate, __extends, __metadata } from "tslib";
import React from 'react';
import cx from 'classnames';
import { FormItem, Switch } from 'amis';
import { autobind, isObject, anyChanged, getI18nEnabled } from 'amis-editor-core';
import { defaultValue, tipedLabel } from 'amis-editor-core';
var BadgeControl = /** @class */ (function (_super) {
    __extends(BadgeControl, _super);
    function BadgeControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            checked: !!isObject(props === null || props === void 0 ? void 0 : props.value)
        };
        return _this;
    }
    BadgeControl.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b;
        var props = this.props;
        if (anyChanged([
            'mode',
            'text',
            'size',
            'offset',
            'position',
            'overflowCount',
            'visibleOn',
            'animation',
            'style',
            'level'
        ], (_a = prevProps === null || prevProps === void 0 ? void 0 : prevProps.value) !== null && _a !== void 0 ? _a : {}, (_b = props === null || props === void 0 ? void 0 : props.value) !== null && _b !== void 0 ? _b : {})) {
            this.setState({ checked: !!isObject(props === null || props === void 0 ? void 0 : props.value) });
        }
    };
    BadgeControl.prototype.transformBadgeValue = function () {
        var _a, _b, _c, _d;
        var _e = this.props, ctx = _e.data, node = _e.node;
        var badge = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.badge) !== null && _a !== void 0 ? _a : {};
        // 避免获取到上层的size
        var size = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.badge) === null || _b === void 0 ? void 0 : _b.size;
        if (node.type === 'button-group-select') {
            badge = (_d = (_c = ctx === null || ctx === void 0 ? void 0 : ctx.option) === null || _c === void 0 ? void 0 : _c.badge) !== null && _d !== void 0 ? _d : {};
            size = badge === null || badge === void 0 ? void 0 : badge.size;
        }
        var offset = [0, 0];
        // 转换成combo可以识别的格式
        if (Array.isArray(badge === null || badge === void 0 ? void 0 : badge.offset) && (badge === null || badge === void 0 ? void 0 : badge.offset.length) >= 2) {
            offset[0] = badge.offset[0];
            offset[1] = badge.offset[1];
        }
        return __assign(__assign({}, badge), { size: size, offset: offset });
    };
    BadgeControl.prototype.normalizeBadgeValue = function (form) {
        var _a, _b;
        var offset = isObject(form === null || form === void 0 ? void 0 : form.offset) && ((_a = form === null || form === void 0 ? void 0 : form.offset) === null || _a === void 0 ? void 0 : _a[0]) && ((_b = form === null || form === void 0 ? void 0 : form.offset) === null || _b === void 0 ? void 0 : _b[1])
            ? { offset: [form.offset[0], form.offset[1]] }
            : {};
        return __assign(__assign({}, form), offset);
    };
    BadgeControl.prototype.handleSwitchChange = function (checked) {
        var _a = this.props, onChange = _a.onChange, disabled = _a.disabled;
        if (disabled) {
            return;
        }
        this.setState({ checked: checked });
        onChange === null || onChange === void 0 ? void 0 : onChange(checked ? { mode: 'dot' } : undefined);
    };
    BadgeControl.prototype.handleSubmit = function (form, action) {
        var onBulkChange = this.props.onBulkChange;
        if ((action === null || action === void 0 ? void 0 : action.type) === 'submit') {
            onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({ badge: this.normalizeBadgeValue(form) });
        }
    };
    BadgeControl.prototype.renderBody = function () {
        var render = this.props.render;
        var data = this.transformBadgeValue();
        var i18nEnabled = getI18nEnabled();
        return render('badge-form', {
            type: 'form',
            className: 'ae-BadgeControl-form w-full',
            wrapWithPanel: false,
            panelClassName: 'border-none shadow-none mb-0',
            bodyClassName: 'p-none',
            actionsClassName: 'border-none mt-2.5',
            wrapperComponent: 'div',
            preventEnterSubmit: true,
            submitOnChange: true,
            body: [
                {
                    label: '类型',
                    name: 'mode',
                    type: 'button-group-select',
                    size: 'sm',
                    mode: 'row',
                    tiled: true,
                    className: 'ae-BadgeControl-buttonGroup',
                    inputClassName: 'flex-nowrap',
                    options: [
                        { label: '点', value: 'dot', icon: 'fa fa-circle' },
                        { label: '文字', value: 'text', icon: 'fa fa-font' },
                        { label: '缎带', value: 'ribbon', icon: 'fa fa-ribbon' }
                    ],
                    pipeIn: defaultValue('dot')
                },
                {
                    label: '文本内容',
                    name: 'text',
                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                    mode: 'row',
                    visibleOn: "data.mode !== 'dot'",
                    pipeOut: function (value) {
                        return Number.isNaN(Number(value)) || value === ''
                            ? value
                            : Number(value);
                    }
                },
                {
                    label: '主题',
                    name: 'level',
                    type: 'button-group-select',
                    size: 'sm',
                    mode: 'row',
                    tiled: true,
                    className: 'ae-BadgeControl-buttonGroup',
                    inputClassName: 'flex-nowrap',
                    options: [
                        { label: '成功', value: 'success' },
                        { label: '警告', value: 'warning' },
                        { label: '危险', value: 'danger' },
                        { label: '信息', value: 'info' }
                    ],
                    pipeIn: defaultValue('danger')
                },
                {
                    label: '位置',
                    name: 'position',
                    type: 'button-group-select',
                    size: 'sm',
                    mode: 'row',
                    tiled: true,
                    className: 'ae-BadgeControl-buttonGroup',
                    inputClassName: 'flex-nowrap',
                    options: [
                        {
                            label: '',
                            value: 'top-left',
                            icon: 'fa fa-long-arrow-alt-up',
                            className: 'ae-BadgeControl-position--antiClockwise'
                        },
                        {
                            label: '',
                            value: 'top-right',
                            icon: 'fa fa-long-arrow-alt-up',
                            className: 'ae-BadgeControl-position--clockwise'
                        },
                        {
                            label: '',
                            value: 'bottom-left',
                            icon: 'fa fa-long-arrow-alt-down',
                            className: 'ae-BadgeControl-position--clockwise'
                        },
                        {
                            label: '',
                            value: 'bottom-right',
                            icon: 'fa fa-long-arrow-alt-down',
                            className: 'ae-BadgeControl-position--antiClockwise'
                        }
                    ],
                    pipeIn: defaultValue('top-right')
                },
                {
                    type: 'input-group',
                    mode: 'row',
                    inputClassName: 'inline-flex justify-right flex-row-reverse',
                    label: tipedLabel('偏移量', '角标位置相对”水平“、”垂直“的偏移量'),
                    body: [
                        {
                            type: 'input-number',
                            name: 'offset',
                            suffix: 'px',
                            pipeIn: function (value) {
                                return Array.isArray(value) ? value[0] || 0 : 0;
                            },
                            pipeOut: function (value, oldValue, data) { return [
                                value,
                                data.offset[1]
                            ]; }
                        },
                        {
                            type: 'input-number',
                            name: 'offset',
                            suffix: 'px',
                            pipeIn: function (value) {
                                return Array.isArray(value) ? value[1] || 0 : 0;
                            },
                            pipeOut: function (value, oldValue, data) { return [
                                data.offset[0],
                                value
                            ]; }
                        }
                    ]
                },
                {
                    label: '自定义角标尺寸',
                    name: 'size',
                    type: 'switch',
                    mode: 'row',
                    inputClassName: 'inline-flex justify-between flex-row-reverse',
                    pipeIn: function (value) { return !!value; },
                    pipeOut: function (value, oldValue, data) {
                        return value
                            ? (data === null || data === void 0 ? void 0 : data.mode) === 'dot'
                                ? 6
                                : (data === null || data === void 0 ? void 0 : data.mode) === 'ribbon'
                                    ? 12
                                    : 16
                            : undefined;
                    }
                },
                {
                    label: '',
                    name: 'size',
                    type: 'input-number',
                    size: 'sm',
                    mode: 'row',
                    min: 1,
                    max: 100,
                    suffix: 'px',
                    visibleOn: 'this.size',
                    pipeIn: function (value) { return (typeof value === 'number' ? value : 0); }
                },
                {
                    label: tipedLabel('封顶数字', '尽在文本内容为数字下生效'),
                    name: 'overflowCount',
                    type: 'input-number',
                    size: 'sm',
                    mode: 'row',
                    visibleOn: "data.mode === 'text'"
                },
                {
                    label: '动画',
                    name: 'animation',
                    type: 'switch',
                    mode: 'row',
                    inputClassName: 'inline-flex justify-between flex-row-reverse'
                }
            ]
        }, {
            data: data,
            onSubmit: this.handleSubmit.bind(this)
        });
    };
    BadgeControl.prototype.render = function () {
        var _a = this.props, classPrefix = _a.classPrefix, className = _a.className, labelClassName = _a.labelClassName, label = _a.label, disabled = _a.disabled;
        var checked = this.state.checked;
        return (React.createElement("div", { className: cx('ae-BadgeControl', className) },
            React.createElement("div", { className: cx('ae-BadgeControl-switch') },
                React.createElement("label", { className: cx("".concat(classPrefix, "Form-label"), labelClassName) }, label || '角标'),
                React.createElement(Switch, { value: checked, onChange: this.handleSwitchChange, disabled: disabled })),
            checked ? this.renderBody() : null));
    };
    BadgeControl.defaultProps = {
        mode: 'dot',
        overflowCount: 99,
        position: 'top-right',
        level: 'danger',
        animation: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], BadgeControl.prototype, "handleSwitchChange", null);
    return BadgeControl;
}(React.Component));
export default BadgeControl;
var BadgeControlRenderer = /** @class */ (function (_super) {
    __extends(BadgeControlRenderer, _super);
    function BadgeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BadgeControlRenderer = __decorate([
        FormItem({ type: 'ae-badge', renderLabel: false })
    ], BadgeControlRenderer);
    return BadgeControlRenderer;
}(BadgeControl));
export { BadgeControlRenderer };
