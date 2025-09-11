<template>
    <div ref="catalog" class="catalog" editor-component="catalog">
        <div class="catalog__header">
            <span>目录</span>
            <div class="catalog__header__close" @click="switchCatalog">
                <i></i>
            </div>
        </div>
        <div ref="catalogMain" class="catalog__main"></div>
    </div>
</template>

<script>
    import { eventBus, EVENTS } from '../../eventBus';
    import { nextTick } from '../../utils/common';

    export default {
        name: 'Catalog',
        inject: [ 'editorInstance' ],
        data() {
            return {
                isCatalogShow: true
            }
        },
        created() {
            eventBus.$on(EVENTS.TOGGLE_CATALOG, this.switchCatalog);
            eventBus.$on(EVENTS.RELOAD_CATALOG, this.reloadCatalog);
        },
        mounted() {
            this.updateCatalog();
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.TOGGLE_CATALOG, this.switchCatalog);
            eventBus.$off(EVENTS.RELOAD_CATALOG, this.reloadCatalog);
        },
        methods: {
            switchCatalog() {
                const catalogDom = this.$refs.catalog;

                this.isCatalogShow = !this.isCatalogShow
                if (this.isCatalogShow) {
                    catalogDom.style.display = 'block'
                    this.updateCatalog()
                } else {
                    catalogDom.style.display = 'none'
                }
            },
            reloadCatalog() {
                if (this.isCatalogShow) {
                    nextTick(() => {
                        this.updateCatalog()
                    })
                }
            },
            async updateCatalog() {
                const instance = this.editorInstance();
                const catalogMainDom = this.$refs.catalogMain;

                const catalog = await instance?.command.getCatalog();
                catalogMainDom.innerHTML = '';
                if (catalog) {
                    this.appendCatalog(catalogMainDom, catalog);
                }
            },
            appendCatalog(parent, catalogItems) {
                const instance = this.editorInstance();

                for (let c = 0; c < catalogItems.length; c++) {
                    const catalogItem = catalogItems[c];
                    const catalogItemDom = document.createElement('div');
                    catalogItemDom.classList.add('catalog-item');
                    // 渲染
                    const catalogItemContentDom = document.createElement('div');
                    catalogItemContentDom.classList.add('catalog-item__content');
                    const catalogItemContentSpanDom = document.createElement('span');
                    catalogItemContentSpanDom.innerText = catalogItem.name;
                    catalogItemContentDom.append(catalogItemContentSpanDom);
                    // 定位
                    catalogItemContentDom.onclick = () => {
                        instance.command.executeLocationCatalog(catalogItem.id);
                    };
                    catalogItemDom.append(catalogItemContentDom);
                    if (catalogItem.subCatalog && catalogItem.subCatalog.length) {
                        this.appendCatalog(catalogItemDom, catalogItem.subCatalog);
                    }
                    // 追加
                    parent.append(catalogItemDom);
                }
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
