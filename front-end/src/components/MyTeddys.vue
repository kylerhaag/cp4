

  <template>
  <div class="main">
    <div class="menu">
      <p></p>
      <h2>
        {{user.firstName}} {{user.lastName}}
        <button @click="logout">Logout</button>
      </h2>
    </div>
    <div>
      <h2>Build A Teddy!</h2>
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
    <div v-if="teddys.length">
      <hr />
      <h2>Your Teddys!</h2>
    </div>
    <p>
      <!-- clidk = upload -->
      <input v-on:click="addItem1" type="submit" value="Add a New Teddy" />
    </p>
    <!-- Display teddys -->
    <div class="home">
      <div>
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
      </div>
      <p></p>
    </div>
  </div>
</template>

<script>
import Teddy from "../views/Teddy.vue";

import axios from "axios";
export default {
  name: "Myteddys",
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
      edits: false
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  components: {},
  created() {
    this.getItems();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
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
        await axios.post(`/api/teddys`, {
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
        const response = await axios.get(`/api/teddys`);
        this.teddys = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(teddy) {
      try {
        await axios.delete(`/api/teddys/${teddy._id}`);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async completeEdits(teddy) {
      this.edits = false;
      try {
        await axios.put(`/api/teddys/${teddy._id}`, {
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
    openEdits(item) {
      this.edits = true;
    }
  }
};
</script>


<style scoped>
.menu {
  display: flex;
  justify-content: left;
  background-color: #343a40;
  color: #fff5a5;
  padding-left: 20px;
}

.menu h2 {
  font-size: 16px;
}
img {
  width: 50%;
}
</style>
