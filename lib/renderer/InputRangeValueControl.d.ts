/**
 * @file InputRangeValue
 * @description 滑块组件默认值控件
 */
import React from 'react';
import type { FormControlProps } from 'amis-core';
export interface InputRangeValueProps extends FormControlProps {
    value?: any;
    minField?: string;
    maxField?: string;
    onChange: (value: any) => void;
}
export default class InputRangeValueRenderer extends React.Component<FormControlProps> {
    render(): React.JSX.Element;
}
