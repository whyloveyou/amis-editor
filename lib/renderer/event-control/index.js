/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var reactDom = require('react-dom');
var cx = require('classnames');
var Sortable = require('sortablejs');
var amis = require('amis');
var cloneDeep = require('lodash/cloneDeep');
var amisCore = require('amis-core');
var actionConfigDialog = require('./action-config-dialog.js');
var helper = require('./helper.js');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');
var mobx = require('mobx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

var dialogObjMap = {
  dialog: 'dialog',
  drawer: 'drawer',
  confirmDialog: ['dialog', 'args']
};
var EventControl = /** @class */function (_super) {
  tslib.__extends(EventControl, _super);
  function EventControl(props) {
    var _this = _super.call(this, props) || this;
    _this.eventPanelSortMap = {};
    var events = props.events,
      value = props.value,
      data = props.data;
    var eventPanelActive = {};
    var pluginEvents = events[!data.type || data.type === 'text' ? 'plain' : data.type] || [];
    pluginEvents.forEach(function (event) {
      eventPanelActive[event.eventName] = true;
    });
    _this.state = {
      onEvent: value !== null && value !== void 0 ? value : _this.generateEmptyDefault(pluginEvents),
      events: pluginEvents,
      eventPanelActive: eventPanelActive,
      showAcionDialog: false,
      showEventDialog: false,
      actionData: undefined,
      type: 'add',
      appLocaleState: 0
    };
    return _this;
  }
  EventControl.prototype.componentDidMount = function () {
    var _this = this;
    var editorStore = window.editorStore;
    this.unReaction = mobx.reaction(function () {
      return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState;
    }, function () {
      _this.setState({
        appLocaleState: editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState
      });
    });
  };
  EventControl.prototype.componentWillUnmount = function () {
    var _a;
    (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
  };
  EventControl.prototype.componentDidUpdate = function (prevProps, prevState) {
    var value = this.props.value;
    if (value !== prevProps.value) {
      this.setState({
        onEvent: value
      });
    }
  };
  EventControl.prototype.generateEmptyDefault = function (events) {
    var onEvent = {};
    events.forEach(function (event) {
      if (event.defaultShow) {
        onEvent["".concat(event.eventName)] = {
          __isBroadcast: !!event.isBroadcast,
          weight: 0,
          actions: []
        };
      }
    });
    // Object.keys(onEvent).length && props.onChange && props.onChange(onEvent);
    return Object.keys(onEvent).length ? onEvent : {};
  };
  EventControl.prototype.addEvent = function (event, disabled) {
    var onChange = this.props.onChange;
    var onEvent = tslib.__assign({}, this.state.onEvent);
    if (disabled) {
      return;
    }
    onEvent["".concat(event.eventName)] = {
      __isBroadcast: !!event.isBroadcast,
      weight: 0,
      actions: []
    };
    this.setState({
      onEvent: onEvent
    });
    onChange && onChange(onEvent);
  };
  EventControl.prototype.activeEventDialog = function (eventInfo) {
    eventInfo = cloneDeep__default["default"](eventInfo);
    if (!eventInfo.debounce) {
      // 防抖配置的默认值
      eventInfo.debounce = {
        open: false,
        wait: 100
      };
    } else {
      eventInfo.debounce = tslib.__assign({
        open: true
      }, eventInfo.debounce);
    }
    this.setState({
      eventDialogData: eventInfo,
      showEventDialog: true
    });
  };
  EventControl.prototype.eventDialogSubmit = function (formData) {
    var onChange = this.props.onChange;
    var eventName = formData.eventName,
      _a = formData.debounce,
      debounce = _a === void 0 ? {} : _a;
    var onEvent = tslib.__assign({}, this.state.onEvent);
    var eventConfig = onEvent["".concat(eventName)];
    if (!debounce.open) {
      delete eventConfig.debounce;
    } else {
      eventConfig = tslib.__assign(tslib.__assign({}, eventConfig), {
        debounce: {
          wait: debounce.wait
        }
      });
    }
    onEvent["".concat(eventName)] = tslib.__assign({}, eventConfig);
    this.setState({
      onEvent: onEvent,
      showEventDialog: false
    });
    onChange && onChange(onEvent);
  };
  EventControl.prototype.delEvent = function (event) {
    var onChange = this.props.onChange;
    var onEvent = tslib.__assign({}, this.state.onEvent);
    delete onEvent[event];
    this.setState({
      onEvent: onEvent
    });
    onChange && onChange(onEvent);
  };
  EventControl.prototype.addAction = function (event, config) {
    var _a = this.props,
      addBroadcast = _a.addBroadcast,
      owner = _a.owner;
    var _b = this.state,
      onEvent = _b.onEvent,
      eventPanelActive = _b.eventPanelActive;
    var onEventConfig = tslib.__assign({}, onEvent);
    var activeConfig = tslib.__assign({}, eventPanelActive);
    if (config.actionType === 'broadcast') {
      typeof addBroadcast === 'function' && addBroadcast({
        owner: owner,
        isBroadcast: true,
        eventName: config.eventName,
        eventLabel: config.eventLabel,
        description: config.description
      });
    }
    activeConfig[event] = true;
    if (config.actionType) {
      onEventConfig[event] = tslib.__assign(tslib.__assign({}, onEventConfig[event]), {
        actions: onEventConfig[event].actions.concat(config)
      });
    }
    this.setState({
      onEvent: onEventConfig,
      eventPanelActive: activeConfig
    });
    this.initDragging();
    this.props.onChange && this.props.onChange(onEventConfig);
  };
  EventControl.prototype.updateAction = function (event, index, config) {
    this.updateValue(event, index, config);
  };
  EventControl.prototype.delAction = function (event, action, index) {
    var _a;
    var _b = this.state,
      onEvent = _b.onEvent,
      eventPanelActive = _b.eventPanelActive;
    var removeBroadcast = this.props.removeBroadcast;
    var onEventConfig = tslib.__assign({}, onEvent);
    var activeConfig = tslib.__assign({}, eventPanelActive);
    // 删掉对应广播
    if (action.actionType === 'broadcast') {
      typeof removeBroadcast === 'function' && removeBroadcast(action.eventName);
    }
    onEventConfig[event] = {
      actions: onEventConfig[event].actions.filter(function (item, actionIndex) {
        return index !== actionIndex;
      }),
      weight: onEvent[event].weight
    };
    if (onEventConfig[event].actions.length < 1) {
      activeConfig[event] = false;
      this.setState({
        eventPanelActive: activeConfig
      });
      (_a = this.eventPanelSortMap[event]) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    this.setState({
      onEvent: onEventConfig
    });
    this.props.onChange && this.props.onChange(onEventConfig);
  };
  EventControl.prototype.toggleActivePanel = function (eventKey) {
    var _this = this;
    var _a;
    var eventPanelActive = this.state.eventPanelActive;
    eventPanelActive[eventKey] = !eventPanelActive[eventKey];
    if (!eventPanelActive[eventKey]) {
      (_a = this.eventPanelSortMap[eventKey]) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    this.setState({
      eventPanelActive: eventPanelActive
    }, function () {
      _this.initDragging();
    });
  };
  EventControl.prototype.updateWeight = function (event, data) {
    var onEvent = this.state.onEvent;
    var onEventConfig = tslib.__assign({}, onEvent);
    onEventConfig[event] = tslib.__assign(tslib.__assign({}, onEventConfig[event]), {
      weight: data.weight || 0
    });
    this.setState({
      onEvent: onEventConfig
    });
  };
  /**
   * 更新事件配置
   *
   * @param {string} event
   * @param {number} actionIndex
   * @param {*} config
   * @memberof EventControl
   */
  EventControl.prototype.updateValue = function (event, index, config) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var onEvent, emptyEventAcion, onEventConfig;
      return tslib.__generator(this, function (_a) {
        onEvent = this.state.onEvent;
        emptyEventAcion = tslib.__assign({}, onEvent);
        onEventConfig = tslib.__assign({}, onEvent);
        emptyEventAcion[event] = {
          actions: onEvent[event].actions.map(function (item, actionIndex) {
            return actionIndex === index ? {
              actionType: ''
            } : item;
          }),
          weight: onEvent[event].weight
        };
        onEventConfig[event] = tslib.__assign(tslib.__assign({}, onEvent[event]), {
          actions: onEvent[event].actions.map(function (item, actionIndex) {
            return actionIndex === index ? typeof config === 'string' ? tslib.__assign(tslib.__assign({}, item), {
              actionType: config
            }) : config : item;
          })
        });
        this.setState({
          onEvent: onEventConfig
        });
        this.props.onChange && this.props.onChange(onEventConfig);
        return [2 /*return*/];
      });
    });
  };

  EventControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  EventControl.prototype.initDragging = function () {
    var _this = this;
    this.eventPanelSortMap = {};
    var dom = reactDom.findDOMNode(this);
    var _a = this.state,
      onEvent = _a.onEvent,
      eventPanelActive = _a.eventPanelActive;
    var eventPanel = Array.prototype.slice.call(dom.getElementsByClassName('item-content'));
    // 找到激活的事件面板
    Object.keys(onEvent).filter(function (key) {
      var _a, _b;
      return ((_b = (_a = onEvent[key]) === null || _a === void 0 ? void 0 : _a.actions) === null || _b === void 0 ? void 0 : _b.length) && eventPanelActive[key];
    }).forEach(function (key, index) {
      if (!_this.eventPanelSortMap[key]) {
        _this.eventPanelSortMap[key] = _this.genSortPanel(key, eventPanel[index]);
      }
    });
  };
  EventControl.prototype.genSortPanel = function (eventKey, ele) {
    var _this = this;
    return new Sortable__default["default"](ele, {
      group: 'eventControlGroup',
      animation: 150,
      handle: '.ae-option-control-item-dragBar',
      ghostClass: 'ae-option-control-item--dragging',
      onEnd: function (e) {
        // 没有移动
        if (e.newIndex === e.oldIndex) {
          return;
        }
        // 换回来
        var parent = e.to;
        if (e.newIndex < e.oldIndex && e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
        } else if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        var onEventConfig = cloneDeep__default["default"](_this.state.onEvent);
        var newEvent = onEventConfig[eventKey];
        var options = newEvent === null || newEvent === void 0 ? void 0 : newEvent.actions.concat();
        // 从后往前移
        if (e.oldIndex > e.newIndex) {
          options = tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(options.slice(0, e.newIndex)), false), [options[e.oldIndex]], false), tslib.__read(options.slice(e.newIndex, e.oldIndex)), false), tslib.__read(options.slice(e.oldIndex + 1, options.length)), false);
        } else if (e.oldIndex < e.newIndex) {
          // 从前往后
          options = tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(e.oldIndex === 0 ? [] : options.slice(0, e.oldIndex)), false), tslib.__read(options.slice(e.oldIndex + 1, e.newIndex)), false), [options[e.oldIndex]], false), tslib.__read(options.slice(e.newIndex, options.length)), false);
        }
        onEventConfig[eventKey] = tslib.__assign(tslib.__assign({}, onEventConfig[eventKey]), {
          actions: options
        });
        _this.setState({
          onEvent: onEventConfig
        });
        _this.props.onChange && _this.props.onChange(onEventConfig);
      }
    });
  };
  EventControl.prototype.destroyDragging = function () {
    var _this = this;
    Object.keys(this.eventPanelSortMap).forEach(function (key) {
      var _a, _b;
      ((_a = _this.eventPanelSortMap[key]) === null || _a === void 0 ? void 0 : _a.el) && ((_b = _this.eventPanelSortMap[key]) === null || _b === void 0 ? void 0 : _b.destroy());
    });
  };
  EventControl.prototype.buildEventDataSchema = function (data, manager) {
    var _a, _b, _c;
    var _d = this.props,
      actionTree = _d.actionTree,
      pluginActions = _d.actions,
      commonActions = _d.commonActions,
      allComponents = _d.allComponents;
    var _e = this.state,
      events = _e.events,
      onEvent = _e.onEvent;
    var eventConfig = events.find(function (item) {
      return item.eventName === data.actionData.eventKey;
    });
    // 收集当前事件动作出参
    var actions = onEvent[data.actionData.eventKey].actions;
    // 编辑的时候只能拿到当前动作前面动作的事件变量以及当前动作事件
    if (data.type === 'update') {
      actions = actions.slice(0, data.actionData.actionIndex !== undefined ? data.actionData.actionIndex + 1 : 0);
    }
    var jsonSchema = tslib.__assign({}, (_b = (_a = eventConfig === null || eventConfig === void 0 ? void 0 : eventConfig.dataSchema) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : {});
    (_c = actions === null || actions === void 0 ? void 0 : actions.filter(function (item) {
      return item.outputVar;
    })) === null || _c === void 0 ? void 0 : _c.forEach(function (action, index) {
      var _a;
      var _b, _c, _d;
      if (manager.dataSchema.getScope("action-output-".concat(action.actionType, "_ ").concat(index))) {
        return;
      }
      var actionLabel = helper.getPropOfAcion(action, 'actionLabel', actionTree, pluginActions, commonActions, allComponents);
      var actionSchema = helper.getPropOfAcion(action, 'outputVarDataSchema', actionTree, pluginActions, commonActions, allComponents);
      // const schema: any = {
      //   type: 'object',
      //   $id: 'outputVar',
      //   properties: {
      //     [action.outputVar!]: {
      //       ...actionSchema[0],
      //       title: `${action.outputVar}(${actionLabel})`
      //     }
      //   }
      // };
      jsonSchema = tslib.__assign(tslib.__assign({}, jsonSchema), {
        properties: tslib.__assign(tslib.__assign({}, jsonSchema.properties), {
          data: tslib.__assign(tslib.__assign({
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3")
          }, (_b = jsonSchema.properties) === null || _b === void 0 ? void 0 : _b.data), {
            properties: tslib.__assign(tslib.__assign({}, (_d = (_c = jsonSchema.properties) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.properties), (_a = {}, _a[action.outputVar] = tslib.__assign(tslib.__assign({}, Array.isArray(actionSchema) && (actionSchema[0] || {})), {
              title: "".concat(action.outputVar, "(").concat(actionLabel, "\u52A8\u4F5C\u51FA\u53C2)")
            }), _a))
          })
        })
      });
      // manager.dataSchema.addScope(
      //   schema,
      //   `action-output-${action.actionType}_${index}`
      // );
      // manager.dataSchema.current.group = '动作出参';
    });

    if (manager.dataSchema.getScope('event-variable')) {
      manager.dataSchema.removeScope('event-variable');
    }
    manager.dataSchema.addScope({
      type: 'object',
      properties: {
        event: tslib.__assign(tslib.__assign({}, jsonSchema), {
          title: i18nRuntime.i18n("d5fb02425d3b8586d8d7b98971d63e68")
        })
      }
    }, 'event-variable');
  };
  // buildActionDataSchema(
  //   activeData: Pick<
  //     EventControlState,
  //     'showAcionDialog' | 'type' | 'actionData'
  //   >,
  //   manager: EditorManager
  // ) {
  //   const {actionTree, pluginActions, commonActions, allComponents} =
  //     this.props;
  //   const {onEvent} = this.state;
  //   // 收集当前事件已有ajax动作的请求返回结果作为事件变量
  //   let oldActions = onEvent[activeData.actionData!.eventKey].actions;
  //   // 编辑的时候只能拿到当前动作前面动作的事件变量
  //   if (activeData.type === 'update') {
  //     oldActions = oldActions.slice(0, activeData.actionData!.actionIndex);
  //   }
  //   oldActions
  //     ?.filter(item => item.outputVar)
  //     ?.forEach((action: ActionConfig, index: number) => {
  //       if (
  //         manager.dataSchema.getScope(
  //           `action-output-${action.actionType}_ ${index}`
  //         )
  //       ) {
  //         return;
  //       }
  //       const actionLabel = getPropOfAcion(
  //         action,
  //         'actionLabel',
  //         actionTree,
  //         pluginActions,
  //         commonActions,
  //         allComponents
  //       );
  //       const actionSchema = getPropOfAcion(
  //         action,
  //         'outputVarDataSchema',
  //         actionTree,
  //         pluginActions,
  //         commonActions,
  //         allComponents
  //       );
  //       const schema: any = {
  //         type: 'object',
  //         properties: {
  //           [`event.data.${action.outputVar}`]: {
  //             ...actionSchema[0],
  //             title: `${action.outputVar}(${actionLabel})`
  //           }
  //         }
  //       };
  //       manager.dataSchema.addScope(
  //         schema,
  //         `action-output-${action.actionType}_${index}`
  //       );
  //       manager.dataSchema.current.group = '动作出参';
  //     });
  // }
  EventControl.prototype.buildContextSchema = function (data) {
    var _a;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var _b, manager, currentNode, variables, appVariables;
      return tslib.__generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = this.props, manager = _b.manager, currentNode = _b.node;
            variables = [];
            // 获取上下文
            return [4 /*yield*/, manager.getContextSchemas(currentNode.id)];
          case 1:
            // 获取上下文
            _c.sent();
            // 追加事件相关
            // this.buildActionDataSchema(data, manager);
            this.buildEventDataSchema(data, manager);
            manager.dataSchema.switchTo('event-variable');
            variables = manager.dataSchema.getDataPropsAsOptions();
            appVariables = ((_a = manager === null || manager === void 0 ? void 0 : manager.variableManager) === null || _a === void 0 ? void 0 : _a.getVariableFormulaOptions()) || [];
            appVariables.forEach(function (item) {
              if (Array.isArray(item === null || item === void 0 ? void 0 : item.children) && item.children.length) {
                variables.push(item);
              }
            });
            return [2 /*return*/, amisEditorCore.updateComponentContext(variables)];
        }
      });
    });
  };
  // 获取现有弹窗列表
  EventControl.prototype.getDialogList = function (manager, action, actionType) {
    var _a;
    if (action && actionType && dialogObjMap[actionType] && !((_a = action === null || action === void 0 ? void 0 : action.args) === null || _a === void 0 ? void 0 : _a.fromCurrentDialog)) {
      var dialogBodyContent = dialogObjMap[actionType];
      var filterId = Array.isArray(dialogBodyContent) ? action[dialogBodyContent[0]].id || action[dialogBodyContent[1]].id : action[dialogBodyContent].id;
      return amisEditorCore.getDialogActions(manager.store.schema, 'source', filterId);
    } else return amisEditorCore.getDialogActions(manager.store.schema, 'source');
  };
  // 唤起动作配置弹窗
  EventControl.prototype.activeActionDialog = function (data) {
    var _a, _b, _c, _d;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var _e, pluginActions, getContextSchemas, actionConfigInitFormatter, getComponents, actionTree, allComponents, manager, variables, action_1, actionConfig, actionNode, hasSubActionNode, supportComponents, node, setValueDs, contextSchema, dataSchema, targetVariables, actionGroupType, definitions, dialogBody, dialogObj, dialogRef;
      return tslib.__generator(this, function (_f) {
        switch (_f.label) {
          case 0:
            _e = this.props, pluginActions = _e.actions, getContextSchemas = _e.getContextSchemas, actionConfigInitFormatter = _e.actionConfigInitFormatter, getComponents = _e.getComponents, actionTree = _e.actionTree, allComponents = _e.allComponents, manager = _e.manager, _e.node;
            return [4 /*yield*/, this.buildContextSchema(data)];
          case 1:
            variables = _f.sent();
            if (!(data.type === 'update')) return [3 /*break*/, 5];
            action_1 = data.actionData.action;
            return [4 /*yield*/, actionConfigInitFormatter === null || actionConfigInitFormatter === void 0 ? void 0 : actionConfigInitFormatter(action_1)];
          case 2:
            actionConfig = _f.sent();
            actionNode = helper.findActionNode(actionTree, actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType);
            hasSubActionNode = helper.findSubActionNode(actionTree, action_1.actionType);
            supportComponents = getComponents(actionNode);
            node = amisCore.findTree(supportComponents, function (item) {
              return item.value === action_1.componentId;
            });
            setValueDs = null;
            if (!((actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType) === 'setValue' && (node === null || node === void 0 ? void 0 : node.id) && helper.SELECT_PROPS_CONTAINER.includes((node === null || node === void 0 ? void 0 : node.type) || ''))) return [3 /*break*/, 4];
            return [4 /*yield*/, manager.getContextSchemas(node.id, true)];
          case 3:
            contextSchema = _f.sent();
            dataSchema = new amis.DataSchema(contextSchema || []);
            targetVariables = (dataSchema === null || dataSchema === void 0 ? void 0 : dataSchema.getDataPropsAsOptions()) || [];
            setValueDs = targetVariables === null || targetVariables === void 0 ? void 0 : targetVariables.filter(function (item) {
              return item.value !== '$$id';
            });
            _f.label = 4;
          case 4:
            actionGroupType = (actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.__actionType) || action_1.actionType;
            data.actionData = tslib.__assign(tslib.__assign({
              eventKey: data.actionData.eventKey,
              actionIndex: data.actionData.actionIndex,
              variables: variables,
              pluginActions: pluginActions,
              getContextSchemas: getContextSchemas
            }, actionConfig), {
              groupType: actionGroupType,
              __actionDesc: (_a = actionNode === null || actionNode === void 0 ? void 0 : actionNode.description) !== null && _a !== void 0 ? _a : '',
              __actionSchema: actionNode.schema,
              __subActions: hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actions,
              __cmptTreeSource: supportComponents !== null && supportComponents !== void 0 ? supportComponents : [],
              __dialogActions: this.getDialogList(manager, action_1, actionGroupType),
              __superCmptTreeSource: allComponents,
              // __supersCmptTreeSource: '',
              __setValueDs: setValueDs
            });
            // 编辑时准备已选的弹窗来源和标题
            if ((actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig.actionType) == 'openDialog') {
              definitions = manager.store.schema.definitions;
              dialogBody = dialogObjMap[actionGroupType];
              dialogObj = Array.isArray(dialogBody) ? dialogBody[0] || dialogBody[1] : dialogBody;
              dialogRef = (_b = actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig[dialogObj]) === null || _b === void 0 ? void 0 : _b.$ref;
              if (dialogRef) {
                data.actionData.__dialogTitle = definitions[dialogRef].title;
              } else {
                data.actionData.__dialogTitle = (_c = actionConfig === null || actionConfig === void 0 ? void 0 : actionConfig[dialogObj]) === null || _c === void 0 ? void 0 : _c.title;
              }
              if ((_d = actionConfig.args) === null || _d === void 0 ? void 0 : _d.fromCurrentDialog) {
                data.actionData.__dialogSource = 'current';
                data.actionData.__selectDialog = definitions[dialogRef].$$id;
              } else {
                data.actionData.__dialogSource = 'new';
              }
            }
            // 选中项自动滚动至可见位置
            setTimeout(function () {
              var _a;
              return (_a = document.querySelector('.action-tree li .is-checked')) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
            }, 0);
            return [3 /*break*/, 6];
          case 5:
            data.actionData = {
              eventKey: data.actionData.eventKey,
              variables: variables,
              pluginActions: pluginActions,
              getContextSchemas: getContextSchemas,
              __superCmptTreeSource: allComponents,
              __dialogActions: this.getDialogList(manager)
            };
            _f.label = 6;
          case 6:
            this.setState(data);
            return [2 /*return*/];
        }
      });
    });
  };
  // 渲染描述信息
  EventControl.prototype.renderDesc = function (action) {
    var _a = this.props,
      pluginActions = _a.actions,
      actionTree = _a.actionTree,
      commonActions = _a.commonActions,
      getComponents = _a.getComponents,
      allComponents = _a.allComponents;
    var desc = helper.getPropOfAcion(action, 'descDetail', actionTree, pluginActions, commonActions, allComponents);
    var info = tslib.__assign({}, action);
    // 根据子动作类型获取动作树节点的配置
    var hasSubActionNode = helper.findSubActionNode(actionTree, action.actionType);
    var actionType = helper.getActionType(action, hasSubActionNode);
    var actionNode = actionType && helper.findActionNode(actionTree, actionType);
    if (action.componentId && actionNode) {
      var supportComponents = getComponents(actionNode);
      var node = amisCore.findTree(supportComponents, function (item) {
        return item.value === action.componentId;
      });
      if (node) {
        info = tslib.__assign(tslib.__assign({}, info), {
          rendererLabel: node.label
        });
      }
    }
    return typeof desc === 'function' ? React__default["default"].createElement("div", {
      className: "action-control-content"
    }, (desc === null || desc === void 0 ? void 0 : desc(info)) || '-') : null;
  };
  EventControl.prototype.getRefsFromCurrentDialog = function (store, action) {
    var definitions = store.schema.definitions;
    var dialogMaxIndex = 0;
    var dialogRefsName = '';
    if (definitions) {
      Object.keys(definitions).forEach(function (k) {
        var dialog = definitions[k];
        if (dialog.$$id === action.__selectDialog) {
          dialogRefsName = k;
        }
        if (k.includes('ref-')) {
          var index = Number(k.split('-')[2]);
          dialogMaxIndex = Math.max(dialogMaxIndex, index);
        }
      });
    }
    var dialogType = amisEditorCore.getFixDialogType(store.schema, action.__selectDialog);
    if (!dialogRefsName) {
      dialogRefsName = dialogMaxIndex ? "".concat(dialogType, "-ref-").concat(dialogMaxIndex + 1) : "".concat(dialogType, "-ref-1");
    }
    return dialogRefsName;
  };
  EventControl.prototype.onSubmit = function (type, config) {
    var _a, _b, _c, _d, _e;
    var _f = this.props,
      actionConfigSubmitFormatter = _f.actionConfigSubmitFormatter,
      manager = _f.manager;
    var actionData = this.state.actionData;
    var store = manager.store;
    var action = (_a = actionConfigSubmitFormatter === null || actionConfigSubmitFormatter === void 0 ? void 0 : actionConfigSubmitFormatter(config, type, actionData, store.schema)) !== null && _a !== void 0 ? _a : config;
    delete action.__actionSchema;
    if (type === 'add') {
      if (['dialog', 'drawer', 'confirmDialog'].includes(action.actionType)) {
        var args = action.actionType === 'dialog' ? 'dialog' : action.actionType === 'drawer' ? 'drawer' : 'dialog';
        if (!(config === null || config === void 0 ? void 0 : config.__dialogSource) || (config === null || config === void 0 ? void 0 : config.__dialogSource) === 'new') {
          var actionLength = this.state.onEvent[config.eventKey].actions.length;
          var path = "".concat(store.getSchemaPath(store.activeId), "/onEvent/").concat(config.eventKey, "/actions/").concat(actionLength, "/").concat(args);
          store.setActiveDialogPath(path);
        } else if ((config === null || config === void 0 ? void 0 : config.__dialogSource) === 'current') {
          var dialogRefsName = this.getRefsFromCurrentDialog(store, action);
          var path = "definitions/".concat(dialogRefsName);
          store.setActiveDialogPath(path);
        }
        (_b = this.addAction) === null || _b === void 0 ? void 0 : _b.call(this, config.eventKey, action);
      } else {
        (_c = this.addAction) === null || _c === void 0 ? void 0 : _c.call(this, config.eventKey, action);
      }
    } else if (type === 'update') {
      if (['dialog', 'drawer', 'confirmDialog'].includes(action.actionType)) {
        var args = action.actionType === 'dialog' ? 'dialog' : action.actionType === 'drawer' ? 'drawer' : 'dialog';
        if (config.__dialogSource === 'new') {
          var path = "".concat(store.getSchemaPath(store.activeId), "/onEvent/").concat(config.eventKey, "/actions/").concat(config.actionIndex, "/").concat(args);
          store.setActiveDialogPath(path);
        } else if (config.__dialogSource === 'current') {
          var dialogRefsName = this.getRefsFromCurrentDialog(store, action);
          var path = "definitions/".concat(dialogRefsName);
          store.setActiveDialogPath(path);
        }
        (_d = this.updateAction) === null || _d === void 0 ? void 0 : _d.call(this, config.eventKey, config.actionIndex, action);
      } else {
        (_e = this.updateAction) === null || _e === void 0 ? void 0 : _e.call(this, config.eventKey, config.actionIndex, action);
      }
    }
    this.removeDataSchema();
    this.setState({
      showAcionDialog: false
    });
    this.setState({
      actionData: undefined
    });
  };
  EventControl.prototype.onClose = function () {
    this.removeDataSchema();
    this.setState({
      showAcionDialog: false
    });
  };
  EventControl.prototype.removeDataSchema = function () {
    var manager = this.props.manager;
    // 删除事件
    if (manager.dataSchema.getScope('event-variable')) {
      manager.dataSchema.removeScope('event-variable');
    }
    // // 删除动作出参
    // Object.keys(manager.dataSchema.idMap)
    //   .filter(key => /^action-output/.test(key))
    //   .map(key => {
    //     if (manager.dataSchema.getScope(key)) {
    //       manager.dataSchema.removeScope(key);
    //     }
    //   });
  };

  EventControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      actionTree = _a.actionTree,
      pluginActions = _a.actions,
      commonActions = _a.commonActions,
      getComponents = _a.getComponents,
      allComponents = _a.allComponents,
      render = _a.render;
    var _b = this.state,
      onEvent = _b.onEvent,
      events = _b.events,
      eventPanelActive = _b.eventPanelActive,
      showAcionDialog = _b.showAcionDialog,
      showEventDialog = _b.showEventDialog,
      type = _b.type,
      actionData = _b.actionData,
      eventDialogData = _b.eventDialogData;
    var eventSnapshot = tslib.__assign({}, onEvent);
    var showOldEntry = this.props.showOldEntry;
    var eventKeys = Object.keys(eventSnapshot);
    return React__default["default"].createElement("div", {
      className: "ae-event-control"
    }, React__default["default"].createElement("header", {
      className: cx__default["default"]({
        'ae-event-control-header': true,
        'ae-event-control-header-oldentry': showOldEntry,
        'no-bd-btm': !eventKeys.length
      })
    }, render('dropdown', {
      type: 'dropdown-button',
      level: 'enhance',
      label: i18nRuntime.i18n("1fab2b4934161e87a1f0133b9d5bc1b5"),
      disabled: false,
      className: 'block w-full add-event-dropdown',
      closeOnClick: true,
      buttons: events.map(function (item) {
        return {
          type: 'button',
          disabledTip: i18nRuntime.i18n("3371427f1b82095309092ef82418ec1a"),
          tooltipPlacement: 'left',
          disabled: Object.keys(onEvent).includes(item.eventName),
          actionType: '',
          label: item.eventLabel,
          onClick: _this.addEvent.bind(_this, item, Object.keys(onEvent).includes(item.eventName))
        };
      })
    }, {
      popOverContainer: null // amis 渲染挂载节点会使用 this.target
    })), React__default["default"].createElement("ul", {
      className: cx__default["default"]({
        'ae-event-control-content': true,
        'ae-event-control-content-oldentry': showOldEntry
      }),
      ref: this.dragRef
    }, eventKeys.length ? eventKeys.map(function (eventKey, eventIndex) {
      var _a, _b, _c, _d, _e, _f;
      return React__default["default"].createElement("li", {
        className: "event-item",
        key: "content_".concat(eventIndex)
      }, React__default["default"].createElement("div", {
        className: cx__default["default"]({
          'event-item-header': true,
          'no-bd-btm': !(((_b = (_a = eventSnapshot[eventKey]) === null || _a === void 0 ? void 0 : _a.actions) === null || _b === void 0 ? void 0 : _b.length) && eventPanelActive[eventKey]) && !helper.getEventStrongDesc(events, eventKey)
        })
      }, React__default["default"].createElement(amis.TooltipWrapper, {
        tooltipClassName: "event-item-header-tip",
        trigger: "hover",
        placement: "top",
        tooltip: {
          children: function () {
            return React__default["default"].createElement("div", null, helper.getEventDesc(events, eventKey) || helper.getEventStrongDesc(events, eventKey) || eventKey);
          }
        }
      }, React__default["default"].createElement("div", null, helper.getEventLabel(events, eventKey) || eventKey)), React__default["default"].createElement("div", {
        className: "event-item-header-toolbar"
      }, React__default["default"].createElement("div", {
        onClick: _this.activeActionDialog.bind(_this, {
          showAcionDialog: true,
          type: 'add',
          actionData: {
            eventKey: eventKey
          }
        })
      }, React__default["default"].createElement(amis.Icon, {
        className: "icon",
        icon: "add-btn"
      })), React__default["default"].createElement("div", {
        onClick: _this.delEvent.bind(_this, eventKey)
      }, React__default["default"].createElement(amis.Icon, {
        className: "icon",
        icon: "delete-bold-btn"
      })), React__default["default"].createElement("div", {
        onClick: _this.activeEventDialog.bind(_this, tslib.__assign({
          eventName: eventKey,
          eventLabel: helper.getEventLabel(events, eventKey) || eventKey
        }, eventSnapshot[eventKey]))
      }, React__default["default"].createElement(amis.Icon, {
        className: "icon",
        icon: "event-setting"
      })), React__default["default"].createElement("div", {
        onClick: _this.toggleActivePanel.bind(_this, eventKey)
      }, eventPanelActive[eventKey] ? React__default["default"].createElement(amis.Icon, {
        className: "icon",
        icon: "open-btn-r"
      }) : React__default["default"].createElement(amis.Icon, {
        className: "icon",
        icon: "close-btn"
      })))), helper.getEventStrongDesc(events, eventKey) ? render('alert', {
        type: 'alert',
        body: i18nRuntime.i18n("0e9525b2bb1493c567c114dd61b69095") + helper.getEventStrongDesc(events, eventKey),
        level: 'info',
        showCloseButton: true,
        showIcon: true,
        className: 'event-item-desc'
      }) : null, ((_d = (_c = eventSnapshot[eventKey]) === null || _c === void 0 ? void 0 : _c.actions) === null || _d === void 0 ? void 0 : _d.length) && eventPanelActive[eventKey] ? React__default["default"].createElement("ul", {
        className: "item-content"
      }, (_f = (_e = eventSnapshot[eventKey]) === null || _e === void 0 ? void 0 : _e.actions) === null || _f === void 0 ? void 0 : _f.map(function (action, actionIndex) {
        return React__default["default"].createElement("li", {
          className: "ae-option-control-item",
          key: "item-content_".concat(actionIndex)
        }, React__default["default"].createElement("div", {
          className: "action-control-header"
        }, React__default["default"].createElement("div", {
          className: "action-control-header-left"
        }, React__default["default"].createElement("div", {
          className: "ae-option-control-item-dragBar"
        }, React__default["default"].createElement(amis.Icon, {
          icon: "drag-six-circle-btn",
          className: "icon"
        })), React__default["default"].createElement("div", {
          className: "action-item-actiontype"
        }, helper.getPropOfAcion(action, 'actionLabel', actionTree, pluginActions, commonActions, allComponents) || action.actionType)), React__default["default"].createElement("div", {
          className: "action-control-header-right"
        }, React__default["default"].createElement("div", {
          onClick: _this.activeActionDialog.bind(_this, {
            showAcionDialog: true,
            type: 'update',
            actionData: {
              action: action,
              eventKey: eventKey,
              actionIndex: actionIndex
            }
          })
        }, React__default["default"].createElement(amis.Icon, {
          className: "icon",
          icon: "edit-full-btn"
        })), React__default["default"].createElement("div", {
          onClick: _this.delAction.bind(_this, eventKey, action, actionIndex)
        }, React__default["default"].createElement(amis.Icon, {
          className: "icon",
          icon: "delete-easy-btn"
        })))), _this.renderDesc(action));
      })) : null);
    }) : React__default["default"].createElement("div", {
      className: "ae-event-control-placeholder"
    }, i18nRuntime.i18n('快去添加事件，让你的产品动起来吧'))), showEventDialog ? amis.render({
      type: 'dialog',
      title: "".concat(eventDialogData === null || eventDialogData === void 0 ? void 0 : eventDialogData.eventLabel, "-\u4E8B\u4EF6\u914D\u7F6E"),
      showCloseButton: false,
      body: [{
        type: 'form',
        title: i18nRuntime.i18n("eee1e2258d7ea163fec625ee44be9637"),
        data: {
          '&': '$$'
        },
        mode: 'horizontal',
        horizontal: {
          left: 3,
          right: 9
        },
        body: [{
          label: i18nRuntime.i18n("5ba999eb762f60324033b735e55d989c"),
          type: 'switch',
          name: 'debounce.open',
          description: i18nRuntime.i18n("7fe94616be0e8fb5ef5ab40a7397f0aa")
        }, {
          label: i18nRuntime.i18n("91b72e901f1663637157cda638ac4dcc"),
          required: true,
          hiddenOn: '!debounce.open',
          name: 'debounce.wait',
          suffix: 'ms',
          max: 10000,
          min: 0,
          type: 'input-number'
        }],
        onSubmit: this.eventDialogSubmit.bind(this)
      }],
      actions: [{
        type: 'button',
        label: i18nRuntime.i18n("625fb26b4b3340f7872b411f401e754c"),
        onEvent: {
          click: {
            actions: [{
              actionType: 'custom',
              script: function () {
                _this.setState({
                  showEventDialog: false
                });
              }
            }]
          }
        }
      }, {
        type: 'button',
        actionType: 'confirm',
        label: i18nRuntime.i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
        primary: true
      }]
    }, {
      data: eventDialogData
    }) : null, React__default["default"].createElement(actionConfigDialog["default"], {
      show: showAcionDialog,
      type: type,
      actionTree: actionTree,
      pluginActions: pluginActions,
      commonActions: commonActions,
      getComponents: getComponents,
      data: actionData,
      onSubmit: this.onSubmit,
      onClose: this.onClose,
      render: this.props.render
    }));
  };
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], EventControl.prototype, "dragRef", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String, Object]), tslib.__metadata("design:returntype", void 0)], EventControl.prototype, "onSubmit", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], EventControl.prototype, "onClose", null);
  return EventControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(EventControlRenderer, _super);
  function EventControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  EventControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-eventControl'
  })], EventControlRenderer);
  return EventControlRenderer;
})(EventControl);

exports.ACTION_TYPE_TREE = helper.ACTION_TYPE_TREE;
exports.COMMON_ACTION_SCHEMA_MAP = helper.COMMON_ACTION_SCHEMA_MAP;
exports.DATA_CONTAINER = helper.DATA_CONTAINER;
exports.FORMITEM_CMPTS = helper.FORMITEM_CMPTS;
exports.SELECT_PROPS_CONTAINER = helper.SELECT_PROPS_CONTAINER;
exports.SHOW_SELECT_PROP = helper.SHOW_SELECT_PROP;
exports.SUPPORT_DISABLED_CMPTS = helper.SUPPORT_DISABLED_CMPTS;
exports.SUPPORT_STATIC_FORMITEM_CMPTS = helper.SUPPORT_STATIC_FORMITEM_CMPTS;
exports.findActionNode = helper.findActionNode;
exports.findSubActionNode = helper.findSubActionNode;
exports.getActionType = helper.getActionType;
exports.getArgsWrapper = helper.getArgsWrapper;
exports.getEventControlConfig = helper.getEventControlConfig;
exports.getEventDesc = helper.getEventDesc;
exports.getEventLabel = helper.getEventLabel;
exports.getEventStrongDesc = helper.getEventStrongDesc;
exports.getOldActionSchema = helper.getOldActionSchema;
exports.getPropOfAcion = helper.getPropOfAcion;
exports.hasActionType = helper.hasActionType;
exports.renderCmptActionSelect = helper.renderCmptActionSelect;
exports.renderCmptIdInput = helper.renderCmptIdInput;
exports.renderCmptSelect = helper.renderCmptSelect;
exports.EventControl = EventControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
