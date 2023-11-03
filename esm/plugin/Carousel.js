/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { mockValue, getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var CarouselPlugin = /** @class */function (_super) {
  __extends(CarouselPlugin, _super);
  function CarouselPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'carousel';
    _this.$schema = '/schemas/CarouselSchema.json';
    // 组件名称
    _this.name = i18n("0c0180cb06a322199a67f10d4ec41cd5");
    _this.isBaseComponent = true;
    _this.description = i18n("1007c97dbf952e032ce13be3cb811f23");
    _this.docLink = '/amis/zh-CN/components/carousel';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-images';
    _this.pluginIcon = 'carousel-plugin';
    _this.scaffold = {
      type: 'carousel',
      options: [{
        image: mockValue({
          type: 'image'
        })
      }, {
        html: '<div style="width: 100%; height: 300px; background: #e3e3e3; text-align: center; line-height: 300px;">carousel data</div>'
      }, {
        image: mockValue({
          type: 'image'
        })
      }]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("0c0180cb06a322199a67f10d4ec41cd5");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isUnderField = /\/field\/\w+$/.test(context.path);
      return [getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), isUnderField ? {
          type: 'tpl',
          inline: false,
          className: 'text-info text-sm',
          tpl: i18n("37b12f2666b9e4e37f33eb5e83533d5e")
        } : null, {
          type: 'formula',
          name: '__mode',
          autoSet: false,
          formula: '!this.name && !this.source && Array.isArray(this.options) ? 2 : 1'
        }, {
          label: i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
          name: '__mode',
          type: 'button-group-select',
          pipeIn: function (value, _a) {
            var data = _a.data;
            if (value === undefined) {
              return !data.name && !data.source && Array.isArray(data.options) ? 2 : 1;
            }
            return value;
          },
          options: [{
            label: i18n("0a2907a421b8f980986117e4f3044f92"),
            value: 1
          }, {
            label: i18n("e760ec18028fc075c5705bf184589e70"),
            value: 2
          }]
        }, {
          label: i18n("d314558953b3c76adb7e131aaec8bd86"),
          name: 'name',
          type: 'input-text',
          description: i18n("793a763e73f1f742e3a16ddc2ed95ccb"),
          visibleOn: 'this.__mode == 1 || !this.__mode && (this.name || this.source || !Array.isArray(this.options))'
        }, {
          type: 'combo',
          name: 'options',
          visibleOn: 'this.__mode == 2 || !this.__mode && !this.name && !this.source && Array.isArray(this.options)',
          label: i18n("b9994cc749b4cfbbac0a9b140addd242"),
          mode: 'vertical',
          multiple: true,
          multiLine: true,
          addable: true,
          removable: true,
          typeSwitchable: false,
          conditions: [{
            label: i18n("20def7942674282277c3714ed7ea6ce0"),
            test: 'this.type === "image"',
            items: [getSchemaTpl('imageUrl', {
              name: 'content'
            }), getSchemaTpl('imageTitle'), getSchemaTpl('className', {
              label: i18n("ab8a46ccf46acbf82d020d11468291b1"),
              name: 'titleClassName',
              visibleOn: 'this.type == "image"'
            }), getSchemaTpl('imageDesc'), getSchemaTpl('className', {
              label: i18n("c6fc4066471664a8602c636cfe1cc766"),
              name: 'descriptionClassName',
              visibleOn: 'this.type == "image"'
            }), {
              type: 'input-text',
              label: i18n("a3f38735bf211edb2066ac4e51b55cb2"),
              name: 'href',
              visibleOn: 'this.type == "image"'
            }],
            scaffold: {
              type: 'input-image',
              image: ''
            }
          }, {
            label: 'HTML',
            test: 'this.type === "html"',
            items: [getSchemaTpl('richText', {
              label: i18n("2d711b09bd0db0ad240cc83b30dd8014"),
              name: 'content'
            })],
            scaffold: {
              type: 'html',
              content: i18n("cfb6f6e4c92a61ed0e0717abc8d0eec7")
            }
          }],
          pipeIn: function (value) {
            return Array.isArray(value) && value.length ? value.map(function (item) {
              return item && item.hasOwnProperty('html') ? {
                type: 'html',
                content: item.html
              } : {
                type: 'image',
                content: item.image,
                title: item.title,
                href: item.href,
                titleClassName: item.titleClassName,
                description: item.description,
                descriptionClassName: item.descriptionClassName
              };
            }) : [];
          },
          pipeOut: function (value, originValue, data) {
            return Array.isArray(value) && value.length ? value.map(function (item) {
              return item.type === 'html' ? {
                html: item.content
              } : {
                image: item.content,
                href: item.href,
                title: item.title,
                titleClassName: item.titleClassName,
                description: item.description,
                descriptionClassName: item.descriptionClassName
              };
            }) : [];
          }
        }]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('switch', {
            name: 'auto',
            label: i18n("97cc997910b99083bd23c6ac39294ff3"),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('valueFormula', {
            rendererSchema: {
              type: 'input-number'
            },
            name: 'interval',
            label: i18n("9dd651411c1cb25e19249bb4ea8878c3"),
            valueType: 'number',
            pipeIn: defaultValue(5000)
          }), {
            name: 'duration',
            type: 'input-number',
            label: i18n("46bc66b19c2b589ebd24d1c583325080"),
            min: 100,
            step: 10,
            size: 'sm',
            pipeIn: defaultValue(500)
          }, {
            name: 'animation',
            label: i18n("5bc37c57ee54d407f441b222f02391db"),
            type: 'button-group-select',
            pipeIn: defaultValue('fade'),
            options: [{
              label: 'fade',
              value: 'fade'
            }, {
              label: 'slide',
              value: 'slide'
            }]
          }, {
            name: 'controlsTheme',
            label: i18n("8a0d716ded7baa7ee356ff39c3cf0bec"),
            type: 'button-group-select',
            pipeIn: defaultValue('light'),
            options: [{
              label: 'light',
              value: 'light'
            }, {
              label: 'dark',
              value: 'dark'
            }]
          }, {
            name: 'controls',
            label: i18n("f7471313dce32bc3669d338764a0d036"),
            type: 'button-group-select',
            pipeIn: defaultValue('dots,arrows'),
            multiple: true,
            options: [{
              label: i18n("1c0fe943329339003e9e3c1b12a27fe3"),
              value: 'dots'
            }, {
              label: i18n("e030190fd1c10b0c967f48e789fa86b1"),
              value: 'arrows'
            }]
          }, getSchemaTpl('switch', {
            name: 'alwaysShowArrow',
            label: i18n("9cb33a16b57ef10b79ae76a66379d66f"),
            clearValueOnHidden: true,
            hiddenOn: '!~this.controls.indexOf("arrows")',
            pipeIn: defaultValue(false)
          }), {
            type: 'ae-switch-more',
            bulk: true,
            mode: 'normal',
            name: 'multiple',
            label: i18n("f4f965513462fcc9fe6fe896a9c249d8"),
            formType: 'extend',
            form: {
              body: [{
                name: 'multiple.count',
                label: i18n("0bf60b32f9db93b87e08763b1c815469"),
                type: 'input-number',
                min: 2,
                step: 1
              }]
            }
          }, {
            name: 'width',
            type: 'input-text',
            label: i18n("c28479019e24e0e4745f4948e9e97ee7"),
            validations: 'isNumeric',
            addOn: {
              type: 'button',
              label: 'px'
            }
          }, {
            name: 'height',
            type: 'input-text',
            label: i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            validations: 'isNumeric',
            addOn: {
              type: 'button',
              label: 'px'
            }
          }]
        }, {
          title: i18n("33bf801796fd255b5f6147e33146669b"),
          body: [getSchemaTpl('ref'), getSchemaTpl('visible')]
        }, getSchemaTpl('theme:base', {
          title: i18n("0c0180cb06a322199a67f10d4ec41cd5")
        }), {
          title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
          body: [{
            name: 'themeCss.baseControlClassName.--image-images-prev-icon',
            label: i18n("d63b707be8a6feb914a3f6899c38770f"),
            type: 'icon-select',
            returnSvg: true
          }, {
            name: 'themeCss.baseControlClassName.--image-images-next-icon',
            label: i18n("911f1640e858c362bfb3ba9a55e8269a"),
            type: 'icon-select',
            returnSvg: true
          }, getSchemaTpl('theme:select', {
            label: i18n("8a0b967b90e89dd8e7311065c1de720a"),
            name: 'themeCss.galleryControlClassName.width:default'
          })]
        }, getSchemaTpl('theme:cssCode')])
      }])];
    };
    return _this;
  }
  CarouselPlugin.prototype.filterProps = function (props) {
    // 编辑的时候别自动轮播，影响编辑
    props.auto = false;
    return props;
  };
  /**
   * 补充切换的 toolbar
   * @param context
   * @param toolbars
   */
  CarouselPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
    if (context.info.plugin === this && context.info.renderer.name === 'carousel' && !context.info.hostId) {
      var node_1 = context.node;
      toolbars.push({
        level: 'secondary',
        icon: 'fa fa-chevron-left',
        tooltip: i18n("ad5a36ee5f4054594c30b6dc481e2d81"),
        onClick: function () {
          var _a;
          var control = node_1.getComponent();
          (_a = control === null || control === void 0 ? void 0 : control.prev) === null || _a === void 0 ? void 0 : _a.call(control);
        }
      });
      toolbars.push({
        level: 'secondary',
        icon: 'fa fa-chevron-right',
        tooltip: i18n("49e0f68798e3c69b7990076bd8f1f47f"),
        onClick: function () {
          var _a;
          var control = node_1.getComponent();
          (_a = control === null || control === void 0 ? void 0 : control.next) === null || _a === void 0 ? void 0 : _a.call(control);
        }
      });
    }
  };
  CarouselPlugin.id = 'CarouselPlugin';
  return CarouselPlugin;
}(BasePlugin);
registerEditorPlugin(CarouselPlugin);

export { CarouselPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
