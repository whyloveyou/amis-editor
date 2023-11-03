import { __assign, __awaiter, __decorate, __extends, __generator, __metadata } from "tslib";
import React from 'react';
import mergeWith from 'lodash/mergeWith';
import cloneDeep from 'lodash/cloneDeep';
import cx from 'classnames';
import { FormItem, Icon } from 'amis';
import { Input, PickerContainer, Spinner } from 'amis-ui';
import { getEnv } from 'mobx-state-tree';
import { normalizeApi, isEffectiveApi, isApiOutdated } from 'amis-core';
import { isObject, autobind, createObject, tipedLabel, anyChanged, getSchemaTpl } from 'amis-editor-core';
import debounce from 'lodash/debounce';
var APIControl = /** @class */ (function (_super) {
    __extends(APIControl, _super);
    function APIControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSimpleInputChange = debounce(function (value) {
            _this.handleSubmit(value, 'input');
        }, 1000);
        _this.state = {
            apiStr: _this.transformApi2Str(props.value),
            selectedItem: [],
            schema: props.pickerSchema,
            loading: false
        };
        return _this;
    }
    APIControl.prototype.componentDidMount = function () {
        this.updatePickerOptions();
    };
    APIControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.value !== props.value) {
            this.setState({ apiStr: this.transformApi2Str(props.value) });
            this.updatePickerOptions();
        }
        if (anyChanged(['enablePickerMode', 'pickerSchema'], prevProps, props)) {
            this.setState({ schema: props.pickerSchema });
        }
        if (isApiOutdated(prevProps === null || prevProps === void 0 ? void 0 : prevProps.pickerSource, props === null || props === void 0 ? void 0 : props.pickerSource, prevProps.data, props.data)) {
            this.fetchOptions();
        }
    };
    /**
     * 已选API详情，因为list接口是分页的，所以需要单独调用一次
     */
    APIControl.prototype.updatePickerOptions = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var apiObj, keyword, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        apiObj = normalizeApi(this.props.value);
                        if (!((_a = apiObj === null || apiObj === void 0 ? void 0 : apiObj.url) === null || _a === void 0 ? void 0 : _a.startsWith('api://'))) return [3 /*break*/, 4];
                        this.setState({ loading: true });
                        keyword = apiObj.url.replace('api://', '');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetchOptions(keyword)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.setState({ loading: false });
                        return [2 /*return*/];
                }
            });
        });
    };
    APIControl.prototype.transformApi2Str = function (value) {
        var api = normalizeApi(value);
        return api.url
            ? "".concat(api.method &&
                api.method.toLowerCase() !==
                    'get' /** 默认为GET请求，直接隐藏掉前缀，为了呈现更多信息 */
                ? "".concat(api.method, ":")
                : '').concat(api.url)
            : '';
    };
    APIControl.prototype.fetchOptions = function (keyword) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, value, data, env, searchField, searchType, pickerSource, apiObj, apiKey, ctx, schemaFilter, res, items, selectedItem;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _e = this.props, value = _e.value, data = _e.data, env = _e.env, searchField = _e.searchField, searchType = _e.searchType;
                        pickerSource = this.props.pickerSource;
                        apiObj = normalizeApi(value);
                        if (!pickerSource || !(apiObj === null || apiObj === void 0 ? void 0 : apiObj.url)) {
                            return [2 /*return*/];
                        }
                        apiKey = (_b = (_a = apiObj === null || apiObj === void 0 ? void 0 : apiObj.url) === null || _a === void 0 ? void 0 : _a.split('api://')) === null || _b === void 0 ? void 0 : _b[1];
                        ctx = createObject(data, __assign({ value: value, op: 'loadOptions' }, (keyword && searchField ? (_f = {}, _f[searchField] = keyword, _f.searchType = searchType, _f) : {})));
                        schemaFilter = getEnv(window.editorStore).schemaFilter;
                        // 基于爱速搭的规则转换一下
                        if (schemaFilter) {
                            pickerSource = schemaFilter({ api: pickerSource }).api;
                        }
                        if (!isEffectiveApi(pickerSource, ctx)) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(pickerSource, ctx)];
                    case 1:
                        res = _g.sent();
                        items = ((_c = res.data) === null || _c === void 0 ? void 0 : _c.items) || ((_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.rows);
                        if (items.length) {
                            selectedItem = items.find(function (item) { return item.key === apiKey; });
                            this.setState({ selectedItem: selectedItem ? [selectedItem] : [] });
                        }
                        _g.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    APIControl.prototype.inputRef = function (ref) {
        this.input = ref;
    };
    APIControl.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.input.focus();
    };
    APIControl.prototype.clearPickerValue = function () {
        var _this = this;
        var onChange = this.props.onChange;
        this.setState({ apiStr: this.transformApi2Str(undefined), selectedItem: [] }, function () {
            onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
            _this.focus();
        });
    };
    APIControl.prototype.handleSubmit = function (values, action) {
        var _a = this.props, onChange = _a.onChange, value = _a.value;
        var api = values;
        // Picker未做选择
        if (!values && action === 'picker-submit') {
            return;
        }
        if (typeof value !== 'string' || typeof values !== 'string') {
            api = mergeWith({}, normalizeApi(value), normalizeApi(values), function (value, srcValue, key) {
                // 这三个支持删除单个key的属性需用新值完全替换
                // 否则删除无效
                if (['data', 'responseData', 'headers'].includes(key)) {
                    return srcValue;
                }
            });
            ['data', 'responseData', 'headers'].forEach(function (item) {
                if (api[item] == null) {
                    delete api[item];
                }
            });
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(api);
    };
    APIControl.prototype.handleAction = function (schema, e, action, data) {
        var onAction = this.props.onAction;
        onAction === null || onAction === void 0 ? void 0 : onAction(schema, e, action, data);
    };
    APIControl.prototype.normalizeValue = function (value, callback) {
        var transformedValue = cloneDeep(value);
        if (typeof callback === 'function') {
            transformedValue = callback(value);
        }
        return transformedValue;
    };
    APIControl.prototype.handlePickerConfirm = function (value) {
        var onPickerConfirm = this.props.onPickerConfirm;
        this.handleSubmit(this.normalizeValue(value, onPickerConfirm), 'picker-submit');
    };
    APIControl.prototype.handlePickerClose = function () {
        var onPickerClose = this.props.onPickerClose;
        onPickerClose === null || onPickerClose === void 0 ? void 0 : onPickerClose();
    };
    APIControl.prototype.renderHeader = function () {
        var _a;
        var _b = this.props, render = _b.render, labelRemark = _b.labelRemark, useMobileUI = _b.useMobileUI, popOverContainer = _b.popOverContainer, env = _b.env;
        var label = this.props.label;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        // const actionsDom =
        //   Array.isArray(actions) && actions.length > 0
        //     ? actions.map((action, index) => {
        //         return render(`action/${index}`, action, {
        //           key: index,
        //           onAction: this.handleAction.bind(this, action)
        //         });
        //       })
        //     : null;
        return (React.createElement("header", { className: "ApiControl-header", key: "header" },
            React.createElement("label", { className: cx("".concat(classPrefix, "Form-label")) },
                (label === null || label === void 0 ? void 0 : label.type) ? render('label', label) : label || '',
                labelRemark
                    ? render('label-remark', {
                        type: 'remark',
                        icon: labelRemark.icon || 'warning-mark',
                        tooltip: labelRemark,
                        className: cx("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
                        useMobileUI: useMobileUI,
                        container: popOverContainer || env.getModalContainer
                    })
                    : null)));
    };
    APIControl.prototype.renderPickerSchema = function () {
        var _this = this;
        var _a = this.props, render = _a.render, pickerTitle = _a.pickerTitle, _b = _a.pickerName, pickerName = _b === void 0 ? 'apiPicker' : _b, pickerSize = _a.pickerSize, pickerHeaderClassName = _a.pickerHeaderClassName, pickerBtnSchema = _a.pickerBtnSchema, enablePickerMode = _a.enablePickerMode, onPickerSelect = _a.onPickerSelect;
        var _c = this.state, selectedItem = _c.selectedItem, schema = _c.schema;
        if (!schema) {
            return null;
        }
        return (React.createElement(PickerContainer, { title: pickerTitle, headerClassName: cx(pickerHeaderClassName, 'font-bold'), onConfirm: this.handlePickerConfirm, onCancel: this.handlePickerClose, size: pickerSize, bodyRender: function (_a) {
                var onChange = _a.onChange, setState = _a.setState;
                return render('api-control-picker', schema, {
                    value: selectedItem,
                    onSelect: function (items) {
                        setState({ selectedItem: items });
                        onChange(_this.normalizeValue(items, onPickerSelect));
                    }
                });
            } }, function (_a) {
            var onClick = _a.onClick, isOpened = _a.isOpened;
            return render('picker-action', __assign(__assign({ icon: (React.createElement(Icon, { icon: "picker-icon", className: "icon ae-ApiControl-icon" })) }, pickerBtnSchema), { className: cx('ae-ApiControl-PickerBtn', pickerBtnSchema === null || pickerBtnSchema === void 0 ? void 0 : pickerBtnSchema.className) }), {
                onClick: function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(!isOpened && enablePickerMode)) return [3 /*break*/, 4];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.fetchOptions()];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _a = _b.sent();
                                return [3 /*break*/, 4];
                            case 4:
                                onClick(e);
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
        }));
    };
    APIControl.prototype.renderApiDialog = function () {
        return {
            label: '',
            type: 'action',
            acitonType: 'dialog',
            size: 'sm',
            icon: React.createElement(Icon, { icon: "setting", className: "icon ae-ApiControl-icon" }),
            className: 'ae-ApiControl-setting-button',
            actionType: 'dialog',
            dialog: {
                title: '高级设置',
                size: 'md',
                className: 'ae-ApiControl-dialog',
                headerClassName: 'font-bold',
                bodyClassName: 'ae-ApiControl-dialog-body',
                closeOnEsc: true,
                closeOnOutside: false,
                showCloseButton: true,
                // data: {},
                body: [this.renderApiConfigTabs()]
            }
        };
    };
    APIControl.prototype.renderApiConfigTabs = function (submitOnChange) {
        if (submitOnChange === void 0) { submitOnChange = false; }
        var _a = this.props, messageDesc = _a.messageDesc, _b = _a.debug, debug = _b === void 0 ? false : _b, name = _a.name;
        return {
            type: 'form',
            className: 'ae-ApiControl-form AMISCSSWrapper',
            mode: 'horizontal',
            submitOnChange: submitOnChange,
            wrapWithPanel: false,
            onSubmit: this.handleSubmit,
            debug: debug,
            body: [
                {
                    type: 'tabs',
                    className: 'ae-ApiControl-tabs',
                    contentClassName: 'ae-ApiControl-tabContent',
                    tabs: [
                        {
                            title: '接口设置',
                            tab: [
                                {
                                    label: '发送方式',
                                    name: 'method',
                                    value: 'get',
                                    type: 'button-group-select',
                                    mode: 'horizontal',
                                    options: [
                                        {
                                            value: 'get',
                                            label: 'GET'
                                        },
                                        {
                                            value: 'post',
                                            label: 'POST'
                                        },
                                        {
                                            value: 'put',
                                            label: 'PUT'
                                        },
                                        {
                                            value: 'patch',
                                            label: 'PATCH'
                                        },
                                        {
                                            value: 'delete',
                                            label: 'DELETE'
                                        }
                                    ]
                                },
                                {
                                    label: '接口地址',
                                    type: 'input-text',
                                    name: 'url',
                                    mode: 'horizontal',
                                    size: 'lg',
                                    placeholder: 'http://',
                                    required: true
                                },
                                {
                                    label: '发送条件',
                                    type: 'input-text',
                                    name: 'sendOn',
                                    mode: 'horizontal',
                                    size: 'lg',
                                    placeholder: '如：this.type == "123"',
                                    description: '用表达式来设置该请求的发送条件'
                                },
                                {
                                    label: '数据格式',
                                    type: 'button-group-select',
                                    name: 'dataType',
                                    size: 'sm',
                                    mode: 'horizontal',
                                    description: "".concat('发送体格式为', "\uFF1A<%= data.dataType === \"json\" ? \"application/json\" : (data.dataType === \"form-data\" ? \"multipart/form-data\" : (data.dataType === \"form\" ? \"application/x-www-form-urlencoded\" : \"\")) %>\uFF0C").concat('当发送内容中存在文件时会自动使用 form-data 格式。'),
                                    options: [
                                        {
                                            label: 'JSON',
                                            value: 'json'
                                        },
                                        {
                                            label: 'FormData',
                                            value: 'form-data'
                                        },
                                        {
                                            label: 'Form',
                                            value: 'form'
                                        }
                                    ],
                                    disabled: false
                                },
                                {
                                    type: 'group',
                                    body: [
                                        {
                                            type: 'switch',
                                            label: tipedLabel('静默请求', '是否静默发送请求，屏蔽报错提示'),
                                            name: 'silent',
                                            mode: 'horizontal'
                                        }
                                    ]
                                },
                                {
                                    type: 'switch',
                                    label: '是否设置缓存',
                                    name: 'cache',
                                    mode: 'horizontal',
                                    pipeIn: function (value) { return !!value; },
                                    pipeOut: function (value) { return (value ? 3000 : undefined); }
                                },
                                {
                                    label: '',
                                    type: 'input-number',
                                    name: 'cache',
                                    mode: 'horizontal',
                                    size: 'md',
                                    min: 0,
                                    step: 500,
                                    visibleOn: 'this.cache',
                                    description: '设置该请求缓存有效时间，单位 ms',
                                    pipeIn: function (value) {
                                        return typeof value === 'number' ? value : 0;
                                    }
                                },
                                {
                                    label: '文件下载',
                                    name: 'responseType',
                                    type: 'switch',
                                    mode: 'horizontal',
                                    description: '当接口为二进制文件下载时请勾选，否则会文件乱码。',
                                    pipeIn: function (value) { return value === 'blob'; },
                                    pipeOut: function (value) { return (value ? 'blob' : undefined); }
                                },
                                {
                                    label: '数据替换',
                                    name: 'replaceData',
                                    type: 'switch',
                                    mode: 'horizontal',
                                    description: '默认数据为追加方式，开启后完全替换当前数据'
                                },
                                {
                                    label: '',
                                    name: 'interval',
                                    type: 'input-number',
                                    mode: 'horizontal',
                                    size: 'md',
                                    visibleOn: 'typeof this.interval === "number"',
                                    step: 500,
                                    description: '定时刷新间隔，单位 ms'
                                },
                                {
                                    label: '静默刷新',
                                    name: 'silentPolling',
                                    type: 'switch',
                                    mode: 'horizontal',
                                    visibleOn: '!!data.interval',
                                    description: '设置自动定时刷新时是否显示loading'
                                },
                                {
                                    label: tipedLabel('定时刷新停止', '定时刷新一旦设置会一直刷新，除非给出表达式，条件满足后则停止刷新'),
                                    name: 'stopAutoRefreshWhen',
                                    type: 'input-text',
                                    mode: 'horizontal',
                                    horizontal: {
                                        leftFixed: 'md'
                                    },
                                    size: 'lg',
                                    visibleOn: '!!data.interval',
                                    placeholder: '停止定时刷新检测表达式'
                                }
                            ]
                        },
                        {
                            title: 'HTTP配置',
                            tab: [
                                {
                                    type: 'switch',
                                    label: tipedLabel('请求头', '可以配置<code>headers</code>对象，添加自定义请求头'),
                                    name: 'headers',
                                    mode: 'horizontal',
                                    className: 'm-b-xs',
                                    pipeIn: function (value) { return !!value; },
                                    pipeOut: function (value) { return (value ? { '': '' } : null); }
                                },
                                {
                                    type: 'combo',
                                    name: 'headers',
                                    mode: 'horizontal',
                                    syncDefaultValue: false,
                                    multiple: true,
                                    visibleOn: 'this.headers',
                                    items: [
                                        {
                                            type: 'input-text',
                                            name: 'key',
                                            placeholder: 'Key',
                                            unique: true,
                                            required: true,
                                            options: [
                                                {
                                                    label: 'Content-Encoding',
                                                    value: 'Content-Encoding'
                                                },
                                                {
                                                    label: 'Content-Type',
                                                    value: 'Content-Type'
                                                }
                                            ]
                                        },
                                        {
                                            type: 'input-text',
                                            name: 'value',
                                            placeholder: 'Value',
                                            disabled: false
                                        }
                                    ],
                                    pipeIn: function (value) {
                                        if (!isObject(value)) {
                                            return value;
                                        }
                                        var arr = [];
                                        Object.keys(value).forEach(function (key) {
                                            arr.push({
                                                key: key || '',
                                                value: typeof value[key] === 'string'
                                                    ? value[key]
                                                    : JSON.stringify(value[key])
                                            });
                                        });
                                        return arr;
                                    },
                                    pipeOut: function (value) {
                                        if (!Array.isArray(value)) {
                                            return value;
                                        }
                                        var obj = {};
                                        value.forEach(function (item) {
                                            var key = item.key || '';
                                            var value = item.value;
                                            try {
                                                value = JSON.parse(value);
                                            }
                                            catch (e) { }
                                            obj[key] = value;
                                        });
                                        return obj;
                                    }
                                },
                                {
                                    type: 'switch',
                                    label: tipedLabel('发送数据', '当没开启数据映射时，发送 API 的时候会发送尽可能多的数据，如果你想自己控制发送的数据，或者需要额外的数据处理，请开启此选项'),
                                    name: 'data',
                                    mode: 'horizontal',
                                    pipeIn: function (value) { return !!value; },
                                    pipeOut: function (value) { return (value ? { '&': '$$' } : null); }
                                },
                                {
                                    type: 'combo',
                                    syncDefaultValue: false,
                                    name: 'data',
                                    mode: 'horizontal',
                                    renderLabel: false,
                                    visibleOn: 'this.data',
                                    descriptionClassName: 'help-block text-xs m-b-none',
                                    description: '<p>当没开启数据映射时，发送数据自动切成白名单模式，配置啥发送啥，请绑定数据。如：<code>{"a": "\\${a}", "b": 2}</code></p><p>如果希望在默认的基础上定制，请先添加一个 Key 为 `&` Value 为 `\\$$` 作为第一行。</p><div>当值为 <code>__undefined</code>时，表示删除对应的字段，可以结合<code>{"&": "\\$$"}</code>来达到黑名单效果。</div>',
                                    multiple: true,
                                    pipeIn: function (value) {
                                        if (!isObject(value)) {
                                            return value;
                                        }
                                        var arr = [];
                                        Object.keys(value).forEach(function (key) {
                                            arr.push({
                                                key: key || '',
                                                value: typeof value[key] === 'string'
                                                    ? value[key]
                                                    : JSON.stringify(value[key])
                                            });
                                        });
                                        return arr;
                                    },
                                    pipeOut: function (value) {
                                        if (!Array.isArray(value)) {
                                            return value;
                                        }
                                        var obj = {};
                                        value.forEach(function (item) {
                                            var key = item.key || '';
                                            var value = item.value;
                                            try {
                                                value = JSON.parse(value);
                                            }
                                            catch (e) { }
                                            obj[key] = value;
                                        });
                                        return obj;
                                    },
                                    items: [
                                        {
                                            placeholder: 'Key',
                                            type: 'input-text',
                                            unique: true,
                                            name: 'key',
                                            required: true
                                        },
                                        getSchemaTpl('DataPickerControl', {
                                            placeholder: 'Value',
                                            name: 'value'
                                        })
                                    ]
                                },
                                getSchemaTpl('apiRequestAdaptor'),
                                {
                                    type: 'switch',
                                    label: tipedLabel('返回数据', '如果需要对返回结果中的data做额外的数据处理，请开启此选项'),
                                    name: 'responseData',
                                    mode: 'horizontal',
                                    pipeIn: function (value) { return !!value; },
                                    pipeOut: function (value) { return (value ? { '&': '$$' } : null); }
                                },
                                {
                                    type: 'combo',
                                    syncDefaultValue: false,
                                    name: 'responseData',
                                    mode: 'horizontal',
                                    renderLabel: false,
                                    visibleOn: 'this.responseData',
                                    descriptionClassName: 'help-block text-xs m-b-none',
                                    multiple: true,
                                    pipeIn: function (value) {
                                        if (!isObject(value)) {
                                            return value;
                                        }
                                        var arr = [];
                                        Object.keys(value).forEach(function (key) {
                                            arr.push({
                                                key: key || '',
                                                value: typeof value[key] === 'string'
                                                    ? value[key]
                                                    : JSON.stringify(value[key])
                                            });
                                        });
                                        return arr;
                                    },
                                    pipeOut: function (value) {
                                        if (!Array.isArray(value)) {
                                            return value;
                                        }
                                        var obj = {};
                                        value.forEach(function (item) {
                                            var key = item.key || '';
                                            var value = item.value;
                                            try {
                                                value = JSON.parse(value);
                                            }
                                            catch (e) { }
                                            obj[key] = value;
                                        });
                                        return obj;
                                    },
                                    items: [
                                        {
                                            placeholder: 'Key',
                                            type: 'input-text',
                                            unique: true,
                                            name: 'key',
                                            required: true
                                        },
                                        {
                                            placeholder: 'Value',
                                            type: 'input-text',
                                            name: 'value'
                                        }
                                    ]
                                },
                                getSchemaTpl(name === 'validateApi' ? 'validateApiAdaptor' : 'apiAdaptor')
                            ]
                        },
                        {
                            title: '提示信息',
                            tab: [
                                {
                                    label: '默认提示文案',
                                    type: 'combo',
                                    name: 'messages',
                                    mode: 'normal',
                                    multiLine: true,
                                    items: [
                                        {
                                            label: '请求成功',
                                            type: 'input-text',
                                            name: 'success'
                                        },
                                        {
                                            label: '请求失败',
                                            type: 'input-text',
                                            name: 'failed'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    };
    APIControl.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, render = _c.render, className = _c.className, footerClassName = _c.footerClassName, classPrefix = _c.classPrefix, label = _c.label, labelRemark = _c.labelRemark, value = _c.value, footer = _c.footer, _d = _c.border, border = _d === void 0 ? false : _d, _e = _c.onlyTabs, onlyTabs = _e === void 0 ? false : _e, messageDesc = _c.messageDesc, enablePickerMode = _c.enablePickerMode, disabled = _c.disabled, mode = _c.mode, enableHighlight = _c.enableHighlight, _f = _c.labelField, labelField = _f === void 0 ? 'label' : _f, useMobileUI = _c.useMobileUI, popOverContainer = _c.popOverContainer, env = _c.env, renderLabel = _c.renderLabel;
        var _g = this.state, apiStr = _g.apiStr, selectedItem = _g.selectedItem, loading = _g.loading;
        selectedItem =
            Array.isArray(selectedItem) && selectedItem.length !== 0
                ? selectedItem
                : [];
        var highlightLabel = (_b = (_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem[0]) === null || _a === void 0 ? void 0 : _a[labelField]) !== null && _b !== void 0 ? _b : '';
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: cx('ae-ApiControl', className, { border: border }) }, onlyTabs ? (render('api-control-tabs', this.renderApiConfigTabs(true), {
                data: normalizeApi(value)
            })) : (React.createElement(React.Fragment, null,
                !renderLabel && this.renderHeader(),
                React.createElement("div", { className: "ae-ApiControl-content", key: "content" },
                    React.createElement("div", { className: cx('ae-ApiControl-input') },
                        enableHighlight && highlightLabel ? (React.createElement("div", { className: cx('ae-ApiControl-highlight') }, loading ? (React.createElement(Spinner, { show: true, icon: "reload", size: "sm", spinnerClassName: cx('Select-spinner') })) : (React.createElement("span", { className: cx('ae-ApiControl-highlight-tag') },
                            React.createElement("span", null, highlightLabel),
                            React.createElement("a", { onClick: this.clearPickerValue, className: cx('Modal-close') },
                                React.createElement(Icon, { icon: "close", className: cx('icon', 'ae-ApiControl-highlight-close') })))))) : (React.createElement(Input, { ref: this.inputRef, value: apiStr, type: "text", disabled: disabled, placeholder: "http://", onChange: function (e) {
                                return _this.handleSimpleInputChange(e.currentTarget.value);
                            } })),
                        enablePickerMode ? this.renderPickerSchema() : null),
                    render('api-control-dialog', this.renderApiDialog(), {
                        data: normalizeApi(value)
                    }))))),
            Array.isArray(footer) && footer.length !== 0 ? (React.createElement("footer", { className: cx('mt-3', footerClassName), key: "footer" }, render('api-control-footer', footer))) : null));
    };
    APIControl.defaultProps = {
        pickerBtnSchema: {
            type: 'button',
            level: 'link',
            size: 'sm'
        },
        labelField: 'label',
        searchType: 'key'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], APIControl.prototype, "inputRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], APIControl.prototype, "clearPickerValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", void 0)
    ], APIControl.prototype, "handleSubmit", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], APIControl.prototype, "handlePickerConfirm", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], APIControl.prototype, "handlePickerClose", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], APIControl.prototype, "renderHeader", null);
    return APIControl;
}(React.Component));
export default APIControl;
var APIControlRenderer = /** @class */ (function (_super) {
    __extends(APIControlRenderer, _super);
    function APIControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    APIControlRenderer = __decorate([
        FormItem({
            type: 'ae-apiControl',
            renderLabel: false
        })
    ], APIControlRenderer);
    return APIControlRenderer;
}(APIControl));
export { APIControlRenderer };
