<template>
  <div class="pane-content">
    <tableau-dialog v-model="dialog" :title="title" :center="true">
      <div class="group">
        <label>Title</label>
        <input
          type="text"
          class="outline"
          v-model="viewTitle"
          @input="$emit('title', $event.target.value)"
          @keypress.enter="$emit('title', $event.target.value)"
        />
      </div>

      <div class="group">
        <label>Hide title</label>
        <div class="radio-inline">
          <label>
            <input
              type="radio"
              name="hideTitle"
              class="outline"
              v-model="form.hideTitle"
              :value="true"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hideTitle"
              class="outline"
              v-model="form.hideTitle"
              :value="false"
            />
            No
          </label>
        </div>
      </div>

      <div class="group">
        <label>URL</label>
        <input
          type="text"
          name="url"
          class="outline"
          :value="config.url || url"
          @input="url = $event.target.value"
        />
      </div>

      <div class="group">
        <label>Tabs</label>
        <div class="radio-inline">
          <label>
            <input
              type="radio"
              name="tabs"
              class="outline"
              v-model="form.settings.tabs"
              value="yes"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="tabs"
              class="outline"
              v-model="form.settings.tabs"
              value="no"
            />
            No
          </label>
        </div>
      </div>

      <div class="group">
        <label>Toolbar</label>
        <div class="radio-inline">
          <label>
            <input
              type="radio"
              name="toolbar"
              class="outline"
              v-model="form.settings.toolbar"
              value="yes"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="toolbar"
              class="outline"
              v-model="form.settings.toolbar"
              value="no"
            />
            No
          </label>
          <label>
            <input
              type="radio"
              name="toolbar"
              class="outline"
              v-model="form.settings.toolbar"
              value="top"
            />
            Top
          </label>
        </div>
      </div>

      <div class="group">
        <label>Tooltip</label>
        <div class="radio-inline">
          <label>
            <input
              type="radio"
              name="tooltip"
              class="outline"
              v-model="form.settings.tooltip"
              value="yes"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="tooltip"
              class="outline"
              v-model="form.settings.tooltip"
              value="no"
            />
            No
          </label>
        </div>
      </div>

      <div class="actions">
        <button class="button" @click.prevent="applyChanges">
          Apply
        </button>

        <button class="button attention" @click.prevent="deleteView">
          Delete
        </button>
      </div>
    </tableau-dialog>

    <div class="pane-head">
      <h3
        class="pane-title"
        v-if="!form.hideTitle && title.length > 0 && showEmbed"
        v-text="title"
      ></h3>

      <button
        @click.prevent="dialog = !dialog"
        class="icon-btn"
        :class="{
          floating: form.hideTitle || title.length === 0 || !showEmbed,
        }"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
      </button>
    </div>

    <iframe
      class="iframe"
      v-if="showEmbed"
      :src="previewUrl"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import TableauDialog from './Dialog';

// Sheet: https://eu-west-1a.online.tableau.com/t/infotopicsonline/views/Gender/Sheet1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link
// Dashboard: https://eu-west-1a.online.tableau.com/t/infotopicsonline/views/AdminInsightsStarter/Overview?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link

export default {
  name: 'TableauView',
  components: {
    TableauDialog,
  },
  props: {
    title: {
      type: String,
      default: 'Tableau embed view',
    },
    index: {
      type: Number,
      default: 0,
    },
    config: {
      type: Object,
      default: () => ({
        url: '',
        config: {
          toolbar: false,
        },
      }),
    },
  },
  mounted() {
    this.viewTitle = this.title;
  },
  watch: {
    url(u) {
      if (!u || u.length === 0) {
        return;
      }
      const orgUrl = new URL(
        u
          .replace('/#/site', '')
          .replace('t/', '')
          .trim()
      );

      const origin = orgUrl.origin;
      let site = '';
      let dash = orgUrl.pathname.replace(/^\//, '');
      if (origin.includes('public')) {
        dash = dash.replace(/^\/views\//, '');
      } else {
        const sp = dash.split('/views/');
        site = sp[0];
        dash = sp[1];
      }

      this.form.url = [origin, site ? `t/${site}/views` : null, dash]
        .filter(x => x)
        .join('/');
    },
  },
  data: () => ({
    dialog: false,
    viewTitle: '',
    url: '', // will be parsed
    form: {
      url: '',
      hideTitle: false,
      settings: {
        tabs: 'no',
        toolbar: 'no',
        tooltip: 'no',
      },
    },
  }),
  computed: {
    showEmbed() {
      return this.config.url && this.config.url.length > 4;
    },
    previewUrl() {
      const { url } = this.config;

      const defaultParameters = {
        embed: 'yes',
        showAppBanner: 'no',
        display_count: 'n',
        showVizHome: 'n',
        origin: 'viz_share_link',
        showShareOptions: false,
        ...this.form.settings,
      };

      return `${url}?` + this.parseQueryString(defaultParameters);
    },
  },
  methods: {
    applyChanges() {
      this.$store.commit('UPDATE_TABLEAU_VIEW', {
        config: this.form,
        i: this.index,
      });
      this.$emit('input', this.form);

      this.dialog = false;
    },
    parseQueryString(params) {
      return Object.entries(params)
        .filter(x => x)
        .map(param => ((param[0] = ':' + param[0]), param.join('=')))
        .join('&');
    },
    deleteView() {
      this.$store.commit('DELETE_TABLEAU_VIEW', { i: this.index });
    },
  },
};
</script>

<style lang="scss" scoped>
.iframe {
  display: flex;
  width: 100%;
  height: 100%;
}

.icon-btn {
  display: inline-block;
  position: relative;
  &.floating {
    position: absolute;
    right: 0;
    top: 0;
  }
  z-index: 10;
}

.actions {
  margin: var(--spacing-y) -5px 0 -5px;
  > * {
    margin: 0 5px;
  }
}

.pane {
  &-head {
    margin-bottom: var(--spacing-y);
  }
  &-title {
    display: inline-block;
    margin: 0;
    font-weight: normal;
    margin-right: 10px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
  }
}

.radio-inline {
  display: flex;
  margin: 0 -5px;
  > label {
    padding: 0 5px;
  }
}
</style>
