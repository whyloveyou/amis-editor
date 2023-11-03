/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var validator = require('../../validator.js');
var helper = require('../../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var MatrixControlPlugin = /** @class */function (_super) {
  tslib.__extends(MatrixControlPlugin, _super);
  function MatrixControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'matrix-checkboxes';
    _this.$schema = '/schemas/MatrixControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("076a041dcf45a36b29c5cdb8b8eca922");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-th-large';
    _this.pluginIcon = 'matrix-checkboxes-plugin';
    _this.description = i18nRuntime.i18n("183aae5eec1ff547833dc338aaeffc9a");
    _this.docLink = '/amis/zh-CN/components/form/matrix-checkboxes';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'matrix-checkboxes',
      name: 'matrix',
      label: i18nRuntime.i18n("076a041dcf45a36b29c5cdb8b8eca922"),
      rowLabel: i18nRuntime.i18n("7583b85ff3579d60a9f9d323c2f6674a"),
      columns: [{
        label: i18nRuntime.i18n("3fc35bb610852289cf718f07a5b79369")
      }, {
        label: i18nRuntime.i18n("50987924540e6e35c78246031499e75b")
      }],
      rows: [{
        label: i18nRuntime.i18n("08a6996be7a86af5692cbca41922a5d1")
      }, {
        label: i18nRuntime.i18n("ce31d858c63395098c5e4cd892bd473b")
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("076a041dcf45a36b29c5cdb8b8eca922");
    _this.panelJustify = true;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("ee167d4c74e600248aefe9d0ba474705"),
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
      description: i18nRuntime.i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("770fe9e7899cd310b035ef50a39ab2ae")
    }, {
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('switch', {
            name: 'multiple',
            label: i18nRuntime.i18n("e3be7b8a459a08fec8f378a0660b642b")
          }), {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("f0789e79d48f135e5d870753f7a85d05"), i18nRuntime.i18n("e9b376d39966c8182683019f95ff8cf3")),
            name: 'singleSelectMode',
            type: 'button-group-select',
            size: 'sm',
            option: i18nRuntime.i18n("0f244785fd9f555aae9797db4d14fb09"),
            horizontal: {
              left: 2,
              justify: true
            },
            visibleOn: '!data.multiple',
            options: [{
              label: i18nRuntime.i18n("5a57bd526cc3170b6c86f920fc24cdee"),
              value: 'row'
            }, {
              label: i18nRuntime.i18n("0f244785fd9f555aae9797db4d14fb09"),
              value: 'column'
            }, {
              label: i18nRuntime.i18n("45dde5879e77d7f7a15d04b8fed26ec8"),
              value: 'cell'
            }],
            pipeIn: amisEditorCore.defaultValue('column')
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'yCheckAll',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("542241c52bd2efb24dc37b32cab2329c"), i18nRuntime.i18n("d94ec7663ac9ad2d09fca5c86928b434"))
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'xCheckAll',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("7020fa7949a5ae24cc8eb696772d97fc"), i18nRuntime.i18n("227c24282ff52f3f6f52dfdb853cc1ad"))
          }), amisEditorCore.getSchemaTpl('autoFillApi')]
        }, {
          title: i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [[amisEditorCore.getSchemaTpl('combo-container', {
            label: i18nRuntime.i18n("dc7558211f2990370954c2e7ca498ee9"),
            mode: 'normal',
            name: 'columns',
            type: 'combo',
            multiple: true,
            addButtonText: i18nRuntime.i18n("f4c807fd8453f4b3fdaab02fb9c21ba7"),
            scaffold: {
              label: i18nRuntime.i18n("39886861ea5d8b526e0ac5ecc78d110c")
            },
            items: [amisEditorCore.getSchemaTpl('matrixColumnLabel')]
          }), amisEditorCore.getSchemaTpl('matrixRowTitle'), amisEditorCore.getSchemaTpl('combo-container', {
            label: i18nRuntime.i18n("48baa62373a2f90d6aa743d7821be956"),
            name: 'rows',
            type: 'combo',
            mode: 'normal',
            multiple: true,
            scaffold: {
              label: i18nRuntime.i18n("854af3c2cd9c275ac70fc5121ea4fb2e")
            },
            addButtonText: i18nRuntime.i18n("bf306308e467aeb7b00df0e2dd127d06"),
            items: [amisEditorCore.getSchemaTpl('matrixRowLabel')]
          })], amisEditorCore.getSchemaTpl('apiControl', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("54ea89b497ec3bb319c68844dfa3687f"), i18nRuntime.i18n("75bf5fd49520bce97de632700fc8a129")),
            name: 'source',
            mode: 'normal'
          }), amisEditorCore.getSchemaTpl('loadingConfig', {}, {
            context: context
          })
          // getSchemaTpl('value')
          ]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), amisEditorCore.getSchemaTpl('style:classNames'), {
          label: amisEditorCore.tipedLabel(i18nRuntime.i18n("d5bc35360607472de4525358af126de4"), i18nRuntime.i18n("83a60f8b752a1ef3ce6a240388d635aa")),
          name: 'textAlign',
          type: 'select',
          options: [{
            label: i18nRuntime.i18n("0bbc2ea4e1d1f23feb576de5dca1ce3b"),
            value: 'center'
          }, {
            label: i18nRuntime.i18n("316a639631f712780829a202258ec3cc"),
            value: 'left'
          }, {
            label: i18nRuntime.i18n("e2aaec83377244c9d15f78f51cccfe6f"),
            value: 'right'
          }, {
            label: i18nRuntime.i18n("da1b972efb29f850b50e219ad4d98ba5"),
            value: 'justify'
          }]
        }])]
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
  MatrixControlPlugin.id = 'MatrixControlPlugin';
  return MatrixControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(MatrixControlPlugin);

exports.MatrixControlPlugin = MatrixControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
