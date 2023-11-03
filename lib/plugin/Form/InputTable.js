/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var amisCore = require('amis-core');
var DSBuilderManager = require('../../builder/DSBuilderManager.js');
var validator = require('../../validator.js');
var helper = require('../../renderer/event-control/helper.js');
var cloneDeep = require('lodash/cloneDeep');
var util = require('../../util.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

var TableControlPlugin = /** @class */function (_super) {
  tslib.__extends(TableControlPlugin, _super);
  function TableControlPlugin(manager) {
    var _this = _super.call(this, manager) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-table';
    _this.$schema = '/schemas/TableControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("e41fd1934b82f93f5737827be7323119");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-table';
    _this.pluginIcon = 'table-plugin';
    _this.description = i18nRuntime.i18n("a5c2dba5ccf62851b24cfa12d4958ce2");
    _this.docLink = '/amis/zh-CN/components/form/input-table';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-table',
      name: 'table',
      label: i18nRuntime.i18n("4ba0387a2daf11ad9c67a75b52819eb3"),
      columns: [{
        label: i18nRuntime.i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
        name: 'name',
        quickEditType: 'input-text',
        quickEdit: {
          type: 'input-text',
          name: 'name1'
        }
      }, {
        label: i18nRuntime.i18n("b34422e637c90181d3fca4485a97c712"),
        name: 'score',
        quickEditType: 'input-number',
        quickEdit: {
          type: 'input-number',
          mode: 'inline',
          name: 'score'
        }
      }, {
        label: i18nRuntime.i18n("95e0d70d1809d5267c2419eda58e78ca"),
        name: 'level',
        quickEditType: 'select',
        quickEdit: {
          type: 'select',
          name: 'level',
          options: [{
            label: 'A',
            value: 'A'
          }, {
            label: 'B',
            value: 'B'
          }, {
            label: 'C',
            value: 'C'
          }]
        }
      }],
      addable: false,
      footerAddBtn: {
        label: i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191"),
        icon: 'fa fa-plus'
      },
      strictMode: true
    };
    _this.regions = [{
      key: 'columns',
      label: i18nRuntime.i18n("1f9794dd5634220ed0a498c666cf46fe"),
      renderMethod: 'renderTableContent',
      preferTag: i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7"),
      dndMode: 'position-h'
    }];
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: [{
          color: 'green',
          name: i18nRuntime.i18n("b2c712c788d3a143206eee22fe24d9f1")
        }]
      })
    };
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelTitle = i18nRuntime.i18n("13c250c68608118463871ce7cd8b292c");
    _this.events = [{
      eventName: 'add',
      eventLabel: i18nRuntime.i18n("58477471b3bb8ad53fe9ab18a244868b"),
      description: i18nRuntime.i18n("6070fdf451b08e4302a7dab560771222"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              index: {
                type: 'array',
                title: i18nRuntime.i18n("d84017fa76584f7475e26f79767df28d")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'addConfirm',
      eventLabel: i18nRuntime.i18n("5e3640e4bc8efbe00a7b7c6ba169560c"),
      description: i18nRuntime.i18n("008ae858112dcc7739985045e4326f3a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("1fb1cbe49c3e72c2b5f4e0151a4cb5d9")
              },
              index: {
                type: 'number',
                title: i18nRuntime.i18n("d84017fa76584f7475e26f79767df28d")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'addSuccess',
      eventLabel: i18nRuntime.i18n("3fdaeadf0e8a3154ae62784f04138c28"),
      description: i18nRuntime.i18n("bd4ef227fe8aae88ae6aa97236c0e9bb"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("1fb1cbe49c3e72c2b5f4e0151a4cb5d9")
              },
              index: {
                type: 'number',
                title: i18nRuntime.i18n("d84017fa76584f7475e26f79767df28d")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'addFail',
      eventLabel: i18nRuntime.i18n("6452a05591d7402a8bcd9fadc950c449"),
      description: i18nRuntime.i18n("bd7c39d10dbf6985d2be2d9a4fdcccf7"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("1fb1cbe49c3e72c2b5f4e0151a4cb5d9")
              },
              index: {
                type: 'number',
                title: i18nRuntime.i18n("d84017fa76584f7475e26f79767df28d")
              },
              error: {
                type: 'object',
                title: i18nRuntime.i18n("37122b9e4499da38258b3d51b09d68a1")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'edit',
      eventLabel: i18nRuntime.i18n("88ebffeee507da0f0d039eb2d05f7e2c"),
      description: i18nRuntime.i18n("daf24d1f83e1b4fce2f57a6b041ddba6"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("a9e009a9936bf5bcc9d4eabcb3e952e0")
              },
              index: {
                type: 'number',
                title: i18nRuntime.i18n("e756ec22a0f897c4dd886c5f4a95b7a6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'editConfirm',
      eventLabel: i18nRuntime.i18n("4271f29faca65d7840ad6bb2c4a7b8c6"),
      description: i18nRuntime.i18n("562f54a2fec7a68f85ff192a68cf69f2"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("a9e009a9936bf5bcc9d4eabcb3e952e0")
              },
              index: {
                type: 'number',
                title: i18nRuntime.i18n("e756ec22a0f897c4dd886c5f4a95b7a6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'editSuccess',
      eventLabel: i18nRuntime.i18n("3bb47b67994cb374e601fab35f63bc8e"),
      description: i18nRuntime.i18n("b394745a8a77179da0000293638e8a56"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("a9e009a9936bf5bcc9d4eabcb3e952e0")
              },
              index: {
                type: 'number',
                title: i18nRuntime.i18n("e756ec22a0f897c4dd886c5f4a95b7a6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'editFail',
      eventLabel: i18nRuntime.i18n("9304e8f4c324b5882b550caa971b64b8"),
      description: i18nRuntime.i18n("b9d277c3ffab7d4b955ad10308c7ae0a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("a9e009a9936bf5bcc9d4eabcb3e952e0")
              },
              index: {
                type: 'number',
                title: i18nRuntime.i18n("e756ec22a0f897c4dd886c5f4a95b7a6")
              },
              error: {
                type: 'object',
                title: i18nRuntime.i18n("650bccdd6f99fe5fc4ca6cb8788e7cb4")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'delete',
      eventLabel: i18nRuntime.i18n("947fa341a6d676d7f25bae6bef8342cd"),
      description: i18nRuntime.i18n("7508f6d66d920323d87a9f9d58487a40"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("a9e009a9936bf5bcc9d4eabcb3e952e0")
              },
              index: {
                type: 'object',
                title: i18nRuntime.i18n("e756ec22a0f897c4dd886c5f4a95b7a6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'deleteSuccess',
      eventLabel: i18nRuntime.i18n("0007d170de017dafc266aa03926d7f00"),
      description: i18nRuntime.i18n("13640e78822f62b7b71bfabb4604025e"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("a9e009a9936bf5bcc9d4eabcb3e952e0")
              },
              index: {
                type: 'object',
                title: i18nRuntime.i18n("e756ec22a0f897c4dd886c5f4a95b7a6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'deleteFail',
      eventLabel: i18nRuntime.i18n("acf0664a54dc58d9d0377bb56e162092"),
      description: i18nRuntime.i18n("14d36ca583bcbfc5516a000eb06ccedd"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              },
              item: {
                type: 'object',
                title: i18nRuntime.i18n("a9e009a9936bf5bcc9d4eabcb3e952e0")
              },
              index: {
                type: 'object',
                title: i18nRuntime.i18n("e756ec22a0f897c4dd886c5f4a95b7a6")
              },
              error: {
                type: 'object',
                title: i18nRuntime.i18n("37122b9e4499da38258b3d51b09d68a1")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("692dc28abc42931daca8fa12d69d5c99"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("c9f63503ee66082fc00c3e6eac57a95f")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }, {
      actionType: 'addItem',
      actionLabel: i18nRuntime.i18n("58477471b3bb8ad53fe9ab18a244868b"),
      description: i18nRuntime.i18n("f8692d409bb7f122a374872e01efd03a"),
      innerArgs: ['item', 'index'],
      schema: helper.getArgsWrapper({
        type: 'container',
        body: [{
          type: 'input-number',
          name: 'index',
          mode: 'horizontal',
          horizontal: {
            leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
          },

          label: i18nRuntime.i18n("459fd144ee129b501545d19c169269e9"),
          size: 'lg',
          placeholder: i18nRuntime.i18n("cfe5917c83c8c31d5e57ddeb1f3460a5")
        }, {
          type: 'combo',
          name: 'value',
          label: i18nRuntime.i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
          multiple: true,
          removable: true,
          required: true,
          addable: true,
          strictMode: false,
          canAccessSuperData: true,
          mode: 'horizontal',
          size: 'lg',
          addButtonText: i18nRuntime.i18n("a26858cccbc451fd53515416a5968550"),
          items: [{
            type: 'combo',
            name: 'item',
            label: false,
            renderLabel: false,
            multiple: true,
            removable: true,
            required: true,
            addable: true,
            strictMode: false,
            canAccessSuperData: true,
            className: 'm-l',
            size: 'lg',
            mode: 'horizontal',
            addButtonText: i18nRuntime.i18n("c520ed9911d349c7974116d3d1e1423e"),
            items: [{
              name: 'key',
              type: 'input-text',
              source: '${__setValueDs}',
              labelField: 'label',
              valueField: 'value',
              required: true
            }, amisEditorCore.getSchemaTpl('formulaControl', {
              name: 'val',
              variables: '${variables}'
            })]
          }]
        }]
      })
    }, {
      actionType: 'deleteItem',
      actionLabel: i18nRuntime.i18n("947fa341a6d676d7f25bae6bef8342cd"),
      description: i18nRuntime.i18n("344c1c96f9cb3275f972929755b4e238"),
      innerArgs: ['condition', 'index'],
      schema: helper.getArgsWrapper({
        type: 'container',
        body: [{
          type: 'radios',
          name: '__deleteType',
          inputClassName: 'event-action-radio',
          mode: 'horizontal',
          label: i18nRuntime.i18n("8910acd418e45a30f01e7e531b90b61b"),
          pipeIn: function (value, store) {
            if (store.data.__deleteType === undefined) {
              var deleteType = store.data.condition ? 'conditionExpression' : 'rowIndex';
              store.updateData({
                __deleteType: deleteType
              });
              return deleteType;
            }
            return value;
          },
          horizontal: {
            leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
          },

          options: [{
            label: i18nRuntime.i18n("ebf62450c3fb11c0b7e06da2d7535d6c"),
            value: 'rowIndex'
          }, {
            label: i18nRuntime.i18n("4bf7636a84714fac140e42b4cee242d4"),
            value: 'conditionExpression'
          }],
          onChange: function (value, oldVal, data, form) {
            form.setValueByName('index', undefined);
            form.setValueByName('condition', undefined);
          }
        }, {
          type: 'input-text',
          name: 'index',
          mode: 'horizontal',
          horizontal: {
            leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
          },

          required: true,
          label: i18nRuntime.i18n("7708fb1394ce722ee73326437a66c77a"),
          size: 'lg',
          placeholder: i18nRuntime.i18n("015f108b96c70bba6511091e159db0ac"),
          hiddenOn: 'data.__deleteType !== "rowIndex"'
        }, amisEditorCore.getSchemaTpl('formulaControl', {
          name: 'condition',
          variables: '${variables}',
          label: i18nRuntime.i18n("63aeb2082d7cc0a316fc1e44913d7749"),
          hiddenOn: 'data.__deleteType !== "conditionExpression"',
          mode: 'horizontal',
          required: true,
          horizontal: {
            leftFixed: 4 // 需要设置下leftFixed，否则这个字段的控件没有与其他字段的控件左对齐
          },

          size: 'lg'
        })]
      })
    },
    // {
    //   actionType: 'reset',
    //   actionLabel: '重置',
    //   description: '将值重置为resetValue，若没有配置resetValue，则清空'
    // },
    {
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("4622a4ce221f9b79aa3396cc461adc75")
    }];
    _this.panelBodyCreator = function (context) {
      context.schema.type === 'crud';
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), {
            type: 'ae-switch-more',
            name: 'needConfirm',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1205e138ba64dddf61c1f8e6eb3a1aa7"), i18nRuntime.i18n("3d4d83f05a12364e2522fcfb265d8ce8")),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [{
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'confirmBtnLabel',
                label: i18nRuntime.i18n("1d96dc9b36793e242322dd1e092a010c"),
                placeholder: i18nRuntime.i18n("1d96dc9b36793e242322dd1e092a010c")
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'confirmBtnIcon',
                label: i18nRuntime.i18n("c18169dd6fceab2f023216fa6f7d22c1"),
                pipeIn: amisEditorCore.defaultValue('check')
              }), {
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'cancelBtnLabel',
                label: i18nRuntime.i18n("e0698c2a2d5c568edfc5a0b1a1d298eb"),
                placeholder: i18nRuntime.i18n("e0698c2a2d5c568edfc5a0b1a1d298eb")
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'cancelBtnIcon',
                label: i18nRuntime.i18n("5720057e62e80f7a04489dc4c035b4f1"),
                pipeIn: amisEditorCore.defaultValue('close')
              })]
            },
            pipeIn: amisEditorCore.defaultValue(true)
          }, {
            type: 'ae-switch-more',
            name: 'addable',
            label: i18nRuntime.i18n("8865c6822a31e0da6bc7eece8677d8f0"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [amisEditorCore.getSchemaTpl('apiControl', {
                label: i18nRuntime.i18n("d03c96a2da4905c5f13a87c0d8ddbdb4"),
                name: 'addApi',
                mode: 'row'
              }), amisEditorCore.getSchemaTpl('switch', {
                name: 'showTableAddBtn',
                label: i18nRuntime.i18n("738b58219dda4a849e293c0f75d06438"),
                value: true
              }), {
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'addBtnLabel',
                visibleOn: 'this.showTableAddBtn',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'addBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                visibleOn: 'this.showTableAddBtn',
                pipeIn: amisEditorCore.defaultValue('plus')
              })]
            }
          }, {
            type: 'ae-switch-more',
            name: 'copyable',
            label: i18nRuntime.i18n("f9a9fcc3bf6a3c8ff1e99fa48ed6d03d"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [{
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'copyBtnLabel',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'copyBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                pipeIn: amisEditorCore.defaultValue('copy')
              })]
            }
          }, {
            type: 'ae-switch-more',
            name: 'editable',
            label: i18nRuntime.i18n("a32b3bf74850faad3a9ae6a0a5dac781"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [amisEditorCore.getSchemaTpl('apiControl', {
                label: i18nRuntime.i18n("ea56ca3dac0d39e463a8233fd40a9eb6"),
                name: 'updateApi',
                mode: 'row'
              }), {
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'editBtnLabel',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'editBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                pipeIn: amisEditorCore.defaultValue('pencil')
              })]
            }
          }, {
            type: 'ae-switch-more',
            name: 'removable',
            label: i18nRuntime.i18n("3c87af7c432e6b1f59e4f415fd5060cf"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [amisEditorCore.getSchemaTpl('deleteApi'), {
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'deleteBtnLabel',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'deleteBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                pipeIn: amisEditorCore.defaultValue('minus')
              })]
            }
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'showIndex',
            label: i18nRuntime.i18n("d173fb23320acba326a4424133969256"),
            pipeIn: amisEditorCore.defaultValue(false)
          }), {
            type: 'input-number',
            name: 'perPage',
            label: i18nRuntime.i18n("26eb498526ba909386befc43466db79d"),
            placeholder: i18nRuntime.i18n("306abb77f96a1048cf6e61bfe6e7bae4")
          }, {
            type: 'input-number',
            name: 'minLength',
            label: i18nRuntime.i18n("52029187eaa09f55193b6a15387e45ca"),
            pipeIn: amisEditorCore.defaultValue(0)
          }, {
            type: 'input-number',
            name: 'maxLength',
            label: i18nRuntime.i18n("3d99d1f17ebf865877e681397c61dc9d")
          }, amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('labelRemark'), {
            name: 'columnsTogglable',
            label: amisEditorCore.tipedLabel('列显示开关', '是否展示表格列的显隐控件，“自动”即列数量大于5时自动开启'),
            type: 'button-group-select',
            pipeIn: amisEditorCore.defaultValue('auto'),
            size: 'sm',
            labelAlign: 'left',
            options: [{
              label: i18nRuntime.i18n("3aed2c11e95a9c0ea1d853d4aee72e8c"),
              value: 'auto'
            }, {
              label: i18nRuntime.i18n("cc42dd3170fdf36bdc2b0f58ab23eb84"),
              value: true
            }, {
              label: i18nRuntime.i18n("b15d91274e9fc68608c609999e0413fa"),
              value: false
            }]
          }]
        }, {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            name: 'strictMode',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("98d52b737d6bc171b6d5bad9a42f6e23"), i18nRuntime.i18n("aa8b2a821e8e32196a720eaaa41b64d3")),
            pipeIn: amisEditorCore.defaultValue(false)
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'canAccessSuperData',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1c1618f67cfea6fefb5f287932be2c27"), i18nRuntime.i18n("2aa56a9b94ee3fde76a15711c94fdabc")),
            pipeIn: amisEditorCore.defaultValue(false)
          })]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), amisEditorCore.getSchemaTpl('style:classNames', {
          schema: [amisEditorCore.getSchemaTpl('className', {
            name: 'rowClassName',
            label: i18nRuntime.i18n("53a9db06d0b7e3482dc21e53f150e257")
          })]
        })])
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
  Object.defineProperty(TableControlPlugin.prototype, "scaffoldForm", {
    get: function () {
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return {
        title: i18nRuntime.i18n("afccc17d5d672b10a1292dcd671ef534"),
        body: [{
          name: 'columns',
          type: 'input-table',
          label: false,
          needConfirm: false,
          addable: true,
          removable: true,
          columns: [{
            type: 'text',
            name: 'label',
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            quickEdit: {
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              mode: 'inline'
            }
          }, {
            type: 'text',
            name: 'name',
            label: i18nRuntime.i18n("41a344642681efaaa418c228ba7fb45c"),
            quickEdit: {
              type: 'input-text',
              mode: 'inline'
            }
          }, {
            type: 'text',
            name: 'type',
            label: i18nRuntime.i18n("1711a82f9b0825015c2c49d9659c9837"),
            width: 140,
            quickEdit: {
              type: 'select',
              clearable: true,
              options: [{
                value: 'text',
                label: i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371")
              }, {
                value: 'tpl',
                label: i18nRuntime.i18n("59cf15fe6b8d659c9bd2f86143534a06")
              }, {
                value: 'container',
                label: i18nRuntime.i18n("22c799040acdb2601b437ed5449de076")
              }, {
                value: 'image',
                label: i18nRuntime.i18n("20def7942674282277c3714ed7ea6ce0")
              }, {
                value: 'date',
                label: i18nRuntime.i18n("4ff1e74e43a3586339251494117185ad")
              }, {
                value: 'datetime',
                label: i18nRuntime.i18n("0c3bf4fce50589b1073baf15f8a00d36")
              }, {
                value: 'time',
                label: i18nRuntime.i18n("19fcb9eb2594059036dfede5f4ec53e8")
              }, {
                value: 'status',
                label: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b")
              }, {
                value: 'mapping',
                label: i18nRuntime.i18n("9da188491dd34c4382a5b9f006194e41")
              }],
              pipeIn: amisEditorCore.defaultValue('text')
            }
          }, {
            type: 'text',
            name: 'quickEditType',
            label: i18nRuntime.i18n("63bb911d6392cb2740140d406ab83d37"),
            quickEdit: {
              type: 'select',
              clearable: true,
              placeholder: i18nRuntime.i18n("c13998e4c837dc40b8e90828d99561df"),
              options: [{
                value: 'input-text',
                label: i18nRuntime.i18n("5ac57ce6df8c2a19668b7429aebd9f33")
              }, {
                value: 'input-number',
                label: i18nRuntime.i18n("1e65b8181e9a40e76b86e2c261cafbe0")
              }, {
                value: 'select',
                label: i18nRuntime.i18n("6530334ebf5ca810e576858eba168685")
              }, {
                value: 'input-color',
                label: i18nRuntime.i18n("f25cb224e4543c1dc0228fca8dbfaf1c")
              }, {
                value: 'checkboxes',
                label: i18nRuntime.i18n("1145703a07e11b6e680ee2ec8afae0b4")
              }, {
                value: 'radios',
                label: i18nRuntime.i18n("9913107b19cb6012250134ff91377430")
              }, {
                value: 'input-date',
                label: i18nRuntime.i18n("4ff1e74e43a3586339251494117185ad")
              }, {
                value: 'input-date-range',
                label: i18nRuntime.i18n("7866226eb814f681dcc4037e7489aab8")
              }, {
                value: 'switch',
                label: i18nRuntime.i18n("a6beb974cc0b50eebd18120b8110a88b")
              }, {
                value: 'nested-select',
                label: i18nRuntime.i18n("24d9de25721d1fb0ecf89ef81c43d877")
              }, {
                value: 'input-city',
                label: i18nRuntime.i18n("a877779dc422c5321057b638d6d520e5")
              }, {
                value: 'input-tree',
                label: i18nRuntime.i18n("479728c411bac59bc44d5ab8dc3cb4f0")
              }]
            },
            width: 210
          }]
        }],
        pipeOut: function (schema) {
          var columns = cloneDeep__default["default"](schema.columns || []);
          var rawColumns = [];
          console.log('columns====', columns);
          columns.forEach(function (column) {
            var _a;
            var rawColumn = tslib.__assign(tslib.__assign({}, column), {
              type: column.type,
              quickEdit: ((_a = column.quickEdit) === null || _a === void 0 ? void 0 : _a.type) ? {
                type: column.quickEdit.type,
                name: column.name
              } : {
                type: column.quickEditType,
                name: column.name + '12313'
              }
            });
            rawColumns.push(rawColumn);
          });
          schema.columns = rawColumns;
          return tslib.__assign({}, schema);
        },
        canRebuild: true
      };
    },
    enumerable: false,
    configurable: true
  });
  TableControlPlugin.prototype.filterProps = function (props) {
    var arr = util.resolveArrayDatasource(props);
    /** 可 */
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData_1 = {};
      if (Array.isArray(props.columns)) {
        props.columns.forEach(function (column) {
          /** 可编辑状态下不写入 Mock 数据，避免误导用户 */
          if (column.name && !props.editable) {
            amisCore.setVariable(mockedData_1, column.name, amisEditorCore.mockValue(column));
          }
        });
      }
      props.value = amisEditorCore.repeatArray(mockedData_1, 1).map(function (item, index) {
        return tslib.__assign(tslib.__assign({}, item), {
          id: index + 1
        });
      });
    } else {
      // 只取10条预览，否则太多卡顿
      props.value = arr.slice(0, 10);
    }
    return props;
  };
  // 自动插入 label
  TableControlPlugin.prototype.beforeInsert = function (event) {
    var _a, _b, _c, _d;
    var context = event.context;
    if ((context.info.plugin === this || ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) && context.region === 'columns') {
      context.data = tslib.__assign(tslib.__assign({}, context.data), {
        label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : i18nRuntime.i18n("bcee820bc20342a4d388a35ed32a35fe")
      });
    }
  };
  TableControlPlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
    var _a, _b, _c, _d, _e;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var itemsSchema, columns, parentScopeId, isColumnChild, scopeId, cells, cell, items, current, schema, _f, _g, scopeId, scope;
      return tslib.__generator(this, function (_h) {
        switch (_h.label) {
          case 0:
            itemsSchema = {
              $id: "".concat(node.id, "-").concat(node.type, "-tableRows"),
              type: 'object',
              properties: {}
            };
            columns = node.children.find(function (item) {
              return item.isRegion && item.region === 'columns';
            });
            parentScopeId = "".concat(parent === null || parent === void 0 ? void 0 : parent.id, "-").concat(parent === null || parent === void 0 ? void 0 : parent.type).concat(((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === 'cell' ? '-currentRow' : '');
            isColumnChild = false;
            // 追加当前行scope
            if (trigger) {
              isColumnChild = amisCore.someTree(columns === null || columns === void 0 ? void 0 : columns.children, function (item) {
                return item.id === trigger.id;
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
            cells = (columns === null || columns === void 0 ? void 0 : columns.children.concat()) || [];
            _h.label = 1;
          case 1:
            if (!(cells.length > 0)) return [3 /*break*/, 6];
            cell = cells.shift();
            items = cell.children.concat();
            _h.label = 2;
          case 2:
            if (!items.length) return [3 /*break*/, 5];
            current = items.shift();
            schema = current.schema;
            if (!schema.name) return [3 /*break*/, 4];
            _f = itemsSchema.properties;
            _g = schema.name;
            return [4 /*yield*/, (_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, region, trigger, node)];
          case 3:
            _f[_g] = _h.sent();
            _h.label = 4;
          case 4:
            return [3 /*break*/, 2];
          case 5:
            return [3 /*break*/, 1];
          case 6:
            if ((region === null || region === void 0 ? void 0 : region.region) === 'columns') {
              return [2 /*return*/, itemsSchema];
            }
            // 追加当前行数据
            if (isColumnChild) {
              scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
              scope = this.manager.dataSchema.getScope(scopeId);
              scope === null || scope === void 0 ? void 0 : scope.addSchema(itemsSchema);
            }
            return [2 /*return*/, {
              $id: "".concat(node.id, "-").concat(node.type, "-tableData"),
              type: 'array',
              title: ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.label) || ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.name),
              items: itemsSchema
            }];
        }
      });
    });
  };
  TableControlPlugin.prototype.getAvailableContextFields = function (scopeNode, target, region) {
    var _a, _b;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var scope, builder;
      return tslib.__generator(this, function (_c) {
        if (target.type === scopeNode.type || target.parent.isRegion && target.parent.region === 'columns') {
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

  TableControlPlugin.id = 'TableControlPlugin';
  return TableControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TableControlPlugin);

exports.TableControlPlugin = TableControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
