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
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ActionPlugin = /** @class */function (_super) {
  tslib.__extends(ActionPlugin, _super);
  function ActionPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.panelTitle = i18nRuntime.i18n("fa966345577ba81af19408f203db968f");
    _this.rendererName = 'action';
    _this.name = i18nRuntime.i18n("b7dd79307fb7bcc921aa1b94ef904fe9");
    _this.$schema = '/schemas/ActionSchema.json';
    _this.panelBodyCreator = function (context) {
      var isInDialog = /(?:\/|^)dialog\/.+$/.test(context.path);
      /(?:\/|^)dropdown-button\/.+$/.test(context.path);
      var schema = [{
        label: i18nRuntime.i18n("88d1257b0cf667319085f3e0033b9607"),
        type: 'select',
        name: 'actionType',
        pipeIn: amisEditorCore.defaultValue(''),
        options: [{
          label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
          value: ''
        }, {
          label: i18nRuntime.i18n("ab3aec075a09d055b2a28c8b61925ee0"),
          value: 'dialog'
        }, {
          label: i18nRuntime.i18n("f10f0be4aa9684eef9d78234072fe08b"),
          value: 'drawer'
        }, {
          label: i18nRuntime.i18n("4f02d2efe05a20232ab9da63c090595c"),
          value: 'ajax'
        }, {
          label: i18nRuntime.i18n("5dfd5a78e2ba1bc8afb482a8745454ea"),
          value: 'download'
        }, {
          label: i18nRuntime.i18n("4e58f9c94d345e14e2d69cc8496b7b5a"),
          value: 'link'
        }, {
          label: i18nRuntime.i18n("982db3084a2c470d1a9b34efa024511c"),
          value: 'url'
        }, {
          label: i18nRuntime.i18n("f20d9579ebdc9dfc30a212ae6cae931f"),
          value: 'reload'
        }, {
          label: i18nRuntime.i18n("6a086902a84969a835423002718e86b4"),
          value: 'copy'
        }, {
          label: i18nRuntime.i18n("939d5345ad4345dbaabe14798f6ac0f1"),
          value: 'submit'
        }, {
          label: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
          value: 'reset'
        }, {
          label: i18nRuntime.i18n("a56c9f13b1566009fdc7640bc551709e"),
          value: 'reset-and-submit'
        }, {
          label: i18nRuntime.i18n("30313d6fa06603604db18086bbcad9d3"),
          value: 'clear-and-submit'
        }, {
          label: i18nRuntime.i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
          value: 'confirm'
        }, {
          label: i18nRuntime.i18n("625fb26b4b3340f7872b411f401e754c"),
          value: 'cancel'
        }, {
          label: i18nRuntime.i18n("0fc26855080a4219bbfad638029a795c"),
          value: 'next'
        }, {
          label: i18nRuntime.i18n("8ba8a1bead7ca55554cff1c85246ae09"),
          value: 'prev'
        }]
      }, {
        type: 'input-text',
        name: 'content',
        visibleOn: 'data.actionType == "copy"',
        label: i18nRuntime.i18n("deb65aca8dba2ff9d0cfaed0a3441068")
      }, {
        type: 'select',
        name: 'copyFormat',
        options: [{
          label: i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371"),
          value: 'text/plain'
        }, {
          label: i18nRuntime.i18n("e2591e971f4c28db7c80a5f546084a1d"),
          value: 'text/html'
        }],
        visibleOn: 'data.actionType == "copy"',
        label: i18nRuntime.i18n("c28f4d63beabc4833b17aaa10ca550db")
      }, {
        type: 'input-text',
        name: 'target',
        visibleOn: 'data.actionType == "reload"',
        label: i18nRuntime.i18n("21fa07f18f80bee50695686831ae1286"),
        required: true
      }, {
        name: 'dialog',
        pipeIn: amisEditorCore.defaultValue({
          title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
          body: i18nRuntime.i18n("1a9aaf05889002e65708c4950012a652"),
          showCloseButton: true,
          showErrorMsg: true,
          showLoading: true
        }),
        asFormItem: true,
        children: function (_a) {
          var value = _a.value,
            onChange = _a.onChange,
            data = _a.data;
          return data.actionType === 'dialog' ? React__default["default"].createElement(amisUi.Button, {
            size: "sm",
            level: "danger",
            className: "m-b",
            onClick: function () {
              return _this.manager.openSubEditor({
                title: i18nRuntime.i18n("c3c8422fcecd8c1cc922cba15ab5cbc0"),
                value: tslib.__assign({
                  type: 'dialog'
                }, value),
                onChange: function (value) {
                  return onChange(value);
                }
              });
            },
            block: true
          }, i18nRuntime.i18n("c3c8422fcecd8c1cc922cba15ab5cbc0")) : null;
        }
      }, {
        visibleOn: 'data.actionType == "drawer"',
        name: 'drawer',
        pipeIn: amisEditorCore.defaultValue({
          title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
          body: i18nRuntime.i18n("1a9aaf05889002e65708c4950012a652")
        }),
        asFormItem: true,
        children: function (_a) {
          var value = _a.value,
            onChange = _a.onChange,
            data = _a.data;
          return data.actionType == 'drawer' ? React__default["default"].createElement(amisUi.Button, {
            size: "sm",
            level: "danger",
            className: "m-b",
            onClick: function () {
              return _this.manager.openSubEditor({
                title: i18nRuntime.i18n("262c7c7b9874ae5607fb51da468d0e8c"),
                value: tslib.__assign({
                  type: 'drawer'
                }, value),
                onChange: function (value) {
                  return onChange(value);
                }
              });
            },
            block: true
          }, i18nRuntime.i18n("262c7c7b9874ae5607fb51da468d0e8c")) : null;
        }
      }, amisEditorCore.getSchemaTpl('api', {
        label: i18nRuntime.i18n("5eb694a4252528628929ced97ca95823"),
        visibleOn: 'data.actionType == "ajax" || data.actionType == "download"'
      }), {
        name: 'feedback',
        pipeIn: amisEditorCore.defaultValue({
          title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
          body: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014")
        }),
        asFormItem: true,
        children: function (_a) {
          var onChange = _a.onChange,
            value = _a.value,
            data = _a.data;
          return data.actionType == 'ajax' ? React__default["default"].createElement("div", {
            className: "m-b"
          }, React__default["default"].createElement(amisUi.Button, {
            size: "sm",
            level: value ? 'danger' : 'info',
            onClick: function () {
              return _this.manager.openSubEditor({
                title: i18nRuntime.i18n("0cc0fff6eb667b140d3fd06e34a8c69f"),
                value: tslib.__assign({
                  type: 'dialog'
                }, value),
                onChange: function (value) {
                  return onChange(value);
                }
              });
            }
          }, i18nRuntime.i18n("deb9089ed7ebcacd712117fc4204c65f")), value ? React__default["default"].createElement(amisUi.Button, {
            size: "sm",
            level: "link",
            className: "m-l",
            onClick: function () {
              return onChange('');
            }
          }, i18nRuntime.i18n("215f64480a93893fc56c51aeb5d40f11")) : null) : null;
        }
      }, {
        name: 'feedback.visibleOn',
        label: i18nRuntime.i18n("7984d95c01b725a2709fb8f5ee330fb4"),
        type: 'input-text',
        visibleOn: 'this.feedback',
        autoComplete: false,
        description: i18nRuntime.i18n("dfa07586a471e24b23fe68e11f5dc41a")
      }, {
        name: 'feedback.skipRestOnCancel',
        label: i18nRuntime.i18n("47186f00df86d3edad3b5595ba8c2a0a"),
        type: 'switch',
        mode: 'inline',
        className: 'block',
        visibleOn: 'this.feedback'
      }, {
        name: 'feedback.skipRestOnConfirm',
        label: i18nRuntime.i18n("4f21e04fe35d39c79e7779cdf2f4e232"),
        type: 'switch',
        mode: 'inline',
        className: 'block',
        visibleOn: 'this.feedback'
      }, {
        type: 'input-text',
        label: i18nRuntime.i18n("6ab20dc4b64021b85886ad9c12b6e0cc"),
        name: 'link',
        visibleOn: 'data.actionType == "link"'
      }, {
        type: 'input-text',
        label: i18nRuntime.i18n("6ab20dc4b64021b85886ad9c12b6e0cc"),
        name: 'url',
        visibleOn: 'data.actionType == "url"',
        placeholder: 'http://'
      }, {
        type: 'switch',
        name: 'blank',
        visibleOn: 'data.actionType == "url"',
        mode: 'inline',
        className: 'w-full',
        label: i18nRuntime.i18n("0bbc3ec26c36a87c9df3183def6ca9e0"),
        value: true
      }, isInDialog ? {
        visibleOn: 'data.actionType == "submit" || data.type == "submit"',
        name: 'close',
        type: 'switch',
        mode: 'inline',
        className: 'w-full',
        pipeIn: amisEditorCore.defaultValue(true),
        label: i18nRuntime.i18n("d0c3025a64b26e5fbf22005f400c06d7")
      } : null, {
        name: 'confirmText',
        type: 'textarea',
        label: i18nRuntime.i18n("0c15a924dc3bedefb79c958972bef2b9"),
        description: i18nRuntime.i18n("06b13b11740f7663af325bf5426930ba")
      }, {
        type: 'input-text',
        name: 'reload',
        label: i18nRuntime.i18n("fa9a0a79f29fef72e3060ea1af93c305"),
        visibleOn: 'data.actionType != "link" && data.actionType != "url"',
        description: i18nRuntime.i18n("437d629f00e62cf99b3ad288f84ade46")
      }, {
        type: 'input-text',
        name: 'target',
        visibleOn: 'data.actionType != "reload"',
        label: i18nRuntime.i18n("b01f08bf5b9f8e3ef9d49e31d89bf770"),
        description: i18nRuntime.i18n("f667748a8e9717498da714d4e5087af2")
      }, {
        type: 'js-editor',
        allowFullscreen: true,
        name: 'onClick',
        label: i18nRuntime.i18n("80ddab8a52f74d707765501b0caae21f"),
        description: i18nRuntime.i18n("babbd439bc04241ed3536f892668c250")
      }, {
        type: 'input-text',
        name: 'hotKey',
        label: i18nRuntime.i18n("867ade50f0bbb10bac65a5c3bc7895e9")
      }];
      return [{
        type: 'container',
        className: 'p-3',
        body: schema
      }];
    };
    return _this;
  }
  ActionPlugin.prototype.buildEditorPanel = function (context, panels) {
    // 多选时不处理
    if (context.selections.length) {
      return;
    }
    if (context.info.renderer.name === 'action') {
      var body = this.panelBodyCreator(context);
      panels.push({
        key: 'action',
        icon: 'fa fa-gavel',
        title: i18nRuntime.i18n("c500cfabdec9b2761fe9f1aa543933eb"),
        render: this.manager.makeSchemaFormRender({
          body: body
        }),
        order: 100
      });
    } else {
      _super.prototype.buildEditorPanel.call(this, context, panels);
    }
  };
  ActionPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var _this = this;
    var id = _a.id,
      schema = _a.schema,
      info = _a.info;
    if (~['action', 'button', 'submit', 'reset'].indexOf(info.renderer.name) && schema.actionType === 'dialog') {
      toolbars.push({
        iconSvg: 'dialog',
        tooltip: i18nRuntime.i18n("c3c8422fcecd8c1cc922cba15ab5cbc0"),
        placement: 'bottom',
        onClick: function () {
          return _this.editDetail(id);
        }
      });
    }
  };
  ActionPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("c3c8422fcecd8c1cc922cba15ab5cbc0"),
      value: tslib.__assign({
        type: 'dialog'
      }, value.dialog),
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          dialog: newValue
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      }
    });
  };
  ActionPlugin.id = 'ActionPlugin';
  return ActionPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ActionPlugin);

exports.ActionPlugin = ActionPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
