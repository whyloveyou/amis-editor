/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import isFunction from 'lodash/isFunction';
import flattenDeep from 'lodash/flattenDeep';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import { isObject, toast, autobind } from 'amis';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin } from 'amis-editor-core';
import { ModelDSBuilderKey, DSFeatureEnum, ApiDSBuilderKey } from '../../builder/constants.js';
import 'lodash/isObjectLike';
import '../../builder/DSBuilder.js';
import { DSBuilderManager } from '../../builder/DSBuilderManager.js';
import '../../builder/ApiDSBuilder.js';
import { getArgsWrapper, getEventControlConfig } from '../../renderer/event-control/helper.js';
import { deepRemove, findSchema } from './utils.js';
import { ToolsConfig, FiltersConfig, OperatorsConfig } from './constants.js';
import { i18n } from 'i18n-runtime';

/**
 * @file BaseCRUD
 * @desc CRUD2 配置面板的基类
 */
var BaseCRUDPlugin = /** @class */function (_super) {
  __extends(BaseCRUDPlugin, _super);
  function BaseCRUDPlugin(manager, events, actions) {
    var _this = _super.call(this, manager) || this;
    _this.rendererName = 'crud2';
    _this.name = i18n("83c9828692e1bb250a069bbf37807190");
    _this.panelTitle = i18n("83c9828692e1bb250a069bbf37807190");
    _this.subPanelTitle = i18n("83c9828692e1bb250a069bbf37807190");
    _this.icon = 'fa fa-table';
    _this.panelIcon = 'fa fa-table';
    _this.subPanelIcon = 'fa fa-table';
    _this.pluginIcon = 'table-plugin';
    _this.panelJustify = true;
    _this.multifactor = true;
    _this.order = -1000;
    _this.$schema = '/schemas/CRUD2Schema.json';
    _this.docLink = '/amis/zh-CN/components/crud2';
    _this.tags = [i18n("73721e611daaafe5c34aa9f3f901d016")];
    _this._dynamicControls = {
      /** 列配置 */
      columns: function (context) {
        return _this.renderColumnsControl(context);
      },
      /** 工具栏配置 */
      toolbar: function (context) {
        return _this.renderToolbarCollapse(context);
      },
      /** 搜索栏 */
      filters: function (context) {
        return _this.renderFiltersCollapse(context);
      },
      /** 主键 */
      primaryField: function (context) {
        return getSchemaTpl('primaryField');
      }
    };
    /** CRUD公共配置面板 */
    _this.baseCRUDPanelBody = function (context) {
      return getSchemaTpl('tabs', [_this.renderPropsTab(context), _this.renderStylesTab(context), _this.renderEventTab(context)]);
    };
    /** 重新构建 API */
    _this.panelFormPipeOut = function (schema) {
      return __awaiter(_this, void 0, void 0, function () {
        var entity, builder, updatedSchema, e_1;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              entity = (_a = schema === null || schema === void 0 ? void 0 : schema.api) === null || _a === void 0 ? void 0 : _a.entity;
              if (!entity || (schema === null || schema === void 0 ? void 0 : schema.dsType) !== ModelDSBuilderKey) {
                return [2 /*return*/, schema];
              }
              builder = this.dsManager.getBuilderBySchema(schema);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3,, 4]);
              return [4 /*yield*/, builder.buildApiSchema({
                schema: schema,
                renderer: 'crud',
                sourceKey: 'api'
              })];
            case 2:
              updatedSchema = _b.sent();
              return [2 /*return*/, updatedSchema];
            case 3:
              e_1 = _b.sent();
              console.error(e_1);
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/, schema];
          }
        });
      });
    };
    _this.emptyContainer = function (align, body) {
      if (body === void 0) {
        body = [];
      }
      return {
        type: 'container',
        body: body,
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
      };
    };
    _this.emptyFlex = function (items) {
      if (items === void 0) {
        items = [];
      }
      return {
        type: 'flex',
        items: items,
        style: {
          position: 'static'
        },
        direction: 'row',
        justify: 'flex-start',
        alignItems: 'stretch'
      };
    };
    /** 生成预览 Schema */
    _this.generatePreviewSchema = function (mode) {
      var columnSchema = [{
        label: 'Engine',
        name: 'engine'
      }, {
        label: 'Browser',
        name: 'browser'
      }, {
        name: 'version',
        label: 'Version'
      }];
      var actionSchema = {
        type: 'button',
        level: 'link',
        icon: 'fa fa-eye',
        actionType: 'dialog',
        dialog: {
          title: i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
          body: {
            type: 'form',
            body: [{
              label: 'Engine',
              name: 'engine',
              type: 'static'
            }, {
              name: 'browser',
              label: 'Browser',
              type: 'static'
            }, {
              name: 'version',
              label: 'Version',
              type: 'static'
            }]
          }
        }
      };
      var itemSchema = mode === 'cards' ? {
        card: {
          body: columnSchema,
          actions: actionSchema
        }
      } : mode === 'list' ? {
        listItem: {
          body: {
            type: 'hbox',
            columns: columnSchema
          }
        },
        actions: actionSchema
      } : {
        columns: columnSchema.concat([{
          name: 'operation',
          title: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
          buttons: [actionSchema]
        }])
      };
      return __assign({
        type: 'crud2',
        mode: mode,
        source: '$items',
        data: {
          items: [{
            engine: 'Trident',
            browser: 'Internet Explorer 4.0',
            platform: 'Win 95+',
            version: '4',
            grade: 'X'
          }]
        }
      }, itemSchema);
    };
    _this.dsManager = new DSBuilderManager(manager);
    _this.events = uniqBy(__spreadArray([], __read(events || []), false), 'eventName');
    _this.actions = uniqBy(__spreadArray([{
      actionType: 'search',
      actionLabel: i18n("cfd84204d9476936c949d071cc2338cf"),
      description: i18n("c6bd3393c21379d3f75d179abe36da3d"),
      descDetail: function (info) {
        return React__default.createElement("div", null, React__default.createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), i18n("3a6ecf25c38317b21b8c6287100f053a"));
      },
      schema: getArgsWrapper({
        name: 'query',
        label: i18n("cf12e55021998a8328201800ec356773"),
        type: 'ae-formulaControl',
        variables: '${variables}',
        size: 'md',
        mode: 'horizontal'
      })
    }, {
      actionType: 'loadMore',
      actionLabel: i18n("77281549955309c49f5eef77838a85e5"),
      description: i18n("b3a4d6a345372c5def1d5a1bf6077bce"),
      descDetail: function (info) {
        return React__default.createElement("div", null, React__default.createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), i18n("34e83e1be408c4f198464da1bf56bf9c"));
      }
    }, {
      actionType: 'startAutoRefresh',
      actionLabel: i18n("63ddcc28ac20f6cbd4197671ae7e628c"),
      description: i18n("63ddcc28ac20f6cbd4197671ae7e628c")
    }, {
      actionType: 'stopAutoRefresh',
      actionLabel: i18n("d6ba60b5bbf5df4cc2959dc897c2f792"),
      description: i18n("d6ba60b5bbf5df4cc2959dc897c2f792")
    }], __read(actions || []), false), 'actionType');
    return _this;
  }
  Object.defineProperty(BaseCRUDPlugin.prototype, "scaffoldForm", {
    get: function () {
      var _this = this;
      return {
        title: "".concat(this.name, "\u521B\u5EFA\u5411\u5BFC"),
        mode: {
          mode: 'horizontal',
          horizontal: {
            leftFixed: 'sm'
          }
        },
        className: 'ae-Scaffold-Modal ae-Scaffold-Modal--CRUD ae-Scaffold-Modal-content AMISCSSWrapper',
        stepsBody: true,
        canSkip: true,
        canRebuild: true,
        body: [{
          title: i18n("d75a7984d3fa5b32f5d8312e899aeea8"),
          body: __spreadArray(__spreadArray([/** 数据源选择 */
          this.dsManager.getDSSelectorSchema({
            onChange: function (value, oldValue, model, form) {
              if (value !== oldValue) {
                var data = form.data;
                Object.keys(data).forEach(function (key) {
                  var _a, _b;
                  if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) || ((_b = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _b === void 0 ? void 0 : _b.endsWith('api'))) {
                    form.deleteValueByName(key);
                  }
                });
                form.deleteValueByName('__fields');
                form.deleteValueByName('__relations');
              }
              return value;
            }
          })], __read(this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
            return {
              type: 'container',
              visibleOn: "!data.dsType || data.dsType === '".concat(builderKey, "'"),
              body: flattenDeep([builder.makeSourceSettingForm({
                feat: DSFeatureEnum.List,
                renderer: 'crud',
                inScaffold: true,
                sourceSettings: {
                  userOrders: true
                }
              }), builder.makeFieldsSettingForm({
                feat: DSFeatureEnum.List,
                renderer: 'crud',
                inScaffold: true
              })])
            };
          })), false), [getSchemaTpl('primaryField', {
            visibleOn: "!data.dsType || data.dsType !== '".concat(ModelDSBuilderKey, "'")
          })], false)
        }, {
          title: i18n("c2f1f9254c245976e346377515c2e578"),
          body: __spreadArray(__spreadArray([], __read(this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
            return {
              type: 'container',
              visibleOn: "dsType == null || dsType === '".concat(builderKey, "'"),
              body: [{
                type: 'checkboxes',
                label: i18n("012f602372cd2dbd639cd966c63e1f90"),
                name: ToolsConfig.groupName,
                joinValues: false,
                extractValue: true,
                multiple: true,
                options: ToolsConfig.options.filter(function (item) {
                  return builder.filterByFeat(item.value);
                })
              }, {
                type: 'checkboxes',
                label: i18n("0943d61befec4c6cf2d21d170c9b066e"),
                name: FiltersConfig.groupName,
                multiple: true,
                joinValues: false,
                extractValue: true,
                options: FiltersConfig.options.filter(function (item) {
                  return builder.filterByFeat(item.value);
                })
              }, {
                type: 'checkboxes',
                label: i18n("5246d2c81fa12b1f4f73635c257e232d"),
                name: OperatorsConfig.groupName,
                multiple: true,
                joinValues: false,
                extractValue: true,
                options: OperatorsConfig.options.filter(function (item) {
                  return builder.filterByFeat(item.value);
                })
              },
              // 占位，最后一个form item没有间距
              {
                type: 'container'
              }]
            };
          })), false), [/** 各场景字段设置 */
          {
            type: 'tabs',
            tabsMode: 'vertical',
            className: 'ae-Scaffold-Modal-tabs',
            tabs: this.getScaffoldFeatureTab()
          }], false)
        }],
        /** 用于重新构建的数据回填 */
        pipeIn: function (schema) {
          return __awaiter(_this, void 0, void 0, function () {
            var dsType, builder, config;
            var _a;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  dsType = (_a = schema === null || schema === void 0 ? void 0 : schema.dsType) !== null && _a !== void 0 ? _a : this.dsManager.getDefaultBuilderKey();
                  builder = this.dsManager.getBuilderByKey(dsType);
                  if (!builder) {
                    return [2 /*return*/, {
                      dsType: dsType
                    }];
                  }
                  return [4 /*yield*/, builder.guessCRUDScaffoldConfig({
                    schema: schema
                  })];
                case 1:
                  config = _b.sent();
                  return [2 /*return*/, __assign({}, config)];
              }
            });
          });
        },
        pipeOut: function (config) {
          return __awaiter(_this, void 0, void 0, function () {
            var scaffold, builder, schema;
            var _a, _b, _c;
            return __generator(this, function (_d) {
              switch (_d.label) {
                case 0:
                  scaffold = cloneDeep(this.scaffold);
                  builder = this.dsManager.getBuilderByScaffoldSetting(config);
                  if (!builder) {
                    return [2 /*return*/, scaffold];
                  }
                  return [4 /*yield*/, builder.buildCRUDSchema({
                    feats: uniq(__spreadArray(__spreadArray(__spreadArray([DSFeatureEnum.List], __read((_a = config.tools) !== null && _a !== void 0 ? _a : []), false), __read((_b = config.filters) !== null && _b !== void 0 ? _b : []), false), __read((_c = config.operators) !== null && _c !== void 0 ? _c : []), false).filter(Boolean)),
                    renderer: 'crud',
                    inScaffold: true,
                    entitySource: config === null || config === void 0 ? void 0 : config.entitySource,
                    fallbackSchema: scaffold,
                    scaffoldConfig: config
                  })];
                case 1:
                  schema = _d.sent();
                  /** 脚手架构建的 Schema 加个标识符，避免addChild替换 Schema ID */
                  schema.__origin = 'scaffold';
                  return [2 /*return*/, schema];
              }
            });
          });
        },
        validate: function (data, form) {
          var feat = DSFeatureEnum.List;
          var builder = _this.dsManager.getBuilderByScaffoldSetting(data);
          builder === null || builder === void 0 ? void 0 : builder.getFeatValueByKey(feat);
          var errors = {};
          if ((data === null || data === void 0 ? void 0 : data.dsType) === ModelDSBuilderKey || (builder === null || builder === void 0 ? void 0 : builder.key) === ModelDSBuilderKey) {
            return errors;
          }
          return errors;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  /** 各场景字段设置 Schema */
  BaseCRUDPlugin.prototype.getScaffoldFeatureTab = function () {
    var _this = this;
    var tabs = [];
    [{
      groupName: '',
      options: [{
        label: i18n("46a0f3086dce242abe54e48bd86e0394"),
        value: 'List',
        icon: 'fa fa-list'
      }]
    }, ToolsConfig, FiltersConfig, OperatorsConfig].forEach(function (group) {
      group.options.forEach(function (item, index) {
        _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
          if (!builder.features.includes(item.value)) {
            return null;
          }
          var tabContent = builderKey === ModelDSBuilderKey ? __spreadArray([], __read(builder.makeFieldsSettingForm({
            feat: item.value,
            renderer: 'crud',
            inScaffold: true
          })), false) : __spreadArray(__spreadArray([], __read(item.value === 'Edit' ? /** CRUD的编辑单条需要初始化接口 */builder.makeSourceSettingForm({
            feat: item.value,
            renderer: 'crud',
            inScaffold: true,
            sourceKey: 'initApi'
          }) : !['List', 'SimpleQuery'].includes(item.value) ? builder.makeSourceSettingForm({
            feat: item.value,
            renderer: 'crud',
            inScaffold: true
          }) : []), false), __read(builder.makeFieldsSettingForm({
            feat: item.value,
            renderer: 'crud',
            inScaffold: true,
            fieldSettings: {
              renderLabel: false
            }
          })), false);
          if (!tabContent || tabContent.length === 0) {
            return null;
          }
          var groupName = group.groupName;
          var extraVisibleOn = groupName ? "data[\"".concat(groupName, "\"] && ~data['").concat(groupName, "'].indexOf('").concat(item.value, "')") : true;
          tabs.push({
            title: item.label,
            icon: item.icon,
            visibleOn: "(!data.dsType || data.dsType === '".concat(builderKey, "') && ").concat(extraVisibleOn),
            body: tabContent.filter(Boolean).map(function (formItem) {
              return __assign(__assign({}, formItem), {
                mode: 'normal'
              });
            })
          });
          return;
        });
      });
    });
    return tabs;
  };
  Object.defineProperty(BaseCRUDPlugin.prototype, "dynamicControls", {
    /** 需要动态控制的控件 */
    get: function () {
      return this._dynamicControls;
    },
    set: function (controls) {
      if (!controls || !isObject(controls)) {
        throw new Error(i18n("16ea2200bfba281fdf5e6870498790cc"));
      }
      this._dynamicControls = __assign(__assign({}, this._dynamicControls), controls);
    },
    enumerable: false,
    configurable: true
  });
  /** 拆解一下 CURD 的基础面板配置，方便不同 mode 下模块化组合 */
  /** 属性面板 */
  BaseCRUDPlugin.prototype.renderPropsTab = function (context) {
    /** 动态加载的配置集合 */
    var dc = this.dynamicControls;
    return {
      title: i18n("24d67862f87f439db7ca957aecb77cce"),
      className: 'p-none',
      body: [getSchemaTpl('collapseGroup', [/** 基本配置类别 */
      this.renderBasicPropsCollapse(context), /** 列设置类别 */
      isFunction(dc.columns) ? dc.columns(context) : dc.columns, /** 搜索类别 */
      isFunction(dc.filters) ? dc.filters(context) : dc.filters, /** 工具栏类别 */
      isFunction(dc.toolbar) ? dc.toolbar(context) : dc.toolbar, /** 分页类别 */
      this.renderPaginationCollapse(context), /** 其他类别 */
      this.renderOthersCollapse(context), /** 状态类别 */
      {
        title: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
        body: [getSchemaTpl('hidden'), getSchemaTpl('visible')]
      }].filter(Boolean))]
    };
  };
  /** 基础配置 */
  BaseCRUDPlugin.prototype.renderBasicPropsCollapse = function (context) {
    var _this = this;
    var _a;
    /** 动态加载的配置集合 */
    var dc = this.dynamicControls;
    /** 数据源控件 */
    var generateDSControls = function () {
      /** 数据源类型 */
      var dsTypeSelector = _this.dsManager.getDSSelectorSchema({
        type: 'select',
        label: i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
        onChange: function (value, oldValue, model, form) {
          if (value !== oldValue) {
            var data = form.data;
            Object.keys(data).forEach(function (key) {
              var _a, _b;
              if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) || ((_b = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _b === void 0 ? void 0 : _b.endsWith('api'))) {
                form.deleteValueByName(key);
              }
            });
            form.deleteValueByName('__fields');
            form.deleteValueByName('__relations');
          }
          return value;
        }
      }, {
        schema: context === null || context === void 0 ? void 0 : context.schema,
        sourceKey: 'api'
      });
      /** 默认数据源类型 */
      var defaultDsType = dsTypeSelector.value;
      /** 数据源配置 */
      var dsSettings = _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
        return {
          type: 'container',
          visibleOn: "data.dsType == null ? '".concat(builderKey, "' === '").concat(defaultDsType || ApiDSBuilderKey, "' : data.dsType === '").concat(builderKey, "'"),
          body: builder.makeSourceSettingForm({
            feat: 'List',
            renderer: 'crud',
            inScaffold: false,
            sourceSettings: {
              userOrders: true
            }
          }),
          /** 因为会使用 container 包裹，所以加一个 margin-bottom */
          className: 'mb-3'
        };
      });
      return __spreadArray([dsTypeSelector], __read(dsSettings), false);
    };
    return {
      title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
      order: 1,
      body: __spreadArray(__spreadArray([], __read(generateDSControls()), false), [/** 主键配置，TODO：支持联合主键 */
      (_a = dc === null || dc === void 0 ? void 0 : dc.primaryField) === null || _a === void 0 ? void 0 : _a.call(dc, context), /** 可选择配置，这里的配置会覆盖底层 Table 的 rowSelection 中的配置 */
      getSchemaTpl('switch', {
        name: 'selectable',
        label: tipedLabel(i18n("240145572215920ae06db1eeb85b29c0"), i18n("d45a439fa6e82798bc1e98d738cedea3")),
        pipeIn: function (value, formStore) {
          var _a;
          if (typeof value === 'boolean') {
            return value;
          }
          var rowSelection = (_a = formStore === null || formStore === void 0 ? void 0 : formStore.data) === null || _a === void 0 ? void 0 : _a.rowSelection;
          return rowSelection && isObject(rowSelection);
        }
      }), {
        type: 'container',
        className: 'ae-ExtendMore mb-3',
        visibleOn: "data.selectable || (data.rowSelection && data.rowSelection?.type !== 'radio')",
        body: [getSchemaTpl('switch', {
          name: 'multiple',
          label: i18n("e3be7b8a459a08fec8f378a0660b642b"),
          pipeIn: function (value, formStore) {
            var _a;
            if (typeof value === 'boolean') {
              return value;
            }
            var rowSelection = (_a = formStore === null || formStore === void 0 ? void 0 : formStore.data) === null || _a === void 0 ? void 0 : _a.rowSelection;
            return rowSelection && isObject(rowSelection) ? rowSelection.type !== 'radio' : false;
          }
        })]
      }, {
        name: 'placeholder',
        pipeIn: defaultValue(i18n("21efd88b67a39834582ad99aabb9dc60")),
        type: 'input-text',
        label: i18n("8ce1cd75b6e9c0c0e3468589fcea822c")
      }, getSchemaTpl('switch', {
        name: 'syncLocation',
        label: tipedLabel(i18n("569343b4fe5e48131b78611c11eadbeb"), i18n("6dbee29a8c54eef9d042ef3280999ad9")),
        pipeIn: defaultValue(true)
      })], false)
    };
  };
  BaseCRUDPlugin.prototype.renderColumnsControl = function (context) {
    var builder = this.dsManager.getBuilderBySchema(context.node.schema);
    return {
      title: i18n("949a8b7bd2c10070a2fae16f9c66afbb"),
      order: 5,
      body: [{
        type: 'ae-crud-column-control',
        name: 'columns',
        nodeId: context.id,
        builder: builder
      }]
    };
  };
  BaseCRUDPlugin.prototype.renderToolbarCollapse = function (context) {
    var builder = this.dsManager.getBuilderBySchema(context.node.schema);
    return {
      order: 20,
      title: i18n("012f602372cd2dbd639cd966c63e1f90"),
      body: [{
        type: 'ae-crud-toolbar-control',
        name: 'headerToolbar',
        nodeId: context.id,
        builder: builder
      }]
    };
  };
  BaseCRUDPlugin.prototype.renderFiltersCollapse = function (context) {
    var builder = this.dsManager.getBuilderBySchema(context.node.schema);
    var collection = [];
    var order = [DSFeatureEnum.SimpleQuery, DSFeatureEnum.AdvancedQuery, DSFeatureEnum.FuzzyQuery];
    var sortedFeats = sortBy(builder.features, [function (feat) {
      return order.indexOf(feat);
    }]);
    sortedFeats.forEach(function (feat) {
      if (/Query$/.test(feat)) {
        collection.push({
          type: 'ae-crud-filters-control',
          name: feat === DSFeatureEnum.SimpleQuery || feat === DSFeatureEnum.AdvancedQuery ? 'filter' : feat === DSFeatureEnum.FuzzyQuery ? 'headerToolbar' : undefined,
          label: feat === DSFeatureEnum.SimpleQuery ? i18n("c26996a6506adf397f0668d376d0b40b") : feat === DSFeatureEnum.AdvancedQuery ? i18n("9c4666fd08c2738eb9611a3721cb5f0f") : i18n("6ff4bf3d567e977aa4c90c27dff1e6db"),
          nodeId: context.id,
          feat: feat,
          builder: builder
        });
      }
    });
    return collection.length > 0 ? {
      order: 10,
      title: i18n("4a3ebd0ef27212de3b0c39e6a9701b1d"),
      body: collection
    } : undefined;
  };
  /** 分页类别 */
  BaseCRUDPlugin.prototype.renderPaginationCollapse = function (context) {
    var _this = this;
    var isPagination = 'data.loadType === "pagination"';
    var isInfinity = 'data.loadType === "more"';
    return {
      order: 30,
      title: i18n("e821ce185e41eac2ab846ef5cfde2363"),
      body: [{
        label: i18n("4d7080ff1405a1f08c5415a0f942c336"),
        type: 'select',
        name: 'loadType',
        options: [{
          label: i18n("d81bb206a889656035b929cd8bb1ef10"),
          value: ''
        }, {
          label: i18n("3862626c138ce5945e0e273a1bdfbad0"),
          value: 'pagination'
        }, {
          label: i18n("77281549955309c49f5eef77838a85e5"),
          value: 'more'
        }],
        pipeIn: function (data) {
          return data || '';
        },
        pipeOut: function (data) {
          return data;
        },
        onChange: function (value, oldValue, model, form) {
          var schema = form.data;
          if (oldValue) {
            deepRemove(schema, function (item) {
              return oldValue === 'more' ? item.behavior === 'loadMore' : item.type === 'pagination';
            });
          }
          if (value) {
            // 新插入的默认放在 footerToolbar 中分栏 的第二栏的最后，没有位置的话向上缺省
            // oldValue && deepRemove(schema);
            var newCompSchema = value === 'pagination' ? {
              type: 'pagination',
              behavior: 'Pagination',
              layout: ['total', 'perPage', 'pager'],
              perPageAvailable: [10, 20, 50, 100]
            } : {
              type: 'button',
              behavior: 'loadMore',
              label: i18n("77281549955309c49f5eef77838a85e5"),
              onEvent: {
                click: {
                  actions: [{
                    componentId: schema.id,
                    groupType: 'component',
                    actionType: 'loadMore'
                  }],
                  weight: 0
                }
              }
            };
            _this.addFeatToToolbar(schema, newCompSchema, 'footer', 'right');
          }
        }
      }, getSchemaTpl('switch', {
        name: 'loadDataOnce',
        label: i18n("16b8ff2b147382be4cf8654f829df904"),
        visibleOn: isPagination
      }), getSchemaTpl('switch', {
        name: 'loadDataOnceFetchOnFilter',
        label: tipedLabel(i18n("290026b0b40b637e774c6af435b897b5"), i18n("67584675004a48be903e9f61c733cb35")),
        visibleOn: isPagination + ' && data.loadDataOnce'
      }), getSchemaTpl('switch', {
        name: 'keepItemSelectionOnPageChange',
        label: tipedLabel(i18n("099cf136d6a4b6ed4646af4a2ed066b2"), i18n("60011314ed92794f3d4f3e874c359279")),
        pipeIn: defaultValue(false),
        visibleOn: isPagination
      }), getSchemaTpl('switch', {
        name: 'autoJumpToTopOnPagerChange',
        label: tipedLabel(i18n("8cc3589c442c478dde8ceb60aeb29e03"), i18n("9092afb1ccb692308ef06d8001da2208")),
        pipeIn: defaultValue(true),
        visibleOn: isPagination
      }), {
        name: 'perPage',
        type: 'input-number',
        label: tipedLabel(i18n("606bc931d2b3ebba2569cb1494719e2c"), i18n("9cb14f1355b3a312ebd62ebff5e1e06b")),
        clearValueOnEmpty: true,
        clearable: true,
        pipeIn: defaultValue(10),
        visibleOn: isInfinity
      }, {
        type: 'button',
        label: i18n("f300691f823aacea572e63bb7fb7ce8a"),
        block: true,
        className: 'mb-1',
        level: 'enhance',
        visibleOn: 'data.loadType === "pagination"',
        onClick: function () {
          var _a, _b;
          var findPage = findSchema((_b = (_a = context === null || context === void 0 ? void 0 : context.node) === null || _a === void 0 ? void 0 : _a.schema) !== null && _b !== void 0 ? _b : {}, function (item) {
            return item.type === 'pagination' || item.behavior === 'Pagination';
          }, 'headerToolbar', 'footerToolbar');
          if (!findPage || !findPage.$$id) {
            toast.error(i18n("d81ad681a447abae7cba38779ffc0c9e"));
            return;
          }
          _this.manager.setActiveId(findPage.$$id);
        }
      }]
    };
  };
  /** 其他类别 */
  BaseCRUDPlugin.prototype.renderOthersCollapse = function (context) {
    return {
      order: 25,
      title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
      body: [{
        type: 'ae-switch-more',
        mode: 'normal',
        formType: 'extend',
        visibleOn: 'data.api',
        label: tipedLabel(i18n("86b17bba54b65c6a62895357095f63a3"), i18n("983a8ab6a97da0a0dec7b5c751cf02b1")),
        autoFocus: false,
        form: {
          body: [{
            type: 'input-number',
            name: 'interval',
            label: tipedLabel(i18n("4cbec5cb54ba399ea81381a75f5f1f93"), i18n("81fe75a5216d4f612f1809c122f5145a")),
            step: 10,
            min: 1000
          }, getSchemaTpl('tplFormulaControl', {
            name: 'stopAutoRefreshWhen',
            label: tipedLabel(i18n("3a5d9512f474ff7c2a017a13e7f8a9af"), i18n("fd649ca959662306b734f03438869bf0")),
            visibleOn: '!!data.interval'
          }), getSchemaTpl('switch', {
            name: 'stopAutoRefreshWhenModalIsOpen',
            label: tipedLabel(i18n("0516133b87f03f859e23bf014d71ab57"), i18n("52dce697d35795d7835e483d69f72419"))
          })]
        }
      }, getSchemaTpl('switch', {
        name: 'silentPolling',
        label: tipedLabel(i18n("6d5b1e5a235fa839c759d2362654d638"), i18n("8b34b22a4da1b9b855a5efd33434f5e7")),
        pipeIn: defaultValue(false)
      })]
    };
  };
  /** 外观面板 */
  BaseCRUDPlugin.prototype.renderStylesTab = function (context) {
    return {
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      className: 'p-none',
      body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:classNames', {
        isFormItem: false,
        schema: [getSchemaTpl('className', {
          name: 'bodyClassName',
          label: i18n("32aaf2f04e983290deceb0674fb0d159")
        }), getSchemaTpl('className', {
          name: 'headerToolbarClassName',
          label: i18n("e3e100dab1d8d13a2e3f9c391b0b108d")
        }), getSchemaTpl('className', {
          name: 'footerToolbarClassName',
          label: i18n("2aee96dd788b815f83b3d118188e7fd9")
        })]
      })])
    };
  };
  /** 事件面板 */
  BaseCRUDPlugin.prototype.renderEventTab = function (context) {
    return {
      title: i18n("10b2761db5a8e089049df39675abc550"),
      className: 'p-none',
      body: [getSchemaTpl('eventControl', __assign({
        name: 'onEvent'
      }, getEventControlConfig(this.manager, context)))]
    };
  };
  // headerToolbar 和 footerToolbar 布局换成 flex 包裹 container
  BaseCRUDPlugin.prototype.addFeatToToolbar = function (schema, content, position, align) {
    var region = "".concat(position, "Toolbar");
    if (!schema[region] || isEmpty(schema[region]) || !Array.isArray(schema[region])) {
      var isArr = Array.isArray(schema[region]);
      var newSchema = this.emptyFlex([this.emptyContainer('left', isArr || !schema[region] ? [] : [schema[region]]), this.emptyContainer('right')]);
      isArr && schema[region].push(newSchema) || (schema[region] = [newSchema]);
    }
    // 尝试放到左面第一个，否则只能放外头了
    try {
      // 优先判断没有右边列的情况，避免都走到catch里造成嵌套层数过多的问题
      if (align === 'right' && schema[region][0].items.length < 2) {
        schema[region][0].items.push(this.emptyContainer('right'));
      }
      schema[region][0].items[align === 'left' ? 0 : schema[region][0].items.length - 1].body.push(content);
    } catch (e) {
      var olds = __spreadArray([], __read(schema[region]), false);
      schema[region].length = 0;
      schema[region].push(this.emptyFlex([this.emptyContainer('left', olds), this.emptyContainer('right', content)]));
    }
  };
  BaseCRUDPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
      var child, childDataSchema, items, schema;
      return __generator(this, function (_f) {
        switch (_f.label) {
          case 0:
            child = node.children.find(function (item) {
              return !!~['table2', 'cards', 'list'].indexOf(item.type);
            });
            if (!((_b = (_a = child === null || child === void 0 ? void 0 : child.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) {
              return [2 /*return*/];
            }

            return [4 /*yield*/, child.info.plugin.buildDataSchemas(child, region)];
          case 1:
            childDataSchema = _f.sent();
            items = (_d = (_c = childDataSchema === null || childDataSchema === void 0 ? void 0 : childDataSchema.properties) === null || _c === void 0 ? void 0 : _c.rows) !== null && _d !== void 0 ? _d : (_e = childDataSchema === null || childDataSchema === void 0 ? void 0 : childDataSchema.properties) === null || _e === void 0 ? void 0 : _e.items;
            schema = {
              $id: 'crud2',
              type: 'object',
              properties: __assign(__assign({}, items === null || items === void 0 ? void 0 : items.properties), {
                items: __assign(__assign({}, items), {
                  title: i18n("fe9e25f4e4b3aeefeb9b7a9c368ede7e")
                }),
                selectedItems: __assign(__assign({}, items), {
                  title: i18n("2c77cfaef73ce2e81131861e9c6d670e")
                }),
                unSelectedItems: __assign(__assign({}, items), {
                  title: i18n("9c9153c49491c381dc2adb2c36fccb04")
                }),
                page: {
                  type: 'number',
                  title: i18n("9a4fe969f1066e197fd2369a44d879ac")
                },
                total: {
                  type: 'number',
                  title: i18n("a7f33a2d99056edcdaced5c8841a9bcb")
                }
              })
            };
            return [2 /*return*/, schema];
        }
      });
    });
  };
  BaseCRUDPlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
      var builder;
      return __generator(this, function (_c) {
        builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
        if (builder && scopeNode.schema.api) {
          return [2 /*return*/, builder.getAvailableContextFields({
            schema: scopeNode.schema,
            sourceKey: 'api',
            feat: (_b = (_a = scopeNode.schema) === null || _a === void 0 ? void 0 : _a.feat) !== null && _b !== void 0 ? _b : 'List'
          }, node)];
        }
        return [2 /*return*/];
      });
    });
  };

  BaseCRUDPlugin.prototype.generateScaffold = function (mode) {
    var schema;
    if (mode === 'table2') {
      schema = {
        type: 'crud2',
        mode: 'table2',
        columns: [{
          name: 'id',
          title: 'ID',
          type: 'container',
          body: [{
            type: 'text'
          }]
        }, {
          name: 'engine',
          title: i18n("1a63ac23010e0573f7c0a8cd3314b8c6"),
          type: 'container',
          body: [{
            type: 'text'
          }]
        }]
      };
    } else if (mode === 'cards') {
      schema = {
        type: 'crud2',
        mode: 'cards',
        card: {
          type: 'card2',
          body: [{
            type: 'container',
            body: [{
              type: 'tpl',
              tpl: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
              inline: false,
              style: {
                marginTop: '0',
                marginBottom: '0',
                paddingTop: '',
                paddingBottom: ''
              },
              wrapperComponent: 'h2'
            }, {
              type: 'form',
              body: [{
                type: 'static-tpl',
                label: i18n("9caecd931b956381e0763d05aa42835c"),
                tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014")
              }]
            }, {
              type: 'divider'
            }, {
              type: 'button-group'
            }
            // {
            //   type: 'tpl',
            //   tpl: '副标题内容',
            //   inline: false,
            //   wrapperComponent: '',
            //   style: {
            //     color: '#9b9b9b',
            //     marginTop: '0',
            //     marginBottom: '0'
            //   }
            // }
            ]
            // style: {
            //   borderStyle: 'solid',
            //   borderColor: '#ebebeb',
            //   borderWidth: '1px',
            //   'borderRadius': '5px',
            //   'paddingTop': '10px',
            //   'paddingRight': '10px',
            //   'paddingBottom': '0',
            //   'paddingLeft': '10px'
            // }
          }]
        }
      };
    } else if (mode === 'list') {
      schema = {
        type: 'crud2',
        mode: 'list',
        listItem: {
          body: [{
            type: 'container',
            body: [{
              type: 'tpl',
              tpl: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
              inline: false,
              style: {
                marginTop: '0',
                marginBottom: '0',
                paddingTop: '',
                paddingBottom: ''
              },
              wrapperComponent: 'h2'
            }, {
              type: 'tpl',
              tpl: i18n("629645f147f378869fe9d7ee2bbc2857"),
              inline: false,
              wrapperComponent: '',
              style: {
                color: '#9b9b9b',
                marginTop: '0',
                marginBottom: '0'
              }
            }]
          }]
        }
      };
    }
    return schema;
  };
  BaseCRUDPlugin.id = 'CRUD2Plugin';
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], BaseCRUDPlugin.prototype, "renderColumnsControl", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], BaseCRUDPlugin.prototype, "renderToolbarCollapse", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], BaseCRUDPlugin.prototype, "renderFiltersCollapse", null);
  return BaseCRUDPlugin;
}(BasePlugin);

export { BaseCRUDPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
