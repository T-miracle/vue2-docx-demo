import {
    AlignmentType,
    Document,
    HeadingLevel,
    LevelFormat,
    Packer,
    PageBreak,
    Paragraph,
    ShadingType,
    Tab,
    TextRun
} from 'docx';
import { convertPxToSize, saveAs } from '@/components/VueCanvasEditor/utils/docx/utils';

export function docxTestDemo() {
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        numbering: {
                            reference: "numbering",
                            level: 0,
                        },
                        children: [
                            new TextRun("第一项：第一行"),
                            new TextRun({
                                break: 1,
                                children: [
                                    new Tab()
                                ]
                            }),
                            new TextRun("第2项：第一行"),
                        ],
                    }),
                    new Paragraph({
                        numbering: {
                            reference: "numbering",
                            level: 0,
                        },
                        text: "第二项",
                    }),
                ],
                properties: {
                    page: {
                        margin: {
                            top: 120,
                            right: 100,
                            bottom: 120,
                            left: 100
                        }
                    }
                }
            }
        ],
        numbering: {
            config: [
                {
                    reference: 'bullet-points',
                    levels: [
                        {
                            level: 0,
                            format: LevelFormat.BULLET,
                            alignment: AlignmentType.LEFT
                        }
                    ]
                },
                {
                    reference: 'numbering',
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
    console.log([
        new TextRun({ text: '第一行文本' }),
        new TextRun({ break: 1 }),
        new TextRun({ text: '制表符后文本' })
    ]);
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `docx格式测试文件.docx`);
    });
}