/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var IconPlugin = /** @class */function (_super) {
  __extends(IconPlugin, _super);
  function IconPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'icon';
    _this.$schema = '/schemas/Icon.json';
    // 组件名称
    _this.name = i18n("5ef69f62dc668c1a3e68b51c50a2530a");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-calendar';
    _this.panelTitle = i18n("5ef69f62dc668c1a3e68b51c50a2530a");
    _this.description = i18n("6ca92e3386f9e392584367df5054c27c");
    _this.docLink = '/amis/zh-CN/components/icon';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.pluginIcon = 'button-plugin';
    _this.scaffold = {
      type: 'icon',
      icon: 'fa fa-spotify',
      vendor: ''
    };
    _this.previewSchema = {
      type: 'icon',
      icon: 'fa fa-spotify',
      vendor: ''
    };
    // 事件定义
    _this.events = [{
      eventName: 'click',
      eventLabel: i18n("4363c17ebb346b646af55bd8c8075915"),
      description: i18n("7af5e3ef39ff71d39fe3f645c8079124"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseenter',
      eventLabel: i18n("f6d767f39ba3bf955077a3c0ce81e581"),
      description: i18n("bcdd89d453da0dc0622a2f3189728357"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseleave',
      eventLabel: i18n("e272b0b8c7fedc670a87075514d9b49f"),
      description: i18n("727309bc724ff237c5e2cdf7a90cf28e"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }];
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('icon', {
            label: i18n("5ef69f62dc668c1a3e68b51c50a2530a")
          })]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("6f99b6eed37795cb97d5f6370c32113b"),
          body: [getSchemaTpl('theme:select', {
            label: i18n("c8339fd2a85af4ba66084d28df808de4"),
            name: 'themeCss.className.iconSize'
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("6b36c6f7ec834692ec6c8e3816349fdd"),
            name: "themeCss.className.font.color",
            labelMode: 'input'
          }), getSchemaTpl('theme:paddingAndMargin', {
            label: i18n("e8ed49e9fde0bb778e2185876c2d2697")
          })]
        }])
      }
      // {
      //   title: '事件',
      //   className: 'p-none',
      //   body: [
      //     getSchemaTpl('eventControl', {
      //       name: 'onEvent',
      //       ...getEventControlConfig(this.manager, context)
      //     })
      //   ]
      // }
      ])];
    };

    return _this;
  }
  IconPlugin.id = 'IconPlugin';
  return IconPlugin;
}(BasePlugin);
registerEditorPlugin(IconPlugin);

export { IconPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
