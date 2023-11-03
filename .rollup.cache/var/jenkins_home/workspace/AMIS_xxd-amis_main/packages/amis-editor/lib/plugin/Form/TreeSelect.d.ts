import { EditorNodeType, RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
export declare class TreeSelectControlPlugin extends BasePlugin {
    static id: string;
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    disabledRendererPlugin: boolean;
    icon: string;
    pluginIcon: string;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        label: string;
        name: string;
        clearable: boolean;
        options: ({
            label: string;
            value: string;
            children: {
                label: string;
                value: string;
            }[];
        } | {
            label: string;
            value: string;
            children?: undefined;
        })[];
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelDefinitions: {
        options: {
            label: string;
            name: string;
            type: string;
            multiple: boolean;
            multiLine: boolean;
            draggable: boolean;
            addButtonText: string;
            scaffold: {
                label: string;
                value: string;
            };
            items: ({
                type: string;
                body: any[];
                $ref?: undefined;
                label?: undefined;
                name?: undefined;
                addButtonText?: undefined;
            } | {
                $ref: string;
                label: string;
                name: string;
                addButtonText: string;
                type?: undefined;
                body?: undefined;
            })[];
        };
    };
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
    buildDataSchemas(node: EditorNodeType, region: EditorNodeType): any;
}
