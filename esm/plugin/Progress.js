/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var ProgressPlugin = /** @class */function (_super) {
  __extends(ProgressPlugin, _super);
  function ProgressPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'progress';
    _this.$schema = '/schemas/ProgressSchema.json';
    // 组件名称
    _this.name = i18n("83077805e05ac6bedad69b47fca4462b");
    _this.searchKeywords = i18n("c77048def6e8a2d6c556a3fcc9c66730");
    _this.isBaseComponent = true;
    _this.description = i18n("b1aefb18d4bf96dc283a26d67abc41a8");
    _this.docLink = '/amis/zh-CN/components/progress';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-angle-double-right';
    _this.pluginIcon = 'progress-plugin';
    _this.scaffold = {
      type: 'progress',
      mode: 'line',
      value: 66,
      strokeWidth: 6,
      valueTpl: '${value}%'
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("c7bff79d059a0b7ff9b02441959d8be2");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isFormItem = !!(context === null || context === void 0 ? void 0 : context.info.renderer.isFormItem);
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            label: i18n("226b0912184333c81babf2f1894ec0c1"),
            name: 'mode',
            type: 'select',
            option: i18n("2dde3029c4170a1c8e961a90766e0194"),
            pipeIn: defaultValue('line'),
            tiled: true,
            options: [{
              label: i18n("ce179eca04fab0d584506b0d19736836"),
              value: 'line'
            }, {
              label: i18n("2db0fcd5342b479688fd999a0108ef5a"),
              value: 'circle'
            }, {
              label: i18n("3fa8b34a2744f62fe93dd599a275af39"),
              value: 'dashboard'
            }],
            onChange: function (value, oldValue, model, form) {
              if (value === 'circle') {
                form.setValueByName('gapDegree', 0);
                form.setValueByName('gapPosition', '');
              } else if (value === 'dashboard') {
                form.setValueByName('gapDegree', 75);
                form.setValueByName('gapPosition', 'bottom');
              }
            }
          }, getSchemaTpl('valueFormula', {
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'input-number'
            }),
            needDeleteProps: ['placeholder'],
            valueType: 'number' // 期望数值类型，不过 amis中会尝试字符串 trans 数值类型
          }), getSchemaTpl('menuTpl', {
            label: tipedLabel(i18n("31c29c46536a5007522032d2a42db56a"), i18n("a6a41d1bfb5896210eb527d183a07958")),
            name: 'valueTpl',
            variables: [{
              label: i18n("2e01f5f5889e33d003bec7857cd38445"),
              children: [{
                label: i18n("1ca3fa86d8faa46cc75792bcf90d7fff"),
                value: 'value',
                tag: 'number'
              }]
            }],
            requiredDataPropsVariables: true
          }), getSchemaTpl('switch', {
            name: 'showLabel',
            label: i18n("1ca3fa86d8faa46cc75792bcf90d7fff"),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('placeholder', {
            value: '-',
            placeholder: i18n("b0932e5bb7f7d95e3636d82d1a039854"),
            label: tipedLabel(i18n("940b12c19fcf7aced0cdd164edc9acbc"), i18n("9cf66e7783e4c9b1d74bcd411edb6950"))
          })]
        }, getSchemaTpl('status', {
          isFormItem: isFormItem
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'select',
            name: 'progressClassName',
            label: i18n("c8339fd2a85af4ba66084d28df808de4"),
            value: '',
            options: [{
              label: i18n("23ecf42cada8bf2715792d718544d107"),
              value: 'w-xs'
            }, {
              label: i18n("391b8fa9c747a1799353ab856e666ad5"),
              value: 'w-sm'
            }, {
              label: i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'w-md'
            }, {
              label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
              value: 'w-lg'
            }, {
              label: i18n("18c63459a2c069022c7790430f761214"),
              value: ''
            }]
          }, {
            type: 'input-number',
            name: 'strokeWidth',
            label: i18n("2f0faae87508471abce4384b60900e15"),
            value: 6,
            min: 0,
            max: 100
          }, {
            type: 'input-number',
            name: 'gapDegree',
            visibleOn: 'data.mode === "dashboard"',
            label: i18n("bd9b3f7e564c9eeaedd72f1bcbb7fc9f"),
            value: 75,
            min: 0,
            max: 295
          }, {
            label: i18n("31a088147dc0006e4775d066980fa688"),
            name: 'gapPosition',
            type: 'button-group-select',
            visibleOn: 'data.mode === "dashboard"',
            value: defaultValue('bottom'),
            tiled: true,
            options: [{
              label: i18n("af767b7e4ae069d54f9ea839858d4c6d"),
              value: 'top'
            }, {
              label: i18n("3850a186c3235bc646d4c2f79cebac36"),
              value: 'bottom'
            }, {
              label: i18n("d2aff1417831aa621c16cd5b95306b4b"),
              value: 'left'
            }, {
              label: i18n("4d9c32c23df5d234e629c922c58d8e12"),
              value: 'right'
            }]
          }, getSchemaTpl('switch', {
            name: 'animate',
            label: i18n("77a7419dd4fad70c3f3e4b075b2c3fcb"),
            visibleOn: 'data.mode === "line"'
          }), {
            type: 'button-group-select',
            name: 'styleType',
            label: i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
            visibleOn: 'data.mode === "line"',
            options: [{
              label: i18n("a04564aaca658461333b00cbcd071518"),
              value: 'purity'
            }, {
              label: i18n("0a9fc7083e2768107fc178ff36f29ba0"),
              value: 'stripe'
            }],
            pipeIn: function (value, form) {
              var _a;
              return ((_a = form.data) === null || _a === void 0 ? void 0 : _a.stripe) ? 'stripe' : 'purity';
            },
            onChange: function (value, oldValue, model, form) {
              form.setValueByName('stripe', value === 'stripe');
            }
          }, getSchemaTpl('combo-container', {
            name: 'map',
            type: 'combo',
            mode: 'normal',
            multiple: true,
            label: tipedLabel(i18n("6b36c6f7ec834692ec6c8e3816349fdd"), i18n("087e631da111edc6db508289a7b5a95b")),
            items: [{
              placeholder: 'color',
              type: 'input-color',
              name: 'color'
            }, {
              type: 'input-number',
              name: 'value',
              placeholder: 'value',
              columnClassName: 'w-xs',
              unique: true,
              requiredOn: 'data.map?.length > 1',
              min: 0,
              step: 10,
              precision: 0
            }],
            value: [{
              color: '#dc3545',
              value: 20
            }, {
              color: '#fad733',
              value: 60
            }, {
              color: '#28a745',
              value: 100
            }],
            pipeIn: function (mapItem) {
              // schema传入
              if (Array.isArray(mapItem) && mapItem.length) {
                return typeof mapItem[0] === 'string' ? mapItem.map(function (item, index) {
                  var span = 100 / mapItem.length;
                  return {
                    value: (index + 1) * span,
                    color: item
                  };
                }) : mapItem.length === 1 && !mapItem[0].value ? [{
                  color: mapItem[0].color,
                  value: 100
                }] : mapItem;
              } else {
                return mapItem ? [mapItem] : [];
              }
            },
            pipeOut: function (mapItem, origin, data) {
              // 传入schema
              if (mapItem.length === 1 && !mapItem[0].value) {
                // 只有一个颜色且value未设置时默认为100
                return [{
                  color: mapItem[0].color,
                  value: 100
                }];
              } else {
                return mapItem;
              }
            }
          })]
        }, getSchemaTpl('style:classNames', {
          schema: [],
          isFormItem: isFormItem
        })])
      }]);
    };
    return _this;
  }
  ProgressPlugin.id = 'ProgressPlugin';
  ProgressPlugin.scene = ['layout'];
  return ProgressPlugin;
}(BasePlugin);
registerEditorPlugin(ProgressPlugin);

export { ProgressPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
