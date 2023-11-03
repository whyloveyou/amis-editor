/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var findIndex = require('lodash/findIndex');
var amis = require('amis');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var findIndex__default = /*#__PURE__*/_interopDefaultLegacy(findIndex);

var TabsPlugin = /** @class */function (_super) {
  tslib.__extends(TabsPlugin, _super);
  function TabsPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'tabs';
    _this.$schema = '/schemas/TabsSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("9377e388f7189d6103a3985a321115c8");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("a8b1273cb2d53ad858906ff9744a9891");
    _this.docLink = '/amis/zh-CN/components/tabs';
    _this.tags = [i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.icon = 'fa fa-folder-o';
    _this.pluginIcon = 'tabs-plugin';
    _this.scaffold = {
      type: 'tabs',
      tabs: [{
        title: i18nRuntime.i18n("f78416dbd6c6a40a3ecd1c1f2b0672c8"),
        body: i18nRuntime.i18n("9769ee568100b0c530a06ec3f0c0044d")
      }, {
        title: i18nRuntime.i18n("4be268145385303e8ebeb480458a380e"),
        body: i18nRuntime.i18n("c50159e2acff0f4ffdce4c67ec3513a3")
      }]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.notRenderFormZone = true;
    _this.regions = [{
      key: 'toolbar',
      label: i18nRuntime.i18n("012f602372cd2dbd639cd966c63e1f90"),
      preferTag: i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")
    }];
    _this.panelTitle = i18nRuntime.i18n("9377e388f7189d6103a3985a321115c8");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("e1112a529dc969a03bbbb409905ff2ec"),
      description: i18nRuntime.i18n("e1112a529dc969a03bbbb409905ff2ec"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("b04c6cf9cb1212b9c173ddfeec129028")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'changeActiveKey',
      actionLabel: i18nRuntime.i18n("7bb3e24cc54f4b8ee0a65d14fa4c067c"),
      description: i18nRuntime.i18n("fcd3abb110aab48ebd0ac2a1d7040d6d"),
      config: ['activeKey'],
      descDetail: function (info) {
        var _a;
        return React__default["default"].createElement("div", null, i18nRuntime.i18n("9d000284174ff09642502803887f28ed"), React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.activeKey), i18nRuntime.i18n("29645b509093191cad34c673c1b3efb7"));
      },
      schema: helper.getArgsWrapper(amisEditorCore.getSchemaTpl('formulaControl', {
        name: 'activeKey',
        label: i18nRuntime.i18n("9578012b7d75a3a47c76acc176caf403"),
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal'
      }))
    }];
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isNewTabMode = 'data.tabsMode !=="vertical" && data.tabsMode !=="sidebar" && data.tabsMode !=="chrome"';
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('combo-container', {
            type: 'combo',
            label: i18nRuntime.i18n("9377e388f7189d6103a3985a321115c8"),
            mode: 'normal',
            name: 'tabs',
            draggableTip: '',
            draggable: true,
            multiple: true,
            minLength: 1,
            scaffold: {
              title: i18nRuntime.i18n("9377e388f7189d6103a3985a321115c8"),
              body: {
                type: 'tpl',
                tpl: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
                inline: false
              }
            },
            items: [amisEditorCore.getSchemaTpl('title', {
              label: false,
              required: true
            })]
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'showTip',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("3ba265c6b63bde0319822afd6b9a649d"), i18nRuntime.i18n("b744b72fd649d904e561358fc26c455f")),
            visibleOn: isNewTabMode,
            clearValueOnHidden: true
          }), {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6c200daeb748ecce2c730d01837d3508"), i18nRuntime.i18n("bd749c7a75af1236325d8d669e9bc5fc")),
            type: 'input-text',
            name: 'defaultKey',
            placeholder: i18nRuntime.i18n("8b4de52c23ad472b9ece9e30d8750c48"),
            pipeOut: function (data) {
              return data === '' || isNaN(Number(data)) ? data : Number(data);
            }
          }, {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("7806807651c37e4467f9d2fc1c18eb2a"), i18nRuntime.i18n("8a59e0a5705fea1751d77a97b7bf5d8d")),
            type: 'input-text',
            name: 'activeKey',
            placeholder: i18nRuntime.i18n("27e0d57c4412bcb89e6aaeeb1e5935fe"),
            pipeOut: function (data) {
              return data === '' || isNaN(Number(data)) ? data : Number(data);
            }
          }]
        }, amisEditorCore.getSchemaTpl('status'), {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('sourceBindControl', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("45a4922d3f42d0b137c6845c4c77031f"), i18nRuntime.i18n("eadd1d64cd6ceb2c50554281cd2d3be0"))
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'mountOnEnter',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("5b9af1bc3012bb3c8e07b983b423ec17"), i18nRuntime.i18n("4bcecc15d16e8c851dc3d155b8f30929"))
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'unmountOnExit',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("12c6a62683d63e404d71a31c9cb5209c"), i18nRuntime.i18n("5b52bcb62a2e1dab99ef841b05395b6d"))
          })]
        }])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            name: 'tabsMode',
            label: i18nRuntime.i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
            type: 'select',
            options: [{
              label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
              value: ''
            }, {
              label: i18nRuntime.i18n("ecfcea4b381d761fecd512761bc07954"),
              value: 'line'
            }, {
              label: i18nRuntime.i18n("b30f254eccefa14c9980235bcbec74f9"),
              value: 'simple'
            }, {
              label: i18nRuntime.i18n("3d7443aeba7c8eaf1cbb42ad5232fa10"),
              value: 'strong'
            }, {
              label: i18nRuntime.i18n("d87f215d9ac688b1d3399bf575a0ef6f"),
              value: 'card'
            }, {
              label: i18nRuntime.i18n("ee5e5a588705699a51eb3c5778c3020a"),
              value: 'chrome'
            }, {
              label: i18nRuntime.i18n("c5b8044dacf2e63931d85e5e307a9168"),
              value: 'tiled'
            }, {
              label: i18nRuntime.i18n("22d18bf0c476ebe7aa9303108677ff2e"),
              value: 'radio'
            }, {
              label: i18nRuntime.i18n("75ac842f8e77305846f1d776f97dfaf8"),
              value: 'vertical'
            }, {
              label: i18nRuntime.i18n("5bff38cb05e3710a0c0cb16ed3ced78f"),
              value: 'sidebar'
            }],
            pipeIn: amisEditorCore.defaultValue('')
          }, amisEditorCore.getSchemaTpl('horizontal-align', {
            label: i18nRuntime.i18n("593c1c61592f80831f58b2e44cfe63fa"),
            name: 'sidePosition',
            pipeIn: amisEditorCore.defaultValue('left'),
            visibleOn: 'data.tabsMode === "sidebar"',
            clearValueOnHidden: true
          })]
        }, amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [amisEditorCore.getSchemaTpl('className', {
            name: 'linksClassName',
            label: i18nRuntime.i18n("030c8cb75e9707285b28c4931bfeddc5")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'toolbarClassName',
            label: i18nRuntime.i18n("012f602372cd2dbd639cd966c63e1f90")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'contentClassName',
            label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'showTipClassName',
            label: i18nRuntime.i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
            visibleOn: 'data.showTip',
            clearValueOnHidden: true
          })]
        })])]
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.patchContainers = ['tabs.body'];
    _this.vRendererConfig = {
      regions: {
        body: {
          key: 'body',
          label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
        }
      },
      panelTitle: i18nRuntime.i18n("d87f215d9ac688b1d3399bf575a0ef6f"),
      panelJustify: true,
      panelBodyCreator: function (context) {
        var i18nEnabled = amisEditorCore.getI18nEnabled();
        return amisEditorCore.getSchemaTpl('tabs', [{
          title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
          body: amisEditorCore.getSchemaTpl('collapseGroup', [{
            title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
            body: [{
              name: 'title',
              label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              required: true
            }, {
              type: 'ae-switch-more',
              formType: 'extend',
              mode: 'normal',
              label: i18nRuntime.i18n("32b4bc87bf7f95cd6094992f0135ff7f"),
              form: {
                body: [amisEditorCore.getSchemaTpl('icon'), amisEditorCore.getSchemaTpl('horizontal-align', {
                  label: i18nRuntime.i18n("d4d2a66820d30e07b44c850eb3f116c0"),
                  name: 'iconPosition',
                  pipeIn: amisEditorCore.defaultValue('left'),
                  visibleOn: 'data.icon',
                  clearValueOnHidden: true
                })]
              }
            }, {
              label: amisEditorCore.tipedLabel('Hash', i18nRuntime.i18n("996a919888ae86e842c76245daae2360")),
              name: 'hash',
              type: 'input-text'
            }]
          }, amisEditorCore.getSchemaTpl('status', {
            disabled: true
          }), {
            title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
            body: [amisEditorCore.getSchemaTpl('switch', {
              name: 'mountOnEnter',
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("f3051dd9b3538e170322fd5224b28de0"), i18nRuntime.i18n("ee51f2d49fa12c730d2a0efef0d67e44")),
              visibleOn: '!this.reload',
              clearValueOnHidden: true
            }), amisEditorCore.getSchemaTpl('switch', {
              name: 'unmountOnExit',
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("024f24defb08c5c9d463a2668cbb9802"), i18nRuntime.i18n("370bb4d6806c88a7df2ac17ca2a7b6a6")),
              visibleOn: '!this.reload',
              clearValueOnHidden: true
            })]
          }])
        }, {
          title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
          body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:classNames', {
            isFormItem: false
          })])
        }]);
      }
    };
    _this.wrapperProps = {
      unmountOnExit: true,
      mountOnEnter: true
    };
    _this.tabWrapperResolve = function (dom) {
      return dom.parentElement;
    };
    _this.overrides = {
      renderTabs: function () {
        var _this = this;
        var dom = this.super();
        if (!this.renderTab && this.props.$$editor && dom) {
          var tabs_1 = this.props.tabs;
          return amisEditorCore.mapReactElement(dom, function (item) {
            var _a, _b;
            if (item.type === amis.Tab && item.props.$$id) {
              var id_1 = item.props.$$id;
              var index = findIndex__default["default"](tabs_1, function (tab) {
                return tab.$$id === id_1;
              });
              var info = _this.props.$$editor;
              var plugin = info.plugin;
              if (~index) {
                var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.body;
                if (!region) {
                  return item;
                }
                return React__default["default"].cloneElement(item, {
                  children: React__default["default"].createElement(amisEditorCore.VRenderer, {
                    key: id_1,
                    type: info.type,
                    plugin: info.plugin,
                    renderer: info.renderer,
                    "$schema": "/schemas/TabSchema.json",
                    hostId: info.id,
                    memberIndex: index,
                    name: "".concat(item.props.title || i18nRuntime.i18n("d87f215d9ac688b1d3399bf575a0ef6f").concat(index + 1)),
                    id: id_1,
                    draggable: false,
                    wrapperResolve: plugin.tabWrapperResolve,
                    schemaPath: "".concat(info.schemaPath, "/tabs/").concat(index),
                    path: "".concat(_this.props.$path, "/").concat(index),
                    data: _this.props.data
                  }, React__default["default"].createElement(amisEditorCore.RegionWrapper, {
                    key: region.key,
                    preferTag: region.preferTag,
                    name: region.key,
                    label: region.label,
                    regionConfig: region,
                    placeholder: region.placeholder,
                    editorStore: plugin.manager.store,
                    manager: plugin.manager,
                    children: item.props.children,
                    wrapperResolve: region.wrapperResolve,
                    rendererName: info.renderer.name
                  }))
                });
              }
            }
            return item;
          });
        }
        return dom;
      }
    };
    return _this;
  }
  /**
   * 补充切换的 toolbar
   * @param context
   * @param toolbars
   */
  TabsPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
    if (context.info.plugin === this && context.info.renderer.name === 'tabs' && !context.info.hostId) {
      var node_1 = context.node;
      toolbars.push({
        level: 'secondary',
        icon: 'fa fa-chevron-left',
        tooltip: i18nRuntime.i18n("ad5a36ee5f4054594c30b6dc481e2d81"),
        onClick: function () {
          var control = node_1.getComponent();
          if (control === null || control === void 0 ? void 0 : control.switchTo) {
            var currentIndex = control.currentIndex();
            control.switchTo(currentIndex - 1);
          }
        }
      });
      toolbars.push({
        level: 'secondary',
        icon: 'fa fa-chevron-right',
        tooltip: i18nRuntime.i18n("49e0f68798e3c69b7990076bd8f1f47f"),
        onClick: function () {
          var control = node_1.getComponent();
          if (control === null || control === void 0 ? void 0 : control.switchTo) {
            var currentIndex = control.currentIndex();
            control.switchTo(currentIndex + 1);
          }
        }
      });
    }
  };
  TabsPlugin.prototype.onPreventClick = function (e) {
    var mouseEvent = e.context.data;
    if (mouseEvent.defaultPrevented) {
      return false;
    } else if (mouseEvent.target.closest('[role=tablist]>li')) {
      return false;
    }
    return;
  };
  TabsPlugin.id = 'TabsPlugin';
  return TabsPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TabsPlugin);

exports.TabsPlugin = TabsPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
