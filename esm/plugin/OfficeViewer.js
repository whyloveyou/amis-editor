/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var OfficeViewerPlugin = /** @class */function (_super) {
  __extends(OfficeViewerPlugin, _super);
  function OfficeViewerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'office-viewer';
    _this.$schema = '/schemas/OfficeViewerSchema.json';
    // 组件名称
    _this.name = i18n("3212f1de74130815d12d982437fc6919");
    _this.isBaseComponent = true;
    _this.description = i18n("a7199769ae58f8a5c35ac0e5f8804abf");
    _this.docLink = '/amis/zh-CN/components/office-viewer';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-file-word';
    _this.pluginIcon = 'officeViewer-plugin';
    _this.scaffold = {
      type: 'office-viewer'
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("3212f1de74130815d12d982437fc6919");
    _this.panelJustify = true;
    _this.actions = [{
      actionType: 'print',
      actionLabel: i18n("e414473c886072e393710563f201d7f3"),
      description: i18n("6a62d33c838524f0609a624aa59ee9e7")
    }, {
      actionType: 'saveAs',
      actionLabel: i18n("f26ef914245883c80f181c4aade2ed04"),
      description: i18n("fc856cd721f5b5955f8c4be2767a1cee")
    }];
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('officeUrl', {
            name: 'src',
            type: 'input-text',
            label: i18n("270c7dfc38ec1f8eb7b211481d26659a")
          }), getSchemaTpl('switch', {
            type: 'switch',
            label: i18n("2bd4fa4fe6637a09add46354f52ea9dc"),
            name: 'display',
            pipeIn: defaultValue(true),
            inline: true
          })]
        }, {
          title: i18n("010787d733c97c5f7a8f9bda438af9e2"),
          collapsed: true,
          body: [{
            type: 'combo',
            name: 'wordOptions',
            // panelJustify 下需要加这个
            mode: 'normal',
            noBorder: true,
            multiLine: true,
            items: [getSchemaTpl('switch', {
              label: i18n("9a50cbc2f0c7115043a19c3b1db5776b"),
              inline: true,
              name: 'ignoreWidth'
            }), {
              type: 'input-text',
              label: i18n("927ed823f52a6d3bbceed4436636a7dd"),
              name: 'padding'
            }, getSchemaTpl('switch', {
              label: i18n("755ea661684e7bffe9f97fb07b8d4921"),
              pipeIn: defaultValue(true),
              name: 'bulletUseFont',
              inline: true
            }), getSchemaTpl('switch', {
              label: i18n("9b87dc5a019f749722a1d3a9c854a2b9"),
              name: 'enableVar',
              inline: true
            }), {
              type: 'input-text',
              label: i18n("c6adeba660df8e19ac6cd3b8c57416ad"),
              name: 'forceLineHeight'
            }, {
              type: 'input-kv',
              label: i18n("b93ea0046d63e2df7cf24a7a63bf5c99"),
              name: 'fontMapping'
            }, getSchemaTpl('switch', {
              label: i18n("f6e9b56f97af64235bf81f4ddc2288ab"),
              name: 'page',
              inline: true
            }), {
              type: 'input-number',
              label: i18n("4c71a09da7ce050d45514b68bb15b4ab"),
              name: 'pageMarginBottom',
              visibleOn: 'data.page'
            }, {
              type: 'input-color',
              label: i18n("3651c159e19c05a3bdaa7036dac91e4e"),
              pipeIn: defaultValue('#FFFFFF'),
              name: 'pageBackground',
              visibleOn: 'data.page'
            }, getSchemaTpl('switch', {
              label: i18n("91bc444339545a7785f3aa3055d9ba05"),
              name: 'pageShadow',
              inline: true,
              visibleOn: 'data.page'
            }), getSchemaTpl('switch', {
              label: i18n("c856051e8c80913ff6607dc880341a20"),
              name: 'pageWrap',
              inline: true,
              visibleOn: 'data.page'
            }), {
              type: 'input-number',
              label: i18n("6a6772a0eae27591ed8763b6e616e988"),
              name: 'pageWrapPadding',
              visibleOn: 'data.page'
            }, {
              type: 'input-color',
              label: i18n("22bca073daae505d7fc9e7d7c8ee047c"),
              pipeIn: defaultValue('#ECECEC'),
              name: 'pageWrapBackground',
              visibleOn: 'data.page'
            }, {
              type: 'input-number',
              label: i18n("2839785a190e062058635add192f961d"),
              min: 0.1,
              max: 1,
              name: 'zoom',
              visibleOn: 'data.page'
            }, getSchemaTpl('switch', {
              label: i18n("9723e66141840db4dc6bd1db9b165302"),
              name: 'zoomFitWidth',
              inline: true,
              visibleOn: 'data.page'
            })]
          }]
        }])]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }])];
    };
    return _this;
  }
  OfficeViewerPlugin.id = 'OfficeViewerPlugin';
  OfficeViewerPlugin.scene = ['layout'];
  return OfficeViewerPlugin;
}(BasePlugin);
registerEditorPlugin(OfficeViewerPlugin);

export { OfficeViewerPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
