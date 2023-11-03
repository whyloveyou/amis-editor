/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisUi = require('amis-ui');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var flatten = require('lodash/flatten');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var flatten__default = /*#__PURE__*/_interopDefaultLegacy(flatten);

var CardPlugin = /** @class */function (_super) {
  tslib.__extends(CardPlugin, _super);
  function CardPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'card';
    _this.$schema = '/schemas/CardSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("d87f215d9ac688b1d3399bf575a0ef6f");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("f49d40842a3c66c4de2e57a48157c707");
    _this.docLink = '/amis/zh-CN/components/card';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = '';
    _this.pluginIcon = 'card-plugin';
    _this.scaffold = {
      type: 'card',
      header: {
        title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
        subTitle: i18nRuntime.i18n("72cf373be86a38b29f6d2f15900b0da1")
      },
      body: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
      actions: [{
        type: 'button',
        label: i18nRuntime.i18n("fa966345577ba81af19408f203db968f"),
        actionType: 'dialog',
        dialog: {
          title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
          body: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014")
        }
      }]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderBody',
      preferTag: i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")
    }, {
      key: 'actions',
      label: i18nRuntime.i18n("c8caf94205105bac5833ab31cc2129d7"),
      renderMethod: 'renderActions',
      wrapperResolve: function (dom) {
        return dom;
      },
      preferTag: i18nRuntime.i18n("fa966345577ba81af19408f203db968f")
    }];
    _this.panelTitle = i18nRuntime.i18n("d87f215d9ac688b1d3399bf575a0ef6f");
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: flatten__default["default"]([amisEditorCore.getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), {
          children: React__default["default"].createElement(amisUi.Button, {
            size: "sm",
            className: "m-b-sm",
            level: "info",
            block: true,
            onClick: function () {
              // this.manager.showInsertPanel('actions', context.id)
              return _this.manager.showRendererPanel(i18nRuntime.i18n("fa966345577ba81af19408f203db968f"), i18nRuntime.i18n("0212e8c9b113143a031d1f3e25167794"));
            }
          }, i18nRuntime.i18n("f9f2b9cc91cd332db6b2b732c3869233"))
        }, {
          children: React__default["default"].createElement("div", null, React__default["default"].createElement(amisUi.Button, {
            block: true,
            level: "primary",
            size: "sm",
            onClick: function () {
              // this.manager.showInsertPanel('body', context.id)
              return _this.manager.showRendererPanel(i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7"), i18nRuntime.i18n("6312e80e416fa79ff3383e1577c243b8"));
            }
          }, i18nRuntime.i18n("a3cf7c9ee581ae71eb51d18b610b05b6")))
        }, {
          type: 'divider'
        }, amisEditorCore.getSchemaTpl('cardTitle'), amisEditorCore.getSchemaTpl('cardSubTitle'), {
          name: 'header.avatar',
          type: 'input-text',
          label: i18nRuntime.i18n("f7a82c9758acc4ff4c5350182f2ca378"),
          description: i18nRuntime.i18n("00a1f644f34b9ee43adf82cb3449158c")
        }, {
          name: 'href',
          type: 'input-text',
          label: i18nRuntime.i18n("a3f38735bf211edb2066ac4e51b55cb2")
        }, amisEditorCore.getSchemaTpl('cardDesc'), {
          name: 'header.highlight',
          type: 'input-text',
          label: i18nRuntime.i18n("d85562778760b00b1372af642c4630e6"),
          description: i18nRuntime.i18n("4011e5fb23b422f755d81269a5242d22")
        }])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [{
          type: 'input-range',
          name: 'actionsCount',
          pipeIn: amisEditorCore.defaultValue(4),
          min: 1,
          max: 10,
          step: 1,
          label: i18nRuntime.i18n("d4f223e0619836d03d488c89558f38e7")
        }, amisEditorCore.getSchemaTpl('className', {
          name: 'titleClassName',
          label: i18nRuntime.i18n("620868e5e60e5c22249c3277c971bb13")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'highlightClassName',
          label: i18nRuntime.i18n("1fee6fa022c97f5dd7f48e362cea5acf")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'subTitleClassName',
          label: i18nRuntime.i18n("2a3c7d647a29fb7dc5aedabac216575e")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'descClassName',
          label: i18nRuntime.i18n("0e627e6a0ff773ee76bc4cc0871cb48d")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'avatarClassName',
          label: i18nRuntime.i18n("a5680444d449b2099b067e9963fe43aa")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'imageClassName',
          label: i18nRuntime.i18n("b8e1e46cbdea20de4e5fc130d31b7bcc")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'bodyClassName',
          label: i18nRuntime.i18n("a31119cb2fddee3366163a311f317cf7")
        }), amisEditorCore.getSchemaTpl('className')]
      }, {
        title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
        body: [amisEditorCore.getSchemaTpl('ref'), amisEditorCore.getSchemaTpl('visible')]
      }])];
    };
    /*exchangeRenderer(id: string) {
      this.manager.showReplacePanel(id, '展示');
    }*/
    _this.fieldWrapperResolve = function (dom) {
      return dom;
    };
    _this.overrides = {
      renderFeild: function (region, field, index, props) {
        var dom = this.super(region, field, index, props);
        var info = this.props.$$editor;
        if (!info || !field.$$id) {
          return dom;
        }
        var plugin = info.plugin;
        var id = field.$$id;
        return React__default["default"].createElement(amisEditorCore.VRenderer, {
          type: info.type,
          plugin: info.plugin,
          renderer: info.renderer,
          multifactor: true,
          key: id,
          "$schema": "/schemas/CardBodyField.json",
          hostId: info.id,
          memberIndex: index,
          name: "".concat(i18nRuntime.i18n("9caecd931b956381e0763d05aa42835c").concat(index + 1)),
          id: id,
          draggable: false,
          wrapperResolve: plugin.fieldWrapperResolve,
          schemaPath: "".concat(info.schemaPath, "/body/").concat(index),
          path: "".concat(this.props.$path, "/").concat(index),
          data: this.props.data
        }, dom);
      }
    };
    _this.vRendererConfig = {
      panelTitle: i18nRuntime.i18n("9caecd931b956381e0763d05aa42835c"),
      panelBodyCreator: function (context) {
        return [amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('className', {
          name: 'labelClassName',
          label: i18nRuntime.i18n("6d0034a2419e1f394dedab07994b9665"),
          visibleOn: 'this.label'
        })
        /*{
          children: (
            <Button
              size="sm"
              level="info"
              className="m-b"
              block
              onClick={this.exchangeRenderer.bind(this, context.id)}
            >
              更改渲染器类型
            </Button>
          )
        }*/];
      }
    };

    return _this;
  }
  // 自动插入 label
  CardPlugin.prototype.beforeInsert = function (event) {
    var _a, _b, _c, _d;
    var context = event.context;
    if ((context.info.plugin === this || ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) && context.region === 'body') {
      context.data = tslib.__assign(tslib.__assign({}, context.data), {
        label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : i18nRuntime.i18n("bcee820bc20342a4d388a35ed32a35fe")
      });
    }
  };
  CardPlugin.id = 'CardPlugin';
  CardPlugin.scene = ['layout'];
  return CardPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CardPlugin);

exports.CardPlugin = CardPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
