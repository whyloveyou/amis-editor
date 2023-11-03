/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

/**
 * @file 文字提示容器
 */
var TooltipWrapperPlugin = /** @class */function (_super) {
  tslib.__extends(TooltipWrapperPlugin, _super);
  function TooltipWrapperPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.rendererName = 'tooltip-wrapper';
    _this.$schema = '/schemas/TooltipWrapperSchema.json';
    _this.isBaseComponent = true;
    _this.name = i18nRuntime.i18n("b624985146c759cfeb1be80325eccd65");
    _this.description = i18nRuntime.i18n("33813749a95477897085e2435acc16b6");
    _this.docLink = '/amis/zh-CN/components/tooltip';
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-comment-alt';
    _this.pluginIcon = 'tooltip-wrapper-plugin';
    _this.scaffold = {
      type: 'tooltip-wrapper',
      tooltip: i18nRuntime.i18n("9b14c9051067bef2dd9a15683201dd18"),
      body: [{
        type: 'tpl',
        wrapperComponent: '',
        tpl: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014")
      }],
      enterable: true,
      showArrow: true,
      offset: [0, 0]
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      className: 'p-1 mr-3 border-2 border-solid border-indigo-400'
    });
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    _this.panelTitle = _this.name;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('title', {
            label: i18nRuntime.i18n("dc19704991f1476fa4dcbb80c50bedd6")
          }), amisEditorCore.getSchemaTpl('tooltip'), {
            name: 'trigger',
            type: 'select',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("159dbc2fafd57b9d3652f16659b1b519"), i18nRuntime.i18n("ab97cef55407efa11f79211e17cb2b4b")),
            multiple: true,
            value: ['hover'],
            pipeIn: function (value) {
              return Array.isArray(value) ? value.join(',') : [];
            },
            pipeOut: function (value) {
              return value && value.length ? value.split(',') : undefined;
            },
            options: [{
              label: i18nRuntime.i18n("728c7cdfa431821d291b5108394ec65a"),
              value: 'hover'
            }, {
              label: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
              value: 'click'
            }]
          }, {
            type: 'button-group-select',
            name: 'placement',
            label: i18nRuntime.i18n("d586324c6d6b45cb78a4172d836dab3e"),
            size: 'sm',
            className: 'ae-buttonGroupSelect--justify',
            options: [{
              label: i18nRuntime.i18n("af767b7e4ae069d54f9ea839858d4c6d"),
              value: 'top'
              // icon: 'fa fa-arrow-up'
            }, {
              label: i18nRuntime.i18n("3850a186c3235bc646d4c2f79cebac36"),
              value: 'bottom'
              // icon: 'fa fa-arrow-down'
            }, {
              label: i18nRuntime.i18n("d2aff1417831aa621c16cd5b95306b4b"),
              value: 'left'
              // icon: 'fa fa-arrow-left'
            }, {
              label: i18nRuntime.i18n("4d9c32c23df5d234e629c922c58d8e12"),
              value: 'right'
              // icon: 'fa fa-arrow-right'
            }],

            pipeIn: amisEditorCore.defaultValue('top')
          }, {
            type: 'button-group-select',
            name: 'tooltipTheme',
            label: i18nRuntime.i18n("b47707f0e916e3e3f4ba885bc2cf2c11"),
            size: 'sm',
            className: 'ae-buttonGroupSelect--justify',
            options: [{
              label: i18nRuntime.i18n("a32b3b848eee6929634dfc9a9d8bcdb1"),
              value: 'light',
              icon: 'far fa-sun'
            }, {
              label: i18nRuntime.i18n("adb7e5312abdb9a44297e48d63815fa3"),
              value: 'dark',
              icon: 'far fa-moon'
            }],
            pipeIn: amisEditorCore.defaultValue('light')
          }, {
            name: 'inline',
            label: i18nRuntime.i18n("0de826c66ae3fe8043e9a39b35616ee6"),
            type: 'switch',
            mode: 'row',
            inputClassName: 'inline-flex justify-between flex-row-reverse'
          }, {
            name: 'rootClose',
            visibleOn: '~this.trigger.indexOf("click")',
            label: i18nRuntime.i18n("4583d3453c31cd3ff068c1358d8e7f1c"),
            type: 'switch',
            mode: 'row',
            inputClassName: 'inline-flex justify-between flex-row-reverse'
          }]
        }, {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [{
            name: 'wrapperComponent',
            label: i18nRuntime.i18n("a823cfa70cfa46c788e1eedae043f6e5"),
            type: 'input-text',
            options: ['article', 'aside', 'code', 'div', 'footer', 'header', 'p', 'section'],
            validations: {
              isAlphanumeric: true,
              matchRegexp: '/^(?!.*script).*$/' // 禁用一下script标签
            },

            validationErrors: {
              isAlpha: i18nRuntime.i18n("f7d64e5e79994c3c8853f2608d7b2d25"),
              matchRegexp: i18nRuntime.i18n("f7d64e5e79994c3c8853f2608d7b2d25")
            },
            validateOnChange: false
          }, {
            type: 'input-group',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("8e290c31bc0b4f76edbd58c3575b8420"), i18nRuntime.i18n("03c87fc8d49f865f0c2895d9ef3fe352")),
            body: [{
              type: 'input-number',
              name: 'offset',
              suffix: 'px',
              pipeIn: function (value) {
                return Array.isArray(value) ? value[0] || 0 : 0;
              },
              pipeOut: function (value, oldValue, data) {
                var _a;
                return [value, ((_a = data.offset) === null || _a === void 0 ? void 0 : _a[1]) || 0];
              }
            }, {
              type: 'input-number',
              name: 'offset',
              suffix: 'px',
              pipeIn: function (value) {
                return Array.isArray(value) ? value[1] || 0 : 0;
              },
              pipeOut: function (value, oldValue, data) {
                var _a;
                return [((_a = data.offset) === null || _a === void 0 ? void 0 : _a[0]) || 0, value];
              }
            }]
          }, {
            type: 'switch',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("4e3e1e12e701890f4461808cc8f9d407"), i18nRuntime.i18n("9d6246f57f6924410b0c68f2172420f9")),
            name: 'enterable',
            inputClassName: 'is-inline'
          }, {
            type: 'switch',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("90919000a708f8d66b7591e21b8e33f1"), i18nRuntime.i18n("ed81f127f3b2aaff73a4f4dd5968fdcb")),
            name: 'showArrow',
            inputClassName: 'is-inline'
          }, {
            label: i18nRuntime.i18n("b60e5222037939812dabb7da9979c27d"),
            type: 'input-number',
            min: 0,
            step: 100,
            name: 'mouseEnterDelay',
            suffix: 'ms',
            pipeIn: amisEditorCore.defaultValue(0)
          }, {
            label: i18nRuntime.i18n("82bb338503938f2da52e91f7244a34a2"),
            type: 'input-number',
            min: 0,
            step: 100,
            name: 'mouseLeaveDelay',
            suffix: 'ms',
            pipeIn: amisEditorCore.defaultValue(0)
          }]
        }])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          layoutExtra: [amisEditorCore.getSchemaTpl('theme:size', {
            label: i18nRuntime.i18n("c8339fd2a85af4ba66084d28df808de4"),
            name: 'themeCss.baseControlClassName.size:default'
          })],
          extra: [amisEditorCore.getSchemaTpl('theme:base', {
            classname: 'tooltipControlClassName',
            title: i18nRuntime.i18n("e1445cd3c4710c8abf7c1b3b1ce060d8")
          })]
        })), false))
      }])];
    };
    return _this;
  }
  TooltipWrapperPlugin.id = 'TooltipWrapperPlugin';
  TooltipWrapperPlugin.scene = ['layout'];
  return TooltipWrapperPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TooltipWrapperPlugin);

exports.TooltipWrapperPlugin = TooltipWrapperPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
