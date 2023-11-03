/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import React__default from 'react';
import { translateSchema, getSchemaTpl, mapReactElement, VRenderer, RegionWrapper, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import findIndex from 'lodash/findIndex';
import { AnchorNavSection } from 'amis-ui';
import { registerFilter } from 'amis-formula';
import { i18n } from 'i18n-runtime';

registerFilter('appTranslate', function (input) {
  return translateSchema(input);
});
var AnchorNavPlugin = /** @class */function (_super) {
  __extends(AnchorNavPlugin, _super);
  function AnchorNavPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'anchor-nav';
    _this.$schema = '/schemas/AnchorNavSchema.json';
    // 组件名称
    _this.name = i18n("bede211909a1022b13e9728ed162b77e");
    _this.isBaseComponent = true;
    _this.description = i18n("f6da8aa86fa3e399da95dab399a67985");
    _this.docLink = '/amis/zh-CN/components/anchor-nav';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-link';
    _this.pluginIcon = 'anchor-nav-plugin';
    _this.scaffold = {
      type: 'anchor-nav',
      links: [{
        title: i18n("5879dec0aea52871e0ae6969893a315b"),
        href: '1',
        body: [{
          type: 'tpl',
          tpl: i18n("ce08bc4247c040bac13155befc7c1638"),
          wrapperComponent: '',
          inline: false
        }]
      }, {
        title: i18n("d89a42cb938819f67172ea64037c19fe"),
        href: '2',
        body: [{
          type: 'tpl',
          tpl: i18n("96f05e63c6f606925636d6810167e7ea"),
          wrapperComponent: '',
          inline: false
        }]
      }, {
        title: i18n("31327b9041b825a0b455b3ff9ddd3909"),
        href: '3',
        body: [{
          type: 'tpl',
          tpl: i18n("68284dd430993f495a6f2254ae5480ae"),
          wrapperComponent: '',
          inline: false
        }]
      }]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("bede211909a1022b13e9728ed162b77e");
    _this.panelJustify = true;
    _this.panelBody = [getSchemaTpl('tabs', [{
      title: i18n("24d67862f87f439db7ca957aecb77cce"),
      body: getSchemaTpl('collapseGroup', [{
        title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), getSchemaTpl('combo-container', {
          type: 'combo',
          name: 'links',
          label: i18n("9ad515106f02f3909974b75d22625b0d"),
          mode: 'normal',
          multiple: true,
          draggable: true,
          minLength: 1,
          addButtonText: i18n("40c6e9ed3d9949a326f5a216d936324d"),
          deleteBtn: {
            icon: 'fa fa-trash'
          },
          items: [getSchemaTpl('anchorTitle')],
          scaffold: {
            title: i18n("6be15e9949e4be7fc485e1eaae472942"),
            href: '',
            body: [{
              type: 'tpl',
              tpl: i18n("c624c875ea37f790665d0cae8959d4e2"),
              wrapperComponent: '',
              inline: false
            }]
          },
          draggableTip: '',
          onChange: function (value, oldValue, model, form) {
            var active = form.data.active;
            var isInclude = value.findIndex(function (link) {
              return link.href === active;
            }) > -1;
            form.setValues({
              active: isInclude ? active : value[0].href
            });
          },
          pipeOut: function (value) {
            var hrefs = value.map(function (item) {
              return item.href;
            });
            var findMinCanUsedKey = function (keys, max) {
              for (var i = 1; i <= max; i++) {
                if (!keys.includes(String(i))) {
                  return String(i);
                }
              }
            };
            value.forEach(function (item) {
              if (!item.href) {
                var key = findMinCanUsedKey(hrefs, value.length);
                item.href = key;
                item.title = i18n("6be15e9949e4be7fc485e1eaae472942").concat(key);
                item.body[0].tpl = i18n("c624c875ea37f790665d0cae8959d4e2").concat(key);
              }
            });
            return value;
          }
        }), {
          name: 'active',
          type: 'select',
          label: i18n("39f4fbc5b5ba681f7e8c4d4a4ddb3e2f"),
          source: '${links|appTranslate}',
          labelField: 'title',
          valueField: 'href',
          value: '1'
        }]
      }, getSchemaTpl('status')])
    }, {
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: getSchemaTpl('collapseGroup', [{
        title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
        body: [{
          type: 'button-group-select',
          name: 'direction',
          label: i18n("9959b2ad2d4f75f7a6be46872642df6d"),
          value: 'vertical',
          options: [{
            label: i18n("4cde06e6162ed66720e3133cb83bc059"),
            value: 'horizontal'
          }, {
            label: i18n("75ac842f8e77305846f1d776f97dfaf8"),
            value: 'vertical'
          }]
        }]
      }, getSchemaTpl('style:classNames', {
        isFormItem: false,
        schema: [getSchemaTpl('className', {
          name: 'linkClassName',
          label: i18n("056f2d7df6e6b64625c3a2d27ce07b05")
        }), getSchemaTpl('className', {
          name: 'sectionClassName',
          label: i18n("696754a8b2b23e30b11187303d1238f5")
        })]
      })])
    }])];
    _this.patchContainers = ['anchor-nav.body'];
    _this.vRendererConfig = {
      regions: {
        body: {
          key: 'body',
          label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
          renderMethod: 'renderBody',
          renderMethodOverride: function (regions, insertRegion) {
            return function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              var info = this.props.$$editor;
              var dom = this.super.apply(this, __spreadArray([], __read(args), false));
              if (info && !this.props.children) {
                return insertRegion(this, dom, regions, info, info.plugin.manager);
              }
              return dom;
            };
          }
        }
      },
      panelTitle: i18n("33be689a0f0de129ce37f7a96052002e"),
      panelJustify: true,
      panelBody: [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('anchorNavTitle')]
        }])]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4434b33a8731a73613ba5fa1eb984efb"),
          body: [getSchemaTpl('className')]
        }])]
      }])]
    };
    _this.wrapperProps = {
      unmountOnExit: true,
      mountOnEnter: true
    };
    _this.sectionWrapperResolve = function (dom) {
      return dom.parentElement;
    };
    _this.overrides = {
      render: function () {
        var _this = this;
        var dom = this.super();
        if (!this.renderSection && this.props.$$editor && dom) {
          var links_1 = this.props.links;
          return mapReactElement(dom, function (item) {
            var _a, _b;
            if (item.type === AnchorNavSection && item.props.$$id) {
              var id_1 = item.props.$$id;
              var index = findIndex(links_1, function (link) {
                return link.$$id === id_1;
              });
              var info = _this.props.$$editor;
              var plugin = info.plugin;
              if (~index) {
                var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.body;
                if (!region) {
                  return item;
                }
                return React__default.cloneElement(item, {
                  children: React__default.createElement(VRenderer, {
                    key: id_1,
                    type: info.type,
                    plugin: info.plugin,
                    renderer: info.renderer,
                    "$schema": "/schemas/SectionSchema.json",
                    hostId: info.id,
                    memberIndex: index,
                    name: "".concat(item.props.title || "\u951A\u70B9\u5185\u5BB9".concat(index + 1)),
                    id: id_1,
                    draggable: false,
                    removable: false,
                    wrapperResolve: plugin.sectionWrapperResolve,
                    schemaPath: "".concat(info.schemaPath, "/anchor-nav/").concat(index),
                    path: "".concat(_this.props.$path, "/").concat(index),
                    data: _this.props.data
                  }, React__default.createElement(RegionWrapper, {
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
  AnchorNavPlugin.id = 'AnchorNavPlugin';
  return AnchorNavPlugin;
}(BasePlugin);
registerEditorPlugin(AnchorNavPlugin);

export { AnchorNavPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
