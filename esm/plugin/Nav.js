/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import React__default from 'react';
import { TooltipWrapper } from 'amis-ui';
import { getSchemaTpl, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var NavPlugin = /** @class */function (_super) {
  __extends(NavPlugin, _super);
  function NavPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'nav';
    _this.$schema = '/schemas/NavSchema.json';
    // 组件名称
    _this.name = i18n("056f2d7df6e6b64625c3a2d27ce07b05");
    _this.isBaseComponent = true;
    _this.description = i18n("f6a5891819c67a80c1179c7cdaa00935");
    _this.docLink = '/amis/zh-CN/components/nav';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-map-signs';
    _this.pluginIcon = 'nav-plugin';
    _this.scaffold = {
      type: 'nav',
      stacked: true,
      links: [{
        label: i18n("4cb18f42ea06a97b382397c40ed64fb2"),
        to: '?id=1',
        target: '_self',
        id: '0'
      }, {
        label: i18n("a004407ac524b6d331671fb7a013c3fc"),
        to: '?id=2',
        target: '_self',
        id: '1'
      }]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("056f2d7df6e6b64625c3a2d27ce07b05");
    _this.panelDefinitions = {
      links: {
        label: i18n("310c10c1fcd37bf760bc15c30f54e722"),
        name: 'links',
        type: 'combo',
        multiple: true,
        draggable: true,
        addButtonText: i18n("ba750e6e302292402a4c61ed72331cba"),
        multiLine: true,
        messages: {
          validateFailed: i18n("f7a63e1e77fac1bfa05a060d55e27692")
        },
        scaffold: {
          label: '',
          to: ''
        },
        items: [getSchemaTpl('label', {
          label: i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
          required: true
        }), {
          type: 'input-text',
          name: 'to',
          label: i18n("7fa141f341e173e2339dcf0ce6869b5c"),
          required: true
        }, getSchemaTpl('switch', {
          label: i18n("136ecd1380f3fa10c1fd99b93c63fc9b"),
          name: 'target',
          pipeIn: function (value) {
            return value === '_parent';
          },
          pipeOut: function (value) {
            return value ? '_parent' : '_blank';
          }
        }), getSchemaTpl('icon', {
          name: 'icon',
          label: i18n("5ef69f62dc668c1a3e68b51c50a2530a")
        }), getSchemaTpl('switch', {
          label: i18n("9778ba8e0cbbae9471485dfc28df8948"),
          name: 'unfolded'
        }), {
          type: 'group',
          label: i18n("720fc47e20be9b7a2e67a4ed808b3bf2"),
          direction: 'vertical',
          className: 'm-b-none',
          labelRemark: {
            trigger: 'click',
            rootClose: true,
            className: 'm-l-xs',
            content: i18n("a6ed2640c41d0e3df4acb4f15d37f6e3"),
            placement: 'left'
          },
          body: [{
            name: 'active',
            type: 'radios',
            inline: true,
            // pipeIn: (value:any) => typeof value === 'boolean' ? value : '1'
            options: [{
              label: i18n("0a60ac8f02ccd2cf723f927284877851"),
              value: true
            }, {
              label: i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
              value: false
            }, {
              label: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
              value: ''
            }]
          }, {
            name: 'activeOn',
            autoComplete: false,
            visibleOn: 'typeof this.active !== "boolean"',
            type: 'input-text',
            placeholder: i18n("dc55fd2e990771fd670743ca5dd59275"),
            className: 'm-t-n-sm'
          }]
        }, getSchemaTpl('switch', {
          label: i18n("78b7cf23a2b93db1ec36e6c6cfe170db"),
          name: 'children',
          pipeIn: function (value) {
            return !!value;
          },
          pipeOut: function (value) {
            return value ? [{
              label: '',
              to: ''
            }] : undefined;
          },
          messages: {
            validateFailed: i18n("710b20ff1d85f7965bfaac44ae26344e")
          }
        }), {
          name: 'children',
          $ref: 'links',
          visibleOn: 'this.children',
          label: i18n("02f925f6a5136c2b65b5da8d1216b5b8"),
          addButtonText: i18n("59ad4734917af165482774de9c2d50cc")
        }]
      }
    };
    // 事件定义
    _this.events = [{
      eventName: 'click',
      eventLabel: i18n("18eae9f567a9c425bf59147a2601ee6a"),
      description: i18n("12b91237057ca7d81d50cca9873c8267"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("85f1708454f409855d552f702ac27b19")
          }
        }
      }]
    }, {
      eventName: 'change',
      eventLabel: i18n("0a974408aab362095e939e5364315971"),
      description: i18n("4b5f4893cf06a9d9ea5b8486bef87c26"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3")
          }
        }
      }]
    }, {
      eventName: 'toggled',
      eventLabel: i18n("9b317a5d43f72026b0c0699b1d596436"),
      description: i18n("9ef3c85c39e1e686f6b8c58292352ce1"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3")
          }
        }
      }]
    }, {
      eventName: 'collapsed',
      eventLabel: i18n("afce1df2e30a4674f507292d642fe270"),
      description: i18n("4015091668f286adf085d60a040f89a1"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3")
          }
        }
      }]
    }, {
      eventName: 'loaded',
      eventLabel: i18n("2631c12c40aa18fff4c6a2793f03f95b"),
      description: i18n("26a92da0738fed6a6178be565cfb3a59"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3")
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'updateItems',
      actionLabel: i18n("67d8dc76a8c8a3f0f52232969d72e8bb"),
      description: i18n("12fbc0729d69e4243c4818093e96de8c")
    }, {
      actionType: 'collapse',
      actionLabel: i18n("afce1df2e30a4674f507292d642fe270"),
      description: i18n("ee621e1f1429f1150a69bd02eecf6964")
    }, {
      actionType: 'reload',
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }];
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('switch', {
            name: 'stacked',
            label: i18n("e0e2b0cf2a3c8379b1d9144b10b3824d"),
            pipeIn: function (value) {
              return !value;
            },
            pipeOut: function (value) {
              return !value;
            }
          }), getSchemaTpl('switch', {
            name: 'mode',
            label: [{
              children: React__default.createElement(TooltipWrapper, {
                tooltipClassName: "ae-nav-tooltip-wrapper",
                trigger: "hover",
                rootClose: true,
                placement: "top",
                tooltipTheme: "dark",
                style: {
                  fontSize: '12px'
                },
                tooltip: {
                  children: function () {
                    return React__default.createElement("div", null, React__default.createElement("span", null, i18n("8dd27bbe64ec245ce449caab5cf7f12b")), React__default.createElement("div", {
                      className: "nav-mode-gif"
                    }));
                  }
                }
              }, React__default.createElement("span", null, i18n("154a7ec36c43427f73705ae834967703")))
            }],
            visibleOn: 'this.stacked',
            pipeIn: function (value) {
              return value === 'float';
            },
            pipeOut: function (value) {
              return value ? 'float' : 'inline';
            }
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("47b4e22880eb59ce9989b8419222e88a"), i18n("9dcb6b749d6682f1ac51b2dcdefd3208")),
            visibleOn: 'this.stacked && this.mode !== "float"',
            name: 'accordion'
          }), {
            type: 'input-number',
            name: 'defaultOpenLevel',
            label: tipedLabel(i18n("49a84da9b39148af54903ba4c6ed257f"), i18n("d4b70ea3a756ec4d06c8ecb2f27330ab")),
            visibleOn: 'this.stacked && this.mode !== "float"',
            mode: 'horizontal',
            labelAlign: 'left'
          }, {
            type: 'input-number',
            name: 'level',
            label: tipedLabel(i18n("96198d14846a941a60824bd6ebda4d9e"), i18n("cac013d011fe1ac71c3b9f0bd0594d65")),
            mode: 'horizontal',
            labelAlign: 'left'
          }]
        }, {
          title: i18n("7419d6bab78d959d5c3b7a38f9888258"),
          body: [getSchemaTpl('navControl'),
          // 角标
          getSchemaTpl('nav-badge', {
            visibleOn: 'this.links'
          })
          // 默认选中菜单
          // getSchemaTpl('nav-default-active', {
          //   visibleOn: 'this.links'
          // })
          ]
        },
        // {
        //   title: '高级',
        //   body: [
        //     getSchemaTpl('switch', {
        //       name: 'draggable',
        //       label: '拖拽排序',
        //       visibleOn:
        //         'this.source && this.source !== "${amisStore.app.portalNav}"'
        //     }),
        //     getSchemaTpl('switch', {
        //       name: 'dragOnSameLevel',
        //       label: '仅同级拖拽',
        //       visibleOn: 'this.draggable'
        //     }),
        //     getSchemaTpl('apiControl', {
        //       name: 'saveOrderApi',
        //       label: '保存排序接口',
        //       mode: 'normal',
        //       visibleOn:
        //         'this.source && this.source !== "${amisStore.app.portalNav}"'
        //     })
        //   ]
        // },
        {
          title: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          body: [getSchemaTpl('hidden')]
        }])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', getSchemaTpl('style:common', ['layout']))
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
  NavPlugin.id = 'NavPlugin';
  NavPlugin.scene = ['layout'];
  return NavPlugin;
}(BasePlugin);
registerEditorPlugin(NavPlugin);

export { NavPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
