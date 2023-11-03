/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var CollapseGroupPlugin = /** @class */function (_super) {
  tslib.__extends(CollapseGroupPlugin, _super);
  function CollapseGroupPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'collapse-group';
    _this.$schema = '/schemas/CollapseGroupSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("d09980a88568f75e9267ca7b531c74eb");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("0d571a7ab19e098820e8cea4d5a80f7d");
    _this.tags = [i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.icon = 'fa fa-align-justify';
    _this.pluginIcon = 'collapse-plugin';
    _this.scaffold = {
      type: 'collapse-group',
      activeKey: ['1'],
      body: [{
        type: 'collapse',
        key: '1',
        active: true,
        header: i18nRuntime.i18n("17dcbf1f144607d4af0bb718e008682f"),
        body: [{
          type: 'tpl',
          tpl: i18nRuntime.i18n("f7fb20f6cacd5e40c7f5732cb377d0bf"),
          wrapperComponent: '',
          inline: false
        }]
      }, {
        type: 'collapse',
        key: '2',
        header: i18nRuntime.i18n("72d41bd9eb3882f7da6f55d0ff0a39f6"),
        body: [{
          type: 'tpl',
          tpl: i18nRuntime.i18n("f7fb20f6cacd5e40c7f5732cb377d0bf"),
          wrapperComponent: '',
          inline: false
        }]
      }]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("8e5ff4f20463c03f7935e0627888c03c"),
      description: i18nRuntime.i18n("d2fa917958506736ea39edbef5e1cea5"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            type: 'object',
            properties: {
              activeKeys: {
                type: 'array',
                title: i18nRuntime.i18n("58164864ad00f5d134f304d309055eda")
              },
              collapseId: {
                type: 'string',
                title: i18nRuntime.i18n("44732aa2566399b71483e63252d3dbc7")
              },
              collapsed: {
                type: 'boolean',
                title: i18nRuntime.i18n("0e8638286319f6efb0afe2616714e8c3")
              }
            }
          }
        }
      }]
    }];
    _this.activeKeyData = [];
    _this.panelTitle = i18nRuntime.i18n("d09980a88568f75e9267ca7b531c74eb");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      amisEditorCore.getI18nEnabled();
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            name: 'expandIconPosition',
            label: i18nRuntime.i18n("0431ee7033364800e261d1e560808231"),
            type: 'button-group-select',
            pipeIn: amisEditorCore.defaultValue('left'),
            options: [{
              label: i18nRuntime.i18n("a7eaff29603a9c40927f726013d2c016"),
              value: 'left',
              icon: 'fa fa-align-left'
            }, {
              label: i18nRuntime.i18n("128d58f066a18ddb2ddb701921d5c77c"),
              value: 'right',
              icon: 'fa fa-align-right'
            }]
          }, {
            type: 'ae-switch-more',
            label: i18nRuntime.i18n("7372dc9f39a173dd0c75a185373245b1"),
            bulk: true,
            mode: 'normal',
            value: false,
            formType: 'extend',
            autoFocus: false,
            form: {
              body: [amisEditorCore.getSchemaTpl('icon', {
                name: 'expandIcon',
                label: i18nRuntime.i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
                pipeIn: function (value) {
                  return value === null || value === void 0 ? void 0 : value.icon;
                },
                pipeOut: function (value) {
                  return {
                    type: 'icon',
                    vendor: '',
                    icon: value
                  };
                }
              })]
            },
            pipeIn: function (value) {
              if (typeof value === 'string' && value.length) {
                return {
                  character: value
                };
              }
              return undefined;
            },
            pipeOut: function (value) {
              if (!amisEditorCore.isObject(value)) {
                return undefined;
              }
              return typeof value.character === 'string' ? value.character : undefined;
            }
          }, {
            name: 'accordion',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("47b4e22880eb59ce9989b8419222e88a"), i18nRuntime.i18n("bb3548f0bb97ab11ee92284ecf37ec16")),
            mode: 'row',
            inputClassName: 'inline-flex justify-between flex-row-reverse',
            type: 'switch',
            pipeIn: amisEditorCore.defaultValue(false)
          }, amisEditorCore.getSchemaTpl('combo-container', {
            name: 'body',
            type: 'combo',
            label: i18nRuntime.i18n("f24544b06700857ec11b434cb2916692"),
            mode: 'normal',
            multiple: true,
            addable: true,
            columnClassName: 'w-20',
            addButtonText: i18nRuntime.i18n("c5ceab33d3e275262b4992a8cb43317f"),
            minLength: 1,
            draggable: true,
            draggableTip: '',
            placeholder: i18nRuntime.i18n("b839e579e920068bd817d34cd7927069"),
            items: [{
              type: 'container',
              columnClassName: 'flex-none',
              body: amisEditorCore.tipedLabel([{
                name: 'active',
                type: 'checkbox'
              }], i18nRuntime.i18n("030a54b0afb54fc7f90e1a0f64eb8205"))
            }, amisEditorCore.getSchemaTpl('title', {
              name: 'header',
              placeholder: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab")
            })],
            onChange: function (value, oldValue, model, form) {
              var activeKey = value.reduce(function (arr, item) {
                item.active === true && arr.push(item.key);
                return arr;
              }, []);
              form.setValues({
                activeKey: activeKey
              });
            },
            pipeOut: function (value, oldValue, data) {
              var keys = value.map(function (item) {
                return item.key;
              });
              var findMinCanUsedKey = function (keys, max) {
                for (var i = 1; i <= max; i++) {
                  if (!keys.includes(String(i))) {
                    return String(i);
                  }
                }
              };
              value.forEach(function (item) {
                if (!item.key) {
                  var key = findMinCanUsedKey(keys, value.length);
                  item.key = key;
                  item.header = i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab").concat(key);
                }
              });
              return value;
            },
            scaffold: {
              type: 'collapse',
              header: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
              body: [{
                type: 'tpl',
                tpl: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
                wrapperComponent: '',
                inline: false
              }],
              key: ''
            }
          })]
        }])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }])];
    };
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'render',
      insertPosition: 'inner'
    }];
    return _this;
  }
  CollapseGroupPlugin.id = 'CollapseGroupPlugin';
  return CollapseGroupPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CollapseGroupPlugin);

exports.CollapseGroupPlugin = CollapseGroupPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
