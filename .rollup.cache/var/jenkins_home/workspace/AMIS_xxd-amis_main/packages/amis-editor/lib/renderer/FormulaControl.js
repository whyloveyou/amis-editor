/**
 * @file 表达式控件
 */
import { __assign, __awaiter, __decorate, __extends, __generator, __metadata, __read, __rest, __spreadArray } from "tslib";
import React from 'react';
import isNumber from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import omit from 'lodash/omit';
import cx from 'classnames';
import { FormItem, Button, InputBox, Icon, ResultBox, TooltipWrapper } from 'amis';
import { FormulaExec, isExpression } from 'amis';
import { FormulaEditor } from 'amis-ui';
import FormulaPicker from './textarea-formula/FormulaPicker';
import { JSONPipeOut, autobind, translateSchema } from 'amis-editor-core';
import { reaction } from 'mobx';
import { getVariables } from 'amis-editor-core';
export var FormulaDateType;
(function (FormulaDateType) {
    FormulaDateType[FormulaDateType["NotDate"] = 0] = "NotDate";
    FormulaDateType[FormulaDateType["IsDate"] = 1] = "IsDate";
    FormulaDateType[FormulaDateType["IsRange"] = 2] = "IsRange"; // 日期时间范围类
})(FormulaDateType || (FormulaDateType = {}));
export function renderFormulaValue(item) {
    var html = { __html: typeof item === 'string' ? item : item === null || item === void 0 ? void 0 : item.html };
    // bca-disable-next-line
    return React.createElement("span", { dangerouslySetInnerHTML: html });
}
var FormulaControl = /** @class */ (function (_super) {
    __extends(FormulaControl, _super);
    function FormulaControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSimpleInputChange = function (value) {
            var _a, _b;
            var curValue = _this.outReplaceExpression(value);
            (_b = (_a = _this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, curValue);
        };
        _this.handleInputChange = function (value) {
            var _a, _b;
            (_b = (_a = _this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        };
        _this.state = {
            variables: [],
            variableMode: 'tree',
            formulaPickerOpen: false,
            loading: false
        };
        return _this;
    }
    FormulaControl.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editorStore;
            var _this = this;
            return __generator(this, function (_a) {
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
    FormulaControl.prototype.componentWillUnmount = function () {
        var _a;
        this.isUnmount = true;
        (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    /**
     * 将 ${xx}（非 \${xx}）替换成 \${xx}
     * 备注: 手动编辑时，自动处理掉 ${xx}，避免识别成 公式表达式
     */
    FormulaControl.prototype.outReplaceExpression = function (expression) {
        if (expression && isString(expression) && isExpression(expression)) {
            return expression.replace(/(^|[^\\])\$\{/g, '\\${');
        }
        return expression;
    };
    FormulaControl.prototype.inReplaceExpression = function (expression) {
        if (expression && isString(expression)) {
            return expression.replace(/\\\$\{/g, '${');
        }
        return expression;
    };
    // 根据 name 值 判断当前表达式是否 存在循环引用问题
    FormulaControl.prototype.isLoopExpression = function (expression, selfName) {
        if (!expression || !selfName || !isString(expression)) {
            return false;
        }
        var variables = [];
        try {
            variables = FormulaExec.collect(expression);
        }
        catch (e) { }
        return variables.some(function (variable) { return variable === selfName; });
    };
    /**
     * 获取rendererSchema的值
     * @returns
     */
    FormulaControl.prototype.getRendererSchemaFromProps = function (rendererSchema) {
        if (!rendererSchema) {
            rendererSchema = this.props.rendererSchema;
        }
        if (typeof rendererSchema === 'function') {
            var schema = this.props.data ? __assign({}, this.props.data) : undefined;
            return rendererSchema(schema);
        }
        else {
            return rendererSchema;
        }
    };
    // 判断是否是期望类型
    FormulaControl.prototype.isExpectType = function (value) {
        if (value === null || value === undefined) {
            return true; // 数值为空不进行类型识别
        }
        var rendererSchema = this.getRendererSchemaFromProps();
        var expectType = this.props.valueType;
        if (expectType === null || expectType === undefined) {
            return true; // expectType为空，则不进行类型识别
        }
        // 当前数据域
        var curData = this.getContextData();
        if (rendererSchema.type === 'switch' &&
            (rendererSchema.trueValue !== undefined ||
                rendererSchema.falseValue !== undefined)) {
            // 开关类型组件单独处理
            return (rendererSchema.trueValue === value ||
                rendererSchema.falseValue === value);
        }
        else if ((expectType === 'number' && isNumber(value)) ||
            (expectType === 'boolean' && isBoolean(value)) ||
            (expectType === 'object' && isPlainObject(value)) ||
            (expectType === 'array' && isArray(value))) {
            return true;
        }
        else if (isString(value)) {
            if (isExpression(value)) {
                // 根据公式运算结果判断类型
                var formulaValue = FormulaExec.formula(value, curData);
                if ((expectType === 'number' && isNumber(formulaValue)) ||
                    (expectType === 'boolean' && isBoolean(formulaValue)) ||
                    (expectType === 'object' && isPlainObject(formulaValue)) ||
                    (expectType === 'array' && isArray(formulaValue)) ||
                    (expectType === 'string' && isString(formulaValue))) {
                    return true;
                }
            }
            else if (expectType === 'string') {
                // 非公式字符串
                return true;
            }
        }
        return false;
    };
    FormulaControl.prototype.matchDate = function (str) {
        var matchDate = /^(.+)?(\+|-)(\d+)(minute|min|hour|day|week|month|year|weekday|second|millisecond)s?$/i;
        var m = matchDate.exec(str);
        return m ? (m[1] ? this.matchDate(m[1]) : true) : false;
    };
    FormulaControl.prototype.matchDateRange = function (str) {
        if (/^(now|today)$/.test(str)) {
            return true;
        }
        return this.matchDate(str);
    };
    // 日期类组件 & 是否存在快捷键判断
    FormulaControl.prototype.hasDateShortcutkey = function (str) {
        var _a;
        var DateTimeType = this.props.DateTimeType;
        if (DateTimeType === FormulaDateType.IsDate) {
            if (/^(now|today)$/.test(str)) {
                return true;
            }
            return this.matchDate(str);
        }
        else if (DateTimeType === FormulaDateType.IsRange) {
            var start_end = (_a = str === null || str === void 0 ? void 0 : str.split) === null || _a === void 0 ? void 0 : _a.call(str, ',');
            if (start_end && start_end.length === 2) {
                return (this.matchDateRange(start_end[0].trim()) &&
                    this.matchDateRange(start_end[1].trim()));
            }
        }
        // 非日期类组件使用，也直接false
        // if (DateTimeType === FormulaDateType.NotDate) {
        //   return false;
        // }
        return false;
    };
    FormulaControl.prototype.transExpr = function (str) {
        if (typeof str === 'string' &&
            (str === null || str === void 0 ? void 0 : str.slice(0, 2)) === '${' &&
            (str === null || str === void 0 ? void 0 : str.slice(-1)) === '}') {
            // 非最外层内容还存在表达式情况
            if (isExpression(str.slice(2, -1))) {
                return str;
            }
            if (str.lastIndexOf('${') > str.indexOf('}') && str.indexOf('}') > -1) {
                return str;
            }
            return str.slice(2, -1);
        }
        return str;
    };
    FormulaControl.prototype.handleConfirm = function (value) {
        var _a, _b;
        value = value.replace(/\r\n|\r|\n/g, ' ');
        var val = !value
            ? undefined
            : isExpression(value) || this.hasDateShortcutkey(value)
                ? value
                : "${".concat(value, "}");
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, val);
        this.closeFormulaPicker();
    };
    /**
     * 公式编辑器打开完成一些异步任务的加载
     */
    FormulaControl.prototype.beforeFormulaEditorOpen = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, node, manager, data, onFormulaEditorOpen, res, variables, variables, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, node = _b.node, manager = _b.manager, data = _b.data;
                        onFormulaEditorOpen = (_a = manager === null || manager === void 0 ? void 0 : manager.config) === null || _a === void 0 ? void 0 : _a.onFormulaEditorOpen;
                        this.setState({ loading: true });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        if (!(manager &&
                            onFormulaEditorOpen &&
                            typeof onFormulaEditorOpen === 'function')) return [3 /*break*/, 5];
                        return [4 /*yield*/, onFormulaEditorOpen(node, manager, data)];
                    case 2:
                        res = _c.sent();
                        if (!(res !== false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, getVariables(this)];
                    case 3:
                        variables = _c.sent();
                        this.setState({ variables: variables });
                        _c.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, getVariables(this)];
                    case 6:
                        variables = _c.sent();
                        this.setState({ variables: variables });
                        _c.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _c.sent();
                        console.error('[amis-editor] onFormulaEditorOpen failed: ', error_1 === null || error_1 === void 0 ? void 0 : error_1.stack);
                        return [3 /*break*/, 9];
                    case 9:
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    FormulaControl.prototype.handleFormulaClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.beforeFormulaEditorOpen()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        this.setState({
                            formulaPickerOpen: true
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FormulaControl.prototype.closeFormulaPicker = function () {
        this.setState({ formulaPickerOpen: false });
    };
    // 剔除掉一些用不上的属性
    FormulaControl.prototype.filterCustomRendererProps = function (rendererSchema) {
        var _a;
        var _b = this.props, data = _b.data, name = _b.name, placeholder = _b.placeholder;
        var curRendererSchema = null;
        if (rendererSchema) {
            curRendererSchema = Object.assign({}, rendererSchema, {
                type: (_a = rendererSchema.type) !== null && _a !== void 0 ? _a : data.type,
                // 目前表单项 wrapControl 还必须依赖一个 name
                // 所以这里先随便取个名字，这里渲染的时候应该是 value 控制，而不是关联 name
                name: 'FORMULA_CONTROL_PLACEHOLDER'
            });
            // 默认要剔除的字段
            var deleteProps = [
                'label',
                'id',
                '$$id',
                'className',
                'style',
                'readOnly',
                'horizontal',
                'size',
                'remark',
                'labelRemark',
                'static',
                'staticOn',
                'hidden',
                'hiddenOn',
                'visible',
                'visibleOn',
                'disabled',
                'disabledOn',
                'required',
                'requiredOn',
                'className',
                'labelClassName',
                'labelAlign',
                'inputClassName',
                'description',
                'autoUpdate',
                'prefix',
                'suffix',
                'unitOptions',
                'keyboard',
                'kilobitSeparator',
                'value',
                'inputControlClassName',
                'css',
                'validateApi',
                'themeCss',
                'onEvent',
                'embed'
            ];
            // 当前组件要剔除的字段
            if (this.props.needDeleteProps) {
                deleteProps.push.apply(deleteProps, __spreadArray([], __read(this.props.needDeleteProps), false));
            }
            if (name && name === 'min') {
                // 避免min影响自身默认值设置
                deleteProps.push('min');
            }
            if (name && name === 'max') {
                // 避免max影响自身默认值设置
                deleteProps.push('max');
            }
            curRendererSchema = omit(curRendererSchema, deleteProps);
            // 设置可清空
            curRendererSchema.clearable = true;
            // 设置统一的占位提示
            if (curRendererSchema.type === 'select') {
                !curRendererSchema.placeholder &&
                    (curRendererSchema.placeholder = '请选择静态值');
                curRendererSchema.inputClassName =
                    'ae-editor-FormulaControl-select-style';
            }
            else if (placeholder) {
                curRendererSchema.placeholder = placeholder;
            }
            else {
                curRendererSchema.placeholder = '请输入静态值';
            }
        }
        JSONPipeOut(curRendererSchema);
        // 对 schema 进行国际化翻译
        if (this.appLocale && this.appCorpusData) {
            return translateSchema(curRendererSchema, this.appCorpusData);
        }
        return curRendererSchema;
    };
    FormulaControl.prototype.getContextData = function () {
        var _a, _b, _c, _d, _e;
        var curContextData = (_c = (_b = (_a = this.props.data) === null || _a === void 0 ? void 0 : _a.__super) === null || _b === void 0 ? void 0 : _b.__props__) === null || _c === void 0 ? void 0 : _c.data;
        if (!curContextData) {
            var curComp = (_d = this.props.node) === null || _d === void 0 ? void 0 : _d.getComponent();
            if ((_e = curComp === null || curComp === void 0 ? void 0 : curComp.props) === null || _e === void 0 ? void 0 : _e.data) {
                curContextData = curComp.props.data;
            }
        }
        // 当前数据域
        return curContextData;
    };
    FormulaControl.prototype.render = function () {
        var _a;
        var _this = this;
        var _b;
        var _c = this.props, className = _c.className, label = _c.label, value = _c.value, header = _c.header, placeholder = _c.placeholder, simple = _c.simple, rendererWrapper = _c.rendererWrapper, manager = _c.manager, _d = _c.useExternalFormData, useExternalFormData = _d === void 0 ? false : _d, customFormulaPicker = _c.customFormulaPicker, _e = _c.clearable, clearable = _e === void 0 ? true : _e, render = _c.render, rest = __rest(_c, ["className", "label", "value", "header", "placeholder", "simple", "rendererWrapper", "manager", "useExternalFormData", "customFormulaPicker", "clearable", "render"]);
        var _f = this.state, formulaPickerOpen = _f.formulaPickerOpen, variables = _f.variables, variableMode = _f.variableMode, loading = _f.loading;
        var rendererSchema = this.getRendererSchemaFromProps();
        // 判断是否含有公式表达式
        var isExpr = isExpression(value);
        // 判断当前是否有循环引用，备注：非精准识别，待优化
        var isLoop = false;
        if (isExpr && (rendererSchema === null || rendererSchema === void 0 ? void 0 : rendererSchema.name)) {
            isLoop = (rendererSchema === null || rendererSchema === void 0 ? void 0 : rendererSchema.name)
                ? this.isLoopExpression(value, rendererSchema === null || rendererSchema === void 0 ? void 0 : rendererSchema.name)
                : false;
        }
        // 判断是否含有公式表达式
        // const isTypeError = !this.isExpectType(value);
        var exprValue = this.transExpr(value);
        var isError = isLoop;
        var FormulaPickerCmp = customFormulaPicker !== null && customFormulaPicker !== void 0 ? customFormulaPicker : FormulaPicker;
        var highlightValue = isExpression(value)
            ? FormulaEditor.highlightValue(exprValue, variables) || {
                html: exprValue
            }
            : value;
        // 公式表达式弹窗内容过滤
        var filterValue = isExpression(value)
            ? exprValue
            : this.hasDateShortcutkey(value)
                ? value
                : undefined;
        // 值 是表达式或日期快捷
        var isFx = !simple && (isExpr || this.hasDateShortcutkey(value));
        return (React.createElement("div", { className: cx('ae-editor-FormulaControl', isError ? 'is-has-tooltip' : '', className) },
            !simple &&
                !isExpr &&
                !this.hasDateShortcutkey(value) &&
                !rendererSchema && (React.createElement(InputBox, { className: "ae-editor-FormulaControl-input", value: this.inReplaceExpression(value), clearable: true, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : '请输入静态值', onChange: this.handleSimpleInputChange })),
            !simple &&
                !isExpr &&
                !this.hasDateShortcutkey(value) &&
                rendererSchema && (React.createElement("div", { className: cx('ae-editor-FormulaControl-custom-renderer', rendererWrapper ? 'border-wrapper' : '') }, render('inner', this.filterCustomRendererProps(rendererSchema), {
                inputOnly: true,
                value: this.inReplaceExpression(value),
                data: useExternalFormData
                    ? __assign({}, this.props.data) : {},
                onChange: this.handleSimpleInputChange,
                manager: manager
            }))),
            isFx && (React.createElement(TooltipWrapper, { trigger: "hover", placement: "top", style: { fontSize: '12px' }, tooltip: {
                    tooltipTheme: 'dark',
                    mouseLeaveDelay: 20,
                    content: exprValue,
                    children: function () { return renderFormulaValue(highlightValue); }
                } },
                React.createElement("div", { className: "ae-editor-FormulaControl-tooltipBox" },
                    React.createElement("div", { className: "ae-editor-FormulaControl-ResultBox-wrapper", onClick: this.handleFormulaClick },
                        React.createElement(ResultBox, { className: cx('ae-editor-FormulaControl-ResultBox', isError ? 'is-error' : ''), allowInput: false, value: value, result: {
                                html: this.hasDateShortcutkey(value)
                                    ? value
                                    : highlightValue === null || highlightValue === void 0 ? void 0 : highlightValue.html
                            }, itemRender: renderFormulaValue, onChange: this.handleInputChange, onResultChange: function () {
                                _this.handleInputChange(undefined);
                            } })),
                    value && (React.createElement(Icon, { icon: "input-clear", className: "input-clear-icon", onClick: function () { return _this.handleInputChange(''); } }))))),
            React.createElement(Button, { className: "ae-editor-FormulaControl-button", size: "sm", tooltip: {
                    enterable: false,
                    content: '点击配置表达式',
                    tooltipTheme: 'dark',
                    placement: 'left',
                    mouseLeaveDelay: 0
                }, onClick: this.handleFormulaClick, loading: loading },
                React.createElement(Icon, { icon: "input-fx", className: cx('ae-editor-FormulaControl-icon', 'icon', (_a = {},
                        _a['is-filled'] = !!isFx,
                        _a)) })),
            isError && (React.createElement("div", { className: "desc-msg error-msg" }, isLoop ? '当前表达式异常（存在循环引用）' : '数值类型不匹配')),
            formulaPickerOpen ? (React.createElement(FormulaPickerCmp, __assign({}, this.props, { value: filterValue, initable: true, header: header, variables: variables, variableMode: (_b = rest.variableMode) !== null && _b !== void 0 ? _b : variableMode, evalMode: true, onClose: this.closeFormulaPicker, onConfirm: this.handleConfirm }))) : null));
    };
    FormulaControl.defaultProps = {
        simple: false,
        rendererWrapper: false,
        DateTimeType: FormulaDateType.NotDate,
        requiredDataPropsVariables: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], FormulaControl.prototype, "outReplaceExpression", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], FormulaControl.prototype, "inReplaceExpression", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Boolean)
    ], FormulaControl.prototype, "isLoopExpression", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormulaControl.prototype, "getRendererSchemaFromProps", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Boolean)
    ], FormulaControl.prototype, "isExpectType", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Boolean)
    ], FormulaControl.prototype, "hasDateShortcutkey", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], FormulaControl.prototype, "transExpr", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormulaControl.prototype, "handleConfirm", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], FormulaControl.prototype, "beforeFormulaEditorOpen", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], FormulaControl.prototype, "handleFormulaClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FormulaControl.prototype, "closeFormulaPicker", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormulaControl.prototype, "filterCustomRendererProps", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FormulaControl.prototype, "getContextData", null);
    return FormulaControl;
}(React.Component));
export default FormulaControl;
var FormulaControlRenderer = /** @class */ (function (_super) {
    __extends(FormulaControlRenderer, _super);
    function FormulaControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormulaControlRenderer = __decorate([
        FormItem({
            type: 'ae-formulaControl',
            detectProps: ['rendererSchema']
        })
    ], FormulaControlRenderer);
    return FormulaControlRenderer;
}(FormulaControl));
export { FormulaControlRenderer };
