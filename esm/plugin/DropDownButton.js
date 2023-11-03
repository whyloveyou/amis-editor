/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { Button } from 'amis';
import React__default from 'react';
import { getSchemaTpl, defaultValue, tipedLabel, diff, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { BUTTON_DEFAULT_ACTION } from '../component/BaseControl.js';
import { i18n } from 'i18n-runtime';

var DropDownButtonPlugin = /** @class */function (_super) {
  __extends(DropDownButtonPlugin, _super);
  function DropDownButtonPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'dropdown-button';
    _this.$schema = '/schemas/DropdownButtonSchema.json';
    // 组件名称
    _this.name = i18n("cc70a816b7d61e7212d57335c0a15af5");
    _this.isBaseComponent = true;
    _this.description = i18n("74bafe23b0be1a14aa218b396cb33bd0");
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.icon = 'fa fa-chevron-down';
    _this.pluginIcon = 'dropdown-btn-plugin';
    _this.docLink = '/amis/zh-CN/components/dropdown-button';
    _this.scaffold = {
      type: 'dropdown-button',
      label: i18n("cc70a816b7d61e7212d57335c0a15af5"),
      buttons: [__assign({
        type: 'button',
        label: i18n("e9d2f66bbd44c96a3e03494bf6b1ebf0")
      }, BUTTON_DEFAULT_ACTION), __assign({
        type: 'button',
        label: i18n("ce35a17d2ba7caac95092a7a66ac9a0d")
      }, BUTTON_DEFAULT_ACTION)]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("cc70a816b7d61e7212d57335c0a15af5");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            children: React__default.createElement("div", {
              className: "mb-3"
            }, React__default.createElement(Button, {
              level: "info",
              size: "sm",
              className: "m-b-sm",
              block: true,
              onClick: _this.editDetail.bind(_this, context.id)
            }, i18n("213a4e49568569943403ff31fff31ee5")))
          }, getSchemaTpl('label', {
            label: i18n("b5b57c711fd2d2309cc390a8b44d2b69")
          }), {
            type: 'button-group-select',
            name: 'trigger',
            label: i18n("159dbc2fafd57b9d3652f16659b1b519"),
            size: 'sm',
            options: [{
              label: i18n("4363c17ebb346b646af55bd8c8075915"),
              value: 'click'
            }, {
              label: i18n("314454bbee226e4b32b612afdd8e9442"),
              value: 'hover'
            }],
            pipeIn: defaultValue('click')
          }, getSchemaTpl('switch', {
            name: 'closeOnOutside',
            label: i18n("4a757588f5aee8cd039b1d166b096d1a"),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('switch', {
            name: 'closeOnClick',
            label: i18n("9951d740257c40978c238a683b1d4a80")
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("205cb6cc6c8d37f3bed62d9c8bfae976"), i18n("697eb55e1c6cecf43e63a26232dda5b2")),
            name: 'defaultIsOpened'
          }), {
            type: 'button-group-select',
            name: 'align',
            label: i18n("b2aa282e908597d1d700c1f4de17b8aa"),
            size: 'sm',
            options: [{
              label: i18n("413f48cc71f71083ce532a86e3efdc21"),
              value: 'left'
            }, {
              label: i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
              value: 'right'
            }],
            pipeIn: defaultValue('left')
          }]
        }, getSchemaTpl('status', {
          disabled: true
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('size', {
            label: i18n("c8339fd2a85af4ba66084d28df808de4"),
            pipeIn: defaultValue('md')
          }), getSchemaTpl('switch', {
            name: 'block',
            label: tipedLabel(i18n("6aa6b9e2dca63d27dc74eb155020271d"), i18n("e57996d3d771141f1b3080bbd8ad605b"))
          }), getSchemaTpl('buttonLevel', {
            label: i18n("1ce673c48f29162208e75bc210307bfc"),
            name: 'level'
          })]
        }, {
          title: i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
          body: [
          // getSchemaTpl('switch', {
          //   label: '只显示 icon',
          //   name: 'iconOnly'
          // }),
          getSchemaTpl('switch', {
            label: i18n("c9e265ec462b61887af6f58928923925"),
            name: 'hideCaret'
          }), getSchemaTpl('icon', {
            label: i18n("c182ad6b97f0909596a523b1f04c28d2")
          }), getSchemaTpl('icon', {
            name: 'rightIcon',
            label: i18n("ad7e6f016bc1d9a9bbc6e18224d73247")
          })]
        }, getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [getSchemaTpl('className', {
            name: 'btnClassName',
            label: i18n("fa966345577ba81af19408f203db968f")
          }), getSchemaTpl('className', {
            name: 'menuClassName',
            label: i18n("938ac86e738246ccd0ca0224031f96af")
          })]
        })])]
      }]);
    };
    return _this;
  }
  DropDownButtonPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info;
    if (info.renderer.name === 'dropdown-button') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18n("213a4e49568569943403ff31fff31ee5"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  DropDownButtonPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    node && value && this.manager.openSubEditor({
      title: i18n("213a4e49568569943403ff31fff31ee5"),
      value: value.buttons,
      slot: {
        type: 'button-group',
        buttons: '$$',
        block: true
      },
      onChange: function (newValue) {
        newValue = __assign(__assign({}, value), {
          buttons: newValue
        });
        manager.panelChangeValue(newValue, diff(value, newValue));
      }
    });
  };
  DropDownButtonPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id;
      _a.schema;
      _a.region;
      var info = _a.info,
      selections = _a.selections;
    if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
      return;
    }
    if (info.renderer.name === 'dropdown-button') {
      menus.push('|', {
        label: i18n("213a4e49568569943403ff31fff31ee5"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  DropDownButtonPlugin.prototype.filterProps = function (props) {
    // trigger 为 hover 会影响编辑体验。
    props.trigger = 'click';
    return props;
  };
  DropDownButtonPlugin.id = 'DropDownButtonPlugin';
  DropDownButtonPlugin.scene = ['layout'];
  return DropDownButtonPlugin;
}(BasePlugin);
registerEditorPlugin(DropDownButtonPlugin);

export { DropDownButtonPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
