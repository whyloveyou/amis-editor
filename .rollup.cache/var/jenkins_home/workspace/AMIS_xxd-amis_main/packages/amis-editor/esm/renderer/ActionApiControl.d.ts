import React from 'react';
import type { SchemaObject, SchemaCollection, SchemaApi } from 'amis';
import type { FormControlProps } from 'amis-core';
import type { ActionSchema } from 'amis';
export interface APIControlProps extends FormControlProps {
    name?: string;
    label?: string;
    value?: any;
    /**
     * 接口消息设置描述信息
     */
    messageDesc?: string;
    /**
     * 顶部按钮集合
     */
    actions?: Array<ActionSchema>;
    /**
     * 底部集合
     */
    footer?: Array<SchemaObject>;
    /**
     * 是否开启选择模式，开启后actions属性失效
     */
    enablePickerMode?: boolean;
    /**
     * 触发Picker的按钮配置
     */
    pickerBtnSchema?: ActionSchema;
    /**
     * picker标题
     */
    pickerTitle?: string;
    /**
     * Picker绑定的Name
     */
    pickerName?: string;
    /**
     * picker模式的Schema
     */
    pickerSchema?: SchemaCollection;
    /**
     * Picker数据源
     */
    pickerSource?: SchemaApi;
    /**
     * Picker弹窗大小
     */
    pickerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /**
     * Picker顶部的CSS类名
     */
    pickerHeaderClassName?: string;
    /**
     * Picker面板确认
     */
    onPickerConfirm: (values: any) => void | any;
    /**
     * Picker面板关闭
     */
    onPickerClose: () => void;
    /**
     * Picker面板选择
     */
    onPickerSelect: (values: any) => void | any;
    onAction: (schema: ActionSchema, e: React.MouseEvent<any> | void | null, action: object, data: any) => void;
}
export interface APIControlState {
    apiStr: string;
    selectedItem?: any[];
    schema?: SchemaCollection;
}
export default class APIControl extends React.Component<APIControlProps, APIControlState> {
    static defaultProps: Pick<APIControlProps, 'pickerBtnSchema'>;
    constructor(props: APIControlProps);
    componentDidUpdate(prevProps: APIControlProps): void;
    transformApi2Str(value: any): string;
    fetchOptions(): Promise<void>;
    handleSubmit(values: SchemaApi, action: any): void;
    handleAction(schema: ActionSchema, e: React.MouseEvent<any> | void | null, action: object, data: any): void;
    normalizeValue(value: any, callback: (value: any) => any): any;
    handlePickerConfirm(value: any): void;
    handlePickerClose(): void;
    renderHeader(): React.JSX.Element | null;
    renderPickerSchema(): React.JSX.Element | null;
    renderApiDialog(): {
        label: string;
        type: string;
        acitonType: string;
        size: string;
        icon: string;
        actionType: string;
        dialog: {
            title: string;
            size: string;
            className: string;
            headerClassName: string;
            bodyClassName: string;
            closeOnEsc: boolean;
            closeOnOutside: boolean;
            showCloseButton: boolean;
            body: {
                type: string;
                className: string;
                mode: string;
                submitOnChange: boolean;
                wrapWithPanel: boolean;
                onSubmit: (values: SchemaApi, action: any) => void;
                body: {
                    type: string;
                    className: string;
                    contentClassName: string;
                    tabs: ({
                        title: string;
                        tab: ({
                            label: string;
                            name: string;
                            value: string;
                            type: string;
                            mode: string;
                            options: {
                                value: string;
                                label: string;
                            }[];
                            size?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            description?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            visibleOn?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            type: string;
                            name: string;
                            mode: string;
                            size: string;
                            placeholder: string;
                            required: boolean;
                            value?: undefined;
                            options?: undefined;
                            description?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            visibleOn?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            type: string;
                            name: string;
                            mode: string;
                            size: string;
                            placeholder: string;
                            description: string;
                            value?: undefined;
                            options?: undefined;
                            required?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            visibleOn?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            type: string;
                            name: string;
                            size: string;
                            mode: string;
                            description: string;
                            options: {
                                label: string;
                                value: string;
                            }[];
                            disabled: boolean;
                            value?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            visibleOn?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            type: string;
                            label: string;
                            name: string;
                            mode: string;
                            pipeIn: (value: any) => boolean;
                            pipeOut: (value: any) => 3000 | undefined;
                            value?: undefined;
                            options?: undefined;
                            size?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            description?: undefined;
                            disabled?: undefined;
                            min?: undefined;
                            step?: undefined;
                            visibleOn?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            type: string;
                            name: string;
                            mode: string;
                            size: string;
                            min: number;
                            step: number;
                            visibleOn: string;
                            description: string;
                            pipeIn: (value: any) => number;
                            value?: undefined;
                            options?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            disabled?: undefined;
                            pipeOut?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            name: string;
                            type: string;
                            mode: string;
                            description: string;
                            pipeIn: (value: any) => boolean;
                            pipeOut: (value: any) => "blob" | undefined;
                            value?: undefined;
                            options?: undefined;
                            size?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            disabled?: undefined;
                            min?: undefined;
                            step?: undefined;
                            visibleOn?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            name: string;
                            type: string;
                            mode: string;
                            description: string;
                            value?: undefined;
                            options?: undefined;
                            size?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            visibleOn?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: any;
                            type: string;
                            visibleOn: string;
                            mode: string;
                            direction: string;
                            body: ({
                                name: string;
                                type: string;
                                inline: boolean;
                                mode: string;
                                renderLabel: boolean;
                                onChange: () => void;
                                options: ({
                                    label: string;
                                    value: boolean;
                                } | {
                                    label: string;
                                    value: string;
                                })[];
                                autoComplete?: undefined;
                                visibleOn?: undefined;
                                size?: undefined;
                                placeholder?: undefined;
                                className?: undefined;
                            } | {
                                name: string;
                                autoComplete: boolean;
                                visibleOn: string;
                                type: string;
                                mode: string;
                                size: string;
                                renderLabel: boolean;
                                placeholder: string;
                                className: string;
                                /**
                                 * Picker面板关闭
                                 */
                                inline?: undefined;
                                onChange?: undefined;
                                options?: undefined;
                            })[];
                            name?: undefined;
                            value?: undefined;
                            options?: undefined;
                            size?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            description?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            name: string;
                            type: string;
                            mode: string;
                            visibleOn: string;
                            pipeIn: (value: any) => boolean;
                            pipeOut: (value: any) => 3000 | undefined;
                            value?: undefined;
                            options?: undefined;
                            size?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            description?: undefined;
                            disabled?: undefined;
                            min?: undefined;
                            step?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            name: string;
                            type: string;
                            mode: string;
                            size: string;
                            visibleOn: string;
                            step: number;
                            description: string;
                            value?: undefined;
                            options?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: string;
                            name: string;
                            type: string;
                            mode: string;
                            visibleOn: string;
                            description: string;
                            value?: undefined;
                            options?: undefined;
                            size?: undefined;
                            placeholder?: undefined;
                            required?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            direction?: undefined;
                            body?: undefined;
                            horizontal?: undefined;
                        } | {
                            label: any;
                            name: string;
                            type: string;
                            mode: string;
                            horizontal: {
                                leftFixed: string;
                            };
                            size: string;
                            visibleOn: string;
                            placeholder: string;
                            value?: undefined;
                            options?: undefined;
                            required?: undefined;
                            description?: undefined;
                            disabled?: undefined;
                            pipeIn?: undefined;
                            pipeOut?: undefined;
                            min?: undefined;
                            step?: undefined;
                            direction?: undefined;
                            body?: undefined;
                        })[];
                    } | {
                        title: string;
                        tab: {
                            type: string;
                            title: string;
                            headingClassName: string;
                            body: any[];
                        }[];
                    } | {
                        title: string;
                        tab: {
                            label: string;
                            type: string;
                            name: string;
                            mode: string;
                            multiLine: boolean;
                            description: string;
                            items: {
                                label: string;
                                type: string;
                                name: string;
                            }[];
                        }[];
                    })[];
                }[];
            }[];
        };
    };
    renderApiConfigTabs(messageDesc?: string, submitOnChange?: boolean): {
        type: string;
        className: string;
        mode: string;
        submitOnChange: boolean;
        wrapWithPanel: boolean;
        onSubmit: (values: SchemaApi, action: any) => void;
        body: {
            type: string;
            className: string;
            contentClassName: string;
            tabs: ({
                title: string;
                tab: ({
                    label: string;
                    name: string;
                    value: string;
                    type: string;
                    mode: string;
                    options: {
                        value: string;
                        label: string;
                    }[];
                    size?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    description?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    visibleOn?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    type: string;
                    name: string;
                    mode: string;
                    size: string;
                    placeholder: string;
                    required: boolean;
                    value?: undefined;
                    options?: undefined;
                    description?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    visibleOn?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    type: string;
                    name: string;
                    mode: string;
                    size: string;
                    placeholder: string;
                    description: string;
                    value?: undefined;
                    options?: undefined;
                    required?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    visibleOn?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    type: string;
                    name: string;
                    size: string;
                    mode: string;
                    description: string;
                    options: {
                        label: string;
                        value: string;
                    }[];
                    disabled: boolean;
                    value?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    visibleOn?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    type: string;
                    label: string;
                    name: string;
                    mode: string;
                    pipeIn: (value: any) => boolean;
                    pipeOut: (value: any) => 3000 | undefined;
                    value?: undefined;
                    options?: undefined;
                    size?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    description?: undefined;
                    disabled?: undefined;
                    min?: undefined;
                    step?: undefined;
                    visibleOn?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    type: string;
                    name: string;
                    mode: string;
                    size: string;
                    min: number;
                    step: number;
                    visibleOn: string;
                    description: string;
                    pipeIn: (value: any) => number;
                    value?: undefined;
                    options?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    disabled?: undefined;
                    pipeOut?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    name: string;
                    type: string;
                    mode: string;
                    description: string;
                    pipeIn: (value: any) => boolean;
                    pipeOut: (value: any) => "blob" | undefined;
                    value?: undefined;
                    options?: undefined;
                    size?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    disabled?: undefined;
                    min?: undefined;
                    step?: undefined;
                    visibleOn?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    name: string;
                    type: string;
                    mode: string;
                    description: string;
                    value?: undefined;
                    options?: undefined;
                    size?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    visibleOn?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: any;
                    type: string;
                    visibleOn: string;
                    mode: string;
                    direction: string;
                    body: ({
                        name: string;
                        type: string;
                        inline: boolean;
                        mode: string;
                        renderLabel: boolean;
                        onChange: () => void;
                        options: ({
                            label: string;
                            value: boolean;
                        } | {
                            label: string;
                            value: string;
                        })[];
                        autoComplete?: undefined;
                        visibleOn?: undefined;
                        size?: undefined;
                        placeholder?: undefined;
                        className?: undefined;
                    } | {
                        name: string;
                        autoComplete: boolean;
                        visibleOn: string;
                        type: string;
                        mode: string;
                        size: string;
                        renderLabel: boolean;
                        placeholder: string;
                        className: string;
                        /**
                         * Picker面板关闭
                         */
                        inline?: undefined;
                        onChange?: undefined;
                        options?: undefined;
                    })[];
                    name?: undefined;
                    value?: undefined;
                    options?: undefined;
                    size?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    description?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    name: string;
                    type: string;
                    mode: string;
                    visibleOn: string;
                    pipeIn: (value: any) => boolean;
                    pipeOut: (value: any) => 3000 | undefined;
                    value?: undefined;
                    options?: undefined;
                    size?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    description?: undefined;
                    disabled?: undefined;
                    min?: undefined;
                    step?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    name: string;
                    type: string;
                    mode: string;
                    size: string;
                    visibleOn: string;
                    step: number;
                    description: string;
                    value?: undefined;
                    options?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: string;
                    name: string;
                    type: string;
                    mode: string;
                    visibleOn: string;
                    description: string;
                    value?: undefined;
                    options?: undefined;
                    size?: undefined;
                    placeholder?: undefined;
                    required?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    direction?: undefined;
                    body?: undefined;
                    horizontal?: undefined;
                } | {
                    label: any;
                    name: string;
                    type: string;
                    mode: string;
                    horizontal: {
                        leftFixed: string;
                    };
                    size: string;
                    visibleOn: string;
                    placeholder: string;
                    value?: undefined;
                    options?: undefined;
                    required?: undefined;
                    description?: undefined;
                    disabled?: undefined;
                    pipeIn?: undefined;
                    pipeOut?: undefined;
                    min?: undefined;
                    step?: undefined;
                    direction?: undefined;
                    body?: undefined;
                })[];
            } | {
                title: string;
                tab: {
                    type: string;
                    title: string;
                    headingClassName: string;
                    body: any[];
                }[];
            } | {
                title: string;
                tab: {
                    label: string;
                    type: string;
                    name: string;
                    mode: string;
                    multiLine: boolean;
                    description: string;
                    items: {
                        label: string;
                        type: string;
                        name: string;
                    }[];
                }[];
            })[];
        }[];
    };
    render(): React.JSX.Element;
}
export declare class APIControlRenderer extends APIControl {
}
