/**
 * @file FieldSetting.tsx
 * @desc 脚手架中字段管理
 */
import { __assign, __awaiter, __decorate, __extends, __generator, __metadata, __read, __values } from "tslib";
import React from 'react';
import { reaction } from 'mobx';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import { isObject } from 'amis-core';
import { findDOMNode } from 'react-dom';
import { FormItem, autobind, isValidApi, normalizeApi } from 'amis-core';
import { Button, toast } from 'amis-ui';
var FieldSetting = /** @class */ (function (_super) {
    __extends(FieldSetting, _super);
    function FieldSetting(props) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, props) || this;
        _this.formRef = React.createRef();
        _this.tableRef = React.createRef();
        _this.scaffold = {
            label: '',
            name: '',
            displayType: 'tpl',
            inputType: 'input-text'
        };
        _this.debounceGenerateFields = debounce(function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.handleGenerateFields(e)];
        }); }); }, 200, { trailing: true, leading: false });
        var render = props.render, cx = props.classnames, env = props.env, config = props.config, data = props.data, renderer = props.renderer, feat = props.feat;
        var popOverContainer = (_b = (_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)) !== null && _b !== void 0 ? _b : _this.dom;
        var _c = config || {}, showDisplayType = _c.showDisplayType, showInputType = _c.showInputType;
        var isFirstStep = (data === null || data === void 0 ? void 0 : data.__step) === 0;
        _this.state = {
            loading: false,
            fields: Array.isArray(props.value) ? props.value : []
        };
        _this.reaction = reaction(function () {
            var _a;
            var ctx = (_a = props === null || props === void 0 ? void 0 : props.store) === null || _a === void 0 ? void 0 : _a.data;
            var initApi = ctx === null || ctx === void 0 ? void 0 : ctx.initApi;
            var listApi = ctx === null || ctx === void 0 ? void 0 : ctx.listApi;
            var result = '';
            try {
                result = "".concat(JSON.stringify(initApi)).concat(JSON.stringify(listApi));
            }
            catch (error) { }
            return result;
        }, function () { return _this.forceUpdate(); });
        return _this;
    }
    FieldSetting.prototype.componentDidMount = function () {
        this.dom = findDOMNode(this);
    };
    FieldSetting.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var prevValue = prevProps.value;
        var value = this.props.value;
        if (((prevValue === null || prevValue === void 0 ? void 0 : prevValue.length) !== (value === null || value === void 0 ? void 0 : value.length) || !isEqual(prevValue, value)) &&
            !isEqual(value, prevState === null || prevState === void 0 ? void 0 : prevState.fields)) {
            this.setState({
                loading: true,
                fields: Array.isArray(value) ? value : []
            });
        }
    };
    FieldSetting.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.reaction) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    FieldSetting.prototype.isFirstStep = function () {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.manager) === null || _b === void 0 ? void 0 : _b.store) === null || _c === void 0 ? void 0 : _c.scaffoldFormStep) === 0;
    };
    FieldSetting.prototype.handleTableChange = function (items) {
        if (!items || !Array.isArray(items)) {
            return;
        }
        var fields = this.state.fields.concat();
        this.handleFieldsChange(items.map(function (row) {
            var item = fields.find(function (r) { return (r === null || r === void 0 ? void 0 : r.name) === row.name; });
            return __assign(__assign({}, pick(__assign(__assign({}, item), row), ['label', 'name', 'displayType', 'inputType'])), { checked: true });
        }));
    };
    FieldSetting.prototype.handleSubmit = function (data) {
        var onSubmit = this.props.onSubmit;
        onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(data === null || data === void 0 ? void 0 : data.items);
    };
    FieldSetting.prototype.handleGenerateFields = function (e) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var _h, store, renderer, feat, env, manager, ctx, onAutoGenerateFields, scaffoldData, api, fields, error_1, schemaFilter, result, sampleRow, items, error_2;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _h = this.props, store = _h.store, renderer = _h.renderer, feat = _h.feat, env = _h.env, manager = _h.manager, ctx = _h.data, onAutoGenerateFields = _h.onAutoGenerateFields;
                        scaffoldData = store === null || store === void 0 ? void 0 : store.data;
                        api = renderer === 'form'
                            ? scaffoldData === null || scaffoldData === void 0 ? void 0 : scaffoldData.initApi
                            : renderer === 'crud'
                                ? scaffoldData === null || scaffoldData === void 0 ? void 0 : scaffoldData.listApi
                                : '';
                        if (!api || (renderer === 'form' && feat !== 'Edit')) {
                            return [2 /*return*/];
                        }
                        this.setState({ loading: true });
                        fields = [];
                        if (!(onAutoGenerateFields && typeof onAutoGenerateFields === 'function')) return [3 /*break*/, 5];
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, onAutoGenerateFields({
                                api: api,
                                props: this.props,
                                setState: this.setState
                            })];
                    case 2:
                        fields = _j.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _j.sent();
                        toast.warning((_a = error_1.message) !== null && _a !== void 0 ? _a : 'API返回格式不正确，请查看接口响应格式要求');
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        schemaFilter = (_b = manager === null || manager === void 0 ? void 0 : manager.store) === null || _b === void 0 ? void 0 : _b.schemaFilter;
                        if (schemaFilter) {
                            api = schemaFilter({
                                api: api
                            }).api;
                        }
                        _j.label = 6;
                    case 6:
                        _j.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, (env === null || env === void 0 ? void 0 : env.fetcher(api, ctx))];
                    case 7:
                        result = _j.sent();
                        if (!result.ok) {
                            toast.warning((_d = (_c = result.defaultMsg) !== null && _c !== void 0 ? _c : result.msg) !== null && _d !== void 0 ? _d : 'API返回格式不正确，请查看接口响应格式要求');
                            this.setState({ loading: false });
                            return [2 /*return*/];
                        }
                        sampleRow = void 0;
                        if (feat === 'List') {
                            items = ((_e = result.data) === null || _e === void 0 ? void 0 : _e.rows) || ((_f = result.data) === null || _f === void 0 ? void 0 : _f.items) || result.data;
                            sampleRow = items === null || items === void 0 ? void 0 : items[0];
                        }
                        else {
                            sampleRow = result.data;
                        }
                        if (sampleRow) {
                            Object.entries(sampleRow).forEach(function (_a) {
                                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                                var inputType = 'input-text';
                                if (Array.isArray(value)) {
                                    inputType = 'select';
                                }
                                else if (isObject(value)) {
                                    inputType = 'combo';
                                }
                                else if (typeof value === 'number') {
                                    inputType = 'input-number';
                                }
                                fields.push({
                                    label: key,
                                    name: key,
                                    displayType: 'tpl',
                                    inputType: inputType,
                                    checked: true
                                });
                            });
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _j.sent();
                        toast.warning((_g = error_2.message) !== null && _g !== void 0 ? _g : 'API返回格式不正确，请查看接口响应格式要求');
                        return [3 /*break*/, 9];
                    case 9:
                        fields = Array.isArray(fields) && fields.length > 0 ? fields : [];
                        this.handleFieldsChange(fields);
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    FieldSetting.prototype.handleFieldsChange = function (fields) {
        var _a;
        var _b = this.props, manager = _b.manager, fieldKeys = _b.fieldKeys, onChange = _b.onChange, onBulkChange = _b.onBulkChange, submitOnChange = _b.submitOnChange, renderer = _b.renderer, ctx = _b.data;
        var isFirstStep = this.isFirstStep();
        var scaffoldStepManipulated = (_a = manager === null || manager === void 0 ? void 0 : manager.store) === null || _a === void 0 ? void 0 : _a.scaffoldStepManipulated;
        this.setState({ fields: fields });
        if (renderer === 'form') {
            onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
        }
        else {
            if (isFirstStep) {
                /** 若未进行过下一步，则为所有 feat 字段进行初始化，否则仅修改List场景字段 */
                if (scaffoldStepManipulated) {
                    onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
                }
                else {
                    var updatedData_1 = {};
                    fieldKeys.forEach(function (fieldKey) {
                        if (!updatedData_1.hasOwnProperty(fieldKey)) {
                            updatedData_1[fieldKey] = fields;
                        }
                    });
                    onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(__assign(__assign({}, updatedData_1), { listFields: fields }), submitOnChange);
                }
            }
            else {
                onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
            }
        }
    };
    FieldSetting.prototype.renderFooter = function () {
        var _a;
        var _b = this.props, cx = _b.classnames, renderer = _b.renderer, store = _b.store, ctx = _b.data, feat = _b.feat;
        var scaffoldData = store === null || store === void 0 ? void 0 : store.data;
        var _c = scaffoldData || {}, initApi = _c.initApi, listApi = _c.listApi;
        var loading = this.state.loading;
        var fieldApi = renderer === 'form' ? initApi : renderer === 'crud' ? listApi : '';
        var isApiValid = isValidApi((_a = normalizeApi(fieldApi)) === null || _a === void 0 ? void 0 : _a.url);
        var showAutoGenBtn = (renderer === 'form' && feat === 'Edit') ||
            (renderer === 'crud' && feat === 'List' && (ctx === null || ctx === void 0 ? void 0 : ctx.__step) === 0);
        return showAutoGenBtn ? (React.createElement("div", { className: cx('ae-FieldSetting-footer', 'flex flex-row-reverse') },
            React.createElement(Button, { size: "sm", level: "link", loading: loading, disabled: !isApiValid || loading, disabledTip: {
                    content: loading
                        ? '数据处理中...'
                        : renderer === 'form'
                            ? '请先填写初始化接口'
                            : '请先填写接口',
                    tooltipTheme: 'dark'
                }, onClick: this.debounceGenerateFields },
                React.createElement("span", null, "\u57FA\u4E8E\u63A5\u53E3\u81EA\u52A8\u751F\u6210\u5B57\u6BB5")))) : null;
    };
    FieldSetting.prototype.render = function () {
        var _a;
        var _b = this.props, render = _b.render, cx = _b.classnames, _c = _b.name, name = _c === void 0 ? 'items' : _c, renderer = _b.renderer, config = _b.config, feat = _b.feat;
        var _d = config || {}, showDisplayType = _d.showDisplayType, showInputType = _d.showInputType;
        var isFirstStep = this.isFirstStep();
        var fields = this.state.fields.concat();
        return (React.createElement(React.Fragment, null,
            render('field-setting', {
                type: 'input-table',
                name: name,
                label: false,
                className: cx('ae-FieldSetting-Table', 'mb-0') /** 底部有操作区，干掉默认的 margin-bottom */,
                showIndex: true,
                showFooterAddBtn: false,
                addable: true,
                addBtnLabel: '新增',
                addBtnIcon: false,
                editable: true,
                editBtnLabel: '编辑',
                editBtnIcon: false,
                removable: true,
                deleteBtnLabel: '删除',
                deleteBtnIcon: false,
                confirmBtnLabel: '确认',
                cancelBtnLabel: '取消',
                needConfirm: true,
                enableStaticTransform: true,
                autoFocus: false,
                affixHeader: true,
                columnsTogglable: false,
                autoFillHeight: {
                    maxHeight: 325 // 至少展示5个元素
                },
                footerAddBtn: {
                    level: 'link',
                    label: '添加字段'
                },
                scaffold: this.scaffold,
                columns: [
                    {
                        type: 'input-text',
                        name: 'name',
                        label: '字段名称',
                        placeholder: '字段名称'
                    },
                    {
                        type: 'input-text',
                        name: 'label',
                        label: '标题',
                        placeholder: '字段标题'
                    },
                    showInputType &&
                        !(renderer === 'crud' && feat === 'List' && !isFirstStep)
                        ? {
                            type: 'select',
                            name: 'inputType',
                            label: '输入类型',
                            options: [
                                {
                                    label: '单行文本框',
                                    value: 'input-text',
                                    icon: 'input-text-plugin'
                                },
                                { label: '多行文本', value: 'textarea' },
                                { label: '数字输入', value: 'input-number' },
                                { label: '单选框', value: 'radios' },
                                { label: '勾选框', value: 'checkbox' },
                                { label: '复选框', value: 'checkboxes' },
                                { label: '下拉框', value: 'select' },
                                { label: '开关', value: 'switch' },
                                { label: '日期', value: 'input-date' },
                                { label: '表格编辑', value: 'input-table' },
                                { label: '组合输入', value: 'combo' },
                                { label: '文件上传', value: 'input-file' },
                                { label: '图片上传', value: 'input-image' },
                                { label: '富文本编辑器', value: 'input-rich-text' }
                            ]
                        }
                        : undefined,
                    showDisplayType
                        ? {
                            type: 'select',
                            name: 'displayType',
                            label: '展示类型',
                            options: [
                                {
                                    value: 'tpl',
                                    label: '文本',
                                    typeKey: 'tpl'
                                },
                                {
                                    value: 'image',
                                    label: '图片',
                                    typeKey: 'src'
                                },
                                {
                                    value: 'date',
                                    label: '日期',
                                    typeKey: 'value'
                                },
                                {
                                    value: 'progress',
                                    label: '进度',
                                    typeKey: 'value'
                                },
                                {
                                    value: 'status',
                                    label: '状态',
                                    typeKey: 'value'
                                },
                                {
                                    value: 'mapping',
                                    label: '映射',
                                    typeKey: 'value'
                                },
                                {
                                    value: 'list',
                                    label: '列表',
                                    typeKey: 'value'
                                }
                            ]
                        }
                        : undefined
                ].filter(Boolean)
            }, {
                data: (_a = {},
                    _a[name] = fields,
                    _a),
                loading: this.state.loading,
                onChange: this.handleTableChange
            }),
            this.renderFooter()));
    };
    FieldSetting.defaultProps = {
        config: {
            showInputType: true,
            showDisplayType: true
        }
    };
    FieldSetting.validator = function (items, isInternal) {
        var e_1, _a;
        var cache = {};
        var fields = items !== null && items !== void 0 ? items : [];
        var error = false;
        try {
            for (var _b = __values(fields.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], item = _d[1];
                /** 提交时再校验 */
                if (!item.name && isInternal !== true) {
                    error = "\u5E8F\u53F7\u300C".concat(index + 1, "\u300D\u7684\u5B57\u6BB5\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
                    break;
                }
                if (!cache.hasOwnProperty(item.name)) {
                    cache[item.name] = true;
                    continue;
                }
                error = "\u5E8F\u53F7\u300C".concat(index + 1, "\u300D\u7684\u5B57\u6BB5\u540D\u79F0\u300C").concat(item.name, "\u300D\u4E0D\u552F\u4E00");
                break;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return error;
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "handleTableChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "handleSubmit", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], FieldSetting.prototype, "handleGenerateFields", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "handleFieldsChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FieldSetting.prototype, "renderFooter", null);
    return FieldSetting;
}(React.Component));
export { FieldSetting };
var FieldSettingRenderer = /** @class */ (function (_super) {
    __extends(FieldSettingRenderer, _super);
    function FieldSettingRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldSettingRenderer = __decorate([
        FormItem({ type: 'ae-field-setting' })
    ], FieldSettingRenderer);
    return FieldSettingRenderer;
}(FieldSetting));
export default FieldSettingRenderer;
