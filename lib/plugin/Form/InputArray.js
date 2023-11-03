/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var React = require('react');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ArrayControlPlugin = /** @class */function (_super) {
  tslib.__extends(ArrayControlPlugin, _super);
  function ArrayControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-array';
    _this.$schema = '/schemas/ArrayControlSchema.json';
    _this.disabledRendererPlugin = true;
    // 组件名称
    _this.name = i18nRuntime.i18n("b6946d13d670fc49b721b626bca426b7");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-bars';
    _this.pluginIcon = 'input-array-plugin';
    _this.description = i18nRuntime.i18n("6e43f86d0b2973c34078bc7c7bc02eb0");
    _this.docLink = '/amis/zh-CN/components/form/input-array';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-array',
      label: i18nRuntime.i18n("b6946d13d670fc49b721b626bca426b7"),
      name: 'array',
      items: {
        type: 'input-text',
        placeholder: i18nRuntime.i18n("02cc4f8f5a9aefbc03c778f7a5c989c7")
      }
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: ['row1', ''],
        draggable: true
      })]
    };
    _this.panelTitle = i18nRuntime.i18n("a4b72cd5d7c953c57b00e3597b9ef666");
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), amisEditorCore.getSchemaTpl('switchDefaultValue'), {
        type: 'textarea',
        name: 'value',
        label: i18nRuntime.i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
        visibleOn: 'typeof this.value !== "undefined"',
        pipeOut: amisEditorCore.valuePipeOut
      }, {
        children: React__default["default"].createElement(amis.Button, {
          size: "sm",
          level: "danger",
          className: "m-b",
          block: true,
          onClick: _this.editDetail.bind(_this, context.id)
        }, i18nRuntime.i18n("50bfed6ada3e7d0ef4d20eb727b3d7df"))
      }, amisEditorCore.getSchemaTpl('switch', {
        label: i18nRuntime.i18n("7f2579cabd4d654458a720eed517a37d"),
        name: 'addable',
        pipeIn: amisEditorCore.defaultValue(true)
      }), {
        label: i18nRuntime.i18n("ea1e5695bf682ea3b31aba0c35198ae3"),
        name: 'addButtonText',
        type: 'input-text',
        visibleOn: 'data.addable',
        pipeIn: amisEditorCore.defaultValue(i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191"))
      }, {
        type: 'textarea',
        name: 'scaffold',
        label: i18nRuntime.i18n("aab09f676645f2651655a711d5e3327c"),
        visibleOn: 'this.addable !== false',
        pipeOut: amisEditorCore.valuePipeOut,
        pipeIn: amisEditorCore.defaultValue('')
      }, amisEditorCore.getSchemaTpl('switch', {
        label: i18nRuntime.i18n("1ab31449faaaeeeb7200d724eab9a7ab"),
        name: 'removable',
        pipeIn: amisEditorCore.defaultValue(true)
      }), amisEditorCore.getSchemaTpl('api', {
        name: 'deleteApi',
        label: i18nRuntime.i18n("fa3e9f9e49f5a81c998f949155f86b50"),
        visibleOn: 'data.removable'
      }), {
        label: i18nRuntime.i18n("f962922d46ef18e68127642e5c00165a"),
        name: 'deleteConfirmText',
        type: 'input-text',
        visibleOn: 'data.deleteApi',
        pipeIn: amisEditorCore.defaultValue(i18nRuntime.i18n("fc763fd5ddf637fe4ba1ac59e10b8d3a"))
      }, amisEditorCore.getSchemaTpl('switch', {
        name: 'draggable',
        label: i18nRuntime.i18n("89e34c77922f9362fc8f4033e7f6bdf4")
      }), {
        name: 'draggableTip',
        visibleOn: 'data.draggable',
        type: 'input-text',
        label: i18nRuntime.i18n("1362211a6bfc8cc4130d54643e8e9732"),
        pipeIn: amisEditorCore.defaultValue(i18nRuntime.i18n("91396e9bc25c9e8b63907fe22408e2bb"))
      }, {
        name: 'addButtonText',
        type: 'input-text',
        label: i18nRuntime.i18n("ea1e5695bf682ea3b31aba0c35198ae3"),
        pipeIn: amisEditorCore.defaultValue(i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191"))
      }, amisEditorCore.getSchemaTpl('minLength'), amisEditorCore.getSchemaTpl('maxLength')];
    };
    return _this;
  }
  ArrayControlPlugin.prototype.filterProps = function (props) {
    props = amisEditorCore.JSONPipeOut(props);
    // 至少显示一个成员，否则啥都不显示。
    if (!props.value) {
      props.value = [''];
    }
    return props;
  };
  ArrayControlPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info;
    if (info.renderer.name === 'input-array') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18nRuntime.i18n("50bfed6ada3e7d0ef4d20eb727b3d7df"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  ArrayControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id;
      _a.schema;
      _a.region;
      var info = _a.info;
    if (info.renderer.name === 'input-array') {
      menus.push('|', {
        label: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  ArrayControlPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("50bfed6ada3e7d0ef4d20eb727b3d7df"),
      value: value.items,
      slot: {
        type: 'form',
        mode: 'normal',
        body: '$$',
        wrapWithPanel: false,
        className: 'wrapper'
      },
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          items: newValue
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      }
    });
  };
  ArrayControlPlugin.id = 'ArrayControlPlugin';
  return ArrayControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ArrayControlPlugin);

exports.ArrayControlPlugin = ArrayControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
