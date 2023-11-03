/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var AlertPlugin = /** @class */function (_super) {
  __extends(AlertPlugin, _super);
  function AlertPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'alert';
    _this.$schema = '/schemas/AlertSchema.json';
    // 组件名称
    _this.name = i18n("02d9819ddaaaeb1b7b22b12608c7e5ca");
    _this.isBaseComponent = true;
    _this.description = i18n("4be3194e93cdd2899d06b499c184195b");
    _this.docLink = '/amis/zh-CN/components/alert';
    _this.icon = 'fa fa-exclamation-circle';
    _this.pluginIcon = 'tooltip-plugin';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.scaffold = {
      type: 'alert',
      body: {
        type: 'tpl',
        tpl: i18n("6f2b01db04cbf7e460b5c6f4e37a5e76"),
        wrapperComponent: '',
        inline: false
      },
      level: 'info'
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      className: 'text-left',
      showCloseButton: true
    });
    // 普通容器类渲染器配置
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      placeholder: i18n("6f2b01db04cbf7e460b5c6f4e37a5e76")
    }];
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("02d9819ddaaaeb1b7b22b12608c7e5ca");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            label: i18n("226b0912184333c81babf2f1894ec0c1"),
            name: 'level',
            type: 'select',
            options: [{
              label: i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
              value: 'info'
            }, {
              label: i18n("330363dfc524cff2488f2ebde0500896"),
              value: 'success'
            }, {
              label: i18n("900c70fa5f7dbc014e6f762d5e0e885c"),
              value: 'warning'
            }, {
              label: i18n("e2e27a87257599f83c817c43e724b6aa"),
              value: 'danger'
            }]
          }, getSchemaTpl('label', {
            name: 'title'
          }), getSchemaTpl('switch', {
            label: i18n("cbda486dbec5bdacb593294e240c5e63"),
            name: 'showCloseButton'
          }), {
            type: 'ae-switch-more',
            mode: 'normal',
            name: 'showIcon',
            label: i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
            hiddenOnDefault: !context.schema.icon,
            formType: 'extend',
            form: {
              body: [getSchemaTpl('icon', {
                label: i18n("7372dc9f39a173dd0c75a185373245b1")
              })]
            }
          }]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }]);
    };
    return _this;
  }
  AlertPlugin.id = 'AlertPlugin';
  AlertPlugin.scene = ['layout'];
  return AlertPlugin;
}(BasePlugin);
registerEditorPlugin(AlertPlugin);

export { AlertPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
