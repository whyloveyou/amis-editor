/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __assign, __read, __values, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import { reaction } from 'mobx';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import { isObject, isValidApi, normalizeApi, autobind, FormItem } from 'amis-core';
import { findDOMNode } from 'react-dom';
import { toast, Button } from 'amis-ui';
import { i18n } from 'i18n-runtime';

/**
 * @file FieldSetting.tsx
 * @desc 脚手架中字段管理
 */
var FieldSetting = /** @class */function (_super) {
  __extends(FieldSetting, _super);
  function FieldSetting(props) {
    var _this = this;
    var _a, _b;
    _this = _super.call(this, props) || this;
    _this.formRef = React__default.createRef();
    _this.tableRef = React__default.createRef();
    _this.scaffold = {
      label: '',
      name: '',
      displayType: 'tpl',
      inputType: 'input-text'
    };
    _this.debounceGenerateFields = debounce(function (e) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2 /*return*/, this.handleGenerateFields(e)];
        });
      });
    }, 200, {
      trailing: true,
      leading: false
    });
    props.render;
      props.classnames;
      var env = props.env,
      config = props.config,
      data = props.data;
      props.renderer;
      props.feat;
    (_b = (_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)) !== null && _b !== void 0 ? _b : _this.dom;
    var _c = config || {};
      _c.showDisplayType;
      _c.showInputType;
    (data === null || data === void 0 ? void 0 : data.__step) === 0;
    _this.state = {
      loading: false,
      fields: Array.isArray(props.value) ? props.value : []
    };
    _this.reaction = reaction(function () {
      var _a;
      var ctx = (_a = props === null || props === void 0 ? void 0 : props.store) === null || _a === void 0 ? void 0 : _a.data;
      var initApi = ctx === null || ctx === void 0 ? void 0 : ctx.initApi;
      var listApi = ctx === null || ctx === void 0 ? void 0 : ctx.listApi;
      var result = '';
      try {
        result = "".concat(JSON.stringify(initApi)).concat(JSON.stringify(listApi));
      } catch (error) {}
      return result;
    }, function () {
      return _this.forceUpdate();
    });
    return _this;
  }
  FieldSetting.prototype.componentDidMount = function () {
    this.dom = findDOMNode(this);
  };
  FieldSetting.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
    var prevValue = prevProps.value;
    var value = this.props.value;
    if (((prevValue === null || prevValue === void 0 ? void 0 : prevValue.length) !== (value === null || value === void 0 ? void 0 : value.length) || !isEqual(prevValue, value)) && !isEqual(value, prevState === null || prevState === void 0 ? void 0 : prevState.fields)) {
      this.setState({
        loading: true,
        fields: Array.isArray(value) ? value : []
      });
    }
  };
  FieldSetting.prototype.componentWillUnmount = function () {
    var _a;
    (_a = this.reaction) === null || _a === void 0 ? void 0 : _a.call(this);
  };
  FieldSetting.prototype.isFirstStep = function () {
    var _a, _b, _c;
    return ((_c = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.manager) === null || _b === void 0 ? void 0 : _b.store) === null || _c === void 0 ? void 0 : _c.scaffoldFormStep) === 0;
  };
  FieldSetting.prototype.handleTableChange = function (items) {
    if (!items || !Array.isArray(items)) {
      return;
    }
    var fields = this.state.fields.concat();
    this.handleFieldsChange(items.map(function (row) {
      var item = fields.find(function (r) {
        return (r === null || r === void 0 ? void 0 : r.name) === row.name;
      });
      return __assign(__assign({}, pick(__assign(__assign({}, item), row), ['label', 'name', 'displayType', 'inputType'])), {
        checked: true
      });
    }));
  };
  FieldSetting.prototype.handleSubmit = function (data) {
    var onSubmit = this.props.onSubmit;
    onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(data === null || data === void 0 ? void 0 : data.items);
  };
  FieldSetting.prototype.handleGenerateFields = function (e) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
      var _h, store, renderer, feat, env, manager, ctx, onAutoGenerateFields, scaffoldData, api, fields, error_1, schemaFilter, result, sampleRow, items, error_2;
      return __generator(this, function (_j) {
        switch (_j.label) {
          case 0:
            _h = this.props, store = _h.store, renderer = _h.renderer, feat = _h.feat, env = _h.env, manager = _h.manager, ctx = _h.data, onAutoGenerateFields = _h.onAutoGenerateFields;
            scaffoldData = store === null || store === void 0 ? void 0 : store.data;
            api = renderer === 'form' ? scaffoldData === null || scaffoldData === void 0 ? void 0 : scaffoldData.initApi : renderer === 'crud' ? scaffoldData === null || scaffoldData === void 0 ? void 0 : scaffoldData.listApi : '';
            if (!api || renderer === 'form' && feat !== 'Edit') {
              return [2 /*return*/];
            }

            this.setState({
              loading: true
            });
            fields = [];
            if (!(onAutoGenerateFields && typeof onAutoGenerateFields === 'function')) return [3 /*break*/, 5];
            _j.label = 1;
          case 1:
            _j.trys.push([1, 3,, 4]);
            return [4 /*yield*/, onAutoGenerateFields({
              api: api,
              props: this.props,
              setState: this.setState
            })];
          case 2:
            fields = _j.sent();
            return [3 /*break*/, 4];
          case 3:
            error_1 = _j.sent();
            toast.warning((_a = error_1.message) !== null && _a !== void 0 ? _a : i18n("91aa2166ee4811414381c8d94e6567e6"));
            return [3 /*break*/, 4];
          case 4:
            return [3 /*break*/, 9];
          case 5:
            schemaFilter = (_b = manager === null || manager === void 0 ? void 0 : manager.store) === null || _b === void 0 ? void 0 : _b.schemaFilter;
            if (schemaFilter) {
              api = schemaFilter({
                api: api
              }).api;
            }
            _j.label = 6;
          case 6:
            _j.trys.push([6, 8,, 9]);
            return [4 /*yield*/, env === null || env === void 0 ? void 0 : env.fetcher(api, ctx)];
          case 7:
            result = _j.sent();
            if (!result.ok) {
              toast.warning((_d = (_c = result.defaultMsg) !== null && _c !== void 0 ? _c : result.msg) !== null && _d !== void 0 ? _d : i18n("91aa2166ee4811414381c8d94e6567e6"));
              this.setState({
                loading: false
              });
              return [2 /*return*/];
            }

            sampleRow = void 0;
            if (feat === 'List') {
              items = ((_e = result.data) === null || _e === void 0 ? void 0 : _e.rows) || ((_f = result.data) === null || _f === void 0 ? void 0 : _f.items) || result.data;
              sampleRow = items === null || items === void 0 ? void 0 : items[0];
            } else {
              sampleRow = result.data;
            }
            if (sampleRow) {
              Object.entries(sampleRow).forEach(function (_a) {
                var _b = __read(_a, 2),
                  key = _b[0],
                  value = _b[1];
                var inputType = 'input-text';
                if (Array.isArray(value)) {
                  inputType = 'select';
                } else if (isObject(value)) {
                  inputType = 'combo';
                } else if (typeof value === 'number') {
                  inputType = 'input-number';
                }
                fields.push({
                  label: key,
                  name: key,
                  displayType: 'tpl',
                  inputType: inputType,
                  checked: true
                });
              });
            }
            return [3 /*break*/, 9];
          case 8:
            error_2 = _j.sent();
            toast.warning((_g = error_2.message) !== null && _g !== void 0 ? _g : i18n("91aa2166ee4811414381c8d94e6567e6"));
            return [3 /*break*/, 9];
          case 9:
            fields = Array.isArray(fields) && fields.length > 0 ? fields : [];
            this.handleFieldsChange(fields);
            this.setState({
              loading: false
            });
            return [2 /*return*/];
        }
      });
    });
  };

  FieldSetting.prototype.handleFieldsChange = function (fields) {
    var _a;
    var _b = this.props,
      manager = _b.manager,
      fieldKeys = _b.fieldKeys,
      onChange = _b.onChange,
      onBulkChange = _b.onBulkChange,
      submitOnChange = _b.submitOnChange,
      renderer = _b.renderer;
      _b.data;
    var isFirstStep = this.isFirstStep();
    var scaffoldStepManipulated = (_a = manager === null || manager === void 0 ? void 0 : manager.store) === null || _a === void 0 ? void 0 : _a.scaffoldStepManipulated;
    this.setState({
      fields: fields
    });
    if (renderer === 'form') {
      onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
    } else {
      if (isFirstStep) {
        /** 若未进行过下一步，则为所有 feat 字段进行初始化，否则仅修改List场景字段 */
        if (scaffoldStepManipulated) {
          onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
        } else {
          var updatedData_1 = {};
          fieldKeys.forEach(function (fieldKey) {
            if (!updatedData_1.hasOwnProperty(fieldKey)) {
              updatedData_1[fieldKey] = fields;
            }
          });
          onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(__assign(__assign({}, updatedData_1), {
            listFields: fields
          }), submitOnChange);
        }
      } else {
        onChange === null || onChange === void 0 ? void 0 : onChange(fields, submitOnChange, true);
      }
    }
  };
  FieldSetting.prototype.renderFooter = function () {
    var _a;
    var _b = this.props,
      cx = _b.classnames,
      renderer = _b.renderer,
      store = _b.store,
      ctx = _b.data,
      feat = _b.feat;
    var scaffoldData = store === null || store === void 0 ? void 0 : store.data;
    var _c = scaffoldData || {},
      initApi = _c.initApi,
      listApi = _c.listApi;
    var loading = this.state.loading;
    var fieldApi = renderer === 'form' ? initApi : renderer === 'crud' ? listApi : '';
    var isApiValid = isValidApi((_a = normalizeApi(fieldApi)) === null || _a === void 0 ? void 0 : _a.url);
    var showAutoGenBtn = renderer === 'form' && feat === 'Edit' || renderer === 'crud' && feat === 'List' && (ctx === null || ctx === void 0 ? void 0 : ctx.__step) === 0;
    return showAutoGenBtn ? React__default.createElement("div", {
      className: cx('ae-FieldSetting-footer', 'flex flex-row-reverse')
    }, React__default.createElement(Button, {
      size: "sm",
      level: "link",
      loading: loading,
      disabled: !isApiValid || loading,
      disabledTip: {
        content: loading ? i18n("acb3aec4d12f6ca06a1e45302030cdb1") : renderer === 'form' ? i18n("cdfd25057876424324682b5bdde38a3d") : i18n("a9fea442707e26dee478b34a2f2ce263"),
        tooltipTheme: 'dark'
      },
      onClick: this.debounceGenerateFields
    }, React__default.createElement("span", null, i18n("4cc6a76c146c0360a41ceaf5e212c891")))) : null;
  };
  FieldSetting.prototype.render = function () {
    var _a;
    var _b = this.props,
      render = _b.render,
      cx = _b.classnames,
      _c = _b.name,
      name = _c === void 0 ? 'items' : _c,
      renderer = _b.renderer,
      config = _b.config,
      feat = _b.feat;
    var _d = config || {},
      showDisplayType = _d.showDisplayType,
      showInputType = _d.showInputType;
    var isFirstStep = this.isFirstStep();
    var fields = this.state.fields.concat();
    return React__default.createElement(React__default.Fragment, null, render('field-setting', {
      type: 'input-table',
      name: name,
      label: false,
      className: cx('ae-FieldSetting-Table', 'mb-0') /** 底部有操作区，干掉默认的 margin-bottom */,
      showIndex: true,
      showFooterAddBtn: false,
      addable: true,
      addBtnLabel: i18n("66ab5e9f24c8f46012a25c89919fb191"),
      addBtnIcon: false,
      editable: true,
      editBtnLabel: i18n("95b351c86267f3aedf89520959bce689"),
      editBtnIcon: false,
      removable: true,
      deleteBtnLabel: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      deleteBtnIcon: false,
      confirmBtnLabel: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
      cancelBtnLabel: i18n("625fb26b4b3340f7872b411f401e754c"),
      needConfirm: true,
      enableStaticTransform: true,
      autoFocus: false,
      affixHeader: true,
      columnsTogglable: false,
      autoFillHeight: {
        maxHeight: 325 // 至少展示5个元素
      },

      footerAddBtn: {
        level: 'link',
        label: i18n("4484fa04e7b71db4c8293e5bcb53eca4")
      },
      scaffold: this.scaffold,
      columns: [{
        type: 'input-text',
        name: 'name',
        label: i18n("e996419dedc2f1ffd96e7a0e808127d0"),
        placeholder: i18n("e996419dedc2f1ffd96e7a0e808127d0")
      }, {
        type: 'input-text',
        name: 'label',
        label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
        placeholder: i18n("eea3ebc33e69694e0c12d4ab2e07a553")
      }, showInputType && !(renderer === 'crud' && feat === 'List' && !isFirstStep) ? {
        type: 'select',
        name: 'inputType',
        label: i18n("b3e55578af5dd473bab62641bb2f5f8e"),
        options: [{
          label: i18n("0766a6467bed7f2840871a5f0638669d"),
          value: 'input-text',
          icon: 'input-text-plugin'
        }, {
          label: i18n("15d169d28cd48c97fe751e4cc92ca926"),
          value: 'textarea'
        }, {
          label: i18n("9597dcaf432ceba92a160d61cb1ef65f"),
          value: 'input-number'
        }, {
          label: i18n("9913107b19cb6012250134ff91377430"),
          value: 'radios'
        }, {
          label: i18n("454e60f5759903d7d3dba58e3f9bd590"),
          value: 'checkbox'
        }, {
          label: i18n("db98f889ce6bc235e66bd4b2a788d137"),
          value: 'checkboxes'
        }, {
          label: i18n("006ded9fa277cf030592021f595a07d5"),
          value: 'select'
        }, {
          label: i18n("a6beb974cc0b50eebd18120b8110a88b"),
          value: 'switch'
        }, {
          label: i18n("4ff1e74e43a3586339251494117185ad"),
          value: 'input-date'
        }, {
          label: i18n("13c250c68608118463871ce7cd8b292c"),
          value: 'input-table'
        }, {
          label: i18n("254bb8aa6b92d588d957a383df24db1e"),
          value: 'combo'
        }, {
          label: i18n("481e034e6026969aae4ce7ce7c8a7b6f"),
          value: 'input-file'
        }, {
          label: i18n("6bfb9bb2218ff32b6139e98bc93707c0"),
          value: 'input-image'
        }, {
          label: i18n("24b6d4c0892a8f3ee2a982e3ab0afe38"),
          value: 'input-rich-text'
        }]
      } : undefined, showDisplayType ? {
        type: 'select',
        name: 'displayType',
        label: i18n("1711a82f9b0825015c2c49d9659c9837"),
        options: [{
          value: 'tpl',
          label: i18n("97d07614380da93d257f9fbf81aa56fb"),
          typeKey: 'tpl'
        }, {
          value: 'image',
          label: i18n("20def7942674282277c3714ed7ea6ce0"),
          typeKey: 'src'
        }, {
          value: 'date',
          label: i18n("4ff1e74e43a3586339251494117185ad"),
          typeKey: 'value'
        }, {
          value: 'progress',
          label: i18n("c7bff79d059a0b7ff9b02441959d8be2"),
          typeKey: 'value'
        }, {
          value: 'status',
          label: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          typeKey: 'value'
        }, {
          value: 'mapping',
          label: i18n("9da188491dd34c4382a5b9f006194e41"),
          typeKey: 'value'
        }, {
          value: 'list',
          label: i18n("3712972d84adf48acbd6ad24b4d75ad0"),
          typeKey: 'value'
        }]
      } : undefined].filter(Boolean)
    }, {
      data: (_a = {}, _a[name] = fields, _a),
      loading: this.state.loading,
      onChange: this.handleTableChange
    }), this.renderFooter());
  };
  FieldSetting.defaultProps = {
    config: {
      showInputType: true,
      showDisplayType: true
    }
  };
  FieldSetting.validator = function (items, isInternal) {
    var e_1, _a;
    var cache = {};
    var fields = items !== null && items !== void 0 ? items : [];
    var error = false;
    try {
      for (var _b = __values(fields.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2),
          index = _d[0],
          item = _d[1];
        /** 提交时再校验 */
        if (!item.name && isInternal !== true) {
          error = "\u5E8F\u53F7\u300C".concat(index + 1, "\u300D\u7684\u5B57\u6BB5\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
          break;
        }
        if (!cache.hasOwnProperty(item.name)) {
          cache[item.name] = true;
          continue;
        }
        error = "\u5E8F\u53F7\u300C".concat(index + 1, "\u300D\u7684\u5B57\u6BB5\u540D\u79F0\u300C").concat(item.name, "\u300D\u4E0D\u552F\u4E00");
        break;
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return error;
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Array]), __metadata("design:returntype", void 0)], FieldSetting.prototype, "handleTableChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], FieldSetting.prototype, "handleSubmit", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", Promise)], FieldSetting.prototype, "handleGenerateFields", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Array]), __metadata("design:returntype", void 0)], FieldSetting.prototype, "handleFieldsChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], FieldSetting.prototype, "renderFooter", null);
  return FieldSetting;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(FieldSettingRenderer, _super);
  function FieldSettingRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  FieldSettingRenderer = __decorate([FormItem({
    type: 'ae-field-setting'
  })], FieldSettingRenderer);
  return FieldSettingRenderer;
})(FieldSetting);

export { FieldSetting };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
