/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var amis = require('amis');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * @file 函数编辑器
 */
var FunctionEditorControl = /** @class */ (function (_super) {
    tslib.__extends(FunctionEditorControl, _super);
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
        return tslib.__assign(tslib.__assign(tslib.__assign({ tooltipTheme: 'light', trigger: 'hover', rootClose: true, placement: 'top', tooltipClassName: 'ae-FunctionEditorControl-desc-tooltip' }, (typeof content === 'string'
            ? { content: content }
            : {
                content: ' ',
                children: function () {
                    return React__default["default"].isValidElement(content)
                        ? content
                        : render('content', content);
                }
            })), (this.props.tooltipProps || {})), (othersProps || {}));
    };
    FunctionEditorControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, _b = _a.params, params = _b === void 0 ? [] : _b, allowFullscreen = _a.allowFullscreen, value = _a.value, placeholder = _a.placeholder; _a.desc; var mergeParams = _a.mergeParams;
        var lastParams = typeof mergeParams === 'function' ? mergeParams(params) : params;
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            render('api-function-editor-control-editor/0', {
                type: 'container',
                className: 'ae-FunctionEditorControl-func-header',
                body: tslib.__spreadArray(tslib.__spreadArray([
                    '<span class="mtk6">function&nbsp;</span>',
                    '<span class="mtk1 bracket-highlighting-0">(</span>'
                ], tslib.__read(lastParams
                    .map(function (_a, index) {
                    var label = _a.label, tip = _a.tip;
                    return tslib.__spreadArray([
                        tslib.__assign({ type: 'button', level: 'link', label: label, className: 'ae-FunctionEditorControl-func-arg' }, (tip ? { tooltip: _this.genTooltipProps(tip) } : {}))
                    ], tslib.__read((index === lastParams.length - 1
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
    tslib.__decorate([
        amisEditorCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], FunctionEditorControl.prototype, "onChange", null);
    return FunctionEditorControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(FunctionEditorControlRenderer, _super);
    function FunctionEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionEditorControlRenderer = tslib.__decorate([
        amis.FormItem({
            type: 'ae-functionEditorControl',
            renderLabel: false
        })
    ], FunctionEditorControlRenderer);
    return FunctionEditorControlRenderer;
})(FunctionEditorControl));

exports["default"] = FunctionEditorControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
