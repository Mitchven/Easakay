<template>
    <div fixed="top">
     <b-navbar toggleable="lg" type="dark" variant="success">
    <router-link to="/"><b-navbar-brand id="Logotext">Easakay</b-navbar-brand></router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

       <b-nav 
            @click="redirect('/Login')"
            v-if="!this.$store.getters.isLoggedIn"
            id="text"
            type="button"
            class="ml-auto"
          ><b-button variant="success">Login</b-button></b-nav>
          <b-nav
            @click="redirect('/Register')"
            v-if="!this.$store.getters.isLoggedIn"
            type="button"
          ><b-button variant="success"> Register </b-button></b-nav>
    </b-collapse>
      <!-- Right aligned nav items -->
     </b-navbar>
  </div>
</template>

