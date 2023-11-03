/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var amisCore = require('amis-core');
var debounce = require('lodash/debounce');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var matchSorter = require('match-sorter');
var cx = require('classnames');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var DataBindingControl = /** @class */function (_super) {
  tslib.__extends(DataBindingControl, _super);
  function DataBindingControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      loading: false,
      hint: undefined
    };
    return _this;
  }
  DataBindingControl.prototype.handleConfirm = function (result) {
    var _a, _b;
    var _c = this.props,
      manager = _c.manager,
      data = _c.data,
      onChange = _c.onChange,
      onBulkChange = _c.onBulkChange,
      onBindingChange = _c.onBindingChange;
    if (result === null || result === void 0 ? void 0 : result.value) {
      onChange(result.value);
      onBulkChange && (onBindingChange === null || onBindingChange === void 0 ? void 0 : onBindingChange(result, onBulkChange));
      (_b = (_a = manager.config) === null || _a === void 0 ? void 0 : _a.dataBindingChange) === null || _b === void 0 ? void 0 : _b.call(_a, result.value, data, manager);
    }
  };
  DataBindingControl.prototype.handlePickerOpen = function () {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var _a, manager, node, schema;
      return tslib.__generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this.props, manager = _a.manager, node = _a.node;
            this.setState({
              loading: true,
              schema: undefined
            });
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3,, 4]);
            return [4 /*yield*/, manager.getAvailableContextFields(node)];
          case 2:
            schema = _b.sent();
            return [3 /*break*/, 4];
          case 3:
            _b.sent();
            this.setState({
              loading: false,
              hint: i18nRuntime.i18n("005c50d1af6e833d6991ab882653b7ae")
            });
            return [2 /*return*/];
          case 4:
            this.setState({
              loading: false,
              hint: schema ? undefined : i18nRuntime.i18n("76f47297fe988267a26073a9aaf7911f"),
              schema: schema !== null && schema !== void 0 ? schema : undefined
            });
            return [2 /*return*/];
        }
      });
    });
  };

  DataBindingControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      className = _a.className;
      _a.classnames;
      var result = _a.value,
      onChange = _a.onChange;
      _a.multiple;
      var disabled = _a.disabled,
      render = _a.render;
    var _b = this.state,
      schema = _b.schema,
      loading = _b.loading,
      hint = _b.hint;
    return React__default["default"].createElement(amis.PickerContainer, {
      onPickerOpen: this.handlePickerOpen,
      className: className,
      title: i18nRuntime.i18n("020586d0c69f8211840ddf9ee9bbf6ab"),
      bodyRender: function (_a) {
        var value = _a.value,
          isOpened = _a.isOpened,
          onChange = _a.onChange;
        if (!isOpened) {
          return null;
        }
        if (loading) {
          return React__default["default"].createElement(amis.Spinner, {
            show: true,
            icon: "reload",
            spinnerClassName: "ae-DataBindingList-spinner"
          });
        }
        if (hint) {
          return React__default["default"].createElement("p", {
            className: "ae-DataBindingList-hint"
          }, hint);
        }
        return render('content', schema, {
          onSelect: onChange,
          value: value ? value.value : result
        });
      },
      value: result,
      onConfirm: this.handleConfirm
    }, function (_a) {
      var onClick = _a.onClick;
      return React__default["default"].createElement(amis.InputBox, {
        className: "ae-InputVariable",
        clearable: false,
        value: result,
        onChange: onChange,
        disabled: disabled
      }, React__default["default"].createElement("span", {
        onClick: function (e) {
          return tslib.__awaiter(_this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
              onClick(e);
              return [2 /*return*/];
            });
          });
        }
      }, React__default["default"].createElement(amis.Icon, {
        icon: "info",
        className: "icon cursor-pointer"
      })));
    });
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], DataBindingControl.prototype, "handleConfirm", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", Promise)], DataBindingControl.prototype, "handlePickerOpen", null);
  return DataBindingControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(DataBindingControlRenderer, _super);
  function DataBindingControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  DataBindingControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-DataBindingControl'
  })], DataBindingControlRenderer);
  return DataBindingControlRenderer;
})(DataBindingControl);
var SimpleDataBindingControl = /** @class */function (_super) {
  tslib.__extends(SimpleDataBindingControl, _super);
  function SimpleDataBindingControl(props) {
    var _this = _super.call(this, props) || this;
    _this.handleSearchDebounced = debounce__default["default"](_this.handleSearch, 250, {
      trailing: true,
      leading: false
    });
    _this.state = {
      filteredFields: props.fields
    };
    return _this;
  }
  SimpleDataBindingControl.prototype.handleSearch = function (keywords) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      return tslib.__generator(this, function (_a) {
        this.setState({
          filteredFields: matchSorter.matchSorter(this.props.fields, keywords, {
            keys: ['label', 'value', 'children'],
            threshold: matchSorter.matchSorter.rankings.CONTAINS
          })
        });
        return [2 /*return*/];
      });
    });
  };

  SimpleDataBindingControl.prototype.handleSelect = function () {};
  SimpleDataBindingControl.prototype.render = function () {
    var _a = this.props,
      className = _a.className,
      value = _a.value,
      onSelect = _a.onSelect,
      isSelected = _a.isSelected;
    var filteredFields = this.state.filteredFields;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-DataBindingList', className)
    }, React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-DataBindingList-searchBox')
    }, React__default["default"].createElement(amis.SearchBox, {
      mini: false,
      placeholder: i18nRuntime.i18n("91be693dd1ccea38f8f514318fd8a944"),
      onSearch: this.handleSearchDebounced
    })), React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-DataBindingList-body')
    }, React__default["default"].createElement(amis.CollapseGroup, {
      className: cx__default["default"]('ae-DataBindingList-collapseGroup'),
      defaultActiveKey: filteredFields.map(function (item) {
        return item.value || item.label;
      }),
      expandIcon: React__default["default"].createElement(amis.Icon, {
        cx: cx__default["default"],
        icon: "fa fa-chevron-right expandIcon",
        className: "Icon"
      }),
      expandIconPosition: "right"
    }, filteredFields.map(function (item, index) {
      return React__default["default"].createElement(amis.Collapse, {
        className: cx__default["default"]('ae-DataBindingList-collapse'),
        headingClassName: cx__default["default"]('ae-DataBindingList-collapse-title'),
        bodyClassName: cx__default["default"]('ae-DataBindingList-collapse-body'),
        propKey: item.value || item.label,
        key: item.value || item.label,
        header: React__default["default"].createElement("span", null, item.label)
      }, Array.isArray(item.children) && item.children.length > 0 ? item.children.map(function (childItem) {
        var checked = isSelected ? isSelected(childItem) : childItem.value === value;
        return React__default["default"].createElement("div", {
          className: cx__default["default"]('ae-DataBindingList-item', {
            'is-active': checked
          }),
          onClick: function () {
            return onSelect(childItem);
          },
          key: childItem.value
        }, childItem.label);
      }) : React__default["default"].createElement("p", {
        className: cx__default["default"]('ae-DataBindingList-hint')
      }, i18nRuntime.i18n("8517171ce4ad0e9a5b511bd6bb26f839")));
    }))));
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", Promise)], SimpleDataBindingControl.prototype, "handleSearch", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], SimpleDataBindingControl.prototype, "handleSelect", null);
  return SimpleDataBindingControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(SimpleDataBindingControlRenderer, _super);
  function SimpleDataBindingControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  SimpleDataBindingControlRenderer = tslib.__decorate([amisCore.Renderer({
    type: 'ae-SimpleDataBindingPanel'
  })], SimpleDataBindingControlRenderer);
  return SimpleDataBindingControlRenderer;
})(SimpleDataBindingControl);

exports.DataBindingControl = DataBindingControl;
exports.SimpleDataBindingControl = SimpleDataBindingControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
