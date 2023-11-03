/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisCore = require('amis-core');
var amisEditorCore = require('amis-editor-core');
var DSBuilderManager = require('../../builder/DSBuilderManager.js');
var validator = require('../../validator.js');
var helper = require('../../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var ComboControlPlugin = /** @class */function (_super) {
  tslib.__extends(ComboControlPlugin, _super);
  function ComboControlPlugin(manager) {
    var _this = _super.call(this, manager) || this;
    // 关联渲染器名字
    _this.rendererName = 'combo';
    _this.$schema = '/schemas/ComboControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("254bb8aa6b92d588d957a383df24db1e");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-group';
    _this.pluginIcon = 'combo-plugin';
    _this.description = i18nRuntime.i18n("4db731c7d73988e40a01b4bf1a7f00d7");
    _this.docLink = '/amis/zh-CN/components/form/combo';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'combo',
      label: i18nRuntime.i18n("254bb8aa6b92d588d957a383df24db1e"),
      name: 'combo',
      multiple: true,
      addable: true,
      removable: true,
      removableMode: 'icon',
      addBtn: {
        label: i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191"),
        icon: 'fa fa-plus',
        level: 'primary',
        size: 'sm'
      },
      items: [{
        type: 'input-text',
        name: 'input-text',
        placeholder: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb")
      }, {
        type: 'select',
        name: 'select',
        placeholder: i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"),
        options: [{
          label: 'A',
          value: 'a'
        }, {
          label: 'B',
          value: 'b'
        }]
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: [{
          text: 'Row 1',
          select: 'a'
        }, {}]
      })]
    };
    // 容器配置
    _this.regions = [{
      key: 'items',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      preferTag: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderItems'
    }];
    // 事件定义
    _this.events = [{
      eventName: 'add',
      eventLabel: i18nRuntime.i18n("b58c7549c0246c55b9cac96383200338"),
      description: i18nRuntime.i18n("8575b828c7320de82b9f99058aa1f55f"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("e26f6832d586f9e73d2361573bf5273f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'delete',
      eventLabel: i18nRuntime.i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      description: i18nRuntime.i18n("4933bd64bb23de03ca8ed246fa5509c5"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              key: {
                type: 'string',
                title: i18nRuntime.i18n("91190195405845950230616929d852cf")
              },
              value: {
                type: 'string',
                title: i18nRuntime.i18n("e26f6832d586f9e73d2361573bf5273f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("28e5fd494ea37a09fd2ad36d0f98bacc")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'tabsChange',
      eventLabel: i18nRuntime.i18n("95e09290c4e0f01323bb5abf301c950b"),
      description: i18nRuntime.i18n("ba2bd765f6c2e2b717139c5453884e14"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              key: {
                type: 'string',
                title: i18nRuntime.i18n("b04c6cf9cb1212b9c173ddfeec129028")
              },
              value: {
                type: 'string',
                title: i18nRuntime.i18n("e26f6832d586f9e73d2361573bf5273f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("046de1a6cb21ff83af74958342c0db64")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'addItem',
      actionLabel: i18nRuntime.i18n("00d1a6230e9a31664c895e95fde707d3"),
      description: i18nRuntime.i18n("cf3f7c0c1e6c77197bb0b6508a9173aa"),
      innerArgs: ['item'],
      schema: helper.getArgsWrapper({
        type: 'combo',
        label: i18nRuntime.i18n("00d1a6230e9a31664c895e95fde707d3"),
        name: 'item',
        draggable: false,
        multiple: true,
        removable: true,
        required: true,
        addable: true,
        strictMode: false,
        canAccessSuperData: true,
        mode: 'horizontal',
        items: [{
          name: 'key',
          type: 'input-text',
          required: true,
          placeholder: i18nRuntime.i18n("a25657422b40023f2731619587940bc7"),
          source: '${__setValueDs}'
        }, amisEditorCore.getSchemaTpl('formulaControl', {
          name: 'val',
          variables: '${variables}',
          inputMode: 'input-group'
        })]
      })
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18nRuntime.i18n("254bb8aa6b92d588d957a383df24db1e");
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          className: 'p-none',
          title: i18nRuntime.i18n("f7e68bde2caa2cb5696d6a37fe4a23a4"),
          body: [amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: tslib.__assign(tslib.__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'textarea'
            }),
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("225f3ed00750ae78ad1e6ea42c8f5087"), i18nRuntime.i18n("bf8f46b5c3b309f666965a74d57ac093")),
            pipeOut: function (value) {
              try {
                return typeof JSON.parse(value) === 'number' ? value : JSON.parse(value);
              } catch (err) {
                return value;
              }
            }
          }),
          // 多选模式和条数绑定了，所以设定了多选，条数开启
          amisEditorCore.getSchemaTpl('switch', {
            name: 'multiple',
            label: i18nRuntime.i18n("e3be7b8a459a08fec8f378a0660b642b"),
            pipeIn: amisEditorCore.defaultValue(true),
            onChange: function (value, oldValue, model, form) {
              form.setValueByName('addable', value);
              form.setValueByName('removable', value);
              !value && form.setValueByName('draggable', false);
              form.setValueByName('flat', false);
            }
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.multiple',
            body: [{
              label: i18nRuntime.i18n("3a553b1123f403cf1f81eb28b3e4b814"),
              name: 'maxLength',
              type: 'input-number'
            }, {
              label: i18nRuntime.i18n("93bc4888bc13bb6e6c49b34b54077438"),
              name: 'minLength',
              type: 'input-number'
            }]
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'flat',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("e61c32382d879b867938086a50ef094e"), i18nRuntime.i18n("28a59fee1a4714493a8d6cec05c1417b")),
            visibleOn: 'Array.isArray(data.items) && data.items.length === 1 && data.multiple'
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.multiple && data.flat',
            body: [amisEditorCore.getSchemaTpl('joinValues'), amisEditorCore.getSchemaTpl('delimiter')]
          },
          // 可排序，排序和新增无关，和多选模式有关
          amisEditorCore.getSchemaTpl('switch', {
            name: 'draggable',
            label: i18nRuntime.i18n("b4521626a48dcb61001fc563d2433ed3"),
            pipeIn: amisEditorCore.defaultValue(false),
            visibleOn: 'data.multiple'
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.draggable',
            body: [amisEditorCore.getSchemaTpl('draggableTip')]
          },
          // 可新增
          amisEditorCore.getSchemaTpl('switch', {
            name: 'addable',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("8865c6822a31e0da6bc7eece8677d8f0"), i18nRuntime.i18n("30d4e9f1c60f2d5851f77463476d568b")),
            visibleOn: 'data.multiple',
            pipeIn: amisEditorCore.defaultValue(false),
            onChange: function (value, oldValue, model, form) {
              if (value) {
                form.setValueByName('addBtn', {
                  label: i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191"),
                  icon: 'fa fa-plus',
                  level: 'primary',
                  size: 'sm'
                });
              }
            }
          }),
          // 可删除
          amisEditorCore.getSchemaTpl('switch', {
            name: 'removable',
            label: i18nRuntime.i18n("3c87af7c432e6b1f59e4f415fd5060cf"),
            pipeIn: amisEditorCore.defaultValue(false),
            visibleOn: 'data.multiple',
            onChange: function (value, oldValue, model, form) {
              if (value) {
                form.setValueByName('removableMode', 'icon');
                form.setValueByName('deleteIcon', undefined);
                form.setValueByName('deleteBtn', undefined);
              }
            }
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.removable',
            body: [
            // 自定义删除按钮开关
            {
              type: 'button-group-select',
              name: 'removableMode',
              label: i18nRuntime.i18n("405a48545938c075e62eafb80b732769"),
              options: [{
                label: i18nRuntime.i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
                value: 'icon'
              }, {
                label: i18nRuntime.i18n("fa966345577ba81af19408f203db968f"),
                value: 'button'
              }],
              onChange: function (value, oldValue, model, form) {
                if (value === 'icon') {
                  form.setValueByName('deleteBtn', undefined);
                } else if (value === 'button') {
                  form.setValueByName('deleteBtn', {
                    label: i18nRuntime.i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
                    level: 'default'
                  });
                }
              }
            },
            // getSchemaTpl('icon', {
            //   name: 'deleteIcon',
            //   label: '图标',
            //   visibleOn: 'data.removableMode === "icon"'
            // }),
            {
              label: i18nRuntime.i18n("f4b06bd9e4f5ceaac7fbb0e17fffc518"),
              name: 'deleteBtn.label',
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              visibleOn: 'data.removableMode === "button"'
            }, amisEditorCore.getSchemaTpl('buttonLevel', {
              label: i18nRuntime.i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
              name: 'deleteBtn.level',
              visibleOn: 'data.removableMode === "button"'
            }), amisEditorCore.getSchemaTpl('apiControl', {
              name: 'deleteApi',
              label: i18nRuntime.i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
              renderLabel: false,
              mode: 'normal'
            }), amisEditorCore.getSchemaTpl('deleteConfirmText')]
          }, amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('description')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true,
          readonly: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        }), amisEditorCore.getSchemaTpl('collapseGroup', [{
          className: 'p-none',
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            name: 'canAccessSuperData',
            label: i18nRuntime.i18n("f7894f17d0eba299011d856ce3efea73"),
            pipeIn: amisEditorCore.defaultValue(false)
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'strictMode',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("98d52b737d6bc171b6d5bad9a42f6e23"), i18nRuntime.i18n("cb5ca128b6c78a90f26673e21b0b3f28")),
            value: true
          }), amisEditorCore.getSchemaTpl('combo-container', {
            name: 'syncFields',
            visibleOn: '!data.strictMode',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("7fc8dab2069004acb8f5c98c27ee0883"), i18nRuntime.i18n("07bf6c08bb5f0bdb32dbfecc7d3fe290")),
            type: 'combo',
            mode: 'normal',
            multiple: true,
            canAccessSuperData: true,
            items: [{
              name: 'field',
              type: 'input-text'
            }],
            value: [],
            pipeIn: function (value) {
              return (value !== null && value !== void 0 ? value : []).map(function (item) {
                return {
                  field: item
                };
              });
            },
            pipeOut: function (value) {
              return (value !== null && value !== void 0 ? value : []).map(function (item) {
                var keys = Object.keys(item);
                return keys.length > 0 ? item.field : '';
              });
            }
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'lazyLoad',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("9ff4713f6b17e96e9cd76650fd5892be"), i18nRuntime.i18n("93dc24d4ad01981d5994ba7f8ffaf345")),
            pipeIn: amisEditorCore.defaultValue(false),
            visibleOn: 'data.multiple && !data.tabsMode'
          })]
        }])])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          visibleOn: 'data.multiple',
          body: [{
            name: 'tabsMode',
            label: i18nRuntime.i18n("1e409f26f9c1d58ce0c47a68104d45f0"),
            type: 'button-group-select',
            inputClassName: 'items-center',
            size: 'sm',
            options: [{
              label: i18nRuntime.i18n("eee1e2258d7ea163fec625ee44be9637"),
              value: false
            }, {
              label: i18nRuntime.i18n("9377e388f7189d6103a3985a321115c8"),
              value: true
            }],
            pipeIn: amisEditorCore.defaultValue(false),
            onChange: function (value, oldValue, model, form) {
              if (value) {
                form.setValueByName('lazyLoad', undefined);
              }
            }
          }, {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'data.tabsMode',
            body: [{
              type: 'select',
              name: 'tabsStyle',
              label: i18nRuntime.i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
              pipeIn: amisEditorCore.defaultValue(''),
              options: [{
                label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
                value: ''
              }, {
                label: i18nRuntime.i18n("ecfcea4b381d761fecd512761bc07954"),
                value: 'line'
              }, {
                label: i18nRuntime.i18n("d87f215d9ac688b1d3399bf575a0ef6f"),
                value: 'card'
              }, {
                label: i18nRuntime.i18n("22d18bf0c476ebe7aa9303108677ff2e"),
                value: 'radio'
              }]
            }, amisEditorCore.getSchemaTpl('formulaControl', {
              label: i18nRuntime.i18n("8e32c9ffc35059f8ac5254ffaf3c99b0"),
              name: 'tabsLabelTpl'
            })]
          },
          // 表单多行展示
          amisEditorCore.getSchemaTpl('switch', {
            name: 'multiLine',
            label: i18nRuntime.i18n("21766034147682a2435ecc766de5ea22"),
            pipeIn: amisEditorCore.defaultValue(false),
            visibleOn: '!data.tabsMode',
            onChange: function (value, oldValue, model, form) {
              if (!value) {
                form.setValueByName('subFormMode', undefined);
                form.setValueByName('noBorder', undefined);
              }
            }
          }), amisEditorCore.getSchemaTpl('switch', {
            visibleOn: '!data.tabsMode && data.multiLine',
            name: 'noBorder',
            label: i18nRuntime.i18n("8ee004bdd55b578acdb10b1bcd3fa4f7"),
            pipeIn: amisEditorCore.defaultValue(false)
          })]
        }, amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [amisEditorCore.getSchemaTpl('subFormItemMode', {
            visibleOn: 'data.multiLine',
            type: 'select',
            label: i18nRuntime.i18n("32f6f7f8164c7f78e4b46eb50c158ab9")
          })]
        }), amisEditorCore.getSchemaTpl('style:classNames')])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.dsManager = new DSBuilderManager.DSBuilderManager(manager);
    return _this;
  }
  ComboControlPlugin.prototype.filterProps = function (props) {
    // 至少显示一个成员，否则啥都不显示。
    if (props.multiple && !props.value && !props.$schema.value && !props.$ref) {
      var mockedData_1 = {};
      if (Array.isArray(props.items) && props.items.length === 0) {
        props.items.forEach(function (control) {
          control.name && amisCore.setVariable(mockedData_1, control.name, amisEditorCore.mockValue(control));
        });
      }
      props.value = [mockedData_1];
      return props;
    }
    return props;
  };
  ComboControlPlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var itemsSchema, items, parentScopeId, isColumnChild, scopeId, pool, current, schema, _k, _l, scopeId, scope;
      return tslib.__generator(this, function (_m) {
        switch (_m.label) {
          case 0:
            itemsSchema = {
              $id: "".concat(node.id, "-").concat(node.type, "-tableRows"),
              type: 'object',
              properties: {}
            };
            items = (_a = node.children) === null || _a === void 0 ? void 0 : _a.find(function (child) {
              return child.isRegion && child.region === 'items';
            });
            parentScopeId = "".concat(parent === null || parent === void 0 ? void 0 : parent.id, "-").concat(parent === null || parent === void 0 ? void 0 : parent.type).concat(((_b = node.parent) === null || _b === void 0 ? void 0 : _b.type) === 'cell' ? '-currentRow' : '');
            isColumnChild = false;
            if (trigger) {
              isColumnChild = amisCore.someTree(items.children, function (item) {
                return item.id === (trigger === null || trigger === void 0 ? void 0 : trigger.id);
              });
              if (isColumnChild) {
                scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                if (this.manager.dataSchema.getScope(scopeId)) {
                  this.manager.dataSchema.removeScope(scopeId);
                }
                if (this.manager.dataSchema.getScope(parentScopeId)) {
                  this.manager.dataSchema.switchTo(parentScopeId);
                }
                this.manager.dataSchema.addScope([], scopeId);
                this.manager.dataSchema.current.tag = i18nRuntime.i18n("bf2a4fd8ecd654982e2d466f10f54d3f");
                this.manager.dataSchema.current.group = i18nRuntime.i18n("813a5158d9f7171d20e7df340c5b48f9");
              }
            }
            pool = items.children.concat();
            _m.label = 1;
          case 1:
            if (!pool.length) return [3 /*break*/, 4];
            current = pool.shift();
            schema = current.schema;
            if (!schema.name) return [3 /*break*/, 3];
            _k = itemsSchema.properties;
            _l = schema.name;
            return [4 /*yield*/, (_d = (_c = current.info.plugin).buildDataSchemas) === null || _d === void 0 ? void 0 : _d.call(_c, current, region, trigger, node)];
          case 2:
            _k[_l] = _m.sent();
            _m.label = 3;
          case 3:
            return [3 /*break*/, 1];
          case 4:
            if (isColumnChild) {
              scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
              scope = this.manager.dataSchema.getScope(scopeId);
              scope === null || scope === void 0 ? void 0 : scope.addSchema(itemsSchema);
            }
            if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.multiple) {
              return [2 /*return*/, {
                $id: 'combo',
                type: 'array',
                title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name),
                items: itemsSchema
              }];
            }
            return [2 /*return*/, tslib.__assign(tslib.__assign({}, itemsSchema), {
              title: ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.label) || ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.name)
            })];
        }
      });
    });
  };
  ComboControlPlugin.prototype.getAvailableContextFields = function (scopeNode, target, region) {
    var _a, _b;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var scope, builder;
      return tslib.__generator(this, function (_c) {
        if (target.type === scopeNode.type || target.parent.isRegion && target.parent.region === 'items') {
          scope = scopeNode.parent.parent;
          builder = this.dsManager.getBuilderBySchema(scope.schema);
        }
        if (builder && scope.schema.api) {
          return [2 /*return*/, builder.getAvailableContextFields({
            schema: scope.schema,
            sourceKey: 'api',
            feat: (_b = (_a = scope.schema) === null || _a === void 0 ? void 0 : _a.feat) !== null && _b !== void 0 ? _b : 'List',
            scopeNode: scopeNode
          }, /** ID相同为本体，否则为子项 */
          (target === null || target === void 0 ? void 0 : target.id) === (scopeNode === null || scopeNode === void 0 ? void 0 : scopeNode.id) ? scopeNode : target)];
        }
        return [2 /*return*/];
      });
    });
  };

  ComboControlPlugin.id = 'ComboControlPlugin';
  return ComboControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ComboControlPlugin);

exports.ComboControlPlugin = ComboControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
