import { BasePlugin } from 'amis-editor-core';
export declare class QRCodePlugin extends BasePlugin {
    static id: string;
    static scene: string[];
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    description: string;
    docLink: string;
    tags: string[];
    icon: string;
    pluginIcon: string;
    scaffold: {
        type: string;
        value: string;
    };
    previewSchema: {
        type: string;
        value: string;
    };
    panelTitle: string;
    panelBody: any[];
}
