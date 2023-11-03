/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var mergeWith = require('lodash/mergeWith');
var cloneDeep = require('lodash/cloneDeep');
var cx = require('classnames');
var amis = require('amis');
var amisUi = require('amis-ui');
var mobxStateTree = require('mobx-state-tree');
var amisCore = require('amis-core');
var amisEditorCore = require('amis-editor-core');
var debounce = require('lodash/debounce');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var mergeWith__default = /*#__PURE__*/_interopDefaultLegacy(mergeWith);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);

var APIControl = /** @class */function (_super) {
  tslib.__extends(APIControl, _super);
  function APIControl(props) {
    var _this = _super.call(this, props) || this;
    _this.handleSimpleInputChange = debounce__default["default"](function (value) {
      _this.handleSubmit(value, 'input');
    }, 1000);
    _this.state = {
      apiStr: _this.transformApi2Str(props.value),
      selectedItem: [],
      schema: props.pickerSchema,
      loading: false
    };
    return _this;
  }
  APIControl.prototype.componentDidMount = function () {
    this.updatePickerOptions();
  };
  APIControl.prototype.componentDidUpdate = function (prevProps) {
    var props = this.props;
    if (prevProps.value !== props.value) {
      this.setState({
        apiStr: this.transformApi2Str(props.value)
      });
      this.updatePickerOptions();
    }
    if (amisEditorCore.anyChanged(['enablePickerMode', 'pickerSchema'], prevProps, props)) {
      this.setState({
        schema: props.pickerSchema
      });
    }
    if (amisCore.isApiOutdated(prevProps === null || prevProps === void 0 ? void 0 : prevProps.pickerSource, props === null || props === void 0 ? void 0 : props.pickerSource, prevProps.data, props.data)) {
      this.fetchOptions();
    }
  };
  /**
   * 已选API详情，因为list接口是分页的，所以需要单独调用一次
   */
  APIControl.prototype.updatePickerOptions = function () {
    var _a;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var apiObj, keyword;
      return tslib.__generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            apiObj = amisCore.normalizeApi(this.props.value);
            if (!((_a = apiObj === null || apiObj === void 0 ? void 0 : apiObj.url) === null || _a === void 0 ? void 0 : _a.startsWith('api://'))) return [3 /*break*/, 4];
            this.setState({
              loading: true
            });
            keyword = apiObj.url.replace('api://', '');
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3,, 4]);
            return [4 /*yield*/, this.fetchOptions(keyword)];
          case 2:
            _b.sent();
            return [3 /*break*/, 4];
          case 3:
            _b.sent();
            return [3 /*break*/, 4];
          case 4:
            this.setState({
              loading: false
            });
            return [2 /*return*/];
        }
      });
    });
  };

  APIControl.prototype.transformApi2Str = function (value) {
    var api = amisCore.normalizeApi(value);
    return api.url ? "".concat(api.method && api.method.toLowerCase() !== 'get' /** 默认为GET请求，直接隐藏掉前缀，为了呈现更多信息 */ ? "".concat(api.method, ":") : '').concat(api.url) : '';
  };
  APIControl.prototype.fetchOptions = function (keyword) {
    var _a, _b, _c, _d;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var _e, value, data, env, searchField, searchType, pickerSource, apiObj, apiKey, ctx, schemaFilter, res, items, selectedItem;
      var _f;
      return tslib.__generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            _e = this.props, value = _e.value, data = _e.data, env = _e.env, searchField = _e.searchField, searchType = _e.searchType;
            pickerSource = this.props.pickerSource;
            apiObj = amisCore.normalizeApi(value);
            if (!pickerSource || !(apiObj === null || apiObj === void 0 ? void 0 : apiObj.url)) {
              return [2 /*return*/];
            }

            apiKey = (_b = (_a = apiObj === null || apiObj === void 0 ? void 0 : apiObj.url) === null || _a === void 0 ? void 0 : _a.split('api://')) === null || _b === void 0 ? void 0 : _b[1];
            ctx = amisEditorCore.createObject(data, tslib.__assign({
              value: value,
              op: 'loadOptions'
            }, keyword && searchField ? (_f = {}, _f[searchField] = keyword, _f.searchType = searchType, _f) : {}));
            schemaFilter = mobxStateTree.getEnv(window.editorStore).schemaFilter;
            // 基于爱速搭的规则转换一下
            if (schemaFilter) {
              pickerSource = schemaFilter({
                api: pickerSource
              }).api;
            }
            if (!amisCore.isEffectiveApi(pickerSource, ctx)) return [3 /*break*/, 2];
            return [4 /*yield*/, env.fetcher(pickerSource, ctx)];
          case 1:
            res = _g.sent();
            items = ((_c = res.data) === null || _c === void 0 ? void 0 : _c.items) || ((_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.rows);
            if (items.length) {
              selectedItem = items.find(function (item) {
                return item.key === apiKey;
              });
              this.setState({
                selectedItem: selectedItem ? [selectedItem] : []
              });
            }
            _g.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };

  APIControl.prototype.inputRef = function (ref) {
    this.input = ref;
  };
  APIControl.prototype.focus = function () {
    if (!this.input) {
      return;
    }
    this.input.focus();
  };
  APIControl.prototype.clearPickerValue = function () {
    var _this = this;
    var onChange = this.props.onChange;
    this.setState({
      apiStr: this.transformApi2Str(undefined),
      selectedItem: []
    }, function () {
      onChange === null || onChange === void 0 ? void 0 : onChange(undefined);
      _this.focus();
    });
  };
  APIControl.prototype.handleSubmit = function (values, action) {
    var _a = this.props,
      onChange = _a.onChange,
      value = _a.value;
    var api = values;
    // Picker未做选择
    if (!values && action === 'picker-submit') {
      return;
    }
    if (typeof value !== 'string' || typeof values !== 'string') {
      api = mergeWith__default["default"]({}, amisCore.normalizeApi(value), amisCore.normalizeApi(values), function (value, srcValue, key) {
        // 这三个支持删除单个key的属性需用新值完全替换
        // 否则删除无效
        if (['data', 'responseData', 'headers'].includes(key)) {
          return srcValue;
        }
      });
      ['data', 'responseData', 'headers'].forEach(function (item) {
        if (api[item] == null) {
          delete api[item];
        }
      });
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(api);
  };
  APIControl.prototype.handleAction = function (schema, e, action, data) {
    var onAction = this.props.onAction;
    onAction === null || onAction === void 0 ? void 0 : onAction(schema, e, action, data);
  };
  APIControl.prototype.normalizeValue = function (value, callback) {
    var transformedValue = cloneDeep__default["default"](value);
    if (typeof callback === 'function') {
      transformedValue = callback(value);
    }
    return transformedValue;
  };
  APIControl.prototype.handlePickerConfirm = function (value) {
    var onPickerConfirm = this.props.onPickerConfirm;
    this.handleSubmit(this.normalizeValue(value, onPickerConfirm), 'picker-submit');
  };
  APIControl.prototype.handlePickerClose = function () {
    var onPickerClose = this.props.onPickerClose;
    onPickerClose === null || onPickerClose === void 0 ? void 0 : onPickerClose();
  };
  APIControl.prototype.renderHeader = function () {
    var _a;
    var _b = this.props,
      render = _b.render,
      labelRemark = _b.labelRemark,
      useMobileUI = _b.useMobileUI,
      popOverContainer = _b.popOverContainer,
      env = _b.env;
    var label = this.props.label;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    // const actionsDom =
    //   Array.isArray(actions) && actions.length > 0
    //     ? actions.map((action, index) => {
    //         return render(`action/${index}`, action, {
    //           key: index,
    //           onAction: this.handleAction.bind(this, action)
    //         });
    //       })
    //     : null;
    return React__default["default"].createElement("header", {
      className: "ApiControl-header",
      key: "header"
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"))
    }, (label === null || label === void 0 ? void 0 : label.type) ? render('label', label) : label || '', labelRemark ? render('label-remark', {
      type: 'remark',
      icon: labelRemark.icon || 'warning-mark',
      tooltip: labelRemark,
      className: cx__default["default"]("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
      useMobileUI: useMobileUI,
      container: popOverContainer || env.getModalContainer
    }) : null));
  };
  APIControl.prototype.renderPickerSchema = function () {
    var _this = this;
    var _a = this.props,
      render = _a.render,
      pickerTitle = _a.pickerTitle;
      _a.pickerName;
      var pickerSize = _a.pickerSize,
      pickerHeaderClassName = _a.pickerHeaderClassName,
      pickerBtnSchema = _a.pickerBtnSchema,
      enablePickerMode = _a.enablePickerMode,
      onPickerSelect = _a.onPickerSelect;
    var _c = this.state,
      selectedItem = _c.selectedItem,
      schema = _c.schema;
    if (!schema) {
      return null;
    }
    return React__default["default"].createElement(amisUi.PickerContainer, {
      title: pickerTitle,
      headerClassName: cx__default["default"](pickerHeaderClassName, 'font-bold'),
      onConfirm: this.handlePickerConfirm,
      onCancel: this.handlePickerClose,
      size: pickerSize,
      bodyRender: function (_a) {
        var onChange = _a.onChange,
          setState = _a.setState;
        return render('api-control-picker', schema, {
          value: selectedItem,
          onSelect: function (items) {
            setState({
              selectedItem: items
            });
            onChange(_this.normalizeValue(items, onPickerSelect));
          }
        });
      }
    }, function (_a) {
      var onClick = _a.onClick,
        isOpened = _a.isOpened;
      return render('picker-action', tslib.__assign(tslib.__assign({
        icon: React__default["default"].createElement(amis.Icon, {
          icon: "picker-icon",
          className: "icon ae-ApiControl-icon"
        })
      }, pickerBtnSchema), {
        className: cx__default["default"]('ae-ApiControl-PickerBtn', pickerBtnSchema === null || pickerBtnSchema === void 0 ? void 0 : pickerBtnSchema.className)
      }), {
        onClick: function (e) {
          return tslib.__awaiter(_this, void 0, void 0, function () {
            return tslib.__generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  if (!(!isOpened && enablePickerMode)) return [3 /*break*/, 4];
                  _b.label = 1;
                case 1:
                  _b.trys.push([1, 3,, 4]);
                  return [4 /*yield*/, this.fetchOptions()];
                case 2:
                  _b.sent();
                  return [3 /*break*/, 4];
                case 3:
                  _b.sent();
                  return [3 /*break*/, 4];
                case 4:
                  onClick(e);
                  return [2 /*return*/];
              }
            });
          });
        }
      });
    });
  };

  APIControl.prototype.renderApiDialog = function () {
    return {
      label: '',
      type: 'action',
      acitonType: 'dialog',
      size: 'sm',
      icon: React__default["default"].createElement(amis.Icon, {
        icon: "setting",
        className: "icon ae-ApiControl-icon"
      }),
      className: 'ae-ApiControl-setting-button',
      actionType: 'dialog',
      dialog: {
        title: i18nRuntime.i18n("e370757f933a8ecd87bf0255c3ce45d0"),
        size: 'md',
        className: 'ae-ApiControl-dialog',
        headerClassName: 'font-bold',
        bodyClassName: 'ae-ApiControl-dialog-body',
        closeOnEsc: true,
        closeOnOutside: false,
        showCloseButton: true,
        // data: {},
        body: [this.renderApiConfigTabs()]
      }
    };
  };
  APIControl.prototype.renderApiConfigTabs = function (submitOnChange) {
    if (submitOnChange === void 0) {
      submitOnChange = false;
    }
    var _a = this.props;
      _a.messageDesc;
      var _b = _a.debug,
      debug = _b === void 0 ? false : _b,
      name = _a.name;
    return {
      type: 'form',
      className: 'ae-ApiControl-form AMISCSSWrapper',
      mode: 'horizontal',
      submitOnChange: submitOnChange,
      wrapWithPanel: false,
      onSubmit: this.handleSubmit,
      debug: debug,
      body: [{
        type: 'tabs',
        className: 'ae-ApiControl-tabs',
        contentClassName: 'ae-ApiControl-tabContent',
        tabs: [{
          title: i18nRuntime.i18n("7c57a563ab87bc6eb5edd8f5b953f499"),
          tab: [{
            label: i18nRuntime.i18n("6aa351f5dacd13d3d862d9c93e4a0241"),
            name: 'method',
            value: 'get',
            type: 'button-group-select',
            mode: 'horizontal',
            options: [{
              value: 'get',
              label: 'GET'
            }, {
              value: 'post',
              label: 'POST'
            }, {
              value: 'put',
              label: 'PUT'
            }, {
              value: 'patch',
              label: 'PATCH'
            }, {
              value: 'delete',
              label: 'DELETE'
            }]
          }, {
            label: i18nRuntime.i18n("85624c8e8b0fc98954eecbe508e8b59d"),
            type: 'input-text',
            name: 'url',
            mode: 'horizontal',
            size: 'lg',
            placeholder: 'http://',
            required: true
          }, {
            label: i18nRuntime.i18n("8dc91bca9bc83efea73150e3478657fc"),
            type: 'input-text',
            name: 'sendOn',
            mode: 'horizontal',
            size: 'lg',
            placeholder: i18nRuntime.i18n("bf9e242338d2c26b182aa6b9c015d84c"),
            description: i18nRuntime.i18n("91ee84292a5bf5e59d3b6309f948f2f1")
          }, {
            label: i18nRuntime.i18n("7c6722203327e8173be987f36fadf610"),
            type: 'button-group-select',
            name: 'dataType',
            size: 'sm',
            mode: 'horizontal',
            description: "".concat(i18nRuntime.i18n("55409342e28d37db86fb23efbd84a025"), "\uFF1A<%= data.dataType === \"json\" ? \"application/json\" : (data.dataType === \"form-data\" ? \"multipart/form-data\" : (data.dataType === \"form\" ? \"application/x-www-form-urlencoded\" : \"\")) %>\uFF0C").concat(i18nRuntime.i18n("e06a14abe7ef66a8ead143db4ae9786e")),
            options: [{
              label: 'JSON',
              value: 'json'
            }, {
              label: 'FormData',
              value: 'form-data'
            }, {
              label: 'Form',
              value: 'form'
            }],
            disabled: false
          }, {
            type: 'group',
            body: [{
              type: 'switch',
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6e6d4269d0dc3324d551062350a2ae9f"), i18nRuntime.i18n("ddca9c0f0e3d07c3341701b80f139cc0")),
              name: 'silent',
              mode: 'horizontal'
            }]
          }, {
            type: 'switch',
            label: i18nRuntime.i18n("773a0e8384fd6f784088b829d7cc2f68"),
            name: 'cache',
            mode: 'horizontal',
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value ? 3000 : undefined;
            }
          }, {
            label: '',
            type: 'input-number',
            name: 'cache',
            mode: 'horizontal',
            size: 'md',
            min: 0,
            step: 500,
            visibleOn: 'this.cache',
            description: i18nRuntime.i18n("c1b110f13431df9662299f26def71df1"),
            pipeIn: function (value) {
              return typeof value === 'number' ? value : 0;
            }
          }, {
            label: i18nRuntime.i18n("a18ea11244325dd3d20c5988bc7f6e39"),
            name: 'responseType',
            type: 'switch',
            mode: 'horizontal',
            description: i18nRuntime.i18n("68caa6082eda1745aa3f6b6d12efe423"),
            pipeIn: function (value) {
              return value === 'blob';
            },
            pipeOut: function (value) {
              return value ? 'blob' : undefined;
            }
          }, {
            label: i18nRuntime.i18n("91831507074270c0da8a31ad9ff87495"),
            name: 'replaceData',
            type: 'switch',
            mode: 'horizontal',
            description: i18nRuntime.i18n("42be3061671b38468cc6ac84f6a0dd77")
          }, {
            label: '',
            name: 'interval',
            type: 'input-number',
            mode: 'horizontal',
            size: 'md',
            visibleOn: 'typeof this.interval === "number"',
            step: 500,
            description: i18nRuntime.i18n("81fe75a5216d4f612f1809c122f5145a")
          }, {
            label: i18nRuntime.i18n("19c5410b23fba4bbfd1a58bbd5268c9b"),
            name: 'silentPolling',
            type: 'switch',
            mode: 'horizontal',
            visibleOn: '!!data.interval',
            description: i18nRuntime.i18n("04f840b0772f4b5d59954a29a76f4e7b")
          }, {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("83f16354dd1532422dc8b3581d096e7b"), i18nRuntime.i18n("620f826a77f079c5683a9d3c59461ea1")),
            name: 'stopAutoRefreshWhen',
            type: 'input-text',
            mode: 'horizontal',
            horizontal: {
              leftFixed: 'md'
            },
            size: 'lg',
            visibleOn: '!!data.interval',
            placeholder: i18nRuntime.i18n("6037dae99e9446deaed45f7e408f47ab")
          }]
        }, {
          title: i18nRuntime.i18n("90260d55567cfd97ec2f085963a60bcf"),
          tab: [{
            type: 'switch',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("be47bd270e7756d4233e59bbe4cd5b96"), i18nRuntime.i18n("f80cc88446cc10da4838556666f6b9f1")),
            name: 'headers',
            mode: 'horizontal',
            className: 'm-b-xs',
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value ? {
                '': ''
              } : null;
            }
          }, {
            type: 'combo',
            name: 'headers',
            mode: 'horizontal',
            syncDefaultValue: false,
            multiple: true,
            visibleOn: 'this.headers',
            items: [{
              type: 'input-text',
              name: 'key',
              placeholder: 'Key',
              unique: true,
              required: true,
              options: [{
                label: 'Content-Encoding',
                value: 'Content-Encoding'
              }, {
                label: 'Content-Type',
                value: 'Content-Type'
              }]
            }, {
              type: 'input-text',
              name: 'value',
              placeholder: 'Value',
              disabled: false
            }],
            pipeIn: function (value) {
              if (!amisEditorCore.isObject(value)) {
                return value;
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
              value.forEach(function (item) {
                var key = item.key || '';
                var value = item.value;
                try {
                  value = JSON.parse(value);
                } catch (e) {}
                obj[key] = value;
              });
              return obj;
            }
          }, {
            type: 'switch',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("8f0064a9cfd7dcbb3c729f1357f11772"), i18nRuntime.i18n("0fcbf036057c6dd88b7b809daa0c5eb7")),
            name: 'data',
            mode: 'horizontal',
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value ? {
                '&': '$$'
              } : null;
            }
          }, {
            type: 'combo',
            syncDefaultValue: false,
            name: 'data',
            mode: 'horizontal',
            renderLabel: false,
            visibleOn: 'this.data',
            descriptionClassName: 'help-block text-xs m-b-none',
            description: i18nRuntime.i18n("5414824fb8efdb7d59beae4bf95fdefd"),
            multiple: true,
            pipeIn: function (value) {
              if (!amisEditorCore.isObject(value)) {
                return value;
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
              value.forEach(function (item) {
                var key = item.key || '';
                var value = item.value;
                try {
                  value = JSON.parse(value);
                } catch (e) {}
                obj[key] = value;
              });
              return obj;
            },
            items: [{
              placeholder: 'Key',
              type: 'input-text',
              unique: true,
              name: 'key',
              required: true
            }, amisEditorCore.getSchemaTpl('DataPickerControl', {
              placeholder: 'Value',
              name: 'value'
            })]
          }, amisEditorCore.getSchemaTpl('apiRequestAdaptor'), {
            type: 'switch',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6d33298a54888a30753373ca5bfe3bc2"), i18nRuntime.i18n("542e06175ff4f7407c467bbde90de56a")),
            name: 'responseData',
            mode: 'horizontal',
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value ? {
                '&': '$$'
              } : null;
            }
          }, {
            type: 'combo',
            syncDefaultValue: false,
            name: 'responseData',
            mode: 'horizontal',
            renderLabel: false,
            visibleOn: 'this.responseData',
            descriptionClassName: 'help-block text-xs m-b-none',
            multiple: true,
            pipeIn: function (value) {
              if (!amisEditorCore.isObject(value)) {
                return value;
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
              value.forEach(function (item) {
                var key = item.key || '';
                var value = item.value;
                try {
                  value = JSON.parse(value);
                } catch (e) {}
                obj[key] = value;
              });
              return obj;
            },
            items: [{
              placeholder: 'Key',
              type: 'input-text',
              unique: true,
              name: 'key',
              required: true
            }, {
              placeholder: 'Value',
              type: 'input-text',
              name: 'value'
            }]
          }, amisEditorCore.getSchemaTpl(name === 'validateApi' ? 'validateApiAdaptor' : 'apiAdaptor')]
        }, {
          title: i18nRuntime.i18n("99c74120cc62f4bf31d661e3212b7121"),
          tab: [{
            label: i18nRuntime.i18n("7c583ecdf795ce4f1f40d7960ead9344"),
            type: 'combo',
            name: 'messages',
            mode: 'normal',
            multiLine: true,
            items: [{
              label: i18nRuntime.i18n("70941a02776496ec446f21f98ebf754e"),
              type: 'input-text',
              name: 'success'
            }, {
              label: i18nRuntime.i18n("f50bf418323ee425eca7208c09a4577e"),
              type: 'input-text',
              name: 'failed'
            }]
          }]
        }]
      }]
    };
  };
  APIControl.prototype.render = function () {
    var _this = this;
    var _a, _b;
    var _c = this.props,
      render = _c.render,
      className = _c.className,
      footerClassName = _c.footerClassName;
      _c.classPrefix;
      _c.label;
      _c.labelRemark;
      var value = _c.value,
      footer = _c.footer,
      _d = _c.border,
      border = _d === void 0 ? false : _d,
      _e = _c.onlyTabs,
      onlyTabs = _e === void 0 ? false : _e;
      _c.messageDesc;
      var enablePickerMode = _c.enablePickerMode,
      disabled = _c.disabled;
      _c.mode;
      var enableHighlight = _c.enableHighlight,
      _f = _c.labelField,
      labelField = _f === void 0 ? 'label' : _f;
      _c.useMobileUI;
      _c.popOverContainer;
      _c.env;
      var renderLabel = _c.renderLabel;
    var _g = this.state,
      apiStr = _g.apiStr,
      selectedItem = _g.selectedItem,
      loading = _g.loading;
    selectedItem = Array.isArray(selectedItem) && selectedItem.length !== 0 ? selectedItem : [];
    var highlightLabel = (_b = (_a = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem[0]) === null || _a === void 0 ? void 0 : _a[labelField]) !== null && _b !== void 0 ? _b : '';
    return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-ApiControl', className, {
        border: border
      })
    }, onlyTabs ? render('api-control-tabs', this.renderApiConfigTabs(true), {
      data: amisCore.normalizeApi(value)
    }) : React__default["default"].createElement(React__default["default"].Fragment, null, !renderLabel && this.renderHeader(), React__default["default"].createElement("div", {
      className: "ae-ApiControl-content",
      key: "content"
    }, React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-ApiControl-input')
    }, enableHighlight && highlightLabel ? React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-ApiControl-highlight')
    }, loading ? React__default["default"].createElement(amisUi.Spinner, {
      show: true,
      icon: "reload",
      size: "sm",
      spinnerClassName: cx__default["default"]('Select-spinner')
    }) : React__default["default"].createElement("span", {
      className: cx__default["default"]('ae-ApiControl-highlight-tag')
    }, React__default["default"].createElement("span", null, highlightLabel), React__default["default"].createElement("a", {
      onClick: this.clearPickerValue,
      className: cx__default["default"]('Modal-close')
    }, React__default["default"].createElement(amis.Icon, {
      icon: "close",
      className: cx__default["default"]('icon', 'ae-ApiControl-highlight-close')
    })))) : React__default["default"].createElement(amisUi.Input, {
      ref: this.inputRef,
      value: apiStr,
      type: "text",
      disabled: disabled,
      placeholder: "http://",
      onChange: function (e) {
        return _this.handleSimpleInputChange(e.currentTarget.value);
      }
    }), enablePickerMode ? this.renderPickerSchema() : null), render('api-control-dialog', this.renderApiDialog(), {
      data: amisCore.normalizeApi(value)
    })))), Array.isArray(footer) && footer.length !== 0 ? React__default["default"].createElement("footer", {
      className: cx__default["default"]('mt-3', footerClassName),
      key: "footer"
    }, render('api-control-footer', footer)) : null);
  };
  APIControl.defaultProps = {
    pickerBtnSchema: {
      type: 'button',
      level: 'link',
      size: 'sm'
    },
    labelField: 'label',
    searchType: 'key'
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], APIControl.prototype, "inputRef", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], APIControl.prototype, "clearPickerValue", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object, String]), tslib.__metadata("design:returntype", void 0)], APIControl.prototype, "handleSubmit", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], APIControl.prototype, "handlePickerConfirm", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], APIControl.prototype, "handlePickerClose", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], APIControl.prototype, "renderHeader", null);
  return APIControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(APIControlRenderer, _super);
  function APIControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  APIControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-apiControl',
    renderLabel: false
  })], APIControlRenderer);
  return APIControlRenderer;
})(APIControl);

exports["default"] = APIControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
