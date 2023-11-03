/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __assign, __spreadArray, __read } from 'tslib';
import sortBy from 'lodash/sortBy';
import pick from 'lodash/pick';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import omit from 'lodash/omit';
import intersection from 'lodash/intersection';
import isFunction from 'lodash/isFunction';
import { isObject } from 'amis-core';
import { toast } from 'amis';
import { tipedLabel, getSchemaTpl, generateNodeId, JSONPipeOut } from 'amis-editor-core';
import { DSBuilder, registerDSBuilder } from './DSBuilder.js';
import { DSFeatureEnum, FormOperatorMap, DSFeature } from './constants.js';
import { displayType2inputType, traverseSchemaDeep } from './utils.js';
import { i18n } from 'i18n-runtime';

/**
 * @file ApiDsBuilder
 * @desc 外部 API 接口数据源构造器
 */
var ApiDSBuilder = /** @class */function (_super) {
  __extends(ApiDSBuilder, _super);
  function ApiDSBuilder() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.isDefault = true;
    _this.name = i18n("45f3a444853a11667f97e941b53266b0");
    _this.order = 1;
    _this.features = ['List', 'Insert', 'View', 'Edit', 'Delete', 'BulkEdit', 'BulkDelete', 'SimpleQuery'];
    return _this;
  }
  Object.defineProperty(ApiDSBuilder.prototype, "key", {
    /**
     * 获取键值。
     */
    get: function () {
      return this.constructor.key;
    },
    enumerable: false,
    configurable: true
  });
  ApiDSBuilder.prototype.match = function (schema, key) {
    var sourceKey = key && typeof key === 'string' ? key : 'api';
    var apiSchema = schema === null || schema === void 0 ? void 0 : schema[sourceKey];
    if ((schema === null || schema === void 0 ? void 0 : schema.dsType) != null || (apiSchema === null || apiSchema === void 0 ? void 0 : apiSchema.sourceType) != null) {
      return (schema === null || schema === void 0 ? void 0 : schema.dsType) === this.key || (apiSchema === null || apiSchema === void 0 ? void 0 : apiSchema.sourceType) === this.key;
    }
    /**
     * 携带 jsonql 一定不是 API 接口
     * 携带 strategy 为实体接口通过混合构建策略生成
     *  */
    if (isObject(apiSchema) && (apiSchema.jsonql != null || apiSchema.strategy != null)) {
      return false;
    }
    var maybeApiUrl = typeof apiSchema === 'string' ? apiSchema : isObject(apiSchema) ? (apiSchema === null || apiSchema === void 0 ? void 0 : apiSchema.url) || '' : '';
    if (typeof maybeApiUrl === 'string' && (/^(get|post|put|delete|patch|option|jsonp):/.test(apiSchema) || !~maybeApiUrl.indexOf('api://'))) {
      return true;
    }
    return false;
  };
  ApiDSBuilder.prototype.getContextFields = function (options) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, []];
      });
    });
  };
  ApiDSBuilder.prototype.getAvailableContextFields = function (options, target) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/];
      });
    });
  };

  ApiDSBuilder.prototype.getCRUDListFields = function (options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b, schema, controlSettings, fieldMapper, columns, result;
      return __generator(this, function (_c) {
        _b = options || {}, schema = _b.schema, controlSettings = _b.controlSettings;
        fieldMapper = (controlSettings || {}).fieldMapper;
        columns = (_a = schema === null || schema === void 0 ? void 0 : schema.columns) !== null && _a !== void 0 ? _a : [];
        result = [];
        columns.forEach(function (item) {
          var option = isFunction(fieldMapper) ? fieldMapper(item) : false;
          if (option !== false) {
            result.push(option);
          }
        });
        return [2 /*return*/, result];
      });
    });
  };
  ApiDSBuilder.prototype.getCRUDSimpleQueryFields = function (options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
      var _c, schema, controlSettings, fieldMapper, filterSchema, result;
      return __generator(this, function (_d) {
        _c = options || {}, schema = _c.schema, controlSettings = _c.controlSettings;
        fieldMapper = (controlSettings || {}).fieldMapper;
        filterSchema = (schema === null || schema === void 0 ? void 0 : schema.filter) ? Array.isArray(schema.filter) ? schema.filter.find(function (item) {
          return item.behavior && Array.isArray(item.behavior) && item.type === 'form';
        }) : ((_a = schema.filter) === null || _a === void 0 ? void 0 : _a.type) === 'form' ? schema.filter : undefined : undefined;
        result = [];
        ((_b = filterSchema === null || filterSchema === void 0 ? void 0 : filterSchema.body) !== null && _b !== void 0 ? _b : []).forEach(function (formItem) {
          if (formItem.type === 'condition-builder' || formItem.behavior === DSFeatureEnum.AdvancedQuery) {
            return;
          }
          var option = isFunction(fieldMapper) ? fieldMapper(formItem) : false;
          if (option !== false) {
            result.push(option);
          }
        });
        return [2 /*return*/, result];
      });
    });
  };
  ApiDSBuilder.prototype.makeSourceSettingForm = function (options) {
    var _a = options || {},
      feat = _a.feat,
      renderer = _a.renderer,
      inScaffold = _a.inScaffold,
      sourceSettings = _a.sourceSettings,
      sourceKey = _a.sourceKey;
    if (!feat) {
      return [];
    }
    var _b = sourceSettings || {},
      label = _b.label,
      name = _b.name,
      renderLabel = _b.renderLabel,
      labelClassName = _b.labelClassName,
      mode = _b.mode,
      horizontalConfig = _b.horizontalConfig,
      visibleOn = _b.visibleOn;
    var isCRUD = renderer === 'crud';
    /** 处理Label */
    var labelText = label !== null && label !== void 0 ? label : isCRUD && feat !== 'List' ? this.getFeatLabelByKey(feat) + i18n("54ea89b497ec3bb319c68844dfa3687f") : i18n("54ea89b497ec3bb319c68844dfa3687f");
    var normalizedLabel = labelText;
    if (feat === 'Insert') {
      normalizedLabel = tipedLabel(labelText, "\u7528\u6765\u4FDD\u5B58\u6570\u636E, \u8868\u5355\u63D0\u4EA4\u540E\u5C06\u6570\u636E\u4F20\u5165\u6B64\u63A5\u53E3\u3002<br/>\n        \u63A5\u53E3\u54CD\u5E94\u4F53\u8981\u6C42(\u5982\u679Cdata\u4E2D\u6709\u6570\u636E\uFF0C\u8BE5\u6570\u636E\u5C06\u88AB\u5408\u5E76\u5230\u8868\u5355\u4E0A\u4E0B\u6587\u4E2D)\uFF1A<br/>\n        <pre>".concat(JSON.stringify({
        status: 0,
        msg: '',
        data: {}
      }, null, 2), "</pre>"));
    } else if (feat === 'List') {
      normalizedLabel = tipedLabel(labelText, "\u63A5\u53E3\u54CD\u5E94\u4F53\u8981\u6C42\uFF1A<br/>\n        <pre>".concat(JSON.stringify({
        status: 0,
        msg: '',
        items: {},
        page: 0,
        total: 0
      }, null, 2), "</pre>"));
    }
    var layoutMode = mode !== null && mode !== void 0 ? mode : 'horizontal';
    var baseApiSchemaConfig = __assign(__assign(__assign({
      renderLabel: renderLabel !== null && renderLabel !== void 0 ? renderLabel : true,
      label: normalizedLabel,
      name: name !== null && name !== void 0 ? name : inScaffold ? this.getFeatValueByKey(feat) + 'Api' : 'api',
      mode: layoutMode,
      labelClassName: labelClassName,
      inputClassName: 'm-b-none'
    }, layoutMode === 'horizontal' ? horizontalConfig !== null && horizontalConfig !== void 0 ? horizontalConfig : {} : {}), visibleOn && typeof visibleOn === 'string' ? {
      visibleOn: visibleOn
    } : {}), {
      onPickerConfirm: function (value) {
        var transformedValue = value;
        var transform = function (apiObj) {
          var _a;
          return "".concat(((_a = apiObj === null || apiObj === void 0 ? void 0 : apiObj.api) === null || _a === void 0 ? void 0 : _a.method) || 'post', ":api://").concat((apiObj === null || apiObj === void 0 ? void 0 : apiObj.key) || '');
        };
        if (value) {
          transformedValue = Array.isArray(value) ? value.map(transform).join(',') : transform(value);
        }
        return transformedValue;
      }
    });
    return __spreadArray([/** 提交接口 */
    getSchemaTpl('apiControl', baseApiSchemaConfig), /** 表单初始化接口 */
    feat === 'Edit' && (renderer === 'form' || sourceKey === 'initApi') ? getSchemaTpl('apiControl', __assign(__assign({}, baseApiSchemaConfig), {
      name: 'initApi',
      label: tipedLabel(i18n("b4bc91701b86fe8543d649e97daea602"), "\u63A5\u53E3\u54CD\u5E94\u4F53\u8981\u6C42\uFF1A<br/>\n              <pre>".concat(JSON.stringify({
        status: 0,
        msg: '',
        data: {}
      }, null, 2), "</pre>"))
    })) : null], __read(feat === 'List' && renderer === 'crud' && !inScaffold ? [getSchemaTpl('apiControl', __assign(__assign({}, baseApiSchemaConfig), {
      name: 'quickSaveApi',
      label: tipedLabel(i18n("33eaf97ecb3465754855e847f14d129c"), i18n("419b0a74c438b81124992616dd0a36f3"))
    })), getSchemaTpl('apiControl', __assign(__assign({}, baseApiSchemaConfig), {
      name: 'quickSaveItemApi',
      label: tipedLabel(i18n("ce7d31d64f2315e1d4cede288b9dfc60"), i18n("152e8c553fe6fbc51df7c72a45917107"))
    }))] : []), false).filter(Boolean);
  };
  ApiDSBuilder.prototype.makeFieldsSettingForm = function (options) {
    var _this = this;
    var _a = options || {},
      feat = _a.feat,
      inScaffold = _a.inScaffold,
      renderer = _a.renderer,
      fieldSettings = _a.fieldSettings;
    var renderLabel = (fieldSettings || {}).renderLabel;
    if (!feat || !inScaffold || ['Import', 'Export', 'FuzzyQuery', 'Delete', 'BulkDelete'].includes(feat)) {
      return [];
    }
    var result = [{
      type: 'ae-field-setting',
      name: this.getFieldsKey(options),
      label: renderLabel === false ? false : i18n("9caecd931b956381e0763d05aa42835c"),
      renderer: renderer,
      feat: feat,
      fieldKeys: this.features.map(function (f) {
        return _this.getFieldsKey({
          feat: f
        });
      }),
      config: {
        showInputType: renderer === 'form' || renderer === 'crud' && ['Edit', 'BulkEdit', 'Insert', 'View', 'SimpleQuery', 'List'].includes(feat),
        showDisplayType: renderer === 'crud' && ['List'].includes(feat)
      },
      onAutoGenerateFields: this.autoGenerateFields.bind(this)
    }];
    return result;
  };
  /** 基于接口生成字段 */
  ApiDSBuilder.prototype.autoGenerateFields = function (_a) {
    var _b, _c, _d, _e, _f;
    var api = _a.api,
      props = _a.props;
      _a.setState;
    return __awaiter(this, void 0, void 0, function () {
      var manager, env, ctx, feat, schemaFilter, result, fields, sampleRow, items;
      return __generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            manager = props.manager, env = props.env, ctx = props.data, feat = props.feat;
            schemaFilter = (_b = manager === null || manager === void 0 ? void 0 : manager.store) === null || _b === void 0 ? void 0 : _b.schemaFilter;
            if (schemaFilter) {
              api = schemaFilter({
                api: api
              }).api;
            }
            return [4 /*yield*/, env === null || env === void 0 ? void 0 : env.fetcher(api, ctx)];
          case 1:
            result = _g.sent();
            if (!result.ok) {
              toast.warning((_d = (_c = result.defaultMsg) !== null && _c !== void 0 ? _c : result.msg) !== null && _d !== void 0 ? _d : i18n("91aa2166ee4811414381c8d94e6567e6"));
              return [2 /*return*/];
            }

            fields = [];
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
            return [2 /*return*/, fields];
        }
      });
    });
  };
  ApiDSBuilder.prototype.getApiKey = function (options) {
    var feat = (options || {}).feat;
    return feat ? "".concat(this.getFeatValueByKey(feat), "Api") : 'api';
  };
  ApiDSBuilder.prototype.getFieldsKey = function (options) {
    var feat = (options || {}).feat;
    return feat ? "".concat(this.getFeatValueByKey(feat), "Fields") : '';
  };
  ApiDSBuilder.prototype.buildBaseButtonSchema = function (options, schemaPatch) {
    var _a, _b;
    var feat = (options || {}).feat;
    var _c = schemaPatch || {},
      buttonSchema = _c.buttonSchema,
      formSchema = _c.formSchema,
      dialogSchema = _c.dialogSchema,
      componentId = _c.componentId;
    if (!feat) {
      return __assign({}, buttonSchema);
    }
    var labelMap = {
      Insert: i18n("66ab5e9f24c8f46012a25c89919fb191"),
      View: i18n("607e7a4f377fa66b0b28ce318aab841f"),
      Edit: i18n("95b351c86267f3aedf89520959bce689"),
      BulkEdit: i18n("e73cefac9d030927da1618c7b15c98c9"),
      Delete: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      BulkDelete: i18n("7fb62b30119c3797a843a48368463314")
    };
    var titleMap = {
      Insert: i18n("50abd0bf31e07dbee84e9e5b9a407840"),
      View: i18n("c00a96da01a3cf0445df3b0d05918317"),
      Edit: i18n("7695a3b5bfbcfdb3e7b085f8cd6455be"),
      BulkEdit: i18n("6f2f7e3794aa8502d02cb20aba881df1"),
      Delete: i18n("40f8f022c51542d282edda5b9ed4b512"),
      BulkDelete: i18n("c1c29e445748fa076c5fee45274bdd36")
    };
    var schema = __assign(__assign({
      type: 'button',
      label: (_a = labelMap[feat]) !== null && _a !== void 0 ? _a : i18n("fa966345577ba81af19408f203db968f")
    }, buttonSchema), {
      behavior: feat,
      onEvent: {
        click: {
          actions: [{
            actionType: 'dialog',
            dialog: __assign({
              body: __assign(__assign({}, formSchema), {
                onEvent: {
                  submitSucc: {
                    actions: [{
                      actionType: 'search',
                      groupType: 'component',
                      componentId: componentId
                    }]
                  }
                }
              }),
              title: (_b = titleMap[feat]) !== null && _b !== void 0 ? _b : i18n("6cff4b6d794cc17f5d24dbe0d21e5732"),
              size: 'md',
              actions: [{
                type: 'button',
                actionType: 'cancel',
                label: i18n("b15d91274e9fc68608c609999e0413fa")
              }]
            }, dialogSchema)
          }]
        }
      }
    });
    return schema;
  };
  /** 构建表单按钮操作区 */
  ApiDSBuilder.prototype.buildFormOperators = function (options, componentId) {
    var _a = options || {};
      _a.feat;
      var scaffoldConfig = _a.scaffoldConfig;
    var operators = (scaffoldConfig || {}).operators;
    var schema = sortBy(operators !== null && operators !== void 0 ? operators : Object.values(FormOperatorMap), ['order']).map(function (item) {
      return __assign({
        type: 'button',
        label: item.label,
        onEvent: {
          click: {
            actions: [{
              actionType: item.value,
              componentId: componentId
            }]
          }
        }
      }, item.schema);
    });
    return schema;
  };
  /**
   * 为输入类控件追加的初始化Schema配置，避免某些类型组件渲染报错
   */
  ApiDSBuilder.prototype.appendSchema2InputControl = function (inputType) {
    if (inputType === 'combo') {
      return {
        items: [{
          type: 'input-text',
          name: 'input-text',
          placeholder: i18n("97d07614380da93d257f9fbf81aa56fb")
        }]
      };
    } else {
      return {};
    }
  };
  ApiDSBuilder.prototype.buildBaseFormSchema = function (options, schemaPatch, componentId) {
    var _this = this;
    var _a;
    schemaPatch = schemaPatch || {};
    var _b = options || {},
      feat = _b.feat,
      renderer = _b.renderer,
      scaffoldConfig = _b.scaffoldConfig;
    if (!feat) {
      return __assign(__assign({}, schemaPatch), componentId ? {
        id: componentId
      } : {});
    }
    var fieldsKey = this.getFieldsKey(options);
    var apiKey = this.getApiKey(options);
    var fields = (_a = scaffoldConfig === null || scaffoldConfig === void 0 ? void 0 : scaffoldConfig[fieldsKey]) !== null && _a !== void 0 ? _a : [];
    var apiSchema = scaffoldConfig === null || scaffoldConfig === void 0 ? void 0 : scaffoldConfig[apiKey];
    var id = componentId !== null && componentId !== void 0 ? componentId : generateNodeId();
    var schema = __assign({
      id: id,
      type: 'form',
      title: i18n("eee1e2258d7ea163fec625ee44be9637"),
      mode: 'horizontal',
      dsType: this.key,
      feat: feat,
      body: fields.map(function (f) {
        var _a;
        var type = f.inputType ? (_a = displayType2inputType(f.inputType)) !== null && _a !== void 0 ? _a : 'input-text' : 'input-text';
        return __assign(__assign(__assign({}, pick(f, ['name', 'label'])), {
          type: type
        }), _this.appendSchema2InputControl(type));
      }),
      api: apiSchema
    }, renderer === 'form' ? {
      actions: this.buildFormOperators(options, id)
    } : {});
    if (['Insert', 'Edit', 'BulkEdit'].includes(feat)) {
      schema.resetAfterSubmit = true;
    }
    if (feat === 'View') {
      schema.static = true;
    }
    return __assign(__assign(__assign({}, schema), schemaPatch), {
      id: id
    });
  };
  ApiDSBuilder.prototype.buildInsertSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, renderer, scaffoldConfig, insertApi, formId, formActions, title, formSchema;
      return __generator(this, function (_b) {
        _a = options || {}, renderer = _a.renderer, scaffoldConfig = _a.scaffoldConfig;
        insertApi = (scaffoldConfig || {}).insertApi;
        if (renderer === 'form') {
          return [2 /*return*/, this.buildBaseFormSchema(__assign({}, options), undefined, componentId)];
        }
        formId = componentId !== null && componentId !== void 0 ? componentId : generateNodeId();
        formActions = [{
          type: 'button',
          actionType: 'cancel',
          label: i18n("625fb26b4b3340f7872b411f401e754c")
        }, {
          type: 'button',
          actionType: 'submit',
          label: i18n("939d5345ad4345dbaabe14798f6ac0f1"),
          level: 'primary'
        }];
        title = i18n("50abd0bf31e07dbee84e9e5b9a407840");
        formSchema = this.buildBaseFormSchema(__assign(__assign({}, options), {
          feat: DSFeatureEnum.Insert
        }), {
          id: formId,
          title: title,
          api: insertApi,
          actions: formActions
        });
        return [2 /*return*/, __assign({}, this.buildBaseButtonSchema(__assign(__assign({}, options), {
          feat: DSFeatureEnum.Insert
        }), {
          buttonSchema: {
            level: 'primary',
            className: 'm-r-xs'
          },
          dialogSchema: {
            title: title,
            actions: formActions
          },
          formSchema: formSchema,
          componentId: componentId
        }))];
      });
    });
  };
  ApiDSBuilder.prototype.buildViewSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, renderer, scaffoldConfig, viewApi, formActions, title, formSchema, buttonSchema;
      return __generator(this, function (_b) {
        _a = options || {}, renderer = _a.renderer, scaffoldConfig = _a.scaffoldConfig;
        viewApi = (scaffoldConfig || {}).viewApi;
        formActions = [{
          type: 'button',
          actionType: 'cancel',
          label: i18n("b15d91274e9fc68608c609999e0413fa")
        }];
        title = i18n("c00a96da01a3cf0445df3b0d05918317");
        formSchema = this.buildBaseFormSchema(__assign(__assign({}, options), {
          feat: DSFeatureEnum.View
        }), {
          title: title,
          initApi: viewApi,
          actions: formActions
        });
        if (renderer === 'crud') {
          buttonSchema = __assign({}, this.buildBaseButtonSchema(__assign(__assign({}, options), {
            feat: DSFeatureEnum.View
          }), {
            buttonSchema: {
              level: 'link'
            },
            dialogSchema: {
              title: title,
              actions: formActions
            },
            formSchema: formSchema,
            componentId: componentId
          }));
          return [2 /*return*/, buttonSchema];
        }
        return [2 /*return*/, formSchema];
      });
    });
  };
  ApiDSBuilder.prototype.buildEditSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, renderer, scaffoldConfig, isForm, _b, editApi, initApi, formId, formActions, title, formSchema;
      return __generator(this, function (_c) {
        _a = options || {}, renderer = _a.renderer, scaffoldConfig = _a.scaffoldConfig;
        isForm = renderer === 'form';
        if (isForm) {
          return [2 /*return*/, this.buildBaseFormSchema(options, undefined, componentId)];
        }
        _b = scaffoldConfig || {}, editApi = _b.editApi, initApi = _b.initApi;
        formId = generateNodeId();
        formActions = [{
          type: 'button',
          actionType: 'cancel',
          label: i18n("625fb26b4b3340f7872b411f401e754c")
        }, {
          type: 'button',
          actionType: 'submit',
          label: i18n("939d5345ad4345dbaabe14798f6ac0f1"),
          level: 'primary'
        }];
        title = i18n("7695a3b5bfbcfdb3e7b085f8cd6455be");
        formSchema = this.buildBaseFormSchema(__assign(__assign({}, options), {
          feat: DSFeatureEnum.Edit
        }), {
          id: formId,
          title: title,
          initApi: initApi,
          api: editApi,
          actions: formActions
        });
        return [2 /*return*/, __assign({}, this.buildBaseButtonSchema(__assign(__assign({}, options), {
          feat: DSFeatureEnum.Edit
        }), {
          buttonSchema: {
            level: 'link'
          },
          dialogSchema: {
            title: title,
            actions: formActions
          },
          formSchema: formSchema,
          componentId: componentId
        }))];
      });
    });
  };
  ApiDSBuilder.prototype.buildBulkEditSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var renderer, scaffoldConfig, bulkEditApi, isForm, formId, formActions, title, formSchema;
      return __generator(this, function (_a) {
        renderer = options.renderer, scaffoldConfig = options.scaffoldConfig;
        bulkEditApi = (scaffoldConfig || {}).bulkEditApi;
        isForm = renderer === 'form';
        if (isForm) {
          return [2 /*return*/, this.buildBaseFormSchema(options, undefined, componentId)];
        }
        formId = generateNodeId();
        formActions = [{
          type: 'button',
          actionType: 'cancel',
          label: i18n("625fb26b4b3340f7872b411f401e754c")
        }, {
          type: 'button',
          actionType: 'submit',
          label: i18n("939d5345ad4345dbaabe14798f6ac0f1"),
          level: 'primary'
        }];
        title = i18n("e73cefac9d030927da1618c7b15c98c9");
        formSchema = this.buildBaseFormSchema(__assign(__assign({}, options), {
          feat: DSFeatureEnum.BulkEdit
        }), {
          id: formId,
          title: title,
          api: bulkEditApi,
          actions: formActions
        });
        return [2 /*return*/, __assign({}, this.buildBaseButtonSchema(__assign(__assign({}, options), {
          feat: DSFeatureEnum.BulkEdit
        }), {
          buttonSchema: {
            className: 'm-r-xs',
            disabledOn: '${selectedItems != null && selectedItems.length < 1}'
          },
          dialogSchema: {
            title: title,
            actions: formActions
          },
          formSchema: formSchema,
          componentId: componentId
        }))];
      });
    });
  };
  ApiDSBuilder.prototype.buildCRUDDeleteSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var scaffoldConfig, deleteApi;
      return __generator(this, function (_a) {
        scaffoldConfig = (options || {}).scaffoldConfig;
        deleteApi = (scaffoldConfig || {}).deleteApi;
        return [2 /*return*/, {
          type: 'button',
          label: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
          behavior: 'Delete',
          className: 'm-r-xs text-danger',
          level: 'link',
          confirmText: i18n("ebf98d77b1a002935ad5c41446f257b3"),
          onEvent: {
            click: {
              actions: [{
                actionType: 'ajax',
                api: deleteApi,
                data: {
                  '&': '$$'
                }
              }, {
                actionType: 'search',
                groupType: 'component',
                componentId: componentId
              }]
            }
          }
        }];
      });
    });
  };
  ApiDSBuilder.prototype.buildCRUDBulkDeleteSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var scaffoldConfig, _a, bulkDeleteApi, _b, primaryField;
      return __generator(this, function (_c) {
        scaffoldConfig = (options || {}).scaffoldConfig;
        _a = scaffoldConfig || {}, bulkDeleteApi = _a.bulkDeleteApi, _b = _a.primaryField, primaryField = _b === void 0 ? 'id' : _b;
        return [2 /*return*/, {
          type: 'button',
          label: i18n("7fb62b30119c3797a843a48368463314"),
          behavior: 'BulkDelete',
          level: 'danger',
          className: 'm-r-xs',
          confirmText: i18n("d00d3377afe33a0f1b63293f3a3e3a79") + "\u300C${JOIN(ARRAYMAP(selectedItems, item => item.".concat(primaryField, "), ',')}\u300D"),
          disabledOn: '${selectedItems != null && selectedItems.length < 1}',
          onEvent: {
            click: {
              actions: [{
                actionType: 'ajax',
                api: bulkDeleteApi
              }, {
                actionType: 'search',
                groupType: 'component',
                componentId: componentId
              }]
            }
          }
        }];
      });
    });
  };
  ApiDSBuilder.prototype.buildSimpleQueryCollectionSchema = function (options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b, renderer, schema, simpleQueryFields, filter;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = options || {}, renderer = _b.renderer, schema = _b.schema;
            if (renderer !== 'crud') {
              return [2 /*return*/];
            }

            simpleQueryFields = ((_a = schema === null || schema === void 0 ? void 0 : schema.columns) !== null && _a !== void 0 ? _a : []).filter(function (item) {
              return item.type !== 'operation';
            }).map(function (item) {
              var _a, _b;
              var inputType = item.type ? (_a = displayType2inputType(item.type)) !== null && _a !== void 0 ? _a : 'input-text' : 'input-text';
              return {
                type: (_b = item.type) !== null && _b !== void 0 ? _b : 'input-text',
                inputType: inputType,
                name: item.name,
                label: item.title,
                size: 'full',
                required: false,
                behavior: 'SimpleQuery'
              };
            });
            return [4 /*yield*/, this.buildCRUDFilterSchema(__assign(__assign({}, options), {
              scaffoldConfig: {
                dsType: this.key,
                simpleQueryFields: simpleQueryFields
              }
            }), schema === null || schema === void 0 ? void 0 : schema.id)];
          case 1:
            filter = _c.sent();
            return [2 /*return*/, filter.body];
        }
      });
    });
  };
  ApiDSBuilder.prototype.buildCRUDFilterSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var scaffoldConfig, simpleQueryFields, fields, formSchema;
      var _this = this;
      return __generator(this, function (_a) {
        scaffoldConfig = (options || {}).scaffoldConfig;
        simpleQueryFields = (scaffoldConfig || {}).simpleQueryFields;
        fields = simpleQueryFields !== null && simpleQueryFields !== void 0 ? simpleQueryFields : [];
        formSchema = {
          type: 'form',
          title: i18n("0943d61befec4c6cf2d21d170c9b066e"),
          mode: 'inline',
          columnCount: 3,
          clearValueOnHidden: true,
          behavior: ['SimpleQuery'],
          body: fields.map(function (f) {
            var _a;
            var type = (_a = f.inputType) !== null && _a !== void 0 ? _a : 'input-text';
            return __assign(__assign(__assign({}, pick(f, ['name', 'label'])), {
              type: type,
              size: 'full',
              required: false,
              behavior: 'SimpleQuery'
            }), _this.appendSchema2InputControl(type));
          }),
          actions: [{
            type: 'reset',
            label: i18n("4b9c3271dc2f299dc3aeffb369187513")
          }, {
            type: 'submit',
            label: i18n("bee912d79eefb7335988c4997aa9138d"),
            level: 'primary'
          }]
        };
        return [2 /*return*/, formSchema];
      });
    });
  };
  ApiDSBuilder.prototype.buildCRUDOpColumn = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var feats, buttons, _a, _b, _c, _d, _e, _f;
      return __generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            feats = (options || {}).feats;
            buttons = [];
            if (!(feats === null || feats === void 0 ? void 0 : feats.includes('View'))) return [3 /*break*/, 2];
            _b = (_a = buttons).push;
            return [4 /*yield*/, this.buildViewSchema(options, componentId)];
          case 1:
            _b.apply(_a, [_g.sent()]);
            _g.label = 2;
          case 2:
            if (!(feats === null || feats === void 0 ? void 0 : feats.includes('Edit'))) return [3 /*break*/, 4];
            _d = (_c = buttons).push;
            return [4 /*yield*/, this.buildEditSchema(options, componentId)];
          case 3:
            _d.apply(_c, [_g.sent()]);
            _g.label = 4;
          case 4:
            if (!(feats === null || feats === void 0 ? void 0 : feats.includes('Delete'))) return [3 /*break*/, 6];
            _f = (_e = buttons).push;
            return [4 /*yield*/, this.buildCRUDDeleteSchema(options, componentId)];
          case 5:
            _f.apply(_e, [_g.sent()]);
            _g.label = 6;
          case 6:
            return [2 /*return*/, {
              type: 'operation',
              title: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
              buttons: buttons
            }];
        }
      });
    });
  };
  ApiDSBuilder.prototype.buildCRUDColumn = function (field, options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, {
          type: field.displayType,
          title: field.label,
          name: field.name
          /** 绑定列值, 似乎不需要 */
          // [f.typeKey || 'value']: `\${f.key}`
        }];
      });
    });
  };

  ApiDSBuilder.prototype.buildCRUDColumnsSchema = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var scaffoldConfig, listFields, fields, opColumn, columns;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            scaffoldConfig = options.scaffoldConfig;
            listFields = (scaffoldConfig || {}).listFields;
            fields = listFields !== null && listFields !== void 0 ? listFields : [];
            return [4 /*yield*/, this.buildCRUDOpColumn(options, componentId)];
          case 1:
            opColumn = _a.sent();
            return [4 /*yield*/, Promise.all(fields.map(function (f) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  return [2 /*return*/, this.buildCRUDColumn(f, options, componentId)];
                });
              });
            }))];
          case 2:
            columns = _a.sent().filter(Boolean);
            return [2 /*return*/, __spreadArray(__spreadArray([], __read(columns), false), __read(opColumn.buttons.length !== 0 ? [opColumn] : []), false)];
        }
      });
    });
  };
  ApiDSBuilder.prototype.buildToolbarContainer = function (align, body, behaviors) {
    if (body === void 0) {
      body = [];
    }
    body = Array.isArray(body) ? body : [body];
    return __assign(__assign({
      type: 'container',
      align: align
    }, behaviors ? {
      behavior: behaviors
    } : {}), {
      body: Array.isArray(body) ? body : [body],
      wrapperBody: false,
      style: __assign({
        flexGrow: 1,
        flex: '1 1 auto',
        position: 'static',
        display: 'flex',
        flexBasis: 'auto',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'stretch'
      }, align ? {
        justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
      } : {})
    });
  };
  ApiDSBuilder.prototype.buildToolbarFlex = function (position, left, right) {
    return [{
      type: 'flex',
      direction: 'row',
      justify: 'flex-start',
      alignItems: 'stretch',
      style: {
        position: 'static'
      },
      items: [this.buildToolbarContainer('left', left, position === 'header' ? [DSFeatureEnum.Insert, DSFeatureEnum.BulkEdit, DSFeatureEnum.BulkDelete] : undefined), this.buildToolbarContainer('right', right, position === 'header' ? [DSFeatureEnum.FuzzyQuery] : undefined)].filter(Boolean)
    }];
  };
  ApiDSBuilder.prototype.buildHeaderToolbar = function (options, componentId) {
    return __awaiter(this, void 0, void 0, function () {
      var feats, collection, _a, _b, _c, _d, _e, _f;
      return __generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            feats = (options || {}).feats;
            collection = [];
            if (!(feats === null || feats === void 0 ? void 0 : feats.includes('Insert'))) return [3 /*break*/, 2];
            _b = (_a = collection).push;
            return [4 /*yield*/, this.buildInsertSchema(options, componentId)];
          case 1:
            _b.apply(_a, [_g.sent()]);
            _g.label = 2;
          case 2:
            if (!(feats === null || feats === void 0 ? void 0 : feats.includes('BulkEdit'))) return [3 /*break*/, 4];
            _d = (_c = collection).push;
            return [4 /*yield*/, this.buildBulkEditSchema(options, componentId)];
          case 3:
            _d.apply(_c, [_g.sent()]);
            _g.label = 4;
          case 4:
            if (!(feats === null || feats === void 0 ? void 0 : feats.includes('BulkDelete'))) return [3 /*break*/, 6];
            _f = (_e = collection).push;
            return [4 /*yield*/, this.buildCRUDBulkDeleteSchema(options, componentId)];
          case 5:
            _f.apply(_e, [_g.sent()]);
            _g.label = 6;
          case 6:
            return [2 /*return*/, this.buildToolbarFlex('header', collection, [])];
        }
      });
    });
  };
  ApiDSBuilder.prototype.buildFooterToolbar = function (options, componentId) {
    return this.buildToolbarFlex('footer', [], [{
      type: 'pagination',
      behavior: 'Pagination',
      layout: ['total', 'perPage', 'pager'],
      perPage: 10,
      perPageAvailable: [10, 20, 50, 100],
      align: 'right'
    }]);
  };
  ApiDSBuilder.prototype.guessFormScaffoldConfig = function (options) {
    var _a, _b;
    var _c, _d;
    var schema = (options || {}).schema;
    var dsType = this.key;
    if (!schema.dsType || schema.dsType !== dsType) {
      return {
        dsType: dsType
      };
    }
    var feat = (_c = schema === null || schema === void 0 ? void 0 : schema.feat) !== null && _c !== void 0 ? _c : 'Insert';
    /** 表单操作 */
    var operators = ((_d = schema.actions) !== null && _d !== void 0 ? _d : []).map(function (item) {
      var opValue = get(item, 'onEvent.click.actions[0].actionType');
      if (typeof opValue === 'string' && opValue && ['submit', 'reset', 'cancel'].includes(opValue)) {
        return FormOperatorMap[opValue];
      }
      return undefined;
    }).filter(Boolean);
    var featValue = this.getFeatValueByKey(feat);
    var fieldKey = featValue ? "".concat(featValue, "Fields") : '';
    var apiKey = featValue ? "".concat(featValue, "Api") : '';
    var fields = (Array.isArray(schema === null || schema === void 0 ? void 0 : schema.body) ? schema.body : [schema.body]).map(function (item) {
      if (!item) {
        return false;
      }
      return {
        name: item.name,
        label: item.label,
        displayType: 'tpl' /** 对于form这个属性没用 */,
        inputType: item.type
      };
    }).filter(function (f) {
      return f != null;
    });
    var config = __assign(__assign(__assign(__assign({
      feat: feat,
      dsType: dsType
    }, fieldKey ? (_a = {}, _a[fieldKey] = fields, _a) : {}), apiKey ? (_b = {}, _b[apiKey] = JSONPipeOut(schema === null || schema === void 0 ? void 0 : schema.api), _b) : {}), feat === 'Edit' || schema.initApi != null ? {
      initApi: JSONPipeOut(schema === null || schema === void 0 ? void 0 : schema.initApi)
    } : {}), {
      operators: operators.length < 1 ? [FormOperatorMap['cancel'], FormOperatorMap['submit']] : operators,
      __pristineSchema: omit(JSONPipeOut(schema), __spreadArray([], __read(Object.values(DSFeature).map(function (item) {
        return "".concat(item.value, "Fields");
      })), false))
    });
    return config;
  };
  ApiDSBuilder.prototype.guessCRUDScaffoldConfig = function (options) {
    var _a;
    var schema = (options || {}).schema;
    var dsType = this.key;
    if (!schema.dsType || schema.dsType !== dsType) {
      return {
        dsType: dsType,
        primaryField: 'id'
      };
    }
    var listFields = (Array.isArray(schema === null || schema === void 0 ? void 0 : schema.columns) ? schema.columns : [schema.columns]).filter(function (item) {
      return item.type !== 'operation';
    }).map(function (item) {
      if (!item) {
        return;
      }
      return {
        name: item.name,
        label: item.title,
        displayType: item.type,
        inputType: 'input-text' /** 对于CRUD这个属性没用 */
      };
    }).filter(function (f) {
      return f != null;
    });
    var viewFields = [];
    var viewApi;
    var insertFields = [];
    var insertApi;
    var editFields = [];
    var editApi;
    var bulkEditFields = [];
    var bulkEditApi;
    var simpleQueryFields = [];
    var bulkDeleteApi;
    var deleteApi;
    /** 已开启特性 */
    var feats = [];
    var collectFormFields = function (body) {
      return body.map(function (item) {
        var _a;
        return __assign(__assign({}, pick(item, ['name', 'label'])), {
          inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
          displayType: 'tpl'
        });
      });
    };
    traverseSchemaDeep(schema, function (key, value, host) {
      var _a, _b, _c, _d, _e;
      if (key === 'feat') {
        if (value === 'Insert') {
          feats.push('Insert');
          insertFields = collectFormFields((_a = host === null || host === void 0 ? void 0 : host.body) !== null && _a !== void 0 ? _a : []);
          insertApi = host === null || host === void 0 ? void 0 : host.api;
        } else if (value === 'Edit') {
          feats.push('Edit');
          editFields = collectFormFields((_b = host === null || host === void 0 ? void 0 : host.body) !== null && _b !== void 0 ? _b : []);
          editApi = host === null || host === void 0 ? void 0 : host.api;
        } else if (value === 'BulkEdit') {
          feats.push('BulkEdit');
          bulkEditFields = collectFormFields((_c = host === null || host === void 0 ? void 0 : host.body) !== null && _c !== void 0 ? _c : []);
          bulkEditApi = host === null || host === void 0 ? void 0 : host.api;
        } else if (value === 'View') {
          feats.push('View');
          viewFields = collectFormFields((_d = host === null || host === void 0 ? void 0 : host.body) !== null && _d !== void 0 ? _d : []);
          viewApi = host === null || host === void 0 ? void 0 : host.initApi;
        }
      }
      if (key === 'behavior') {
        if (value === 'BulkDelete') {
          feats.push('BulkDelete');
          var actions = get(host, 'onEvent.click.actions', []);
          var actionSchema = actions.find(function (action) {
            var _a;
            return (action === null || action === void 0 ? void 0 : action.actionType) === 'ajax' && ((action === null || action === void 0 ? void 0 : action.api) != null || ((_a = action === null || action === void 0 ? void 0 : action.args) === null || _a === void 0 ? void 0 : _a.api) != null);
          });
          bulkDeleteApi = get(actionSchema, 'api', '') || get(actionSchema, 'args.api', '');
        } else if (value === 'Delete') {
          feats.push('Delete');
          var actions = get(host, 'onEvent.click.actions', []);
          var actionSchema = actions.find(function (action) {
            var _a;
            return (action === null || action === void 0 ? void 0 : action.actionType) === 'ajax' && ((action === null || action === void 0 ? void 0 : action.api) != null || ((_a = action === null || action === void 0 ? void 0 : action.args) === null || _a === void 0 ? void 0 : _a.api) != null);
          });
          deleteApi = get(actionSchema, 'api', '') || get(actionSchema, 'args.api', '');
        } else if (Array.isArray(value) && value.includes('SimpleQuery')) {
          feats.push('SimpleQuery');
          simpleQueryFields = ((_e = host === null || host === void 0 ? void 0 : host.body) !== null && _e !== void 0 ? _e : []).map(function (item) {
            var _a;
            return __assign(__assign({}, pick(item, ['name', 'label'])), {
              inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
              isplayType: 'tpl'
            });
          });
        }
      }
      return [key, value];
    });
    var finalFeats = uniq(feats);
    var config = {
      dsType: dsType,
      tools: intersection(finalFeats, [DSFeatureEnum.Insert, DSFeatureEnum.BulkDelete, DSFeatureEnum.BulkEdit]),
      /** 数据操作 */
      operators: intersection(finalFeats, [DSFeatureEnum.View, DSFeatureEnum.Edit, DSFeatureEnum.Delete]),
      /** 条件查询 */
      filters: intersection(finalFeats, [DSFeatureEnum.FuzzyQuery, DSFeatureEnum.SimpleQuery, DSFeatureEnum.AdvancedQuery]),
      listFields: listFields,
      listApi: JSONPipeOut(schema === null || schema === void 0 ? void 0 : schema.api),
      viewFields: viewFields,
      viewApi: JSONPipeOut(viewApi),
      insertFields: insertFields,
      insertApi: JSONPipeOut(insertApi),
      editFields: editFields,
      editApi: JSONPipeOut(editApi),
      bulkEditFields: bulkEditFields,
      bulkEditApi: JSONPipeOut(bulkEditApi),
      deleteApi: JSONPipeOut(deleteApi),
      bulkDeleteApi: JSONPipeOut(bulkDeleteApi),
      simpleQueryFields: simpleQueryFields,
      primaryField: (_a = schema === null || schema === void 0 ? void 0 : schema.primaryField) !== null && _a !== void 0 ? _a : 'id',
      __pristineSchema: omit(JSONPipeOut(schema), __spreadArray([], __read(Object.values(DSFeature).map(function (item) {
        return "".concat(item.value, "Fields");
      })), false))
    };
    return config;
  };
  ApiDSBuilder.prototype.buildCRUDSchema = function (options) {
    return __awaiter(this, void 0, void 0, function () {
      var feats, scaffoldConfig, _a, _b, primaryField, listApi, editApi, bulkEditApi, enableBulkEdit, enableBulkDelete, enableEdit, enableMultiple, id, _c, _d, _e;
      var _f, _g;
      return __generator(this, function (_h) {
        switch (_h.label) {
          case 0:
            feats = options.feats, scaffoldConfig = options.scaffoldConfig;
            _a = scaffoldConfig || {}, _b = _a.primaryField, primaryField = _b === void 0 ? 'id' : _b, listApi = _a.listApi, editApi = _a.editApi, bulkEditApi = _a.bulkEditApi;
            enableBulkEdit = feats === null || feats === void 0 ? void 0 : feats.includes('BulkEdit');
            enableBulkDelete = feats === null || feats === void 0 ? void 0 : feats.includes('BulkDelete');
            enableEdit = feats === null || feats === void 0 ? void 0 : feats.includes('Edit');
            enableMultiple = enableBulkEdit || enableBulkDelete;
            id = generateNodeId();
            _c = [__assign(__assign(__assign(__assign({
              id: id,
              type: 'crud2',
              mode: 'table2',
              dsType: this.key,
              syncLocation: true
            }, enableMultiple ? {
              selectable: true,
              multiple: true
            } : {}), {
              primaryField: primaryField,
              loadType: 'pagination',
              api: listApi
            }), enableBulkEdit ? {
              quickSaveApi: bulkEditApi
            } : {}), enableEdit ? {
              quickSaveItemApi: editApi
            } : {})];
            if (!(feats === null || feats === void 0 ? void 0 : feats.includes(DSFeatureEnum.SimpleQuery))) return [3 /*break*/, 2];
            _f = {};
            return [4 /*yield*/, this.buildCRUDFilterSchema(options, id)];
          case 1:
            _d = (_f.filter = _h.sent(), _f);
            return [3 /*break*/, 3];
          case 2:
            _d = {};
            _h.label = 3;
          case 3:
            _e = [__assign.apply(void 0, _c.concat([_d]))];
            _g = {};
            return [4 /*yield*/, this.buildHeaderToolbar(options, id)];
          case 4:
            _g.headerToolbar = _h.sent(), _g.footerToolbar = this.buildFooterToolbar(options, id);
            return [4 /*yield*/, this.buildCRUDColumnsSchema(options, id)];
          case 5:
            /** 暂时不考虑 cards 和 list */
            return [2 /*return*/, __assign.apply(void 0, _e.concat([(_g.columns = _h.sent(), _g)]))];
        }
      });
    });
  };
  ApiDSBuilder.prototype.buildFormSchema = function (options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var feat, scaffoldConfig, _b, initApi, __pristineSchema, formSchema, id, baseSchema;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            feat = options.feat, scaffoldConfig = options.scaffoldConfig;
            _b = scaffoldConfig || {}, initApi = _b.initApi, __pristineSchema = _b.__pristineSchema;
            id = (_a = __pristineSchema === null || __pristineSchema === void 0 ? void 0 : __pristineSchema.id) !== null && _a !== void 0 ? _a : generateNodeId();
            if (!(feat === 'Insert')) return [3 /*break*/, 2];
            return [4 /*yield*/, this.buildInsertSchema(options, id)];
          case 1:
            formSchema = _c.sent();
            return [3 /*break*/, 6];
          case 2:
            if (!(feat === 'Edit')) return [3 /*break*/, 4];
            return [4 /*yield*/, this.buildEditSchema(options, id)];
          case 3:
            formSchema = _c.sent();
            return [3 /*break*/, 6];
          case 4:
            return [4 /*yield*/, this.buildBulkEditSchema(options, id)];
          case 5:
            formSchema = _c.sent();
            _c.label = 6;
          case 6:
            baseSchema = __assign(__assign(__assign({}, formSchema), feat === 'Edit' ? {
              initApi: initApi
            } : {}), {
              dsType: this.key
            });
            if (__pristineSchema && isObject(__pristineSchema)) {
              return [2 /*return*/, __assign(__assign(__assign({}, __pristineSchema), baseSchema), {
                id: id
              })];
            }
            return [2 /*return*/, baseSchema];
        }
      });
    });
  };
  ApiDSBuilder.prototype.buildApiSchema = function (options) {
    return __awaiter(this, void 0, void 0, function () {
      var schema;
      return __generator(this, function (_a) {
        schema = options.schema;
        return [2 /*return*/, schema];
      });
    });
  };
  ApiDSBuilder.key = 'api';
  return ApiDSBuilder;
}(DSBuilder);
registerDSBuilder(ApiDSBuilder);

export { ApiDSBuilder };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
