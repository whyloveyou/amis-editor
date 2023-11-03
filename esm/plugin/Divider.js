/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { getI18nEnabled, getSchemaTpl, defaultValue, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var DividerPlugin = /** @class */function (_super) {
  __extends(DividerPlugin, _super);
  function DividerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'divider';
    _this.$schema = '/schemas/DividerSchema.json';
    // 组件名称
    _this.name = i18n("7e1eb2c588aa1301f4aa19395ef0a177");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-minus';
    _this.pluginIcon = 'divider-plugin';
    _this.description = i18n("bc43ae8e61f1ad4be2b0a9e70501e490");
    _this.scaffold = {
      type: 'divider'
    };
    _this.previewSchema = {
      type: 'divider',
      className: 'm-t-none m-b-none'
    };
    _this.panelTitle = i18n("7e1eb2c588aa1301f4aa19395ef0a177");
    _this.panelJustify = true;
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = getI18nEnabled();
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [i18nEnabled ? {
            type: 'input-text-i18n',
            name: 'title',
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            placeholder: i18n("96641a78cfd9f9f8ba68f0524347b186")
          } : getSchemaTpl('valueFormula', {
            name: 'title',
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            placeholder: i18n("96641a78cfd9f9f8ba68f0524347b186"),
            rendererSchema: {
              type: 'input-text'
            }
          })]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("6f99b6eed37795cb97d5f6370c32113b"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('layout:width:v2', {
            visibleOn: 'data.style && data.style.position && (data.style.position === "fixed" || data.style.position === "absolute")'
          }), {
            mode: 'horizontal',
            type: 'select',
            label: i18n("226b0912184333c81babf2f1894ec0c1"),
            name: 'lineStyle',
            value: 'solid',
            options: [{
              value: 'solid',
              label: i18n("cc4c575642609fbf059a5df81eb86bfc")
            }, {
              value: 'dashed',
              label: i18n("61f6f4fc0b806ac9d41ad0792e6155f6")
            }]
          }, {
            mode: 'horizontal',
            type: 'select',
            label: i18n("a465db53b8c98f42caa15ca5662f9c90"),
            name: 'direction',
            value: 'horizontal',
            options: [{
              value: 'horizontal',
              label: i18n("4cde06e6162ed66720e3133cb83bc059")
            }, {
              value: 'vertical',
              label: i18n("75ac842f8e77305846f1d776f97dfaf8")
            }]
          }, {
            mode: 'horizontal',
            type: 'input-number',
            label: i18n("40d39c3bc7bebced7d63eace0191a0a8"),
            name: 'rotate',
            value: 0,
            min: -360,
            max: 360
          }, getSchemaTpl('theme:select', {
            mode: 'horizontal',
            label: '线长',
            name: 'style.width',
            placeholder: '100%',
            visibleOn: 'data.direction !== "vertical"',
            clearValueOnHidden: true
          }), getSchemaTpl('theme:select', {
            mode: 'horizontal',
            label: '线长',
            name: 'style.height',
            placeholder: 'var(--sizes-base-15)',
            visibleOn: 'data.direction === "vertical"',
            clearValueOnHidden: true
          }), getSchemaTpl('theme:select', {
            mode: 'horizontal',
            label: i18n("bade10099f8447210ce7b97fa106b527"),
            name: 'style.borderWidth',
            placeholder: '1px',
            visibleOn: '!data.title || data.direction === "vertical"'
          }), getSchemaTpl('theme:select', {
            mode: 'horizontal',
            label: i18n("bade10099f8447210ce7b97fa106b527"),
            name: 'themeCss.titleWrapperControlClassName.border-bottom-width',
            placeholder: '1px',
            visibleOn: '!!data.title && data.direction !== "vertical"',
            clearValueOnHidden: true,
            pipeIn: function (value, form) {
              var _a, _b;
              if (value === undefined && ((_b = (_a = form.data) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.borderWidth) !== undefined) {
                var bwidth_1 = form.data.style.borderWidth;
                setTimeout(function () {
                  return form.setValueByName('themeCss.titleWrapperControlClassName.border-bottom-width', bwidth_1);
                });
                return bwidth_1;
              }
              return value;
            }
          }), getSchemaTpl('theme:colorPicker', {
            mode: 'horizontal',
            label: i18n("6b36c6f7ec834692ec6c8e3816349fdd"),
            name: 'color',
            placeholder: 'var(--colors-neutral-line-8)',
            labelMode: 'input',
            needGradient: true
          }), getSchemaTpl('theme:paddingAndMargin', {
            name: 'style',
            hidePadding: true
          })]
        }, {
          title: '标题样式',
          visibleOn: '!!data.title && data.direction !== "vertical"',
          body: [{
            type: 'select',
            name: 'titlePosition',
            label: i18n("d4d2a66820d30e07b44c850eb3f116c0"),
            pipeIn: defaultValue('center'),
            options: [{
              value: 'left',
              label: i18n("316a639631f712780829a202258ec3cc")
            }, {
              value: 'center',
              label: i18n("0bbc2ea4e1d1f23feb576de5dca1ce3b")
            }, {
              value: 'right',
              label: i18n("e2aaec83377244c9d15f78f51cccfe6f")
            }],
            clearValueOnHidden: true
          }, getSchemaTpl('theme:select', {
            label: tipedLabel('距离', '标题和最近左、右边框之间的距离，默认值5%'),
            name: 'themeCss.titleWrapperControlClassName.flex-basis',
            placeholder: '5%',
            visibleOn: 'data.titlePosition === "left" || data.titlePosition === "right"',
            clearValueOnHidden: true
          }), getSchemaTpl('theme:font', {
            title: i18n("ca746b1ff10193a3ce20878dec04a733"),
            name: 'themeCss.titleControlClassName.font',
            textAlign: false,
            clearValueOnHidden: true
          }), getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.titleControlClassName.padding-and-margin',
            hidePadding: true,
            clearValueOnHidden: true
          })]
        }])
      }]);
    };
    return _this;
  }
  DividerPlugin.id = 'DividerPlugin';
  DividerPlugin.scene = ['layout'];
  return DividerPlugin;
}(BasePlugin);
registerEditorPlugin(DividerPlugin);

export { DividerPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
