/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var React = require('react');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var WizardPlugin = /** @class */function (_super) {
  tslib.__extends(WizardPlugin, _super);
  function WizardPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'wizard';
    _this.$schema = '/schemas/WizardSchema.json';
    _this.name = i18nRuntime.i18n("5acec91385a3b9093e3c803f6b0d869a");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("c8c0339a6f9e105cfef45b76b788b635");
    _this.docLink = '/amis/zh-CN/components/wizard';
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-list-ol';
    _this.pluginIcon = 'wizard-plugin';
    _this.scaffold = {
      type: 'wizard',
      steps: [{
        title: i18nRuntime.i18n("863a8583132d087e57aebb7d89e18a50"),
        body: [{
          type: 'input-text',
          label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb"),
          name: 'var1'
        }]
      }, {
        title: i18nRuntime.i18n("9757f2c59c17e9aea46e0c8adb69597e"),
        body: [{
          type: 'input-text',
          label: i18nRuntime.i18n("37dd6f28ffb87d8907a286e0ef4dc7fe"),
          name: 'var2'
        }]
      }]
    };
    _this.previewSchema = {
      type: 'wizard',
      className: 'text-left m-b-none',
      steps: [{
        title: i18nRuntime.i18n("863a8583132d087e57aebb7d89e18a50"),
        body: [{
          type: 'input-text',
          label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb"),
          name: 'var1'
        }]
      }, {
        title: i18nRuntime.i18n("9757f2c59c17e9aea46e0c8adb69597e"),
        body: []
      }]
    };
    // 事件定义
    _this.events = [{
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
      eventName: 'finished',
      eventLabel: i18nRuntime.i18n("155149d24d20197bc0836bededf63abf"),
      description: i18nRuntime.i18n("d384a3c931bdf315e4760c9fc5980e6d"),
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
      eventName: 'stepChange',
      eventLabel: i18nRuntime.i18n("5be9e21eb0797c9faa053eb0237c36f9"),
      description: i18nRuntime.i18n("d837ddaacb39a13806590da335e89397"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              step: {
                type: 'string',
                title: i18nRuntime.i18n("02f706d7510e68c96aa073852d90ec20")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("b2a5322c8dbc0d8343315cafbd39b7ce"),
      description: i18nRuntime.i18n("d6fc04abf4889a864bea240d6b67963a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3")
          }
        }
      }]
    }, {
      eventName: 'submitSucc',
      eventLabel: i18nRuntime.i18n("23b62e9cbc868e024b80d2e3fad80ac7"),
      description: i18nRuntime.i18n("33c627bce8015c50152941a5b6fada32"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              result: {
                type: 'object',
                title: i18nRuntime.i18n("18344d8a27aa678e401d5e575d4efe99")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'submitFail',
      eventLabel: i18nRuntime.i18n("f5d008dea7d2e953195a5588dea3c8e4"),
      description: i18nRuntime.i18n("574f27f7223c86545a7724d18da96651"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              error: {
                type: 'object',
                title: i18nRuntime.i18n("17aa713bc661f98e585ec3725d6d4f0d")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'stepSubmitSucc',
      eventLabel: i18nRuntime.i18n("8a427977d8135a019e4f1056120bfad2"),
      description: i18nRuntime.i18n("d65dcca33a0118a0a5ce343264192ea6")
    }, {
      eventName: 'stepSubmitFail',
      eventLabel: i18nRuntime.i18n("5d7d91d9da162ee8fddd4d331d1434b5"),
      description: i18nRuntime.i18n("1c11d38e7ecf2facbf82f772d9222d45"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              error: {
                type: 'object',
                title: i18nRuntime.i18n("357954d848a9e2f12208673b3906a972")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'submit',
      actionLabel: i18nRuntime.i18n("d6c21651c32c63c8d61c85944c2c91af"),
      description: i18nRuntime.i18n("75e3dc4be4ae7aca7e1cebc13f7e486a")
    }, {
      actionType: 'stepSubmit',
      actionLabel: i18nRuntime.i18n("0c3005b490ef428660ca2265a714bdbb"),
      description: i18nRuntime.i18n("832efcc5c30746b84b910cde8630d491"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), i18nRuntime.i18n("832efcc5c30746b84b910cde8630d491"));
      }
    }, {
      actionType: 'prev',
      actionLabel: i18nRuntime.i18n("eeb6908870e058bc23d52c1e405a054e"),
      description: i18nRuntime.i18n("fc5dbc5789e158384f634eb8ff466b46")
    }, {
      actionType: 'next',
      actionLabel: i18nRuntime.i18n("38ce27d84639f3a6e07c00b3b4995c0e"),
      description: i18nRuntime.i18n("832efcc5c30746b84b910cde8630d491")
    }, {
      actionType: 'goto-step',
      actionLabel: i18nRuntime.i18n("5fa57cab26a9d4e659c2e497018729ef"),
      description: i18nRuntime.i18n("fce22163929e8191b7de43699316f2a0"),
      innerArgs: ['step'],
      descDetail: function (info) {
        var _a;
        return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), i18nRuntime.i18n("d529f7d5ed8956cd890173b4b5045a67"), React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.step), i18nRuntime.i18n("4a0ff5106d129883b446a29b1dac6f47"));
      },
      schema: helper.getArgsWrapper([amisEditorCore.getSchemaTpl('formulaControl', {
        name: 'step',
        label: i18nRuntime.i18n("78ada959bf5bdd6c70ee411c4cf23601"),
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal',
        required: true
      })])
    }, {
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18nRuntime.i18n("5acec91385a3b9093e3c803f6b0d869a");
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), {
          name: 'steps',
          label: i18nRuntime.i18n("098521c027a49fba5eb7f35430a6a9da"),
          type: 'combo',
          multiple: true,
          multiLine: true,
          addButtonText: i18nRuntime.i18n("c5538d5c74235d2988e51e632c4eed0b"),
          scaffold: {
            title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            items: [{
              type: 'input-text',
              name: 'var1',
              label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb")
            }]
          },
          items: [{
            name: 'title',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            pipeIn: function (value, data) {
              return value || data.label;
            }
          }, {
            type: 'fieldSet',
            title: i18nRuntime.i18n("dda36edbd4626e7fc868c14f9aa1556a"),
            collapsed: true,
            collapsable: true,
            className: 'fieldset m-b-none',
            body: [{
              name: 'mode',
              label: i18nRuntime.i18n("1fdadb49bcabfdc36a4a9e020f597f4d"),
              type: 'button-group-select',
              size: 'xs',
              mode: 'inline',
              className: 'w-full',
              value: 'normal',
              options: [{
                label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
                value: 'normal'
              }, {
                label: i18nRuntime.i18n("3720b9ef8053b7b8a54c7d8ace051912"),
                value: 'horizontal'
              }, {
                label: i18nRuntime.i18n("2dd25b8c21efbfee4a198787810d65d8"),
                value: 'inline'
              }]
            }, amisEditorCore.getSchemaTpl('horizontal', {
              visibleOn: 'data.mode == "horizontal"'
            }), amisEditorCore.getSchemaTpl('api', {
              label: i18nRuntime.i18n("ff7cc75cc43c25c823d05d87cb8190b0"),
              description: i18nRuntime.i18n("1fd41e410930ac58e748f7704c3a05f3")
            }), amisEditorCore.getSchemaTpl('switch', {
              label: i18nRuntime.i18n("dd1b9892e274b16540aeda961437870d"),
              name: 'asyncApi',
              visibleOn: 'data.api',
              labelRemark: {
                trigger: 'click',
                rootClose: true,
                title: i18nRuntime.i18n("e638bd32b4342dfc7a15990a79f588ae"),
                content: i18nRuntime.i18n("6df230c8f18709575777172f0a9a588c"),
                placement: 'left'
              },
              pipeIn: function (value) {
                return value != null;
              },
              pipeOut: function (value) {
                return value ? '' : undefined;
              }
            }), amisEditorCore.getSchemaTpl('api', {
              name: 'asyncApi',
              label: i18nRuntime.i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
              visibleOn: 'data.asyncApi != null',
              description: i18nRuntime.i18n("0705e4aba9f22ae70d906e2201a4a68d")
            }), {
              type: 'divider'
            }, amisEditorCore.getSchemaTpl('api', {
              name: 'initApi',
              label: i18nRuntime.i18n("b4bc91701b86fe8543d649e97daea602"),
              description: i18nRuntime.i18n("258c437ef67e5ef12f3a766ff1802f85")
            }), amisEditorCore.getSchemaTpl('switch', {
              label: i18nRuntime.i18n("e8c46074d8432532cac25eba56bca354"),
              name: 'initAsyncApi',
              visibleOn: 'data.initApi',
              labelRemark: {
                trigger: 'click',
                rootClose: true,
                title: i18nRuntime.i18n("e638bd32b4342dfc7a15990a79f588ae"),
                content: i18nRuntime.i18n("6df230c8f18709575777172f0a9a588c"),
                placement: 'left'
              },
              pipeIn: function (value) {
                return value != null;
              },
              pipeOut: function (value) {
                return value ? '' : undefined;
              }
            }), amisEditorCore.getSchemaTpl('api', {
              name: 'initAsyncApi',
              label: i18nRuntime.i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
              visibleOn: 'data.initAsyncApi != null',
              description: i18nRuntime.i18n("d2af24c0f76cf325f1c8fa939576c379")
            }), amisEditorCore.getSchemaTpl('initFetch'), {
              label: i18nRuntime.i18n("938b484df1447d8f01f96e45125eb031"),
              type: 'input-text',
              name: 'jumpableOn',
              description: i18nRuntime.i18n("20022725ac2c53869f7af6646ca4ba29")
            }]
          }]
        }, {
          type: 'input-text',
          name: 'startStep',
          label: i18nRuntime.i18n("d4b8306441c00f01d4f044b3802c4266"),
          description: i18nRuntime.i18n("37c0c041a0ad487d23c9f42c29f6d5e1")
        }]
      }, {
        title: i18nRuntime.i18n("54ea89b497ec3bb319c68844dfa3687f"),
        body: [amisEditorCore.getSchemaTpl('api', {
          name: 'initApi',
          label: i18nRuntime.i18n("b4bc91701b86fe8543d649e97daea602"),
          description: i18nRuntime.i18n("076bd7c0adfc4f5d2abde6b309d9f53b")
        }), amisEditorCore.getSchemaTpl('switch', {
          label: i18nRuntime.i18n("e8c46074d8432532cac25eba56bca354"),
          name: 'initAsyncApi',
          visibleOn: 'data.initApi',
          labelRemark: {
            trigger: 'click',
            rootClose: true,
            title: i18nRuntime.i18n("e638bd32b4342dfc7a15990a79f588ae"),
            content: i18nRuntime.i18n("6df230c8f18709575777172f0a9a588c"),
            placement: 'left'
          },
          pipeIn: function (value) {
            return value != null;
          },
          pipeOut: function (value) {
            return value ? '' : undefined;
          }
        }), amisEditorCore.getSchemaTpl('api', {
          name: 'initAsyncApi',
          label: i18nRuntime.i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
          visibleOn: 'data.initAsyncApi != null',
          description: i18nRuntime.i18n("d2af24c0f76cf325f1c8fa939576c379")
        }), {
          name: 'initFetch',
          type: 'radios',
          label: i18nRuntime.i18n("0951dad1723aa1191ce1a2e96db76051"),
          inline: true,
          onChange: function () {},
          options: [{
            label: i18nRuntime.i18n("0a60ac8f02ccd2cf723f927284877851"),
            value: true
          }, {
            label: i18nRuntime.i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
            value: false
          }, {
            label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
            value: ''
          }]
        }, {
          name: 'initFetchOn',
          autoComplete: false,
          visibleOn: 'typeof this.initFetch !== "boolean"',
          type: 'input-text',
          placeholder: '',
          className: 'm-t-n-sm'
        }, {
          type: 'divider'
        }, amisEditorCore.getSchemaTpl('api', {
          label: i18nRuntime.i18n("ff7cc75cc43c25c823d05d87cb8190b0"),
          description: i18nRuntime.i18n("dbb19fea1965f7ef88cf1d1e0450c0f4")
        }), amisEditorCore.getSchemaTpl('switch', {
          label: i18nRuntime.i18n("dd1b9892e274b16540aeda961437870d"),
          name: 'asyncApi',
          visibleOn: 'data.api',
          labelRemark: {
            trigger: 'click',
            rootClose: true,
            title: i18nRuntime.i18n("e638bd32b4342dfc7a15990a79f588ae"),
            content: i18nRuntime.i18n("6df230c8f18709575777172f0a9a588c"),
            placement: 'left'
          },
          pipeIn: function (value) {
            return value != null;
          },
          pipeOut: function (value) {
            return value ? '' : undefined;
          }
        }), amisEditorCore.getSchemaTpl('api', {
          name: 'asyncApi',
          label: i18nRuntime.i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
          visibleOn: 'data.asyncApi != null',
          description: i18nRuntime.i18n("0705e4aba9f22ae70d906e2201a4a68d")
        }), {
          type: 'divider'
        }, amisEditorCore.getSchemaTpl('loadingConfig', {}, {
          context: context
        })]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [{
          name: 'mode',
          label: i18nRuntime.i18n("1fdadb49bcabfdc36a4a9e020f597f4d"),
          type: 'button-group-select',
          size: 'sm',
          mode: 'inline',
          className: 'w-full',
          value: 'horizontal',
          options: [{
            label: i18nRuntime.i18n("4cde06e6162ed66720e3133cb83bc059"),
            value: 'horizontal'
          }, {
            label: i18nRuntime.i18n("75ac842f8e77305846f1d776f97dfaf8"),
            value: 'vertical'
          }]
        }, amisEditorCore.getSchemaTpl('actionPrevLabel'), amisEditorCore.getSchemaTpl('actionNextLabel'), amisEditorCore.getSchemaTpl('actionNextSaveLabel'), amisEditorCore.getSchemaTpl('actionFinishLabel'),
        // {
        //   type: 'alert',
        //   level: 'info',
        //   body: `温馨提示：操作按钮每个步骤可以单独配置，请在右侧切换到需要单独配置的步骤后，点击下方的【自定义按钮】定制。`
        // },
        amisEditorCore.getSchemaTpl('className'), amisEditorCore.getSchemaTpl('className', {
          name: 'actionClassName',
          label: i18nRuntime.i18n("89d19c1fda4906bd7a336895835ce20e")
        })]
      }, {
        title: i18nRuntime.i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
        body: [amisEditorCore.getSchemaTpl('ref'), amisEditorCore.getSchemaTpl('name'), amisEditorCore.getSchemaTpl('reload'), {
          label: i18nRuntime.i18n("7653297de32f34fdec0dd0653aebf358"),
          name: 'redirect',
          type: 'input-text',
          description: i18nRuntime.i18n("6d00e21637c382cbd4d949b7735a2e41")
        }, amisEditorCore.getSchemaTpl('visible')]
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }])];
    };
    _this.patchContainers = ['steps.body'];
    _this.vRendererConfig = {
      regions: {
        body: {
          key: 'body',
          label: i18nRuntime.i18n("3673ed1983c1be059126e3715fc34922"),
          wrapperResolve: function (dom) {
            return dom;
          }
        },
        actions: {
          label: i18nRuntime.i18n("c8caf94205105bac5833ab31cc2129d7"),
          key: 'actions',
          preferTag: i18nRuntime.i18n("fa966345577ba81af19408f203db968f"),
          wrapperResolve: function (dom) {
            return dom;
          }
        }
      },
      panelTitle: i18nRuntime.i18n("52b36576f88c31ed3971ca4d1fccd46f"),
      panelBodyCreator: function (context) {
        return amisEditorCore.getSchemaTpl('tabs', [{
          title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
          body: [amisEditorCore.getSchemaTpl('title', {
            pipeIn: function (value, data) {
              return value || data.label;
            }
          }), amisEditorCore.getSchemaTpl('api', {
            label: i18nRuntime.i18n("ff7cc75cc43c25c823d05d87cb8190b0"),
            description: i18nRuntime.i18n("1fd41e410930ac58e748f7704c3a05f3")
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("dd1b9892e274b16540aeda961437870d"),
            name: 'asyncApi',
            visibleOn: 'data.api',
            labelRemark: {
              trigger: 'click',
              rootClose: true,
              title: i18nRuntime.i18n("e638bd32b4342dfc7a15990a79f588ae"),
              content: i18nRuntime.i18n("6df230c8f18709575777172f0a9a588c"),
              placement: 'left'
            },
            pipeIn: function (value) {
              return value != null;
            },
            pipeOut: function (value) {
              return value ? '' : undefined;
            }
          }), amisEditorCore.getSchemaTpl('api', {
            name: 'asyncApi',
            label: i18nRuntime.i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
            visibleOn: 'data.asyncApi != null',
            description: i18nRuntime.i18n("0705e4aba9f22ae70d906e2201a4a68d")
          }), {
            type: 'divider'
          }, amisEditorCore.getSchemaTpl('api', {
            name: 'initApi',
            label: i18nRuntime.i18n("b4bc91701b86fe8543d649e97daea602"),
            description: i18nRuntime.i18n("258c437ef67e5ef12f3a766ff1802f85")
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("e8c46074d8432532cac25eba56bca354"),
            name: 'initAsyncApi',
            visibleOn: 'data.initApi',
            labelRemark: {
              trigger: 'click',
              rootClose: true,
              title: i18nRuntime.i18n("e638bd32b4342dfc7a15990a79f588ae"),
              content: i18nRuntime.i18n("6df230c8f18709575777172f0a9a588c"),
              placement: 'left'
            },
            pipeIn: function (value) {
              return value != null;
            },
            pipeOut: function (value) {
              return value ? '' : undefined;
            }
          }), amisEditorCore.getSchemaTpl('api', {
            name: 'initAsyncApi',
            label: i18nRuntime.i18n("daf3aec137ac74941adb1b1d3e3dd1d3"),
            visibleOn: 'data.initAsyncApi != null',
            description: i18nRuntime.i18n("d2af24c0f76cf325f1c8fa939576c379")
          }), amisEditorCore.getSchemaTpl('initFetch')]
        }, {
          title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
          body: [{
            name: 'mode',
            label: i18nRuntime.i18n("1fdadb49bcabfdc36a4a9e020f597f4d"),
            type: 'button-group-select',
            size: 'xs',
            mode: 'inline',
            className: 'w-full',
            value: 'normal',
            options: [{
              label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
              value: 'normal'
            }, {
              label: i18nRuntime.i18n("3720b9ef8053b7b8a54c7d8ace051912"),
              value: 'horizontal'
            }, {
              label: i18nRuntime.i18n("2dd25b8c21efbfee4a198787810d65d8"),
              value: 'inline'
            }]
          }, amisEditorCore.getSchemaTpl('horizontal', {
            visibleOn: 'data.mode == "horizontal"'
          })
          // getSchemaTpl('className', {
          //   name: 'tabClassName',
          //   label: '选项卡成员 CSS 类名'
          // })
          ]
        }, {
          title: i18nRuntime.i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
          body: [{
            label: i18nRuntime.i18n("938b484df1447d8f01f96e45125eb031"),
            type: 'input-text',
            name: 'jumpableOn',
            description: i18nRuntime.i18n("20022725ac2c53869f7af6646ca4ba29")
          }]
        }]);
      }
    };
    _this.wizardWrapperResolve = function (dom) {
      return [].slice.call(dom.querySelectorAll('[role="wizard-body"],[role="wizard-footer"]'));
    };
    _this.overrides = {
      renderWizard: function () {
        var _this = this;
        var info = this.props.$$editor;
        var steps = this.props.steps;
        var currentStep = this.state.currentStep;
        var dom = this.super();
        if (!info || !(steps === null || steps === void 0 ? void 0 : steps[currentStep - 1])) {
          return dom;
        }
        var index = currentStep - 1;
        var step = steps[index];
        var id = step.$$id;
        var plugin = info.plugin;
        return amisEditorCore.mapReactElement(dom, function (child) {
          if (/Wizard-step\b/.test(child.props.className)) {
            return React__default["default"].createElement(amisEditorCore.VRenderer, {
              key: id,
              type: info.type,
              plugin: info.plugin,
              renderer: info.renderer,
              "$schema": "/schemas/WizardStepSchema.json",
              hostId: info.id,
              memberIndex: index,
              name: step.title || i18nRuntime.i18n("52b36576f88c31ed3971ca4d1fccd46f").concat(index + 1),
              id: id,
              draggable: false,
              wrapperResolve: plugin.wizardWrapperResolve,
              schemaPath: "".concat(info.schemaPath, "/steps/").concat(index),
              path: "".concat(_this.props.$path, "/").concat(index),
              data: _this.props.data
            }, amisEditorCore.mapReactElement(child, function (child2, index) {
              var _a, _b, _c;
              if (((_a = child2.props.schema) === null || _a === void 0 ? void 0 : _a.body) && child2.props.schema.$$id) {
                var region = (_c = (_b = plugin.vRendererConfig) === null || _b === void 0 ? void 0 : _b.regions) === null || _c === void 0 ? void 0 : _c.body;
                if (!region) {
                  return child2;
                }
                var schema = tslib.__assign({}, child2.props.schema);
                delete schema.$$id;
                return React__default["default"].createElement(amisEditorCore.RegionWrapper, {
                  key: region.key,
                  preferTag: region.preferTag,
                  name: region.key,
                  label: region.label,
                  regionConfig: region,
                  placeholder: region.placeholder,
                  editorStore: plugin.manager.store,
                  manager: plugin.manager,
                  children: React__default["default"].cloneElement(child2, {
                    schema: schema
                  }),
                  wrapperResolve: region.wrapperResolve,
                  rendererName: info.renderer.name
                });
              }
              return child2;
            }));
          }
          return child;
        });
      },
      renderFooter: function () {
        var _a, _b;
        var info = this.props.$$editor;
        var steps = this.props.steps;
        var currentStep = this.state.currentStep;
        var dom = this.super();
        if (!info || !(steps === null || steps === void 0 ? void 0 : steps[currentStep - 1])) {
          return dom;
        }
        var plugin = info.plugin;
        var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.actions;
        if (!region) {
          return dom;
        }
        return React__default["default"].createElement(amisEditorCore.RegionWrapper, {
          key: region.key,
          preferTag: region.preferTag,
          name: region.key,
          label: region.label,
          regionConfig: region,
          placeholder: region.placeholder,
          editorStore: plugin.manager.store,
          manager: plugin.manager,
          children: dom,
          wrapperResolve: region.wrapperResolve,
          rendererName: info.renderer.name
        });
      }
    };
    return _this;
  }
  /**
   * 补充切换的 toolbar
   * @param context
   * @param toolbars
   */
  WizardPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
    if (context.info.plugin === this && context.info.renderer.name === this.rendererName && !context.info.hostId) {
      var node_1 = context.node;
      toolbars.push({
        level: 'secondary',
        icon: 'fa fa-chevron-left',
        tooltip: i18nRuntime.i18n("22c2aa6b59ab30c88fd84e8e5b3c4ad7"),
        onClick: function () {
          var control = node_1.getComponent();
          if (control === null || control === void 0 ? void 0 : control.gotoStep) {
            var currentIndex = control.state.currentStep;
            control.gotoStep(currentIndex - 1);
          }
        }
      });
      toolbars.push({
        level: 'secondary',
        icon: 'fa fa-chevron-right',
        tooltip: i18nRuntime.i18n("7b91646d808737e7138ad8f32a3b6cde"),
        onClick: function () {
          var control = node_1.getComponent();
          if (control === null || control === void 0 ? void 0 : control.gotoStep) {
            var currentIndex = control.state.currentStep;
            control.gotoStep(currentIndex + 1);
          }
        }
      });
    }
  };
  WizardPlugin.prototype.filterProps = function (props) {
    props.affixFooter = false;
    return props;
  };
  WizardPlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'inited') {
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = tslib.__assign({
        $id: 'wizardInitedData'
      }, amisEditorCore.jsonToJsonSchema(data.responseData));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  WizardPlugin.id = 'WizardPlugin';
  return WizardPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(WizardPlugin);

exports.WizardPlugin = WizardPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
