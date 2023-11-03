/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { FormItem } from 'amis';
import { tipedLabel, getSchemaTpl, autobind } from 'amis-editor-core';
import { isObject } from 'amis-core';
import debounce from 'lodash/debounce';
import { i18n } from 'i18n-runtime';

/**
 * @file mapping 映射源配置
 */
var MapType;
(function (MapType) {
  MapType["CUSTOM"] = "custom";
  MapType["API"] = "api";
  MapType["VARIABLE"] = "variable";
})(MapType || (MapType = {}));
var MapSourceControl = /** @class */function (_super) {
  __extends(MapSourceControl, _super);
  function MapSourceControl(props) {
    var _this = _super.call(this, props) || this;
    _this.debounceMapChange = debounce(_this.handleMapChange, 250);
    var mapType = MapType.CUSTOM;
    if (props.data.hasOwnProperty('source') && props.data.source) {
      mapType = /\$\{(.*?)\}/g.test(props.data.source) ? MapType.VARIABLE : MapType.API;
    }
    _this.state = {
      map: props.data.map,
      source: props.data.source,
      labelField: props.data.labelField,
      valueField: props.data.valueField,
      mapType: mapType
    };
    return _this;
  }
  MapSourceControl.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
    var _a, _b, _c;
    var isArrayOld = Array.isArray((_a = prevProps.data) === null || _a === void 0 ? void 0 : _a.map);
    var isArrayNew = Array.isArray((_b = this.props.data) === null || _b === void 0 ? void 0 : _b.map);
    // map 类型改变了
    if (isArrayOld !== isArrayNew) {
      this.setState({
        map: (_c = this.props.data) === null || _c === void 0 ? void 0 : _c.map
      });
    }
  };
  /**
   * 更新map字段的统一出口
   */
  MapSourceControl.prototype.onChange = function () {
    var _a = this.state,
      mapType = _a.mapType,
      source = _a.source,
      map = _a.map,
      labelField = _a.labelField,
      valueField = _a.valueField;
    var onBulkChange = this.props.onBulkChange;
    labelField = labelField === '' ? undefined : labelField;
    valueField = valueField === '' ? undefined : valueField;
    if (mapType === MapType.CUSTOM) {
      onBulkChange && onBulkChange({
        map: map,
        source: undefined,
        labelField: labelField,
        valueField: valueField
      });
      return;
    }
    if ([MapType.API, MapType.VARIABLE].includes(mapType)) {
      onBulkChange && onBulkChange({
        source: source,
        map: undefined,
        labelField: labelField,
        valueField: valueField
      });
      return;
    }
  };
  /**
   * 切换选项类型
   */
  MapSourceControl.prototype.handleMapTypeChange = function (mapType) {
    this.setState({
      mapType: mapType,
      labelField: undefined,
      valueField: undefined
    }, this.onChange);
  };
  MapSourceControl.prototype.renderHeader = function () {
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
    var mapType = this.state.mapType;
    var optionSourceList = [{
      label: i18n("01820262aa9ad5b130f8f5b86bfd2968"),
      value: MapType.CUSTOM
    }, {
      label: i18n("f99603414a616bdee85de0e6e3938b65"),
      value: MapType.API
    }, {
      label: i18n("50334fc77fc5a2c2636f14f158d3c417"),
      value: MapType.VARIABLE
    }].map(function (item) {
      return __assign(__assign({}, item), {
        onClick: function () {
          return _this.handleMapTypeChange(item.value);
        }
      });
    });
    return React__default.createElement("header", {
      className: "ae-OptionControl-header"
    }, React__default.createElement("label", {
      className: cx("".concat(classPrefix, "Form-label")),
      style: {
        marginBottom: 0
      }
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
          return item.value === mapType;
        }).label
      }
    })));
  };
  MapSourceControl.prototype.handleMapChange = function (map) {
    this.setState({
      map: map
    }, this.onChange);
  };
  MapSourceControl.prototype.handleAPIChange = function (source) {
    this.setState({
      source: source
    }, this.onChange);
  };
  MapSourceControl.prototype.handleLabelFieldChange = function (labelField) {
    this.setState({
      labelField: labelField
    }, this.onChange);
  };
  MapSourceControl.prototype.handleValueFieldChange = function (valueField) {
    this.setState({
      valueField: valueField
    }, this.onChange);
  };
  MapSourceControl.prototype.renderOtherFields = function () {
    return [{
      label: tipedLabel(i18n("3e7392ab43c6c76f294f41c3058c2ab1"), i18n("2135be5a60fc3c6fe864e159e289af51")),
      type: 'input-text',
      name: 'valueField',
      placeholder: i18n("6a1ca1c113a9b5bee58ea009e40f5954"),
      onChange: this.handleValueFieldChange
    }, {
      label: tipedLabel(i18n("7e9c83e86beb612377a94e6e8d1fc644"), i18n("dc7becbad712786c9e4766636047e509")),
      type: 'input-text',
      name: 'labelField',
      placeholder: i18n("1140acc9ac4b803b733f70445e7d495a"),
      onChange: this.handleLabelFieldChange,
      visibleOn: '${!itemSchema}'
    }];
  };
  MapSourceControl.prototype.renderApiPanel = function () {
    var render = this.props.render;
    var _a = this.state,
      mapType = _a.mapType,
      source = _a.source;
      _a.labelField;
      _a.valueField;
    if (mapType === MapType.CUSTOM) {
      return null;
    }
    return render('api', getSchemaTpl('apiControl', {
      label: i18n("54ea89b497ec3bb319c68844dfa3687f"),
      name: 'source',
      mode: 'normal',
      className: 'ae-ExtendMore',
      visibleOn: 'data.autoComplete !== false',
      value: source,
      onChange: this.handleAPIChange,
      sourceType: mapType,
      footer: this.renderOtherFields()
    }));
  };
  MapSourceControl.prototype.renderObjectMap = function () {
    var _this = this;
    var render = this.props.render;
    return render('objectMap', getSchemaTpl('combo-container', {
      label: '',
      type: 'combo',
      mode: 'normal',
      scaffold: {
        key: 'key-{index}',
        value: 'value-{index}'
      },
      required: true,
      name: 'map',
      descriptionClassName: 'help-block text-xs m-b-none',
      description: i18n("55497c5de8558f1a164e437205cd510b"),
      multiple: true,
      pipeIn: function (value) {
        if (!isObject(value)) {
          return [{
            key: 'key0',
            value: 'value1'
          }];
        }
        var arr = [];
        Object.keys(value).forEach(function (key) {
          arr.push({
            key: key || '',
            value: typeof value[key] === 'string' ? value[key] : JSON.stringify(value[key])
          });
        });
        return arr;
      },
      pipeOut: function (value) {
        if (!Array.isArray(value)) {
          return value;
        }
        var obj = {};
        value.forEach(function (item, idx) {
          var key = item.key || '';
          var value = item.value;
          if (key === 'key-{index}' && value === 'value-{index}') {
            key = key.replace('-{index}', "".concat(idx));
            value = value.replace('-{index}', "".concat(idx));
          }
          try {
            value = JSON.parse(value);
          } catch (e) {}
          obj[key] = value;
        });
        return obj;
      },
      onChange: function (value) {
        _this.handleMapChange(value || {
          '*': i18n("2b10dfa6dbdf8775ab2b38fc67e7ea49")
        });
      },
      items: [{
        placeholder: 'Key',
        type: 'input-text',
        unique: true,
        name: 'key',
        required: true,
        columnClassName: 'w-xs'
      }, {
        placeholder: i18n("2d711b09bd0db0ad240cc83b30dd8014"),
        type: 'input-text',
        name: 'value'
      }]
    }));
  };
  MapSourceControl.prototype.handleMapItemChange = function (index, item) {
    var _a = this.state.map,
      map = _a === void 0 ? [] : _a;
    var newMap = map.slice();
    try {
      item = JSON.parse(item);
    } catch (e) {}
    newMap.splice(index, 1, item);
    this.handleMapChange(newMap);
  };
  MapSourceControl.prototype.renderArrayMap = function () {
    var _this = this;
    var render = this.props.render;
    return React__default.createElement("div", {
      className: "ae-ExtendMore"
    }, render('arrayMap', __spreadArray([{
      type: 'json-editor',
      name: 'map',
      label: false,
      placeholder: i18n("94124fa72dbfbb81611496cada6ebf4c"),
      onChange: function (value) {
        try {
          var map = JSON.parse(value);
          _this.debounceMapChange(map);
        } catch (e) {
          console.error();
        }
      }
    }], __read(this.renderOtherFields()), false)));
  };
  MapSourceControl.prototype.renderMap = function () {
    var map = this.state.map;
    if (map && Array.isArray(map)) {
      return this.renderArrayMap();
    }
    return this.renderObjectMap();
  };
  MapSourceControl.prototype.render = function () {
    var mapType = this.state.mapType;
    var _a = this.props,
      className = _a.className,
      render = _a.render;
    return React__default.createElement("div", {
      className: cx('ae-OptionControl', className)
    }, this.renderHeader(), mapType === MapType.CUSTOM ? this.renderMap() : null, mapType === MapType.API ? this.renderApiPanel() : null, mapType === MapType.VARIABLE ? render('variable', getSchemaTpl('sourceBindControl', {
      label: false,
      className: 'ae-ExtendMore'
    }), {
      onChange: this.handleAPIChange
    }) : null);
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], MapSourceControl.prototype, "handleMapTypeChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], MapSourceControl.prototype, "handleMapChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], MapSourceControl.prototype, "handleAPIChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], MapSourceControl.prototype, "handleLabelFieldChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], MapSourceControl.prototype, "handleValueFieldChange", null);
  return MapSourceControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(MapSourceControlRenderer, _super);
  function MapSourceControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MapSourceControlRenderer = __decorate([FormItem({
    type: 'ae-mapSourceControl',
    renderLabel: false
  })], MapSourceControlRenderer);
  return MapSourceControlRenderer;
})(MapSourceControl);

export { MapSourceControl as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
