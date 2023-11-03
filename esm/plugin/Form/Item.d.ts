import { BasePlugin, BasicPanelItem, PluginEvent, ChangeEventContext, ReplaceEventContext, BuildPanelEventContext, ContextMenuEventContext, ContextMenuItem } from 'amis-editor-core';
export declare class ItemPlugin extends BasePlugin {
    static id: string;
    panelTitle: string;
    order: number;
    pluginIcon: string;
    buildEditorPanel(context: BuildPanelEventContext, panels: Array<BasicPanelItem>): void;
    panelBodyCreator: (context: BaseEventContext) => any[];
    afterUpdate(event: PluginEvent<ChangeEventContext>): void;
    beforeReplace(event: PluginEvent<ReplaceEventContext>): void;
    buildEditorContextMenu({ id, schema, region, selections }: ContextMenuEventContext, menus: Array<ContextMenuItem>): void;
}
