/**
 * @file FieldSetting.tsx
 * @desc 脚手架中字段管理
 */
/// <reference types="lodash" />
import React from 'react';
import { FormControlProps } from 'amis-core';
import type { IReactionDisposer } from 'mobx';
import type { InputTableColumnProps } from 'amis-ui';
import type { DSFeatureType, ScaffoldField } from '../builder/type';
interface FieldSettingProps extends FormControlProps {
    /** 脚手架渲染类型 */
    renderer?: string;
    feat: DSFeatureType;
    /** 支持的功能场景对应的字段集合，eg: listFields, bulkEditFields等 */
    fieldKeys: string[];
    config: {
        showInputType?: boolean;
        showDisplayType?: boolean;
    };
    onAutoGenerateFields: (params: {
        api: any;
        props: FieldSettingProps;
        setState: (state: any) => void;
    }) => Promise<any[]>;
}
interface RowData extends ScaffoldField {
}
interface FieldSettingState {
    loading: boolean;
    fields: RowData[];
}
export declare class FieldSetting extends React.Component<FieldSettingProps, FieldSettingState> {
    static defaultProps: {
        config: {
            showInputType: boolean;
            showDisplayType: boolean;
        };
    };
    static validator: (items: RowData[], isInternal?: boolean) => string | false;
    reaction: IReactionDisposer;
    dom: HTMLElement;
    formRef: React.RefObject<{
        submit: () => Promise<Record<string, any>>;
    }>;
    tableRef: React.RefObject<any>;
    scaffold: RowData;
    columns: InputTableColumnProps[];
    constructor(props: FieldSettingProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<FieldSettingProps>, prevState: Readonly<FieldSettingState>, snapshot?: any): void;
    componentWillUnmount(): void;
    isFirstStep(): boolean;
    handleTableChange(items?: RowData[]): void;
    handleSubmit(data: {
        items: RowData[];
    }): void;
    handleGenerateFields(e: React.MouseEvent<any>): Promise<void>;
    handleFieldsChange(fields: RowData[]): void;
    debounceGenerateFields: import("lodash").DebouncedFunc<(e: React.MouseEvent<any>) => Promise<void>>;
    renderFooter(): React.JSX.Element | null;
    render(): React.JSX.Element;
}
export default class FieldSettingRenderer extends FieldSetting {
}
export {};
