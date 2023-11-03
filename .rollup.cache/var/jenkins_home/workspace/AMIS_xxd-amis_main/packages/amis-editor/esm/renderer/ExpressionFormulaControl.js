/**
 * @file 表达式输入框组件
 */
import { __assign, __awaiter, __decorate, __extends, __generator, __metadata, __rest } from "tslib";
import React from 'react';
import { autobind } from 'amis-core';
import cx from 'classnames';
import { FormItem, Button, Icon, PickerContainer } from 'amis';
import { FormulaEditor } from 'amis-ui';
import { renderFormulaValue } from './FormulaControl';
import { reaction } from 'mobx';
import { getVariables } from 'amis-editor-core';
var ExpressionFormulaControl = /** @class */ (function (_super) {
    __extends(ExpressionFormulaControl, _super);
    function ExpressionFormulaControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            variables: [],
            formulaPickerValue: ''
        };
        return _this;
    }
    ExpressionFormulaControl.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editorStore;
            var _this = this;
            return __generator(this, function (_a) {
                this.initFormulaPickerValue(this.props.value);
                editorStore = window.editorStore;
                this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
                this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
                this.unReaction = reaction(function () { return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState; }, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
                        this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ExpressionFormulaControl.prototype.componentDidUpdate = function (prevProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (prevProps.value !== this.props.value) {
                    this.initFormulaPickerValue(this.props.value);
                }
                return [2 /*return*/];
            });
        });
    };
    ExpressionFormulaControl.prototype.componentWillUnmount = function () {
        var _a;
        this.isUnmount = true;
        (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    ExpressionFormulaControl.prototype.initFormulaPickerValue = function (value) {
        var formulaPickerValue = (value === null || value === void 0 ? void 0 : value.replace(/^\$\{(.*)\}$/, function (match, p1) { return p1; })) || '';
        this.setState({
            formulaPickerValue: formulaPickerValue
        });
    };
    ExpressionFormulaControl.prototype.handleConfirm = function (value) {
        var _a, _b;
        if (value === void 0) { value = ''; }
        var expressionReg = /^\$\{(.*)\}$/;
        value = value.replace(/\r\n|\r|\n/g, ' ');
        if (value && !expressionReg.test(value)) {
            value = "${".concat(value, "}");
        }
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    ExpressionFormulaControl.prototype.handleClearExpression = function (e) {
        var _a, _b;
        e.stopPropagation();
        e.preventDefault();
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, '');
    };
    ExpressionFormulaControl.prototype.handleOnClick = function (e, onClick) {
        return __awaiter(this, void 0, void 0, function () {
            var variablesArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getVariables(this)];
                    case 1:
                        variablesArr = _a.sent();
                        this.setState({
                            variables: variablesArr
                        });
                        return [2 /*return*/, onClick === null || onClick === void 0 ? void 0 : onClick(e)];
                }
            });
        });
    };
    ExpressionFormulaControl.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, value = _c.value, className = _c.className, variableMode = _c.variableMode, header = _c.header, size = _c.size, rest = __rest(_c, ["value", "className", "variableMode", "header", "size"]);
        var _d = this.state, formulaPickerValue = _d.formulaPickerValue, variables = _d.variables;
        var highlightValue = FormulaEditor.highlightValue(formulaPickerValue, variables) || {
            html: formulaPickerValue
        };
        // 自身字段
        var selfName = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.name;
        return (React.createElement("div", { className: cx('ae-ExpressionFormulaControl', className) },
            React.createElement(PickerContainer, { showTitle: false, bodyRender: function (_a) {
                    var value = _a.value, onChange = _a.onChange;
                    return (React.createElement(FormulaEditor, __assign({}, rest, { evalMode: true, variableMode: variableMode, variables: variables, header: header || '表达式', value: formulaPickerValue, onChange: onChange, selfVariableName: selfName })));
                }, value: formulaPickerValue, onConfirm: this.handleConfirm, size: size !== null && size !== void 0 ? size : 'lg' }, function (_a) {
                var onClick = _a.onClick;
                return formulaPickerValue ? (React.createElement(Button, { className: "btn-configured", tooltip: {
                        placement: 'top',
                        tooltipTheme: 'dark',
                        mouseLeaveDelay: 20,
                        content: value,
                        tooltipClassName: 'btn-configured-tooltip',
                        children: function () { return renderFormulaValue(highlightValue); }
                    }, onClick: function (e) { return _this.handleOnClick(e, onClick); } },
                    renderFormulaValue(highlightValue),
                    React.createElement(Icon, { icon: "input-clear", className: "icon", onClick: _this.handleClearExpression }))) : (React.createElement(React.Fragment, null,
                    React.createElement(Button, { className: "btn-set-expression", onClick: function (e) { return _this.handleOnClick(e, onClick); } }, "\u70B9\u51FB\u7F16\u5199\u8868\u8FBE\u5F0F")));
            })));
    };
    ExpressionFormulaControl.defaultProps = {
        variableMode: 'tree',
        requiredDataPropsVariables: false,
        evalMode: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ExpressionFormulaControl.prototype, "initFormulaPickerValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ExpressionFormulaControl.prototype, "handleConfirm", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ExpressionFormulaControl.prototype, "handleClearExpression", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Function]),
        __metadata("design:returntype", Promise)
    ], ExpressionFormulaControl.prototype, "handleOnClick", null);
    return ExpressionFormulaControl;
}(React.Component));
export default ExpressionFormulaControl;
var ExpressionFormulaControlRenderer = /** @class */ (function (_super) {
    __extends(ExpressionFormulaControlRenderer, _super);
    function ExpressionFormulaControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionFormulaControlRenderer = __decorate([
        FormItem({
            type: 'ae-expressionFormulaControl'
        })
    ], ExpressionFormulaControlRenderer);
    return ExpressionFormulaControlRenderer;
}(ExpressionFormulaControl));
export { ExpressionFormulaControlRenderer };
