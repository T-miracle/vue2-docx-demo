<template>
    <div class="menu-item__image" @click="clickHandler">
        <i title="图片"></i>
        <input ref="file" type="file" id="image" accept=".png, .jpg, .jpeg, .svg, .gif" @input="imageUploadHandler">
    </div>
</template>

<script>
    export default {
        name: 'ImageUpload',
        inject: [ 'editorInstance', 'isApple' ],
        methods: {
            clickHandler() {
                this.$refs.file.click();
            },
            imageUploadHandler(e) {
                const file = e.target.files[0]
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    const image = new Image()
                    const value = fileReader.result
                    image.src = value.toString()
                    image.onload = () => {
                        this.editorInstance().command.executeImage({
                            value,
                            width: image.width,
                            height: image.height
                        })
                        this.$refs.file.value = ''
                    }
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
