import { EditorNodeType } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class RateControlPlugin extends BasePlugin {
    static id: string;
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    icon: string;
    pluginIcon: string;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        label: string;
        name: string;
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    count: number;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
    buildDataSchemas(node: EditorNodeType, region: EditorNodeType): {
        type: string;
        title: any;
        originalValue: any;
    };
}
