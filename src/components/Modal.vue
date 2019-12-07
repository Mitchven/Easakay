<template>
  <!-- <transition name="modal"> @ok="$emit('book')"-->
  <b-modal
    :visible="showModal"
    no-close-on-backdrop
    size="xl"
    ok
    cancel
    ok-variant="outline-success"
    cancel-variant="outline-danger"
    ok-title="RESERVE"
    cancel-title="CANCEL"
    @hide="$emit('close')"
    @ok="book"
  >
    <div
      id="image2"
      class="min-h-screen bg-grey bg-cover flex items-end block md:fixed w-full md:w-1/2 shadow-md"
      :style="{ backgroundImage: `url(${imageHost + bus.image})` }"
    >
      <center>
        <b-img :src="imageHost+bus.image2" id="driver"></b-img>
        <div class="borderText">
          <h3>{{ bus.plateNumber }} . {{bus.busType}}</h3>
        </div>
      </center>
    </div>
    <br>
    <div class="bv-example-row" id="jumbo1" bg-variant="white" text-variant="black">
      <b-row>
        <div class="col-sm-2">
          <h2 style="font-size:150%;text-align:center">{{ bus.name }}</h2>
          <hr>
          <h5 style="text-align:center">{{ bus.departureTime}}</h5>
          <b-img id="image1" thumbnail fluid :src="imageHost+bus.image1" alt="Image 1"></b-img>
          <h5 style="text-align:center">{{bus.arrivalTime}}</h5>
        </div>
        <div class="col-sm-7">
          <br>
          <br>
          <br>
          <br>
          <p>
            From: {{bus.busRoute.from}}
            <br>
            <br>
            Address: {{bus.busRoute.address}}
            <br>
            <br>
            To: {{bus.busRoute.to}}
          </p>
        </div>
        <div class="col-sm-2">
          <h5 class="text-center" v-if="start >= 0">{{ start }} Available Seats</h5>
          <h5 class="text-center" v-else>No Availble Seats</h5>
          <hr>
        </div>
      </b-row>
    </div>

    <br>
    <div class="bv-example-row" id="jumbo1" bg-variant="white" text-variant="black">
      <b-row>
        <b-col sm="2">
          <p>Passengers</p>
          <b-form-select
            variant="outline-success"
            aria-labelledby="dropdownMenuButton"
            v-model="selectedItem"
          >
            <option value="Adult">Adult</option>
            <option value="Senior Citizen">Senior Citizen</option>
            <option value="Student">Student</option>
          </b-form-select>
        </b-col>
        <div class="col-sm-3">
          <p>Number of Passengers</p>
          <b-input-group>
            <b-input-group-prepend>
              <b-btn variant="outline-success" @click="decrement()">-</b-btn>
            </b-input-group-prepend>
            <b-form-input type="number" min="0.00" v-model="num"></b-form-input>
            <b-input-group-append>
              <b-btn variant="outline-success" @click="increment()">+</b-btn>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="col-sm-5">
          <p>{{ bus.fare }}</p>
        </div>
        <div class="col-sm-2">
          <router-link to="/RouterDetails">{{ bus.rlink }}</router-link>
        </div>
      </b-row>
    </div>
  </b-modal>
  <!-- </transition> -->
</template>

<script>
import axios from "axios";
export default {
  name: "Modal",
  data() {
    return {
      selectedItem: "",
      num: 0,
      mystart: this.bus.availableSeats,
      imageHost: "http://localhost:8082"
    };
  },
  // props: ["value", "bus"],
  props: {
    showModal: Boolean,
    bus: Object
  },
  mounted() {
    this.test = this.showModal;
    this.start = this.bus.availableSeats
  },
  computed:{
    start:{
      get: function() {
        return this.mystart -  this.num
      },
      set: function (){
        //console.log("ok")
      }
    }
  },
  methods: {
    // handle() {
    //   this.bus.availableSeats -= this.num;
    // },
    //  notify(){
    //         this.$socket.emit("notification", {username: localStorage.getItem("username")});
    //     },
    increment() {
      //console.log("bus: ",this.bus)
      if (this.start > 0) {
        this.num++;
        this.bus.availableSeats--;
      }
    },
    decrement() {
      if (this.bus.availableSeats < 56) {
        if(this.num === 1) {
          alert("Negative number is not allowed");
        }else{
        this.num--;
        this.bus.availableSeats++;
      }
      }
      // if (this.num === 1) {
      //   alert("Negative number is not allowed");
      // } else {
      //   this.num--;
      // }
    },
    book() {
      axios
        .post("http://localhost:8082/notify", {
          username: localStorage.getItem("username"),
          bus: this.bus,
          id: this.bus.bus_id,
          availseats: this.num
        })
        .then(resp => {
          console.log(resp);
        });
      // this.$socket.emit("notification", {
      //   username: localStorage.getItem("username")
      // });
      // console.log("BOOK TODO");
    }
  }

  // methods: {

  // },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.modal-container {
  width: 500px;
  margin: 40px auto 0;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.text-right {
  text-align: right;
}
.form-label {
  display: block;
  margin-bottom: 1em;
}
.form-label > .form-control {
  margin-top: 0.5em;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
#image {
  height: 50%;
  width: 100%;
}
#image2 {
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}

#driver {
  margin-top: 10%;
  border-radius: 50%;
}
.borderText {
  background-color: rgba(255, 255, 255, 0.5);
  width: 25vh;
  height: 5vh;
}
</style>