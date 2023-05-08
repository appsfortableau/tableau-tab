import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {
  views: [],
};

const mutations = {
  ADD_TABLEAU_VIEW({ views }, args) {
    if (!args) {
      args = {};
    }

    let newIndex = 0;
    if (views.length > 0) {
      newIndex = Math.max(...Object.entries(views).map(x => x[1].grid.i)) + 1;
    }
    views.push({
      title: '',
      index: views.length,
      config: {
        url: '',
        hideTitle: false,
        settings: {
          tabs: 'no',
          toolbar: 'no',
          tooltip: 'no',
        },
      },
      grid: { x: 0, y: 0, w: 5, h: 7, i: newIndex },
      ...args,
    });
  },
  UPDATE_TABLEAU_VIEW({ views }, { config, i }) {
    const viewIndex = views.findIndex(view => view.grid.i === i);
    views[viewIndex].config = config;
  },
  UPDATE_TABLEAU_VIEW_GRID({ views }, { grid, i }) {
    const viewIndex = views.findIndex(view => view.grid.i === i);

    let currentView = views[viewIndex].grid || {};
    views[viewIndex].grid = { ...currentView, ...grid };
  },
  DELETE_TABLEAU_VIEW({ views }, { i }) {
    views.splice(i, 1);

    for (let x in views) {
      views[i].grid.i = x;
    }
  },
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations,
});
