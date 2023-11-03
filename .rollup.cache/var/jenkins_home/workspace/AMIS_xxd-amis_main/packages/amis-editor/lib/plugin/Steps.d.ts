import { BasePlugin } from 'amis-editor-core';
export declare class StepsPlugin extends BasePlugin {
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
        value: number;
        steps: ({
            title: string;
            subTitle: string;
            description: string;
        } | {
            title: string;
            subTitle?: undefined;
            description?: undefined;
        })[];
    };
    previewSchema: {
        type: string;
        value: number;
        steps: ({
            title: string;
            subTitle: string;
            description: string;
        } | {
            title: string;
            subTitle?: undefined;
            description?: undefined;
        })[];
    };
    panelTitle: string;
    panelBody: any[];
}
