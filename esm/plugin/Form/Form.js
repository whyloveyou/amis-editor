/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign, __awaiter, __generator } from 'tslib';
import cx from 'classnames';
import flatten from 'lodash/flatten';
import cloneDeep from 'lodash/cloneDeep';
import { isObject } from 'amis-core';
import { getI18nEnabled, getSchemaTpl, tipedLabel, defaultValue, jsonToJsonSchema, JSONPipeOut, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { DSFeatureEnum, ModelDSBuilderKey, FormOperatorMap, ApiDSBuilderKey } from '../../builder/constants.js';
import 'lodash/isObjectLike';
import '../../builder/DSBuilder.js';
import { DSBuilderManager } from '../../builder/DSBuilderManager.js';
import '../../builder/ApiDSBuilder.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { FieldSetting } from '../../renderer/FieldSetting.js';
import { i18n } from 'i18n-runtime';

var FormPlugin = /** @class */function (_super) {
  __extends(FormPlugin, _super);
  function FormPlugin(manager) {
    var _this = _super.call(this, manager) || this;
    _this.name = i18n("eee1e2258d7ea163fec625ee44be9637");
    _this.panelTitle = i18n("eee1e2258d7ea163fec625ee44be9637");
    // 关联渲染器名字
    _this.rendererName = 'form';
    _this.isBaseComponent = true;
    _this.description = i18n("10b3d542748da2043f79395bfa2ab35f");
    _this.docLink = '/amis/zh-CN/components/form/index';
    _this.$schema = '/schemas/FormSchema.json';
    _this.tags = [i18n("73721e611daaafe5c34aa9f3f901d016")];
    _this.order = -900;
    _this.icon = 'fa fa-list-alt';
    _this.pluginIcon = 'form-plugin';
    _this.panelIcon = 'form-plugin';
    _this.panelJustify = true;
    _this.scaffold = {
      type: 'form',
      title: i18n("eee1e2258d7ea163fec625ee44be9637"),
      body: [{
        label: i18n("5ac57ce6df8c2a19668b7429aebd9f33"),
        type: 'input-text',
        name: 'text'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      panelClassName: 'Panel--default text-left m-b-none',
      mode: 'horizontal',
      body: [{
        label: i18n("97d07614380da93d257f9fbf81aa56fb"),
        name: 'a',
        type: 'input-text'
      }]
    };
    // 容器配置
    _this.regions = [{
      key: 'body',
      label: i18n("3673ed1983c1be059126e3715fc34922"),
      matchRegion: function (elem) {
        return !!(elem === null || elem === void 0 ? void 0 : elem.props.noValidate);
      },
      renderMethod: 'renderBody',
      preferTag: i18n("55b45c73ae417c4dead67905b1550e85")
    }, {
      label: i18n("e2b67a7f51c977887d2b3c2de2727509"),
      key: 'actions',
      preferTag: i18n("fa966345577ba81af19408f203db968f")
    }];
    // 事件定义
    _this.events = [{
      eventName: 'inited',
      eventLabel: i18n("f36616e35765ac3d5c9c7646e50a305d"),
      description: i18n("48c43999cf3908d9f5100a6d5f0b4404"),
      // 表单数据为表单变量
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              responseData: {
                type: 'object',
                title: i18n("aa6070a7f454f554fc1c7d8b1d2d935f")
              },
              responseStatus: {
                type: 'number',
                title: i18n("23d861e4b6635508eb877a50a9333a9b")
              },
              responseMsg: {
                type: 'string',
                title: i18n("a303669d47440ed05558efbf3d5d0592")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'change',
      eventLabel: i18n("b2a5322c8dbc0d8343315cafbd39b7ce"),
      description: i18n("d6fc04abf4889a864bea240d6b67963a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("1b5cf3e354142cc1cdd6f56b6afaba49")
          }
        }
      }]
    }, {
      eventName: 'formItemValidateSucc',
      eventLabel: i18n("7233c9cadee5096097673c9590eae9b8"),
      description: i18n("6611594c527756e23d4044f908fedfa9"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("1b5cf3e354142cc1cdd6f56b6afaba49")
          }
        }
      }]
    }, {
      eventName: 'formItemValidateError',
      eventLabel: i18n("e00a32d415785d5a5d43a593d26cbaa0"),
      description: i18n("d4c12cea41e1595329358edb365c5f5b"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("1b5cf3e354142cc1cdd6f56b6afaba49")
          }
        }
      }]
    }, {
      eventName: 'validateSucc',
      eventLabel: i18n("368f9bab722b255f1fdb669a89f0c594"),
      description: i18n("35e69ab84129d721229bc5b48afdedd2"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("1b5cf3e354142cc1cdd6f56b6afaba49")
          }
        }
      }]
    }, {
      eventName: 'validateError',
      eventLabel: i18n("641fc404690a43cb13e4666ce272974f"),
      description: i18n("5d7dfa5bf9bcd278f06fa37e482a2c35"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("1b5cf3e354142cc1cdd6f56b6afaba49")
          }
        }
      }]
    }, {
      eventName: 'submit',
      eventLabel: i18n("b1119174b1beedd2218e0b359ef14aec"),
      strongDesc: i18n("c6a65a86cd2bd74a6f72df0a7b81d3cb"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("1b5cf3e354142cc1cdd6f56b6afaba49")
          }
        }
      }]
    }, {
      eventName: 'submitSucc',
      eventLabel: i18n("23b62e9cbc868e024b80d2e3fad80ac7"),
      description: i18n("850c62f7b1ebfb4b89182ecd51202a7d"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              result: {
                type: 'object',
                title: i18n("88b2930823f9fd6706473805e9b11797")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'submitFail',
      eventLabel: i18n("f5d008dea7d2e953195a5588dea3c8e4"),
      description: i18n("86555672b37841b639311e7d49f0f593"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              error: {
                type: 'object',
                title: i18n("3e07258baf3c4389c1ffd4a98c20b8fe")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'asyncApiFinished',
      eventLabel: i18n("1b43b43e692a5b6b2f6ec1417791a550"),
      description: i18n("0de773dedbe5875ca4529e7d0ce9d2bf"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("85f1708454f409855d552f702ac27b19")
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionLabel: i18n("4e34003861eee3de1e0c9c1222249bbb"),
      actionType: 'submit',
      description: i18n("a360c5d4e723ad78a5e52eb1f5f3f2a2")
    }, {
      actionLabel: i18n("1b6f5cc49e71c90a5b85a796285e3135"),
      actionType: 'reset',
      description: i18n("35de8c264c2a87836ccbf302b4ee673f")
    }, {
      actionLabel: i18n("4a3deab45c0a7218b8ae58a33fd24c28"),
      actionType: 'clear',
      description: i18n("c18255cd6a048da86045c59a65fdc92d")
    }, {
      actionLabel: i18n("17f2bf425eeb7d20d79c595344e9dc94"),
      actionType: 'validate',
      description: i18n("27f35bc7086bf54e27e254f5d77c3168")
    }, {
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      actionType: 'reload',
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      actionType: 'setValue',
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.Features = [{
      label: i18n("66ab5e9f24c8f46012a25c89919fb191"),
      value: DSFeatureEnum.Insert
    }, {
      label: i18n("95b351c86267f3aedf89520959bce689"),
      value: DSFeatureEnum.Edit
    }, {
      label: i18n("e73cefac9d030927da1618c7b15c98c9"),
      value: DSFeatureEnum.BulkEdit,
      disabled: true
    }, {
      label: i18n("607e7a4f377fa66b0b28ce318aab841f"),
      value: DSFeatureEnum.View,
      disabled: true
    }];
    _this._dynamicControls = {};
    _this.panelBodyCreator = function (context) {
      var _a, _b, _c, _d, _e, _f;
      _this.dynamicControls;
      _this.dsManager.getBuilderBySchema(context.schema);
      /** 是否为CRUD的过滤器表单 */
      var isCRUDFilter = /\/crud\/filter\/form$/.test(context.path) || /\/crud2\/filter\/\d\/form$/.test(context.path) || /\/crud2\/filter\/form$/.test(context.path) || /body\/0\/filter$/.test(context.schemaPath);
      /** 表单是否位于Dialog内 */
      var isInDialog = (_b = (_a = context.path) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, 'dialog/');
      /** 是否使用Panel包裹 */
      var isWrapped = 'this.wrapWithPanel !== false';
      var justifyLayout = function (left) {
        if (left === void 0) {
          left = 2;
        }
        return {
          mode: 'horizontal',
          horizontal: {
            left: left,
            justify: true
          }
        };
      };
      getI18nEnabled();
      var schema = (_d = (_c = context === null || context === void 0 ? void 0 : context.node) === null || _c === void 0 ? void 0 : _c.schema) !== null && _d !== void 0 ? _d : context === null || context === void 0 ? void 0 : context.schema;
      /** 是否是模型表单 */
      var isModelForm = ((typeof (schema === null || schema === void 0 ? void 0 : schema.api) === 'string' ? schema.api : typeof ((_e = schema === null || schema === void 0 ? void 0 : schema.api) === null || _e === void 0 ? void 0 : _e.url) === 'string' ? schema.api.url : '').startsWith('model://') || (typeof (schema === null || schema === void 0 ? void 0 : schema.initApi) === 'string' ? schema.initApi : typeof ((_f = schema === null || schema === void 0 ? void 0 : schema.initApi) === null || _f === void 0 ? void 0 : _f.url) === 'string' ? schema.initApi.url : '').startsWith('model://')) && !schema.api.strategy;
      /** 数据源控件 */
      var generateDSControls = function () {
        var dsTypeSelector = _this.dsManager.getDSSelectorSchema({
          type: 'select',
          label: i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
          onChange: function (value, oldValue, model, form) {
            if (value !== oldValue) {
              var data = form.data;
              Object.keys(data).forEach(function (key) {
                if (/^(insert|edit|bulkEdit)Fields$/i.test(key) || /^(insert|edit|bulkEdit)Api$/i.test(key)) {
                  form.deleteValueByName(key);
                }
              });
              form.deleteValueByName('__fields');
              form.deleteValueByName('__relations');
              form.deleteValueByName('initApi');
              form.deleteValueByName('api');
            }
            return value;
          }
        }, {
          schema: context === null || context === void 0 ? void 0 : context.schema,
          sourceKey: 'api',
          getDefautlValue: function (key, builder) {
            var schema = context === null || context === void 0 ? void 0 : context.schema;
            var dsType = schema === null || schema === void 0 ? void 0 : schema.dsType;
            // TODO: api和initApi可能是混合模式的场景
            if (builder.match(schema, 'api') || builder.match(schema, 'initApi')) {
              dsType = key;
            }
            return dsType;
          }
        });
        /** 默认数据源类型 */
        var defaultDsType = dsTypeSelector.value;
        /** 数据源配置 */
        var dsSettings = flatten(_this.Features.map(function (feat) {
          return _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey, index) {
            return {
              type: 'container',
              className: 'form-item-gap',
              visibleOn: "data.feat === '".concat(feat.value, "' && (data.dsType == null ? '").concat(builderKey, "' === '").concat(defaultDsType || ApiDSBuilderKey, "' : data.dsType === '").concat(builderKey, "')"),
              body: flatten([builder.makeSourceSettingForm({
                feat: feat.value,
                renderer: 'form',
                inScaffold: false,
                sourceSettings: {
                  renderLabel: true,
                  userOrders: false
                }
              })])
            };
          });
        }));
        return __spreadArray([dsTypeSelector], __read(dsSettings), false);
      };
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [isCRUDFilter || isModelForm ? null : {
          title: i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
          body: __spreadArray([{
            type: 'select',
            name: 'feat',
            label: i18n("7efcb0ce09e8842951c5cfd298b4e7ee"),
            options: _this.Features,
            pipeIn: function (value, formStore) {
              var _a;
              var feat = value;
              if (!value) {
                feat = ((_a = formStore === null || formStore === void 0 ? void 0 : formStore.data) === null || _a === void 0 ? void 0 : _a.initApi) != null ? DSFeatureEnum.Edit : DSFeatureEnum.Insert;
              }
              /** 存量数据可能未设置过feat, 需要在数据域中 set 一下 */
              formStore.setValueByName('feat', feat);
              return feat;
            },
            onChange: function (value, oldValue, model, form) {
              if (value !== oldValue) {
                form.setValues({
                  dsType: _this.dsManager.getDefaultBuilderKey(),
                  initApi: DSFeatureEnum.Insert === value || DSFeatureEnum.BulkEdit === value ? undefined : '',
                  api: undefined
                });
              }
            }
          }], __read(generateDSControls()), false)
        }, {
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            name: 'title',
            type: 'input-text',
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            visibleOn: isWrapped
          }, getSchemaTpl('switch', {
            name: 'autoFocus',
            label: tipedLabel(i18n("cbef9ad64297efd7657d5b67b2112751"), i18n("ded8caee55c05aa0f1a4e6a197c480bd"))
          }), {
            type: 'ae-switch-more',
            mode: 'normal',
            name: 'persistData',
            label: tipedLabel(i18n("cd8b367599d0c748e74029da8c10d295"), i18n("8a0544ca2f7ddaf8768ab599858315a6")),
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [getSchemaTpl('switch', {
                name: 'clearPersistDataAfterSubmit',
                label: tipedLabel(i18n("09a94b2400f7f05fbf2fc37a20b097d0"), i18n("bc01ee1a28f980c298679610fe4d2d66")),
                pipeIn: defaultValue(false),
                visibleOn: 'data.persistData'
              })]
            }
          }, getSchemaTpl('switch', {
            name: 'canAccessSuperData',
            label: tipedLabel(i18n("69445b3c5ddb606c7d51fd941e4aae10"), i18n("86f056f1cd4e25d5bd2bebddc971032b")),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('loadingConfig', {
            label: i18n("5a4e41af91746f8a3905aa9f66048955")
          }, {
            context: context
          })]
        }, {
          title: i18n("5cd08fe4cd86fffe7cd23d934d4d3b32"),
          body: [__assign({
            name: 'submitText',
            type: 'input-text',
            label: tipedLabel(i18n("60ad7d0d170b973ab9cdb0b23e636704"), i18n("e59e1cb3f366d6e7012fe64748355b0a")),
            pipeIn: defaultValue(i18n("939d5345ad4345dbaabe14798f6ac0f1")),
            visibleOn: "".concat(isWrapped, " && !this.actions && (!Array.isArray(this.body) || !this.body.some(function(item) {return !!~['submit','button','reset','button-group'].indexOf(item.type);}))")
          }, justifyLayout(4)), getSchemaTpl('switch', {
            name: 'submitOnChange',
            label: tipedLabel(i18n("171f7b825707ddd79175fed3f8def6cd"), i18n("6ccb7091c39a5229f7e77eff4dd44a0e"))
          }), getSchemaTpl('switch', {
            name: 'resetAfterSubmit',
            label: tipedLabel(i18n("d3458f4ee2c2203bb51f9d138dfd0c05"), i18n("e89bb79f0a0cb4fa4693c4a5ace130f4"))
          }), getSchemaTpl('switch', {
            name: 'preventEnterSubmit',
            label: tipedLabel(i18n("59c1b37b7ff983385a2521541cbcccf8"), i18n("794020840d754ea7fb58ea3bf4394e1a"))
          }),
          // isCRUDFilter
          //   ? null
          //   : getSchemaTpl('switch', {
          //       name: 'submitOnInit',
          //       label: tipedLabel(
          //         '初始化后提交一次',
          //         '开启后，表单初始完成便会触发一次提交'
          //       )
          //     }),
          isInDialog ? getSchemaTpl('switch', {
            label: i18n("87a6f142d80987db2e31569e403619f7"),
            name: 'closeDialogOnSubmit',
            pipeIn: function (value) {
              return value !== false;
            }
          }) : null
          // isCRUDFilter
          //   ? null
          //   : {
          //       label: tipedLabel(
          //         '提交其他组件',
          //         '可以通过设置此属性，把当前表单的值提交给目标组件，而不是自己来通过接口保存，请填写目标组件的 <code>name</code> 属性，多个组件请用逗号隔开。当 <code>target</code> 为 <code>window</code> 时，则把表单数据附属到地址栏。'
          //       ),
          //       name: 'target',
          //       type: 'input-text',
          //       placeholder: '请输入组件name',
          //       ...justifyLayout(4)
          //     },
          // getSchemaTpl('reload', {
          //   test: !isCRUDFilter
          // }),
          // isCRUDFilter
          //   ? null
          //   : {
          //       type: 'ae-switch-more',
          //       mode: 'normal',
          //       label: tipedLabel(
          //         '提交后跳转',
          //         '当设置此值后，表单提交完后跳转到目标地址'
          //       ),
          //       formType: 'extend',
          //       form: {
          //         mode: 'horizontal',
          //         horizontal: {
          //           justify: true,
          //           left: 4
          //         },
          //         body: [
          //           {
          //             label: '跳转地址',
          //             name: 'redirect',
          //             type: 'input-text',
          //             placeholder: '请输入目标地址'
          //           }
          //         ]
          //       }
          //     }
          ]
        }, {
          title: i18n("2e799a2e68a3303201d89752ae201a88"),
          body: [{
            name: 'rules',
            label: false,
            type: 'combo',
            multiple: true,
            multiLine: true,
            subFormMode: 'horizontal',
            placeholder: '',
            addBtn: {
              label: i18n("442781667396d6eff51113f482d89e54"),
              block: true,
              icon: 'fa fa-plus',
              className: cx('ae-Button--enhance')
            },
            items: [__assign({
              type: 'ae-formulaControl',
              name: 'rule',
              label: i18n("8101a0aec7eba32e633e3cc29f4b7ede")
            }, justifyLayout(4)), __assign({
              name: 'message',
              label: i18n("80ce5ea9ac2c3001e6e8ea3175ecc12d"),
              type: 'input-text'
            }, justifyLayout(4))]
          }]
        }, {
          title: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          body: [getSchemaTpl('disabled'), getSchemaTpl('visible'), getSchemaTpl('static')]
        }, {
          title: i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [getSchemaTpl('switch', {
            name: 'debug',
            label: tipedLabel(i18n("85ca671c1bb6de5a15456a9692d2edf4"), i18n("585293753528cd2f74501f41fc2e2c30"))
          })]
        }])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("5aefca559c5a41d10078e21e6d616825"),
          body: [getSchemaTpl('formItemMode', {
            isForm: true,
            /** Form组件默认为normal模式 */
            defaultValue: 'normal'
          }), getSchemaTpl('horizontal'), {
            name: 'labelAlign',
            label: i18n("86ed196f63524be7775e5a01b0152793"),
            type: 'button-group-select',
            size: 'sm',
            visibleOn: "${mode === 'horizontal'}",
            pipeIn: defaultValue('right', false),
            options: [{
              label: i18n("413f48cc71f71083ce532a86e3efdc21"),
              value: 'left'
            }, {
              label: i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
              value: 'right'
            }]
          }, {
            label: i18n("eb22d47f16f92e6f621c2b9d87119303"),
            name: 'columnCount',
            type: 'input-number',
            step: 1,
            min: 0,
            precision: 0,
            resetValue: '',
            unitOptions: [i18n("cb2f68c9c24e85d21e6b090b6e5657d8")],
            pipeOut: function (value) {
              if (value && typeof value === 'string') {
                var count = Number.parseInt(value === null || value === void 0 ? void 0 : value.replace(/\D+/g, ''), 10);
                return isNaN(count) ? undefined : count;
              } else if (value && typeof value === 'number') {
                return value;
              } else {
                return undefined;
              }
            }
          }]
        }, {
          title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
          body: [getSchemaTpl('switch', {
            name: 'wrapWithPanel',
            label: tipedLabel(i18n("6bde56d911167d0f47aae6bab762cd70"), i18n("1cb01363e2463443bc8105f544ce2736")),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('switch', {
            name: 'affixFooter',
            label: tipedLabel(i18n("019078f52f120a70fc23d94ccd364200"), i18n("f9e5a5377c1f56f1d09ae2bc58bd2d5b")),
            visibleOn: isWrapped
          })]
        }, /** */
        getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [getSchemaTpl('className', {
            name: 'panelClassName',
            label: 'Panel',
            visibleOn: isWrapped
          }), getSchemaTpl('className', {
            name: 'headerClassName',
            label: i18n("030c8cb75e9707285b28c4931bfeddc5"),
            visibleOn: isWrapped
          }), getSchemaTpl('className', {
            name: 'bodyClassName',
            label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
            visibleOn: isWrapped
          }), getSchemaTpl('className', {
            name: 'actionsClassName',
            label: i18n("e2b67a7f51c977887d2b3c2de2727509"),
            visibleOn: isWrapped
          })]
        })])
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }])];
    };
    /** 重新构建 API */
    _this.panelFormPipeOut = function (schema) {
      return __awaiter(_this, void 0, void 0, function () {
        var entity, builder, updatedSchema, e_1;
        var _a, _b;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              entity = (_a = schema === null || schema === void 0 ? void 0 : schema.api) === null || _a === void 0 ? void 0 : _a.entity;
              if (!entity || (schema === null || schema === void 0 ? void 0 : schema.dsType) !== ModelDSBuilderKey) {
                return [2 /*return*/, schema];
              }
              builder = this.dsManager.getBuilderBySchema(schema);
              _c.label = 1;
            case 1:
              _c.trys.push([1, 3,, 4]);
              return [4 /*yield*/, builder.buildApiSchema({
                schema: schema,
                renderer: 'form',
                sourceKey: 'api',
                feat: (_b = schema.feat) !== null && _b !== void 0 ? _b : 'Insert'
              })];
            case 2:
              updatedSchema = _c.sent();
              return [2 /*return*/, updatedSchema];
            case 3:
              e_1 = _c.sent();
              console.error(e_1);
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/, schema];
          }
        });
      });
    };
    _this.dsManager = new DSBuilderManager(manager);
    return _this;
  }
  Object.defineProperty(FormPlugin.prototype, "scaffoldForm", {
    /** 表单脚手架 */
    get: function () {
      var _this = this;
      var features = this.Features.filter(function (f) {
        return !f.disabled;
      });
      return {
        title: i18n("4f2ef285e13e20f551f7111f535cde11"),
        mode: {
          mode: 'horizontal',
          horizontal: {
            leftFixed: 'sm'
          }
        },
        canRebuild: true,
        className: 'ae-Scaffold-Modal ae-Scaffold-Modal-content AMISCSSWrapper',
        body: __spreadArray(__spreadArray([{
          type: 'radios',
          name: 'feat',
          label: i18n("7efcb0ce09e8842951c5cfd298b4e7ee"),
          value: DSFeatureEnum.Insert,
          options: features,
          onChange: function (value, oldValue, model, form) {
            if (value !== oldValue) {
              var data = form.data;
              Object.keys(data).forEach(function (key) {
                if (/^(insert|edit|bulkEdit)Fields$/i.test(key) || /^(insert|edit|bulkEdit)Api$/i.test(key)) {
                  form.deleteValueByName(key);
                }
              });
              form.deleteValueByName('__fields');
              form.deleteValueByName('__relations');
              form.setValues({
                dsType: _this.dsManager.getDefaultBuilderKey(),
                initApi: DSFeatureEnum.Insert === value || DSFeatureEnum.BulkEdit === value ? undefined : ''
              });
            }
          }
        }, /** 数据源选择器 */
        this.dsManager.getDSSelectorSchema({
          onChange: function (value, oldValue, model, form) {
            if (value !== oldValue) {
              var data = form.data;
              Object.keys(data).forEach(function (key) {
                if (/^(insert|edit|bulkEdit)Fields$/i.test(key) || /^(insert|edit|bulkEdit)Api$/i.test(key)) {
                  form.deleteValueByName(key);
                }
              });
              form.deleteValueByName('__fields');
              form.deleteValueByName('__relations');
              form.setValues({
                initApi: DSFeatureEnum.Insert === value || DSFeatureEnum.BulkEdit === value ? undefined : ''
              });
            }
            return value;
          }
        })], __read(flatten(features.map(function (feat) {
          return _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
            return {
              type: 'container',
              className: 'form-item-gap',
              visibleOn: "data.feat === '".concat(feat.value, "' && (!data.dsType || data.dsType === '").concat(builderKey, "')"),
              body: flatten([builder.makeSourceSettingForm({
                feat: feat.value,
                renderer: 'form',
                inScaffold: true,
                sourceSettings: {
                  userOrders: false
                }
              }), builder.makeFieldsSettingForm({
                feat: feat.value,
                renderer: 'form',
                inScaffold: true
              })])
            };
          });
        }))), false), [{
          name: 'operators',
          label: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
          type: 'checkboxes',
          value: ['submit'],
          joinValues: false,
          extractValue: false,
          options: [FormOperatorMap['reset'], FormOperatorMap['submit'], FormOperatorMap['cancel']]
        }], false),
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
                  return [4 /*yield*/, builder.guessFormScaffoldConfig({
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
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  scaffold = cloneDeep(this.scaffold);
                  builder = this.dsManager.getBuilderByScaffoldSetting(config);
                  if (!builder) {
                    return [2 /*return*/, scaffold];
                  }
                  return [4 /*yield*/, builder.buildFormSchema({
                    feat: config.feat,
                    renderer: 'form',
                    inScaffold: true,
                    entitySource: config === null || config === void 0 ? void 0 : config.entitySource,
                    fallbackSchema: scaffold,
                    scaffoldConfig: config
                  })];
                case 1:
                  schema = _a.sent();
                  /** 脚手架构建的 Schema 加个标识符，避免addChild替换 Schema ID */
                  schema.__origin = 'scaffold';
                  return [2 /*return*/, schema];
              }
            });
          });
        },
        validate: function (data, form) {
          var feat = data.feat;
          var builder = _this.dsManager.getBuilderByScaffoldSetting(data);
          var featValue = builder === null || builder === void 0 ? void 0 : builder.getFeatValueByKey(feat !== null && feat !== void 0 ? feat : DSFeatureEnum.Insert);
          var fieldsKey = "".concat(featValue, "Fields");
          var errors = {};
          if ((data === null || data === void 0 ? void 0 : data.dsType) === ModelDSBuilderKey) {
            return errors;
          }
          // if (!form.data[apiKey]) {
          //   errors[apiKey] = '请输入接口信息';
          // }
          // if (feat === 'Edit' && !form.data?.initApi) {
          //   errors['initApi'] = '请输入初始化接口信息';
          // }
          var fieldErrors = FieldSetting.validator(form.data[fieldsKey]);
          if (fieldErrors) {
            errors[fieldsKey] = fieldErrors;
          }
          return errors;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FormPlugin.prototype, "dynamicControls", {
    get: function () {
      return this._dynamicControls;
    },
    set: function (controls) {
      if (!controls || !isObject(controls)) {
        throw new Error(i18n("b4f035fa6f9faaa78707b72c352c6a8b"));
      }
      this._dynamicControls = __assign(__assign({}, this._dynamicControls), controls);
    },
    enumerable: false,
    configurable: true
  });
  FormPlugin.prototype.afterUpdate = function (event) {
    var _a;
    var context = event.context;
    if (context.info.renderer.name === 'form' && ((_a = context.diff) === null || _a === void 0 ? void 0 : _a.some(function (change) {
      var _a;
      return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'wrapWithPanel';
    }))) {
      this.manager.buildPanels();
    }
  };
  FormPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
      var jsonschema, pool, current, schema, _d, _e;
      return __generator(this, function (_f) {
        switch (_f.label) {
          case 0:
            jsonschema = __assign({}, jsonToJsonSchema(JSONPipeOut(node.schema.data)));
            pool = node.children.concat();
            _f.label = 1;
          case 1:
            if (!pool.length) return [3 /*break*/, 5];
            current = pool.shift();
            schema = current.schema;
            if (!(((_a = current.rendererConfig) === null || _a === void 0 ? void 0 : _a.isFormItem) && schema.name)) return [3 /*break*/, 3];
            _d = jsonschema.properties;
            _e = schema.name;
            return [4 /*yield*/, (_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, region, trigger, node)];
          case 2:
            _d[_e] = _f.sent();
            return [3 /*break*/, 4];
          case 3:
            pool.push.apply(pool, __spreadArray([], __read(current.children), false));
            _f.label = 4;
          case 4:
            return [3 /*break*/, 1];
          case 5:
            return [2 /*return*/, jsonschema];
        }
      });
    });
  };
  FormPlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'inited') {
      // 监听 form 的 inited 事件，把数据加入到上下文中
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = __assign({
        $id: 'formInitedData'
      }, jsonToJsonSchema(data.responseData));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  /**
   * 为了让 form 的按钮可以点击编辑
   */
  FormPlugin.prototype.patchSchema = function (schema, info, props) {
    if (Array.isArray(schema.actions) || schema.wrapWithPanel === false || Array.isArray(schema.body) && schema.body.some(function (item) {
      var _a, _b, _c;
      return item && !!~['submit', 'button', 'button-group', 'reset'].indexOf(((_b = (_a = item === null || item === void 0 ? void 0 : item.body) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) || ((_c = item === null || item === void 0 ? void 0 : item.body) === null || _c === void 0 ? void 0 : _c.type) || item.type);
    })) {
      return;
    }
    return __assign(__assign({}, schema), {
      actions: [{
        type: 'submit',
        label: (props === null || props === void 0 ? void 0 : props.translate(props === null || props === void 0 ? void 0 : props.submitText)) || schema.submitText || i18n("939d5345ad4345dbaabe14798f6ac0f1"),
        primary: true
      }]
    });
  };
  FormPlugin.prototype.getAvailableContextFields = function (scopeNode, target, region) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __awaiter(this, void 0, void 0, function () {
      var rendererInfo, specialRenderer, parentNode, builder;
      return __generator(this, function (_o) {
        rendererInfo = target.info.renderer;
        specialRenderer = ['user-select', 'department-select'];
        // 只有表单项组件可以使用表单组件的数据域
        if (rendererInfo.isFormItem || rendererInfo.type && specialRenderer.includes(rendererInfo.type) || ((_a = target.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.renderer.isFormItem)) {
          parentNode = scopeNode.parent;
          while (parentNode && (parentNode === null || parentNode === void 0 ? void 0 : parentNode.type) !== 'crud2') {
            parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parent;
          }
          if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.type) === 'crud2' && ((scopeNode === null || scopeNode === void 0 ? void 0 : scopeNode.type) === 'form' || /^body\/\d+\/filter/.test((_b = scopeNode.schemaPath) !== null && _b !== void 0 ? _b : ''))) {
            return [2 /*return*/, (_d = (_c = parentNode.info.plugin).getAvailableContextFields) === null || _d === void 0 ? void 0 : _d.call(_c, parentNode, target, region)];
          }
          if (((_e = scopeNode.parent) === null || _e === void 0 ? void 0 : _e.type) === 'service' && ((_h = (_g = (_f = scopeNode.parent) === null || _f === void 0 ? void 0 : _f.parent) === null || _g === void 0 ? void 0 : _g.path) === null || _h === void 0 ? void 0 : _h.endsWith('service'))) {
            return [2 /*return*/, (_k = (_j = scopeNode.parent.parent.info.plugin).getAvailableContextFields) === null || _k === void 0 ? void 0 : _k.call(_j, scopeNode.parent.parent, target, region)];
          }
          builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
          if (builder && scopeNode.schema.api) {
            return [2 /*return*/, builder.getAvailableContextFields({
              schema: scopeNode.schema,
              sourceKey: 'api',
              feat: (_m = (_l = scopeNode.schema) === null || _l === void 0 ? void 0 : _l.feat) !== null && _m !== void 0 ? _m : DSFeatureEnum.Insert
            }, target)];
          }
        }
        return [2 /*return*/];
      });
    });
  };

  FormPlugin.id = 'FormPlugin';
  return FormPlugin;
}(BasePlugin);
registerEditorPlugin(FormPlugin);

export { FormPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
