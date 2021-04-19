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
  // data() {
  //   return {
  //     teddys: [],
  //     findItem: null,
  //     edits: false,
  //     name: "",
  //     age: "",
  //     userName: "",
  //     users: [],
  //     user: null
  //   };
  // },
  // created() {
  //   this.getItems();
  // },
  // created() {
  //   this.getUsers();
  // },
  // methods: {
  //   async getUsers() {
  //     try {
  //       const response = await axios.get("/api/users");
  //       this.users = response.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   openEdits(item) {
  //     this.edits = true;
  //   },
  //   selectUser(user) {
  //     this.user = user;
  //     this.getItems();
  //   },
  //   async completeEdits(teddy) {
  //     this.edits = false;
  //     try {
  //       await axios.put(`/api/users/${this.user._id}/teddys/${teddy._id}`, {
  //         name: this.name,
  //         age: this.age
  //       });

  //       this.findItem = null;
  //       this.getItems();
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   async getItems() {
  //     try {
  //       const response = await axios.get(`/api/users/${this.user._id}/teddys`);
  //       this.teddys = response.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   async deleteItem(teddy) {
  //     try {
  //       await axios.delete(`/api/users/${this.user._id}/teddys/${teddy._id}`);
  //       this.findItem = null;
  //       this.getItems();
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
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
