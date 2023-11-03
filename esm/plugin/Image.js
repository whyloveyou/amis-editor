/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { mockValue, getI18nEnabled, getSchemaTpl, defaultValue, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var ImagePlugin = /** @class */function (_super) {
  __extends(ImagePlugin, _super);
  function ImagePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'image';
    _this.$schema = '/schemas/ImageSchema.json';
    // 组件名称
    _this.name = i18n("67997ccf7ea846c3c2d278b01ed9600b");
    _this.isBaseComponent = true;
    _this.description = i18n("6dcf991e992a0b765df0933411fe9bb2");
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-photo';
    _this.pluginIcon = 'image-plugin';
    _this.scaffold = {
      type: 'image'
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      thumbMode: 'cover',
      value: mockValue({
        type: 'image'
      })
    });
    _this.panelTitle = i18n("20def7942674282277c3714ed7ea6ce0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isUnderField = /\/field\/\w+$/.test(context.path);
      var i18nEnabled = getI18nEnabled();
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            name: 'title',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18n("c6c7456d446d62a906c2809b6ba19ce1")
          }, {
            name: 'imageCaption',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18n("098c3d959911b48b4d912cb85ccc4942")
          }, {
            name: 'imageMode',
            label: i18n("1fdadb49bcabfdc36a4a9e020f597f4d"),
            type: 'select',
            pipeIn: defaultValue('thumb'),
            options: [{
              label: i18n("e18aa5e376437da71083a29c4cddaf46"),
              value: 'thumb'
            }, {
              label: i18n("fb43d5ffa21f3c4055c29fad350f27e4"),
              value: 'original'
            }]
          }, {
            name: 'width',
            label: i18n("c28479019e24e0e4745f4948e9e97ee7"),
            type: 'input-number'
          }, {
            name: 'height',
            label: i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            type: 'input-number'
          }, isUnderField ? null : getSchemaTpl('imageUrl', {
            name: 'src',
            label: i18n("582570bef8c57c5af7658c4a4eea45ff"),
            description: i18n("1193e1aab7bea094279ae7b4288ba848")
          }), getSchemaTpl('backgroundImageUrl', {
            name: 'editorSetting.mock.src',
            label: tipedLabel(i18n("1fd65acd90f99791d70ca70e046c9f05"), i18n("5789be67da4a1dc0fd9600bd626776a1"))
          }), {
            type: 'ae-switch-more',
            mode: 'normal',
            name: 'enlargeAble',
            label: tipedLabel(i18n("26122d95c72204c83ebdc37cd16a96f9"), i18n("a19769d02b8de60a1e3b46c3ef96f122")),
            value: false,
            hiddenOnDefault: false,
            formType: 'extend',
            pipeIn: function (value) {
              return !!value;
            },
            form: {
              body: [getSchemaTpl('imageUrl', {
                name: 'originalSrc',
                label: i18n("7ffade593e390a2a2cc43e6663461b71"),
                description: i18n("214953c5f7557b1a5f1310c87238ee03")
              })]
            }
          }, {
            type: 'input-text',
            label: i18n("a3f38735bf211edb2066ac4e51b55cb2"),
            name: 'href',
            hiddenOn: 'this.enlargeAble',
            clearValueOnHidden: true
          }, getSchemaTpl('imageUrl', {
            name: 'defaultImage',
            label: tipedLabel(i18n("d196eb8f65e84003b7ca64d5dd8fc737"), i18n("f5865bf2d791d293374af4aa76d27c4d"))
          })]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [
          // amis 已废弃
          // getSchemaTpl('switch', {
          //   name: 'showDimensions',
          //   label: '显示图片尺寸'
          // }),
          getSchemaTpl('layout:display', {
            flexHide: true,
            value: 'inline-block',
            label: i18n("a5d833839a610994dc4752e2d91f4192")
          }), {
            name: 'thumbMode',
            visibleOn: '${!imageMode || imageMode ===  "thumb"}',
            type: 'select',
            label: i18n("1fdadb49bcabfdc36a4a9e020f597f4d"),
            mode: 'horizontal',
            labelAlign: 'left',
            horizontal: {
              left: 5,
              right: 7
            },
            pipeIn: defaultValue('contain'),
            options: [{
              label: i18n("b0267f4aa776e75443b7ef6e8dad257e"),
              value: 'w-full'
            }, {
              label: i18n("c30b1b6f29debb05449aa3cb40268e7e"),
              value: 'h-full'
            }, {
              label: i18n("e13556bb3580ac3746e1f8663eb15896"),
              value: 'contain'
            }, {
              label: i18n("47303119ba97a66d168ff042575b9de4"),
              value: 'cover'
            }]
          }, getSchemaTpl('theme:size', {
            label: i18n("c8339fd2a85af4ba66084d28df808de4"),
            name: 'themeCss.imageControlClassName.size:default'
          })]
        }, getSchemaTpl('theme:base', {
          classname: 'imageControlClassName',
          title: i18n("20def7942674282277c3714ed7ea6ce0")
        }), {
          title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
          body: [getSchemaTpl('theme:font', {
            label: i18n("eded9ed93a453c3f790126e30b776a22"),
            name: 'themeCss.titleControlClassName.font',
            editorThemePath: 'image.image.default.normal.body.font'
          }), getSchemaTpl('theme:paddingAndMargin', {
            label: i18n("11d938eaa50cff1b7e59c64b891de73d"),
            name: 'themeCss.titleControlClassName.padding-and-margin'
          }), getSchemaTpl('theme:font', {
            label: i18n("36285b8c01571203859d6b8ce7af0cba"),
            name: 'themeCss.desControlClassName.font',
            editorThemePath: 'image.image.default.description.body.font'
          }), getSchemaTpl('theme:paddingAndMargin', {
            label: i18n("a7dcee68c68f8f19f39c9788e08fac31"),
            name: 'themeCss.desControlClassName.padding-and-margin'
          }), {
            name: 'themeCss.iconControlClassName.--image-image-normal-icon',
            label: i18n("80dc1f6307e4acf29ece7ac2f6e04334"),
            type: 'icon-select',
            returnSvg: true
          }, {
            name: 'themeCss.galleryControlClassName.--image-images-prev-icon',
            label: i18n("d63b707be8a6feb914a3f6899c38770f"),
            type: 'icon-select',
            returnSvg: true
          }, {
            name: 'themeCss.galleryControlClassName.--image-images-next-icon',
            label: i18n("911f1640e858c362bfb3ba9a55e8269a"),
            type: 'icon-select',
            returnSvg: true
          }, getSchemaTpl('theme:select', {
            label: i18n("8a0b967b90e89dd8e7311065c1de720a"),
            name: 'themeCss.galleryControlClassName.--image-images-item-size'
          })]
        }, getSchemaTpl('theme:cssCode')])
      }]);
    };
    return _this;
  }
  ImagePlugin.prototype.onActive = function (event) {
    var _a;
    var context = event.context;
    if (((_a = context.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this || !context.node) {
      return;
    }
    var node = context.node;
    node.setHeightMutable(true);
    node.setWidthMutable(true);
  };
  ImagePlugin.prototype.onWidthChangeStart = function (event) {
    return this.onSizeChangeStart(event, 'horizontal');
  };
  ImagePlugin.prototype.onHeightChangeStart = function (event) {
    return this.onSizeChangeStart(event, 'vertical');
  };
  ImagePlugin.prototype.onSizeChangeStart = function (event, direction) {
    var _a;
    if (direction === void 0) {
      direction = 'both';
    }
    var context = event.context;
    var node = context.node;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var resizer = context.resizer;
    var dom = context.dom;
    var frameRect = dom.parentElement.getBoundingClientRect();
    var rect = dom.getBoundingClientRect();
    var startX = context.nativeEvent.pageX;
    var startY = context.nativeEvent.pageY;
    event.setData({
      onMove: function (e) {
        var dy = e.pageY - startY;
        var dx = e.pageX - startX;
        var height = Math.max(50, rect.height + dy);
        var width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
        var state = {
          width: width,
          height: height
        };
        if (direction === 'both') {
          resizer.setAttribute('data-value', "".concat(width, "px x ").concat(height, "px"));
        } else if (direction === 'vertical') {
          resizer.setAttribute('data-value', "".concat(height, "px"));
          delete state.width;
        } else {
          resizer.setAttribute('data-value', "".concat(width, "px"));
          delete state.height;
        }
        node.updateState(state);
        requestAnimationFrame(function () {
          node.calculateHighlightBox();
        });
      },
      onEnd: function (e) {
        var dy = e.pageY - startY;
        var dx = e.pageX - startX;
        var height = Math.max(50, rect.height + dy);
        var width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
        var state = {
          width: width,
          height: height
        };
        if (direction === 'vertical') {
          delete state.width;
        } else if (direction === 'horizontal') {
          delete state.height;
        }
        resizer.removeAttribute('data-value');
        node.updateSchema(state);
        requestAnimationFrame(function () {
          node.calculateHighlightBox();
        });
      }
    });
  };
  ImagePlugin.id = 'ImagePlugin';
  ImagePlugin.scene = ['layout'];
  return ImagePlugin;
}(BasePlugin);
registerEditorPlugin(ImagePlugin);

export { ImagePlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
