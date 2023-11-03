/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, tipedLabel, translateSchema, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { BUTTON_DEFAULT_ACTION } from '../component/BaseControl.js';
import { i18n } from 'i18n-runtime';

var ButtonGroupPlugin = /** @class */function (_super) {
  __extends(ButtonGroupPlugin, _super);
  function ButtonGroupPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'button-group';
    _this.$schema = '/schemas/ButtonGroupSchema.json';
    // 组件名称
    _this.name = i18n("c8caf94205105bac5833ab31cc2129d7");
    _this.isBaseComponent = true;
    _this.description = i18n("66ae9ce23b0b2e243aff087d906a2489");
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-object-group';
    _this.pluginIcon = 'btn-group-plugin';
    _this.docLink = '/amis/zh-CN/components/button-group';
    _this.scaffold = {
      type: 'button-group',
      buttons: [__assign({
        type: 'button',
        label: i18n("e9d2f66bbd44c96a3e03494bf6b1ebf0")
      }, BUTTON_DEFAULT_ACTION), __assign({
        type: 'button',
        label: i18n("ce35a17d2ba7caac95092a7a66ac9a0d")
      }, BUTTON_DEFAULT_ACTION)]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("c8caf94205105bac5833ab31cc2129d7");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            type: 'button-group-select',
            name: 'vertical',
            label: i18n("de26e1294acedb55155a418630d57924"),
            options: [{
              label: i18n("4cde06e6162ed66720e3133cb83bc059"),
              value: false
            }, {
              label: i18n("75ac842f8e77305846f1d776f97dfaf8"),
              value: true
            }],
            pipeIn: defaultValue(false)
          }, getSchemaTpl('switch', {
            name: 'tiled',
            label: tipedLabel(i18n("8eb18b36f5a27fa8e6d32bc66546ce05"), i18n("2e28645c67c5742e473888a27aab7bd6")),
            pipeIn: defaultValue(false)
          }), getSchemaTpl('combo-container', {
            type: 'combo',
            label: i18n("66774850742a81e8b2393195290b7330"),
            name: 'buttons',
            mode: 'normal',
            multiple: true,
            addable: true,
            minLength: 1,
            draggable: true,
            editable: false,
            pipeIn: function (value, data) {
              return translateSchema(value);
            },
            items: [{
              type: 'tpl',
              inline: false,
              className: 'p-t-xs',
              tpl: "<span class=\"label label-default\"><% if (data.type === \"button-group\") { %> ".concat(i18n("c8caf94205105bac5833ab31cc2129d7"), " <% } else { %><%= data.label %><% if (data.icon) { %><i class=\"<%= data.icon %>\"/><% }%><% } %></span>")
            }],
            addButtonText: i18n("f9f2b9cc91cd332db6b2b732c3869233"),
            scaffold: {
              type: 'button',
              label: i18n("fa966345577ba81af19408f203db968f")
            }
          })]
        }, getSchemaTpl('status', {
          disabled: true
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('buttonLevel', {
            label: i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
            name: 'btnLevel'
          }), getSchemaTpl('size', {
            label: i18n("c8339fd2a85af4ba66084d28df808de4")
          })]
        }, getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [getSchemaTpl('className', {
            label: i18n("fa966345577ba81af19408f203db968f"),
            name: 'btnClassName'
          })]
        })])]
      }]);
    };
    _this.regions = [{
      key: 'buttons',
      label: i18n("40f3bc0a4f4d0f4230fc7fa6f4fcec92"),
      renderMethod: 'render',
      preferTag: i18n("fa966345577ba81af19408f203db968f"),
      insertPosition: 'inner'
    }];
    return _this;
  }
  ButtonGroupPlugin.id = 'ButtonGroupPlugin';
  ButtonGroupPlugin.scene = ['layout'];
  return ButtonGroupPlugin;
}(BasePlugin);
registerEditorPlugin(ButtonGroupPlugin);

export { ButtonGroupPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
