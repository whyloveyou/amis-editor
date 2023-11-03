/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var helper = require('../../renderer/event-control/helper.js');
var util = require('../../util.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var TabsTransferPlugin = /** @class */function (_super) {
  tslib.__extends(TabsTransferPlugin, _super);
  function TabsTransferPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'tabs-transfer';
    _this.$schema = '/schemas/TransferControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("617a63f1b19b5aad029f973479bac917");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-th-list';
    _this.pluginIcon = 'tabs-transfer-plugin';
    _this.description = i18nRuntime.i18n("4f26f1edebcdeea90f6e4247a501dbaf");
    _this.docLink = '/amis/zh-CN/components/form/transfer';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      label: i18nRuntime.i18n("617a63f1b19b5aad029f973479bac917"),
      type: 'tabs-transfer',
      name: 'tabsTransfer',
      selectMode: 'tree',
      options: [{
        label: i18nRuntime.i18n("ab5dea29793d933fa7b5487a7309df6a"),
        children: [{
          label: i18nRuntime.i18n("71f8043aefd52572b172e7d1fbd5af57"),
          value: 'fashi',
          children: [{
            label: i18nRuntime.i18n("fda93c79275b812a6c1c189fbebf8b08"),
            value: 'zhugeliang'
          }]
        }, {
          label: i18nRuntime.i18n("573cb0d34bd1cdc7b368c59db9b7bb7d"),
          value: 'zhanshi',
          children: [{
            label: i18nRuntime.i18n("e37a86d1a1dbed0cd53c95582977f075"),
            value: 'caocao'
          }, {
            label: i18nRuntime.i18n("ccddd2de691ff2d56b651877f72d90ed"),
            value: 'zhongwuyan'
          }]
        }, {
          label: i18nRuntime.i18n("c0db8e7b42528eeae96310c6629e53b3"),
          value: 'daye',
          children: [{
            label: i18nRuntime.i18n("293040fc607f40caf6d6e16042012182"),
            value: 'libai'
          }, {
            label: i18nRuntime.i18n("b5256ec780343c4e20e397b43cab96a9"),
            value: 'hanxin'
          }, {
            label: i18nRuntime.i18n("49dcf9f88e7b7b8ca7448631021d7d12"),
            value: 'yunzhongjun'
          }]
        }]
      }, {
        label: i18nRuntime.i18n("1fd02a90c38333badc226309fea6fecb"),
        children: [{
          label: i18nRuntime.i18n("71f8043aefd52572b172e7d1fbd5af57"),
          value: 'fashi2',
          children: [{
            label: i18nRuntime.i18n("fda93c79275b812a6c1c189fbebf8b08"),
            value: 'zhugeliang2'
          }]
        }, {
          label: i18nRuntime.i18n("573cb0d34bd1cdc7b368c59db9b7bb7d"),
          value: 'zhanshi2',
          children: [{
            label: i18nRuntime.i18n("e37a86d1a1dbed0cd53c95582977f075"),
            value: 'caocao2'
          }, {
            label: i18nRuntime.i18n("ccddd2de691ff2d56b651877f72d90ed"),
            value: 'zhongwuyan2'
          }]
        }, {
          label: i18nRuntime.i18n("c0db8e7b42528eeae96310c6629e53b3"),
          value: 'daye2',
          children: [{
            label: i18nRuntime.i18n("293040fc607f40caf6d6e16042012182"),
            value: 'libai2'
          }, {
            label: i18nRuntime.i18n("b5256ec780343c4e20e397b43cab96a9"),
            value: 'hanxin2'
          }, {
            label: i18nRuntime.i18n("49dcf9f88e7b7b8ca7448631021d7d12"),
            value: 'yunzhongjun2'
          }]
        }]
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18nRuntime.i18n("617a63f1b19b5aad029f973479bac917");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("2fc76872efce1eabd3b74a3e4fd5b976"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("e48d65cda774019d9a6677354bc781f2")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("b2a18e08b0b0e0fd7e80554b89244aa0")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'tab-change',
      eventLabel: i18nRuntime.i18n("e1112a529dc969a03bbbb409905ff2ec"),
      description: i18nRuntime.i18n("d202bc660c4d2eeb58e194b6320bd235"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              key: {
                type: 'string',
                title: i18nRuntime.i18n("c46f27dcf45a345993f1cbb63380fa98")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("91208131116f2823993daf99f15e1325")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("dda222620b789d07c2c5c279475caaf1")
    }, {
      actionType: 'changeTabKey',
      actionLabel: i18nRuntime.i18n("2ac24a383a1faae33f81772b757b2817"),
      description: i18nRuntime.i18n("91f894b900f593c848e5b21f2b414b05"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), i18nRuntime.i18n("2ac24a383a1faae33f81772b757b2817"));
      }
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelDefinitions = {
      options: {
        label: i18nRuntime.i18n("25ae4ca8d4b8a67b273066a97a516327"),
        name: 'options',
        type: 'combo',
        multiple: true,
        multiLine: true,
        draggable: true,
        mode: 'normal',
        addButtonText: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
        scaffold: {
          label: '',
          value: ''
        },
        items: [{
          type: 'group',
          body: [amisEditorCore.getSchemaTpl('label', {
            label: false,
            placeholder: i18nRuntime.i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
            required: true
          }), {
            type: 'input-text',
            name: 'value',
            placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
            unique: true
          }]
        }, {
          $ref: 'options',
          label: i18nRuntime.i18n("72453d792655604f1fab821146133d7d"),
          name: 'children',
          addButtonText: i18nRuntime.i18n("210da23d108e85b2f0bbfa85846cb792")
        }]
      }
    };
    // notRenderFormZone = true;
    _this.panelBodyCreator = function (context) {
      context.info.renderer;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), {
            label: i18nRuntime.i18n("b7fc7efe26efb867838223936b7fc467"),
            name: 'selectMode',
            type: 'select',
            value: 'tree',
            options: [{
              label: i18nRuntime.i18n("6541f1702af367c41a3127ed8511eb50"),
              value: 'list'
            }, {
              label: i18nRuntime.i18n("d58ba4b5e94680fcb08300e176502fb8"),
              value: 'table'
            }, {
              label: i18nRuntime.i18n("406573cea6af9b0c6462295108e1f5c0"),
              value: 'tree'
            }, {
              label: i18nRuntime.i18n("6c5358b981a475da2a83e95e4170647a"),
              value: 'chained'
            }]
          }, {
            label: i18nRuntime.i18n("84a76ba52297727f6bb47d8a1cc74094"),
            name: 'resultTitle',
            type: 'input-text',
            inputClassName: 'is-inline ',
            placeholder: i18nRuntime.i18n("505e204cdd98afd08c174d6dcec0dc09")
          }, amisEditorCore.getSchemaTpl('sortable'), amisEditorCore.getSchemaTpl('searchable', {
            onChange: function (value, origin, item, form) {
              if (!value) {
                form.setValues({
                  searchApi: undefined
                });
              }
            }
          }), amisEditorCore.getSchemaTpl('apiControl', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("791959f9b90734dce08da79f4ac27a41"), i18nRuntime.i18n("9b1ddba55066e0f329ca3cca2e58909c")),
            mode: 'normal',
            name: 'searchApi',
            visibleOn: '!!searchable'
          })]
        }, {
          title: i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [{
            $ref: 'options',
            name: 'options'
          }, amisEditorCore.getSchemaTpl('apiControl', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1395eba8d9efe27aa1ecd1a45e3e5dcd"), i18nRuntime.i18n("14079611c014884bbdffce4d0e5f4d73")),
            mode: 'normal',
            name: 'source'
          }), amisEditorCore.getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }), amisEditorCore.getSchemaTpl('joinValues'), amisEditorCore.getSchemaTpl('delimiter'), amisEditorCore.getSchemaTpl('extractValue')
          // getSchemaTpl('autoFillApi', {
          //   visibleOn:
          //     '!this.autoFill || this.autoFill.scene && this.autoFill.action'
          // })
          ]
        }, {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('virtualThreshold'), amisEditorCore.getSchemaTpl('virtualItemHeight')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  TabsTransferPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var type = util.resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
    // todo:异步数据case
    var dataSchema = {
      type: type,
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };

    if ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.extractValue) {
      dataSchema = {
        type: 'array',
        title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name)
      };
    } else if (((_j = node.schema) === null || _j === void 0 ? void 0 : _j.joinValues) === false) {
      dataSchema = {
        type: 'array',
        title: ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.label) || ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.name),
        items: {
          type: 'object',
          title: i18nRuntime.i18n("ab5dea29793d933fa7b5487a7309df6a"),
          properties: (_a = {}, _a[((_m = node.schema) === null || _m === void 0 ? void 0 : _m.labelField) || 'label'] = {
            type: 'string',
            title: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb")
          }, _a[((_o = node.schema) === null || _o === void 0 ? void 0 : _o.valueField) || 'value'] = {
            type: type,
            title: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d")
          }, _a)
        },
        originalValue: dataSchema.originalValue
      };
    }
    return dataSchema;
  };
  TabsTransferPlugin.id = 'TabsTransferPlugin';
  return TabsTransferPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TabsTransferPlugin);

exports.TabsTransferPlugin = TabsTransferPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
