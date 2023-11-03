/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var PagePlugin = /** @class */function (_super) {
  tslib.__extends(PagePlugin, _super);
  function PagePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'page';
    _this.$schema = '/schemas/PageSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("59ceff465ad16932d8972191ad815dfb");
    _this.isBaseComponent = true;
    // 只有顶级才会用到这个page组件
    _this.disabledRendererPlugin = true;
    _this.description = i18nRuntime.i18n("243e91d5fbc5a03a5c54da6d8e662e4f");
    _this.docLink = '/amis/zh-CN/components/page';
    _this.tags = i18nRuntime.i18n("22c799040acdb2601b437ed5449de076");
    _this.icon = 'fa fa-desktop';
    // pluginIcon = 'page-plugin'; // 暂无新 icon
    _this.scaffold = {
      type: 'page',
      regions: ['body'],
      body: [{
        type: 'tpl',
        tpl: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014")
      }]
    };
    _this.previewSchema = {
      type: 'page',
      className: 'text-left b-a',
      asideClassName: 'w-xs',
      title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      subTitle: i18nRuntime.i18n("72cf373be86a38b29f6d2f15900b0da1"),
      aside: i18nRuntime.i18n("54002bbf7eb3da8346dd4be61d642bca"),
      body: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014")
    };
    _this.events = [{
      eventName: 'init',
      eventLabel: i18nRuntime.i18n("2cb472ff9cad0c89a033c53996b52053"),
      description: i18nRuntime.i18n("76ddcc0ad85aa4be6875b73244a64faf"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18nRuntime.i18n("85f1708454f409855d552f702ac27b19")
          }
        }
      }]
    }, {
      eventName: 'inited',
      eventLabel: i18nRuntime.i18n("f36616e35765ac3d5c9c7646e50a305d"),
      description: i18nRuntime.i18n("48c43999cf3908d9f5100a6d5f0b4404"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              responseData: {
                type: 'object',
                title: i18nRuntime.i18n("aa6070a7f454f554fc1c7d8b1d2d935f")
              },
              responseStatus: {
                type: 'number',
                title: i18nRuntime.i18n("23d861e4b6635508eb877a50a9333a9b")
              },
              responseMsg: {
                type: 'string',
                title: i18nRuntime.i18n("a303669d47440ed05558efbf3d5d0592")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'pullRefresh',
      eventLabel: i18nRuntime.i18n("5d758dc5e33ba0122c256d80c1572e88"),
      description: i18nRuntime.i18n("d6fdfa4f989be6586a7a29ea85522f24")
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    // 普通容器类渲染器配置
    _this.regions = [{
      key: 'toolbar',
      label: i18nRuntime.i18n("012f602372cd2dbd639cd966c63e1f90"),
      preferTag: i18nRuntime.i18n("56e6db657d4775698984f883b71cb379")
    }, {
      key: 'aside',
      label: i18nRuntime.i18n("54002bbf7eb3da8346dd4be61d642bca"),
      placeholder: i18nRuntime.i18n("4f9fa9ee5b0604d97da73e77fdbc281e")
    }, {
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      placeholder: i18nRuntime.i18n("40fd4b2a194b2b1284a7f7f738b69640")
    }];
    _this.wrapper = amisEditorCore.ContainerWrapper;
    _this.panelTitle = i18nRuntime.i18n("59ceff465ad16932d8972191ad815dfb");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'checkboxes',
            name: 'regions',
            label: i18nRuntime.i18n("0e82bfaaec104a9f0eeb14820b42e7c8"),
            pipeIn: function (value) {
              return Array.isArray(value) ? value : ['body', 'toolbar', 'aside', 'header'];
            },
            pipeOut: function (value) {
              return Array.isArray(value) && value.length ? value : ['body', 'toolbar', 'aside', 'header'];
            },
            joinValues: false,
            extractValue: true,
            inline: false,
            options: [{
              label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
              value: 'body'
            }, {
              label: i18nRuntime.i18n("391555a3772260743f19278f01adf75e"),
              value: 'header'
            }, {
              label: i18nRuntime.i18n("012f602372cd2dbd639cd966c63e1f90"),
              value: 'toolbar'
            }, {
              label: i18nRuntime.i18n("54002bbf7eb3da8346dd4be61d642bca"),
              value: 'aside'
            }]
          }, amisEditorCore.getSchemaTpl('pageTitle'), amisEditorCore.getSchemaTpl('pageSubTitle'), amisEditorCore.getSchemaTpl('remark', {
            label: i18nRuntime.i18n("3ba265c6b63bde0319822afd6b9a649d"),
            hiddenOn: 'data.regions && !data.regions.includes("header") || !data.title'
          }), {
            type: 'ae-Switch-More',
            name: 'asideResizor',
            mode: 'normal',
            label: i18nRuntime.i18n("e7f2f04f7c2b2e9e07b69767ea28d6ab"),
            hiddenOn: 'data.regions && !data.regions.includes("aside")',
            value: false,
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [{
                type: 'input-number',
                label: i18nRuntime.i18n("a2b62974f4d7564bb68b570116f25a10"),
                min: 0,
                name: 'asideMinWidth',
                pipeIn: amisEditorCore.defaultValue(160),
                pipeOut: function (value) {
                  return value || 0;
                }
              }, {
                type: 'input-number',
                label: i18nRuntime.i18n("99b57d8c9244ff9a695fcd519b4e2e57"),
                min: 0,
                name: 'asideMaxWidth',
                pipeIn: amisEditorCore.defaultValue(350),
                pipeOut: function (value) {
                  return value || 0;
                }
              }]
            }
          }, {
            type: 'switch',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("28d602809bd1dc6b47ceb38cb54f32de"), i18nRuntime.i18n("36bded76593f98fab62453c7430b2918")),
            name: 'asideSticky',
            inputClassName: 'is-inline',
            pipeIn: amisEditorCore.defaultValue(true),
            hiddenOn: 'data.regions && !data.regions.includes("aside")'
          }]
        }, {
          title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
          body: [
          // page组件下掉组件静态数据配置项，可通过页面变量来定义页面中的变量
          // getSchemaTpl('combo-container', {
          //   type: 'input-kv',
          //   mode: 'normal',
          //   name: 'data',
          //   label: '组件静态数据'
          // }),
          amisEditorCore.getSchemaTpl('apiControl', {
            name: 'initApi',
            mode: 'row',
            labelClassName: 'none',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("b4bc91701b86fe8543d649e97daea602"), i18nRuntime.i18n("4143d7418de740e8bc26ef4b27c63534"))
          })]
        },, {
          title: i18nRuntime.i18n("c95e748d5811faae5c52bdc07bee51a0"),
          body: [{
            type: 'combo',
            name: 'pullRefresh',
            mode: 'normal',
            noBorder: true,
            items: [{
              type: 'ae-Switch-More',
              mode: 'normal',
              label: i18nRuntime.i18n("5d758dc5e33ba0122c256d80c1572e88"),
              name: 'disabled',
              formType: 'extend',
              value: true,
              trueValue: false,
              falseValue: true,
              autoFocus: false,
              form: {
                body: [{
                  name: 'pullingText',
                  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("04f767eaa571383ea271432bee6deedf"), i18nRuntime.i18n("e24bc5fd094c7c272725c6340d8aeb8e")),
                  type: 'input-text'
                }, {
                  name: 'loosingText',
                  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("0b3eef4f8a8061baa22416dc1e5dad03"), i18nRuntime.i18n("717b23399e04873441478fef1cc16d43")),
                  type: 'input-text'
                }]
              }
            }]
          }]
        }])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout'],
          classname: 'baseControlClassName',
          baseTitle: i18nRuntime.i18n("6f99b6eed37795cb97d5f6370c32113b"),
          extra: [amisEditorCore.getSchemaTpl('theme:base', {
            classname: 'bodyControlClassName',
            title: i18nRuntime.i18n("4e74ff55b36a0f35d511a761c264fce3"),
            hiddenOn: 'data.regions && !data.regions.includes("body")'
          }), amisEditorCore.getSchemaTpl('theme:base', {
            classname: 'headerControlClassName',
            title: i18nRuntime.i18n("a67496c9ef1b1951fb9f104d1ef17997"),
            extra: [amisEditorCore.getSchemaTpl('theme:font', {
              label: i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733"),
              name: 'themeCss.titleControlClassName.font'
            })],
            hiddenOn: 'data.regions && !data.regions.includes("header")'
          }), amisEditorCore.getSchemaTpl('theme:base', {
            classname: 'toolbarControlClassName',
            title: i18nRuntime.i18n("af608093f1d3c25e85bdb4ed17f8b947"),
            hiddenOn: 'data.regions && !data.regions.includes("toolbar")'
          }), amisEditorCore.getSchemaTpl('theme:base', {
            classname: 'asideControlClassName',
            title: i18nRuntime.i18n("fa898e5ae4c0315061129c6cef47c326"),
            hiddenOn: 'data.regions && !data.regions.includes("aside")'
          })]
        })), false))]
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }
      // {
      //   type: 'combo',
      //   name: 'definitions',
      //   multiple: true,
      //   multiLine: true,
      //   label: '定义',
      //   description: '定义类型，定义完成后可被子节点引用。',
      //   pipeIn: (value: any) =>
      //     value
      //       ? Object.keys(value).map(key => ({
      //           key,
      //           value: value[key]
      //         }))
      //       : [],
      //   pipeOut: (value: any) =>
      //     Array.isArray(value)
      //       ? value.reduce(
      //           (obj, current) => ({
      //             ...obj,
      //             [current.key || '']: current.value
      //               ? current.value
      //               : {type: 'tpl', tpl: '内容', wrapperComponent: ''}
      //           }),
      //           {}
      //         )
      //       : undefined,
      //   items: [
      //     {
      //       type: 'input-text',
      //       name: 'key',
      //       label: 'Key',
      //       required: true
      //     },
      //     {
      //       children: ({index}: any) => (
      //         <Button
      //           size="sm"
      //           level="danger"
      //           // onClick={this.handleEditDefinitionDetail.bind(
      //           //   this,
      //           //   index
      //           // )}
      //           block
      //         >
      //           配置详情
      //         </Button>
      //       )
      //     }
      //   ]
      // }
      // ]
      // }
      ])];
    };

    return _this;
  }
  PagePlugin.prototype.buildDataSchemas = function (node, region, trigger) {
    var _a, _b, _c, _d;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var jsonschema, pool, current, schema, _e, _f;
      return tslib.__generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            jsonschema = tslib.__assign({}, amisEditorCore.jsonToJsonSchema(amisEditorCore.JSONPipeOut(node.schema.data)));
            pool = node.children.concat();
            _g.label = 1;
          case 1:
            if (!pool.length) return [3 /*break*/, 5];
            current = pool.shift();
            schema = current.schema;
            if (!(((_a = current.rendererConfig) === null || _a === void 0 ? void 0 : _a.isFormItem) && (schema === null || schema === void 0 ? void 0 : schema.name))) return [3 /*break*/, 3];
            _e = jsonschema.properties;
            _f = schema.name;
            return [4 /*yield*/, (_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, undefined, trigger, node)];
          case 2:
            _e[_f] = _g.sent();
            return [3 /*break*/, 4];
          case 3:
            if (!((_d = current.rendererConfig) === null || _d === void 0 ? void 0 : _d.storeType)) {
              pool.push.apply(pool, tslib.__spreadArray([], tslib.__read(current.children), false));
            }
            _g.label = 4;
          case 4:
            return [3 /*break*/, 1];
          case 5:
            return [2 /*return*/, jsonschema];
        }
      });
    });
  };
  PagePlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'inited') {
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = tslib.__assign({
        $id: 'pageInitedData'
      }, amisEditorCore.jsonToJsonSchema(data.responseData));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  PagePlugin.id = 'PagePlugin';
  return PagePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(PagePlugin);

exports.PagePlugin = PagePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
