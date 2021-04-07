<template>
  <div class="home">
    <button v-for="user in users" :key="user.id" @click="selectUser(user)">{{user.name}}</button>

    <h2>Look at your Teddies</h2>
    <div v-for="teddy in teddys" :key="teddy.name">
      <h3>This is {{teddy.name}}</h3>
      <h3 v-if="teddy.gender == 'Female'">She is {{teddy.age}} years old</h3>
      <h3 v-else>He is {{teddy.age}} years old</h3>

      <img alt :src="'/images/' + teddy.image" />
      <p></p>
      <button @click="deleteItem(teddy)">Remove Teddy</button>
      <p></p>
      <button @click="openEdits(teddy)">Edit Teddy's characteristics</button>
      <p></p>
      <div v-if="edits == true">
        <label for="name">Teddy's New Name</label>
        <input v-model="name" type="text" placeholder="name" />
        <p></p>
        <label for="age">Teddy's New Age</label>
        <input v-model="age" type="number" min="0" />
        <p></p>
        <button @click="completeEdits(teddy)">Complete Edits</button>
      </div>
    </div>
    <p></p>
  </div>
</template>




<script>
import axios from "axios";

// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      teddys: [],
      findItem: null,
      edits: false,
      name: "",
      age: "",
      userName: "",
      users: [],
      user: null
    };
  },
  created() {
    this.getItems();
  },
  created() {
    this.getUsers();
  },

  components: {},
  methods: {
    async getUsers() {
      try {
        const response = await axios.get("/api/users");
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    openEdits(item) {
      this.edits = true;
    },
    selectUser(user) {
      this.user = user;
      this.getItems();
    },
    async completeEdits(item) {
      this.edits = false;
      try {
        await axios.put("/api/teddy/" + item._id, {
          name: this.name,
          age: this.age
        });

        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    // async getItems() {
    //   try {
    //     let response = await axios.get("/api/teddys");
    //     this.teddys = response.data;
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getItems() {
      try {
        const response = await axios.get(`/api/users/${this.user._id}/teddys`);
        this.teddys = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/teddy/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
img {
  width: 50%;
}
</style>