/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import Sortable from 'sortablejs';
import { toast, Icon, render, InputBox, Button, Modal, FormItem } from 'amis';
import { getI18nEnabled, getSchemaTpl, tipedLabel, autobind } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 组件选项组件的可视化编辑控件
 */
var defaultOption = {
  label: '',
  value: ''
};
var TreeOptionControl = /** @class */function (_super) {
  __extends(TreeOptionControl, _super);
  function TreeOptionControl(props) {
    var _this = _super.call(this, props) || this;
    _this.internalProps = ['checked', 'editing'];
    var _a = props.data || {},
      source = _a.source,
      labelField = _a.labelField,
      valueField = _a.valueField,
      showIconField = _a.showIconField,
      iconField = _a.iconField;
    _this.state = {
      options: _this.transformOptions(props),
      api: source,
      labelField: labelField,
      valueField: valueField,
      iconField: showIconField ? iconField : undefined,
      source: source ? /\$\{(.*?)\}/g.test(source) ? 'variable' : 'api' : 'custom',
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
      option.value = option.value == null || option.value === '' ? option.label : option.value;
      return option;
    });
  };
  /**
   * 更新options字段的统一出口
   */
  TreeOptionControl.prototype.onChange = function () {
    var _a = this.state,
      source = _a.source,
      api = _a.api,
      labelField = _a.labelField,
      valueField = _a.valueField,
      iconField = _a.iconField;
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
    this.setState({
      api: '',
      source: source
    }, this.onChange);
  };
  TreeOptionControl.prototype.renderHeader = function () {
    var _this = this;
    var _a;
    var _b = this.props,
      render = _b.render,
      label = _b.label,
      labelRemark = _b.labelRemark,
      useMobileUI = _b.useMobileUI,
      env = _b.env,
      popOverContainer = _b.popOverContainer,
      hasApiCenter = _b.hasApiCenter;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    var source = this.state.source;
    var optionSourceList = __spreadArray(__spreadArray([{
      label: i18n("01820262aa9ad5b130f8f5b86bfd2968"),
      value: 'custom'
    }, {
      label: i18n("f99603414a616bdee85de0e6e3938b65"),
      value: 'api'
    }], __read(hasApiCenter ? [{
      label: i18n("e6ff6a97bf600c02942db3126a7077b8"),
      value: 'apicenter'
    }] : []), false), [{
      label: i18n("50334fc77fc5a2c2636f14f158d3c417"),
      value: 'variable'
    }], false).map(function (item) {
      return __assign(__assign({}, item), {
        onClick: function () {
          return _this.handleSourceChange(item.value);
        }
      });
    });
    return React__default.createElement("header", {
      className: "ae-TreeOptionControl-header"
    }, React__default.createElement("label", {
      className: cx("".concat(classPrefix, "Form-label"))
    }, label || '', labelRemark ? render('label-remark', {
      type: 'remark',
      icon: labelRemark.icon || 'warning-mark',
      tooltip: labelRemark,
      className: cx("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
      useMobileUI: useMobileUI,
      container: popOverContainer || env.getModalContainer
    }) : null), React__default.createElement("div", null, render('validation-control-addBtn', {
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
  TreeOptionControl.prototype.handleEditLabelOrValue = function (value, path, key) {
    var _this = this;
    var options = cloneDeep(this.state.options);
    var nodePath = this.getNodePath(path).path;
    set(options, "".concat(nodePath, ".").concat(key), value);
    this.setState({
      options: options
    }, function () {
      return _this.rereshBindDrag();
    });
  };
  TreeOptionControl.prototype.handleDelete = function (pathStr, index) {
    var _this = this;
    var _a, _b;
    var options = cloneDeep(this.state.options);
    if (!pathStr.includes('-') && options.length === 1) {
      toast.warning(i18n("41be5ce31e28742d0b259fe734e49c28"), {
        closeButton: true
      });
      return;
    }
    var path = pathStr.split('-');
    if (path.length === 1) {
      options.splice(index, 1);
    } else {
      var parentPath = this.getNodePath(pathStr).parentPath;
      var parentNode = get(options, parentPath, {});
      (_a = parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) === null || _a === void 0 ? void 0 : _a.splice(index, 1);
      if (((_b = parentNode === null || parentNode === void 0 ? void 0 : parentNode.children) === null || _b === void 0 ? void 0 : _b.length) === 0) {
        // 去除僵尸子节点
        delete parentNode.children;
      }
      set(options, parentPath, parentNode);
    }
    this.setState({
      options: options
    }, function () {
      return _this.rereshBindDrag();
    });
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
    } else {
      var index = path[path.length - 1];
      var parentPath = this.getNodePath(pathStr).parentPath;
      var parentNode = get(options, parentPath, {});
      (_a = parentNode.children) === null || _a === void 0 ? void 0 : _a.splice(+index + 1, 0, __assign({}, defaultOption));
      set(options, parentPath, parentNode);
    }
    this.setState({
      options: options
    }, function () {
      return _this.rereshBindDrag();
    });
  };
  TreeOptionControl.prototype.addChildOption = function (pathStr) {
    var _this = this;
    if (pathStr.split('-').length >= 6) {
      toast.warning(i18n("9046ad86a1a47f16e954f2ec38fb680a"), {
        closeButton: true
      });
      return;
    }
    var options = cloneDeep(this.state.options);
    var path = this.getNodePath(pathStr).path;
    var node = get(options, path) || [];
    if (node.children) {
      node.children.push(__assign({}, defaultOption));
    } else {
      node.children = [__assign({}, defaultOption)];
    }
    set(options, path, node);
    this.setState({
      options: options
    }, function () {
      return _this.rereshBindDrag();
    });
  };
  TreeOptionControl.prototype.hideModal = function (notResetOptions) {
    this.setState({
      modalVisible: false
    });
    if (!notResetOptions) {
      this.setState({
        options: this.transformOptions(this.props)
      });
    }
  };
  TreeOptionControl.prototype.renderOptions = function (option, key, indexes) {
    var _this = this;
    var render$1 = this.props.render;
    var i18nEnabled = getI18nEnabled();
    var path = indexes.join('-');
    if (option.children && option.children.length) {
      var parent_1 = cloneDeep(option);
      delete parent_1.children;
      return React__default.createElement("div", {
        className: cx('ae-TreeOptionControlItem-parent'),
        key: "parent".concat(path).concat(key).concat(option.label)
      }, this.renderOptions(parent_1, key, indexes), React__default.createElement("div", {
        className: cx('ae-TreeOptionControlItem-son'),
        key: "son".concat(path).concat(key).concat(option.label),
        "data-level": path
      }, option.children.map(function (option, key) {
        return _this.renderOptions(option, key, indexes.concat(key));
      })));
    }
    return React__default.createElement("div", {
      className: "ae-TreeOptionControlItem",
      key: "child".concat(path).concat(key).concat(option.label),
      "data-path": path
    }, React__default.createElement("a", {
      className: "ae-TreeOptionControlItem-dragBar"
    }, React__default.createElement(Icon, {
      icon: "drag-bar",
      className: "icon"
    })), i18nEnabled ? render({
      type: 'input-text-i18n',
      className: 'ae-TreeOptionControlItem-input-label',
      value: option.label,
      placeholder: i18n("f69608e93e9728f4fbef583bfa1326c1"),
      clearable: false,
      onBlur: function (event) {
        _this.handleEditLabelOrValue(event.target.value, path, 'label');
      },
      onI18nChange: function (value) {
        _this.handleEditLabelOrValue(value, path, 'label');
      }
    }) : React__default.createElement(InputBox, {
      className: "ae-TreeOptionControlItem-input-label",
      value: option.label,
      placeholder: i18n("f69608e93e9728f4fbef583bfa1326c1"),
      clearable: false,
      onBlur: function (event) {
        _this.handleEditLabelOrValue(event.target.value, path, 'label');
      }
    }), React__default.createElement(InputBox, {
      className: "ae-TreeOptionControlItem-input-value",
      value: option.value,
      placeholder: i18n("684a0d1aeca4e9acff89221b57826d4d"),
      clearable: false,
      onBlur: function (event) {
        _this.handleEditLabelOrValue(event.target.value, path, 'value');
      }
    }), React__default.createElement("div", {
      className: "ae-TreeOptionControlItem-btns"
    }, render$1('dropdown', {
      type: 'dropdown-button',
      className: 'ae-TreeOptionControlItem-dropdown fa-sm',
      btnClassName: 'px-2',
      icon: 'add',
      hideCaret: true,
      closeOnClick: true,
      trigger: 'hover',
      align: 'right',
      menuClassName: 'ae-TreeOptionControlItem-ulmenu',
      buttons: [{
        type: 'button',
        className: 'ae-OptionControlItem-action',
        label: i18n("e8755fb1e985a5d26df0fce1f0b7b0f8"),
        onClick: function () {
          _this.addOption(path);
        }
      }, {
        type: 'button',
        className: 'ae-OptionControlItem-action',
        label: i18n("bbcbe681f9225f8adf3663f563a9f294"),
        onClick: function () {
          _this.addChildOption(path);
        }
      }]
    }, {
      popOverContainer: null // amis 渲染挂载节点会使用 this.target
    }), React__default.createElement(Button, {
      size: "sm",
      onClick: function () {
        _this.handleDelete(path, key);
      }
    }, React__default.createElement(Icon, {
      className: "icon",
      icon: "delete-bold-btn"
    }))));
  };
  TreeOptionControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.drag = ref;
      this.initDragging();
    } else if (this.drag && !ref) {
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
        var oldIndex = e.oldIndex,
          newIndex = e.newIndex;
        _a = __read([options[oldIndex], options[newIndex]], 2), options[newIndex] = _a[0], options[oldIndex] = _a[1];
        _this.setState({
          options: options
        }, function () {
          return _this.rereshBindDrag();
        });
      },
      onMove: function (e) {
        var from = e.from,
          to = e.to;
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
          var item = e.item,
            oldIndex = e.oldIndex,
            newIndex = e.newIndex;
          var options = cloneDeep(_this.state.options);
          var nodePath = item.dataset.path;
          if (!nodePath) {
            return;
          }
          var parentPath = _this.getNodePath(nodePath).parentPath;
          var children = get(options, "".concat(parentPath, ".children")) || [];
          if (children) {
            _a = __read([children[newIndex], children[oldIndex]], 2), children[oldIndex] = _a[0], children[newIndex] = _a[1];
            set(options, "".concat(parentPath, ".children"), children);
            _this.setState({
              options: options
            });
          }
        },
        onMove: function (e) {
          var from = e.from,
            to = e.to;
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
    var _a = this.state,
      modalVisible = _a.modalVisible,
      options = _a.options;
    return React__default.createElement(Modal, {
      className: "ae-TreeOptionControl-Modal",
      show: modalVisible,
      onHide: function () {
        _this.hideModal();
      }
    }, React__default.createElement(Modal.Header, {
      onClose: function () {
        _this.hideModal();
      }
    }, i18n("c08dbaf90614532aed9f526e58b7fef2")), React__default.createElement(Modal.Body, null, React__default.createElement("div", {
      className: "ae-TreeOptionControl-content",
      ref: this.dragRef
    }, options.map(function (option, key) {
      return _this.renderOptions(option, key, [key]);
    }))), React__default.createElement(Modal.Footer, null, React__default.createElement(Button, {
      onClick: function () {
        _this.hideModal();
      }
    }, i18n("625fb26b4b3340f7872b411f401e754c")), React__default.createElement(Button, {
      level: "primary",
      onClick: function () {
        _this.onChange();
        _this.hideModal(true);
      }
    }, i18n("e83a256e4f5bb4ff8b3d804b5473217a"))));
  };
  TreeOptionControl.prototype.handleAPIChange = function (source) {
    this.setState({
      api: source
    }, this.onChange);
  };
  TreeOptionControl.prototype.handleLableFieldChange = function (labelField) {
    this.setState({
      labelField: labelField
    }, this.onChange);
  };
  TreeOptionControl.prototype.handleValueFieldChange = function (valueField) {
    this.setState({
      valueField: valueField
    }, this.onChange);
  };
  TreeOptionControl.prototype.handleIconFieldChange = function (iconField) {
    this.setState({
      iconField: iconField
    }, this.onChange);
  };
  TreeOptionControl.prototype.renderApiPanel = function () {
    var _a = this.props,
      render = _a.render,
      _b = _a.showIconField,
      showIconField = _b === void 0 ? false : _b;
    var _c = this.state,
      source = _c.source,
      api = _c.api,
      labelField = _c.labelField,
      valueField = _c.valueField,
      iconField = _c.iconField;
    return render('api', getSchemaTpl('apiControl', {
      label: i18n("54ea89b497ec3bb319c68844dfa3687f"),
      name: 'source',
      className: 'ae-ExtendMore',
      visibleOn: 'data.autoComplete !== false',
      value: api,
      onChange: this.handleAPIChange,
      sourceType: source,
      footer: [{
        label: tipedLabel(i18n("7e9c83e86beb612377a94e6e8d1fc644"), i18n("26ff46d82166741297ce666b2792af85")),
        type: 'input-text',
        name: 'labelField',
        value: labelField,
        placeholder: i18n("6d4ce0631f37676a887c9599691fabec"),
        onChange: this.handleLableFieldChange
      }, {
        label: i18n("2e01f5f5889e33d003bec7857cd38445"),
        type: 'input-text',
        name: 'valueField',
        value: valueField,
        placeholder: i18n("959c27193eb0a41d01f4b53dcc4b9245"),
        onChange: this.handleValueFieldChange
      }, {
        type: 'input-text',
        label: i18n("1cd9e1bb335cb0643d9e310dd4edd830"),
        name: 'iconField',
        value: iconField,
        placeholder: i18n("152b66069787294e53cfc176a189c81f"),
        visible: showIconField,
        onChange: this.handleIconFieldChange
      }]
    }));
  };
  TreeOptionControl.prototype.render = function () {
    var _this = this;
    var source = this.state.source;
    var _a = this.props,
      className = _a.className,
      render = _a.render;
    return React__default.createElement("div", {
      className: cx('ae-TreeOptionControl', className)
    }, this.renderHeader(), source === 'custom' ? React__default.createElement("div", {
      className: "ae-TreeOptionControl-wrapper"
    }, React__default.createElement("div", null, React__default.createElement(Button, {
      block: true,
      onClick: function () {
        _this.setState({
          modalVisible: true
        });
      }
    }, i18n("c08dbaf90614532aed9f526e58b7fef2")), this.renderModal())) : null, source === 'api' || source === 'apicenter' ? this.renderApiPanel() : null, source === 'variable' ? render('variable', getSchemaTpl('sourceBindControl', {
      label: false,
      className: 'ae-ExtendMore'
    }), {
      onChange: this.handleAPIChange
    }) : null);
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "handleSourceChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String, Number]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "handleDelete", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "getNodePath", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "addOption", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "addChildOption", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "hideModal", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Number, Array]), __metadata("design:returntype", Object)], TreeOptionControl.prototype, "renderOptions", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "dragRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "destroyDragging", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "renderModal", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "handleAPIChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "handleLableFieldChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String, Object]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "handleValueFieldChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], TreeOptionControl.prototype, "handleIconFieldChange", null);
  return TreeOptionControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(TreeOptionControlRenderer, _super);
  function TreeOptionControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TreeOptionControlRenderer = __decorate([FormItem({
    type: 'ae-treeOptionControl',
    renderLabel: false
  })], TreeOptionControlRenderer);
  return TreeOptionControlRenderer;
})(TreeOptionControl);

export { TreeOptionControl as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
