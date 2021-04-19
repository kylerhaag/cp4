<template>
  <div class="home">
    <h1>Welcome to Teddy Creations!</h1>
    <img alt="Teddy logo" src="../assets/Teddy1.jpg" />
    <div>
      <h2>Don't have an account?</h2>
      <div class="hero">
        <div class="heroBox">
          <form class="pure-form">
            <fieldset>
              <legend>Register for an account</legend>
              <input placeholder="first name" v-model="firstName" />
              <input placeholder="last name" v-model="lastName" />
            </fieldset>
            <fieldset>
              <input placeholder="username" v-model="username" />
              <input type="password" placeholder="password" v-model="password" />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                class="pure-button pure-button-primary"
                @click.prevent="register"
              >Create New Account</button>
            </fieldset>
          </form>
          <p v-if="error" class="error">{{error}}</p>
        </div>
      </div>
      <!-- <div id="projects">
        <button v-for="user in users" :key="user.id" @click="selectUser(user)">{{user.name}}</button>
      </div>-->
      <!-- <form @submit.prevent="addUser">
        <label>First Name</label>
        <input v-model="firstName" type="text" />
        <p></p>
        <label>Last Name</label>
        <input v-model="lastName" type="text" />
        <p></p>
        <label>Username</label>
        <input v-model="userName" type="text" />
        <p></p>
        <label>Password</label>
        <input v-model="password" type="password" />
        <p></p>
        <button type="submit" key="name">Create New User</button>
      </form>
      <p></p>-->
      <h2>
        Already have an account?
        <a href="/Teddy">Login!</a>
      </h2>

      <!-- <label>Username</label>
      <input v-model="userName" type="text" />
      <p></p>
      <label>Password</label>
      <input v-model="password" type="password" />
      <p></p>
      <button @click="deleteUser(user)" type="submit">Login</button>
      <p></p>
      <button @click="deleteUser(user)" type="submit">Delete User</button>-->
    </div>
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
      user: null,

      error: "",
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    };
  },

  components: {},
  created() {
    this.getUsers();
  },
  methods: {
    async register() {
      this.error = "";
      this.errorLogin = "";
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post("/api/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
      //How to link to other page when correct register?
    },

    ////////
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
        await this.getUsers();
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