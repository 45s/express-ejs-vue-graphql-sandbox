/* for route src/ejs-templates/test-vue */

const App = {
  data() {
    return {
      servers: [],
    };
  },
  async mounted() {
    const response = await fetch("/api/servers");
    this.servers = await response.json();
  },
};

Vue.createApp(App).mount("#app-vue");
