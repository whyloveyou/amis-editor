/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, undefinedPipeOut, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var presetColors = ['#2468f2', '#b8babf', '#528eff', '#30bf13', '#f33e3e', '#ff9326', '#fff', '#000'];
var TagPlugin = /** @class */function (_super) {
  __extends(TagPlugin, _super);
  function TagPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'tag';
    _this.$schema = '/schemas/TagSchema.json';
    // 组件名称
    _this.name = i18n("14d342362f66aa86e2aa1c1e11aa1204");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-tag';
    _this.pluginIcon = 'tag-plugin';
    _this.description = i18n("77ad0879912d0a306724c319eed113e2");
    _this.docLink = '/amis/zh-CN/components/tag';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.previewSchema = {
      type: 'tag',
      label: i18n("ee66d7a2d02188816d633d11cf1a8b27"),
      color: 'processing'
    };
    _this.scaffold = {
      type: 'tag',
      label: i18n("ee66d7a2d02188816d633d11cf1a8b27"),
      color: 'processing'
    };
    _this.panelTitle = i18n("14d342362f66aa86e2aa1c1e11aa1204");
    _this.panelJustify = true;
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
          },
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              label: {
                type: 'object',
                title: i18n("341fe804cc8b65dc17a31c7a25a90444")
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
          },
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              label: {
                type: 'object',
                title: i18n("341fe804cc8b65dc17a31c7a25a90444")
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
          },
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              label: {
                type: 'object',
                title: i18n("341fe804cc8b65dc17a31c7a25a90444")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'close',
      eventLabel: i18n("d04f139ee0fb6fac19ccaec0f7b323df"),
      description: i18n("fe7967a547915be9ae4083ed50c3b94a"),
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
          },
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              label: {
                type: 'object',
                title: i18n("341fe804cc8b65dc17a31c7a25a90444")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [];
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('valueFormula', {
            name: 'label',
            label: i18n("5cbd7ad8a3ecf059b62219c17fa58cae"),
            rendererSchema: {
              type: 'input-text'
            }
          }), {
            type: 'button-group-select',
            label: i18n("f0789e79d48f135e5d870753f7a85d05"),
            name: 'displayMode',
            value: 'normal',
            options: [{
              label: i18n("35242cff1266fd3610f124b0e5e76f9b"),
              value: 'normal'
            }, {
              label: i18n("0103eb2d3dca70270d1a74e9ec987ac9"),
              value: 'rounded'
            }, {
              label: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
              value: 'status'
            }],
            onChange: function (value, origin, item, form) {
              if (value !== 'status') {
                form.setValues({
                  icon: undefined
                });
              }
            }
          }, getSchemaTpl('icon', {
            visibleOn: 'data.displayMode === "status"',
            label: i18n("092c4410e162bb3371f2aab804501f24")
          }), getSchemaTpl('switch', {
            label: i18n("cbda486dbec5bdacb593294e240c5e63"),
            name: 'closable'
          })]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("6b36c6f7ec834692ec6c8e3816349fdd"),
          body: [{
            type: 'input-color',
            label: i18n("9970ad07468267e2f309f1467c75bb80"),
            name: 'color',
            presetColors: presetColors,
            pipeOut: undefinedPipeOut
          }, {
            type: 'input-color',
            label: i18n("2f97db95d75280bfedc5afa72d2c717d"),
            name: 'style.backgroundColor',
            presetColors: presetColors,
            pipeOut: undefinedPipeOut
          }, {
            type: 'input-color',
            label: i18n("961534b4ea37e4e88aada736b299d063"),
            name: 'style.borderColor',
            presetColors: presetColors,
            pipeOut: undefinedPipeOut
          }, {
            type: 'input-color',
            label: i18n("ca746b1ff10193a3ce20878dec04a733"),
            name: 'style.color',
            presetColors: presetColors,
            pipeOut: undefinedPipeOut
          }]
        }, getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  TagPlugin.id = 'TagPlugin';
  return TagPlugin;
}(BasePlugin);
registerEditorPlugin(TagPlugin);

export { TagPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
