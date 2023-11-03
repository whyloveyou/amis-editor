/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SubFormControlPlugin = /** @class */function (_super) {
  tslib.__extends(SubFormControlPlugin, _super);
  function SubFormControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-sub-form';
    _this.$schema = '/schemas/SubFormControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("d6c40a2ee219c010edbcdaa2eeb94ddd");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-window-restore';
    _this.pluginIcon = 'sub-form-plugin';
    _this.description = i18nRuntime.i18n("81e1ff0bb8917a9df99d737982ee24b7");
    _this.docLink = '/amis/zh-CN/components/form/input-sub-form';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-sub-form',
      name: 'subform',
      label: i18nRuntime.i18n("32f6f7f8164c7f78e4b46eb50c158ab9"),
      form: {
        title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
        body: [{
          type: 'input-text',
          label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb"),
          name: 'text'
        }]
      }
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18nRuntime.i18n("d6c40a2ee219c010edbcdaa2eeb94ddd");
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), {
        children: function (_a) {
          _a.value;
            _a.onChange;
          return React__default["default"].createElement(amis.Button, {
            size: "sm",
            level: "primary",
            className: "m-b",
            block: true,
            onClick: _this.editDetail.bind(_this, context.id)
          }, i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"));
        }
      }, {
        name: 'labelField',
        type: 'input-text',
        value: 'label',
        label: i18nRuntime.i18n("18c113b99afa964ee988f30e81baf12b"),
        description: i18nRuntime.i18n("4d930a9c13fca9d74e1a77496abfaa58")
      }, amisEditorCore.getSchemaTpl('btnLabel', {
        label: i18nRuntime.i18n("307ae20f587910da3e9bb4e885334b6a"),
        value: i18nRuntime.i18n("e366ccf1556c0672dcecba135ed5472e")
      }), {
        name: 'minLength',
        visibleOn: 'data.multiple',
        label: i18nRuntime.i18n("70c04a0f4522e39fde5f18ebc85b6232"),
        type: 'input-number'
      }, {
        name: 'maxLength',
        visibleOn: 'data.multiple',
        label: i18nRuntime.i18n("f58ea00f6a84bcb1cac174d1f68c88bd"),
        type: 'input-number'
      }];
    };
    return _this;
  }
  SubFormControlPlugin.prototype.filterProps = function (props) {
    props = amisEditorCore.JSONPipeOut(props);
    // 至少显示一个成员，否则啥都不显示。
    if (!props.value) {
      props.value = [''];
    }
    return props;
  };
  SubFormControlPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info;
    if (info.renderer.name === 'input-sub-form') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  SubFormControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id;
      _a.schema;
      _a.region;
      var info = _a.info;
    if (info.renderer.name === 'input-sub-form') {
      menus.push('|', {
        label: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  SubFormControlPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    if (!node || !value) {
      return;
    }
    var _a = value.form,
      title = _a.title,
      actions = _a.actions,
      name = _a.name,
      size = _a.size,
      closeOnEsc = _a.closeOnEsc,
      showCloseButton = _a.showCloseButton,
      bodyClassName = _a.bodyClassName;
      _a.type;
      var rest = tslib.__rest(_a, ["title", "actions", "name", "size", "closeOnEsc", "showCloseButton", "bodyClassName", "type"]);
    var schema = {
      title: title,
      actions: actions,
      name: name,
      size: size,
      closeOnEsc: closeOnEsc,
      showCloseButton: showCloseButton,
      bodyClassName: bodyClassName,
      type: 'dialog',
      body: tslib.__assign({
        type: 'form',
        className: 'h-full pl-4 pr-4'
      }, rest)
    };
    this.manager.openSubEditor({
      title: i18nRuntime.i18n("50bfed6ada3e7d0ef4d20eb727b3d7df"),
      value: schema,
      memberImmutable: ['body'],
      onChange: function (newValue) {
        var title = newValue.title,
          actions = newValue.actions,
          name = newValue.name,
          size = newValue.size,
          closeOnEsc = newValue.closeOnEsc,
          showCloseButton = newValue.showCloseButton,
          bodyClassName = newValue.bodyClassName,
          body = newValue.body;
        newValue = tslib.__assign(tslib.__assign({}, value), {
          form: tslib.__assign({
            title: title,
            actions: actions,
            name: name,
            size: size,
            closeOnEsc: closeOnEsc,
            showCloseButton: showCloseButton,
            bodyClassName: bodyClassName
          }, body[0])
        });
        // delete newValue.form.body;
        delete newValue.form.type;
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      }
    });
  };
  SubFormControlPlugin.id = 'SubFormControlPlugin';
  return SubFormControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(SubFormControlPlugin);

exports.SubFormControlPlugin = SubFormControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
