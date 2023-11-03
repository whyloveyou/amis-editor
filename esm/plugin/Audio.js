/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var AudioPlugin = /** @class */function (_super) {
  __extends(AudioPlugin, _super);
  function AudioPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'audio';
    _this.$schema = '/schemas/AudioSchema.json';
    // 组件名称
    _this.name = i18n("726dd5df4319e9e158e2ca3c22177b6c");
    _this.isBaseComponent = true;
    _this.description = i18n("e7a707f9fc7da36828db940ca2960f4b");
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-music';
    _this.pluginIcon = 'audio-plugin';
    _this.scaffold = {
      type: 'audio',
      autoPlay: false,
      src: ''
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("726dd5df4319e9e158e2ca3c22177b6c");
    _this.panelBodyCreator = function (context) {
      var isUnderField = /\/field\/\w+$/.test(context.path);
      return [getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), isUnderField ? {
          type: 'tpl',
          inline: false,
          className: 'text-info text-sm',
          tpl: i18n("37b12f2666b9e4e37f33eb5e83533d5e")
        } : null, getSchemaTpl('audioUrl', {
          name: 'src',
          type: 'input-text',
          label: i18n("f8f176147db276063e7ec15f076e39e0"),
          description: i18n("91d3cd46d6b6919749e56056d5acc9bc")
        }), {
          type: 'select',
          name: 'rates',
          label: i18n("a945269af10da66c82cdb7336bc490d1"),
          description: i18n("7ccd84ca5c16cd03d26f5ecd5e6f6bd2"),
          multiple: true,
          pipeIn: function (value) {
            return Array.isArray(value) ? value.join(',') : [];
          },
          pipeOut: function (value) {
            if (value && value.length) {
              var rates = value.split(',');
              rates = rates.filter(function (x) {
                return Number(x) && Number(x) > 0 && Number(x) <= 16;
              }).map(function (x) {
                return Number(Number(x).toFixed(1));
              });
              return Array.from(new Set(rates));
            } else {
              return [];
            }
          },
          options: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4']
        }, {
          name: 'controls',
          type: 'select',
          label: i18n("fc03b83d19e2fd12f1e7c56a11d7dc18"),
          multiple: true,
          extractValue: true,
          joinValues: false,
          options: [{
            label: i18n("d37d357dee041774b993daaf5c8bb752"),
            value: 'rates'
          }, {
            label: i18n("b85270cd3c06d8eb635eadcffbb10119"),
            value: 'play'
          }, {
            label: i18n("19fcb9eb2594059036dfede5f4ec53e8"),
            value: 'time'
          }, {
            label: i18n("c7bff79d059a0b7ff9b02441959d8be2"),
            value: 'process'
          }, {
            label: i18n("09b095d8fc867cb968673be9dcc00a93"),
            value: 'volume'
          }],
          pipeIn: defaultValue(['rates', 'play', 'time', 'process', 'volume']),
          labelRemark: {
            trigger: 'click',
            className: 'm-l-xs',
            rootClose: true,
            content: i18n("ad751bba0aed43a673c40b652a239fc3"),
            placement: 'left'
          }
        }, getSchemaTpl('switch', {
          name: 'autoPlay',
          label: i18n("54c6bb48170611ec995f634319312156")
        }), getSchemaTpl('switch', {
          name: 'loop',
          label: i18n("56e6ecf97176d30c06b30cfa428ef832")
        })]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('className'), getSchemaTpl('switch', {
          name: 'inline',
          label: i18n("2fb0853874c2cc8cc42f0c7520af662a"),
          pipeIn: defaultValue(true)
        })]
      }, {
        title: i18n("33bf801796fd255b5f6147e33146669b"),
        body: [getSchemaTpl('ref'), getSchemaTpl('visible')]
      }])];
    };
    return _this;
  }
  AudioPlugin.id = 'AudioPlugin';
  AudioPlugin.scene = ['layout'];
  return AudioPlugin;
}(BasePlugin);
registerEditorPlugin(AudioPlugin);

export { AudioPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
