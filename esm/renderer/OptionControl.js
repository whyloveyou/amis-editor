/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __rest, __read, __spreadArray, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import uniqBy from 'lodash/uniqBy';
import omit from 'lodash/omit';
import get from 'lodash/get';
import Sortable from 'sortablejs';
import { Icon, Checkbox, render, Button, FormItem } from 'amis';
import { value2array } from 'amis-ui/lib/components/Select';
import { getI18nEnabled, getSchemaTpl, tipedLabel, autobind } from 'amis-editor-core';
import { createObject } from 'amis-core';
import debounce from 'lodash/debounce';
import { i18n } from 'i18n-runtime';

/**
 * @file 组件选项组件的可视化编辑控件
 */
var OptionControl = /** @class */function (_super) {
  __extends(OptionControl, _super);
  function OptionControl(props) {
    var _this = _super.call(this, props) || this;
    _this.internalProps = ['checked', 'editing'];
    var source = 'custom';
    if (props.data.hasOwnProperty('source') && props.data.source) {
      var api = props.data.source;
      var url = typeof api === 'string' ? api : typeof api === 'object' ? api.url || '' : '';
      source = /\$\{(.*?)\}/g.test(props.data.source) ? 'variable' : !url.indexOf('api://') ? 'apicenter' : 'api';
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
    var options = get(nextProps, 'data.options') ? this.transformOptions(nextProps) : [];
    if (JSON.stringify(this.state.options.map(function (item) {
      return __assign(__assign({}, item), {
        editing: undefined
      });
    })) !== JSON.stringify(options)) {
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
    return typeof value === 'undefined' || value === null ? '' : typeof value === 'string' ? value : JSON.stringify(value);
  };
  OptionControl.prototype.transformOptions = function (props) {
    var ctx = props.data,
      options = props.value;
    var defaultValue = ctx.value;
    var valueArray = value2array(defaultValue, ctx).map(function (item) {
      var _a;
      return item[(_a = ctx === null || ctx === void 0 ? void 0 : ctx.valueField) !== null && _a !== void 0 ? _a : 'value'];
    });
    return Array.isArray(options) ? options.map(function (item) {
      var _a;
      return __assign(__assign(__assign({
        label: item.label,
        // 为了使用户编写label时同时生效到value
        value: item.label === item.value ? null : item.value,
        checked: !!~valueArray.indexOf(item[(_a = ctx === null || ctx === void 0 ? void 0 : ctx.valueField) !== null && _a !== void 0 ? _a : 'value'])
      }, (item === null || item === void 0 ? void 0 : item.badge) ? {
        badge: item.badge
      } : {}), item.hidden !== undefined ? {
        hidden: item.hidden
      } : {}), item.hiddenOn !== undefined ? {
        hiddenOn: item.hiddenOn
      } : {});
    }) : [];
  };
  /**
   * 处理当前组件的默认值
   */
  OptionControl.prototype.normalizeValue = function () {
    var _this = this;
    var _a = this.props,
      _b = _a.data,
      ctx = _b === void 0 ? {} : _b,
      multipleProps = _a.multiple;
    var _c = ctx.joinValues,
      joinValues = _c === void 0 ? true : _c,
      extractValue = ctx.extractValue,
      multiple = ctx.multiple,
      delimiter = ctx.delimiter,
      valueField = ctx.valueField;
    var checkedOptions = this.state.options.filter(function (item) {
      return item.checked && (item === null || item === void 0 ? void 0 : item.hidden) !== true;
    }).map(function (item) {
      return omit(item, _this.internalProps);
    });
    var value;
    if (!checkedOptions.length) {
      return '';
    }
    if (multiple || multipleProps) {
      value = checkedOptions;
      if (joinValues) {
        value = checkedOptions.map(function (item) {
          return item[valueField || 'value'] || item[valueField || 'label'];
        }).join(delimiter || ',');
      } else if (extractValue) {
        value = checkedOptions.map(function (item) {
          return item[valueField || 'value'] || item[valueField || 'label'];
        });
      }
    } else {
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
      data.options = options.map(function (item) {
        return __assign(__assign(__assign({}, (item === null || item === void 0 ? void 0 : item.badge) ? {
          badge: item.badge
        } : {}), {
          label: item.label,
          value: item.value == null || item.value === '' ? item.label : item.value
        }), item.hiddenOn !== undefined ? {
          hiddenOn: item.hiddenOn
        } : {});
      });
      data.value = defaultValue;
    }
    if (source === 'api' || source === 'apicenter' || source === 'variable') {
      var _a = this.state,
        api = _a.api,
        labelField = _a.labelField,
        valueField = _a.valueField;
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
    } else if (this.drag && !ref) {
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
        if (e.newIndex < e.oldIndex && e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
        } else if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        var options = _this.state.options.concat();
        options[e.oldIndex] = options.splice(e.newIndex, 1, options[e.oldIndex])[0];
        _this.setState({
          options: options
        }, function () {
          return _this.onChange();
        });
      }
    });
  };
  OptionControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  OptionControl.prototype.scroll2Bottom = function () {
    var _a, _b;
    this.drag && ((_b = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    }));
  };
  /**
   * 切换选项类型
   */
  OptionControl.prototype.handleSourceChange = function (source) {
    this.setState({
      api: '',
      source: source
    }, this.onChange);
  };
  /**
   * 删除选项
   */
  OptionControl.prototype.handleDelete = function (index) {
    var _this = this;
    var options = this.state.options.concat();
    options.splice(index, 1);
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
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
      options.splice(index, 1, __assign(__assign({}, options[index]), {
        checked: checked
      }));
    } else {
      options = options.map(function (item, itemIndex) {
        return __assign(__assign({}, item), {
          checked: itemIndex === index ? checked : false // 支持重复点击取消选中
        });
      });
    }

    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  /**
   * 编辑选项
   */
  OptionControl.prototype.toggleEdit = function (index) {
    var options = this.state.options;
    options[index].editing = !options[index].editing;
    this.setState({
      options: options
    });
  };
  /**
   * 编辑角标
   */
  OptionControl.prototype.toggleBadge = function (index, value) {
    var _this = this;
    var options = this.state.options;
    options[index].badge = value;
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleEditLabel = function (index, value) {
    var _this = this;
    var options = this.state.options.concat();
    options.splice(index, 1, __assign(__assign({}, options[index]), {
      label: value
    }));
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleHiddenValueChange = function (index, value) {
    var _this = this;
    var options = this.state.options.concat();
    var _a = options[index];
      _a.hiddenOn;
      var option = __rest(_a, ["hiddenOn"]);
    options.splice(index, 1, __assign(__assign({}, option), !value ? {} : {
      hiddenOn: value
    }));
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleAdd = function () {
    var _this = this;
    var options = this.state.options;
    options.push({
      label: '',
      value: null,
      checked: false
    });
    this.setState({
      options: options
    }, function () {
      _this.onChange();
    });
  };
  OptionControl.prototype.handleValueTypeChange = function (index, type) {
    var _this = this;
    var options = this.state.options.concat();
    options[index].value = this.normalizeOptionValue(options[index].value, type);
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleValueChange = function (index, value) {
    var _this = this;
    var options = this.state.options.concat();
    var type = this.getOptionValueType(options[index].value);
    options[index].value = this.normalizeOptionValue(value, type);
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleBatchAdd = function (values, action) {
    var _this = this;
    var options = this.state.options.concat();
    var addedOptions = values[0].batchOption.split('\n').map(function (option) {
      var item = option.trim();
      if (~item.indexOf(' ')) {
        var _a = __read(item.split(' '), 2),
          label = _a[0],
          value = _a[1];
        return {
          label: label.trim(),
          value: value.trim(),
          checked: false
        };
      }
      return {
        label: item,
        value: item,
        checked: false
      };
    });
    var newOptions = uniqBy(__spreadArray(__spreadArray([], __read(options), false), __read(addedOptions), false), 'value');
    this.setState({
      options: newOptions
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.renderHeader = function () {
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
    }
    // {
    //   label: '表单实体',
    //   value: 'form'
    // }
    ], false).map(function (item) {
      return __assign(__assign({}, item), {
        onClick: function () {
          return _this.handleSourceChange(item.value);
        }
      });
    });
    return React__default.createElement("header", {
      className: "ae-OptionControl-header"
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
  OptionControl.prototype.renderOption = function (props) {
    var _this = this;
    var checked = props.checked,
      index = props.index,
      editing = props.editing,
      multipleProps = props.multipleProps,
      closeDefaultCheck = props.closeDefaultCheck;
    var _a = this.props,
      render$1 = _a.render,
      ctx = _a.data,
      node = _a.node;
    var isMultiple = (ctx === null || ctx === void 0 ? void 0 : ctx.multiple) === true || multipleProps;
    var i18nEnabled = getI18nEnabled();
    var label = this.transformOptionValue(props.label);
    var value = this.transformOptionValue(props.value);
    var valueType = this.getOptionValueType(props.value);
    var showBadge = node.type === 'button-group-select';
    var editDom = editing ? React__default.createElement("div", {
      className: "ae-OptionControlItem-extendMore"
    }, render$1('option', {
      type: 'container',
      className: 'ae-ExtendMore right mb-2',
      body: [{
        type: 'button',
        className: 'ae-OptionControlItem-closeBtn',
        label: '×',
        level: 'link',
        onClick: function () {
          return _this.toggleEdit(index);
        }
      }, {
        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
        placeholder: i18n("b4fdf79b8f54856b072ec3874b830d1f"),
        label: i18n("97d07614380da93d257f9fbf81aa56fb"),
        mode: 'horizontal',
        value: label,
        name: 'optionLabel',
        labelClassName: 'ae-OptionControlItem-EditLabel',
        valueClassName: 'ae-OptionControlItem-EditValue',
        onChange: function (v) {
          return _this.handleEditLabel(index, v);
        }
      }, {
        type: 'input-group',
        name: 'input-group',
        label: i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
        labelClassName: 'ae-OptionControlItem-EditLabel',
        valueClassName: 'ae-OptionControlItem-EditValue',
        mode: 'horizontal',
        body: [{
          type: 'select',
          name: 'optionValueType',
          value: valueType,
          options: [{
            label: i18n("97d07614380da93d257f9fbf81aa56fb"),
            value: 'text'
          }, {
            label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
            value: 'number'
          }, {
            label: i18n("97b0b6499334ed889b372513290a2a52"),
            value: 'boolean'
          }],
          checkAll: false,
          onChange: function (v) {
            return _this.handleValueTypeChange(index, v);
          }
        }, {
          type: 'input-text',
          placeholder: i18n("f4ab507e2fa2d2bd66bcdeafd9fef797"),
          name: 'optionValue',
          value: value,
          visibleOn: "this.optionValueType !== 'boolean'",
          onChange: function (v) {
            return _this.handleValueChange(index, v);
          }
        }, {
          type: 'input-text',
          placeholder: i18n("f4ab507e2fa2d2bd66bcdeafd9fef797"),
          name: 'optionValue',
          value: value,
          visibleOn: "this.optionValueType === 'boolean'",
          onChange: function (v) {
            return _this.handleValueChange(index, v);
          },
          options: [{
            label: 'true',
            value: true
          }, {
            label: 'false',
            value: false
          }]
        }]
      }, getSchemaTpl('expressionFormulaControl', {
        name: 'optionHiddenOn',
        label: i18n("dce5379cb978a8259ecfca8f08f00817"),
        labelClassName: 'ae-OptionControlItem-EditLabel',
        valueClassName: 'ae-OptionControlItem-EditValue',
        onChange: function (v) {
          return _this.handleHiddenValueChange(index, v);
        }
      }), {
        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
        placeholder: i18n("7f05bea37729325a6cc84eb26bb9f8c8"),
        label: i18n("b8c467fce096a649583c0bc9d9281a5c"),
        mode: 'horizontal',
        visible: showBadge,
        value: props === null || props === void 0 ? void 0 : props.badge,
        name: 'optionBadge',
        labelClassName: 'ae-OptionControlItem-EditLabel',
        valueClassName: 'ae-OptionControlItem-EditValue',
        onChange: function (v) {
          return _this.toggleBadge(index, v);
        }
      }]
    }, {
      data: createObject(ctx, {
        option: props
      })
    })) : null;
    var operationBtn = [{
      type: 'button',
      className: 'ae-OptionControlItem-action',
      label: i18n("95b351c86267f3aedf89520959bce689"),
      onClick: function () {
        return _this.toggleEdit(index);
      }
    }, {
      type: 'button',
      className: 'ae-OptionControlItem-action',
      label: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      onClick: function () {
        return _this.handleDelete(index);
      }
    }];
    // 单选模式，选中时增加取消操作
    if (!closeDefaultCheck && !isMultiple && checked) {
      operationBtn.unshift({
        type: 'button',
        className: 'ae-OptionControlItem-action',
        label: i18n("aafda9e8f6b7b613680677c513edb7a6"),
        onClick: function () {
          return _this.handleToggleDefaultValue(index, false);
        }
      });
    }
    var disabled = (props === null || props === void 0 ? void 0 : props.hidden) === true;
    var tooltip = disabled ? i18n("bc3f5a690d8c3a47d27ef8a1b127bafc") : i18n("0560b060c438e9326f92718ccbc3f95b");
    return React__default.createElement("li", {
      className: "ae-OptionControlItem",
      key: index
    }, React__default.createElement("div", {
      className: "ae-OptionControlItem-Main"
    }, React__default.createElement("a", {
      className: "ae-OptionControlItem-dragBar"
    }, React__default.createElement(Icon, {
      icon: "drag-bar",
      className: "icon"
    })), !this.props.closeDefaultCheck && this.props.data.defaultCheckAll !== true && React__default.createElement("span", {
      className: "inline-flex",
      "data-tooltip": tooltip
    }, React__default.createElement(Checkbox, {
      className: "ae-OptionControlItem-checkbox",
      checked: checked,
      disabled: disabled,
      type: isMultiple ? 'checkbox' : 'radio',
      onChange: function (newChecked, shift) {
        return _this.handleToggleDefaultValue(index, newChecked, shift);
      }
    })), render({
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      className: 'ae-OptionControlItem-input',
      value: label,
      placeholder: i18n("5d26b8a41e805204c9dcd5ea7e23b150"),
      clearable: false,
      onChange: function (value) {
        _this.handleEditLabel(index, value);
      }
    }), render$1('dropdown', {
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
  OptionControl.prototype.buildBatchAddSchema = function () {
    return {
      type: 'action',
      actionType: 'dialog',
      label: i18n("22de6ef85ed60ec54dbdc1d8583e5104"),
      dialog: {
        title: i18n("421252e16c6cb544fe9ce0be94a190e0"),
        headerClassName: 'font-bold',
        closeOnEsc: true,
        closeOnOutside: false,
        showCloseButton: true,
        onConfirm: this.handleBatchAdd,
        body: [{
          type: 'alert',
          level: 'warning',
          body: [{
            type: 'tpl',
            tpl: i18n("c130bd5b55edefdaf8923269e9a52439")
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
            name: 'batchOption',
            type: 'textarea',
            label: '',
            placeholder: i18n("1e2f96a69fbef8caa8823a3067ebbdc7"),
            trimContents: true,
            minRows: 10,
            maxRows: 50,
            required: true
          }]
        }]
      }
    };
  };
  OptionControl.prototype.handleAPIChange = function (source) {
    this.setState({
      api: source
    }, this.onChange);
  };
  OptionControl.prototype.handleLableFieldChange = function (labelField) {
    this.setState({
      labelField: labelField
    }, this.onChange);
  };
  OptionControl.prototype.handleValueFieldChange = function (valueField) {
    this.setState({
      valueField: valueField
    }, this.onChange);
  };
  /** 获取功能性字段控件 schema */
  OptionControl.prototype.getFuncFieldSchema = function () {
    var _a = this.state,
      labelField = _a.labelField,
      valueField = _a.valueField;
    return [{
      label: tipedLabel(i18n("7e9c83e86beb612377a94e6e8d1fc644"), i18n("26ff46d82166741297ce666b2792af85")),
      type: 'input-text',
      name: 'labelField',
      clearable: true,
      value: labelField,
      placeholder: i18n("6d4ce0631f37676a887c9599691fabec"),
      onChange: this.handleLableFieldChange
    }, {
      label: i18n("2e01f5f5889e33d003bec7857cd38445"),
      type: 'input-text',
      name: 'valueField',
      clearable: true,
      value: valueField,
      placeholder: i18n("959c27193eb0a41d01f4b53dcc4b9245"),
      onChange: this.handleValueFieldChange
    }];
  };
  OptionControl.prototype.renderApiPanel = function () {
    var render = this.props.render;
    var _a = this.state,
      source = _a.source,
      api = _a.api;
    return render('api', getSchemaTpl('apiControl', {
      label: i18n("54ea89b497ec3bb319c68844dfa3687f"),
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
    var _a = this.state,
      options = _a.options,
      source = _a.source;
    var _b = this.props,
      render = _b.render,
      className = _b.className,
      multipleProps = _b.multiple;
    return React__default.createElement("div", {
      className: cx('ae-OptionControl', className)
    }, this.renderHeader(), source === 'custom' ? React__default.createElement("div", {
      className: "ae-OptionControl-wrapper"
    }, Array.isArray(options) && options.length ? React__default.createElement("ul", {
      className: "ae-OptionControl-content",
      ref: this.dragRef
    }, options.map(function (option, index) {
      return _this.renderOption(__assign(__assign({}, option), {
        index: index,
        multipleProps: multipleProps
      }));
    })) : React__default.createElement("div", {
      className: "ae-OptionControl-placeholder"
    }, i18n("a4f1ddbbfc96930d24e4b54cb815b62b")), React__default.createElement("div", {
      className: "ae-OptionControl-footer"
    }, React__default.createElement(Button, {
      level: "enhance",
      onClick: this.handleAdd,
      ref: this.targetRef
    }, i18n("e8755fb1e985a5d26df0fce1f0b7b0f8")), render('inner', this.buildBatchAddSchema()))) : null, source === 'api' || source === 'apicenter' ? this.renderApiPanel() : null, source === 'variable' ? render('variable', {
      type: 'control',
      label: false,
      className: 'ae-ExtendMore',
      body: [getSchemaTpl('sourceBindControl', {
        label: false,
        onChange: debounce(this.handleAPIChange, 1000)
      })].concat(this.getFuncFieldSchema())
    }) : null);
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "targetRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "dragRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleSourceChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Number, String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleEditLabel", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Number, String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleHiddenValueChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleAdd", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Array, Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleBatchAdd", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleAPIChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleLableFieldChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleValueFieldChange", null);
  return OptionControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(OptionControlRenderer, _super);
  function OptionControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  OptionControlRenderer = __decorate([FormItem({
    type: 'ae-optionControl',
    renderLabel: false
  })], OptionControlRenderer);
  return OptionControlRenderer;
})(OptionControl);

export { OptionControl as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
