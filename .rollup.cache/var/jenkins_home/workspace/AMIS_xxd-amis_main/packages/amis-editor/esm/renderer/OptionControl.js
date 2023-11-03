/**
 * @file 组件选项组件的可视化编辑控件
 */
import { __assign, __decorate, __extends, __metadata, __read, __rest, __spreadArray } from "tslib";
import React from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import uniqBy from 'lodash/uniqBy';
import omit from 'lodash/omit';
import get from 'lodash/get';
import Sortable from 'sortablejs';
import { FormItem, Button, Checkbox, Icon, render as amisRender } from 'amis';
import { value2array } from 'amis-ui/lib/components/Select';
import { autobind, getI18nEnabled } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
import { tipedLabel } from 'amis-editor-core';
import { createObject } from 'amis-core';
import debounce from 'lodash/debounce';
var OptionControl = /** @class */ (function (_super) {
    __extends(OptionControl, _super);
    function OptionControl(props) {
        var _this = _super.call(this, props) || this;
        _this.internalProps = ['checked', 'editing'];
        var source = 'custom';
        if (props.data.hasOwnProperty('source') && props.data.source) {
            var api = props.data.source;
            var url = typeof api === 'string'
                ? api
                : typeof api === 'object'
                    ? api.url || ''
                    : '';
            source = /\$\{(.*?)\}/g.test(props.data.source)
                ? 'variable'
                : !url.indexOf('api://')
                    ? 'apicenter'
                    : 'api';
        }
        _this.state = {
            options: _this.transformOptions(props),
            api: props.data.source,
            labelField: props.data.labelField,
            valueField: props.data.valueField,
            source: source
        };
        return _this;
    }
    /**
     * 数据更新
     */
    OptionControl.prototype.componentWillReceiveProps = function (nextProps) {
        var options = get(nextProps, 'data.options')
            ? this.transformOptions(nextProps)
            : [];
        if (JSON.stringify(this.state.options.map(function (item) { return (__assign(__assign({}, item), { editing: undefined })); })) !== JSON.stringify(options)) {
            this.setState({
                options: options
            });
        }
    };
    /**
     * 获取当前选项值的类型
     */
    OptionControl.prototype.getOptionValueType = function (value) {
        if (typeof value === 'string') {
            return 'text';
        }
        if (typeof value === 'boolean') {
            return 'boolean';
        }
        if (typeof value === 'number') {
            return 'number';
        }
        return 'text';
    };
    /**
     * 将当前选项值转换为选择的类型
     */
    OptionControl.prototype.normalizeOptionValue = function (value, valueType) {
        if (valueType === 'text') {
            return String(value);
        }
        if (valueType === 'number') {
            var convertTo = Number(value);
            if (isNaN(convertTo)) {
                return 0;
            }
            return convertTo;
        }
        if (valueType === 'boolean') {
            return !value || value === 'false' ? false : true;
        }
        return '';
    };
    /**
     * 处理填入输入框的值
     */
    OptionControl.prototype.transformOptionValue = function (value) {
        return typeof value === 'undefined' || value === null
            ? ''
            : typeof value === 'string'
                ? value
                : JSON.stringify(value);
    };
    OptionControl.prototype.transformOptions = function (props) {
        var ctx = props.data, options = props.value;
        var defaultValue = ctx.value;
        var valueArray = value2array(defaultValue, ctx).map(function (item) { var _a; return item[(_a = ctx === null || ctx === void 0 ? void 0 : ctx.valueField) !== null && _a !== void 0 ? _a : 'value']; });
        return Array.isArray(options)
            ? options.map(function (item) {
                var _a;
                return (__assign(__assign(__assign({ label: item.label, 
                    // 为了使用户编写label时同时生效到value
                    value: item.label === item.value ? null : item.value, checked: !!~valueArray.indexOf(item[(_a = ctx === null || ctx === void 0 ? void 0 : ctx.valueField) !== null && _a !== void 0 ? _a : 'value']) }, ((item === null || item === void 0 ? void 0 : item.badge) ? { badge: item.badge } : {})), (item.hidden !== undefined ? { hidden: item.hidden } : {})), (item.hiddenOn !== undefined ? { hiddenOn: item.hiddenOn } : {})));
            })
            : [];
    };
    /**
     * 处理当前组件的默认值
     */
    OptionControl.prototype.normalizeValue = function () {
        var _this = this;
        var _a = this.props, _b = _a.data, ctx = _b === void 0 ? {} : _b, multipleProps = _a.multiple;
        var _c = ctx.joinValues, joinValues = _c === void 0 ? true : _c, extractValue = ctx.extractValue, multiple = ctx.multiple, delimiter = ctx.delimiter, valueField = ctx.valueField;
        var checkedOptions = this.state.options
            .filter(function (item) { return item.checked && (item === null || item === void 0 ? void 0 : item.hidden) !== true; })
            .map(function (item) { return omit(item, _this.internalProps); });
        var value;
        if (!checkedOptions.length) {
            return '';
        }
        if (multiple || multipleProps) {
            value = checkedOptions;
            if (joinValues) {
                value = checkedOptions
                    .map(function (item) {
                    return item[valueField || 'value'] || item[valueField || 'label'];
                })
                    .join(delimiter || ',');
            }
            else if (extractValue) {
                value = checkedOptions.map(function (item) {
                    return item[valueField || 'value'] || item[valueField || 'label'];
                });
            }
        }
        else {
            value = checkedOptions[0];
            if (joinValues || extractValue) {
                value = value[valueField || 'value'] || value[valueField || 'label'];
            }
        }
        return value;
    };
    /**
     * 更新options字段的统一出口
     */
    OptionControl.prototype.onChange = function () {
        var source = this.state.source;
        var onBulkChange = this.props.onBulkChange;
        var defaultValue = this.normalizeValue();
        var data = {
            source: undefined,
            options: undefined,
            labelField: undefined,
            valueField: undefined
        };
        if (source === 'custom') {
            var options = this.state.options;
            data.options = options.map(function (item) { return (__assign(__assign(__assign({}, ((item === null || item === void 0 ? void 0 : item.badge) ? { badge: item.badge } : {})), { label: item.label, value: item.value == null || item.value === '' ? item.label : item.value }), (item.hiddenOn !== undefined ? { hiddenOn: item.hiddenOn } : {}))); });
            data.value = defaultValue;
        }
        if (source === 'api' || source === 'apicenter' || source === 'variable') {
            var _a = this.state, api = _a.api, labelField = _a.labelField, valueField = _a.valueField;
            data.source = api;
            data.labelField = labelField || undefined;
            data.valueField = valueField || undefined;
        }
        onBulkChange && onBulkChange(data);
        return;
    };
    OptionControl.prototype.targetRef = function (ref) {
        this.target = ref ? findDOMNode(ref) : null;
    };
    OptionControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging();
        }
        this.drag = ref;
    };
    OptionControl.prototype.initDragging = function () {
        var _this = this;
        var dom = findDOMNode(this);
        this.sortable = new Sortable(dom.querySelector('.ae-OptionControl-content'), {
            group: 'OptionControlGroup',
            animation: 150,
            handle: '.ae-OptionControlItem-dragBar',
            ghostClass: 'ae-OptionControlItem--dragging',
            onEnd: function (e) {
                // 没有移动
                if (e.newIndex === e.oldIndex) {
                    return;
                }
                // 换回来
                var parent = e.to;
                if (e.newIndex < e.oldIndex &&
                    e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
                }
                else if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                var options = _this.state.options.concat();
                options[e.oldIndex] = options.splice(e.newIndex, 1, options[e.oldIndex])[0];
                _this.setState({ options: options }, function () { return _this.onChange(); });
            }
        });
    };
    OptionControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    OptionControl.prototype.scroll2Bottom = function () {
        var _a, _b;
        this.drag &&
            ((_b = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            }));
    };
    /**
     * 切换选项类型
     */
    OptionControl.prototype.handleSourceChange = function (source) {
        this.setState({ api: '', source: source }, this.onChange);
    };
    /**
     * 删除选项
     */
    OptionControl.prototype.handleDelete = function (index) {
        var _this = this;
        var options = this.state.options.concat();
        options.splice(index, 1);
        this.setState({ options: options }, function () { return _this.onChange(); });
    };
    /**
     * 设置默认选项
     */
    OptionControl.prototype.handleToggleDefaultValue = function (index, checked, shift) {
        var _this = this;
        var _a, _b, _c;
        var options = this.state.options.concat();
        var isMultiple = ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.multiple) || ((_c = this.props) === null || _c === void 0 ? void 0 : _c.multiple);
        if (isMultiple) {
            options.splice(index, 1, __assign(__assign({}, options[index]), { checked: checked }));
        }
        else {
            options = options.map(function (item, itemIndex) { return (__assign(__assign({}, item), { checked: itemIndex === index ? checked : false // 支持重复点击取消选中
             })); });
        }
        this.setState({ options: options }, function () { return _this.onChange(); });
    };
    /**
     * 编辑选项
     */
    OptionControl.prototype.toggleEdit = function (index) {
        var options = this.state.options;
        options[index].editing = !options[index].editing;
        this.setState({ options: options });
    };
    /**
     * 编辑角标
     */
    OptionControl.prototype.toggleBadge = function (index, value) {
        var _this = this;
        var options = this.state.options;
        options[index].badge = value;
        this.setState({ options: options }, function () { return _this.onChange(); });
    };
    OptionControl.prototype.handleEditLabel = function (index, value) {
        var _this = this;
        var options = this.state.options.concat();
        options.splice(index, 1, __assign(__assign({}, options[index]), { label: value }));
        this.setState({ options: options }, function () { return _this.onChange(); });
    };
    OptionControl.prototype.handleHiddenValueChange = function (index, value) {
        var _this = this;
        var options = this.state.options.concat();
        var _a = options[index], hiddenOn = _a.hiddenOn, option = __rest(_a, ["hiddenOn"]);
        options.splice(index, 1, __assign(__assign({}, option), (!value ? {} : { hiddenOn: value })));
        this.setState({ options: options }, function () { return _this.onChange(); });
    };
    OptionControl.prototype.handleAdd = function () {
        var _this = this;
        var options = this.state.options;
        options.push({
            label: '',
            value: null,
            checked: false
        });
        this.setState({ options: options }, function () {
            _this.onChange();
        });
    };
    OptionControl.prototype.handleValueTypeChange = function (index, type) {
        var _this = this;
        var options = this.state.options.concat();
        options[index].value = this.normalizeOptionValue(options[index].value, type);
        this.setState({ options: options }, function () { return _this.onChange(); });
    };
    OptionControl.prototype.handleValueChange = function (index, value) {
        var _this = this;
        var options = this.state.options.concat();
        var type = this.getOptionValueType(options[index].value);
        options[index].value = this.normalizeOptionValue(value, type);
        this.setState({ options: options }, function () { return _this.onChange(); });
    };
    OptionControl.prototype.handleBatchAdd = function (values, action) {
        var _this = this;
        var options = this.state.options.concat();
        var addedOptions = values[0].batchOption
            .split('\n')
            .map(function (option) {
            var item = option.trim();
            if (~item.indexOf(' ')) {
                var _a = __read(item.split(' '), 2), label = _a[0], value = _a[1];
                return { label: label.trim(), value: value.trim(), checked: false };
            }
            return { label: item, value: item, checked: false };
        });
        var newOptions = uniqBy(__spreadArray(__spreadArray([], __read(options), false), __read(addedOptions), false), 'value');
        this.setState({ options: newOptions }, function () { return _this.onChange(); });
    };
    OptionControl.prototype.renderHeader = function () {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, label = _b.label, labelRemark = _b.labelRemark, useMobileUI = _b.useMobileUI, env = _b.env, popOverContainer = _b.popOverContainer, hasApiCenter = _b.hasApiCenter;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        var source = this.state.source;
        var optionSourceList = __spreadArray(__spreadArray([
            {
                label: '自定义选项',
                value: 'custom'
            },
            {
                label: '外部接口',
                value: 'api'
            }
        ], __read((hasApiCenter ? [{ label: 'API中心', value: 'apicenter' }] : [])), false), [
            {
                label: '上下文变量',
                value: 'variable'
            }
            // {
            //   label: '表单实体',
            //   value: 'form'
            // }
        ], false).map(function (item) { return (__assign(__assign({}, item), { onClick: function () { return _this.handleSourceChange(item.value); } })); });
        return (React.createElement("header", { className: "ae-OptionControl-header" },
            React.createElement("label", { className: cx("".concat(classPrefix, "Form-label")) },
                label || '',
                labelRemark
                    ? render('label-remark', {
                        type: 'remark',
                        icon: labelRemark.icon || 'warning-mark',
                        tooltip: labelRemark,
                        className: cx("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
                        useMobileUI: useMobileUI,
                        container: popOverContainer || env.getModalContainer
                    })
                    : null),
            React.createElement("div", null, render('validation-control-addBtn', {
                type: 'dropdown-button',
                level: 'link',
                size: 'sm',
                label: '${selected}',
                align: 'right',
                closeOnClick: true,
                closeOnOutside: true,
                buttons: optionSourceList
            }, {
                popOverContainer: null,
                data: {
                    selected: optionSourceList.find(function (item) { return item.value === source; })
                        .label
                }
            }))));
    };
    OptionControl.prototype.renderOption = function (props) {
        var _this = this;
        var checked = props.checked, index = props.index, editing = props.editing, multipleProps = props.multipleProps, closeDefaultCheck = props.closeDefaultCheck;
        var _a = this.props, render = _a.render, ctx = _a.data, node = _a.node;
        var isMultiple = (ctx === null || ctx === void 0 ? void 0 : ctx.multiple) === true || multipleProps;
        var i18nEnabled = getI18nEnabled();
        var label = this.transformOptionValue(props.label);
        var value = this.transformOptionValue(props.value);
        var valueType = this.getOptionValueType(props.value);
        var showBadge = node.type === 'button-group-select';
        var editDom = editing ? (React.createElement("div", { className: "ae-OptionControlItem-extendMore" }, render('option', {
            type: 'container',
            className: 'ae-ExtendMore right mb-2',
            body: [
                {
                    type: 'button',
                    className: 'ae-OptionControlItem-closeBtn',
                    label: '×',
                    level: 'link',
                    onClick: function () { return _this.toggleEdit(index); }
                },
                {
                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                    placeholder: '请输入显示文本',
                    label: '文本',
                    mode: 'horizontal',
                    value: label,
                    name: 'optionLabel',
                    labelClassName: 'ae-OptionControlItem-EditLabel',
                    valueClassName: 'ae-OptionControlItem-EditValue',
                    onChange: function (v) { return _this.handleEditLabel(index, v); }
                },
                {
                    type: 'input-group',
                    name: 'input-group',
                    label: '值',
                    labelClassName: 'ae-OptionControlItem-EditLabel',
                    valueClassName: 'ae-OptionControlItem-EditValue',
                    mode: 'horizontal',
                    body: [
                        {
                            type: 'select',
                            name: 'optionValueType',
                            value: valueType,
                            options: [
                                {
                                    label: '文本',
                                    value: 'text'
                                },
                                {
                                    label: '数字',
                                    value: 'number'
                                },
                                {
                                    label: '布尔',
                                    value: 'boolean'
                                }
                            ],
                            checkAll: false,
                            onChange: function (v) {
                                return _this.handleValueTypeChange(index, v);
                            }
                        },
                        {
                            type: 'input-text',
                            placeholder: '默认与文本一致',
                            name: 'optionValue',
                            value: value,
                            visibleOn: "this.optionValueType !== 'boolean'",
                            onChange: function (v) { return _this.handleValueChange(index, v); }
                        },
                        {
                            type: 'input-text',
                            placeholder: '默认与文本一致',
                            name: 'optionValue',
                            value: value,
                            visibleOn: "this.optionValueType === 'boolean'",
                            onChange: function (v) { return _this.handleValueChange(index, v); },
                            options: [
                                { label: 'true', value: true },
                                { label: 'false', value: false }
                            ]
                        }
                    ]
                },
                getSchemaTpl('expressionFormulaControl', {
                    name: 'optionHiddenOn',
                    label: '隐藏',
                    labelClassName: 'ae-OptionControlItem-EditLabel',
                    valueClassName: 'ae-OptionControlItem-EditValue',
                    onChange: function (v) { return _this.handleHiddenValueChange(index, v); }
                }),
                {
                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                    placeholder: '请输入角标文本',
                    label: '角标',
                    mode: 'horizontal',
                    visible: showBadge,
                    value: props === null || props === void 0 ? void 0 : props.badge,
                    name: 'optionBadge',
                    labelClassName: 'ae-OptionControlItem-EditLabel',
                    valueClassName: 'ae-OptionControlItem-EditValue',
                    onChange: function (v) { return _this.toggleBadge(index, v); }
                }
            ]
        }, { data: createObject(ctx, { option: props }) }))) : null;
        var operationBtn = [
            {
                type: 'button',
                className: 'ae-OptionControlItem-action',
                label: '编辑',
                onClick: function () { return _this.toggleEdit(index); }
            },
            {
                type: 'button',
                className: 'ae-OptionControlItem-action',
                label: '删除',
                onClick: function () { return _this.handleDelete(index); }
            }
        ];
        // 单选模式，选中时增加取消操作
        if (!closeDefaultCheck && !isMultiple && checked) {
            operationBtn.unshift({
                type: 'button',
                className: 'ae-OptionControlItem-action',
                label: '取消选中',
                onClick: function () { return _this.handleToggleDefaultValue(index, false); }
            });
        }
        var disabled = (props === null || props === void 0 ? void 0 : props.hidden) === true;
        var tooltip = disabled ? '隐藏选项不能设为默认值' : '默认选中此项';
        return (React.createElement("li", { className: "ae-OptionControlItem", key: index },
            React.createElement("div", { className: "ae-OptionControlItem-Main" },
                React.createElement("a", { className: "ae-OptionControlItem-dragBar" },
                    React.createElement(Icon, { icon: "drag-bar", className: "icon" })),
                !this.props.closeDefaultCheck &&
                    this.props.data.defaultCheckAll !== true && (React.createElement("span", { className: "inline-flex", "data-tooltip": tooltip },
                    React.createElement(Checkbox, { className: "ae-OptionControlItem-checkbox", checked: checked, disabled: disabled, type: isMultiple ? 'checkbox' : 'radio', onChange: function (newChecked, shift) {
                            return _this.handleToggleDefaultValue(index, newChecked, shift);
                        } }))),
                amisRender({
                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                    className: 'ae-OptionControlItem-input',
                    value: label,
                    placeholder: '请输入文本/值',
                    clearable: false,
                    onChange: function (value) {
                        _this.handleEditLabel(index, value);
                    }
                }),
                render('dropdown', {
                    type: 'dropdown-button',
                    className: 'ae-OptionControlItem-dropdown',
                    btnClassName: 'px-2',
                    icon: 'fa fa-ellipsis-h',
                    hideCaret: true,
                    closeOnClick: true,
                    align: 'right',
                    menuClassName: 'ae-OptionControlItem-ulmenu',
                    buttons: operationBtn
                }, {
                    popOverContainer: null // amis 渲染挂载节点会使用 this.target
                })),
            editDom));
    };
    OptionControl.prototype.buildBatchAddSchema = function () {
        return {
            type: 'action',
            actionType: 'dialog',
            label: '批量添加',
            dialog: {
                title: '批量添加选项',
                headerClassName: 'font-bold',
                closeOnEsc: true,
                closeOnOutside: false,
                showCloseButton: true,
                onConfirm: this.handleBatchAdd,
                body: [
                    {
                        type: 'alert',
                        level: 'warning',
                        body: [
                            {
                                type: 'tpl',
                                tpl: '每个选项单列一行，将所有值不重复的项加为新的选项;<br/>每行可通过空格来分别设置label和value,例："张三 zhangsan"'
                            }
                        ],
                        showIcon: true,
                        className: 'mb-2.5'
                    },
                    {
                        type: 'form',
                        wrapWithPanel: false,
                        mode: 'normal',
                        wrapperComponent: 'div',
                        resetAfterSubmit: true,
                        autoFocus: true,
                        preventEnterSubmit: true,
                        horizontal: {
                            left: 0,
                            right: 12
                        },
                        body: [
                            {
                                name: 'batchOption',
                                type: 'textarea',
                                label: '',
                                placeholder: '请输入选项内容',
                                trimContents: true,
                                minRows: 10,
                                maxRows: 50,
                                required: true
                            }
                        ]
                    }
                ]
            }
        };
    };
    OptionControl.prototype.handleAPIChange = function (source) {
        this.setState({ api: source }, this.onChange);
    };
    OptionControl.prototype.handleLableFieldChange = function (labelField) {
        this.setState({ labelField: labelField }, this.onChange);
    };
    OptionControl.prototype.handleValueFieldChange = function (valueField) {
        this.setState({ valueField: valueField }, this.onChange);
    };
    /** 获取功能性字段控件 schema */
    OptionControl.prototype.getFuncFieldSchema = function () {
        var _a = this.state, labelField = _a.labelField, valueField = _a.valueField;
        return [
            {
                label: tipedLabel('显示字段', '选项文本对应的数据字段，多字段合并请通过模板配置'),
                type: 'input-text',
                name: 'labelField',
                clearable: true,
                value: labelField,
                placeholder: '选项文本对应的字段',
                onChange: this.handleLableFieldChange
            },
            {
                label: '值字段',
                type: 'input-text',
                name: 'valueField',
                clearable: true,
                value: valueField,
                placeholder: '值对应的字段',
                onChange: this.handleValueFieldChange
            }
        ];
    };
    OptionControl.prototype.renderApiPanel = function () {
        var render = this.props.render;
        var _a = this.state, source = _a.source, api = _a.api;
        return render('api', getSchemaTpl('apiControl', {
            label: '接口',
            name: 'source',
            mode: 'normal',
            className: 'ae-ExtendMore',
            visibleOn: 'data.autoComplete !== false',
            value: api,
            onChange: this.handleAPIChange,
            sourceType: source,
            footer: this.getFuncFieldSchema()
        }));
    };
    OptionControl.prototype.render = function () {
        var _this = this;
        var _a = this.state, options = _a.options, source = _a.source;
        var _b = this.props, render = _b.render, className = _b.className, multipleProps = _b.multiple;
        return (React.createElement("div", { className: cx('ae-OptionControl', className) },
            this.renderHeader(),
            source === 'custom' ? (React.createElement("div", { className: "ae-OptionControl-wrapper" },
                Array.isArray(options) && options.length ? (React.createElement("ul", { className: "ae-OptionControl-content", ref: this.dragRef }, options.map(function (option, index) {
                    return _this.renderOption(__assign(__assign({}, option), { index: index, multipleProps: multipleProps }));
                }))) : (React.createElement("div", { className: "ae-OptionControl-placeholder" }, "\u65E0\u9009\u9879")),
                React.createElement("div", { className: "ae-OptionControl-footer" },
                    React.createElement(Button, { level: "enhance", onClick: this.handleAdd, ref: this.targetRef }, "\u6DFB\u52A0\u9009\u9879"),
                    render('inner', this.buildBatchAddSchema())))) : null,
            source === 'api' || source === 'apicenter'
                ? this.renderApiPanel()
                : null,
            source === 'variable'
                ? render('variable', {
                    type: 'control',
                    label: false,
                    className: 'ae-ExtendMore',
                    body: [
                        getSchemaTpl('sourceBindControl', {
                            label: false,
                            onChange: debounce(this.handleAPIChange, 1000)
                        })
                    ].concat(this.getFuncFieldSchema())
                })
                : null));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "targetRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "dragRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleSourceChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleEditLabel", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, String]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleHiddenValueChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleAdd", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, Object]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleBatchAdd", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleAPIChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleLableFieldChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], OptionControl.prototype, "handleValueFieldChange", null);
    return OptionControl;
}(React.Component));
export default OptionControl;
var OptionControlRenderer = /** @class */ (function (_super) {
    __extends(OptionControlRenderer, _super);
    function OptionControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OptionControlRenderer = __decorate([
        FormItem({
            type: 'ae-optionControl',
            renderLabel: false
        })
    ], OptionControlRenderer);
    return OptionControlRenderer;
}(OptionControl));
export { OptionControlRenderer };
