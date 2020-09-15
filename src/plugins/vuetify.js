import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#264653",
        secondary: "#2A9D8F",
		accent: "#E9C46A",
		info: "#F4A261",
        error: "#E76F51",
      },
    },
  },
});
