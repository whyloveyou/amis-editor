/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var BaseControl = require('../component/BaseControl.js');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var ButtonPlugin = /** @class */function (_super) {
  tslib.__extends(ButtonPlugin, _super);
  function ButtonPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'button';
    _this.$schema = '/schemas/ActionSchema.json';
    _this.order = -400;
    // 组件名称
    _this.name = i18nRuntime.i18n("fa966345577ba81af19408f203db968f");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("89de611b2d759a1802542b5d3a06829f");
    _this.docLink = '/amis/zh-CN/components/button';
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-square';
    _this.pluginIcon = 'button-plugin';
    _this.scaffold = tslib.__assign({
      type: 'button',
      label: i18nRuntime.i18n("fa966345577ba81af19408f203db968f")
    }, BaseControl.BUTTON_DEFAULT_ACTION);
    _this.previewSchema = {
      type: 'button',
      label: i18nRuntime.i18n("fa966345577ba81af19408f203db968f")
    };
    _this.panelTitle = i18nRuntime.i18n("fa966345577ba81af19408f203db968f");
    // 事件定义
    _this.events = [{
      eventName: 'click',
      eventLabel: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
      description: i18nRuntime.i18n("7af5e3ef39ff71d39fe3f645c8079124"),
      defaultShow: true,
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseenter',
      eventLabel: i18nRuntime.i18n("f6d767f39ba3bf955077a3c0ce81e581"),
      description: i18nRuntime.i18n("bcdd89d453da0dc0622a2f3189728357"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseleave',
      eventLabel: i18nRuntime.i18n("e272b0b8c7fedc670a87075514d9b49f"),
      description: i18nRuntime.i18n("727309bc724ff237c5e2cdf7a90cf28e"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }
    // {
    //   eventName: 'doubleClick',
    //   eventLabel: '双击',
    //   description: '鼠标双击事件'
    // }
    ];
    // 动作定义
    _this.actions = [];
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isInDialog = /(?:\/|^)dialog\/.+$/.test(context.path);
      var isInDrawer = /(?:\/|^)drawer\/.+$/.test(context.path);
      // TODO: 旧方法无法判断，context 中没有 dropdown-button 的信息，临时实现
      // const isInDropdown = /(?:\/|^)dropdown-button\/.+$/.test(context.path);
      var isInDropdown = /^button-group\/.+$/.test(context.path);
      var buttonStateFunc = function (visibleOn, state) {
        return [amisEditorCore.getSchemaTpl('theme:font', {
          label: i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733"),
          name: "themeCss.className.font:".concat(state),
          visibleOn: visibleOn,
          editorThemePath: ["button1.type.${level}.".concat(state, ".body.font-color"), "button1.size.${size}.body.font"]
        }), amisEditorCore.getSchemaTpl('theme:colorPicker', {
          label: i18nRuntime.i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
          name: "themeCss.className.background:".concat(state),
          labelMode: 'input',
          needGradient: true,
          needImage: true,
          visibleOn: visibleOn,
          editorThemePath: "button1.type.${level}.".concat(state, ".body.bg-color")
        }), amisEditorCore.getSchemaTpl('theme:border', {
          name: "themeCss.className.border:".concat(state),
          visibleOn: visibleOn,
          editorThemePath: "button1.type.${level}.".concat(state, ".body.border")
        }), amisEditorCore.getSchemaTpl('theme:paddingAndMargin', {
          name: "themeCss.className.padding-and-margin:".concat(state),
          visibleOn: visibleOn,
          editorThemePath: "button1.size.${size}.body.padding-and-margin"
        }), amisEditorCore.getSchemaTpl('theme:radius', {
          name: "themeCss.className.radius:".concat(state),
          visibleOn: visibleOn,
          editorThemePath: "button1.size.${size}.body.border"
        }), amisEditorCore.getSchemaTpl('theme:select', {
          label: i18nRuntime.i18n("7893f221dae53be8e3bfe72d2eb8a240"),
          name: "themeCss.iconClassName.iconSize:".concat(state),
          visibleOn: visibleOn,
          editorThemePath: "button1.size.${size}.body.icon-size"
        })];
      };
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('label', {
            label: i18nRuntime.i18n("d7ec2d3fea4756bc1642e0f10c180cf5")
          }), {
            label: i18nRuntime.i18n("226b0912184333c81babf2f1894ec0c1"),
            type: 'button-group-select',
            name: 'type',
            size: 'sm',
            visibleOn: 'type === "submit" || type === "reset" ',
            options: [{
              label: i18nRuntime.i18n("fa966345577ba81af19408f203db968f"),
              value: 'button'
            }, {
              label: i18nRuntime.i18n("939d5345ad4345dbaabe14798f6ac0f1"),
              value: 'submit'
            }, {
              label: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
              value: 'reset'
            }]
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'close',
            label: i18nRuntime.i18n("5e64227f46b221001e3b151d72fa6412"),
            clearValueOnHidden: true,
            labelRemark: "\u6307\u5B9A\u6B64\u6B21\u64CD\u4F5C\u5B8C\u540E\u5173\u95ED\u5F53\u524D ".concat(isInDialog ? 'dialog' : 'drawer'),
            hidden: !isInDialog && !isInDrawer,
            pipeIn: amisEditorCore.defaultValue(false)
          }), {
            type: 'ae-switch-more',
            mode: 'normal',
            formType: 'extend',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1e7196ce05260faa55e5b7ea5a1667c2"), i18nRuntime.i18n("f3dc08e3617d1e19cf8135be4412a80b")),
            form: {
              body: [amisEditorCore.getSchemaTpl('textareaFormulaControl', {
                label: i18nRuntime.i18n("0d0c6ff7b65e62eba3ddd523e2976389"),
                mode: 'normal',
                name: 'confirmText'
              })]
            }
          }, {
            type: 'ae-switch-more',
            formType: 'extend',
            mode: 'normal',
            label: i18nRuntime.i18n("7e9646e2db5ce66dc2b4b922ece483ba"),
            hidden: isInDropdown,
            form: {
              body: [amisEditorCore.getSchemaTpl('textareaFormulaControl', {
                name: 'tooltip',
                mode: 'normal',
                label: amisEditorCore.tipedLabel(i18nRuntime.i18n("5daaffe964aee9d884e0a681b2818a17"), i18nRuntime.i18n("faa29265819714253843e23437b9193e"))
              }), amisEditorCore.getSchemaTpl('textareaFormulaControl', {
                name: 'disabledTip',
                mode: 'normal',
                label: amisEditorCore.tipedLabel(i18nRuntime.i18n("fb37b983a93aabdcdbbd59ae48c519fb"), i18nRuntime.i18n("f855f46ce6146aa17a9ed423da16bfa2")),
                clearValueOnHidden: true,
                visibleOn: 'data.tooltipTrigger !== "focus"'
              }), {
                type: 'button-group-select',
                name: 'tooltipTrigger',
                label: i18nRuntime.i18n("159dbc2fafd57b9d3652f16659b1b519"),
                // visibleOn: 'data.tooltip || data.disabledTip',
                size: 'sm',
                options: [{
                  label: i18nRuntime.i18n("d420160a9e04c481e55a9686ab158caa"),
                  value: 'hover'
                }, {
                  label: i18nRuntime.i18n("d6763cb7640bed39caa058f156007a86"),
                  value: 'focus'
                }],
                pipeIn: amisEditorCore.defaultValue('hover')
              }, {
                type: 'button-group-select',
                name: 'tooltipPlacement',
                // visibleOn: 'data.tooltip || data.disabledTip',
                label: i18nRuntime.i18n("d586324c6d6b45cb78a4172d836dab3e"),
                size: 'sm',
                options: [{
                  label: i18nRuntime.i18n("af767b7e4ae069d54f9ea839858d4c6d"),
                  value: 'top'
                }, {
                  label: i18nRuntime.i18n("4d9c32c23df5d234e629c922c58d8e12"),
                  value: 'right'
                }, {
                  label: i18nRuntime.i18n("3850a186c3235bc646d4c2f79cebac36"),
                  value: 'bottom'
                }, {
                  label: i18nRuntime.i18n("d2aff1417831aa621c16cd5b95306b4b"),
                  value: 'left'
                }],
                pipeIn: amisEditorCore.defaultValue('bottom')
              }]
            }
          }, amisEditorCore.getSchemaTpl('icon', {
            label: i18nRuntime.i18n("c182ad6b97f0909596a523b1f04c28d2")
          }), amisEditorCore.getSchemaTpl('icon', {
            name: 'rightIcon',
            label: i18nRuntime.i18n("ad7e6f016bc1d9a9bbc6e18224d73247")
          }), amisEditorCore.getSchemaTpl('badge')]
        }, amisEditorCore.getSchemaTpl('status', {
          disabled: true
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('buttonLevel', {
            label: i18nRuntime.i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
            name: 'level',
            hidden: isInDropdown
          }), amisEditorCore.getSchemaTpl('buttonLevel', {
            label: i18nRuntime.i18n("c12ba7b658a9fccf0815f3951bc759b6"),
            name: 'activeLevel',
            hidden: isInDropdown,
            visibleOn: 'data.active'
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'block',
            label: i18nRuntime.i18n("6aa6b9e2dca63d27dc74eb155020271d"),
            hidden: isInDropdown
          }), amisEditorCore.getSchemaTpl('size', {
            label: i18nRuntime.i18n("c8339fd2a85af4ba66084d28df808de4"),
            hidden: isInDropdown
          })]
        }, {
          title: i18nRuntime.i18n("6f99b6eed37795cb97d5f6370c32113b"),
          body: tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([{
            type: 'select',
            name: 'editorState',
            label: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
            selectFirst: true,
            options: [{
              label: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
              value: 'default'
            }, {
              label: i18nRuntime.i18n("062d0b688adb10f3af5ebc2fd2667f1c"),
              value: 'hover'
            }, {
              label: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
              value: 'active'
            }]
          }], tslib.__read(buttonStateFunc("${editorState == 'default' || !editorState}", 'default')), false), tslib.__read(buttonStateFunc("${editorState == 'hover'}", 'hover')), false), tslib.__read(buttonStateFunc("${editorState == 'active'}", 'active')), false)
        }, amisEditorCore.getSchemaTpl('theme:cssCode', {
          themeClass: [{
            value: '',
            state: ['default', 'hover', 'active']
          }]
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: !!context.schema.actionType || ['submit', 'reset'].includes(context.schema.type) ? [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context))), helper.getOldActionSchema(_this.manager, context)] : [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  /**
   * 如果禁用了没办法编辑
   */
  ButtonPlugin.prototype.filterProps = function (props) {
    props.disabled = false;
    return props;
  };
  /**
   * 如果配置里面有 rendererName 自动返回渲染器信息。
   * @param renderer
   */
  ButtonPlugin.prototype.getRendererInfo = function (_a) {
    var renderer = _a.renderer,
      schema = _a.schema;
    var plugin = this;
    if (schema.$$id && plugin.name && plugin.rendererName && plugin.rendererName === renderer.name) {
      // 复制部分信息出去
      return {
        name: schema.label ? schema.label : plugin.name,
        regions: plugin.regions,
        patchContainers: plugin.patchContainers,
        // wrapper: plugin.wrapper,
        vRendererConfig: plugin.vRendererConfig,
        wrapperProps: plugin.wrapperProps,
        wrapperResolve: plugin.wrapperResolve,
        filterProps: plugin.filterProps,
        $schema: plugin.$schema,
        renderRenderer: plugin.renderRenderer
      };
    }
  };
  ButtonPlugin.id = 'ButtonPlugin';
  ButtonPlugin.scene = ['layout'];
  return ButtonPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ButtonPlugin);

exports.ButtonPlugin = ButtonPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
