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

var DefaultSize = 40;
var DefaultBorderRadius = 20;
var widthOrheightPipeIn = function (curValue, rest) {
  var _a, _b;
  return curValue ? curValue : (_b = (_a = rest.data) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : DefaultSize;
};
var AvatarPlugin = /** @class */function (_super) {
  tslib.__extends(AvatarPlugin, _super);
  function AvatarPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'avatar';
    _this.$schema = '/schemas/AvatarSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("4c50eef3bdaf0b4164ce179e576f2b2d");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-user';
    _this.pluginIcon = 'avatar-plugin';
    _this.description = i18nRuntime.i18n("18dc831ec12d358d05902bef1f00e1f1");
    _this.docLink = '/amis/zh-CN/components/avatar';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.scaffold = {
      type: 'avatar',
      showtype: 'image',
      icon: '',
      fit: 'cover',
      style: {
        width: DefaultSize,
        height: DefaultSize,
        borderRadius: DefaultBorderRadius
      }
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelTitle = i18nRuntime.i18n("4c50eef3bdaf0b4164ce179e576f2b2d");
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          className: 'p-none',
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }),
          // 如果同时存在 src、text 和 icon，会优先用 src、接着 text、最后 icon
          {
            type: 'button-group-select',
            label: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
            name: 'showtype',
            tiled: true,
            inputClassName: 'items-center',
            options: [{
              label: i18nRuntime.i18n("20def7942674282277c3714ed7ea6ce0"),
              value: 'image'
            }, {
              label: i18nRuntime.i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
              value: 'icon'
            }, {
              label: i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733"),
              value: 'text'
            }],
            pipeIn: function (value, form) {
              var _a, _b;
              if (value) {
                return value;
              }
              var showType = ((_a = form.data) === null || _a === void 0 ? void 0 : _a.text) ? 'text' : ((_b = form.data) === null || _b === void 0 ? void 0 : _b.icon) ? 'icon' : 'image';
              // 使用setTimeout跳过react更新检测，推进showtype更新
              setTimeout(function () {
                return form.setValueByName('showtype', showType);
              });
              return showType;
            },
            onChange: function (value, origin, item, form) {
              form.setValues({
                src: undefined,
                fit: 'cover',
                text: undefined,
                gap: 4,
                icon: ''
              });
            }
          }, {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            body: [
            // 图标
            amisEditorCore.getSchemaTpl('icon', {
              name: 'icon',
              label: i18nRuntime.i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
              visibleOn: 'data.showtype === "icon"'
            }),
            // 图片
            amisEditorCore.getSchemaTpl('valueFormula', {
              rendererSchema: {
                type: 'input-url'
              },
              name: 'src',
              label: i18nRuntime.i18n("bfe68d5844f8e54602760e18f45954f7"),
              visibleOn: 'data.showtype === "image"'
            }), {
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("b54f4a65cd257c87db32ee1023e1daa1"), i18nRuntime.i18n("def423db04dd24b226911b9e4cf5dc9c")),
              name: 'fit',
              type: 'select',
              pipeIn: amisEditorCore.defaultValue('cover'),
              options: [{
                label: i18nRuntime.i18n("74735df86a8e1c15bce50e2c1dd42e98"),
                value: 'cover'
              }, {
                label: i18nRuntime.i18n("9d7f3e170404f211a4f95c214f044b05"),
                value: 'contain'
              }, {
                label: i18nRuntime.i18n("9854f491213784118614be4a1970bcf9"),
                value: 'fill'
              }, {
                label: i18nRuntime.i18n("3d2b60dda894eba9a042beddf7daf3cc"),
                value: 'none'
              }],
              visibleOn: 'data.showtype === "image"'
            },
            // 文字
            amisEditorCore.getSchemaTpl('avatarText'), {
              type: 'input-group',
              name: 'gap',
              value: 4,
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c7fff1a6f585d7fb22c94bb1ef82707d"), i18nRuntime.i18n("f1b4c635cdb39c91461f181d27d06f8c")),
              body: [{
                type: 'input-number',
                name: 'gap',
                min: 0
              }, {
                type: 'tpl',
                addOnclassName: 'border-0 bg-none',
                tpl: 'px'
              }],
              visibleOn: 'data.showtype === "text"'
            }]
          }, amisEditorCore.getSchemaTpl('badge')]
        }, amisEditorCore.getSchemaTpl('status')])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-number',
            label: i18nRuntime.i18n("dfd0cd7f2cba96917484569a646bdc8d"),
            min: 0,
            name: 'style.width',
            pipeIn: widthOrheightPipeIn
          }, {
            type: 'input-number',
            label: i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            min: 1,
            name: 'style.height',
            pipeIn: widthOrheightPipeIn
          }, {
            type: 'input-number',
            label: i18nRuntime.i18n("0103eb2d3dca70270d1a74e9ec987ac9"),
            min: 0,
            name: 'style.borderRadius',
            pipeIn: function (curValue, rest) {
              var _a, _b, _c;
              if (curValue) {
                return curValue;
              }
              // 如果是圆形，说明是旧的，直接设置shape为长方形后，返回50%
              if (((_a = rest.data) === null || _a === void 0 ? void 0 : _a.shape) === 'circle') {
                rest.setValueByName('shape', 'square');
                return +(((_b = rest.data) === null || _b === void 0 ? void 0 : _b.size) || DefaultSize) * 0.5;
              }
              return ((_c = rest.data) === null || _c === void 0 ? void 0 : _c.size) ? 0 : DefaultBorderRadius;
            }
          }]
        },
        // 兼容旧的外观面板
        {
          header: i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733"),
          key: 'font',
          body: [{
            type: 'style-font',
            label: false,
            name: 'style'
          }]
        }, {
          header: i18nRuntime.i18n("9a233b241eef54521cfe9365bfaa7b2f"),
          key: 'box-model',
          body: [{
            type: 'style-box-model',
            label: false,
            name: 'style'
          }]
        }, {
          header: i18nRuntime.i18n("961534b4ea37e4e88aada736b299d063"),
          key: 'border',
          body: [{
            type: 'style-border',
            label: false,
            name: 'style',
            disableRadius: true
          }]
        }, {
          title: i18nRuntime.i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
          body: [{
            type: 'style-background',
            label: false,
            name: 'style',
            noImage: true
          }]
        }, {
          header: i18nRuntime.i18n("803205e38834280d9e6a75993ac00764"),
          key: 'box-shadow',
          body: [{
            type: 'style-box-shadow',
            label: false,
            name: 'style.boxShadow'
          }]
        }, {
          header: i18nRuntime.i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
          key: 'other',
          body: [{
            label: i18nRuntime.i18n("34dac4adbc96afd65f060cc4cfff1feb"),
            name: 'style.opacity',
            min: 0,
            max: 1,
            step: 0.05,
            type: 'input-range',
            pipeIn: amisEditorCore.defaultValue(1),
            marks: {
              '0%': '0',
              '50%': '0.5',
              '100%': '1'
            }
          }]
        }, amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }]);
    };
    return _this;
  }
  AvatarPlugin.id = 'AvatarPlugin';
  AvatarPlugin.scene = ['layout'];
  return AvatarPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(AvatarPlugin);

exports.AvatarPlugin = AvatarPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
