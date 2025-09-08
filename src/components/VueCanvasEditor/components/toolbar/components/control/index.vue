<template>
    <div class="menu-item__control" @click="clickHandler">
        <i title="控件"></i>
        <div ref="options" class="options" @click="selectControlHandler">
            <ul>
                <li data-control='text'>文本</li>
                <li data-control="number">数值</li>
                <li data-control="select">列举</li>
                <li data-control="date">日期</li>
                <li data-control="checkbox">复选框</li>
                <li data-control="radio">单选框</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { ControlType, ElementType } from '@hufe921/canvas-editor';
    import { Dialog } from '../../../dialog/index';

    export default {
        name: 'Control',
        inject: [ 'editorInstance' ],
        methods: {
            clickHandler() {
                this.$refs.options.classList.toggle('visible')
            },
            selectControlHandler(evt) {
                this.$refs.options.classList.toggle('visible')
                const li = evt.target
                const type = li.dataset.control

                const instance = this.editorInstance()

                switch (type) {
                    case ControlType.TEXT:
                        new Dialog({
                            title: '文本控件',
                            data: [
                                {
                                    type: 'text',
                                    label: '占位符',
                                    name: 'placeholder',
                                    required: true,
                                    placeholder: '请输入占位符'
                                },
                                {
                                    type: 'text',
                                    label: '默认值',
                                    name: 'value',
                                    placeholder: '请输入默认值'
                                }
                            ],
                            onConfirm: payload => {
                                const placeholder = payload.find(p => p.name === 'placeholder')?.value
                                if (!placeholder) return
                                const value = payload.find(p => p.name === 'value')?.value || ''
                                instance.command.executeInsertControl({
                                    type: ElementType.CONTROL,
                                    value: '',
                                    control: {
                                        type,
                                        value: value
                                            ? [{ value }]
                                            : null,
                                        placeholder
                                    }
                                })
                            }
                        })
                        break
                    case ControlType.SELECT:
                        new Dialog({
                            title: '列举控件',
                            data: [
                                {
                                    type: 'text',
                                    label: '占位符',
                                    name: 'placeholder',
                                    required: true,
                                    placeholder: '请输入占位符'
                                },
                                {
                                    type: 'text',
                                    label: '默认值',
                                    name: 'code',
                                    placeholder: '请输入默认值'
                                },
                                {
                                    type: 'textarea',
                                    label: '值集',
                                    name: 'valueSets',
                                    required: true,
                                    height: 100,
                                    placeholder: `请输入值集JSON，例：\n[{\n"value":"有",\n"code":"98175"\n}]`
                                }
                            ],
                            onConfirm: payload => {
                                const placeholder = payload.find(p => p.name === 'placeholder')?.value
                                if (!placeholder) return
                                const valueSets = payload.find(p => p.name === 'valueSets')?.value
                                if (!valueSets) return
                                const code = payload.find(p => p.name === 'code')?.value
                                instance.command.executeInsertControl({
                                    type: ElementType.CONTROL,
                                    value: '',
                                    control: {
                                        type,
                                        code,
                                        value: null,
                                        placeholder,
                                        valueSets: JSON.parse(valueSets)
                                    }
                                })
                            }
                        })
                        break
                    case ControlType.CHECKBOX:
                        new Dialog({
                            title: '复选框控件',
                            data: [
                                {
                                    type: 'text',
                                    label: '默认值',
                                    name: 'code',
                                    placeholder: '请输入默认值，多个值以英文逗号分割'
                                },
                                {
                                    type: 'textarea',
                                    label: '值集',
                                    name: 'valueSets',
                                    required: true,
                                    height: 100,
                                    placeholder: `请输入值集JSON，例：\n[{\n"value":"有",\n"code":"98175"\n}]`
                                }
                            ],
                            onConfirm: payload => {
                                const valueSets = payload.find(p => p.name === 'valueSets')?.value
                                if (!valueSets) return
                                const code = payload.find(p => p.name === 'code')?.value
                                instance.command.executeInsertControl({
                                    type: ElementType.CONTROL,
                                    value: '',
                                    control: {
                                        type,
                                        code,
                                        value: null,
                                        valueSets: JSON.parse(valueSets)
                                    }
                                })
                            }
                        })
                        break
                    case ControlType.RADIO:
                        new Dialog({
                            title: '单选框控件',
                            data: [
                                {
                                    type: 'text',
                                    label: '默认值',
                                    name: 'code',
                                    placeholder: '请输入默认值'
                                },
                                {
                                    type: 'textarea',
                                    label: '值集',
                                    name: 'valueSets',
                                    required: true,
                                    height: 100,
                                    placeholder: `请输入值集JSON，例：\n[{\n"value":"有",\n"code":"98175"\n}]`
                                }
                            ],
                            onConfirm: payload => {
                                const valueSets = payload.find(p => p.name === 'valueSets')?.value
                                if (!valueSets) return
                                const code = payload.find(p => p.name === 'code')?.value
                                instance.command.executeInsertControl({
                                    type: ElementType.CONTROL,
                                    value: '',
                                    control: {
                                        type,
                                        code,
                                        value: null,
                                        valueSets: JSON.parse(valueSets)
                                    }
                                })
                            }
                        })
                        break
                    case ControlType.DATE:
                        new Dialog({
                            title: '日期控件',
                            data: [
                                {
                                    type: 'text',
                                    label: '占位符',
                                    name: 'placeholder',
                                    required: true,
                                    placeholder: '请输入占位符'
                                },
                                {
                                    type: 'text',
                                    label: '默认值',
                                    name: 'value',
                                    placeholder: '请输入默认值'
                                },
                                {
                                    type: 'select',
                                    label: '日期格式',
                                    name: 'dateFormat',
                                    value: 'yyyy-MM-dd hh:mm:ss',
                                    required: true,
                                    options: [
                                        { label: 'yyyy-MM-dd hh:mm:ss', value: 'yyyy-MM-dd hh:mm:ss' },
                                        { label: 'yyyy-MM-dd', value: 'yyyy-MM-dd' }
                                    ]
                                }
                            ],
                            onConfirm: payload => {
                                const placeholder = payload.find(p => p.name === 'placeholder')?.value
                                if (!placeholder) return
                                const value = payload.find(p => p.name === 'value')?.value || ''
                                const dateFormat = payload.find(p => p.name === 'dateFormat')?.value || ''
                                instance.command.executeInsertControl({
                                    type: ElementType.CONTROL,
                                    value: '',
                                    control: {
                                        type,
                                        dateFormat,
                                        value: value ? [{ value }] : null,
                                        placeholder
                                    }
                                })
                            }
                        })
                        break
                    case ControlType.NUMBER:
                        new Dialog({
                            title: '数值控件',
                            data: [
                                {
                                    type: 'text',
                                    label: '占位符',
                                    name: 'placeholder',
                                    required: true,
                                    placeholder: '请输入占位符'
                                },
                                {
                                    type: 'text',
                                    label: '默认值',
                                    name: 'value',
                                    placeholder: '请输入默认值'
                                }
                            ],
                            onConfirm: payload => {
                                const placeholder = payload.find(p => p.name === 'placeholder')?.value
                                if (!placeholder) return
                                const value = payload.find(p => p.name === 'value')?.value || ''
                                instance.command.executeInsertControl({
                                    type: ElementType.CONTROL,
                                    value: '',
                                    control: {
                                        type,
                                        value: value ? [{ value }] : null,
                                        placeholder
                                    }
                                })
                            }
                        })
                        break
                    default:
                        break
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
