import { EditorNodeType } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import type { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class ListControlPlugin extends BasePlugin {
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
        options: {
            label: string;
            value: string;
        }[];
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    subEditorVariable: Array<{
        label: string;
        children: any;
    }>;
    panelBodyCreator: (context: BaseEventContext) => any[];
    buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
    filterProps(props: any): any;
    getDisplayField(data: any): any;
    editDetail(id: string, field: string): void;
}
