/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * @file InputRangeValue
 * @description 滑块组件默认值控件
 */
var InputRangeValue = function (props) {
    var _a;
    var cx = props.classnames, _b = props.minField, minField = _b === void 0 ? 'min' : _b, _c = props.maxField, maxField = _c === void 0 ? 'max' : _c, ctx = props.data, name = props.name, onChange = props.onChange, value = props.value, render = props.render;
    var key = 'InputRangeValue';
    var joinValues = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.joinValues) !== null && _a !== void 0 ? _a : true;
    /** delimiter变化需要重新计算默认值 */
    var delimiter = (ctx === null || ctx === void 0 ? void 0 : ctx.delimiter) || ',';
    var extraName = ctx === null || ctx === void 0 ? void 0 : ctx.extraName;
    /** 转化成对象格式 */
    var pipeInValue = React.useCallback(function (value) {
        var _a, _b, _c;
        if (!value) {
            return _a = {}, _a[minField] = undefined, _a[maxField] = undefined, _a;
        }
        if (typeof value === 'string') {
            var _d = tslib.__read(value.split(delimiter), 2), lhs = _d[0], rhs = _d[1];
            return _b = {}, _b[minField] = lhs, _b[maxField] = rhs, _b;
        }
        else if (Array.isArray(value)) {
            return _c = {}, _c[minField] = value[0], _c[maxField] = value[1], _c;
        }
        else {
            return value;
        }
    }, [minField, maxField, delimiter, value, joinValues, extraName]);
    var handleSubmit = React.useCallback(function (value, action) {
        var _a;
        var updatedValue = value;
        if (value[minField] == null || value[maxField] == null) {
            return;
        }
        if (extraName) {
            updatedValue = [value[minField], value[maxField]];
        }
        else {
            if (joinValues) {
                updatedValue = [value[minField], value[maxField]].join(delimiter || ',');
            }
            else {
                updatedValue = (_a = {},
                    _a[minField] = value[minField],
                    _a[maxField] = value[maxField],
                    _a);
            }
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(updatedValue);
    }, [key, minField, maxField, delimiter, joinValues, extraName, value]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null, render('input-range-value-control', {
        type: 'form',
        wrapWithPanel: false,
        panelClassName: 'border-none shadow-none mb-0',
        bodyClassName: 'p-none',
        actionsClassName: 'border-none mt-2.5',
        wrapperComponent: 'div',
        formLazyChange: true,
        preventEnterSubmit: true,
        submitOnChange: true,
        body: [
            {
                label: false,
                type: 'input-group',
                name: key,
                className: cx('ae-InputRangeValue-input-group'),
                body: [
                    {
                        type: 'input-number',
                        validations: 'isNumeric',
                        name: minField,
                        value: 0
                    },
                    {
                        type: 'html',
                        html: '-',
                        className: cx('ae-InputRangeValue-input-group-delimiter')
                    },
                    {
                        type: 'input-number',
                        validations: 'isNumeric',
                        name: maxField,
                        value: 100
                    }
                ]
            }
        ]
    }, {
        data: name ? pipeInValue(ctx[name]) : {},
        onSubmit: handleSubmit
    })));
};
InputRangeValue.defaultProps = {
    minField: 'min',
    maxField: 'max'
};
/** @class */ ((function (_super) {
    tslib.__extends(InputRangeValueRenderer, _super);
    function InputRangeValueRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputRangeValueRenderer.prototype.render = function () {
        return React__default["default"].createElement(InputRangeValue, tslib.__assign({}, this.props));
    };
    InputRangeValueRenderer = tslib.__decorate([
        amis.FormItem({ type: 'ae-input-range-value' })
    ], InputRangeValueRenderer);
    return InputRangeValueRenderer;
})(React__default["default"].Component));
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
