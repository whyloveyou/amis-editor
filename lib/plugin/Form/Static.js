/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

amisEditorCore.setSchemaTpl('quickEdit', function (patch, manager) {
  return {
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'quickEdit',
    label: i18nRuntime.i18n("663a93dacbba9f7860dca783cf772419"),
    value: false,
    hiddenOnDefault: true,
    formType: 'extend',
    pipeIn: function (value) {
      return !!value;
    },
    form: {
      body: [{
        label: i18nRuntime.i18n("ce0e89aa6a8e17562c265714b33b4f82"),
        name: 'quickEdit.mode',
        type: 'button-group-select',
        inputClassName: 'items-center',
        visibleOn: 'data.quickEdit',
        pipeIn: amisEditorCore.defaultValue('popOver'),
        options: [{
          label: i18nRuntime.i18n("78f395c15aaf8c92d9223f6ca69b41a4"),
          value: 'popOver'
        }, {
          label: i18nRuntime.i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
          value: 'inline'
        }]
      }, amisEditorCore.getSchemaTpl('switch', {
        name: 'quickEdit.saveImmediately',
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("5e2d1e872682befd5350687f94a6b417"), i18nRuntime.i18n("2d2eb2ac28f074d1caef0d332d61cfb0")),
        visibleOn: 'data.quickEdit',
        pipeIn: function (value) {
          return !!value;
        }
      }), amisEditorCore.getSchemaTpl('apiControl', {
        name: 'quickEdit.saveImmediately.api',
        label: i18nRuntime.i18n("ff7cc75cc43c25c823d05d87cb8190b0"),
        mode: 'row',
        description: i18nRuntime.i18n("ba1a077af717cb3c4788849c2342200b"),
        visibleOn: 'this.quickEdit && this.quickEdit.saveImmediately'
      }), {
        name: 'quickEdit',
        asFormItem: true,
        visibleOn: 'data.quickEdit',
        mode: 'row',
        children: function (_a) {
          var value = _a.value,
            onChange = _a.onChange,
            data = _a.data;
          if (value === true) {
            value = {};
          }
          var originMode = value.mode;
          value = tslib.__assign({
            type: 'input-text',
            name: data.name
          }, value);
          delete value.mode;
          // todo 多个快速编辑表单模式看来只能代码模式编辑了。
          return React__default["default"].createElement(amis.Button, {
            block: true,
            level: "primary",
            onClick: function () {
              manager.openSubEditor({
                title: i18nRuntime.i18n("c3ed36e4abb96c18a6c83350994cdea7"),
                value: value,
                slot: {
                  type: 'form',
                  mode: 'normal',
                  body: ['$$'],
                  wrapWithPanel: false
                },
                onChange: function (value) {
                  return onChange(tslib.__assign(tslib.__assign({}, value), {
                    mode: originMode
                  }), 'quickEdit');
                }
              });
            }
          }, i18nRuntime.i18n("45a6c55d8d2d92af84e219defef084d5"));
        }
      }]
    }
  };
});
// 查看更多
amisEditorCore.setSchemaTpl('morePopOver', function (patch, manager) {
  return {
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'popOver',
    label: i18nRuntime.i18n("3f337f436989e9847790e4435423f77e"),
    value: false,
    hiddenOnDefault: true,
    formType: 'extend',
    pipeIn: function (value) {
      return !!value;
    },
    form: {
      body: [{
        label: i18nRuntime.i18n("f7247cd14bd964b883bbb481892c440b"),
        name: 'popOver.mode',
        type: 'button-group-select',
        visibleOn: 'data.popOver',
        pipeIn: amisEditorCore.defaultValue('popOver'),
        options: [{
          label: i18nRuntime.i18n("a553741d5ebb9c80d7d2a63b202cf4b8"),
          value: 'popOver'
        }, {
          label: i18nRuntime.i18n("ab3aec075a09d055b2a28c8b61925ee0"),
          value: 'dialog'
        }, {
          label: i18nRuntime.i18n("2a2924380dfcaea998bd8a49703545a9"),
          value: 'drawer'
        }]
      }, {
        name: 'popOver.position',
        label: i18nRuntime.i18n("a06e8df4e9232cc606e0202e06a198d8"),
        type: 'select',
        visibleOn: 'data.popOver && (data.popOver.mode === "popOver" || !data.popOver.mode)',
        pipeIn: amisEditorCore.defaultValue('center'),
        options: [{
          label: i18nRuntime.i18n("e18459c93769a5afec01e1ce60f9b9fd"),
          value: 'left-top'
        }, {
          label: i18nRuntime.i18n("1fc3cdd8437f5057774cde2f2c51f97c"),
          value: 'right-top'
        }, {
          label: i18nRuntime.i18n("68b54e7b408c4fb83561c931aa668eae"),
          value: 'center'
        }, {
          label: i18nRuntime.i18n("63dd9faca92bccfd436ff21a6b4b3151"),
          value: 'left-bottom'
        }, {
          label: i18nRuntime.i18n("d01c239688b9c8fc145191ee642dc080"),
          value: 'right-bottom'
        }, {
          label: i18nRuntime.i18n("8fcf9802436282672a8e28ebd6262390"),
          value: 'fixed-left-top'
        }, {
          label: i18nRuntime.i18n("aed25160b4e8cfc613a743c4549e9222"),
          value: 'fixed-right-top'
        }, {
          label: i18nRuntime.i18n("d4a4ab1916187e09b9c037705fd49ffa"),
          value: 'fixed-left-bottom'
        }, {
          label: i18nRuntime.i18n("921fccbb84c829bf8c6f0b9957029f44"),
          value: 'fixed-right-bottom'
        }]
      }, {
        visibleOn: 'data.popOver',
        name: 'popOver',
        mode: 'row',
        asFormItem: true,
        children: function (_a) {
          var value = _a.value,
            onChange = _a.onChange;
          value = tslib.__assign({
            type: 'panel',
            title: i18nRuntime.i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
            body: i18nRuntime.i18n("1d53f83df1d889a70131b7a93c819575")
          }, value);
          return React__default["default"].createElement(amis.Button, {
            block: true,
            level: "primary",
            onClick: function () {
              manager.openSubEditor({
                title: i18nRuntime.i18n("8dda45360dcf9ca501fd7d0eb53045b5"),
                value: value,
                onChange: function (value) {
                  return onChange(value, 'quickEdit');
                }
              });
            }
          }, i18nRuntime.i18n("fd389de167730ba8542217ad31b95562"));
        }
      }]
    }
  };
});
// 可复制
amisEditorCore.setSchemaTpl('copyable', {
  type: 'ae-switch-more',
  mode: 'normal',
  name: 'copyable',
  label: i18nRuntime.i18n("f9a9fcc3bf6a3c8ff1e99fa48ed6d03d"),
  value: false,
  hiddenOnDefault: true,
  formType: 'extend',
  pipeIn: function (value) {
    return !!value;
  },
  form: {
    body: [{
      label: i18nRuntime.i18n("deb65aca8dba2ff9d0cfaed0a3441068"),
      name: 'copyable.content',
      type: 'textarea',
      mode: 'row',
      maxRow: 2,
      visibleOn: 'data.copyable',
      description: i18nRuntime.i18n("622e14515c4fd5ca6fe6946e3a1bfb4a")
    }]
  }
});
var StaticControlPlugin = /** @class */function (_super) {
  tslib.__extends(StaticControlPlugin, _super);
  function StaticControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'static';
    _this.$schema = '/schemas/StaticControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("33e7b7433fdbeafa1ef71105ee28c061");
    _this.isBaseComponent = true;
    _this.disabledRendererPlugin = true;
    _this.icon = 'fa fa-info';
    _this.pluginIcon = 'static-plugin';
    _this.description = i18nRuntime.i18n("b4482a3d9523f48e83a816fa85911185");
    _this.docLink = '/amis/zh-CN/components/form/static';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'static',
      label: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac")
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: i18nRuntime.i18n("134492cd10a0646da6f23a743feee6d4")
      })]
    };
    _this.multifactor = true;
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("04f5f12c49c2a6fdc43da049591328ad");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'alert',
            inline: false,
            level: 'warning',
            className: 'text-sm',
            body: i18nRuntime.i18n("4602761ee85e2e6e5360cd13fe642a08")
          }, amisEditorCore.getSchemaTpl('formItemName', {
            required: false
          }), amisEditorCore.getSchemaTpl('label'),
          // getSchemaTpl('value'),
          amisEditorCore.getSchemaTpl('valueFormula', {
            name: 'tpl'
            // rendererSchema: {
            //   ...context?.schema,
            //   type: 'textarea', // 改用多行文本编辑
            //   value: context?.schema.tpl // 避免默认值丢失
            // }
          }), amisEditorCore.getSchemaTpl('quickEdit', {}, _this.manager), amisEditorCore.getSchemaTpl('morePopOver', {}, _this.manager), amisEditorCore.getSchemaTpl('copyable'), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('description')
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
          },*/]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true,
          unsupportStatic: true
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: renderer
        }), {
          title: i18nRuntime.i18n("e1b2f870112bd38f8d7e14a0ad589930"),
          body: [amisEditorCore.getSchemaTpl('borderMode')]
        }, {
          title: i18nRuntime.i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("16a20243f9b741c08216dc9548de2968")
          }), amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("14d342362f66aa86e2aa1c1e11aa1204"),
            name: 'labelClassName'
          }), amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("e1b2f870112bd38f8d7e14a0ad589930"),
            name: 'inputClassName'
          }), amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
            name: 'descriptionClassName',
            visibleOn: 'this.description'
          })]
        }])
      }]);
    };
    return _this;
    /*exchangeRenderer(id: string) {
      this.manager.showReplacePanel(id, '展示');
    }*/
  }

  StaticControlPlugin.prototype.filterProps = function (props, node) {
    props.$$id = node.id;
    if (typeof props.value === 'undefined') {
      props.value = amisEditorCore.mockValue(props);
    }
    return props;
  };
  StaticControlPlugin.id = 'StaticControlPlugin';
  StaticControlPlugin.scene = ['layout'];
  return StaticControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(StaticControlPlugin);

exports.StaticControlPlugin = StaticControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
