<template>
  <div fixed="top">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <router-link to="/">
        <b-navbar-brand id="Logotext">Easakay</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-nav
          @click="redirect('/Login')"
          v-if="!this.$store.getters.isLoggedIn"
          id="text"
          type="button"
          class="ml-auto"
        >
          <b-button variant="success">Login</b-button>
        </b-nav>&nbsp;
        <b-nav @click="redirect('/Register')" v-if="!this.$store.getters.isLoggedIn" type="button">
          <b-button variant="success">Register</b-button>
        </b-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="this.$store.getters.isLoggedIn">
          <b-nav-item v-b-popover.hover.top @click="goToHome" title="Home">
            <i class="fas fa-home fa-lg"></i>
          </b-nav-item>
          <b-nav-item>
            <i
              class="fas fa-map-marker-alt fa-lg"
              v-b-popover.hover.top
              @click="redirect('/googlemap')"
              title="Track Location"
            ></i>
          </b-nav-item>
          <b-nav-item>
            <i
              class="fas fa-bell fa-lg"
              v-b-popover.hover.top
              @click="showModal"
              title="Notification"
            ></i>
            <span v-if="storeArray.length != 0" class="red">{{storeArray.length}}</span>
            <!-- <i class="fas fa-bell fa-lg"  v-b-popover.hover.top="" @click="notification" title="Notification"></i><span v-if="store !=''" class="red">{{storeArray.length}}</span> -->
          </b-nav-item>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <i class="fas fa-user fa-lg"></i>
            </template>
            <b-dropdown-item href="#">
              <router-link to="/PersonalInfo">Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal ref="myModalRef" id="modal-scrollable" scrollable title="Easakay Notification" ok-only>
      <div v-if="storeArray.length == 0">
        <center>
          <h2>No Notification</h2>
        </center>
      </div>
      <div v-else>
        <ul v-for="(item,i) in storeArray" :key="i">
          <li>
            <p>{{item.message}} at {{item.bus.name}}</p>
            <p>Departure Time: {{item.bus.departureTime}}</p>
            <p>Destination: {{item.bus.busRoute.from}} - {{item.bus.busRoute.to}}</p>
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import io from "socket.io-client";
var socket = io.connect("http://localhost:8082");
// var today = new Date();
// var time =
//   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
export default {
  data() {
    return {
      auth: true,
      store: "",
      storeArray: []
    };
  },
  created() {
    this.onNotify();
  },
  methods: {
    redirect(route) {
      this.$router.push(route);
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    showModal: function() {
      this.$refs.myModalRef.show();
    },
    goToHome() {
      this.$router.push("/dashboard");
    },
    passdata(data) {
      this.storeArray.push(data);
      // this.store = "";
      // this.storeArray.forEach(each => {
      //   this.store += each;
      // });
      // //this.store = data.message
    },
    onNotify() {
      socket.on("channel." + localStorage.getItem("username"), data => {
        this.passdata(data);
      });
    },
    // notification() {
    //   // Use a shorter name for this.$createElement
    //   const h = this.$createElement;
    //   // Increment the toast count
    //   // this.count++;
    //   // Create the message
    //   const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
    //     h("b-spinner", { props: { type: "grow", small: true } }),
    //     // " Flashy ",
    //     h("strong", this.store),
    //     // ` message #${this.count} `,
    //     h("b-spinner", { props: { type: "grow", small: true } })
    //   ]);
    //   // Create the title
    //   const vNodesTitle = h(
    //     "div",
    //     { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
    //     [
    //       h("strong", { class: "mr-2" }, "Easakay"),
    //       h("small", { class: "ml-auto text-italics" }, time)
    //     ]
    //   );
    //   // Pass the VNodes as an array for message and title
    //   this.$bvToast.toast([vNodesMsg], {
    //     title: [vNodesTitle],
    //     solid: true,
    //     variant: "info"
    //   });
    // }
    //   ,created(){
    //   axios({url: 'http://localhost:8082/posts', method: 'GET' })
    // 			.then(resp => {
    //           // console.log(resp.data.buses);
    //           this.pusher = resp.data.pusher;
    // 			})
    // 			.catch(err => {
    // 				console.log(err)
    // 			})
    // }
  }
};
</script>


<style scoped >
/* // @import "assets/style.scss"; */
#no {
  color: white;
  margin-top: -2%;
  margin-left: 96%;
}
#not {
  color: white;
  margin-top: -2%;
  margin-left: 86%;
}
#user {
  margin-top: -2%;
  margin-left: 95%;
  color: white;
}
#a {
  color: aliceblue;
}
#tr {
  color: white;
  margin-left: 75%;
  margin-top: -2%;
}
#home {
  color: white;
  margin-left: 60%;
  margin-top: 1%;
}
#tl {
  margin-right: 1000px;
  color: white;
}
/* #text {
  color: white;
  font-size: 15px;
} */
.card-header tabs {
  padding-bottom: 50%;
  padding-top: 50%;
}
#Logotext {
  color: white;
  font-size: 20px;
  font-style: Impact, Charcoal, sans-serif;
}
.red {
  color:red;
}
/* .myclass {
  position: absolute !important;
  top: -10px !important;
  left: -10px !important;
  background-color: yellow !important;
}

.myclass {
  background-color: red !important;
} */
</style>s