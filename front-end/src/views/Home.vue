<template>
  <div class="home">
    <h1>Welcome to Teddy Creations!</h1>
    <img alt="Teddy logo" src="../assets/Teddy1.jpg" />
    <div>
      <h2>What is your name?</h2>
      <div id="projects">
        <button v-for="user in users" :key="user.id" @click="selectUser(user)">{{user.name}}</button>
      </div>
      <form @submit.prevent="addUser">
        <label>Your Name</label>
        <input v-model="userName" type="text" />
        <p></p>
        <button type="submit" key="name">Create New User</button>
      </form>
      <p></p>
      <button @click="deleteUser(user)" type="submit">Delete User</button>
    </div>

    <div>
      <h2>Build your own Teddy!</h2>
    </div>
    <p>
      <label for="name">Teddy's Name</label>
      <input id="name" v-model="name" type="text" name="name" />
    </p>
    <p>
      <label for="age">Teddy's Age</label>
      <input id="age" v-model="age" type="number" name="age" min="0" />
    </p>

    <p>
      <label for="gender">Teddy's Gender</label>
      <select v-model="gender">
        <option>Male</option>
        <option>Female</option>
      </select>
    </p>
    <p>
      <label for="image">Image</label>
      <select v-model="image" name="image">
        <option v-for="image in images" :key="image">{{image}}</option>
      </select>
    </p>

    <p>
      <!-- clidk = upload -->
      <input v-on:click="addItem1" type="submit" value="Add a New Teddy" />
    </p>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      images: [
        "Boy1.jpg",
        "Boy2.jpg",
        "Boy3.jpg",
        "Girl1.jpg",
        "Girl2.jpg",
        "Girl3.jpg"
      ],
      name: "",
      file: null,
      addItem: null,
      teddys: [],
      age: "",
      image: "",
      gender: "",
      userName: "",
      users: [],
      user: null
    };
  },

  components: {},
  created() {
    this.getUsers();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    selectUser(user) {
      this.user = user;
      this.getItems();
    },
    async addUser() {
      try {
        await axios.post("/api/users", {
          name: this.userName
        });
        await this.getUsers();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(user) {
      try {
        await axios.delete(`/api/users/${this.user._id}`);
        this.findItem = null;
        this.getItem1();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    //I keep getting a get error when I delete the user
    //Kind of helps.. not error log but button stays
    async getItem1() {
      try {
        const response = await axios.get(`/api/users`);
        this.teddys = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        const response = await axios.get("/api/users");
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadUser() {
      try {
        let r1 = await axios.post("/api/users", {
          userName: this.userName
        });
        this.addUser = r1.data;
      } catch (error) {
        console.log(error);
      }
    },

    async upload() {
      try {
        let r2 = await axios.post("/api/teddy", {
          name: this.name,
          age: this.age,
          image: this.image,
          gender: this.gender
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addItem1() {
      try {
        await axios.post(`/api/users/${this.user._id}/teddys`, {
          name: this.name,
          age: this.age,
          image: this.image,
          gender: this.gender
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        const response = await axios.get(`/api/users/${this.user._id}/teddys`);
        this.teddys = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>


<style>
img {
  width: 100%;
}
</style>