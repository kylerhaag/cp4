<template>
  <div class="teddy">
    <MyTeddys v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
import axios from "axios";
import MyTeddys from "@/components/MyTeddys.vue";
import Login from "@/components/Login.vue";
// @ is an alias to /src
export default {
  name: "Teddy",
  components: {
    MyTeddys,
    Login
  },
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
};
</script>
<style scoped>
.teddy {
  padding-top: 10px;
}
img {
  width: 60%;
}
</style>
