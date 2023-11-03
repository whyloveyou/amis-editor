/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign, __awaiter, __generator } from 'tslib';
import React__default from 'react';
import { Modal, Button, Drawer } from 'amis-ui';
import { noop, getI18nEnabled, getSchemaTpl, defaultValue, isEmpty, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import omit from 'lodash/omit';
import { i18n } from 'i18n-runtime';

var DialogPlugin = /** @class */function (_super) {
  __extends(DialogPlugin, _super);
  function DialogPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'dialog';
    _this.$schema = '/schemas/DialogSchema.json';
    // 组件名称
    _this.name = i18n("6cff4b6d794cc17f5d24dbe0d21e5732");
    _this.isBaseComponent = true;
    _this.wrapperProps = {
      wrapperComponent: InlineModal,
      onClose: noop,
      show: true
    };
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderBody',
      renderMethodOverride: function (regions, insertRegion) {
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var info = this.props.$$editor;
          var dom = this.super.apply(this, __spreadArray([], __read(args), false));
          if (info && args[1] === 'body') {
            return insertRegion(this, dom, regions, info, info.plugin.manager);
          }
          return dom;
        };
      }
    }, {
      key: 'actions',
      label: i18n("c8caf94205105bac5833ab31cc2129d7"),
      renderMethod: 'renderFooter',
      wrapperResolve: function (dom) {
        return dom;
      }
    }];
    // 现在没用，后面弹窗优化后有用
    _this.events = [{
      eventName: 'confirm',
      eventLabel: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
      description: i18n("773ddc154f1e9b80f04e8bc9d83d2caf"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("85f1708454f409855d552f702ac27b19")
          }
        }
      }]
    }, {
      eventName: 'cancel',
      eventLabel: i18n("625fb26b4b3340f7872b411f401e754c"),
      description: i18n("08ab4ffcd1bddd249a193e6353bb52bb"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18n("85f1708454f409855d552f702ac27b19")
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'confirm',
      actionLabel: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
      description: i18n("4708bcefff645287c8781a1de2a0f20b")
    }, {
      actionType: 'cancel',
      actionLabel: i18n("625fb26b4b3340f7872b411f401e754c"),
      description: i18n("af17a4e37e5c6d68fff33c084192801b")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18n("ab3aec075a09d055b2a28c8b61925ee0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a;
      var i18nEnabled = getI18nEnabled();
      // 确认对话框的配置面板
      if (((_a = context.schema) === null || _a === void 0 ? void 0 : _a.dialogType) === 'confirm') {
        return getSchemaTpl('tabs', [{
          title: i18n("24d67862f87f439db7ca957aecb77cce"),
          body: getSchemaTpl('collapseGroup', [{
            title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
            body: [getSchemaTpl('layout:originPosition', {
              value: 'left-top'
            }), {
              label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
              type: 'input-text',
              name: 'title'
            }, getSchemaTpl('layout:originPosition', {
              value: 'left-top'
            }), {
              label: i18n("e406488d1b9545168eb1896e35139bf2"),
              type: 'input-text',
              name: 'confirmText'
            }, getSchemaTpl('layout:originPosition', {
              value: 'left-top'
            }), {
              label: i18n("d919d62d7e5ec5cb63ad47e5dc347a7e"),
              type: 'input-text',
              name: 'cancelText'
            }, getSchemaTpl('switch', {
              label: i18n("f29ab26877ed22ffa59636d747d824b9"),
              name: 'closeOnEsc',
              value: false
            })]
          }])
        }, {
          title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
          body: getSchemaTpl('collapseGroup', [{
            title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
            body: [{
              label: i18n("c8339fd2a85af4ba66084d28df808de4"),
              type: 'button-group-select',
              name: 'size',
              size: 'sm',
              options: [{
                label: i18n("544fac400db790f57ea8ee4207cbeb6b"),
                value: ''
              }, {
                label: i18n("391b8fa9c747a1799353ab856e666ad5"),
                value: 'sm'
              }, {
                label: i18n("aed1dfbc31703955e64806b799b67645"),
                value: 'md'
              }, {
                label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
                value: 'lg'
              }, {
                label: i18n("949934d97c42801151673a51d3adc421"),
                value: 'xl'
              }],
              pipeIn: defaultValue(''),
              pipeOut: function (value) {
                return value ? value : undefined;
              }
            }, getSchemaTpl('buttonLevel', {
              label: i18n("b12df8decf62700970e08b9b2ebce1f8"),
              name: 'confirmBtnLevel'
            }), getSchemaTpl('buttonLevel', {
              label: i18n("7f29931020c2d8ce97b8043a933db151"),
              name: 'cancelBtnLevel'
            })]
          }])
        }]);
      }
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            name: 'title'
          }, getSchemaTpl('switch', {
            label: i18n("8c8fbec263e20f087555c9abcb6dd07a"),
            name: 'showCloseButton',
            value: true
          }), getSchemaTpl('switch', {
            label: i18n("67a2d9746956b631dd3ae9d13b6ae9ff"),
            name: 'closeOnOutside',
            value: false
          }), getSchemaTpl('switch', {
            label: i18n("f29ab26877ed22ffa59636d747d824b9"),
            name: 'closeOnEsc',
            value: false
          }), {
            type: 'ae-StatusControl',
            label: i18n("36f5b682310bd52f19c63b077ec054d1"),
            mode: 'normal',
            name: 'hideActions',
            expressionName: 'hideActionsOn'
          }, getSchemaTpl('switch', {
            label: i18n("dcba76890a534e1fe94421be2a17b484"),
            name: 'showErrorMsg',
            value: true
          }), getSchemaTpl('switch', {
            label: i18n("af5876b89583552eef4c781718886dec"),
            name: 'showLoading',
            value: true
          }), getSchemaTpl('dataMap')]
        }])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
          body: [{
            label: i18n("c8339fd2a85af4ba66084d28df808de4"),
            type: 'button-group-select',
            name: 'size',
            size: 'xs',
            options: [{
              label: i18n("544fac400db790f57ea8ee4207cbeb6b"),
              value: ''
            }, {
              label: i18n("391b8fa9c747a1799353ab856e666ad5"),
              value: 'sm'
            }, {
              label: i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'md'
            }, {
              label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
              value: 'lg'
            }, {
              label: i18n("949934d97c42801151673a51d3adc421"),
              value: 'xl'
            }, {
              label: i18n("f1d4ff50f3828f9b73412e7d94e6dd6e"),
              value: 'custom'
            }],
            pipeIn: defaultValue(''),
            pipeOut: function (value) {
              return value ? value : undefined;
            },
            onChange: function (value, oldValue, model, form) {
              if (value !== 'custom') {
                form.setValueByName('style', undefined);
              }
            }
          }, {
            type: 'input-number',
            label: i18n("c28479019e24e0e4745f4948e9e97ee7"),
            name: 'style.width',
            disabled: true,
            clearable: true,
            unitOptions: ['px', '%', 'em', 'vh', 'vw'],
            visibleOn: 'this.size !== "custom"',
            pipeIn: function (value, form) {
              if (!form.data.size) {
                return '500px';
              } else if (form.data.size === 'sm') {
                return '350px';
              } else if (form.data.size === 'md') {
                return '800px';
              } else if (form.data.size === 'lg') {
                return '1100px';
              } else if (form.data.size === 'xl') {
                return '90%';
              }
              return '';
            }
          }, {
            type: 'input-number',
            label: i18n("c28479019e24e0e4745f4948e9e97ee7"),
            name: 'style.width',
            clearable: true,
            unitOptions: ['px', '%', 'em', 'vh', 'vw'],
            visibleOn: 'this.size === "custom"',
            pipeOut: function (value) {
              var curValue = parseInt(value);
              if (value === 'auto' || curValue || curValue === 0) {
                return value;
              } else {
                return undefined;
              }
            }
          }, {
            type: 'input-number',
            label: i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            name: 'style.height',
            disabled: true,
            visibleOn: 'this.size !== "custom"',
            clearable: true,
            unitOptions: ['px', '%', 'em', 'vh', 'vw']
          }, {
            type: 'input-number',
            label: i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
            name: 'style.height',
            visibleOn: 'this.size === "custom"',
            clearable: true,
            unitOptions: ['px', '%', 'em', 'vh', 'vw'],
            pipeOut: function (value) {
              var curValue = parseInt(value);
              if (value === 'auto' || curValue || curValue === 0) {
                return value;
              } else {
                return undefined;
              }
            }
          }, getSchemaTpl('theme:border', {
            name: 'themeCss.dialogClassName.border'
          }), getSchemaTpl('theme:radius', {
            name: 'themeCss.dialogClassName.radius'
          }), getSchemaTpl('theme:shadow', {
            name: 'themeCss.dialogClassName.box-shadow'
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.dialogClassName.background',
            labelMode: 'input'
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("6bdc97671296112658e3a1cd369c0686"),
            name: 'themeCss.dialogMaskClassName.background',
            labelMode: 'input'
          })]
        }, {
          title: i18n("030c8cb75e9707285b28c4931bfeddc5"),
          body: [getSchemaTpl('theme:font', {
            label: i18n("ca746b1ff10193a3ce20878dec04a733"),
            name: 'themeCss.dialogTitleClassName.font',
            hasVertical: false
          }), getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.dialogHeaderClassName.padding-and-margin',
            label: i18n("60bac4c0a381a42b320a703227be59eb")
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.dialogHeaderClassName.background',
            labelMode: 'input'
          })]
        }, {
          title: i18n("132a78bdf68d6d17bde00aa807bbf032"),
          body: [getSchemaTpl('theme:border', {
            name: 'themeCss.dialogBodyClassName.border'
          }), getSchemaTpl('theme:radius', {
            name: 'themeCss.dialogBodyClassName.radius'
          }), getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.dialogBodyClassName.padding-and-margin',
            label: i18n("60bac4c0a381a42b320a703227be59eb")
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.dialogBodyClassName.background',
            labelMode: 'input'
          })]
        }, {
          title: i18n("b3b287010ea79586507a77e0580d9cad"),
          body: [getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.dialogFooterClassName.padding-and-margin',
            label: i18n("60bac4c0a381a42b320a703227be59eb")
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.dialogFooterClassName.background',
            labelMode: 'input'
          })]
        }])
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
  DialogPlugin.prototype.buildSubRenderers = function () {};
  DialogPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
      var renderer, data, dataSchema, key;
      return __generator(this, function (_e) {
        renderer = (_a = this.manager.store.getNodeById(node.id)) === null || _a === void 0 ? void 0 : _a.getComponent();
        data = omit(renderer.props.$schema.data, '$$id');
        dataSchema = {};
        if (renderer.props.$schema.data === undefined || !isEmpty(data)) {
          // 静态数据
          for (key in data) {
            if (!['&'].includes(key)) {
              dataSchema[key] = {
                type: (_b = typeof data[key]) !== null && _b !== void 0 ? _b : 'string',
                title: key
              };
            }
          }
          // 弹窗改版可能会有多个按钮触发一个弹窗，无法确定按钮的上下文
          // TODO 数据链
          // const hostNodeDataSchema =
          //   await this.manager.config.getHostNodeDataSchema?.();
          // hostNodeDataSchema
          //   ?.filter(
          //     (item: any) => !['system-variable', 'page-global'].includes(item.$id)
          //   )
          //   ?.forEach((item: any) => {
          //     dataSchema = {
          //       ...dataSchema,
          //       ...item.properties
          //     };
          //   });
        }

        return [2 /*return*/, {
          $id: 'dialog',
          type: 'object',
          title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
          properties: dataSchema
        }];
      });
    });
  };
  /**
   * 为了让 dialog 的按钮可以点击编辑
   */
  DialogPlugin.prototype.patchSchema = function (schema, info, props) {
    if (Array.isArray(schema.actions)) {
      return;
    }
    return __assign(__assign({}, schema), {
      actions: [{
        type: 'button',
        actionType: 'cancel',
        label: i18n("625fb26b4b3340f7872b411f401e754c")
      }, (props === null || props === void 0 ? void 0 : props.confirm) ? {
        type: 'button',
        actionType: 'confirm',
        label: i18n("38cf16f2204ffab8a6e0187070558721"),
        primary: true
      } : null].filter(function (item) {
        return item;
      })
    });
  };
  DialogPlugin.id = 'DialogPlugin';
  return DialogPlugin;
}(BasePlugin);
registerEditorPlugin(DialogPlugin);
var InlineModal = /** @class */function (_super) {
  __extends(InlineModal, _super);
  function InlineModal() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  InlineModal.prototype.componentDidMount = function () {};
  InlineModal.prototype.render = function () {
    var _a = this.props,
      type = _a.type,
      children = _a.children,
      dialogType = _a.dialogType,
      cancelText = _a.cancelText,
      confirmText = _a.confirmText,
      cancelBtnLevel = _a.cancelBtnLevel,
      confirmBtnLevel = _a.confirmBtnLevel,
      editorDialogMountNode = _a.editorDialogMountNode;
    var Container = type === 'drawer' ? Drawer : Modal;
    if (dialogType === 'confirm') {
      children = children.filter(function (item) {
        return (item === null || item === void 0 ? void 0 : item.key) !== 'actions';
      });
      return React__default.createElement(Modal, __assign({}, this.props, {
        container: editorDialogMountNode
      }), React__default.createElement("div", {
        className: "ae-InlineModal"
      }, children, React__default.createElement("div", {
        className: "ae-InlineModal-footer"
      }, React__default.createElement(Button, {
        className: "ae-InlineModal-footer-btn",
        level: cancelBtnLevel
      }, cancelText || i18n("625fb26b4b3340f7872b411f401e754c")), React__default.createElement(Button, {
        className: "ae-InlineModal-footer-btn",
        level: confirmBtnLevel
      }, confirmText || i18n("e83a256e4f5bb4ff8b3d804b5473217a")))));
    }
    return React__default.createElement(Container, __assign({}, this.props, {
      container: editorDialogMountNode
    }), children);
  };
  return InlineModal;
}(React__default.Component);

export { DialogPlugin, InlineModal };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
