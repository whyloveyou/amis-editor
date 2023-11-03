/**
 * @file 组件选项组件的可视化编辑控件
 */
import { __assign, __decorate, __extends, __metadata, __read, __spreadArray } from "tslib";
import React from 'react';
import cx from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import Sortable from 'sortablejs';
import { FormItem, Button, Icon, InputBox, Modal, toast, render as amisRender } from 'amis';
import { autobind, getI18nEnabled } from 'amis-editor-core';
import { getSchemaTpl, tipedLabel } from 'amis-editor-core';
var defaultOption = {
    label: '',
    value: ''
};
var TreeOptionControl = /** @class */ (function (_super) {
    __extends(TreeOptionControl, _super);
    function TreeOptionControl(props) {
        var _this = _super.call(this, props) || this;
        _this.internalProps = ['checked', 'editing'];
        var _a = props.data || {}, source = _a.source, labelField = _a.labelField, valueField = _a.valueField, showIconField = _a.showIconField, iconField = _a.iconField;
        _this.state = {
            options: _this.transformOptions(props),
            api: source,
            labelField: labelField,
            valueField: valueField,
            iconField: showIconField ? iconField : undefined,
            source: source
                ? /\$\{(.*?)\}/g.test(source)
                    ? 'variable'
                    : 'api'
                : 'custom',
            modalVisible: false
        };
        _this.sortables = [];
        return _this;
    }
    TreeOptionControl.prototype.transformOptions = function (props) {
        var value = props.value;
        if (!value || !Array.isArray(value) || !value.length) {
            return [__assign({}, defaultOption)];
        }
        return value;
    };
    /**
     * 处理下未设置value的情况
     */
    TreeOptionControl.prototype.pretreatOptions = function (options) {
        var _this = this;
        if (!Array.isArray(options)) {
            return [];
        }
        return options.map(function (option) {
            if (option.children && option.children.length) {
                option.children = _this.pretreatOptions(option.children);
            }
            option.value =
                option.value == null || option.value === ''
                    ? option.label
                    : option.value;
            return option;
        });
    };
    /**
     * 更新options字段的统一出口
     */
    TreeOptionControl.prototype.onChange = function () {
        var _a = this.state, source = _a.source, api = _a.api, labelField = _a.labelField, valueField = _a.valueField, iconField = _a.iconField;
        var onBulkChange = this.props.onBulkChange;
        var data = {
            source: undefined,
            options: undefined,
            labelField: undefined,
            valueField: undefined,
            iconField: undefined
        };
        if (source === 'custom') {
            var options = this.state.options.concat();
            data.options = this.pretreatOptions(options);
        }
        if (source === 'api' || source === 'apicenter' || source === 'variable') {
            data.source = api;
            data.labelField = labelField || undefined;
            data.valueField = valueField || undefined;
            data.iconField = iconField;
        }
        onBulkChange && onBulkChange(data);
        return;
    };
    /**
     * 切换选项类型
     */
    TreeOptionControl.prototype.handleSourceChange = function (source) {
        this.setState({ api: '', source: source }, this.onChange);
    };
    TreeOptionControl.prototype.renderHeader = function () {
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
        ], false).map(function (item) { return (__assign(__assign({}, item), { onClick: function () { return _this.handleSourceChange(item.value); } })); });
        return (React.createElement("header", { className: "ae-TreeOptionControl-header" },
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
    TreeOptionControl.prototype.handleEditLabelOrValue = function (value, path, key) {
        var _this = this;
        var options = cloneDeep(this.state.options);
        var nodePath = this.getNodePath(path).path;
        set(options, "".concat(nodePath, ".").concat(key), value);
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.handleDelete = function (pathStr, index) {
        var _this = this;
        var _a, _b;
        var options = cloneDeep(this.state.options);
        if (!pathStr.includes('-') && options.length === 1) {
            toast.warning('至少保留一个根节点', { closeButton: true });
            return;
        }
        var path = pathStr.split('-');
        if (path.length === 1) {
            options.splice(index, 1);
        }
        else {
            var parentPath = this.getNodePath(pathStr).parentPath;
            var parentNode = get(options, parentPath, {});
            (_a = parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) === null || _a === void 0 ? void 0 : _a.splice(index, 1);
            if (((_b = parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                // 去除僵尸子节点
                delete parentNode.children;
            }
            set(options, parentPath, parentNode);
        }
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.getNodePath = function (pathStr) {
        var pathArr = pathStr.split('-');
        if (pathArr.length === 1) {
            return {
                path: pathArr,
                parentPath: ''
            };
        }
        var path = "[".concat(pathArr.join('].children['), "]");
        pathArr = pathArr.slice(0, pathArr.length - 1);
        var parentPath = "[".concat(pathArr.join('].children['), "]");
        return {
            path: path,
            parentPath: parentPath
        };
    };
    TreeOptionControl.prototype.addOption = function (pathStr) {
        var _this = this;
        var _a;
        var options = cloneDeep(this.state.options);
        var path = pathStr.split('-');
        if (path.length === 1) {
            options.splice(+path[0] + 1, 0, __assign({}, defaultOption)); // 加在后面一项
        }
        else {
            var index = path[path.length - 1];
            var parentPath = this.getNodePath(pathStr).parentPath;
            var parentNode = get(options, parentPath, {});
            (_a = parentNode.children) === null || _a === void 0 ? void 0 : _a.splice(+index + 1, 0, __assign({}, defaultOption));
            set(options, parentPath, parentNode);
        }
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.addChildOption = function (pathStr) {
        var _this = this;
        if (pathStr.split('-').length >= 6) {
            toast.warning('层级过深，建议使用【接口获取】管理选项', {
                closeButton: true
            });
            return;
        }
        var options = cloneDeep(this.state.options);
        var path = this.getNodePath(pathStr).path;
        var node = get(options, path) || [];
        if (node.children) {
            node.children.push(__assign({}, defaultOption));
        }
        else {
            node.children = [__assign({}, defaultOption)];
        }
        set(options, path, node);
        this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
    };
    TreeOptionControl.prototype.hideModal = function (notResetOptions) {
        this.setState({ modalVisible: false });
        if (!notResetOptions) {
            this.setState({ options: this.transformOptions(this.props) });
        }
    };
    TreeOptionControl.prototype.renderOptions = function (option, key, indexes) {
        var _this = this;
        var render = this.props.render;
        var i18nEnabled = getI18nEnabled();
        var path = indexes.join('-');
        if (option.children && option.children.length) {
            var parent_1 = cloneDeep(option);
            delete parent_1.children;
            return (React.createElement("div", { className: cx('ae-TreeOptionControlItem-parent'), key: "parent".concat(path).concat(key).concat(option.label) },
                this.renderOptions(parent_1, key, indexes),
                React.createElement("div", { className: cx('ae-TreeOptionControlItem-son'), key: "son".concat(path).concat(key).concat(option.label), "data-level": path }, option.children.map(function (option, key) {
                    return _this.renderOptions(option, key, indexes.concat(key));
                }))));
        }
        return (React.createElement("div", { className: "ae-TreeOptionControlItem", key: "child".concat(path).concat(key).concat(option.label), "data-path": path },
            React.createElement("a", { className: "ae-TreeOptionControlItem-dragBar" },
                React.createElement(Icon, { icon: "drag-bar", className: "icon" })),
            i18nEnabled ? (amisRender({
                type: 'input-text-i18n',
                className: 'ae-TreeOptionControlItem-input-label',
                value: option.label,
                placeholder: '选项名称',
                clearable: false,
                onBlur: function (event) {
                    _this.handleEditLabelOrValue(event.target.value, path, 'label');
                },
                onI18nChange: function (value) {
                    _this.handleEditLabelOrValue(value, path, 'label');
                }
            })) : (React.createElement(InputBox, { className: "ae-TreeOptionControlItem-input-label", value: option.label, placeholder: "\u9009\u9879\u540D\u79F0", clearable: false, onBlur: function (event) {
                    _this.handleEditLabelOrValue(event.target.value, path, 'label');
                } })),
            React.createElement(InputBox, { className: "ae-TreeOptionControlItem-input-value", value: option.value, placeholder: "\u9009\u9879\u503C", clearable: false, onBlur: function (event) {
                    _this.handleEditLabelOrValue(event.target.value, path, 'value');
                } }),
            React.createElement("div", { className: "ae-TreeOptionControlItem-btns" },
                render('dropdown', {
                    type: 'dropdown-button',
                    className: 'ae-TreeOptionControlItem-dropdown fa-sm',
                    btnClassName: 'px-2',
                    icon: 'add',
                    hideCaret: true,
                    closeOnClick: true,
                    trigger: 'hover',
                    align: 'right',
                    menuClassName: 'ae-TreeOptionControlItem-ulmenu',
                    buttons: [
                        {
                            type: 'button',
                            className: 'ae-OptionControlItem-action',
                            label: '添加选项',
                            onClick: function () {
                                _this.addOption(path);
                            }
                        },
                        {
                            type: 'button',
                            className: 'ae-OptionControlItem-action',
                            label: '添加子选项',
                            onClick: function () {
                                _this.addChildOption(path);
                            }
                        }
                    ]
                }, {
                    popOverContainer: null // amis 渲染挂载节点会使用 this.target
                }),
                React.createElement(Button, { size: "sm", onClick: function () {
                        _this.handleDelete(path, key);
                    } },
                    React.createElement(Icon, { className: "icon", icon: "delete-bold-btn" })))));
    };
    TreeOptionControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.drag = ref;
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging(true);
        }
    };
    TreeOptionControl.prototype.rereshBindDrag = function () {
        if (this.drag) {
            this.destroyDragging();
            this.initDragging();
        }
    };
    TreeOptionControl.prototype.initDragging = function () {
        var _this = this;
        var _a;
        var rootSortable = new Sortable(this.drag, {
            group: 'TreeOptionControlGroup',
            animation: 150,
            handle: '.ae-TreeOptionControlItem-dragBar',
            ghostClass: 'ae-TreeOptionControlItem-dragging',
            onEnd: function (e) {
                var _a;
                var options = cloneDeep(_this.state.options);
                var oldIndex = e.oldIndex, newIndex = e.newIndex;
                _a = __read([
                    options[oldIndex],
                    options[newIndex]
                ], 2), options[newIndex] = _a[0], options[oldIndex] = _a[1];
                _this.setState({ options: options }, function () { return _this.rereshBindDrag(); });
            },
            onMove: function (e) {
                var from = e.from, to = e.to;
                // 暂时不支持跨级拖拽
                return from.dataset.level === to.dataset.level;
            }
        });
        this.sortables.push(rootSortable);
        var parents = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.ae-TreeOptionControlItem-son');
        if (!parents) {
            return;
        }
        Array.from(parents).forEach(function (parent) {
            var sortable = new Sortable(parent, {
                group: 'TreeOptionControlGroup',
                animation: 150,
                handle: '.ae-TreeOptionControlItem-dragBar',
                ghostClass: 'ae-TreeOptionControlItem-dragging',
                // fallbackOnBody: true,
                onEnd: function (e) {
                    var _a;
                    var item = e.item, oldIndex = e.oldIndex, newIndex = e.newIndex;
                    var options = cloneDeep(_this.state.options);
                    var nodePath = item.dataset.path;
                    if (!nodePath) {
                        return;
                    }
                    var parentPath = _this.getNodePath(nodePath).parentPath;
                    var children = get(options, "".concat(parentPath, ".children")) || [];
                    if (children) {
                        _a = __read([
                            children[newIndex],
                            children[oldIndex]
                        ], 2), children[oldIndex] = _a[0], children[newIndex] = _a[1];
                        set(options, "".concat(parentPath, ".children"), children);
                        _this.setState({ options: options });
                    }
                },
                onMove: function (e) {
                    var from = e.from, to = e.to;
                    // 暂时不支持跨级拖拽
                    return from.dataset.level === to.dataset.level;
                }
            });
            _this.sortables.push(sortable);
        });
    };
    TreeOptionControl.prototype.destroyDragging = function (destroyRoot) {
        this.sortables.forEach(function (sortable) {
            sortable === null || sortable === void 0 ? void 0 : sortable.destroy();
        });
        this.sortables = [];
        destroyRoot && (this.drag = null);
    };
    TreeOptionControl.prototype.renderModal = function () {
        var _this = this;
        var _a = this.state, modalVisible = _a.modalVisible, options = _a.options;
        return (React.createElement(Modal, { className: "ae-TreeOptionControl-Modal", show: modalVisible, onHide: function () {
                _this.hideModal();
            } },
            React.createElement(Modal.Header, { onClose: function () {
                    _this.hideModal();
                } }, "\u9009\u9879\u7BA1\u7406"),
            React.createElement(Modal.Body, null,
                React.createElement("div", { className: "ae-TreeOptionControl-content", ref: this.dragRef }, options.map(function (option, key) {
                    return _this.renderOptions(option, key, [key]);
                }))),
            React.createElement(Modal.Footer, null,
                React.createElement(Button, { onClick: function () {
                        _this.hideModal();
                    } }, "\u53D6\u6D88"),
                React.createElement(Button, { level: "primary", onClick: function () {
                        _this.onChange();
                        _this.hideModal(true);
                    } }, "\u786E\u8BA4"))));
    };
    TreeOptionControl.prototype.handleAPIChange = function (source) {
        this.setState({ api: source }, this.onChange);
    };
    TreeOptionControl.prototype.handleLableFieldChange = function (labelField) {
        this.setState({ labelField: labelField }, this.onChange);
    };
    TreeOptionControl.prototype.handleValueFieldChange = function (valueField) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
        this.setState({ valueField: valueField }, this.onChange);
    };
    TreeOptionControl.prototype.handleIconFieldChange = function (iconField) {
        this.setState({ iconField: iconField }, this.onChange);
    };
    TreeOptionControl.prototype.renderApiPanel = function () {
        var _a = this.props, render = _a.render, _b = _a.showIconField, showIconField = _b === void 0 ? false : _b;
        var _c = this.state, source = _c.source, api = _c.api, labelField = _c.labelField, valueField = _c.valueField, iconField = _c.iconField;
        return render('api', getSchemaTpl('apiControl', {
            label: '接口',
            name: 'source',
            className: 'ae-ExtendMore',
            visibleOn: 'data.autoComplete !== false',
            value: api,
            onChange: this.handleAPIChange,
            sourceType: source,
            footer: [
                {
                    label: tipedLabel('显示字段', '选项文本对应的数据字段，多字段合并请通过模板配置'),
                    type: 'input-text',
                    name: 'labelField',
                    value: labelField,
                    placeholder: '选项文本对应的字段',
                    onChange: this.handleLableFieldChange
                },
                {
                    label: '值字段',
                    type: 'input-text',
                    name: 'valueField',
                    value: valueField,
                    placeholder: '值对应的字段',
                    onChange: this.handleValueFieldChange
                },
                {
                    type: 'input-text',
                    label: '图标字段',
                    name: 'iconField',
                    value: iconField,
                    placeholder: '图标对应的字段',
                    visible: showIconField,
                    onChange: this.handleIconFieldChange
                }
            ]
        }));
    };
    TreeOptionControl.prototype.render = function () {
        var _this = this;
        var source = this.state.source;
        var _a = this.props, className = _a.className, render = _a.render;
        return (React.createElement("div", { className: cx('ae-TreeOptionControl', className) },
            this.renderHeader(),
            source === 'custom' ? (React.createElement("div", { className: "ae-TreeOptionControl-wrapper" },
                React.createElement("div", null,
                    React.createElement(Button, { block: true, onClick: function () {
                            _this.setState({
                                modalVisible: true
                            });
                        } }, "\u9009\u9879\u7BA1\u7406"),
                    this.renderModal()))) : null,
            source === 'api' || source === 'apicenter'
                ? this.renderApiPanel()
                : null,
            source === 'variable'
                ? render('variable', getSchemaTpl('sourceBindControl', {
                    label: false,
                    className: 'ae-ExtendMore'
                }), {
                    onChange: this.handleAPIChange
                })
                : null));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleSourceChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleDelete", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "getNodePath", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "addOption", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "addChildOption", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "hideModal", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number, Array]),
        __metadata("design:returntype", Object)
    ], TreeOptionControl.prototype, "renderOptions", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "dragRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "destroyDragging", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "renderModal", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleAPIChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleLableFieldChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleValueFieldChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TreeOptionControl.prototype, "handleIconFieldChange", null);
    return TreeOptionControl;
}(React.Component));
export default TreeOptionControl;
var TreeOptionControlRenderer = /** @class */ (function (_super) {
    __extends(TreeOptionControlRenderer, _super);
    function TreeOptionControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeOptionControlRenderer = __decorate([
        FormItem({
            type: 'ae-treeOptionControl',
            renderLabel: false
        })
    ], TreeOptionControlRenderer);
    return TreeOptionControlRenderer;
}(TreeOptionControl));
export { TreeOptionControlRenderer };
