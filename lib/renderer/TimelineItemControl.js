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
var uniqBy = require('lodash/uniqBy');
var Sortable = require('sortablejs');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var uniqBy__default = /*#__PURE__*/_interopDefaultLegacy(uniqBy);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);

var TimelineItemControl = /** @class */function (_super) {
  tslib.__extends(TimelineItemControl, _super);
  function TimelineItemControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      items: props.value,
      api: props.data.source,
      source: props.data.source ? 'api' : 'custom'
    };
    return _this;
  }
  /**
   * 切换选项类型
   */
  TimelineItemControl.prototype.handleSourceChange = function (source) {
    this.setState({
      source: source
    }, this.onChange);
  };
  TimelineItemControl.prototype.handleAPIChange = function (source) {
    this.setState({
      api: source
    }, this.onChange);
  };
  TimelineItemControl.prototype.onChange = function () {
    var source = this.state.source;
    var onBulkChange = this.props.onBulkChange;
    var data = {
      source: undefined,
      items: undefined
    };
    if (source === 'custom') {
      var items = this.state.items;
      data.items = items.map(function (item) {
        return tslib.__assign({}, item);
      });
    }
    if (source === 'api') {
      var _a = this.state,
        items = _a.items,
        api = _a.api;
      data.items = items.map(function (item) {
        return tslib.__assign({}, item);
      });
      data.source = api;
    }
    if (source === 'variable') {
      var _b = this.state,
        items = _b.items,
        api = _b.api;
      data.items = items.map(function (item) {
        return tslib.__assign({}, item);
      });
      data.source = api;
    }
    onBulkChange && onBulkChange(data);
  };
  TimelineItemControl.prototype.toggleEdit = function (values, index) {
    var items = this.state.items.concat();
    items[index] = values;
    this.setState({
      items: items
    }, this.onChange);
  };
  TimelineItemControl.prototype.toggleCopy = function (index) {
    var items = this.state.items;
    var res = items.concat(items[index]);
    this.setState({
      items: res
    }, this.onChange);
  };
  TimelineItemControl.prototype.toggleDelete = function (index) {
    var items = this.state.items.concat();
    items.splice(index, 1);
    this.setState({
      items: items
    }, this.onChange);
  };
  TimelineItemControl.prototype.handleEditLabel = function (index, value, attr) {
    var _a;
    var _this = this;
    var items = this.state.items.concat();
    items.splice(index, 1, tslib.__assign(tslib.__assign({}, items[index]), (_a = {}, _a[attr] = value, _a)));
    this.setState({
      items: items
    }, function () {
      return _this.onChange();
    });
  };
  TimelineItemControl.prototype.handleBatchAdd = function (values, action) {
    var _this = this;
    var items = this.state.items.concat();
    var addedOptions = values.batchItems.split('\n').map(function (option) {
      var item = option.trim();
      if (~item.indexOf(' ')) {
        var _a = tslib.__read(item.split(' '), 2),
          time = _a[0],
          title = _a[1];
        return {
          time: time.trim(),
          title: title.trim()
        };
      }
      return {
        label: item,
        value: item
      };
    });
    var newOptions = uniqBy__default["default"](tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(items), false), tslib.__read(addedOptions), false), 'time');
    this.setState({
      items: newOptions
    }, function () {
      return _this.onChange();
    });
  };
  TimelineItemControl.prototype.handleAdd = function (values) {
    var items = this.state.items;
    var itemsTemp = items.concat(tslib.__assign({}, values));
    this.setState({
      items: itemsTemp
    }, this.onChange);
  };
  TimelineItemControl.prototype.buildAddOrEditSchema = function (props) {
    var i18nEnabled = amisEditorCore.getI18nEnabled();
    return [{
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      name: 'time',
      required: true,
      placeholder: i18nRuntime.i18n("37087e5bb2d0367872a461f535580d91"),
      label: i18nRuntime.i18n("19fcb9eb2594059036dfede5f4ec53e8"),
      value: props === null || props === void 0 ? void 0 : props['time']
    }, {
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      name: 'title',
      required: true,
      placeholder: i18nRuntime.i18n("96641a78cfd9f9f8ba68f0524347b186"),
      label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      value: props === null || props === void 0 ? void 0 : props['title']
    }, {
      type: 'input-color',
      name: 'color',
      value: props === null || props === void 0 ? void 0 : props['color'],
      placeholder: i18nRuntime.i18n("02cc4f8f5a9aefbc03c778f7a5c989c7"),
      label: i18nRuntime.i18n("6b36c6f7ec834692ec6c8e3816349fdd")
    }, amisEditorCore.getSchemaTpl('icon', {
      value: props === null || props === void 0 ? void 0 : props['icon'],
      placeholder: i18nRuntime.i18n("02cc4f8f5a9aefbc03c778f7a5c989c7"),
      clearable: true,
      description: '',
      className: 'fix-icon-picker-overflow',
      pipeIn: function (value) {
        return value === null || value === void 0 ? void 0 : value.icon;
      },
      pipeOut: function (value) {
        if (value) {
          return {
            type: 'icon',
            vendor: '',
            icon: value
          };
        }
        return undefined;
      }
    })];
  };
  TimelineItemControl.prototype.buildBatchAddSchema = function () {
    return {
      type: 'action',
      actionType: 'dialog',
      label: i18nRuntime.i18n("22de6ef85ed60ec54dbdc1d8583e5104"),
      dialog: {
        title: i18nRuntime.i18n("421252e16c6cb544fe9ce0be94a190e0"),
        headerClassName: 'font-bold',
        closeOnEsc: true,
        closeOnOutside: false,
        showCloseButton: true,
        body: [{
          type: 'alert',
          level: 'warning',
          body: [{
            type: 'tpl',
            tpl: i18nRuntime.i18n("1bf14fd24efe68f62bbff0538dee238a")
          }],
          showIcon: true,
          className: 'mb-2.5'
        }, {
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
          body: [{
            name: 'batchItems',
            type: 'textarea',
            label: '',
            placeholder: i18nRuntime.i18n("1e2f96a69fbef8caa8823a3067ebbdc7"),
            trimContents: true,
            minRows: 10,
            maxRows: 50,
            required: true
          }]
        }]
      }
    };
  };
  TimelineItemControl.prototype.buildAddSchema = function () {
    return {
      type: 'action',
      actionType: 'dialog',
      label: i18nRuntime.i18n("e8755fb1e985a5d26df0fce1f0b7b0f8"),
      active: true,
      dialog: {
        title: i18nRuntime.i18n("d584018521820dac9e92120737b733ba"),
        headerClassName: 'font-bold',
        closeOnEsc: true,
        closeOnOutside: false,
        showCloseButton: true,
        body: [{
          type: 'form',
          wrapWithPanel: false,
          wrapperComponent: 'div',
          resetAfterSubmit: true,
          autoFocus: true,
          preventEnterSubmit: true,
          horizontal: {
            justify: true,
            left: 3,
            right: 9
          },
          body: this.buildAddOrEditSchema()
        }]
      }
    };
  };
  TimelineItemControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  TimelineItemControl.prototype.initDragging = function () {
    var _this = this;
    var dom = reactDom.findDOMNode(this);
    this.sortable = new Sortable__default["default"](dom.querySelector('.ae-TimelineItemControl-content'), {
      group: 'TimelineItemControlGroup',
      animation: 150,
      handle: '.ae-TimelineItemControlItem-dragBar',
      ghostClass: 'ae-TimelineItemControlItem--dragging',
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
  TimelineItemControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  TimelineItemControl.prototype.renderHeader = function () {
    var _this = this;
    var _a;
    var _b = this.props,
      render = _b.render,
      label = _b.label,
      labelRemark = _b.labelRemark,
      useMobileUI = _b.useMobileUI,
      env = _b.env,
      popOverContainer = _b.popOverContainer;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    var source = this.state.source;
    var optionSourceList = [{
      label: i18nRuntime.i18n("01820262aa9ad5b130f8f5b86bfd2968"),
      value: 'custom'
    }, {
      label: i18nRuntime.i18n("c8158b3cad598b0b5939788ca4efb298"),
      value: 'api'
    }, {
      label: i18nRuntime.i18n("50334fc77fc5a2c2636f14f158d3c417"),
      value: 'variable'
    }].map(function (item) {
      return tslib.__assign(tslib.__assign({}, item), {
        onClick: function () {
          return _this.handleSourceChange(item.value);
        }
      });
    });
    return React__default["default"].createElement("header", {
      className: "ae-TimelineItemControl-header"
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"))
    }, label || '', labelRemark ? render('label-remark', {
      type: 'remark',
      icon: labelRemark.icon || 'warning-mark',
      tooltip: labelRemark,
      className: cx__default["default"]("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
      useMobileUI: useMobileUI,
      container: popOverContainer || env.getModalContainer
    }) : null), React__default["default"].createElement("div", null, render('validation-control-addBtn', {
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
        selected: optionSourceList.find(function (item) {
          return item.value === source;
        }).label
      }
    })));
  };
  TimelineItemControl.prototype.renderOption = function (props) {
    var _this = this;
    var time = props.time,
      title = props.title,
      index = props.index;
    var delDisabled = !(this.state.items.length > 2);
    var i18nEnabled = amisEditorCore.getI18nEnabled();
    return React__default["default"].createElement("li", {
      className: "ae-TimelineItemControlItem",
      key: index
    }, React__default["default"].createElement("div", {
      className: "ae-TimelineItemControlItem-Main"
    }, React__default["default"].createElement("a", {
      className: "ae-TimelineItemControlItem-dragBar"
    }, React__default["default"].createElement(amis.Icon, {
      icon: "drag-bar",
      className: "icon"
    })), amis.render({
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      className: 'ae-TimelineItemControlItem-input',
      value: time,
      placeholder: i18nRuntime.i18n("72a3c1690dead6e24f7ac1abc90d5063"),
      clearable: false,
      onChange: function (value) {
        return _this.handleEditLabel(index, value, 'time');
      }
    }), amis.render({
      type: 'dropdown-button',
      className: 'ae-TimelineItemControlItem-dropdown',
      btnClassName: 'px-2',
      icon: 'fa fa-ellipsis-h',
      hideCaret: true,
      closeOnClick: true,
      align: 'right',
      menuClassName: 'ae-TimelineItemControlItem-ulmenu',
      buttons: [{
        type: 'action',
        className: 'ae-TimelineItemControlItem-action',
        label: i18nRuntime.i18n("95b351c86267f3aedf89520959bce689"),
        actionType: 'dialog',
        dialog: {
          title: i18nRuntime.i18n("d584018521820dac9e92120737b733ba"),
          headerClassName: 'font-bold',
          closeOnEsc: true,
          closeOnOutside: false,
          showCloseButton: true,
          body: [{
            type: 'form',
            wrapWithPanel: false,
            wrapperComponent: 'div',
            resetAfterSubmit: true,
            autoFocus: true,
            preventEnterSubmit: true,
            horizontal: {
              justify: true,
              left: 3,
              right: 9
            },
            body: this.buildAddOrEditSchema(props),
            onSubmit: function (e) {
              return _this.toggleEdit(e, index);
            }
          }]
        }
      }, {
        type: 'button',
        className: 'ae-TimelineItemControlItem-action',
        label: i18nRuntime.i18n("79d3abe929f67f0644a78bf32adb3a89"),
        onClick: function () {
          return _this.toggleCopy(index);
        }
      }, {
        type: 'button',
        className: 'ae-TimelineItemControlItem-action',
        label: i18nRuntime.i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
        disabled: delDisabled,
        onClick: function () {
          return _this.toggleDelete(index);
        }
      }]
    }, {
      popOverContainer: null // amis 渲染挂载节点会使用 this.target
    })), React__default["default"].createElement("div", {
      className: "ae-TimelineItemControlItem-Main"
    }, amis.render({
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      className: 'ae-TimelineItemControlItem-input-title',
      value: title,
      clearable: false,
      placeholder: i18nRuntime.i18n("96641a78cfd9f9f8ba68f0524347b186"),
      onChange: function (value) {
        return _this.handleEditLabel(index, value, 'title');
      }
    })));
  };
  TimelineItemControl.prototype.renderApiPanel = function () {
    var render = this.props.render;
    var _a = this.state,
      source = _a.source,
      api = _a.api;
    if (source !== 'api') {
      return null;
    }
    return render('api', amisEditorCore.getSchemaTpl('apiControl', {
      label: i18nRuntime.i18n("54ea89b497ec3bb319c68844dfa3687f"),
      name: 'source',
      className: 'ae-ExtendMore',
      visibleOn: 'data.autoComplete !== false',
      value: api,
      onChange: this.handleAPIChange
    }));
  };
  TimelineItemControl.prototype.render = function () {
    var _this = this;
    var _a = this.state,
      source = _a.source,
      items = _a.items;
    var _b = this.props,
      render = _b.render,
      className = _b.className;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-TimelineItemControl', className)
    }, this.renderHeader(), source === 'custom' ? React__default["default"].createElement("div", {
      className: "ae-TimelineItemControl-wrapper"
    }, Array.isArray(items) && items.length ? React__default["default"].createElement("ul", {
      className: "ae-TimelineItemControl-content",
      ref: this.dragRef
    }, items.map(function (item, index) {
      return _this.renderOption(tslib.__assign(tslib.__assign({}, item), {
        index: index
      }));
    })) : React__default["default"].createElement("div", {
      className: "ae-TimelineItemControl-placeholder"
    }, i18nRuntime.i18n("a4f1ddbbfc96930d24e4b54cb815b62b")), React__default["default"].createElement("div", {
      className: "ae-TimelineItemControl-footer"
    }, amis.render(this.buildAddSchema(), {
      onSubmit: this.handleAdd
    }), amis.render(this.buildBatchAddSchema(), {
      onSubmit: this.handleBatchAdd
    }))) : null, source === 'variable' ? render('variable', amisEditorCore.getSchemaTpl('sourceBindControl', {
      label: false,
      className: 'ae-ExtendMore'
    }), {
      onChange: this.handleAPIChange
    }) : null, this.renderApiPanel());
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], TimelineItemControl.prototype, "handleSourceChange", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], TimelineItemControl.prototype, "handleAPIChange", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object, Number]), tslib.__metadata("design:returntype", void 0)], TimelineItemControl.prototype, "toggleEdit", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object, Object]), tslib.__metadata("design:returntype", void 0)], TimelineItemControl.prototype, "handleBatchAdd", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], TimelineItemControl.prototype, "handleAdd", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], TimelineItemControl.prototype, "dragRef", null);
  return TimelineItemControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(TimelineItemControlRenderer, _super);
  function TimelineItemControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TimelineItemControlRenderer.prototype.render = function () {
    return React__default["default"].createElement(TimelineItemControl, tslib.__assign({}, this.props));
  };
  TimelineItemControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-timelineItemControl',
    renderLabel: false
  })], TimelineItemControlRenderer);
  return TimelineItemControlRenderer;
})(React__default["default"].Component);

exports["default"] = TimelineItemControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
