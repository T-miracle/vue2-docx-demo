<template>
    <div class="footer" editor-component="footer">
        <div class="page-info">
            <CatalogMode></CatalogMode>
            <PageMode></PageMode>
            <PageNoList></PageNoList>
            <PageNo></PageNo>
            <WordCount></WordCount>
            <RowNo></RowNo>
            <ColNo></ColNo>
        </div>
        <EditorMode></EditorMode>
        <div>
            <PageScaleMinus></PageScaleMinus>
            <PageScalePercentage></PageScalePercentage>
            <PageScaleAdd></PageScaleAdd>
            <PagerSize></PagerSize>
            <PagerDirection></PagerDirection>
            <PagerMargin></PagerMargin>
            <Fullscreen></Fullscreen>
            <EditorOption></EditorOption>
        </div>
    </div>
</template>

<script>
    import CatalogMode from './components/catalogMode/index.vue';
    import PageMode from './components/pageMode/index.vue';
    import WordCount from './components/wordCount/index.vue';
    import PageNoList from './components/pageNoList/index.vue';
    import PageNo from './components/pageNo/index.vue';
    import RowNo from './components/rowNo/index.vue';
    import ColNo from './components/colNo/index.vue';
    import EditorMode from './components/editorMode/index.vue';
    import PageScaleMinus from './components/pageScaleMinus/index.vue';
    import PageScalePercentage from './components/pageScalePercentage/index.vue';
    import PageScaleAdd from './components/pageScaleAdd/index.vue';
    import PagerSize from './components/paperSize/index.vue';
    import PagerDirection from './components/paperDirection/index.vue';
    import PagerMargin from './components/paperMargin/index.vue';
    import Fullscreen from './components/fullscreen/index.vue';
    import EditorOption from './components/editorOption/index.vue';

    export default {
        name: 'Footer',
        components: {
            EditorOption,
            Fullscreen,
            PagerMargin,
            PagerDirection,
            PagerSize,
            PageScaleAdd,
            PageScalePercentage,
            PageScaleMinus,
            EditorMode,
            ColNo,
            RowNo,
            PageNo,
            PageNoList,
            WordCount,
            PageMode,
            CatalogMode
        }
    };
</script>

<style scoped lang="scss">
    .page-info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
    }
</style>
