<template>
  <div id="app">
    <header class="header">
      <div>
        <img
          class="logo logo--larger"
          src="https://appsfortableau.infotopics.com/wp-content/uploads/2020/10/Infotopics-Apps-for-Tableau-logo-275x100-1.svg"
          alt="Apps for Tableau"
        />
      </div>

      <div class="header-actions">
        <button class="icon-btn" @click="newTableauView">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add</span>
        </button>
      </div>
    </header>

    <div
      style="margin: 0 10px; padding: 10px 0; text-align: center"
      v-if="layoutViews.length === 0"
    >
      There are no embeds defined, you can add them by clicking on top-right
      corner "add" button.
    </div>
    <div
      v-if="layoutViews.length === 0"
      style="position: fixed; bottom: 0; width: 60%; height: auto; right: 0;"
    >
      <img
        style="width: 100%; height: auto; margin-bottom: -60%;"
        src="https://appsfortableau.infotopics.com/wp-content/uploads/2023/02/unnamed-file-3.png"
      />
    </div>

    <grid-layout
      :layout="layoutViews"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :responsive="true"
      class="container"
    >
      <grid-item
        v-for="(view, i) in views"
        class="pane"
        :x="view.grid.x"
        :y="view.grid.y"
        :w="view.grid.w"
        :h="view.grid.h"
        :i="view.grid.i"
        :key="i"
        @resized="resizedEvent"
        @moved="movedEvent"
      >
        <tableau-view
          :key="i"
          :title="view.title ? view.title : undefined"
          :index="i"
          @title="view.title = $event"
          :config="view.config"
          :grid="view.grid"
        ></tableau-view>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout';
import TableauView from './components/TableauView';

export default {
  name: 'App',
  components: {
    TableauView,
    GridLayout,
    GridItem,
  },
  computed: {
    views() {
      return this.$store.state.views;
    },
    layoutViews() {
      return this.views.map(view => view.grid);
    },
  },
  methods: {
    newTableauView() {
      this.$store.commit('ADD_TABLEAU_VIEW');
    },
    resizedEvent(i, newH, newW) {
      console.log('resized', i, newH, newW);
      this.$store.commit('UPDATE_TABLEAU_VIEW_GRID', {
        i,
        grid: { h: newH, w: newW },
      });
    },
    movedEvent(i, newX, newY) {
      console.log('moved', i, newX, newY);
      this.$store.commit('UPDATE_TABLEAU_VIEW_GRID', {
        i,
        grid: { x: newX, y: newY },
      });
    },
  },
};
</script>

<style scoped lang="scss">
body,
#app {
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-actions {
    padding: 0 var(--spacing-x);
  }
}
</style>
