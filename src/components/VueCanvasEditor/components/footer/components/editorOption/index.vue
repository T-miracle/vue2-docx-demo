<template>
    <div class="editor-option" title="编辑器设置" @click="setting">
        <i></i>
    </div>
</template>

<script>
    import { Dialog } from '../../../dialog';

    export default {
        name: "EditorOption",
        inject: [ 'editorInstance' ],
        methods: {
            setting() {
                const instance = this.editorInstance();
                const options = instance.command.getOptions()
                new Dialog({
                    title: '编辑器配置',
                    data: [
                        {
                            type: 'textarea',
                            name: 'option',
                            width: 350,
                            height: 300,
                            required: true,
                            value: JSON.stringify(options, null, 2),
                            placeholder: '请输入编辑器配置'
                        }
                    ],
                    onConfirm: payload => {
                        const newOptionValue = payload.find(p => p.name === 'option')?.value
                        if (!newOptionValue) return
                        const newOption = JSON.parse(newOptionValue)
                        instance.command.executeUpdateOptions(newOption)
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
