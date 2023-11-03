/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var flattenDeep = require('lodash/flattenDeep');
var amisEditorCore = require('amis-editor-core');
var DSBuilderManager = require('../builder/DSBuilderManager.js');
var constants = require('../builder/constants.js');
require('lodash/isObjectLike');
require('../builder/DSBuilder.js');
require('../builder/ApiDSBuilder.js');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var flattenDeep__default = /*#__PURE__*/_interopDefaultLegacy(flattenDeep);

var ServicePlugin = /** @class */function (_super) {
  tslib.__extends(ServicePlugin, _super);
  function ServicePlugin(manager) {
    var _this = _super.call(this, manager) || this;
    // 关联渲染器名字
    _this.rendererName = 'service';
    _this.name = i18nRuntime.i18n("985d97bfa88cbaed452ee5900ad26d45");
    _this.panelTitle = i18nRuntime.i18n("985d97bfa88cbaed452ee5900ad26d45");
    _this.icon = 'fa fa-server';
    _this.pluginIcon = 'service-plugin';
    _this.panelIcon = 'service-plugin';
    _this.$schema = '/schemas/ServiceSchema.json';
    _this.isBaseComponent = true;
    _this.order = -850;
    _this.description = i18nRuntime.i18n("9cc50da6bb17ea7ecf44c254c9b37619");
    _this.docLink = '/amis/zh-CN/components/service';
    _this.tags = [i18nRuntime.i18n("73721e611daaafe5c34aa9f3f901d016")];
    _this.scaffold = {
      type: 'service',
      /** region 区域的 placeholder 会撑开内容区 */
      body: []
    };
    _this.previewSchema = {
      type: 'service',
      body: [{
        type: 'tpl',
        tpl: i18nRuntime.i18n("33be689a0f0de129ce37f7a96052002e"),
        inline: false,
        className: 'bg-light wrapper'
      }]
    };
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      placeholder: amis.render({
        type: 'wrapper',
        size: 'lg',
        body: {
          type: 'tpl',
          tpl: i18nRuntime.i18n("33be689a0f0de129ce37f7a96052002e")
        }
      })
    }];
    _this.events = [{
      eventName: 'init',
      eventLabel: i18nRuntime.i18n("2cb472ff9cad0c89a033c53996b52053"),
      description: i18nRuntime.i18n("76ddcc0ad85aa4be6875b73244a64faf"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18nRuntime.i18n("85f1708454f409855d552f702ac27b19")
          }
        }
      }]
    }, {
      eventName: 'fetchInited',
      eventLabel: i18nRuntime.i18n("f36616e35765ac3d5c9c7646e50a305d"),
      description: i18nRuntime.i18n("48c43999cf3908d9f5100a6d5f0b4404"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              responseData: {
                type: 'object',
                title: i18nRuntime.i18n("aa6070a7f454f554fc1c7d8b1d2d935f")
              },
              responseStatus: {
                type: 'number',
                title: i18nRuntime.i18n("23d861e4b6635508eb877a50a9333a9b")
              },
              responseMsg: {
                type: 'string',
                title: i18nRuntime.i18n("a303669d47440ed05558efbf3d5d0592")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'fetchSchemaInited',
      eventLabel: i18nRuntime.i18n("a556b5535b6b0e5925d59bbc54b58946"),
      description: i18nRuntime.i18n("2cfbb19c3e801c5f4a11dafa1ec7884d"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              responseData: {
                type: 'object',
                title: i18nRuntime.i18n("aa6070a7f454f554fc1c7d8b1d2d935f")
              },
              responseStatus: {
                type: 'number',
                title: i18nRuntime.i18n("23d861e4b6635508eb877a50a9333a9b")
              },
              responseMsg: {
                type: 'string',
                title: i18nRuntime.i18n("a303669d47440ed05558efbf3d5d0592")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'rebuild',
      actionLabel: i18nRuntime.i18n("f885d4055567877facf0a3ff376a114e"),
      description: i18nRuntime.i18n("c8f0e77a9eb5de26e6ab62695d8494b6")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18nRuntime.i18n("8b10146a8a896b890b3796eefcc3c6d3")
    }];
    _this.panelBodyCreator = function (context) {
      var dsManager = _this.dsManager;
      /** 数据源控件 */
      var generateDSControls = function () {
        var dsTypeSelector = dsManager.getDSSelectorSchema({
          type: 'select',
          mode: 'horizontal',
          horizontal: {
            justify: true,
            left: 'col-sm-4'
          },
          onChange: function (value, oldValue, model, form) {
            if (value !== oldValue) {
              var data = form.data;
              Object.keys(data).forEach(function (key) {
                var _a;
                if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) || (key === null || key === void 0 ? void 0 : key.toLowerCase().endsWith('api'))) {
                  form.deleteValueByName(key);
                }
              });
              form.deleteValueByName('__fields');
              form.deleteValueByName('__relations');
              form.setValueByName('api', undefined);
            }
            return value;
          }
        }, {
          schema: context === null || context === void 0 ? void 0 : context.schema,
          sourceKey: 'api'
        });
        /** 默认数据源类型 */
        var defaultDsType = dsTypeSelector.value;
        var dsSettings = dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
          return {
            type: 'container',
            visibleOn: "data.dsType == null ? '".concat(builderKey, "' === '").concat(defaultDsType || constants.ApiDSBuilderKey, "' : data.dsType === '").concat(builderKey, "'"),
            body: flattenDeep__default["default"]([builder.makeSourceSettingForm({
              feat: 'View',
              renderer: 'service',
              inScaffold: false,
              sourceSettings: tslib.__assign(tslib.__assign({
                name: 'api',
                label: i18nRuntime.i18n("6f6f1e6feb9fa966acaddae627b73948"),
                mode: 'horizontal'
              }, builderKey === 'api' || builderKey === 'apicenter' ? {
                horizontalConfig: {
                  labelAlign: 'left',
                  horizontal: {
                    justify: true,
                    left: 4
                  }
                }
              } : {}), {
                useFieldManager: builderKey === constants.ModelDSBuilderKey
              })
            })])
          };
        });
        return tslib.__spreadArray([dsTypeSelector], tslib.__read(dsSettings), false);
      };
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: tslib.__spreadArray([amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          })], tslib.__read(generateDSControls()), false)
        }, {
          title: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          body: [amisEditorCore.getSchemaTpl('hidden')]
        }, {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('combo-container', {
            type: 'input-kv',
            mode: 'normal',
            name: 'data',
            label: i18nRuntime.i18n("ae76ff4dcb615d3b0232dcd10115e149")
          }), amisEditorCore.getSchemaTpl('apiControl', {
            name: 'schemaApi',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("270ac7e329c21eb9a5e4c342f202bbb4"), i18nRuntime.i18n("bfa178f875f63957378fc2d0bd8d0f59"))
          }), amisEditorCore.getSchemaTpl('initFetch', {
            name: 'initFetchSchema',
            label: i18nRuntime.i18n("dd22d42f40442605fbe0c5da03203ffb"),
            visibleOn: 'typeof this.schemaApi === "string" ? this.schemaApi : this.schemaApi && this.schemaApi.url'
          }), {
            name: 'ws',
            type: 'input-text',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("eb1d029d107422d00f55c8b76e66ec75"), i18nRuntime.i18n("470e0b39b2486883a10c1048f2df9f40"))
          }, {
            type: 'js-editor',
            allowFullscreen: true,
            name: 'dataProvider',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("7481babe858320dd6a4adcf307fd151d"), i18nRuntime.i18n("3bfc17446f0456f9692f25fc90383ec1")),
            placeholder: i18nRuntime.i18n("ec9b680403aab2f0498badb090f04364")
          }]
        }])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('className')]
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.panelFormPipeOut = function (schema) {
      return tslib.__awaiter(_this, void 0, void 0, function () {
        var entity, builder, updatedSchema, e_1;
        var _a;
        return tslib.__generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              entity = (_a = schema === null || schema === void 0 ? void 0 : schema.api) === null || _a === void 0 ? void 0 : _a.entity;
              if (!entity || (schema === null || schema === void 0 ? void 0 : schema.dsType) !== constants.ModelDSBuilderKey) {
                return [2 /*return*/, schema];
              }
              builder = this.dsManager.getBuilderBySchema(schema);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3,, 4]);
              return [4 /*yield*/, builder.buildApiSchema({
                schema: schema,
                renderer: 'service',
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
    _this.dsManager = new DSBuilderManager.DSBuilderManager(manager);
    return _this;
  }
  ServicePlugin.prototype.buildDataSchemas = function (node, region, trigger) {
    var _a, _b, _c, _d, _e;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var jsonschema, pool, current, schema, _f, _g;
      return tslib.__generator(this, function (_h) {
        switch (_h.label) {
          case 0:
            jsonschema = tslib.__assign({}, amisEditorCore.jsonToJsonSchema(amisEditorCore.JSONPipeOut((_a = node.schema.data) !== null && _a !== void 0 ? _a : {})));
            pool = node.children.concat();
            _h.label = 1;
          case 1:
            if (!pool.length) return [3 /*break*/, 5];
            current = pool.shift();
            schema = current.schema;
            if (!(((_b = current.rendererConfig) === null || _b === void 0 ? void 0 : _b.isFormItem) && (schema === null || schema === void 0 ? void 0 : schema.name))) return [3 /*break*/, 3];
            _f = jsonschema.properties;
            _g = schema.name;
            return [4 /*yield*/, (_d = (_c = current.info.plugin).buildDataSchemas) === null || _d === void 0 ? void 0 : _d.call(_c, current, undefined, trigger, node)];
          case 2:
            _f[_g] = _h.sent();
            return [3 /*break*/, 4];
          case 3:
            if (!((_e = current.rendererConfig) === null || _e === void 0 ? void 0 : _e.storeType)) {
              pool.push.apply(pool, tslib.__spreadArray([], tslib.__read(current.children), false));
            }
            _h.label = 4;
          case 4:
            return [3 /*break*/, 1];
          case 5:
            return [2 /*return*/, jsonschema];
        }
      });
    });
  };
  ServicePlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'fetchInited') {
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = tslib.__assign({
        $id: 'serviceFetchInitedData'
      }, amisEditorCore.jsonToJsonSchema(data.responseData));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  ServicePlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var builder;
      return tslib.__generator(this, function (_a) {
        builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
        if (builder && scopeNode.schema.api) {
          return [2 /*return*/, builder.getAvailableContextFields({
            schema: scopeNode.schema,
            sourceKey: 'api',
            feat: constants.DSFeatureEnum.List
          }, node)];
        }
        return [2 /*return*/];
      });
    });
  };

  ServicePlugin.id = 'ServicePlugin';
  return ServicePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ServicePlugin);

exports.ServicePlugin = ServicePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
