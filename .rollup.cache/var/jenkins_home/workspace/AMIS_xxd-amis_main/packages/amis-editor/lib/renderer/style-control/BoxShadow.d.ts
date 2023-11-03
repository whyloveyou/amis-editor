/**
 * @file 阴影
 * @description 阴影配置
 * @grammar
 * x偏移量 | y偏移量 | 阴影颜色
 * x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色
 * 插页(阴影向内) | x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色
 */
import React from 'react';
import type { FormControlProps, RendererProps } from 'amis-core';
declare function BoxShadow({ value, onChange, render }: {
    value?: string;
    onChange: (value: any) => void;
} & RendererProps): React.JSX.Element;
export default BoxShadow;
export declare class BoxShadowRenderer extends React.Component<FormControlProps> {
    render(): React.JSX.Element;
}
