/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { getSchemaTpl, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { i18n } from 'i18n-runtime';

var tinymceToolbarsDelimiter = ' ';
var tinymceOptions = ['advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak', 'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime', 'media', 'nonbreaking', 'table', 'emoticons', 'template', 'help'];
var tinymceToolbars = ['undo', 'redo', 'bold', 'italic', 'backcolor', 'alignleft', 'aligncenter', 'alignright', 'alignjustify', 'bullist', 'numlist', 'outdent', 'indent', 'removeformat', 'help', 'charmap', 'anchor', 'pagebreak', 'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime', 'media', 'nonbreaking', 'table', 'tableprops', 'tabledelete', 'tablecellprops', 'tablemergecells', 'tablesplitcells', 'tableinsertrowbefore', 'tableinsertrowafter', 'tabledeleterow', 'tablerowprops', 'tableinsertcolbefore', 'tableinsertcolafter', 'tabledeletecol', 'tablecutrow', 'tablecopyrow', 'tablepasterowbefore', 'tablepasterowafter', 'tablecutcol', 'tablecopycol', 'tablepastecolbefore', 'tablepastecolafter', 'tableinsertdialog', 'tablecellvalign', 'tablecellborderwidth', 'tablecellborderstyle', 'tablecellbackgroundcolor', 'tablecellbordercolor', 'tablecaption', 'tablerowheader', 'tablecolheader', 'emoticons', 'template', 'link', 'openlink', 'unlink', 'image', 'preview', 'alignnone', 'underline', 'strikethrough', 'subscript', 'superscript', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'cut', 'copy', 'paste', 'selectall', 'newdocument', 'remove', 'print', 'hr', 'blockquote', 'forecolor', 'visualaid', 'lineheight', 'pastetext'];
var froalaOptions = ['paragraphFormat', 'quote', 'bold', 'italic', 'underline', 'strikeThrough', 'formatOL', 'formatUL', 'align', 'insertLink', 'insertImage', 'insertTable', 'undo', 'redo', 'html'];
var froalaOptionsPipeOut = function (arr) {
  return froalaOptions.filter(function (item) {
    return arr.find(function (a) {
      return a === item;
    });
  });
};
var RichTextControlPlugin = /** @class */function (_super) {
  __extends(RichTextControlPlugin, _super);
  function RichTextControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-rich-text';
    _this.$schema = '/schemas/RichTextControlSchema.json';
    // 组件名称
    _this.name = i18n("24b6d4c0892a8f3ee2a982e3ab0afe38");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-newspaper-o';
    _this.pluginIcon = 'input-rich-text-plugin';
    _this.description = i18n("42c036311993897680ef37f11e4e20a8");
    _this.docLink = '/amis/zh-CN/components/form/input-rich-text';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-rich-text',
      label: i18n("e2591e971f4c28db7c80a5f546084a1d"),
      name: 'rich-text',
      vendor: 'tinymce'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("e2591e971f4c28db7c80a5f546084a1d");
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a;
      // 有设置这个就默认使用 froala
      var hasRichTextToken = !!((_a = _this.manager.env) === null || _a === void 0 ? void 0 : _a.richTextToken);
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), getSchemaTpl('valueFormula', {
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'textarea'
            }),
            label: i18n("225f3ed00750ae78ad1e6ea42c8f5087")
          }), {
            type: 'select',
            name: 'vendor',
            label: i18n("226b0912184333c81babf2f1894ec0c1"),
            value: hasRichTextToken ? 'froala' : 'tinymce',
            options: ['tinymce', 'froala'],
            onChange: function (value, oldValue, model, form) {
              if (value === 'tinymce') {
                form.changeValue('options', {
                  height: 400,
                  width: undefined,
                  menubar: true,
                  quickInsertEnabled: undefined,
                  charCounterCount: undefined,
                  toolbarButtons: undefined,
                  toolbarButtonsMD: undefined,
                  toolbarButtonsSM: undefined
                });
              } else if (value === 'froala') {
                form.changeValue('options', {
                  height: undefined,
                  width: undefined,
                  toolbar: undefined,
                  menubar: undefined,
                  quickInsertEnabled: true,
                  charCounterCount: true
                });
              }
            }
          },
          // tinymce
          {
            type: 'select',
            multiple: true,
            label: tipedLabel(i18n("236b0cdd2e18418fd17d3cdfcace239e"), i18n("defe851634125bb16e762f26dbb6555f")),
            name: 'options.plugins',
            visibleOn: 'data.vendor === "tinymce"',
            value: __spreadArray([], __read(tinymceOptions), false).join(','),
            searchable: true,
            maxTagCount: 5,
            overflowTagPopover: {
              title: i18n("236b0cdd2e18418fd17d3cdfcace239e"),
              offset: [0, 5]
            },
            options: tinymceOptions
          }, {
            type: 'select',
            name: 'options.toolbar',
            multiple: true,
            label: i18n("012f602372cd2dbd639cd966c63e1f90"),
            searchable: true,
            maxTagCount: 5,
            overflowTagPopover: {
              title: i18n("236b0cdd2e18418fd17d3cdfcace239e"),
              offset: [0, 5]
            },
            visibleOn: 'data.vendor === "tinymce"',
            delimiter: tinymceToolbarsDelimiter,
            value: 'undo redo formatselect bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help',
            pipeOut: function (value) {
              var _a;
              var arr = (_a = value === null || value === void 0 ? void 0 : value.split(tinymceToolbarsDelimiter)) !== null && _a !== void 0 ? _a : [];
              return tinymceToolbars.filter(function (item) {
                return arr.find(function (a) {
                  return a === item;
                });
              }).join(' ');
            },
            options: tinymceToolbars
          }, getSchemaTpl('switch', {
            label: i18n("df025e01cbbae804f7d720e6b932e8e8"),
            value: true,
            name: 'options.menubar',
            visibleOn: 'data.vendor === "tinymce"'
          }),
          // froala
          {
            type: 'select',
            name: 'options.toolbarButtons',
            multiple: true,
            visibleOn: 'data.vendor === "froala"',
            maxTagCount: 5,
            overflowTagPopover: {
              title: i18n("236b0cdd2e18418fd17d3cdfcace239e"),
              offset: [0, 5]
            },
            label: tipedLabel(i18n("b74c3bbb8ec4f18896cd3b5a20ee9e2c"), i18n("e08c3505f9779bf919628166a77d0d77")),
            value: __spreadArray([], __read(froalaOptions), false),
            joinValues: false,
            extractValue: true,
            options: __spreadArray([], __read(froalaOptions), false),
            pipeOut: froalaOptionsPipeOut
          }, {
            type: 'select',
            name: 'options.toolbarButtonsMD',
            multiple: true,
            visibleOn: 'data.vendor === "froala"',
            maxTagCount: 5,
            overflowTagPopover: {
              title: i18n("236b0cdd2e18418fd17d3cdfcace239e"),
              offset: [0, 5]
            },
            label: tipedLabel(i18n("04f91b84d48285162d3e29205a194143"), i18n("9ac0e46a361565f0b8be2228bef4b679")),
            joinValues: false,
            extractValue: true,
            options: __spreadArray([], __read(froalaOptions), false),
            pipeOut: froalaOptionsPipeOut
          }, {
            type: 'select',
            name: 'options.toolbarButtonsSM',
            multiple: true,
            visibleOn: 'data.vendor === "froala"',
            maxTagCount: 5,
            overflowTagPopover: {
              title: i18n("236b0cdd2e18418fd17d3cdfcace239e"),
              offset: [0, 5]
            },
            label: tipedLabel(i18n("70d3894aaed305d2fc67f91122d77759"), i18n("a3133ac3b34da77e612bcb1763adae1e")),
            joinValues: false,
            extractValue: true,
            options: __spreadArray([], __read(froalaOptions), false),
            pipeOut: froalaOptionsPipeOut
          }, getSchemaTpl('switch', {
            label: i18n("194ab42ad1ca7fca9a6ef84fadf99490"),
            value: true,
            name: 'options.quickInsertEnabled',
            visibleOn: 'data.vendor === "froala"'
          }), getSchemaTpl('switch', {
            label: i18n("94621f44f98c996e49d5b214aebefffc"),
            value: true,
            name: 'options.charCounterCount',
            visibleOn: 'data.vendor === "froala"'
          }),
          // 公用部分
          getSchemaTpl('apiControl', {
            mode: 'row',
            labelClassName: 'none',
            name: 'receiver',
            label: i18n("b720ed498f054a2539d496d0da68f85b"),
            visibleOn: '${vendor === "tinymce" && CONTAINS(options.plugins, "image")}'
          }), getSchemaTpl('apiControl', {
            mode: 'row',
            labelClassName: 'none',
            name: 'receiver',
            label: i18n("b720ed498f054a2539d496d0da68f85b"),
            visibleOn: 'data.vendor === "froala"'
          }), getSchemaTpl('apiControl', {
            mode: 'row',
            labelClassName: 'none',
            name: 'videoReceiver',
            label: i18n("376496a8918c57220159951e24d3b72d"),
            visibleOn: 'data.vendor === "froala"'
          }), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder', {
            visibleOn: 'data.vendor !== "tinymce"'
          }), getSchemaTpl('description')]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.Code
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("555a9859e2c34b015438bdfb59a57c5b"),
          body: [{
            type: 'input-number',
            label: i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            min: 0,
            name: 'options.height',
            visibleOn: 'data.vendor === "tinymce"'
          }, {
            type: 'input-number',
            label: i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            min: 150,
            max: 400,
            name: 'options.height',
            visibleOn: 'data.vendor === "froala"'
          }]
        }, getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), getSchemaTpl('style:classNames')])]
      }]);
    };
    return _this;
  }
  RichTextControlPlugin.id = 'RichTextControlPlugin';
  return RichTextControlPlugin;
}(BasePlugin);
registerEditorPlugin(RichTextControlPlugin);

export { RichTextControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
