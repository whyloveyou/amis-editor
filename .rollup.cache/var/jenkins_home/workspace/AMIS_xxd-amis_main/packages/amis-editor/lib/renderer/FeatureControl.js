/**
 * @file 控制功能开关的控件，这里的功能指需要加子组件来支持的功能
 */
import { __decorate, __extends, __metadata } from "tslib";
import React from 'react';
import { findDOMNode } from 'react-dom';
import Sortable from 'sortablejs';
import cx from 'classnames';
import clone from 'lodash/clone';
import remove from 'lodash/remove';
import isPlainObject from 'lodash/isPlainObject';
import { FormItem, Button, Icon, autobind } from 'amis';
import { Checkbox } from 'amis-ui';
import { evalExpression } from 'amis-core';
import { GoConfigControl } from './GoConfigControl';
var klass = 'ae-FeatureControl';
var FeatureControl = /** @class */ (function (_super) {
    __extends(FeatureControl, _super);
    function FeatureControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = FeatureControl.initState(props.data, props.features);
        return _this;
    }
    FeatureControl.getDerivedStateFromProps = function (nextProps, preState) {
        return FeatureControl.initState(nextProps.data, nextProps.features, preState.inUseFeat, preState.unUseFeat);
    };
    FeatureControl.initState = function (data, features, lastInUseFeat, lastUnUseFeat) {
        var inUseFeat = [];
        var unUseFeat = [];
        if (!Array.isArray(features)) {
            features = features(data);
        }
        features.forEach(function (item) {
            var _a;
            if (item.isActive == null || ((_a = item.isActive) === null || _a === void 0 ? void 0 : _a.call(item, data))) {
                inUseFeat.push(item);
            }
            else if (item.add) {
                unUseFeat.push(item);
            }
        });
        return {
            inUseFeat: inUseFeat,
            unUseFeat: unUseFeat
        };
    };
    FeatureControl.prototype.handleRemove = function (item, index) {
        var _a;
        var _b = this.props, removeFeature = _b.removeFeature, data = _b.data, onBulkChange = _b.onBulkChange;
        var _c = this.state, inUseFeat = _c.inUseFeat, unUseFeat = _c.unUseFeat;
        (_a = item.remove) === null || _a === void 0 ? void 0 : _a.call(item, data);
        removeFeature === null || removeFeature === void 0 ? void 0 : removeFeature(item, data);
        onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(data);
        remove(inUseFeat, item);
        item.add && unUseFeat.push(item);
        this.setState({ inUseFeat: inUseFeat, unUseFeat: unUseFeat });
    };
    FeatureControl.prototype.handleSort = function (e) {
        var _a = this.props, data = _a.data, onBulkChange = _a.onBulkChange, onSort = _a.onSort;
        onSort === null || onSort === void 0 ? void 0 : onSort(data, e);
        onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(data);
    };
    FeatureControl.prototype.handleAdd = function (item) {
        var _a;
        var _b = this.props, addFeature = _b.addFeature, data = _b.data, onBulkChange = _b.onBulkChange;
        var _c = this.state, inUseFeat = _c.inUseFeat, unUseFeat = _c.unUseFeat;
        inUseFeat.push(item);
        remove(unUseFeat, item);
        var schema = clone(data);
        (_a = item.add) === null || _a === void 0 ? void 0 : _a.call(item, schema);
        addFeature === null || addFeature === void 0 ? void 0 : addFeature(item, schema);
        onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(schema);
    };
    FeatureControl.prototype.dragRef = function (ref) {
        var sortable = this.props.sortable;
        if (!sortable) {
            return;
        }
        if (!this.drag && ref) {
            this.initDragging();
        }
        else if (this.drag && !ref) {
            this.destroyDragging();
        }
        this.drag = ref;
    };
    /**
     * 初始化拖动
     */
    FeatureControl.prototype.initDragging = function () {
        var _this = this;
        var dom = findDOMNode(this);
        this.sortable = new Sortable(dom.querySelector(".".concat(klass, "-features")), {
            group: 'FeatureControlGroup',
            animation: 150,
            handle: ".".concat(klass, "Item-dragBar"),
            ghostClass: "".concat(klass, "Item-dragging"),
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
                var value = _this.state.inUseFeat.concat();
                value[e.oldIndex] = value.splice(e.newIndex, 1, value[e.oldIndex])[0];
                _this.setState({ inUseFeat: value }, function () {
                    _this.handleSort({
                        oldIndex: e.oldIndex,
                        newIndex: e.newIndex
                    });
                });
            }
        });
    };
    /**
     * 拖动的销毁
     */
    FeatureControl.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
    };
    FeatureControl.prototype.handleCheck = function (res, index) {
        var _a = this.props, data = _a.data, onBulkChange = _a.onBulkChange, onItemCheck = _a.onItemCheck;
        var schema = clone(data);
        onItemCheck === null || onItemCheck === void 0 ? void 0 : onItemCheck(res, index, schema);
        onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(schema);
    };
    FeatureControl.prototype.renderItem = function (item, index, checkable) {
        var _this = this;
        var _a = this.props, sortable = _a.sortable, goFeatureComp = _a.goFeatureComp, node = _a.node, manager = _a.manager, onItemCheck = _a.onItemCheck, isItemChecked = _a.isItemChecked, data = _a.data;
        var content = null;
        if (goFeatureComp) {
            content = (
            // @ts-ignore
            React.createElement(GoConfigControl, { className: cx("".concat(klass, "Item-go")), label: item.label, manager: manager, compId: function () { return goFeatureComp(item, index); } }));
        }
        else {
            content = React.createElement("div", { className: cx("".concat(klass, "Item-label")) }, item.label);
        }
        return (React.createElement("li", { className: klass + 'Item', key: index },
            checkable && onItemCheck && (React.createElement(Checkbox, { checked: isItemChecked(item, index, data), onChange: function (val) { return _this.handleCheck(val, index); } })),
            React.createElement("div", { className: klass + 'Item-content' },
                sortable && (React.createElement("a", { className: klass + 'Item-dragBar' },
                    React.createElement(Icon, { icon: "drag-bar", className: "icon" }))),
                content),
            React.createElement(Button, { className: klass + 'Item-action', onClick: function () { return _this.handleRemove(item, index); } },
                React.createElement(Icon, { icon: "delete-btn", className: "icon" }))));
    };
    FeatureControl.prototype.renderAction = function () {
        var _this = this;
        var _a = this.props, addable = _a.addable, addText = _a.addText, render = _a.render, customAction = _a.customAction, data = _a.data, onBulkChange = _a.onBulkChange, hideAddWhenAll = _a.hideAddWhenAll;
        if (!addable) {
            return null;
        }
        if (customAction && typeof customAction === 'function') {
            var schema = customAction({ onBulkChange: onBulkChange, schema: clone(data) });
            if (isPlainObject(schema) && typeof schema.type === 'string') {
                return render('custom-action', schema);
            }
        }
        if (hideAddWhenAll && !this.state.unUseFeat.length) {
            return null;
        }
        return render('action', {
            type: 'dropdown-button',
            closeOnClick: true,
            label: '添加' || addText,
            className: "".concat(klass, "-action"),
            btnClassName: "".concat(klass, "-action--btn"),
            menuClassName: "".concat(klass, "-action--menus"),
            buttons: this.state.unUseFeat.map(function (item) {
                return {
                    label: item.label,
                    onClick: function () { return _this.handleAdd(item); }
                };
            }, {
                popOverContainer: null // amis 渲染挂载节点会使用 this.target
            })
        });
    };
    FeatureControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, checkable = _a.checkable, checkableOn = _a.checkableOn, data = _a.data;
        var isCheckable = false;
        if (checkable !== undefined) {
            isCheckable = checkable;
        }
        else if (checkableOn) {
            isCheckable = evalExpression(checkableOn, data) === true;
        }
        return (React.createElement("div", { className: cx('ae-FeatureControl', className) },
            React.createElement("ul", { className: cx('ae-FeatureControl-features'), ref: this.dragRef }, this.state.inUseFeat.map(function (item, index) {
                return _this.renderItem(item, index, isCheckable);
            })),
            this.renderAction()));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", void 0)
    ], FeatureControl.prototype, "handleRemove", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FeatureControl.prototype, "handleAdd", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FeatureControl.prototype, "dragRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean, Number]),
        __metadata("design:returntype", void 0)
    ], FeatureControl.prototype, "handleCheck", null);
    return FeatureControl;
}(React.Component));
export default FeatureControl;
var FeatureControlRenderer = /** @class */ (function (_super) {
    __extends(FeatureControlRenderer, _super);
    function FeatureControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FeatureControlRenderer = __decorate([
        FormItem({
            type: 'ae-feature-control'
        })
    ], FeatureControlRenderer);
    return FeatureControlRenderer;
}(FeatureControl));
export { FeatureControlRenderer };
