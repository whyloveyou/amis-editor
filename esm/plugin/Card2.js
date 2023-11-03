/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var Card2Plugin = /** @class */function (_super) {
  __extends(Card2Plugin, _super);
  function Card2Plugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'card2';
    _this.$schema = '/schemas/Card2Schema.json';
    // 组件名称
    _this.name = i18n("d87f215d9ac688b1d3399bf575a0ef6f");
    _this.isBaseComponent = true;
    _this.disabledRendererPlugin = true;
    _this.description = i18n("f49d40842a3c66c4de2e57a48157c707");
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = '';
    _this.scaffold = {
      type: 'card2',
      body: i18n("2d711b09bd0db0ad240cc83b30dd8014")
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderBody',
      preferTag: i18n("027446c2f9070b0f5b16a18208bf5fc7")
    }];
    _this.panelTitle = i18n("d87f215d9ac688b1d3399bf575a0ef6f");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            type: 'button-group-select',
            label: tipedLabel(i18n("97d03d4621f0024cf045afbd901197a5"), i18n("44705bb94d83e7bd6b3b6c1480ebfb38")),
            name: 'checkOnItemClick',
            options: [{
              label: i18n("e30a958a6397e53fae9d5316e851d3aa"),
              value: true
            }, {
              label: i18n("31ad7a215f3df84c33b8c28223147b8e"),
              value: false
            }],
            pipeIn: defaultValue(false)
          }, getSchemaTpl('switch', {
            label: tipedLabel(i18n("563ae5ccda5004fa1fce77c1ed5bf057"), i18n("aeca6900b9e45f7f235eb9d443f0dd61")),
            name: 'hideCheckToggler',
            visibleOn: 'this.checkOnItemClick'
          })]
        }, getSchemaTpl('status', {
          isFormItem: false
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [getSchemaTpl('className', {
            name: 'bodyClassName',
            label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
            visibleOn: 'this.icon'
          }),
          // TODO
          getSchemaTpl('className', {
            name: 'selectedClassName',
            label: i18n("1d4103a96a70de2cb69dd597d679fefe"),
            visibleOn: 'this.icon'
          })]
        })])
      }])];
    };
    return _this;
  }
  Card2Plugin.id = 'Card2Plugin';
  Card2Plugin.scene = ['layout'];
  return Card2Plugin;
}(BasePlugin);
registerEditorPlugin(Card2Plugin);

export { Card2Plugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
