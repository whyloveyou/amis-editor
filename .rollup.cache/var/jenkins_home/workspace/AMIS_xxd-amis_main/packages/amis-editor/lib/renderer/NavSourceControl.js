/**
 * @file 组件选项组件的可视化编辑控件
 */
import { __assign, __awaiter, __decorate, __extends, __generator, __metadata, __values } from "tslib";
import React from 'react';
import cx from 'classnames';
import Sortable from 'sortablejs';
import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { render as renderAmis } from 'amis-core';
import { FormItem, Button, Icon, toast } from 'amis';
import { TooltipWrapper } from 'amis-ui';
import { getSchemaTpl } from 'amis-editor';
import { autobind } from 'amis-editor-core';
var NavSourceControl = /** @class */ (function (_super) {
    __extends(NavSourceControl, _super);
    function NavSourceControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            links: _this.transformOptions(props),
            api: props.data.source,
            source: _this.transformSource(props.data.source),
            showDialog: false,
            isEdit: false,
            modalName: '',
            modalParent: '',
            modalIcon: '',
            modalTarget: '_self',
            modalBadge: '',
            modalUrl: '',
            currentIndex: '',
            previousModalParent: ''
        };
        _this.sortables = [];
        return _this;
    }
    NavSourceControl.prototype.transformSource = function (source) {
        if (source) {
            return 'api';
        }
        return 'custom';
    };
    NavSourceControl.prototype.transformOptions = function (props) {
        var data = props.data;
        return Array.isArray(data.links) ? data.links : [];
    };
    /**
     * 更新统一出口
     */
    NavSourceControl.prototype.onChange = function () {
        var onBulkChange = this.props.onBulkChange;
        var source = this.state.source;
        var data = {
            source: undefined,
            links: undefined
        };
        if (source === 'custom') {
            var links = this.state.links;
            this.handleSetNavId(links, '');
            data.links = links;
        }
        else {
            var api = this.state.api;
            data.source = api;
        }
        onBulkChange && onBulkChange(data);
    };
    /**
     * 切换选项类型
     */
    NavSourceControl.prototype.handleSourceChange = function (source) {
        this.setState({ api: '', source: source }, this.onChange);
    };
    NavSourceControl.prototype.dragRef = function (ref) {
        if (!this.drag && ref) {
            this.drag = ref;
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging(true);
        }
    };
    NavSourceControl.prototype.initDragging = function () {
        var _this = this;
        var _a;
        var rootSortable = new Sortable(this.drag, {
            group: 'NavSourceControlGroup',
            animation: 150,
            handle: '.nav-links-item-dragBar',
            onEnd: function (e) {
                _this.handleDragging(e);
            }
        });
        this.sortables.push(rootSortable);
        var parents = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.nav-links-children');
        if (!parents) {
            return;
        }
        Array.from(parents).forEach(function (parent) {
            var sortable = new Sortable(parent, {
                group: 'NavSourceControlGroup',
                animation: 150,
                handle: '.nav-links-item-dragBar',
                onEnd: function (e) {
                    _this.handleDragging(e);
                }
            });
            _this.sortables.push(sortable);
        });
    };
    NavSourceControl.prototype.handleDragging = function (e) {
        var _this = this;
        var oldIndex = e.oldIndex, newIndex = e.newIndex, from = e.from, to = e.to;
        var nodeOldIndex = from.dataset.level
            ? "".concat(from.dataset.level, "_").concat(oldIndex)
            : "".concat(oldIndex);
        var nodeNewIndex = to.dataset.level
            ? "".concat(to.dataset.level, "_").concat(newIndex)
            : "".concat(newIndex);
        var links = cloneDeep(this.state.links);
        if (!nodeOldIndex || !nodeNewIndex) {
            return;
        }
        var _a = this.getNodePath(nodeOldIndex), oldPath = _a.path, oldParentPath = _a.parentPath;
        var activeDraggingItem = get(links, "".concat(oldPath));
        if (oldParentPath) {
            var oldParent = get(links, "".concat(oldParentPath, ".children"), []);
            typeof oldIndex === 'number' && oldParent.splice(oldIndex, 1);
            set(links, "".concat(oldParentPath, ".children"), oldParent);
        }
        else {
            typeof oldIndex === 'number' && links.splice(oldIndex, 1);
        }
        var newParentPath = this.getNodePath(nodeNewIndex).parentPath;
        if (newParentPath) {
            var newParent = get(links, "".concat(newParentPath, ".children"), []);
            typeof newIndex === 'number' &&
                newParent.splice(newIndex, 0, activeDraggingItem);
            set(links, "".concat(newParentPath, ".children"), newParent);
        }
        else {
            typeof newIndex === 'number' &&
                links.splice(newIndex, 0, activeDraggingItem);
        }
        // 数据diff时会使得dom结构出bug，多个相同节点，先置空再重新赋值
        this.setState({ source: '' }, function () {
            _this.setState({ links: links, source: 'custom' }, function () {
                _this.refreshBindDrag();
                _this.onChange();
            });
        });
    };
    NavSourceControl.prototype.getNodePath = function (pathStr) {
        var pathArr = pathStr.split('_');
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
    NavSourceControl.prototype.refreshBindDrag = function () {
        if (this.drag) {
            this.destroyDragging();
            this.initDragging();
        }
    };
    NavSourceControl.prototype.destroyDragging = function (destroyRoot) {
        this.sortables.forEach(function (sortable) {
            sortable === null || sortable === void 0 ? void 0 : sortable.destroy();
        });
        this.sortables = [];
        destroyRoot && (this.drag = null);
    };
    /**
     * 删除选项
     */
    NavSourceControl.prototype.handleDelete = function (index) {
        var _this = this;
        return new Promise(function (resolve) {
            var links = _this.state.links.concat();
            var pathArr = index.split('_');
            var parentPathArr = pathArr.slice(0, pathArr.length - 1);
            var parentPath = "[".concat(parentPathArr.join('].children['), "]");
            var deleteItemParent = parentPathArr.length > 0
                ? get(links, "".concat(parentPath, ".children"), [])
                : links;
            deleteItemParent.splice(parseInt(pathArr[pathArr.length - 1]), 1);
            _this.setState({ links: links }, function () { return _this.onChange(); });
            resolve('');
        });
    };
    NavSourceControl.prototype.handleUpdate = function (index) {
        var links = this.state.links;
        var pathArr = index.split('_');
        var path = "[".concat(pathArr.join('].children['), "]");
        var updateItem = get(links, path);
        // find parent id
        var parentPathArr = pathArr.slice(0, pathArr.length - 1);
        var parentPath = "[".concat(parentPathArr.join('].children['), "]");
        if (parentPathArr.length > 0) {
            parentPath += 'id';
        }
        var parentId = parentPathArr.length > 0 ? get(links, parentPath) : '';
        this.setState({
            modalName: updateItem.label,
            modalBadge: updateItem.badge,
            modalIcon: updateItem.icon,
            modalParent: parentId,
            previousModalParent: parentId,
            modalTarget: updateItem.target,
            modalUrl: updateItem.to,
            showDialog: true,
            isEdit: true,
            currentIndex: index
        });
    };
    NavSourceControl.prototype.getChildren = function () {
        var _a = this.state, currentIndex = _a.currentIndex, links = _a.links;
        if (!currentIndex) {
            return [];
        }
        var pathArr = currentIndex.split('_');
        var path = "[".concat(pathArr.join('].children['), "]");
        var item = get(links, path);
        if (item && item.children) {
            return item.children;
        }
        else {
            return [];
        }
    };
    NavSourceControl.prototype.handleSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isEdit, modalBadge, modalIcon, modalName, modalParent, modalTarget, modalUrl, currentIndex, previousModalParent, activeLink, links, pathArr, path, links, parentPathArr, parentPath, originChildren;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this.state, isEdit = _a.isEdit, modalBadge = _a.modalBadge, modalIcon = _a.modalIcon, modalName = _a.modalName, modalParent = _a.modalParent, modalTarget = _a.modalTarget, modalUrl = _a.modalUrl, currentIndex = _a.currentIndex, previousModalParent = _a.previousModalParent;
                if (!modalName) {
                    toast.error('菜单名称必填');
                    return [2 /*return*/];
                }
                if (isEdit && currentIndex === modalParent) {
                    toast.error('不能将菜单拖入其自身内部');
                    return [2 /*return*/];
                }
                activeLink = {
                    label: modalName,
                    to: modalUrl,
                    icon: modalIcon,
                    target: modalTarget,
                    badge: modalBadge,
                    children: this.getChildren()
                };
                if (isEdit && previousModalParent === modalParent) {
                    links = cloneDeep(this.state.links);
                    pathArr = currentIndex.split('_');
                    path = "[".concat(pathArr.join('].children['), "]");
                    if (pathArr.length > 0) {
                        // 多层级下
                        set(links, path, activeLink);
                    }
                    else {
                        // 一级菜单
                        links[parseInt(currentIndex)] = activeLink;
                    }
                    this.setState({ links: links }, function () { return _this.onChange(); });
                    this.closeModal();
                }
                else {
                    links = cloneDeep(this.state.links);
                    if (modalParent) {
                        parentPathArr = modalParent.split('_');
                        parentPath = "[".concat(parentPathArr.join('].children['), "].children");
                        originChildren = get(links, parentPath) || [];
                        originChildren.push(activeLink);
                        set(links, parentPath, originChildren);
                    }
                    else {
                        links.push(activeLink);
                    }
                    this.setState({ links: links }, function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.onChange();
                                    if (!isEdit) return [3 /*break*/, 2];
                                    // 更新完新的数据层级，再删除原来的节点
                                    return [4 /*yield*/, this.handleDelete(currentIndex)];
                                case 1:
                                    // 更新完新的数据层级，再删除原来的节点
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    this.closeModal();
                }
                return [2 /*return*/];
            });
        });
    };
    NavSourceControl.prototype.handleSetNavId = function (data, index) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var newIndex = index ? "".concat(index, "_").concat(i) : "".concat(i);
            item.id = newIndex;
            if (item.children) {
                this.handleSetNavId(item.children, newIndex);
            }
        }
    };
    NavSourceControl.prototype.handleDeleteNavId = function (data) {
        var e_1, _a;
        if (Array.isArray(data)) {
            try {
                for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var item = data_1_1.value;
                    delete item.id;
                    if (item.children) {
                        this.handleDeleteNavId(item.children);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            delete data.id;
            if (data.children) {
                this.handleDeleteNavId(data.children);
            }
        }
    };
    NavSourceControl.prototype.handleFilterTreeData = function (data) {
        var e_2, _a;
        var currentIndex = this.state.currentIndex;
        try {
            for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                var item = data_2_1.value;
                if (item.id === currentIndex) {
                    this.handleDeleteNavId(item);
                    break;
                }
                else if (item.children) {
                    this.handleFilterTreeData(item.children);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    NavSourceControl.prototype.openModal = function () {
        this.setState({
            showDialog: true
        });
    };
    NavSourceControl.prototype.closeModal = function () {
        this.setState({
            showDialog: false,
            isEdit: false,
            modalParent: '',
            modalName: '',
            modalUrl: '',
            modalIcon: '',
            modalBadge: '',
            modalTarget: '_self',
            currentIndex: ''
        });
    };
    NavSourceControl.prototype.handleChange = function (options) {
        this.setState(options, this.onChange);
    };
    NavSourceControl.prototype.handleAPIChange = function (source) {
        this.setState({ api: source }, this.onChange);
    };
    NavSourceControl.prototype.renderApiPanel = function () {
        var render = this.props.render;
        var _a = this.state, source = _a.source, api = _a.api;
        if (source === 'api') {
            return render('nav-' + source, getSchemaTpl('apiControl', {
                label: '接口',
                name: 'source',
                mode: 'normal',
                className: 'ae-ExtendMore',
                value: api,
                onChange: this.handleAPIChange,
                sourceType: source
            }));
        }
        return null;
    };
    NavSourceControl.prototype.renderHeader = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, render = _c.render, label = _c.label, labelRemark = _c.labelRemark, mobileUI = _c.mobileUI, env = _c.env, popOverContainer = _c.popOverContainer;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        var source = this.state.source;
        var optionSourceList = [
            {
                label: '自定义菜单',
                value: 'custom'
            },
            {
                label: '外部接口',
                value: 'api'
            }
        ].map(function (item) { return (__assign(__assign({ key: item.value }, item), { onClick: function () { return _this.handleSourceChange(item.value); } })); });
        return (React.createElement("header", { className: "ae-NavControl-header" },
            React.createElement("label", { className: cx("".concat(classPrefix, "Form-label")) },
                label || '',
                labelRemark
                    ? render('label-remark', {
                        type: 'remark',
                        icon: labelRemark.icon || 'warning-mark',
                        tooltip: labelRemark,
                        className: cx("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
                        mobileUI: mobileUI,
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
                    selected: (_b = optionSourceList.find(function (item) { return item.value === source; })) === null || _b === void 0 ? void 0 : _b.label
                }
            }))));
    };
    NavSourceControl.prototype.renderNav = function (dataSource, index) {
        var _this = this;
        var render = this.props.render;
        return (React.createElement(React.Fragment, null, dataSource.map(function (nav, i) {
            return (React.createElement("div", { className: 'nav-links-parent', key: nav.id || index ? "".concat(index, "_").concat(i) : "".concat(i), "data-path": index ? "".concat(index, "_").concat(i) : "".concat(i) },
                React.createElement("div", { className: "nav-links-item" },
                    React.createElement("a", { className: "nav-links-item-dragBar" },
                        React.createElement(Icon, { icon: "drag-bar", className: "icon" })),
                    nav.icon &&
                        render("render-icon-".concat(typeof nav.icon !== 'string' ? nav.icon.id : nav.icon), {
                            type: 'icon',
                            icon: nav.icon,
                            className: 'nav-links-item-icon'
                        }),
                    React.createElement(TooltipWrapper, { tooltip: nav.label, placement: "left" },
                        React.createElement("div", { className: "nav-links-item-label" }, nav.label)),
                    React.createElement("div", { className: "nav-links-item-actions" },
                        React.createElement(TooltipWrapper, { tooltip: "\u7F16\u8F91", placement: "left" },
                            React.createElement(Icon, { icon: "edit", className: "icon icon-edit", onClick: function () {
                                    return _this.handleUpdate(index ? "".concat(index, "_").concat(i) : "".concat(i));
                                } })),
                        React.createElement(TooltipWrapper, { tooltip: "\u5220\u9664", placement: "left" },
                            React.createElement(Icon, { icon: "delete-btn", className: "icon icon-delete", onClick: function () {
                                    return _this.handleDelete(index ? "".concat(index, "_").concat(i) : "".concat(i));
                                } })))),
                nav.children && nav.children.length > 0 && (React.createElement("div", { className: "nav-links-children", "data-level": index ? "".concat(index, "_").concat(i) : "".concat(i) }, _this.renderNav(nav.children, index ? "".concat(index, "_").concat(i) : "".concat(i))))));
        })));
    };
    NavSourceControl.prototype.renderDialog = function () {
        var _this = this;
        var _a = this.state, links = _a.links, modalBadge = _a.modalBadge, modalIcon = _a.modalIcon, modalName = _a.modalName, modalParent = _a.modalParent, modalUrl = _a.modalUrl, modalTarget = _a.modalTarget, isEdit = _a.isEdit;
        var treeData = cloneDeep(links);
        this.handleFilterTreeData(treeData);
        return renderAmis({
            type: 'dialog',
            title: isEdit ? '编辑菜单项' : '添加菜单项',
            bodyClassName: 'ae-NavControl-dialog',
            body: {
                type: 'form',
                mode: 'horizontal',
                wrapperComponent: 'div',
                actions: [],
                body: [
                    {
                        type: 'input-text',
                        label: '菜单名称',
                        name: 'modalName',
                        placeholder: '请输入菜单名称',
                        mode: 'horizontal',
                        required: true,
                        horizontal: {
                            justify: true,
                            left: 2
                        },
                        onChange: function (value) {
                            _this.setState({ modalName: value });
                        }
                    },
                    {
                        type: 'tree-select',
                        label: '父级菜单',
                        name: 'modalParent',
                        initiallyOpen: false,
                        placeholder: '请选择，不选择默认为一级菜单',
                        searchable: true,
                        multiple: false,
                        valueField: 'id',
                        options: treeData,
                        mode: 'horizontal',
                        horizontal: {
                            justify: true,
                            left: 2
                        },
                        onChange: function (value) {
                            _this.setState({ modalParent: value });
                        }
                    },
                    getSchemaTpl('icon', {
                        name: 'modalIcon',
                        label: '菜单图标',
                        mode: 'horizontal',
                        horizontal: {
                            justify: true,
                            left: 2
                        },
                        onChange: function (value) {
                            _this.setState({ modalIcon: value });
                        }
                    }),
                    {
                        type: 'input-text',
                        label: '跳转地址',
                        placeholder: '请输入地址',
                        mode: 'horizontal',
                        name: 'modalUrl',
                        horizontal: {
                            justify: true,
                            left: 2
                        },
                        onChange: function (value) {
                            _this.setState({ modalUrl: value });
                        }
                    },
                    {
                        type: 'radios',
                        name: 'modalTarget',
                        label: '跳转方式',
                        inline: true,
                        options: [
                            {
                                label: '当前页展开',
                                value: '_self'
                            },
                            {
                                label: '新标签页打开',
                                value: '_blank'
                            }
                        ],
                        mode: 'horizontal',
                        horizontal: {
                            justify: true,
                            left: 2
                        },
                        onChange: function (value) {
                            _this.setState({ modalTarget: value });
                        }
                    },
                    {
                        type: 'input-text',
                        label: '角标内容',
                        placeholder: '若为空则不展示角标',
                        mode: 'horizontal',
                        name: 'modalBadge',
                        horizontal: {
                            justify: true,
                            left: 2
                        },
                        onChange: function (value) {
                            _this.setState({ modalBadge: value });
                        }
                    }
                ]
            }
        }, {
            data: {
                modalBadge: modalBadge,
                modalIcon: modalIcon,
                modalName: modalName,
                modalParent: modalParent,
                modalUrl: modalUrl,
                modalTarget: modalTarget
            },
            onClose: this.closeModal,
            onConfirm: this.handleSubmit
        });
    };
    NavSourceControl.prototype.render = function () {
        var _a = this.state, links = _a.links, source = _a.source, showDialog = _a.showDialog;
        var className = this.props.className;
        return (React.createElement("div", { className: cx('ae-NavControl', className) },
            this.renderHeader(),
            source === 'custom' ? (React.createElement("div", { className: "ae-NavControl-wrapper" },
                Array.isArray(links) && links.length ? (React.createElement("div", { className: "ae-NavControl-content", ref: this.dragRef }, this.renderNav(links))) : (React.createElement("div", { className: "ae-NavControl-placeholder" }, "\u65E0\u9009\u9879")),
                React.createElement("div", { className: "ae-NavControl-footer" },
                    React.createElement(Button, { level: "enhance", onClick: this.openModal }, "\u6DFB\u52A0\u83DC\u5355")))) : (this.renderApiPanel()),
            showDialog && this.renderDialog()));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleSourceChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "dragRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleDragging", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "getNodePath", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "destroyDragging", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleDelete", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleUpdate", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "getChildren", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], NavSourceControl.prototype, "handleSubmit", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array, String]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleSetNavId", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleDeleteNavId", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleFilterTreeData", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "openModal", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "closeModal", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavSourceControl.prototype, "handleAPIChange", null);
    return NavSourceControl;
}(React.Component));
export { NavSourceControl };
var NavSourceControlRenderer = /** @class */ (function (_super) {
    __extends(NavSourceControlRenderer, _super);
    function NavSourceControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavSourceControlRenderer = __decorate([
        FormItem({
            type: 'ae-navSourceControl',
            renderLabel: false
        })
    ], NavSourceControlRenderer);
    return NavSourceControlRenderer;
}(NavSourceControl));
export { NavSourceControlRenderer };
