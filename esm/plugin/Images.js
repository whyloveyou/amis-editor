/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { mockValue, getI18nEnabled, getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var ImagesPlugin = /** @class */function (_super) {
  __extends(ImagesPlugin, _super);
  function ImagesPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'images';
    _this.$schema = '/schemas/ImagesSchema.json';
    // 组件名称
    _this.name = i18n("e040fc4bf539dd1cf6ebca6b4bff857a");
    _this.isBaseComponent = true;
    _this.description = i18n("93f46deec83b8f9005233a1467498d52");
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-clone';
    _this.pluginIcon = 'images-plugin';
    _this.scaffold = {
      type: 'images',
      imageGallaryClassName: 'app-popover'
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      listClassName: 'nowrap',
      thumbMode: 'cover',
      value: [{
        title: i18n("2382c315a6ba396be1932dd8dafaff52"),
        image: mockValue({
          type: 'image'
        }),
        src: mockValue({
          type: 'image'
        })
      }, {
        title: i18n("ce6e2814f207c9333f10785606c57df3"),
        image: mockValue({
          type: 'image'
        }),
        src: mockValue({
          type: 'image'
        })
      }]
    });
    _this.panelTitle = i18n("e040fc4bf539dd1cf6ebca6b4bff857a");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isUnderField = /\/field\/\w+$/.test(context.path);
      var i18nEnabled = getI18nEnabled();
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: (isUnderField ? [] : [{
            type: 'formula',
            name: '__mode',
            autoSet: false,
            formula: '!this.name && !this.source && Array.isArray(this.options) ? 2 : 1'
          }, {
            label: i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
            name: '__mode',
            type: 'button-group-select',
            size: 'sm',
            options: [{
              label: i18n("0a2907a421b8f980986117e4f3044f92"),
              value: 1
            }, {
              label: i18n("e760ec18028fc075c5705bf184589e70"),
              value: 2
            }],
            onChange: function (value, oldValue, model, form) {
              if (value !== oldValue && value == 1) {
                form.deleteValueByName('options');
              }
            }
          }, getSchemaTpl('sourceBindControl', {
            label: tipedLabel(i18n("45a4922d3f42d0b137c6845c4c77031f"), i18n("47fd366b711a0567646854f541449f8b")),
            visibleOn: 'this.__mode == 1'
          }), {
            type: 'combo',
            name: 'options',
            visibleOn: 'this.__mode == 2',
            minLength: 1,
            label: i18n("81a2b634d7ddcffc21b787613673943c"),
            multiple: true,
            multiLine: true,
            addable: true,
            removable: true,
            value: [{}],
            items: [getSchemaTpl('imageUrl', {
              name: 'image',
              label: i18n("0f088d8f579c362068d7a3858e207280")
            }), getSchemaTpl('imageUrl', {
              name: 'src',
              label: i18n("fb43d5ffa21f3c4055c29fad350f27e4")
            }), {
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              label: i18n("c6c7456d446d62a906c2809b6ba19ce1"),
              name: 'title'
            }, {
              type: i18nEnabled ? 'textarea-i18n' : 'textarea',
              label: i18n("098c3d959911b48b4d912cb85ccc4942"),
              name: 'caption'
            }]
          }, getSchemaTpl('switch', {
            name: 'enlargeAble',
            label: i18n("26122d95c72204c83ebdc37cd16a96f9")
          })]).concat([getSchemaTpl('imageUrl', {
            name: 'defaultImage',
            label: tipedLabel(i18n("d196eb8f65e84003b7ca64d5dd8fc737"), i18n("f5865bf2d791d293374af4aa76d27c4d"))
          })])
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [
          // 已废弃
          // getSchemaTpl('switch', {
          //   name: 'showDimensions',
          //   label: '显示图片尺寸'
          // }),
          {
            name: 'thumbMode',
            type: 'select',
            label: i18n("00cedb73310cc531a43d23cfa5ba0e5f"),
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
          }, {
            name: 'thumbRatio',
            type: 'button-group-select',
            label: i18n("319501b9acacdd6f94a9bdd0637a3cd2"),
            size: 'sm',
            pipeIn: defaultValue('1:1'),
            options: [{
              label: '1:1',
              value: '1:1'
            }, {
              label: '4:3',
              value: '4:3'
            }, {
              label: '16:9',
              value: '16:9'
            }]
          }]
        }, getSchemaTpl('theme:base', {
          classname: 'imagesControlClassName',
          title: i18n("e040fc4bf539dd1cf6ebca6b4bff857a")
        }), {
          title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
          body: [{
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
  ImagesPlugin.id = 'ImagesPlugin';
  ImagesPlugin.scene = ['layout'];
  return ImagesPlugin;
}(BasePlugin);
registerEditorPlugin(ImagesPlugin);

export { ImagesPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
