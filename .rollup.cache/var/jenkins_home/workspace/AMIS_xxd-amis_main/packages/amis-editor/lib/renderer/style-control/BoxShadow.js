/**
 * @file 阴影
 * @description 阴影配置
 * @grammar
 * x偏移量 | y偏移量 | 阴影颜色
 * x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色
 * 插页(阴影向内) | x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色
 */
import { __assign, __decorate, __extends, __read, __spreadArray } from "tslib";
import React from 'react';
import mapValues from 'lodash/mapValues';
import { FormItem } from 'amis';
import { parseBoxShadow, normalizeBoxShadow } from './transformation';
function BoxShadow(_a) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, onChange = _a.onChange, render = _a.render;
    var boxShadowContext = mapValues(parseBoxShadow(typeof value !== 'string' ? '' : value), function (value, key, collection) {
        return key === 'color' || key === 'inset' ? value : { length: value, unit: 'px' };
    });
    // style-box-shadow组件name需要具体指定，比如style.boxShadow，否则取不到值
    var handleSubmit = function (formValue, action) {
        onChange === null || onChange === void 0 ? void 0 : onChange(normalizeBoxShadow(formValue).boxShadow);
    };
    return (React.createElement(React.Fragment, null, render('inner', {
        type: 'form',
        wrapWithPanel: false,
        panelClassName: 'border-none shadow-none mb-0',
        bodyClassName: 'p-none',
        actionsClassName: 'border-none mt-2.5',
        wrapperComponent: 'div',
        formLazyChange: true,
        preventEnterSubmit: true,
        submitOnChange: true,
        body: __spreadArray(__spreadArray([], __read([
            {
                name: 'X轴偏移量',
                field: 'x'
            },
            {
                name: 'Y轴偏移量',
                field: 'y'
            },
            {
                name: '模糊半径',
                field: 'blur'
            },
            {
                name: '扩散半径',
                field: 'spread'
            }
        ].map(function (item) { return ({
            type: 'combo',
            name: item.field,
            label: item.name,
            formClassName: 'ae-BoxShadow-group',
            items: [
                {
                    type: 'input-range',
                    label: false,
                    name: 'length',
                    max: 120,
                    min: 0,
                    step: 1
                },
                {
                    type: 'select',
                    label: false,
                    name: 'unit',
                    columnClassName: 'ae-BoxShadow-unit',
                    size: 'xs',
                    options: ['px']
                    // TODO: 暂时先支持px
                    // options: ['px', 'em', 'rem', 'vw', 'vh']
                }
            ]
        }); })), false), [
            {
                type: 'switch',
                name: 'inset',
                label: '内阴影',
                mode: 'row',
                inputClassName: 'inline-flex justify-between flex-row-reverse'
            },
            {
                type: 'input-color',
                name: 'color',
                label: '阴影颜色',
                placeholder: '设置阴影颜色',
                mode: 'row'
            }
        ], false)
    }, {
        data: boxShadowContext,
        onSubmit: handleSubmit
    })));
}
export default BoxShadow;
var BoxShadowRenderer = /** @class */ (function (_super) {
    __extends(BoxShadowRenderer, _super);
    function BoxShadowRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxShadowRenderer.prototype.render = function () {
        return React.createElement(BoxShadow, __assign({}, this.props));
    };
    BoxShadowRenderer = __decorate([
        FormItem({ type: 'style-box-shadow' })
    ], BoxShadowRenderer);
    return BoxShadowRenderer;
}(React.Component));
export { BoxShadowRenderer };
