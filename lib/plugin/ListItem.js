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
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ListItemPlugin = /** @class */function (_super) {
  tslib.__extends(ListItemPlugin, _super);
  function ListItemPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'list-item';
    _this.isBaseComponent = true;
    _this.$schema = '/schemas/ListItemSchema.json';
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderBody',
      preferTag: i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")
    }, {
      key: 'actions',
      label: i18nRuntime.i18n("3b49c8cece3f495f0e76b73823c68bfa"),
      preferTag: i18nRuntime.i18n("fa966345577ba81af19408f203db968f"),
      renderMethod: 'renderRight',
      insertPosition: 'inner'
    }];
    _this.panelTitle = i18nRuntime.i18n("d9eac94850a74ec881198f4ffe4edcfa");
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
        body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), {
          name: 'title',
          type: i18nEnabled ? 'input-text-i18n' : 'input-text',
          label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
          descrition: i18nRuntime.i18n("3ed7b428165499a1b91ed1eb287ba343")
        }, {
          name: 'subTitle',
          type: i18nEnabled ? 'input-text-i18n' : 'input-text',
          label: i18nRuntime.i18n("72cf373be86a38b29f6d2f15900b0da1"),
          descrition: i18nRuntime.i18n("3ed7b428165499a1b91ed1eb287ba343")
        }, {
          name: 'avatar',
          type: 'input-text',
          label: i18nRuntime.i18n("f7a82c9758acc4ff4c5350182f2ca378"),
          descrition: i18nRuntime.i18n("3ed7b428165499a1b91ed1eb287ba343")
        }, {
          name: 'desc',
          type: i18nEnabled ? 'textarea-i18n' : 'textarea',
          label: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
          descrition: i18nRuntime.i18n("3ed7b428165499a1b91ed1eb287ba343")
        }]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('className', {
          name: 'avatarClassName',
          label: i18nRuntime.i18n("b8e1e46cbdea20de4e5fc130d31b7bcc"),
          pipeIn: amisEditorCore.defaultValue('thumb-sm avatar m-r')
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'titleClassName',
          label: i18nRuntime.i18n("620868e5e60e5c22249c3277c971bb13")
        })]
      }]);
    };
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
          "$schema": "/schemas/ListBodyField.json",
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
  ListItemPlugin.prototype.getRendererInfo = function (_a) {
    var renderer = _a.renderer,
      schema = _a.schema;
    if (schema.$$id && this.rendererName === renderer.name) {
      // 复制部分信息出去
      return {
        name: this.panelTitle,
        regions: this.regions,
        // patchContainers: plugin.patchContainers,
        // // wrapper: plugin.wrapper,
        // vRendererConfig: plugin.vRendererConfig,
        // wrapperProps: plugin.wrapperProps,
        // wrapperResolve: plugin.wrapperResolve,
        // filterProps: plugin.filterProps,
        $schema: this.$schema
        // renderRenderer: plugin.renderRenderer
      };
    }
  };
  /*exchangeRenderer(id: string) {
    this.manager.showReplacePanel(id, '展示');
  }*/
  // 自动插入 label
  ListItemPlugin.prototype.beforeInsert = function (event) {
    var _a, _b, _c, _d;
    var context = event.context;
    if ((context.info.plugin === this || ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) && context.region === 'body') {
      context.data = tslib.__assign(tslib.__assign({}, context.data), {
        label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : i18nRuntime.i18n("bcee820bc20342a4d388a35ed32a35fe")
      });
    }
  };
  ListItemPlugin.id = 'ListItemPlugin';
  ListItemPlugin.scene = ['layout'];
  return ListItemPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ListItemPlugin);

exports.ListItemPlugin = ListItemPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
