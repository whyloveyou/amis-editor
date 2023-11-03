/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign, __awaiter, __generator } from 'tslib';
import { noop, getI18nEnabled, getSchemaTpl, defaultValue, tipedLabel, isEmpty, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import omit from 'lodash/omit';
import { InlineModal } from './Dialog.js';
import { i18n } from 'i18n-runtime';

var DrawerPlugin = /** @class */function (_super) {
  __extends(DrawerPlugin, _super);
  function DrawerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'drawer';
    _this.$schema = '/schemas/DrawerSchema.json';
    // 组件名称
    _this.name = i18n("33f1fc330b325469b43614c9d96f590e");
    _this.isBaseComponent = true;
    _this.wrapperProps = {
      wrapperComponent: InlineModal,
      onClose: noop,
      resizable: false,
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
      description: i18n("0c5a0448b07419ad2900c36867e8e4e0"),
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
      description: i18n("57f215184a2fb83541f7cfa22d039feb"),
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
      description: i18n("97b6bad87c4320faac2f6a5cf556c26c")
    }, {
      actionType: 'cancel',
      actionLabel: i18n("625fb26b4b3340f7872b411f401e754c"),
      description: i18n("909ba2872b2d670ec0ecbcacc4c8c833")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18n("ab3aec075a09d055b2a28c8b61925ee0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = getI18nEnabled();
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
            name: 'overlay',
            label: i18n("bde8a41fc64bfe78d0c4951ac6f93718"),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('switch', {
            name: 'showCloseButton',
            label: i18n("8c8fbec263e20f087555c9abcb6dd07a"),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('switch', {
            name: 'closeOnOutside',
            label: i18n("67a2d9746956b631dd3ae9d13b6ae9ff")
          }), getSchemaTpl('switch', {
            label: i18n("f29ab26877ed22ffa59636d747d824b9"),
            name: 'closeOnEsc'
          }), {
            type: 'ae-StatusControl',
            label: i18n("36f5b682310bd52f19c63b077ec054d1"),
            mode: 'normal',
            name: 'hideActions',
            expressionName: 'hideActionsOn'
          }, getSchemaTpl('switch', {
            name: 'resizable',
            label: i18n("874cf31274d782914c7833cc39836c4e"),
            value: false
          }), getSchemaTpl('dataMap')]
        }])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
          body: [{
            type: 'button-group-select',
            name: 'position',
            label: i18n("d4d2a66820d30e07b44c850eb3f116c0"),
            mode: 'horizontal',
            options: [{
              label: i18n("d2aff1417831aa621c16cd5b95306b4b"),
              value: 'left'
            }, {
              label: i18n("af767b7e4ae069d54f9ea839858d4c6d"),
              value: 'top'
            }, {
              label: i18n("4d9c32c23df5d234e629c922c58d8e12"),
              value: 'right'
            }, {
              label: i18n("3850a186c3235bc646d4c2f79cebac36"),
              value: 'bottom'
            }],
            pipeIn: defaultValue('right'),
            pipeOut: function (value) {
              return value ? value : 'right';
            },
            onChange: function (value, oldValue, model, form) {
              if (value === 'left' || value === 'right') {
                form.deleteValueByName('height');
              } else if (value === 'top' || value === 'bottom') {
                form.deleteValueByName('width');
              }
            }
          }, {
            type: 'button-group-select',
            name: 'size',
            label: i18n("c8339fd2a85af4ba66084d28df808de4"),
            size: 'sm',
            mode: 'horizontal',
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
          }, getSchemaTpl('style:widthHeight', {
            widthSchema: {
              label: tipedLabel(i18n("c28479019e24e0e4745f4948e9e97ee7"), i18n("94397b87ac63fe238c779120fadab024")),
              visibleOn: 'this.position === "left" || this.position === "right" || !this.position'
            },
            heightSchema: {
              label: tipedLabel(i18n("c1df04eec5fa0857bc0df2d68d8e953c"), i18n("a6d91e801974dfa735a4ae0e098c522a")),
              visibleOn: 'this.position === "top" || this.position === "bottom"'
            }
          }), getSchemaTpl('theme:border', {
            name: 'themeCss.drawerClassName.border'
          }), getSchemaTpl('theme:radius', {
            name: 'themeCss.drawerClassName.radius'
          }), getSchemaTpl('theme:shadow', {
            name: 'themeCss.drawerClassName.box-shadow'
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.drawerClassName.background',
            labelMode: 'input'
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("6bdc97671296112658e3a1cd369c0686"),
            name: 'themeCss.drawerMaskClassName.background',
            labelMode: 'input'
          })]
        }, {
          title: i18n("030c8cb75e9707285b28c4931bfeddc5"),
          body: [getSchemaTpl('theme:font', {
            label: i18n("ca746b1ff10193a3ce20878dec04a733"),
            name: 'themeCss.drawerTitleClassName.font'
          }), getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.drawerHeaderClassName.padding-and-margin',
            label: i18n("60bac4c0a381a42b320a703227be59eb")
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.drawerHeaderClassName.background',
            labelMode: 'input'
          })]
        }, {
          title: i18n("132a78bdf68d6d17bde00aa807bbf032"),
          body: [getSchemaTpl('theme:border', {
            name: 'themeCss.drawerBodyClassName.border'
          }), getSchemaTpl('theme:radius', {
            name: 'themeCss.drawerBodyClassName.radius'
          }), getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.drawerBodyClassName.padding-and-margin',
            label: i18n("60bac4c0a381a42b320a703227be59eb")
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.drawerBodyClassName.background',
            labelMode: 'input'
          })]
        }, {
          title: i18n("b3b287010ea79586507a77e0580d9cad"),
          body: [getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.drawerFooterClassName.padding-and-margin',
            label: i18n("60bac4c0a381a42b320a703227be59eb")
          }), getSchemaTpl('theme:colorPicker', {
            label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
            name: 'themeCss.drawerFooterClassName.background',
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
  DrawerPlugin.prototype.buildSubRenderers = function () {};
  DrawerPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
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
          // 数据链
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
          $id: 'drawer',
          type: 'object',
          title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
          properties: dataSchema
        }];
      });
    });
  };
  DrawerPlugin.id = 'DrawerPlugin';
  return DrawerPlugin;
}(BasePlugin);
registerEditorPlugin(DrawerPlugin);

export { DrawerPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
