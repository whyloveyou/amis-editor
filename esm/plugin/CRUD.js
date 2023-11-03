/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __awaiter, __generator, __values, __rest, __spreadArray, __read } from 'tslib';
import { normalizeApiResponseData, toast } from 'amis';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import React__default from 'react';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import { getSchemaTpl, JSONPipeIn, defaultValue, tipedLabel, getI18nEnabled, jsonToJsonSchema, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { setVariable, normalizeApi, someTree } from 'amis-core';
import { getEnv } from 'mobx-state-tree';
import isPlainObject from 'lodash/isPlainObject';
import { i18n } from 'i18n-runtime';

var viewTypeToEditType = function (type) {
  return type === 'tpl' ? 'input-text' : type === 'status' || type === 'mapping' ? 'select' : "input-".concat(type);
};
var CRUDPlugin = /** @class */function (_super) {
  __extends(CRUDPlugin, _super);
  function CRUDPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'crud';
    _this.$schema = '/schemas/CRUDSchema.json';
    _this.order = -800;
    // 组件名称
    _this.name = i18n("d7213304d1a8a02a73a2f4010839e061");
    _this.isBaseComponent = true;
    _this.description = i18n("7a9f1ec32752de8b69ef21138970f64d");
    _this.docLink = '/amis/zh-CN/components/crud';
    _this.tags = [i18n("73721e611daaafe5c34aa9f3f901d016")];
    _this.icon = 'fa fa-table';
    _this.pluginIcon = 'table-plugin';
    _this.scaffold = {
      type: 'crud',
      syncLocation: false,
      api: '',
      columns: [{
        name: 'id',
        label: 'ID',
        type: 'text'
      }, {
        name: 'engine',
        label: i18n("48c68eb5a42e2b3e679c53b00f6e203f"),
        type: 'text'
      }],
      bulkActions: [],
      itemActions: []
    };
    _this.events = [{
      eventName: 'fetchInited',
      eventLabel: i18n("f36616e35765ac3d5c9c7646e50a305d"),
      description: i18n("48c43999cf3908d9f5100a6d5f0b4404"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              responseData: {
                type: 'object',
                title: i18n("aa6070a7f454f554fc1c7d8b1d2d935f")
              },
              responseStatus: {
                type: 'number',
                title: i18n("23d861e4b6635508eb877a50a9333a9b")
              },
              responseMsg: {
                type: 'string',
                title: i18n("a303669d47440ed05558efbf3d5d0592")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'selectedChange',
      eventLabel: i18n("257f5a3886d87d2255206f86b880d07e"),
      description: i18n("6130b1f75d624b2f73f5d923492e92f7"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              selectedItems: {
                type: 'array',
                title: i18n("6142a89066ca7dd6a1ce9493462c5aca")
              },
              unSelectedItems: {
                type: 'array',
                title: i18n("21bd0846bd8aa2296c597a1c1ff8e1a7")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnSort',
      eventLabel: i18n("f3d21138c8ecf5683503c4f814cc7199"),
      description: i18n("d84464cfb2a5828a200fe9c28a323122"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              orderBy: {
                type: 'string',
                title: i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
              },
              orderDir: {
                type: 'string',
                title: i18n("c35c1a13309c6f9da9837857517e65fc")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnFilter',
      eventLabel: i18n("3d0b957a99d0c366612c01913e17a0c7"),
      description: i18n("b35963687361af98e6acdc004e87fc3c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              filterName: {
                type: 'string',
                title: i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
              },
              filterValue: {
                type: 'string',
                title: i18n("e125986c2ba6783c4297ffe5405cc8bc")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnSearch',
      eventLabel: i18n("93a5a0253f11e3a2e58f4e87a52fb094"),
      description: i18n("6d4c4990ab2c32efe8a17c5f22e10cb5"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              searchName: {
                type: 'string',
                title: i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
              },
              searchValue: {
                type: 'object',
                title: i18n("caafbcb52c70ad0bbbbf127ee7b08b89")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'orderChange',
      eventLabel: i18n("85ddd38957256b6e9026f42ed570bc35"),
      description: i18n("d7a66def82af88cd5d408e38feb8a65a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              movedItems: {
                type: 'array',
                title: i18n("64ef585f778c9d1b010e86b032398ab6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnToggled',
      eventLabel: i18n("ecfebbc91e2c18a512aeb11b7da15193"),
      description: i18n("c94f45773a42dc386b9c9dcdc6fa542b"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              columns: {
                type: 'array',
                title: i18n("db9df54392e408520ca12c6a56113b5a")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'rowClick',
      eventLabel: i18n("76e47871d654c3b0b0e301c0a076e55a"),
      description: i18n("cc13521eab2c7423b3fb857772405cc3"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
              },
              index: {
                type: 'number',
                title: i18n("f74fd69ce55e3f96fe9a032c0da42330")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'rowMouseEnter',
      eventLabel: i18n("5db079b140feffa84c84d1b51d824dea"),
      description: i18n("90a5608bcd85a3cfcfbb5263a229915c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
              },
              index: {
                type: 'number',
                title: i18n("f74fd69ce55e3f96fe9a032c0da42330")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'rowMouseLeave',
      eventLabel: i18n("e8bf039de5dc6751c4045f55930e0c83"),
      description: i18n("f1ca0d305f3251a81f361a2dc8e11fff"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
              },
              index: {
                type: 'number',
                title: i18n("f74fd69ce55e3f96fe9a032c0da42330")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'reload',
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      actionType: 'setValue',
      description: i18n("f97f8b90f09fb7df39c5c9ae3554b4c7")
    }];
    _this.btnSchemas = {
      create: {
        label: i18n("66ab5e9f24c8f46012a25c89919fb191"),
        type: 'button',
        actionType: 'dialog',
        level: 'primary',
        dialog: {
          title: i18n("66ab5e9f24c8f46012a25c89919fb191"),
          body: {
            type: 'form',
            api: 'xxx/create',
            body: []
          }
        }
      },
      update: {
        label: i18n("95b351c86267f3aedf89520959bce689"),
        type: 'button',
        actionType: 'dialog',
        level: 'link',
        dialog: {
          title: i18n("95b351c86267f3aedf89520959bce689"),
          body: {
            type: 'form',
            api: 'xxx/update',
            body: []
          }
        }
      },
      view: {
        label: i18n("607e7a4f377fa66b0b28ce318aab841f"),
        type: 'button',
        actionType: 'dialog',
        level: 'link',
        dialog: {
          title: i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
          body: {
            type: 'form',
            api: 'xxx/update',
            body: []
          }
        }
      },
      delete: {
        type: 'button',
        label: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
        actionType: 'ajax',
        level: 'link',
        className: 'text-danger',
        confirmText: i18n("6c546666aab964c39cd8bfdf4fbd46b8"),
        api: 'delete:/xxx/delete'
      },
      bulkDelete: {
        type: 'button',
        level: 'danger',
        label: i18n("7fb62b30119c3797a843a48368463314"),
        actionType: 'ajax',
        confirmText: i18n("6c546666aab964c39cd8bfdf4fbd46b8"),
        api: '/xxx/batch-delete'
      },
      bulkUpdate: {
        type: 'button',
        label: i18n("e73cefac9d030927da1618c7b15c98c9"),
        actionType: 'dialog',
        dialog: {
          title: i18n("e73cefac9d030927da1618c7b15c98c9"),
          size: 'md',
          body: {
            type: 'form',
            api: '/xxx/bacth-edit',
            body: [{
              label: i18n("19c6b7463e1bf73bb4b12ba07abd5444"),
              text: i18n("19c6b7463e1bf73bb4b12ba07abd5444"),
              type: 'input-text'
            }]
          }
        }
      },
      // itemDelete: {
      //   type: 'button',
      //   level: 'danger',
      //   label: '删除',
      //   api: '/xxx/delete-one',
      //   actionType: 'ajax',
      //   confirmText: '确定要删除？'
      // },
      filter: {
        title: i18n("cf12e55021998a8328201800ec356773"),
        body: [{
          type: 'input-text',
          name: 'keywords',
          label: i18n("cfb5f18c43753ad5329348d626bd3739")
        }]
      }
    };
    _this.multifactor = true;
    _this.previewSchema = {
      syncLocation: false,
      type: 'crud',
      className: 'text-left',
      bodyClassName: 'm-b-none',
      affixHeader: false,
      data: {
        items: [{
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }, {
          a: 5,
          b: 6
        }]
      },
      source: '${items}',
      columns: [{
        label: 'A',
        name: 'a'
      }, {
        label: 'B',
        name: 'b'
      }, {
        type: 'operation',
        label: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
        buttons: [{
          icon: 'fa fa-eye',
          type: 'button'
        }, {
          icon: 'fa fa-edit',
          type: 'button'
        }]
      }]
    };
    _this.panelTitle = i18n("d7213304d1a8a02a73a2f4010839e061");
    _this.panelBodyCreator = function (context) {
      _this.manager.store;
      var id = context.id;
      return getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), getSchemaTpl('switch', {
          name: 'filter',
          label: i18n("07a88fae7dd11f87891af91fb54a74bb"),
          visibleOn: 'data.api && data.api.url',
          pipeIn: function (value) {
            return !!value;
          },
          pipeOut: function (value, originValue) {
            if (value) {
              return _this.oldFilter || JSONPipeIn({
                title: i18n("cf12e55021998a8328201800ec356773"),
                body: [{
                  type: 'input-text',
                  name: 'keywords',
                  label: i18n("cfb5f18c43753ad5329348d626bd3739")
                }]
              });
            } else {
              _this.oldFilter = originValue;
            }
            return null;
          }
        }), {
          type: 'divider',
          visibleOn: 'data.api && data.api.url'
        }, getSchemaTpl('combo-container', {
          label: i18n("7f7c624a843b0d539a4ea59a696702f9"),
          name: 'bulkActions',
          type: 'combo',
          hiddenOn: 'data.pickerMode && data.multiple',
          inputClassName: 'ae-BulkActions-control',
          multiple: true,
          draggable: true,
          draggableTip: '',
          scaffold: {
            label: i18n("fa966345577ba81af19408f203db968f"),
            type: 'button'
          },
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("46e6edaeb9968e7f7ab549d4f2f82d6d"),
            placement: 'left'
          },
          items: [getSchemaTpl('tpl:btnLabel'), {
            columnClassName: 'p-t-xs col-edit',
            children: function (_a) {
              var index = _a.index;
              return React__default.createElement("button", {
                onClick: _this.handleBulkActionEdit.bind(_this, id, index),
                "data-tooltip": i18n("8347a927c09a4ec2fe473b0a93f667d0"),
                "data-position": "bottom",
                className: "text-muted"
              }, React__default.createElement("i", {
                className: "fa fa-pencil"
              }));
            }
          }]
        }),
        // getSchemaTpl('switch', {
        //   name: 'defaultChecked',
        //   label: '默认是否全部勾选',
        //   visibleOn: 'data.bulkActions && data.bulkActions.length',
        //   pipeIn: defaultValue(false)
        // }),
        {
          type: 'divider'
        }, getSchemaTpl('combo-container', {
          label: i18n("f13a0697d58d975d14eb3f3c72c2cbf2"),
          name: 'itemActions',
          type: 'combo',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("3674ea51498e7118732e5e1c53d4bc80"),
            placement: 'left'
          },
          hiddenOn: 'this.mode && this.mode !== "table" || this.pickerMode',
          inputClassName: 'ae-BulkActions-control',
          multiple: true,
          draggable: true,
          scaffold: {
            label: i18n("fa966345577ba81af19408f203db968f"),
            type: 'button'
          },
          items: [getSchemaTpl('tpl:btnLabel'), {
            type: 'checkbox',
            className: 'text-xs',
            option: i18n("4916771d080ddf6d0551de4d6d2f42a4"),
            name: 'hiddenOnHover'
          }, {
            columnClassName: 'p-t-xs col-edit',
            children: function (_a) {
              var index = _a.index;
              return React__default.createElement("button", {
                onClick: _this.handleItemActionEdit.bind(_this, id, index),
                "data-tooltip": i18n("8347a927c09a4ec2fe473b0a93f667d0"),
                "data-position": "bottom",
                className: "text-muted"
              }, React__default.createElement("i", {
                className: "fa fa-pencil"
              }));
            }
          }]
        }), {
          type: 'divider',
          hiddenOn: 'this.mode && this.mode !== "table" || this.pickerMode'
        }, getSchemaTpl('switch', {
          name: 'syncLocation',
          label: i18n("569343b4fe5e48131b78611c11eadbeb"),
          pipeIn: defaultValue(true),
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("6dbee29a8c54eef9d042ef3280999ad9"),
            placement: 'left'
          }
        }), getSchemaTpl('combo-container', {
          label: i18n("2171d1b07d045e796cba4a05bcf7d13f"),
          type: 'input-kv',
          name: 'defaultParams',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("01e7eb2256821085a14708d6ddf36814"),
            placement: 'left'
          }
        }), {
          type: 'divider'
        }, getSchemaTpl('switch', {
          name: 'keepItemSelectionOnPageChange',
          label: i18n("58ed0a7a5a91996dbb4c7d6dc7679364"),
          visbileOn: 'this.bulkActions && this.bulkActions.length || this.itemActions && this.itemActions.length',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("36ac0011faae6f88ee0ec3e642328327"),
            placement: 'left'
          }
        }), {
          name: 'labelTpl',
          type: 'input-text',
          label: i18n("2a0b47ba76e886070c3bd6abeae3d1c0"),
          visibleOn: 'this.keepItemSelectionOnPageChange',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("6ab3e5b6c5d5d2cf621e911226495433"),
            placement: 'left'
          }
        }, {
          name: 'primaryField',
          label: i18n("987b04af242bb2dafaf32d890ab952ff"),
          type: 'input-text',
          pipeIn: defaultValue('id'),
          description: i18n("a270e70be12fb13a24ca3e4ac70fa838")
        }]
      }, {
        title: i18n("54ea89b497ec3bb319c68844dfa3687f"),
        body: [getSchemaTpl('apiControl', {
          label: i18n("db7ee36de8063c2d5a6c123eac65641a"),
          sampleBuilder: function () {
            var _a, _b;
            var data = {
              items: [],
              total: 0
            };
            var columns = (_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.columns) !== null && _b !== void 0 ? _b : [];
            var row = {};
            columns.forEach(function (column) {
              if (column.name) {
                setVariable(row, column.name, 'sample');
              }
            });
            data.items.push(row);
            return JSON.stringify({
              status: 0,
              msg: '',
              data: data
            }, null, 2);
          }
        }), {
          name: 'initFetch',
          type: 'radios',
          label: i18n("0951dad1723aa1191ce1a2e96db76051"),
          pipeIn: function (value) {
            return typeof value == 'boolean' && value || typeof value !== 'boolean' && '';
          },
          inline: true,
          onChange: function () {},
          options: [{
            label: i18n("0a60ac8f02ccd2cf723f927284877851"),
            value: true
          }, {
            label: i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
            value: false
          }, {
            label: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
            value: ''
          }]
        }, {
          name: 'initFetchOn',
          autoComplete: false,
          visibleOn: 'typeof this.initFetch !== "boolean"',
          type: 'input-text',
          placeholder: i18n("55b22f5d136e73b26cef65aedd8ba86e"),
          className: 'm-t-n-sm'
        }, getSchemaTpl('switch', {
          name: 'loadDataOnce',
          label: i18n("bedc70d448b656d828bd3ed7926b3e4d"),
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("559fa334442f0f75b0343bbf38b7ff05"),
            placement: 'left'
          }
        }), getSchemaTpl('switch', {
          label: i18n("1af68c43e1780249f11b9de1eeaeb281"),
          name: 'interval',
          visibleOn: 'data.api',
          pipeIn: function (value) {
            return !!value;
          },
          pipeOut: function (value) {
            return value ? 3000 : undefined;
          }
        }), {
          name: 'interval',
          type: 'input-number',
          visibleOn: 'typeof data.interval === "number"',
          step: 500,
          className: 'm-t-n-sm',
          description: i18n("9800f1ce2f78a23b81c8d944ebf9cce9")
        }, getSchemaTpl('switch', {
          name: 'silentPolling',
          label: i18n("19c5410b23fba4bbfd1a58bbd5268c9b"),
          visibleOn: '!!data.interval',
          description: i18n("04f840b0772f4b5d59954a29a76f4e7b")
        }), {
          name: 'stopAutoRefreshWhen',
          label: i18n("6037dae99e9446deaed45f7e408f47ab"),
          type: 'input-text',
          visibleOn: '!!data.interval',
          description: i18n("32e3a79e80dcf7f7304e8092dd7acc6f")
        }, getSchemaTpl('switch', {
          name: 'stopAutoRefreshWhenModalIsOpen',
          label: i18n("154ef40e477c031f6c1ec15caefb570a"),
          visibleOn: '!!data.interval',
          description: i18n("50f7c85bf60a9f43522789644566c62b")
        }), {
          type: 'divider'
        }, getSchemaTpl('switch', {
          name: 'draggable',
          label: i18n("d8905a70e93a33c7a86240f467c653d4")
        }), getSchemaTpl('apiControl', {
          label: tipedLabel(i18n("040a78b24eaff47d4fa7e266473635b4"), i18n("9b39126b20e519bb1c6e9054f4b55784")),
          name: 'saveOrderApi',
          visibleOn: 'data.draggable'
        }), {
          type: 'divider'
        }, getSchemaTpl('apiControl', {
          label: i18n("ee850a0e326b217bdeb61d936c521177"),
          name: 'quickSaveApi',
          description: i18n("8343f619879fa79bc8ef1a35b2fc3e78")
        }), {
          type: 'divider'
        }, getSchemaTpl('apiControl', {
          label: i18n("d891e79d4a8718a7dbd47ac68aaaa5cb"),
          name: 'quickSaveItemApi',
          description: i18n("38db6e045e214ffcd03ede695002271c")
        }), {
          type: 'divider'
        }, getSchemaTpl('loadingConfig', {}, {
          context: context
        }), {
          type: 'divider'
        }, {
          label: i18n("522110866c19dace2ce38336617405c2"),
          type: 'combo',
          name: 'messages',
          multiLine: true,
          description: i18n("3b69c2e540c05e9ca530ed30cf224472"),
          items: [getSchemaTpl('fetchSuccess'), getSchemaTpl('fetchFailed'), getSchemaTpl('saveOrderSuccess'), getSchemaTpl('saveOrderFailed'), getSchemaTpl('quickSaveSuccess'), getSchemaTpl('quickSaveFailed')]
        }]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [{
          label: i18n("ff57a3bf69a1065707e77c18c51f7bbb"),
          name: 'mode',
          type: 'button-group-select',
          size: 'xs',
          pipeIn: function (value, values) {
            var _a;
            return (_a = value === 'grid' ? 'cards' : value) !== null && _a !== void 0 ? _a : 'table';
          },
          onChange: function (value, oldValue, model, form) {
            var _a, _b, _c, _d, _e;
            var headerHasColumnsToggle = (_b = (_a = form === null || form === void 0 ? void 0 : form.data) === null || _a === void 0 ? void 0 : _a.headerToolbar) === null || _b === void 0 ? void 0 : _b.some(function (item) {
              return item.type === 'columns-toggler';
            });
            var headerToolbar = cloneDeep((_c = form === null || form === void 0 ? void 0 : form.data) === null || _c === void 0 ? void 0 : _c.headerToolbar);
            var columnsToggler;
            if (value !== 'table' && oldValue === 'table') {
              // 存储table模式是否有 columns-toggler
              columnsToggler = (headerToolbar === null || headerToolbar === void 0 ? void 0 : headerToolbar.find(function (item) {
                return item.type === 'columns-toggler';
              })) || {
                type: 'columns-toggler',
                align: 'right'
              };
              form.setValues({
                __headerHasColumnsToggler: headerHasColumnsToggle
              });
            }
            headerToolbar = value === 'table' ? headerToolbar : headerToolbar === null || headerToolbar === void 0 ? void 0 : headerToolbar.filter(function (item) {
              return item.type !== 'columns-toggler';
            });
            if (value === 'table') {
              if (((_d = form === null || form === void 0 ? void 0 : form.data) === null || _d === void 0 ? void 0 : _d.__headerHasColumnsToggler) && !headerHasColumnsToggle) {
                headerToolbar === null || headerToolbar === void 0 ? void 0 : headerToolbar.push(((_e = form === null || form === void 0 ? void 0 : form.data) === null || _e === void 0 ? void 0 : _e.__cacheColumnsToggler) || {
                  type: 'columns-toggler',
                  align: 'right'
                });
              }
              form.setValues({
                headerToolbar: headerToolbar,
                columns: form.data.__columns || _this.transformByMode({
                  from: oldValue,
                  to: value,
                  schema: form.data
                }),
                __headerHasColumnsToggler: headerHasColumnsToggle,
                __card: form.data.card || form.data.__card,
                __listItem: form.data.listItem || form.data.__listItem
              });
              form.deleteValueByName('card');
              form.deleteValueByName('listItem');
            } else if (value === 'cards') {
              oldValue === 'table' && form.setValues({
                __cacheColumnsToggler: columnsToggler
              });
              form.setValues({
                headerToolbar: headerToolbar,
                card: form.data.__card || _this.transformByMode({
                  from: oldValue,
                  to: value,
                  schema: form.data
                }),
                __columns: form.data.columns || form.data.__columns,
                __listItem: form.data.listItem || form.data.__listItem
              });
              form.deleteValueByName('columns');
              form.deleteValueByName('listItem');
            } else {
              oldValue === 'table' && form.setValues({
                __cacheColumnsToggler: columnsToggler
              });
              form.setValues({
                headerToolbar: headerToolbar,
                listItem: form.data.__listItem || _this.transformByMode({
                  from: oldValue,
                  to: value,
                  schema: form.data
                }),
                __columns: form.data.columns || form.data.__columns,
                __card: form.data.card || form.data.__card
              });
              form.deleteValueByName('columns');
              form.deleteValueByName('card');
            }
          },
          options: [{
            value: 'table',
            label: i18n("b339aa87104709397ba68e7ebbc6e5ba")
          }, {
            value: 'cards',
            label: i18n("d87f215d9ac688b1d3399bf575a0ef6f")
          }, {
            value: 'list',
            label: i18n("3712972d84adf48acbd6ad24b4d75ad0")
          }]
        }, getSchemaTpl('combo-container', {
          name: 'headerToolbar',
          type: 'combo',
          draggable: true,
          draggableTip: '',
          descrition: i18n("e4fd8d64804a4f3d743eff384a6eb20a"),
          label: i18n("14555503d6e09ecd66661d04c882e79b"),
          pipeIn: function (value) {
            if (!Array.isArray(value)) {
              value = value ? [value] : ['bulkActions'];
            }
            return value.map(function (item) {
              var type = item.type;
              if (typeof item === 'string' && ~['bulkActions', 'bulk-actions', 'pagination', 'statistics', 'switch-per-page', 'filter-toggler', 'load-more', 'export-csv', 'export-excel'].indexOf(item)) {
                type = item === 'bulkActions' ? 'bulk-actions' : item;
                item = {
                  type: type
                };
              } else if (typeof item === 'string') {
                type = 'tpl';
                item = typeof item === 'string' ? {
                  type: 'tpl',
                  tpl: item,
                  wrapperComponent: ''
                } : item;
              }
              return __assign({
                type: type
              }, item);
            });
          },
          pipeOut: function (value) {
            if (Array.isArray(value)) {
              return value.map(function (item) {
                if (item.type === 'button') {
                  return JSONPipeIn(__assign({
                    label: i18n("fa966345577ba81af19408f203db968f"),
                    type: 'button'
                  }, item));
                } else if (item.type === 'tpl') {
                  return JSONPipeIn(__assign({
                    type: 'tpl',
                    tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014"),
                    wrapperComponent: ''
                  }, item));
                }
                return item;
              });
            }
            return [];
          },
          scaffold: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014")
          },
          multiple: true,
          items: [{
            type: 'select',
            name: 'type',
            columnClassName: 'w-ssm',
            options: [{
              value: 'bulk-actions',
              label: i18n("8abc564260a1564521e0c3a1d5419b4a")
            }, {
              value: 'pagination',
              label: i18n("3862626c138ce5945e0e273a1bdfbad0")
            }, {
              value: 'statistics',
              label: i18n("439a19857be1fb8d3e6017258e32c486")
            }, {
              value: 'switch-per-page',
              label: i18n("bc908986a4e4eec3dca3530afd1d4306")
            }, {
              value: 'load-more',
              label: i18n("77281549955309c49f5eef77838a85e5")
            }, {
              value: 'export-csv',
              label: i18n("1add12ff3338a990b60154b75019c348")
            }, {
              value: 'export-excel',
              label: i18n("7d57852b946d9d4d64fb2a48ca2b4a44")
            }, {
              value: 'columns-toggler',
              label: i18n("16c6099bc0efaa669d8de698c105e333"),
              visibleOn: '!this.mode || this.mode === "table"'
            }, {
              value: 'filter-toggler',
              label: i18n("073694928db5b0b5423ebe095ec62d39")
            }, {
              value: 'drag-toggler',
              label: i18n("5b9c3e6ce478196f802722cb09d61f0b")
            }, {
              value: 'check-all',
              label: i18n("66eeacd93a7c1bda93906fe908ad11a0"),
              hiddenOn: '!this.mode || this.mode === "table"'
            }, {
              value: 'tpl',
              label: i18n("97d07614380da93d257f9fbf81aa56fb")
            }, {
              value: 'button',
              label: i18n("fa966345577ba81af19408f203db968f")
            }]
          }, {
            name: 'align',
            placeholder: i18n("d5bc35360607472de4525358af126de4"),
            type: 'select',
            size: 'xs',
            options: [{
              label: i18n("413f48cc71f71083ce532a86e3efdc21"),
              value: 'left'
            }, {
              label: i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
              value: 'right'
            }]
          }
          // {
          //   type: 'remark',
          //   content: '详情请在预览区域选中后进行编辑。',
          //   trigger: ['click'],
          //   rootClose: true,
          //   placement: 'left',
          //   visibleOn:
          //     '!~["bulkActions", "drag-toggler", "check-all", "bulk-actions", "pagination", "statistics", "switch-per-page", "filter-toggler", "load-more"].indexOf(this.type)',
          //   columnClassName: 'no-grow w-3x p-t-xs',
          //   className: 'm-l-none'
          // }
          ]
        }), getSchemaTpl('combo-container', {
          name: 'footerToolbar',
          type: 'combo',
          draggable: true,
          draggableTip: '',
          descrition: i18n("e4fd8d64804a4f3d743eff384a6eb20a"),
          label: i18n("1325969c143a639294c1c6ab370b35a3"),
          pipeIn: function (value) {
            if (!Array.isArray(value)) {
              value = value ? [value] : ['statistics', 'pagination'];
            }
            return value.map(function (item) {
              var type = item.type;
              if (typeof item === 'string' && ~['bulkActions', 'bulk-actions', 'pagination', 'statistics', 'switch-per-page', 'filter-toggler', 'load-more', 'export-csv', 'export-excel'].indexOf(item)) {
                type = item === 'bulkActions' ? 'bulk-actions' : item;
                item = {
                  type: type
                };
              } else if (typeof item === 'string') {
                type = 'tpl';
                item = typeof item === 'string' ? {
                  type: 'tpl',
                  tpl: item,
                  wrapperComponent: ''
                } : item;
              }
              return __assign({
                type: type
              }, item);
            });
          },
          pipeOut: function (value) {
            if (Array.isArray(value)) {
              return value.map(function (item) {
                if (item.type === 'button') {
                  return JSONPipeIn(__assign({
                    label: i18n("fa966345577ba81af19408f203db968f"),
                    type: 'button'
                  }, item));
                } else if (item.type === 'tpl') {
                  return JSONPipeIn(__assign({
                    type: 'tpl',
                    tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014"),
                    wrapperComponent: ''
                  }, item));
                }
                return item;
              });
            }
            return [];
          },
          scaffold: {
            type: 'tpl',
            tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014"),
            wrapperComponent: ''
          },
          multiple: true,
          items: [{
            type: 'select',
            name: 'type',
            columnClassName: 'w-ssm',
            options: [{
              value: 'bulk-actions',
              label: i18n("8abc564260a1564521e0c3a1d5419b4a")
            }, {
              value: 'pagination',
              label: i18n("3862626c138ce5945e0e273a1bdfbad0")
            }, {
              value: 'statistics',
              label: i18n("439a19857be1fb8d3e6017258e32c486")
            }, {
              value: 'switch-per-page',
              label: i18n("bc908986a4e4eec3dca3530afd1d4306")
            }, {
              value: 'load-more',
              label: i18n("77281549955309c49f5eef77838a85e5")
            }, {
              value: 'export-csv',
              label: i18n("1add12ff3338a990b60154b75019c348")
            }, {
              value: 'export-excel',
              label: i18n("7d57852b946d9d4d64fb2a48ca2b4a44")
            }, {
              value: 'columns-toggler',
              label: i18n("16c6099bc0efaa669d8de698c105e333"),
              hiddenOn: '["grid", "cards", "list"].indexOf(this.mode)'
            }, {
              value: 'filter-toggler',
              label: i18n("073694928db5b0b5423ebe095ec62d39")
            }, {
              value: 'drag-toggler',
              label: i18n("5b9c3e6ce478196f802722cb09d61f0b")
            }, {
              value: 'check-all',
              label: i18n("66eeacd93a7c1bda93906fe908ad11a0"),
              hiddenOn: '!this.mode || this.mode === "table"'
            }, {
              value: 'tpl',
              label: i18n("97d07614380da93d257f9fbf81aa56fb")
            }, {
              value: 'button',
              label: i18n("fa966345577ba81af19408f203db968f")
            }]
          }, {
            name: 'align',
            placeholder: i18n("d5bc35360607472de4525358af126de4"),
            size: 'xs',
            type: 'select',
            options: [{
              label: i18n("413f48cc71f71083ce532a86e3efdc21"),
              value: 'left'
            }, {
              label: i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
              value: 'right'
            }]
          }, {
            type: 'remark',
            content: i18n("440a3a2d7f1b123718be75e2baee8391"),
            trigger: ['click'],
            rootClose: true,
            placement: 'left',
            visibleOn: '!~["bulkActions", "drag-toggler", "check-all", "bulk-actions", "pagination", "statistics", "switch-per-page", "filter-toggler", "load-more", "export-csv", "export-excel"].indexOf(this.type)',
            columnClassName: 'no-grow w-3x p-t-xs',
            className: 'm-l-none'
          }]
        }), getSchemaTpl('switch', {
          name: 'filterTogglable',
          label: i18n("34da7e4a0ecdb63967427f43adf2de3e"),
          visibleOn: 'data.filter'
        }), getSchemaTpl('switch', {
          name: 'filterDefaultVisible',
          label: i18n("25c0db3ddce9bfffd497d0c824cf3c72"),
          visibleOn: 'data.filter && data.filterTogglable',
          pipeIn: defaultValue(true)
        }), getSchemaTpl('switch', {
          name: 'hideQuickSaveBtn',
          label: i18n("259d11c300a365b6767228c12d29ce53")
        }), getSchemaTpl('switch', {
          name: 'alwaysShowPagination',
          label: i18n("fa9417bacb7714e82663655345ca213d")
        }), getSchemaTpl('switch', {
          name: 'autoFillHeight',
          label: i18n("0449dab523020003eee89a0751e1c003")
        }), getSchemaTpl('switch', {
          name: 'hideCheckToggler',
          label: i18n("e3d2a85f20608a5bde7d539969d03167"),
          visibleOn: 'data.checkOnItemClick'
        }), getSchemaTpl('className'), getSchemaTpl('className', {
          name: 'bodyClassName',
          label: i18n("af1af0a7fad9e8bdcd21694d0e036e12")
        })]
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }, {
        title: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
        body: [getSchemaTpl('ref'), {
          name: 'source',
          label: i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
          type: 'input-text',
          description: i18n("62569fcb0fc8314daea97989bba3877c")
        }, {
          name: 'perPage',
          label: i18n("606bc931d2b3ebba2569cb1494719e2c"),
          type: 'input-number'
        }, getSchemaTpl('switch', {
          name: 'keepItemSelectionOnPageChange',
          label: i18n("004d01f56242e07cbdc97256bb11c75b")
        }), {
          name: 'maxKeepItemSelectionLength',
          label: i18n("3d330edb46341a26ccc9aaa7f7938a8e"),
          type: 'input-number',
          mode: 'horizontal',
          horizontal: {
            justify: true
          }
        }, {
          name: 'pageField',
          label: i18n("95e68bea2d8c8e41ffa619d4364a0d6f"),
          type: 'input-text',
          pipeIn: defaultValue('page')
        }, {
          name: 'perPageField',
          label: i18n("537f8b09437bdb7fac429dc4e8666763"),
          type: 'input-text',
          pipeIn: defaultValue('perPage')
        }, {
          name: 'orderField',
          label: i18n("30c7bd5acd4564057bd89e0846f01728"),
          type: 'input-text',
          labelRemark: {
            className: 'm-l-xs',
            trigger: 'click',
            rootClose: true,
            content: i18n("dd8d217677e4c5df28b7f46aa99b22a8"),
            placement: 'left'
          }
        }, {
          name: 'perPageAvailable',
          label: i18n("e04e8f570e2fb43a533b224f3c48523d"),
          type: 'input-array',
          hiddenOn: 'data.loadDataOnce',
          items: {
            type: 'input-number',
            required: true
          },
          value: [10]
        }, getSchemaTpl('name'), {
          name: 'itemCheckableOn',
          type: 'input-text',
          label: i18n("0fc1de8f71a7470213fc68f981abdbc2"),
          description: i18n("7d5fefd589000879088063dceb4b2552"),
          visibleOn: 'data.bulkActions && data.bulkActions.length || data.pickerMode'
        }, getSchemaTpl('switch', {
          name: 'checkOnItemClick',
          label: i18n("614ec7801e03f7ee009e4448e6ed4001"),
          visibleOn: 'data.bulkActions && data.bulkActions.length || data.pickerMode'
        }), getSchemaTpl('switch', {
          name: 'autoJumpToTopOnPagerChange',
          label: i18n("530ab79908eabe5b329ffe17695079e2"),
          description: i18n("9092afb1ccb692308ef06d8001da2208")
        }), getSchemaTpl('switch', {
          name: 'syncResponse2Query',
          label: i18n("c8cf39b24bb52d0562472c33b86824fe"),
          description: i18n("d3c172700af4f3f3afb028d6bb4a90a4")
        })]
      }]);
    };
    _this.wrapperProps = {
      affixHeader: false
    };
    return _this;
  }
  Object.defineProperty(CRUDPlugin.prototype, "scaffoldForm", {
    get: function () {
      var _this = this;
      var i18nEnabled = getI18nEnabled();
      return {
        title: i18n("4a1e3c50547e61503a2d1c356005eb08"),
        body: [getSchemaTpl('apiControl', {
          label: i18n("85624c8e8b0fc98954eecbe508e8b59d"),
          sampleBuilder: function (schema) {
            return JSON.stringify({
              status: 0,
              msg: '',
              data: [{
                id: 1,
                name: 'Jack'
              }, {
                id: 2,
                name: 'Rose'
              }]
            }, null, 2);
          }
        }), {
          type: 'button',
          label: i18n("3dd674542204724eb5417efc7354ec73"),
          className: 'm-t-xs m-b-xs',
          onClick: function (e, props) {
            return __awaiter(_this, void 0, void 0, function () {
              var data, schemaFilter, api, response, result, autoFillKeyValues, items, _a, _b, key;
              var e_1, _c;
              var _d;
              return __generator(this, function (_e) {
                switch (_e.label) {
                  case 0:
                    data = props.data;
                    schemaFilter = getEnv(window.editorStore).schemaFilter;
                    api = data.api;
                    // 主要是给爱速搭中替换 url
                    if (schemaFilter) {
                      api = schemaFilter({
                        api: data.api
                      }).api;
                    }
                    return [4 /*yield*/, props.env.fetcher(api, data)];
                  case 1:
                    response = _e.sent();
                    result = normalizeApiResponseData(response.data);
                    autoFillKeyValues = [];
                    items = (_d = result === null || result === void 0 ? void 0 : result.items) !== null && _d !== void 0 ? _d : result === null || result === void 0 ? void 0 : result.rows;
                    /** 非标返回，取data中的第一个数组作为返回值，和AMIS中处理逻辑同步 */
                    if (!Array.isArray(items)) {
                      try {
                        for (_a = __values(Object.keys(result)), _b = _a.next(); !_b.done; _b = _a.next()) {
                          key = _b.value;
                          if (result.hasOwnProperty(key) && Array.isArray(result[key])) {
                            items = result[key];
                            break;
                          }
                        }
                      } catch (e_1_1) {
                        e_1 = {
                          error: e_1_1
                        };
                      } finally {
                        try {
                          if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        } finally {
                          if (e_1) throw e_1.error;
                        }
                      }
                    }
                    if (Array.isArray(items)) {
                      Object.keys(items[0]).forEach(function (key) {
                        items[0][key];
                        autoFillKeyValues.push({
                          label: key,
                          type: 'text',
                          name: key
                        });
                      });
                      props.formStore.setValues({
                        columns: autoFillKeyValues
                      });
                      // 查询条件的字段列表
                      props.formStore.setValues({
                        filterSettingSource: autoFillKeyValues.map(function (column) {
                          return column.name;
                        })
                      });
                    } else {
                      toast.warning(i18n("522cddc343d72db3db80cf3d71f99210"));
                    }
                    return [2 /*return*/];
                }
              });
            });
          }
        }, {
          name: 'features',
          label: i18n("07b59fd09f6007bac246d9a73b793a49"),
          type: 'checkboxes',
          joinValues: false,
          extractValue: true,
          itemClassName: 'max-w-lg',
          options: [{
            label: i18n("66ab5e9f24c8f46012a25c89919fb191"),
            value: 'create'
          }, {
            label: i18n("bee912d79eefb7335988c4997aa9138d"),
            value: 'filter'
          }, {
            label: i18n("7fb62b30119c3797a843a48368463314"),
            value: 'bulkDelete'
          }, {
            label: i18n("0f61da949d2b45534967e197cc2eee29"),
            value: 'bulkUpdate'
          }, {
            label: i18n("aa85b3cd6aa4cdfd45bfe5a96678ad2f"),
            value: 'update'
          }, {
            label: i18n("653eb2792d3126a60caa6982f89a906b"),
            value: 'view'
          }, {
            label: i18n("8a4d6dfbcd8072555b5951091f171000"),
            value: 'delete'
          }]
        }, {
          type: 'group',
          body: [{
            columnRatio: 10,
            type: 'checkboxes',
            label: i18n("f4b368051b455e386a314688c7c75c1f"),
            name: 'filterEnabledList',
            joinValues: false,
            source: '${filterSettingSource}'
          }, {
            columnRatio: 2,
            type: 'input-number',
            label: i18n("23c7ea8ee9519459598b2de65fe2a2eb"),
            value: 3,
            name: 'filterColumnCount'
          }],
          visibleOn: 'data.features && data.features.includes("filter")'
        }, {
          name: 'columns',
          type: 'input-table',
          label: false,
          addable: true,
          removable: true,
          needConfirm: false,
          columns: [{
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            name: 'label',
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab")
          }, {
            type: 'input-text',
            name: 'name',
            label: i18n("41a344642681efaaa418c228ba7fb45c")
          }, {
            type: 'select',
            name: 'type',
            label: i18n("226b0912184333c81babf2f1894ec0c1"),
            value: 'text',
            options: [{
              value: 'text',
              label: i18n("ffb01e5bcf4c00447f5150d3cba81371")
            }, {
              value: 'tpl',
              label: i18n("59cf15fe6b8d659c9bd2f86143534a06")
            }, {
              value: 'image',
              label: i18n("20def7942674282277c3714ed7ea6ce0")
            }, {
              value: 'date',
              label: i18n("4ff1e74e43a3586339251494117185ad")
            }, {
              value: 'progress',
              label: i18n("c7bff79d059a0b7ff9b02441959d8be2")
            }, {
              value: 'status',
              label: i18n("3fea7ca76cdece641436d7ab0d02ab1b")
            }, {
              value: 'mapping',
              label: i18n("9da188491dd34c4382a5b9f006194e41")
            }, {
              value: 'operation',
              label: i18n("8abc564260a1564521e0c3a1d5419b4a")
            }]
          }]
        }],
        pipeOut: function (value) {
          var valueSchema = cloneDeep(value);
          // 查看/删除 操作，可选择是否使用接口返回值预填充
          var features = valueSchema.features;
          var oper = {
            type: 'operation',
            label: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
            buttons: []
          };
          var itemBtns = ['update', 'view', 'delete'];
          var hasFeatures = get(features, 'length');
          valueSchema.bulkActions = [];
          /** 统一api格式 */
          valueSchema.api = typeof valueSchema.api === 'string' ? normalizeApi(valueSchema.api) : valueSchema.api;
          hasFeatures && features.forEach(function (item) {
            var _a, _b, _c, _d;
            if (itemBtns.includes(item)) {
              var schema = void 0;
              if (item === 'update') {
                schema = cloneDeep(_this.btnSchemas.update);
                schema.dialog.body.body = value.columns.filter(function (_a) {
                  var type = _a.type;
                  return type !== 'progress' && type !== 'operation';
                }).map(function (_a) {
                  var type = _a.type,
                    rest = __rest(_a, ["type"]);
                  return __assign(__assign({}, rest), {
                    type: viewTypeToEditType(type)
                  });
                });
              } else if (item === 'view') {
                schema = cloneDeep(_this.btnSchemas.view);
                schema.dialog.body.body = value.columns.map(function (_a) {
                  _a.type;
                    var rest = __rest(_a, ["type"]);
                  return __assign(__assign({}, rest), {
                    type: 'static'
                  });
                });
              } else if (item === 'delete') {
                schema = cloneDeep(_this.btnSchemas.delete);
                schema.api = ((_b = (_a = valueSchema.api) === null || _a === void 0 ? void 0 : _a.method) === null || _b === void 0 ? void 0 : _b.match(/^(post|delete)$/i)) ? valueSchema.api : __assign(__assign({}, valueSchema.api), {
                  method: 'post'
                });
              }
              // 添加操作按钮
              _this.addItem(oper.buttons, schema);
            } else {
              // 批量操作
              if (item === 'bulkUpdate') {
                _this.addItem(valueSchema.bulkActions, cloneDeep(_this.btnSchemas.bulkUpdate));
              }
              if (item === 'bulkDelete') {
                _this.addItem(valueSchema.bulkActions, cloneDeep(_this.btnSchemas.bulkDelete));
              }
              // 创建
              if (item === 'create') {
                var createSchemaBase = _this.btnSchemas.create;
                createSchemaBase.dialog.body = {
                  type: 'form',
                  api: ((_d = (_c = valueSchema.api) === null || _c === void 0 ? void 0 : _c.method) === null || _d === void 0 ? void 0 : _d.match(/^(post|put)$/i)) ? valueSchema.api : __assign(__assign({}, valueSchema.api), {
                    method: 'post'
                  }),
                  body: valueSchema.columns.map(function (column) {
                    var type = column.type;
                    return {
                      type: viewTypeToEditType(type),
                      name: column.name,
                      label: column.label
                    };
                  })
                };
                valueSchema.headerToolbar = [createSchemaBase, 'bulkActions'];
              }
              var keysFilter = Object.keys(valueSchema.filter || {});
              if (item === 'filter' && !keysFilter.length) {
                if (valueSchema.filterEnabledList) {
                  valueSchema.filter = {
                    title: i18n("cf12e55021998a8328201800ec356773")
                  };
                  valueSchema.filter.columnCount = value.filterColumnCount;
                  valueSchema.filter.mode = 'horizontal';
                  valueSchema.filter.body = valueSchema.filterEnabledList.map(function (item) {
                    return {
                      type: 'input-text',
                      label: item.label,
                      name: item.value
                    };
                  });
                }
              }
            }
          });
          var hasOperate = valueSchema.columns.find(function (item) {
            return item.type === 'operation';
          });
          hasFeatures && !hasOperate && valueSchema.columns.push(oper);
          return valueSchema;
        },
        canRebuild: true
      };
    },
    enumerable: false,
    configurable: true
  });
  CRUDPlugin.prototype.addItem = function (source, target) {
    var canAdd = source.find(function (item) {
      return item.label === target.label;
    });
    if (!canAdd) {
      source.push(target);
    }
  };
  CRUDPlugin.prototype.handleBulkActionEdit = function (id, index) {
    var store = this.manager.store;
    var schema = store.getSchema(id);
    var action = schema === null || schema === void 0 ? void 0 : schema.bulkActions[index];
    if (action && action.$$id) {
      store.setActiveId(action.$$id);
    }
  };
  CRUDPlugin.prototype.handleItemActionEdit = function (id, index) {
    var store = this.manager.store;
    var schema = store.getSchema(id);
    var action = schema === null || schema === void 0 ? void 0 : schema.itemActions[index];
    if (action && action.$$id) {
      store.setActiveId(action.$$id);
    }
  };
  /**
   * 默认什么组件都加入的子组件里面，子类里面可以复写这个改变行为。
   * @param context
   * @param renderers
   */
  CRUDPlugin.prototype.buildSubRenderers = function (context, renderers) {
    var plugin = this;
    if (plugin.name && plugin.description) {
      return {
        name: plugin.name,
        icon: plugin.icon,
        pluginIcon: plugin.pluginIcon,
        description: plugin.description,
        previewSchema: plugin.previewSchema,
        tags: plugin.tags,
        docLink: plugin.docLink,
        type: plugin.type,
        scaffold: plugin.scaffold,
        disabledRendererPlugin: plugin.disabledRendererPlugin,
        isBaseComponent: plugin.isBaseComponent,
        scaffoldForm: this.scaffoldForm,
        rendererName: plugin.rendererName
      };
    }
  };
  CRUDPlugin.prototype.getRendererInfo = function (context) {
    var info = _super.prototype.getRendererInfo.call(this, context);
    if (info) {
      info.scaffoldForm = this.scaffoldForm;
    }
    return info;
  };
  CRUDPlugin.prototype.renderEditableComponents = function (props) {
    var render = props.render;
    var bulkActions = props.bulkActions;
    var itemActions = props.itemActions;
    var doms = [];
    if (Array.isArray(bulkActions) && bulkActions.length) {
      doms.push(React__default.createElement("div", {
        key: "bulkActions",
        className: "ae-EditableRender"
      }, React__default.createElement("div", {
        className: "ae-EditableRender-title"
      }, i18n("7f7c624a843b0d539a4ea59a696702f9")), React__default.createElement("div", {
        className: "ae-EditableRender-body"
      }, bulkActions.map(function (action) {
        return render('bulk-action', __assign({
          type: 'button',
          size: 'sm'
        }, action), {
          key: action.$$id
        });
      }))));
    }
    if (Array.isArray(itemActions) && itemActions.length) {
      doms.push(React__default.createElement("div", {
        key: "itemActions",
        className: "ae-EditableRender"
      }, React__default.createElement("div", {
        className: "ae-EditableRender-title"
      }, i18n("f13a0697d58d975d14eb3f3c72c2cbf2")), React__default.createElement("div", {
        className: "ae-EditableRender-body"
      }, itemActions.map(function (action) {
        return render('bulk-action', __assign({
          type: 'button',
          size: 'sm'
        }, action), {
          key: action.$$id
        });
      }))));
    }
    if (!doms.length) {
      return null;
    }
    return React__default.createElement("div", {
      className: "ae-EditableRenderers"
    }, React__default.createElement("div", {
      className: "ae-EditableRenderers-tip"
    }, i18n("5db6b2160b9169b9d89de247d14ab740")), doms);
  };
  CRUDPlugin.prototype.renderRenderer = function (props) {
    var $$editor = props.$$editor,
      style = props.style,
      rest = __rest(props, ["$$editor", "style"]);
    var renderer = $$editor.renderer;
    return React__default.createElement("div", {
      className: "ae-CRUDEditor",
      style: style
    }, this.renderEditableComponents(props), React__default.createElement(renderer.component, __assign({
      "$$editor": $$editor
    }, rest)));
  };
  CRUDPlugin.prototype.filterProps = function (props) {
    if (props.pickerMode) {
      props.options = props.data.options;
    }
    return props;
  };
  CRUDPlugin.prototype.afterUpdate = function (event) {
    var _this = this;
    var _a;
    var context = event.context;
    // mode 内容形式变化，需要重新构建面板。
    if (context.info.plugin === this && ((_a = context.diff) === null || _a === void 0 ? void 0 : _a.some(function (change) {
      var _a;
      return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'mode';
    }))) {
      setTimeout(function () {
        _this.manager.buildPanels();
        _this.manager.buildToolbars();
      }, 20);
    }
  };
  CRUDPlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
      var child, childSchame, itemsSchema_1, columns, rowsSchema, isColumnChild, scope, menberProps, tmpProperties_1, childScope;
      return __generator(this, function (_h) {
        switch (_h.label) {
          case 0:
            child = node.children.find(function (item) {
              return !!~['table', 'table2', 'cards', 'list'].indexOf(item.type);
            });
            if (!((_b = (_a = child === null || child === void 0 ? void 0 : child.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) {
              return [2 /*return*/];
            }

            return [4 /*yield*/, child.info.plugin.buildDataSchemas(child, undefined, trigger, node)];
          case 1:
            childSchame = _h.sent();
            // 兼容table的rows，并自行merged异步数据
            if (child.type === 'table') {
              itemsSchema_1 = {};
              columns = child.children.find(function (item) {
                return item.isRegion && item.region === 'columns';
              });
              rowsSchema = (_c = childSchame.properties.rows) === null || _c === void 0 ? void 0 : _c.items;
              if (trigger) {
                isColumnChild = someTree(columns === null || columns === void 0 ? void 0 : columns.children, function (item) {
                  return item.id === trigger.id;
                });
                scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
                menberProps = (_g = (_f = (_e = (_d = scope.getSchemaById('crudFetchInitedData')) === null || _d === void 0 ? void 0 : _d.properties) === null || _e === void 0 ? void 0 : _e.items) === null || _f === void 0 ? void 0 : _f.items) === null || _g === void 0 ? void 0 : _g.properties;
                tmpProperties_1 = __assign(__assign({}, menberProps), rowsSchema === null || rowsSchema === void 0 ? void 0 : rowsSchema.properties);
                if (isColumnChild) {
                  Object.keys(tmpProperties_1).map(function (key) {
                    itemsSchema_1[key] = __assign({}, tmpProperties_1[key]);
                  });
                  childScope = this.manager.dataSchema.getScope("".concat(child.id, "-").concat(child.type, "-currentRow"));
                  if (childScope) {
                    childScope === null || childScope === void 0 ? void 0 : childScope.setSchemas([{
                      $id: "".concat(child.id, "-").concat(child.type, "-currentRow"),
                      type: 'object',
                      properties: itemsSchema_1
                    }]);
                    childScope.tag = "\u5F53\u524D\u884C\u8BB0\u5F55 : ".concat(node.type);
                  }
                }
              }
              childSchame = {
                $id: childSchame.$id,
                type: childSchame.type,
                properties: {
                  items: childSchame.properties.rows,
                  selectedItems: __assign(__assign({}, childSchame.properties.selectedItems), {
                    items: __assign(__assign({}, childSchame.properties.selectedItems.items), {
                      properties: itemsSchema_1
                    })
                  }),
                  unSelectedItems: __assign(__assign({}, childSchame.properties.unSelectedItems), {
                    items: __assign(__assign({}, childSchame.properties.unSelectedItems.items), {
                      properties: itemsSchema_1
                    })
                  }),
                  count: {
                    type: 'number',
                    title: i18n("31769d6063c5ab0cfee842b395916fd4")
                  },
                  page: {
                    type: 'number',
                    title: i18n("9a4fe969f1066e197fd2369a44d879ac")
                  }
                }
              };
            }
            return [2 /*return*/, childSchame];
        }
      });
    });
  };
  CRUDPlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'fetchInited') {
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = __assign({
        $id: 'crudFetchInitedData',
        type: 'object'
      }, jsonToJsonSchema(data.responseData, function (type, key) {
        if (type === 'array' && key === 'items') {
          return i18n("77fdd35933c099cdcb64b71f3fbe7a6c");
        }
        if (type === 'number' && key === 'count') {
          return i18n("31769d6063c5ab0cfee842b395916fd4");
        }
        return key;
      }));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  /** crud 不同 mode 之间转换时候，主体的转换 */
  CRUDPlugin.prototype.transformByMode = function (_a) {
    var _b, _c;
    var from = _a.from,
      to = _a.to,
      schema = _a.schema;
    var fields = [];
    var actions = [];
    if (!from || from === 'table') {
      (schema.columns || []).forEach(function (item) {
        if (!isPlainObject(item)) {
          return;
        } else if (item.type === 'operation') {
          actions.push.apply(actions, __spreadArray([], __read((item === null || item === void 0 ? void 0 : item.buttons) || []), false));
        } else {
          fields.push(item);
        }
      });
    } else {
      var name_1 = from === 'cards' ? 'card' : 'listItem';
      fields.push.apply(fields, __spreadArray([], __read(((_b = schema === null || schema === void 0 ? void 0 : schema[name_1]) === null || _b === void 0 ? void 0 : _b.body) || []), false));
      actions.push.apply(actions, __spreadArray([], __read(((_c = schema === null || schema === void 0 ? void 0 : schema[name_1]) === null || _c === void 0 ? void 0 : _c.actions) || []), false));
    }
    // 保底
    fields.length || fields.concat([{
      name: 'a',
      label: 'A'
    }, {
      name: 'b',
      label: 'B'
    }]);
    if (to === 'table') {
      return fields.concat({
        type: 'operation',
        label: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
        buttons: actions
      });
    } else if (to === 'cards') {
      return {
        type: 'card',
        header: {
          title: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
          subTitle: i18n("72cf373be86a38b29f6d2f15900b0da1")
        },
        body: fields,
        actions: actions
      };
    }
    return {
      body: fields,
      actions: actions
    };
  };
  CRUDPlugin.id = 'CRUDPlugin';
  return CRUDPlugin;
}(BasePlugin);
registerEditorPlugin(CRUDPlugin);

export { CRUDPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
