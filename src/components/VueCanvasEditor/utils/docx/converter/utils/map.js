// 标题级别 转换成 docx 标题级别
import { RowFlex, TitleLevel, VerticalAlign as VerticalAlignEditor } from '@hufe921/canvas-editor';
import { AlignmentType, HeadingLevel, VerticalAlign } from 'docx';

export const titleLevelToHeadingLevel = {
    [TitleLevel.FIRST]: HeadingLevel.HEADING_1,
    [TitleLevel.SECOND]: HeadingLevel.HEADING_2,
    [TitleLevel.THIRD]: HeadingLevel.HEADING_3,
    [TitleLevel.FOURTH]: HeadingLevel.HEADING_4,
    [TitleLevel.FIFTH]: HeadingLevel.HEADING_5,
    [TitleLevel.SIXTH]: HeadingLevel.HEADING_6
};

// RowFlex 转换成 docx 对齐方式
export const rowFlexToAlignmentType = {
    [RowFlex.LEFT]: AlignmentType.START,
    [RowFlex.CENTER]: AlignmentType.CENTER,
    [RowFlex.RIGHT]: AlignmentType.RIGHT,
    [RowFlex.ALIGNMENT]: AlignmentType.JUSTIFIED,
    [RowFlex.JUSTIFY]: AlignmentType.JUSTIFIED
};

// VerticalAlign 转换成 docx VerticalAlign
export const verticalAlignEditorToVerticalAlignDocx = {
    [VerticalAlignEditor.TOP]: VerticalAlign.TOP,
    [VerticalAlignEditor.MIDDLE]: VerticalAlign.CENTER,
    [VerticalAlignEditor.BOTTOM]: VerticalAlign.BOTTOM
};