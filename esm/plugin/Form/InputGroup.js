/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { i18n } from 'i18n-runtime';

var InputGroupControlPlugin = /** @class */function (_super) {
  __extends(InputGroupControlPlugin, _super);
  function InputGroupControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-group';
    _this.$schema = '/schemas/InputGroupControlSchema.json';
    // 组件名称
    _this.name = i18n("0d4ebf2f4a10336011cfe0466b29ba5c");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-object-group';
    _this.pluginIcon = 'input-group-plugin';
    _this.description = i18n("5b7363cba6bad37b6614809e9bd90746");
    _this.docLink = '/amis/zh-CN/components/form/input-group';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-group',
      name: 'input-group',
      label: i18n("13370c4a5c95eff126068be5cfd2a9df"),
      body: [{
        type: 'input-text',
        inputClassName: 'b-r-none p-r-none',
        name: 'input-group'
      }, {
        type: 'submit',
        label: i18n("939d5345ad4345dbaabe14798f6ac0f1"),
        level: 'primary'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("ff10d1d90be63fbcdc7377435bf18f96");
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      preferTag: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'render',
      matchRegion: function (elem) {
        return !!elem;
      }
    }];
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('label'), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('description')]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.MultiSelect
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [getSchemaTpl('switch', {
            label: i18n("2fb0853874c2cc8cc42f0c7520af662a"),
            name: 'inline',
            pipeIn: defaultValue(false)
          })]
        }), getSchemaTpl('style:classNames')])]
      }]);
    };
    return _this;
  }
  InputGroupControlPlugin.id = 'InputGroupControlPlugin';
  InputGroupControlPlugin.scene = ['layout'];
  return InputGroupControlPlugin;
}(BasePlugin);
registerEditorPlugin(InputGroupControlPlugin);

export { InputGroupControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
