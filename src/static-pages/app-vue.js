/* for route src/ejs-templates/test-vue */

const apiUrl = "/api/servers";

const App = {
  data() {
    return {
      servers: [],
      name: "",
    };
  },
  async mounted() {
    const response = await fetch(apiUrl);
    this.servers = await response.json();
  },
  methods: {
    async createServer() {
      const data = {
        name: this.name,
        status: "created",
      };

      this.name = "";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const newServer = await response.json();
      this.servers.push(newServer);
    },

    async remove(id) {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      this.servers = this.servers.filter((s) => s.id !== id);
    },
  },
};

Vue.createApp(App).mount("#app-vue");
