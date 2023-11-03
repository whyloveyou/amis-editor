/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var FileControlPlugin = /** @class */function (_super) {
  __extends(FileControlPlugin, _super);
  function FileControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-file';
    _this.$schema = '/schemas/FileControlSchema.json';
    // 组件名称
    _this.name = i18n("481e034e6026969aae4ce7ce7c8a7b6f");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-upload';
    _this.pluginIcon = 'input-file-plugin';
    _this.description = i18n("ec1f230a0181d79b37967a455b1f3515");
    _this.docLink = '/amis/zh-CN/components/form/input-file';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-file',
      label: i18n("481e034e6026969aae4ce7ce7c8a7b6f"),
      autoUpload: true,
      proxy: true,
      uploadType: 'fileReceptor',
      name: 'file'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
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
          }), getSchemaTpl('label'), getSchemaTpl('btnLabel'), getSchemaTpl('multiple', {
            replace: true,
            body: [{
              name: 'maxLength',
              label: i18n("0ec0e6e04b9e918939ac8e0daf407b75"),
              type: 'input-number'
            }]
          }), {
            type: 'input-group',
            name: 'maxSize',
            label: i18n("0a9dced8856958fbd05508d1218f8090"),
            body: [{
              type: 'input-number',
              name: 'maxSize'
            }, {
              type: 'tpl',
              addOnclassName: 'border-0 bg-none',
              tpl: 'B'
            }]
          }, getSchemaTpl('uploadType', {
            options: [{
              label: i18n("d28879b6a8a4ddb62bf6f2ab59303df7"),
              value: 'asForm'
            }, {
              label: i18n("1e4dc4d5f4a3a95ddc349147d4d8cd39"),
              value: 'fileReceptor'
            }, {
              label: i18n("74cef1162781310e1503d2dc463a76fc"),
              value: 'bos'
            }],
            pipeIn: function (value, form) {
              return value || 'fileReceptor';
            },
            pipeOut: function (value, form) {
              return value || 'fileReceptor';
            },
            onChange: function (value, oldValue, model, form) {
              if (value === 'asForm') {
                // 作为表单数据，自动上传开启
                form.setValueByName('autoUpload', true);
                var formType = form.getValueByName('formType') || 'asBlob';
                form.setValueByName(formType, true);
              } else {
                form.setValueByName('asBase64', false);
                form.setValueByName('asBlob', false);
              }
            }
          }), {
            name: 'formType',
            type: 'select',
            tiled: true,
            visibleOn: 'data.uploadType === "asForm"',
            value: 'asBlob',
            label: tipedLabel(i18n("7c6722203327e8173be987f36fadf610"), i18n("fde1ab2f504097f3f717acbb653b4f09")),
            options: [{
              label: 'Base64',
              value: 'asBase64'
            }, {
              label: i18n("6168fb08fe64663a502a132c5589b73d"),
              value: 'asBlob'
            }],
            onChange: function (value, oldValue, model, form) {
              form.setValueByName('asBase64', 'asBase64' === value);
              form.setValueByName('asBlob', 'asBlob' === value);
            }
          }, getSchemaTpl('bos', {
            visibleOn: 'data.uploadType === "bos"'
          }), getSchemaTpl('proxy', {
            value: true,
            visibleOn: 'data.uploadType !== "asForm" || !data.uploadType'
          }), getSchemaTpl('switch', {
            name: 'autoUpload',
            label: i18n("7245fe895fa1cfc42b5217a3de314565"),
            value: true,
            visibleOn: 'data.uploadType !== "asForm"'
          }), getSchemaTpl('switch', {
            name: 'useChunk',
            label: i18n("cf9e4c80962e712eaa55551cccff317e"),
            value: false,
            pipeIn: function (value, form) {
              return !!value;
            },
            visibleOn: 'data.uploadType !== "asForm"'
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.uploadType !== "asForm" && data.useChunk === true',
            body: [{
              type: 'input-group',
              name: 'chunkSize',
              label: i18n("454dbf9b835af8627d4dfff2903298b7"),
              body: [{
                type: 'input-number',
                name: 'chunkSize'
              }, {
                type: 'tpl',
                addOnclassName: 'border-0 bg-none',
                tpl: 'B'
              }]
            }, {
              type: 'Container',
              visibleOn: 'data.uploadType == "fileReceptor" && data.useChunk != false',
              body: [getSchemaTpl('apiControl', {
                mode: 'row',
                name: 'startChunkApi',
                label: tipedLabel(i18n("2af0c8b5999a1d243ec5fe503da20026"), i18n("5548252bd28fc1d217d13a9e5771ecb0")),
                value: '/api/upload/startChunk'
              }), getSchemaTpl('apiControl', {
                mode: 'row',
                name: 'chunkApi',
                label: tipedLabel(i18n("d7832abe5b9ce8e41537b4964fd7cf70"), i18n("14008d63c109cc0d0c4ba305671800d2")),
                value: '/api/upload/chunk'
              }), getSchemaTpl('apiControl', {
                mode: 'row',
                name: 'finishChunkApi',
                label: tipedLabel(i18n("70c935fa7ae03aeb1ff87b878e16841f"), i18n("c88aaeddb5aa95c7627d84df33929e3f")),
                value: '/api/upload/finishChunk'
              })]
            }]
          }, getSchemaTpl('apiControl', {
            name: 'receiver',
            label: tipedLabel(i18n("1e4dc4d5f4a3a95ddc349147d4d8cd39"), i18n("258d9e27231b06769dd584a3365545ba")),
            className: 'inputFile-apiControl',
            renderLabel: true,
            value: '/api/upload/file',
            __isUpload: true,
            visibleOn: 'data.uploadType === "fileReceptor" && !data.useChunk'
          }), {
            type: 'input-text',
            value: '',
            name: 'accept',
            label: tipedLabel(i18n("28b988ce6ae6dd62d24bcb8a52119179"), i18n("f0a37d6f810c73a2f936f33035d99056"))
          }, getSchemaTpl('fileUrl', {
            name: 'templateUrl',
            label: tipedLabel(i18n("58892b7a6a785706712761d5aebb4639"), i18n("af4b910df15b00ba7fb5163558389cfe"))
          }), getSchemaTpl('switch', {
            name: 'drag',
            label: i18n("26d384ebe61b6ffe0e64310331f9e998"),
            value: false
          }), getSchemaTpl('remark'), getSchemaTpl('labelRemark'), getSchemaTpl('description'), getSchemaTpl('autoFillApi', {
            visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
          }), getSchemaTpl('autoFill', {
            visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
          })]
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
        }), getSchemaTpl('style:classNames', {
          unsupportStatic: true,
          schema: [getSchemaTpl('className', {
            name: 'descriptionClassName',
            label: i18n("3bdd08adab6ea90b9164b20a0e4151ac")
          }), getSchemaTpl('className', {
            name: 'btnClassName',
            label: i18n("644d03767c8148de6651cc6b00b0173f")
          }), getSchemaTpl('className', {
            name: 'btnUploadClassName',
            label: i18n("d1b06a828d05b0ff72328d50b16a8443")
          })]
        })])
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
  FileControlPlugin.id = 'FileControlPlugin';
  return FileControlPlugin;
}(BasePlugin);
registerEditorPlugin(FileControlPlugin);

export { FileControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
