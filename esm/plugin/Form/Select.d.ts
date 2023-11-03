import { BasePlugin } from 'amis-editor-core';
import type { EditorNodeType, RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class SelectControlPlugin extends BasePlugin {
    static id: string;
    static scene: string[];
    name: string;
    panelTitle: string;
    rendererName: string;
    icon: string;
    panelIcon: string;
    pluginIcon: string;
    isBaseComponent: boolean;
    panelJustify: boolean;
    notRenderFormZone: boolean;
    $schema: string;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        label: string;
        name: string;
        options: {
            label: string;
            value: string;
        }[];
    };
    previewSchema: any;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelBodyCreator: (context: BaseEventContext) => any;
    buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
}
