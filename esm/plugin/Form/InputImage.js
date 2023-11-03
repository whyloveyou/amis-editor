/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { getSchemaTpl, tipedLabel, valuePipeOut, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { ValidatorTag } from '../../validator.js';
import { i18n } from 'i18n-runtime';

var addBtnCssClassName = 'themeCss.addBtnControlClassName';
var IconCssClassName = 'themeCss.iconControlClassName';
var editorPath = 'inputImage.base';
var inputStateFunc = function (visibleOn, state) {
  return [getSchemaTpl('theme:border', {
    name: "".concat(addBtnCssClassName, ".border:").concat(state),
    visibleOn: visibleOn,
    editorThemePath: "".concat(editorPath, ".").concat(state, ".body.border")
  }), getSchemaTpl('theme:colorPicker', {
    label: i18n("ca746b1ff10193a3ce20878dec04a733"),
    name: "".concat(addBtnCssClassName, ".color:").concat(state),
    labelMode: 'input',
    visibleOn: visibleOn,
    editorThemePath: "".concat(editorPath, ".").concat(state, ".body.color")
  }), getSchemaTpl('theme:colorPicker', {
    label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
    name: "".concat(addBtnCssClassName, ".background:").concat(state),
    labelMode: 'input',
    needGradient: true,
    needImage: true,
    visibleOn: visibleOn,
    editorThemePath: "".concat(editorPath, ".").concat(state, ".body.bg-color")
  }), getSchemaTpl('theme:colorPicker', {
    label: i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
    name: "".concat(addBtnCssClassName, ".icon-color:").concat(state),
    labelMode: 'input',
    visibleOn: visibleOn,
    editorThemePath: "".concat(editorPath, ".").concat(state, ".body.icon-color")
  })];
};
var ImageControlPlugin = /** @class */function (_super) {
  __extends(ImageControlPlugin, _super);
  function ImageControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-image';
    _this.$schema = '/schemas/ImageControlSchema.json';
    // 组件名称
    _this.name = i18n("6bfb9bb2218ff32b6139e98bc93707c0");
    _this.isBaseComponent = true;
    _this.description = i18n("0a7f8e17f8487c3715a154bea698778e");
    _this.docLink = '/amis/zh-CN/components/form/input-image';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.icon = 'fa fa-crop';
    _this.pluginIcon = 'input-image-plugin';
    _this.scaffold = {
      type: 'input-image',
      label: i18n("6bfb9bb2218ff32b6139e98bc93707c0"),
      name: 'image',
      autoUpload: true,
      proxy: true,
      uploadType: 'fileReceptor',
      imageClassName: 'r w-full'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("8dccb3d6633a85edb21fa52599211654"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              file: {
                type: 'object',
                title: i18n("5560230c43dd8d8c2b4a62d829f152b3")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'remove',
      eventLabel: i18n("7dcb3fb3ccc93369798d4b6950e96058"),
      description: i18n("03d585240162dad662a0a6b5d90a4692"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("6775136a73e41c1b2cb4ab025773e326")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'success',
      eventLabel: i18n("a7699ba73144aad544eb9ac49f82749d"),
      description: i18n("e309c24c2b07e5970208a82388f1d88e"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("5560230c43dd8d8c2b4a62d829f152b3")
              },
              result: {
                type: 'object',
                title: i18n("fd3913adcb81427f1895ab5b79ebe0b2")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'fail',
      eventLabel: i18n("54e5de428ca9d59119d4624706215a4d"),
      description: i18n("4855bc3f3d06b9cf58d14b61839c5a51"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("5560230c43dd8d8c2b4a62d829f152b3")
              },
              error: {
                type: 'object',
                title: i18n("236dc056d6800bf423df47520637c52d")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("36d40a48f3da92af9fe55ee77cfae46f"),
      description: i18n("18843505278637e44a29e7e1f39e0b06")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), {
            type: 'input-text',
            name: 'value',
            label: i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
            visibleOn: 'typeof this.value !== "undefined"'
          }, {
            type: 'input-text',
            value: '.jpeg, .jpg, .png, .gif',
            name: 'accept',
            label: tipedLabel(i18n("7c5e7ad8954effd97cb78dcb0e8f99d9"), i18n("f816b3decb401dcd0c22db7f104beccc"))
          }, {
            type: 'input-text',
            name: 'frameImage',
            label: i18n("99e6b6011bacaabc18aeac70390252a3")
          }, getSchemaTpl('uploadType', {
            visibleOn: 'data.submitType === "asUpload" || !data.submitType',
            pipeIn: function (value, form) {
              return value || 'fileReceptor';
            },
            pipeOut: function (value, form) {
              return value || 'fileReceptor';
            }
          }), getSchemaTpl('apiControl', {
            mode: 'row',
            name: 'receiver',
            label: tipedLabel(i18n("1e4dc4d5f4a3a95ddc349147d4d8cd39"), i18n("d24bada35447c81d7d7ddec13c44b576")),
            visibleOn: 'data.uploadType === "fileReceptor"',
            value: '/api/upload',
            __isUpload: true
          }), getSchemaTpl('bos', {
            visibleOn: 'data.uploadType === "bos"'
          }), getSchemaTpl('proxy', {
            value: true
          }),
          // getSchemaTpl('autoFill'),
          getSchemaTpl('multiple', {
            patch: {
              value: false,
              visibleOn: '!data.crop',
              label: tipedLabel(i18n("e3be7b8a459a08fec8f378a0660b642b"), i18n("d4633ba7a30303a59891d051a7715cc9"))
            },
            body: [{
              name: 'maxLength',
              label: i18n("0ec0e6e04b9e918939ac8e0daf407b75"),
              type: 'input-number'
            }]
          }), getSchemaTpl('switch', {
            name: 'hideUploadButton',
            label: i18n("037805d2f16cfe69e3145c9f436c06ef"),
            value: false
          }), getSchemaTpl('switch', {
            name: 'autoUpload',
            label: i18n("7245fe895fa1cfc42b5217a3de314565"),
            value: false
          }),
          // getSchemaTpl('switch', {
          //   name: 'compress',
          //   value: true,
          //   label: tipedLabel(
          //     '开启压缩',
          //     '由 hiphoto 实现，自定义接口将无效'
          //   )
          // }),
          // {
          //   type: 'container',
          //   className: 'ae-ExtendMore mb-3',
          //   visibleOn: 'data.compress',
          //   name: 'compressOptions',
          //   body: [
          //     {
          //       type: 'input-number',
          //       label: '最大宽度',
          //       name: 'compressOptions.maxWidth'
          //     },
          //     {
          //       type: 'input-number',
          //       label: '最大高度',
          //       name: 'compressOptions.maxHeight'
          //     }
          //   ]
          // },
          // getSchemaTpl('switch', {
          //   name: 'showCompressOptions',
          //   label: '显示压缩选项'
          // }),
          getSchemaTpl('switch', {
            name: 'crop',
            visibleOn: '!data.multiple',
            label: tipedLabel(i18n("4838f2f4ecafd0a3a4fcfe82521acdd9"), i18n("3d948d24bc4c29689c5a1d4bcb9f2b98")),
            pipeIn: function (value) {
              return !!value;
            }
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.crop',
            body: [{
              name: 'crop.aspectRatio',
              type: 'input-text',
              label: i18n("e09f3466f78e62c1494fb36816950501"),
              pipeOut: valuePipeOut
            }, getSchemaTpl('switch', {
              name: 'crop.rotatable',
              label: i18n("c7fa7f54ece94ae684aee1ee2088a5ae"),
              pipeOut: valuePipeOut
            }), getSchemaTpl('switch', {
              name: 'crop.scalable',
              label: i18n("bd698e3f47ede4e59aafb28a291b77e7"),
              pipeOut: valuePipeOut
            }), {
              name: 'crop.viewMode',
              type: 'select',
              label: i18n("f785a357a820555445acd6f7051b1048"),
              value: 1,
              options: [{
                label: i18n("bc436447f54b10a9ac3f0ee3e1b863dc"),
                value: 0
              }, {
                label: i18n("7ccc0313ac4c40b364f482341ecc3bb8"),
                value: 1
              }],
              pipeOut: valuePipeOut
            }]
          }, getSchemaTpl('switch', {
            name: 'limit',
            label: i18n("4db4c540f05524c38e9431173736517b"),
            pipeIn: function (value) {
              return !!value;
            }
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.limit',
            body: [{
              name: 'maxSize',
              type: 'input-number',
              suffix: 'B',
              label: tipedLabel(i18n("0a9dced8856958fbd05508d1218f8090"), i18n("13446481eaf0a047d8fddf159d981a7c"))
            }, {
              type: 'input-number',
              name: 'limit.width',
              label: tipedLabel(i18n("c28479019e24e0e4745f4948e9e97ee7"), i18n("17a689143f0c7003123bb3c947d35273"))
            }, {
              type: 'input-number',
              name: 'limit.height',
              label: tipedLabel(i18n("c1df04eec5fa0857bc0df2d68d8e953c"), i18n("2aa41edf8cfa79e7e5fcf38c9742b495"))
            }, {
              type: 'input-number',
              name: 'limit.maxWidth',
              label: i18n("99b57d8c9244ff9a695fcd519b4e2e57")
            }, {
              type: 'input-number',
              name: 'limit.maxHeight',
              label: i18n("fc2bc4193eea63128961d09497e07dc8")
            }, {
              type: 'input-number',
              name: 'limit.minWidth',
              label: i18n("a2b62974f4d7564bb68b570116f25a10")
            }, {
              type: 'input-number',
              name: 'limit.minHeight',
              label: i18n("2bd921d0ea7a73b77ee0fcddb1afcc84")
            }, {
              type: 'input-number',
              name: 'limit.aspectRatio',
              label: i18n("b7623c7e17098d5950694437aa7584ad")
            }, {
              type: 'input-text',
              name: 'limit.aspectRatioLabel',
              label: tipedLabel(i18n("1765a2daba3ba8c5af95e66fa83545d4"), i18n("a7b7da38fcb8e246e910e178c5fe4ebc"))
            }]
          }]
        }, getSchemaTpl('status', {
          isFormItem: true,
          unsupportStatic: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.File
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), {
          title: i18n("6f99b6eed37795cb97d5f6370c32113b"),
          body: __spreadArray(__spreadArray(__spreadArray(__spreadArray([{
            type: 'select',
            name: 'editorState',
            label: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
            selectFirst: true,
            options: [{
              label: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
              value: 'default'
            }, {
              label: i18n("062d0b688adb10f3af5ebc2fd2667f1c"),
              value: 'hover'
            }, {
              label: i18n("4363c17ebb346b646af55bd8c8075915"),
              value: 'active'
            }]
          }], __read(inputStateFunc("${editorState == 'default' || !editorState}", 'default')), false), __read(inputStateFunc("${editorState == 'hover'}", 'hover')), false), __read(inputStateFunc("${editorState == 'active'}", 'active')), false), [getSchemaTpl('theme:radius', {
            name: "".concat(addBtnCssClassName, ".border-radius"),
            label: i18n("0103eb2d3dca70270d1a74e9ec987ac9"),
            editorThemePath: "".concat(editorPath, ".default.body.border")
          }), {
            name: "".concat(addBtnCssClassName, ".--inputImage-base-default-icon"),
            label: i18n("598f69a9b640508d8e124fd7d33131f0"),
            type: 'icon-select',
            returnSvg: true
          }, getSchemaTpl('theme:select', {
            name: "".concat(IconCssClassName, ".iconSize"),
            label: i18n("ef79da787ad206e5d5f8cf62e195c836"),
            editorThemePath: "".concat(editorPath, ".default.body.icon-size")
          }), getSchemaTpl('theme:select', {
            name: "".concat(IconCssClassName, ".margin-bottom"),
            label: i18n("ff58428ef8221c4c1bbf532dd3c77113"),
            editorThemePath: "".concat(editorPath, ".default.body.icon-margin")
          })], false)
        }, getSchemaTpl('theme:cssCode', {
          themeClass: [{
            name: i18n("88f109195ad926bcd436f0c56198240d"),
            value: 'addOn',
            className: 'addBtnControlClassName',
            state: ['default', 'hover', 'active']
          }, {
            name: i18n("d825ba2b8ea0c1b0737b0dd5ca9bc128"),
            value: 'icon',
            className: 'iconControlClassName'
          }],
          isFormItem: true
        })], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'style'
        }))
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  ImageControlPlugin.id = 'ImageControlPlugin';
  return ImageControlPlugin;
}(BasePlugin);
registerEditorPlugin(ImageControlPlugin);

export { ImageControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
