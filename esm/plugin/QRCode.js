/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var QRCodePlugin = /** @class */function (_super) {
  __extends(QRCodePlugin, _super);
  function QRCodePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'qrcode';
    _this.$schema = '/schemas/QRCodeSchema.json';
    // 组件名称
    _this.name = i18n("22b03c024d815ad327e8b95d684ced38");
    _this.isBaseComponent = true;
    _this.description = i18n("1857d9050ac0527374f4324c0a5ad910");
    _this.docLink = '/amis/zh-CN/components/qrcode';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-qrcode';
    _this.pluginIcon = 'qrcode-plugin';
    _this.scaffold = {
      type: 'qrcode',
      value: 'https://amis.baidu.com'
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("22b03c024d815ad327e8b95d684ced38");
    _this.panelBody = [getSchemaTpl('tabs', [{
      title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      body: [getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), {
        name: 'value',
        type: 'input-text',
        label: i18n("e71377bb59c70af683be127ec49d01c7"),
        pipeIn: defaultValue('https://www.baidu.com'),
        description: i18n("57eda9139c0b3bc0605ed4cf303ffbd2")
      }, {
        name: 'level',
        type: 'select',
        label: i18n("f13c3e0717ea842cddc1402e8dabfb6b"),
        pipeIn: defaultValue('L'),
        options: [{
          label: 'L',
          value: 'L'
        }, {
          label: 'M',
          value: 'M'
        }, {
          label: 'Q',
          value: 'Q'
        }, {
          label: 'H',
          value: 'H'
        }]
      }]
    }, {
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [{
        name: 'codeSize',
        type: 'input-number',
        label: i18n("c4bde7dba8c6eed0ca0165b071b259bf"),
        pipeIn: defaultValue(128)
      }, {
        name: 'backgroundColor',
        type: 'input-color',
        label: i18n("2f97db95d75280bfedc5afa72d2c717d"),
        pipeIn: defaultValue('#fff')
      }, {
        name: 'foregroundColor',
        type: 'input-color',
        label: i18n("ebf2453eddf55441b711d187f3872ffe"),
        pipeIn: defaultValue('#000')
      }, getSchemaTpl('className')]
    }, {
      title: i18n("33bf801796fd255b5f6147e33146669b"),
      body: [getSchemaTpl('ref'), getSchemaTpl('visible')]
    }])];
    return _this;
  }
  QRCodePlugin.id = 'QRCodePlugin';
  QRCodePlugin.scene = ['layout'];
  return QRCodePlugin;
}(BasePlugin);
registerEditorPlugin(QRCodePlugin);

export { QRCodePlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
