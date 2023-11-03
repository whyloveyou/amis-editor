/**
 * @file 函数编辑器
 */
import { __assign, __decorate, __extends, __metadata, __read, __spreadArray } from "tslib";
import React from 'react';
import { autobind } from 'amis-editor-core';
import { FormItem } from 'amis';
var FunctionEditorControl = /** @class */ (function (_super) {
    __extends(FunctionEditorControl, _super);
    function FunctionEditorControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionEditorControl.prototype.onChange = function (value) {
        var _a, _b;
        if (value === void 0) { value = ''; }
        (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    // 生成tooltip 的参数
    FunctionEditorControl.prototype.genTooltipProps = function (content, othersProps) {
        var render = this.props.render;
        return __assign(__assign(__assign({ tooltipTheme: 'light', trigger: 'hover', rootClose: true, placement: 'top', tooltipClassName: 'ae-FunctionEditorControl-desc-tooltip' }, (typeof content === 'string'
            ? { content: content }
            : {
                content: ' ',
                children: function () {
                    return React.isValidElement(content)
                        ? content
                        : render('content', content);
                }
            })), (this.props.tooltipProps || {})), (othersProps || {}));
    };
    FunctionEditorControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, _b = _a.params, params = _b === void 0 ? [] : _b, allowFullscreen = _a.allowFullscreen, value = _a.value, placeholder = _a.placeholder, desc = _a.desc, mergeParams = _a.mergeParams;
        var lastParams = typeof mergeParams === 'function' ? mergeParams(params) : params;
        return (React.createElement(React.Fragment, null,
            render('api-function-editor-control-editor/0', {
                type: 'container',
                className: 'ae-FunctionEditorControl-func-header',
                body: __spreadArray(__spreadArray([
                    '<span class="mtk6">function&nbsp;</span>',
                    '<span class="mtk1 bracket-highlighting-0">(</span>'
                ], __read(lastParams
                    .map(function (_a, index) {
                    var label = _a.label, tip = _a.tip;
                    return __spreadArray([
                        __assign({ type: 'button', level: 'link', label: label, className: 'ae-FunctionEditorControl-func-arg' }, (tip ? { tooltip: _this.genTooltipProps(tip) } : {}))
                    ], __read((index === lastParams.length - 1
                        ? []
                        : ['<span class="mtk1">,&nbsp;</span>'])), false);
                })
                    .flat()), false), [
                    '<span class="mtk1 bracket-highlighting-0">)&nbsp;{</span>'
                ], false)
            }),
            render('api-function-editor-control-editor/1', {
                label: '',
                name: '__whatever_name_adpator',
                placeholder: placeholder || '',
                mode: 'normal',
                type: 'js-editor',
                className: 'ae-FunctionEditorControl-func-editor',
                allowFullscreen: allowFullscreen
            }, {
                value: value,
                onChange: this.onChange
            }),
            render('api-function-editor-control-editor/2', {
                type: 'container',
                body: '<span class="mtk1 bracket-highlighting-0">}</span>',
                className: 'ae-FunctionEditorControl-func-footer'
            })));
    };
    FunctionEditorControl.defaultProps = {
        params: []
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FunctionEditorControl.prototype, "onChange", null);
    return FunctionEditorControl;
}(React.Component));
export default FunctionEditorControl;
var FunctionEditorControlRenderer = /** @class */ (function (_super) {
    __extends(FunctionEditorControlRenderer, _super);
    function FunctionEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionEditorControlRenderer = __decorate([
        FormItem({
            type: 'ae-functionEditorControl',
            renderLabel: false
        })
    ], FunctionEditorControlRenderer);
    return FunctionEditorControlRenderer;
}(FunctionEditorControl));
export { FunctionEditorControlRenderer };
