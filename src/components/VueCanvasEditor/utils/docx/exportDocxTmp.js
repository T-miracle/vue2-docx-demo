import Color from 'color';
import {
    ElementType,
    TitleLevel,
    TableBorder,
    TdBorder,
    VerticalAlign as VerticalAlignEditor,
    RowFlex,
    ListType
} from '@hufe921/canvas-editor';
import {
    Document,
    Packer,
    Paragraph,
    Header,
    Footer,
    Table,
    HeadingLevel,
    TextRun,
    Tab,
    ExternalHyperlink,
    ImageRun,
    WidthType,
    TableRow,
    TableCell,
    MathRun,
    BorderStyle,
    AlignmentType,
    VerticalAlign,
    ShadingType,
    PageBreak,
    LevelFormat,
    CheckBox
} from 'docx';
import { convertPxToSize, saveAs } from './utils';

const titleLevelToHeadingLevel = {
    [TitleLevel.FIRST]: HeadingLevel.HEADING_1,
    [TitleLevel.SECOND]: HeadingLevel.HEADING_2,
    [TitleLevel.THIRD]: HeadingLevel.HEADING_3,
    [TitleLevel.FOURTH]: HeadingLevel.HEADING_4,
    [TitleLevel.FIFTH]: HeadingLevel.HEADING_5,
    [TitleLevel.SIXTH]: HeadingLevel.HEADING_6
};
const rowFlexToAlignmentType = {
    [RowFlex.LEFT]: AlignmentType.START,
    [RowFlex.CENTER]: AlignmentType.CENTER,
    [RowFlex.RIGHT]: AlignmentType.RIGHT,
    [RowFlex.ALIGNMENT]: AlignmentType.JUSTIFIED,
    [RowFlex.JUSTIFY]: AlignmentType.JUSTIFIED
};
const verticalAlignEditorToVerticalAlignDocx = {
    [VerticalAlignEditor.TOP]: VerticalAlign.TOP,
    [VerticalAlignEditor.MIDDLE]: VerticalAlign.CENTER,
    [VerticalAlignEditor.BOTTOM]: VerticalAlign.BOTTOM
};

// 将元素转换为段落子元素
function convertElementToParagraphChild(element) {
    if (element.type === ElementType.IMAGE) {
        return new ImageRun({
            data: element.value,
            transformation: {
                width: element.width,
                height: element.height
            }
        });
    }
    if (element.type === ElementType.HYPERLINK) {
        return new ExternalHyperlink({
            children: [
                new TextRun({
                    text: element.valueList?.map(child => child.value).join(''),
                    style: 'Hyperlink'
                })
            ],
            link: element.url
        });
    }
    if (element.type === ElementType.TAB) {
        return new TextRun({
            children: [new Tab()]
        });
    }
    if (element.type === ElementType.LATEX) {
        return new MathRun(element.value);
    }
    if (element.type === ElementType.PAGE_BREAK) {
        return new PageBreak();
    }
    if (element.type === ElementType.CHECKBOX) {
        return new CheckBox({
            checked: true
        });
    }

    return new TextRun({
        font: element.font,
        text: element.value.toString(),
        bold: element.bold,
        size: `${(element.size || 16) / 0.75}pt`,
        color: Color(element.color).hex() || '#000000',
        italics: element.italic,
        strike: element.strikeout,
        highlight: element.highlight ? Color(element.highlight).hex() : undefined,
        superScript: element.type === ElementType.SUPERSCRIPT,
        subScript: element.type === ElementType.SUBSCRIPT,
        underline: element.underline ? {} : undefined
    });
}

function convertElementListToDocxChildren(elementList, options) {
    // 存储转换后的所有 docx 节点
    const children = [];
    // 临时缓存当前段落里的子元素
    let paragraphChild = [];

    // 每次添加段落时调用
    function appendParagraph(element) {
        if (paragraphChild.length) {
            const alignment = (element && element.rowFlex) ? rowFlexToAlignmentType[element.rowFlex] : 'start';
            console.log('对齐 -->', element, alignment);
            children.push(new Paragraph({
                children: paragraphChild,
                alignment
            }));
            paragraphChild = [];
        }
    }

    // 添加段落时传递，并且元素具有 rowFlex
    let targetElement = undefined;
    for (let e = 0; e < elementList.length; e++) {
        const element = elementList[e];
        if (element.type === ElementType.TITLE) {
            appendParagraph();
            children.push(new Paragraph({
                heading: titleLevelToHeadingLevel[element.level],
                children: element.valueList?.map(child => convertElementToParagraphChild(child)) || []
            }));
        } else if (element.type === ElementType.LIST) {
            appendParagraph(element);
            // ????
            const listChildren = element.valueList
                ?.map(item => item.value)
                .join('')
                .split('\n')
                .map((text) => new Paragraph({
                    children: [
                        new TextRun({
                            text: text
                        })
                    ],
                    numbering: {
                        reference: (!element.listType || element.listType !== ListType.OL)
                            ? `bullet-points-1`
                            : `numbering-1`,
                        level: 0
                    }
                })) || [];
            children.push(...listChildren);
        } else if (element.type === ElementType.TABLE) {
            appendParagraph(element);
            const { borderType, colgroup, trList } = element;
            const borderDashed = {
                style: BorderStyle.DASHED,
                size: 1,
                color: '000000'
            };
            const borderEmpty = {
                style: BorderStyle.NONE,
                size: 0,
                color: '#ffffff'
            };
            const bordersAll = {
                top: borderDashed,
                bottom: borderDashed,
                left: borderDashed,
                right: borderDashed
            };
            const bordersEmpty = {
                top: borderEmpty,
                bottom: borderEmpty,
                left: borderEmpty,
                right: borderEmpty
            };
            const tableRowList = [];
            for (let r = 0; r < trList.length; r++) {
                const tdList = trList[r].tdList;
                const tableCellList = [];
                for (let c = 0; c < tdList.length; c++) {
                    const td = tdList[c];
                    let borders = undefined;
                    if (borderType === TableBorder.ALL) {
                        borders = JSON.parse(JSON.stringify(bordersAll));
                    }
                    if (borderType === TableBorder.EMPTY) {
                        borders = JSON.parse(JSON.stringify(bordersEmpty));
                    }
                    if (borderType === TableBorder.EXTERNAL) {
                        borders = JSON.parse(JSON.stringify(bordersEmpty));
                        const lastTdIndex = tdList.length - 1;
                        const isTdLast = c === lastTdIndex;
                        const containColSpan = td.colspan > 1;
                        const colSpan = c + td.colspan;
                        const rowSpan = r + td.rowspan;
                        if (r === 0) {
                            borders.top = borderDashed;
                        }
                        if (isTdLast || (containColSpan && colSpan === lastTdIndex)) {
                            borders.right = borderDashed;
                        }
                        if ((r === trList.length - 1) || (rowSpan === trList.length - 1)) {
                            borders.bottom = borderDashed;
                        }
                        if (c === 0) {
                            borders.left = borderDashed;
                        }
                    }
                    if (td.borderTypes && Object.values(td.borderTypes).includes(TdBorder.BOTTOM)) {
                        borders.bottom = borderDashed;
                    }
                    const verticalAlign = td.verticalAlign
                        ? verticalAlignEditorToVerticalAlignDocx[td.verticalAlign]
                        : undefined;
                    let shading = undefined;
                    if (td.backgroundColor) {
                        shading = {
                            fill: td.backgroundColor,
                            type: ShadingType.CLEAR,
                            color: 'auto'
                        };
                    }
                    const tdCell = {
                        verticalAlign: verticalAlign,
                        borders,
                        shading,
                        columnSpan: td.colspan,
                        rowSpan: td.rowspan,
                        children: convertElementListToDocxChildren(td.value, options) || []
                    };
                    tableCellList.push(new TableCell(tdCell));
                }
                tableRowList.push(new TableRow({
                    children: tableCellList
                }));
            }
            const columnWidths = colgroup?.reduce((acumm, colWidth) => {
                const inches = convertPxToSize(colWidth.width);
                acumm.push(inches);
                return acumm;
            }, []);
            children.push(new Table({
                rows: tableRowList,
                alignment: AlignmentType.CENTER,
                columnWidths: columnWidths,
                width: {
                    size: '100%',
                    type: WidthType.PERCENTAGE
                }
            }));
        } else if (element.type === ElementType.DATE) {
            paragraphChild.push(...(element.valueList?.map(child => convertElementToParagraphChild(child)) || []));
        } else {
            // console.log('TEXT --->', element);
            if (/\n/.test(element.value)) {
                // 判断有几个换行符
                const parts = element.value.split('\n');
                const len = parts.length - 1;
                // 每一个换行符替换成一个换行元素
                for (let p = 0; p < len; p++) {
                    paragraphChild.push(new TextRun({ break: 1 }));
                }
            } else {
                paragraphChild.push(convertElementToParagraphChild(element));
                // console.log('paragraphChild --->', paragraphChild);
                element.rowFlex && appendParagraph(element)
            }
            targetElement = element;
        }
    }
    appendParagraph(targetElement);
    return children;
}

export default function (command) {
    return async function (options) {
        const { fileName } = options;
        const { data: { header, main, footer } } = command.getValue();
        // console.log('command.getValue()', command.getValue());
        console.log('----------main----------');
        console.log(main);
        console.log('------------------------');
        const [top, right, bottom, left] = command.getOptions().margins;
        const doc = new Document({
            sections: [
                {
                    headers: {
                        default: new Header({
                            children: convertElementListToDocxChildren(header || [], command.getOptions())
                        })
                    },
                    footers: {
                        default: new Footer({
                            children: convertElementListToDocxChildren(footer || [], command.getOptions())
                        })
                    },
                    children: convertElementListToDocxChildren(main || [], command.getOptions()),
                    properties: {
                        page: {
                            margin: {
                                top: convertPxToSize(top),
                                right: convertPxToSize(right),
                                bottom: convertPxToSize(bottom),
                                left: convertPxToSize(left)
                            }
                        }
                    }
                }
            ],
            numbering: {
                config: [
                    {
                        reference: 'bullet-points-1',
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.BULLET,
                                alignment: AlignmentType.LEFT
                            }
                        ]
                    },
                    {
                        reference: 'numbering-1',
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.DECIMAL,
                                text: '%1.',
                                alignment: AlignmentType.START
                            }
                        ]
                    }
                ]
            }
        });
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `${ fileName }.docx`);
        });
    };
}
