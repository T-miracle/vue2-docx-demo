<template>
    <div class="menu-item">
        <div
            ref="search"
            class="menu-item__search"
            data-menu="search"
            :title="`搜索与替换(${isApple() ? '⌘' : 'Ctrl'}+F)`"
            @click="clickHandler"
        >
            <i></i>
        </div>
        <div
            ref="searchCollapse"
            class="menu-item__search__collapse"
            data-menu="search"
        >
            <div class="menu-item__search__collapse__search">
                <input ref="searchInput" type="text" @input="searchInputHandler" @keydown="searchInputKeydownHandler"/>
                <label ref="searchResult" class="search-result"></label>
                <div class="arrow-left" @click="searchCollapseArrowLeftClickHandler">
                    <i></i>
                </div>
                <div class="arrow-right" @click="searchCollapseArrowRightClickHandler">
                    <i></i>
                </div>
                <span @click="searchCollapseCloseClickHandler">×</span>
            </div>
            <div class="menu-item__search__collapse__replace">
                <input ref="replaceInput" type="text"/>
                <button @click="searchCollapseReplaceClickHandler">替换</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { eventBus, EVENTS } from '@/components/VueCanvasEditor/eventBus';

    export default {
        name: 'Search',
        inject: [ 'editorInstance', 'isApple' ],
        created() {
            eventBus.$on(EVENTS.SEARCH_BY_TEXT, this.searchByText);
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.SEARCH_BY_TEXT, this.searchByText);
        },
        methods: {
            clickHandler() {
                const searchDom = this.$refs.search;
                const searchCollapseDom = this.$refs.searchCollapse;
                const searchInputDom = this.$refs.searchInput;

                searchCollapseDom.style.display = 'block';
                const bodyRect = document.body.getBoundingClientRect();
                const searchRect = searchDom.getBoundingClientRect();
                const searchCollapseRect = searchCollapseDom.getBoundingClientRect();
                if (searchRect.left + searchCollapseRect.width > bodyRect.width) {
                    searchCollapseDom.style.right = '0px';
                    searchCollapseDom.style.left = 'unset';
                } else {
                    searchCollapseDom.style.right = 'unset';
                }
                searchInputDom.focus();
            },
            searchByText(text) {
                const instance = this.editorInstance();
                const searchInputDom = this.$refs.searchInput;
                this.clickHandler();
                if (text) {
                    searchInputDom.value = text
                    instance.command.executeSearch(text)
                    this.setSearchResult()
                }
            },
            setSearchResult() {
                const instance = this.editorInstance();
                const searchResultDom = this.$refs.searchResult;
                const result = instance.command.getSearchNavigateInfo();
                if (result) {
                    const { index, count } = result;
                    searchResultDom.innerText = `${ index }/${ count }`;
                } else {
                    searchResultDom.innerText = '';
                }
            },
            searchCollapseCloseClickHandler() {
                const instance = this.editorInstance();
                const searchCollapseDom = this.$refs.searchCollapse;
                const searchInputDom = this.$refs.searchInput;
                const replaceInputDom = this.$refs.replaceInput;

                searchCollapseDom.style.display = 'none';
                searchInputDom.value = '';
                replaceInputDom.value = '';
                instance.command.executeSearch(null);
                this.setSearchResult();
            },
            searchInputHandler() {
                const instance = this.editorInstance();
                const searchInputDom = this.$refs.searchInput;
                instance.command.executeSearch(searchInputDom.value || null)
                this.setSearchResult()
            },
            searchInputKeydownHandler(evt) {
                if (evt.key === 'Enter') {
                    const instance = this.editorInstance();
                    const searchInputDom = this.$refs.searchInput;
                    instance.command.executeSearch(searchInputDom.value || null)
                    this.setSearchResult()
                }
            },
            searchCollapseReplaceClickHandler() {
                const instance = this.editorInstance();
                const searchInputDom = this.$refs.searchInput;
                const replaceInputDom = this.$refs.replaceInput;

                const searchValue = searchInputDom.value
                const replaceValue = replaceInputDom.value
                if (searchValue && searchValue !== replaceValue) {
                    instance.command.executeReplace(replaceValue)
                }
            },
            searchCollapseArrowLeftClickHandler() {
                const instance = this.editorInstance();
                instance.command.executeSearchNavigatePre()
                this.setSearchResult()
            },
            searchCollapseArrowRightClickHandler() {
                const instance = this.editorInstance();
                instance.command.executeSearchNavigateNext()
                this.setSearchResult()
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
