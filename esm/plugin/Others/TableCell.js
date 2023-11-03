/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { Button } from 'amis';
import React__default from 'react';
import { getI18nEnabled, getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getVariable } from 'amis-core';
import { i18n } from 'i18n-runtime';

var TableCellPlugin = /** @class */function (_super) {
  __extends(TableCellPlugin, _super);
  function TableCellPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.panelTitle = i18n("dc7558211f2990370954c2e7ca498ee9");
    _this.panelIcon = 'fa fa-columns';
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = getI18nEnabled();
      return [getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [
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
        },*/
        getSchemaTpl('label', {
          label: i18n("bcee820bc20342a4d388a35ed32a35fe")
        }), getSchemaTpl('formItemName', {
          label: i18n("41a344642681efaaa418c228ba7fb45c")
        }), getSchemaTpl('tableCellRemark'), getSchemaTpl('tableCellPlaceholder'), getSchemaTpl('switch', {
          name: 'sortable',
          label: i18n("233662283039ded8c29f070d1a807029"),
          description: i18n("348097cc50579e489f0bcb5433637d3a")
        })]
      }, {
        title: i18n("dfac151de712ab0b3618072c8a7f0a0f"),
        body: [{
          name: 'groupName',
          label: i18n("9db64f772c11c614ee00bb3cc066f46f"),
          type: i18nEnabled ? 'input-text-i18n' : 'input-text',
          description: i18n("9791b05a4df9d72f1a01b81fa695fbc6")
        }, getSchemaTpl('switch', {
          name: 'quickEdit',
          label: i18n("19c4f5e98ad302574202de30dddbaf66"),
          pipeIn: function (value) {
            return !!value;
          }
        }), {
          visibleOn: 'data.quickEdit',
          name: 'quickEdit.mode',
          type: 'button-group-select',
          value: 'popOver',
          label: i18n("abd733d00ec656e7b0cfd88deedf102f"),
          size: 'xs',
          mode: 'inline',
          className: 'w-full',
          options: [{
            label: i18n("78f395c15aaf8c92d9223f6ca69b41a4"),
            value: 'popOver'
          }, {
            label: i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
            value: 'inline'
          }]
        }, getSchemaTpl('switch', {
          name: 'quickEdit.saveImmediately',
          label: i18n("15c3796e07e33afc7252df751f610c5d"),
          visibleOn: 'data.quickEdit',
          description: i18n("2d2eb2ac28f074d1caef0d332d61cfb0"),
          descriptionClassName: 'help-block m-b-none',
          pipeIn: function (value) {
            return !!value;
          }
        }), getSchemaTpl('api', {
          label: i18n("eccba4475f3144e417e55fd96e831e09"),
          description: i18n("c8e5c062d5ad38e54413abd9c7cfb2f4"),
          name: 'quickEdit.saveImmediately.api',
          visibleOn: 'this.quickEdit && this.quickEdit.saveImmediately'
        }), {
          visibleOn: 'data.quickEdit',
          name: 'quickEdit',
          asFormItem: true,
          children: function (_a) {
            var value = _a.value,
              onChange = _a.onChange,
              data = _a.data;
            if (value === true) {
              value = {};
            } else if (typeof value === 'undefined') {
              value = getVariable(data, 'quickEdit');
            }
            var originMode = value.mode;
            value = __assign({
              type: 'input-text',
              name: data.name
            }, value);
            delete value.mode;
            // todo 多个快速编辑表单模式看来只能代码模式编辑了。
            return React__default.createElement(Button, {
              level: "info",
              className: "m-b",
              size: "sm",
              block: true,
              onClick: function () {
                _this.manager.openSubEditor({
                  title: i18n("c3ed36e4abb96c18a6c83350994cdea7"),
                  value: value,
                  slot: {
                    type: 'form',
                    mode: 'normal',
                    body: ['$$'],
                    wrapWithPanel: false
                  },
                  onChange: function (value) {
                    return onChange(__assign(__assign({}, value), {
                      mode: originMode
                    }), 'quickEdit');
                  }
                });
              }
            }, i18n("45a6c55d8d2d92af84e219defef084d5"));
          }
        }, getSchemaTpl('switch', {
          name: 'popOver',
          label: i18n("ba5a0a1ff2c438ae7719ca48b0ce3af7"),
          pipeIn: function (value) {
            return !!value;
          }
        }), {
          name: 'popOver.mode',
          label: i18n("d689e3c38fdb32c98fb27f8f35a26552"),
          type: 'select',
          visibleOn: 'data.popOver',
          pipeIn: defaultValue('popOver'),
          options: [{
            label: i18n("18c63459a2c069022c7790430f761214"),
            value: 'popOver'
          }, {
            label: i18n("ab3aec075a09d055b2a28c8b61925ee0"),
            value: 'dialog'
          }, {
            label: i18n("33e6c41fed95c25e3b426d596d504579"),
            value: 'drawer'
          }]
        }, {
          name: 'popOver.position',
          label: i18n("d689e3c38fdb32c98fb27f8f35a26552"),
          type: 'select',
          visibleOn: 'data.popOver && data.popOver.mode === "popOver"',
          pipeIn: defaultValue('center'),
          options: [{
            label: i18n("68b54e7b408c4fb83561c931aa668eae"),
            value: 'center'
          }, {
            label: i18n("e18459c93769a5afec01e1ce60f9b9fd"),
            value: 'left-top'
          }, {
            label: i18n("1fc3cdd8437f5057774cde2f2c51f97c"),
            value: 'right-top'
          }, {
            label: i18n("63dd9faca92bccfd436ff21a6b4b3151"),
            value: 'left-bottom'
          }, {
            label: i18n("d01c239688b9c8fc145191ee642dc080"),
            value: 'right-bottom'
          }, {
            label: i18n("8fcf9802436282672a8e28ebd6262390"),
            value: 'fixed-left-top'
          }, {
            label: i18n("aed25160b4e8cfc613a743c4549e9222"),
            value: 'fixed-right-top'
          }, {
            label: i18n("d4a4ab1916187e09b9c037705fd49ffa"),
            value: 'fixed-left-bottom'
          }, {
            label: i18n("921fccbb84c829bf8c6f0b9957029f44"),
            value: 'fixed-right-bottom'
          }]
        }, {
          visibleOn: 'data.popOver',
          name: 'popOver',
          asFormItem: true,
          children: function (_a) {
            var value = _a.value,
              onChange = _a.onChange;
            value = __assign({
              type: 'panel',
              title: i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
              body: i18n("1d53f83df1d889a70131b7a93c819575")
            }, value);
            return React__default.createElement(Button, {
              level: "info",
              className: "m-b",
              size: "sm",
              block: true,
              onClick: function () {
                _this.manager.openSubEditor({
                  title: i18n("8dda45360dcf9ca501fd7d0eb53045b5"),
                  value: value,
                  onChange: function (value) {
                    return onChange(value, 'popOver');
                  }
                });
              }
            }, i18n("fd389de167730ba8542217ad31b95562"));
          }
        }, getSchemaTpl('switch', {
          name: 'copyable',
          label: i18n("6e78b595d6a296938201a3c80660bf35"),
          pipeIn: function (value) {
            return !!value;
          }
        }), {
          visibleOn: 'data.copyable',
          name: 'copyable.content',
          type: 'textarea',
          label: i18n("deb65aca8dba2ff9d0cfaed0a3441068"),
          description: i18n("622e14515c4fd5ca6fe6946e3a1bfb4a")
        }]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [{
          name: 'fixed',
          type: 'button-group-select',
          label: i18n("65f7e01d58cb5065f49e0e8f48cc16be"),
          pipeIn: defaultValue(''),
          size: 'xs',
          mode: 'inline',
          className: 'w-full',
          options: [{
            value: '',
            label: i18n("9ed8a4c5d1b3726121175dc986268b0c")
          }, {
            value: 'left',
            label: i18n("39a2cb79c6d9762783e20522ea86dcff")
          }, {
            value: 'right',
            label: i18n("de2a774bf98944b8f0ec8755d5f59d64")
          }]
        }, getSchemaTpl('switch', {
          name: 'toggled',
          label: i18n("0a5ac2f5c327e28c58d51db967a0e603"),
          pipeIn: defaultValue(true)
        }), {
          name: 'breakpoint',
          type: 'button-group-select',
          label: i18n("a3bd2104e3df81df713de636b907462c"),
          visibleOn: 'data.tableFootableEnabled',
          size: 'xs',
          multiple: true,
          options: [{
            label: i18n("986a5f50e946674bb91c9408fc974497"),
            value: '*'
          }, {
            label: i18n("a165f0fe5fb904049f6b6961105e433f"),
            value: 'xs'
          }, {
            label: i18n("03ee8b948c9b34daca9584811bcca17d"),
            value: 'sm'
          }, {
            label: i18n("82d9f1f96084674e2b0101ecc04d5d58"),
            value: 'md'
          }, {
            label: i18n("f4166de371b5dfb87efce228b17a3fbb"),
            value: 'lg'
          }],
          pipeIn: function (value) {
            return value ? typeof value === 'string' ? value : '*' : '';
          },
          pipeOut: function (value) {
            return typeof value === 'string' && ~value.indexOf('*') && /xs|sm|md|lg/.test(value) ? value.replace(/\*\s*,\s*|\s*,\s*\*/g, '') : value;
          }
        }, getSchemaTpl('switch', {
          name: 'className',
          label: i18n("f8cffd4d3fcdca390a3a3de24d209bb6"),
          pipeIn: function (value) {
            return typeof value === 'string' && /\word\-break\b/.test(value);
          },
          pipeOut: function (value, originValue) {
            return (value ? 'word-break ' : '') + (originValue || '').replace(/\bword\-break\b/g, '').trim();
          }
        }), getSchemaTpl('className'), getSchemaTpl('className', {
          name: 'innerClassName',
          label: i18n("4619988f1c5d9093dc00d1430633b2bd")
        }), {
          name: 'width',
          type: 'input-number',
          label: i18n("bdd9d38d7e2929024089363dc8f48b7a"),
          description: i18n("b198805e7a6b35830ba813f51db2fdc4")
        }]
      }])];
    };
    return _this;
  }
  // filterProps(props: any) {
  //   props = JSONPipeOut(props, true);
  //   return props;
  // }
  TableCellPlugin.prototype.getRendererInfo = function (_a) {
    var renderer = _a.renderer,
      schema = _a.schema;
    if (renderer.name === 'table-cell') {
      return {
        name: schema.label ? "<".concat(schema.label, ">\u5217") : i18n("044892c0c637f2d9e78e78956b1ded01"),
        $schema: '/schemas/TableColumn.json',
        multifactor: true,
        wrapperResolve: function (dom) {
          var siblings = [].slice.call(dom.parentElement.children);
          var index = siblings.indexOf(dom) + 1;
          var table = dom.closest('table');
          return [].slice.call(table.querySelectorAll("th:nth-child(".concat(index, "):not([data-editor-id=\"").concat(schema.id, "\"]),\n              td:nth-child(").concat(index, "):not([data-editor-id=\"").concat(schema.id, "\"])")));
        }
        // filterProps: this.filterProps
      };
    }
  };
  /*exchangeRenderer(id: string) {
    this.manager.showReplacePanel(id, '展示');
  }*/
  TableCellPlugin.prototype.beforeReplace = function (event) {
    var context = event.context;
    // 替换字段的时候保留 label 和 name 值。
    if (context.info.plugin === this && context.data) {
      context.data.label = context.data.label || context.schema.label;
      context.data.name = context.data.name || context.schema.name;
    }
  };
  TableCellPlugin.id = 'TableCellPlugin';
  return TableCellPlugin;
}(BasePlugin);
registerEditorPlugin(TableCellPlugin);

export { TableCellPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
