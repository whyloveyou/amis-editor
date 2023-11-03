/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var reactDom = require('react-dom');
var cx = require('classnames');
var get = require('lodash/get');
var Sortable = require('sortablejs');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var amisCore = require('amis-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);

/**
 * @file 通用数组列表项的可视化编辑控件
 */
var ListItemControl = /** @class */function (_super) {
  tslib.__extends(ListItemControl, _super);
  function ListItemControl(props) {
    var _this = _super.call(this, props) || this;
    _this.internalProps = ['checked', 'editing'];
    _this.state = {
      items: _this.transformOptions(props),
      api: props.data.source,
      labelField: props.data.labelField || 'title',
      valueField: props.data.valueField
    };
    return _this;
  }
  /**
   * 数据更新
   */
  ListItemControl.prototype.componentWillReceiveProps = function (nextProps) {
    var items = get__default["default"](nextProps, 'items') ? this.transformOptions(nextProps) : [];
    if (JSON.stringify(this.state.items.map(function (item) {
      return tslib.__assign(tslib.__assign({}, item), {
        editing: undefined
      });
    })) !== JSON.stringify(items)) {
      this.setState({
        items: items
      });
    }
  };
  /**
   * 处理填入输入框的值
   */
  ListItemControl.prototype.transformOptionValue = function (value) {
    return typeof value === 'undefined' || value === null ? '' : typeof value === 'string' ? value : JSON.stringify(value);
  };
  ListItemControl.prototype.transformOptions = function (props) {
    props.data;
      var options = props.value;
    return Array.isArray(options) ? options.map(function (item) {
      return tslib.__assign(tslib.__assign(tslib.__assign({}, item), item.hidden !== undefined ? {
        hidden: item.hidden
      } : {}), item.hiddenOn !== undefined ? {
        hiddenOn: item.hiddenOn
      } : {});
    }) : [];
  };
  /**
   * 更新options字段的统一出口
   */
  ListItemControl.prototype.onChange = function () {
    var onChange = this.props.onChange;
    onChange(this.state.items);
    return;
  };
  ListItemControl.prototype.targetRef = function (ref) {
    this.target = ref ? reactDom.findDOMNode(ref) : null;
  };
  ListItemControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  ListItemControl.prototype.initDragging = function () {
    var _this = this;
    var dom = reactDom.findDOMNode(this);
    this.sortable = new Sortable__default["default"](dom.querySelector('.ae-OptionControl-content'), {
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
        if (e.newIndex < e.oldIndex && e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
        } else if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        var items = _this.state.items.concat();
        items[e.oldIndex] = items.splice(e.newIndex, 1, items[e.oldIndex])[0];
        _this.setState({
          items: items
        }, function () {
          return _this.onChange();
        });
      }
    });
  };
  ListItemControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  /**
   * 删除选项
   */
  ListItemControl.prototype.handleDelete = function (index) {
    var _this = this;
    var items = this.state.items.concat();
    items.splice(index, 1);
    this.setState({
      items: items
    }, function () {
      return _this.onChange();
    });
  };
  /**
   * 编辑选项
   */
  ListItemControl.prototype.toggleEdit = function (index) {
    var items = this.state.items;
    items[index].editing = !items[index].editing;
    this.setState({
      items: items
    });
  };
  ListItemControl.prototype.editItem = function (item, index) {
    var _this = this;
    var items = this.state.items.concat();
    if (items[index]) {
      items[index] = item;
    }
    this.setState({
      items: items
    }, function () {
      return _this.onChange();
    });
  };
  ListItemControl.prototype.handleEditLabel = function (index, value) {
    var _a;
    var _this = this;
    var items = this.state.items.concat();
    items.splice(index, 1, tslib.__assign(tslib.__assign({}, items[index]), (_a = {}, _a[this.state.labelField] = value, _a)));
    this.setState({
      items: items
    }, function () {
      return _this.onChange();
    });
  };
  ListItemControl.prototype.handleAdd = function () {
    var _a;
    var _this = this;
    var scaffold = this.props.scaffold;
    var labelField = this.state.labelField;
    var items = this.state.items.slice();
    items.push(scaffold ? scaffold : (_a = {}, _a[labelField] = '新状态', _a.body = {}, _a));
    this.setState({
      items: items
    }, function () {
      _this.onChange();
    });
  };
  ListItemControl.prototype.handleValueChange = function (index, value) {
    var _this = this;
    var items = this.state.items.concat();
    items[index].value = value;
    this.setState({
      items: items
    }, function () {
      return _this.onChange();
    });
  };
  ListItemControl.prototype.renderHeader = function () {
    var _a;
    var _b = this.props,
      render = _b.render,
      label = _b.label,
      labelRemark = _b.labelRemark,
      useMobileUI = _b.useMobileUI,
      env = _b.env,
      popOverContainer = _b.popOverContainer;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    return React__default["default"].createElement("header", {
      className: "ae-OptionControl-header"
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"))
    }, label || '', labelRemark ? render('label-remark', {
      type: 'remark',
      icon: labelRemark.icon || 'warning-mark',
      tooltip: labelRemark,
      className: cx__default["default"]("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
      useMobileUI: useMobileUI,
      container: popOverContainer || env.getModalContainer
    }) : null));
  };
  ListItemControl.prototype.renderOption = function (props) {
    var _a;
    var _this = this;
    var index = props.index,
      editing = props.editing;
    var _b = this.props,
      render = _b.render,
      ctx = _b.data,
      _c = _b.items,
      items = _c === void 0 ? [] : _c;
    var label = this.transformOptionValue(props[this.state.labelField]);
    var editDom = editing ? React__default["default"].createElement("div", {
      className: "ae-OptionControlItem-extendMore"
    }, render('item', {
      type: 'form',
      title: null,
      className: 'ae-ExtendMore right mb-2 border-none',
      wrapWithPanel: false,
      labelAlign: 'left',
      horizontal: {
        left: 4,
        right: 8
      },
      body: tslib.__spreadArray([{
        type: 'button',
        className: 'ae-OptionControlItem-closeBtn',
        label: '×',
        level: 'link',
        onClick: function () {
          return _this.toggleEdit(index);
        }
      }], tslib.__read(items), false),
      onChange: function (model) {
        _this.editItem(model, index);
      }
    }, {
      data: amisCore.createObject(ctx, props)
    })) : null;
    var operationBtn = [{
      type: 'button',
      className: 'ae-OptionControlItem-action',
      label: i18nRuntime.i18n("95b351c86267f3aedf89520959bce689"),
      onClick: function () {
        return _this.toggleEdit(index);
      }
    }, {
      type: 'button',
      className: 'ae-OptionControlItem-action',
      label: i18nRuntime.i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      onClick: function () {
        return _this.handleDelete(index);
      }
    }];
    var labelField = this.state.labelField;
    return React__default["default"].createElement("li", {
      className: "ae-OptionControlItem",
      key: index
    }, React__default["default"].createElement("div", {
      className: "ae-OptionControlItem-Main"
    }, React__default["default"].createElement("a", {
      className: "ae-OptionControlItem-dragBar"
    }, React__default["default"].createElement(amis.Icon, {
      icon: "drag-bar",
      className: "icon"
    })), amis.render({
      type: 'input-text',
      name: labelField,
      className: 'ae-OptionControlItem-input',
      value: label,
      placeholder: '状态名称',
      clearable: false,
      onChange: function (value) {
        _this.handleEditLabel(index, value);
      }
    }, {
      data: (_a = {}, _a[labelField] = label, _a)
    }), render('dropdown', {
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
    })), editDom);
  };
  ListItemControl.prototype.render = function () {
    var _this = this;
    var items = this.state.items;
    var _a = this.props,
      className = _a.className,
      addTip = _a.addTip,
      placeholder = _a.placeholder;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-OptionControl', className)
    }, this.renderHeader(), React__default["default"].createElement("div", {
      className: "ae-OptionControl-wrapper"
    }, Array.isArray(items) && items.length ? React__default["default"].createElement("ul", {
      className: "ae-OptionControl-content",
      ref: this.dragRef
    }, items.map(function (item, index) {
      return _this.renderOption(tslib.__assign(tslib.__assign({}, item), {
        index: index
      }));
    })) : React__default["default"].createElement("div", {
      className: "ae-OptionControl-placeholder"
    }, placeholder || '无数据'), React__default["default"].createElement("div", {
      className: "ae-OptionControl-footer"
    }, React__default["default"].createElement(amis.Button, {
      level: "enhance",
      onClick: this.handleAdd,
      ref: this.targetRef,
      className: "w-full"
    }, addTip || i18nRuntime.i18n("e8755fb1e985a5d26df0fce1f0b7b0f8")))));
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], ListItemControl.prototype, "targetRef", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], ListItemControl.prototype, "dragRef", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Number, String]), tslib.__metadata("design:returntype", void 0)], ListItemControl.prototype, "handleEditLabel", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], ListItemControl.prototype, "handleAdd", null);
  return ListItemControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(ListItemControlRenderer, _super);
  function ListItemControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ListItemControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-listItemControl',
    renderLabel: false
  })], ListItemControlRenderer);
  return ListItemControlRenderer;
})(ListItemControl);

exports["default"] = ListItemControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
