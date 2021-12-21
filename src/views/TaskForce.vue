<template>
  <div class="TaskForce">
    <p class="text-sm-center mt-4 teal--text">TaskForce</p>

    <v-container class="my-5">

      <!-- botones para sorting -->

      <v-layout row justify-start class="mb-3">
        <div>
<!--           <v-btn small color="teal lighten-3" class="mx-2" @click="sort('querytitle')">
            <v-icon small left>mdi-sort</v-icon>
            <span class="caption text-lowercase">By Query Name</span>
          </v-btn>
          <v-btn small color="teal lighten-3" class="mx-2" @click="sort('schemas')">
            <v-icon small left>mdi-sort</v-icon>
            <span class="caption text-lowercase">By Schema</span>
          </v-btn>  -->
          <v-btn small color="teal lighten-3" @click.stop="dialog = true">Add New Wo</v-btn>
        </div> 

        <!-- Popup new wo -->

        <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title >Add new WO</v-card-title>

              <v-card-text>
                <v-form class="px-3" ref="form">
                  <v-text-field v-model="wotitle" label="WoTitle" ></v-text-field>
                  <v-text-field v-model="wonumber" label="WoNumber" ></v-text-field>
                  <v-text-field v-model="woassignmentdate" label="WoAssignmentDate" ></v-text-field>
                  <v-text-field v-model="wosizing" label="WoSizing" ></v-text-field>

<!--                   <label for="Soporte" class="ml-2">Soporte</label>
                  <input type="checkbox" id="Soporte" v-model="informacion" value="Soporte" class="mx-2">

                  <label for="Uat" class="ml-2">Uat</label>
                  <input type="checkbox" id="Uat" v-model="informacion" value="Uat" class="mx-2">

                  <label for="Compartida" class="ml-2">Compartida</label>
                  <input type="checkbox" id="Compartida" v-model="informacion" value="Compartida" class="mx-2">

                  <label for="PeerReview" class="ml-2">Peer Review</label>
                  <input type="checkbox" id="PeerReview" v-model="informacion" value="PeerReview" class="mx-2">

                  <label for="Rollout" class="ml-2">Rollout</label>
                  <input type="checkbox" id="Rollout" v-model="informacion" value="Rollout" class="mx-2"> -->

                  <v-spacer></v-spacer>
                  <v-btn @click="submit" :loading="loading" color="teal lighten-3"  class="mx-0 mt-3">Add WO</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal lighten-3" text @click="dialog = false; clearform()">cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-layout>

      <v-expansion-panels >
        <v-expansion-panel v-for="wo in wos" :key="wo.id">
          <v-expansion-panel-header> 
            {{ wo.wotitle }} <v-spacer></v-spacer> {{wo.wonumber}}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mb-4 backgroundpanel pre-formatted"><!-- {{ wo.informacion }} -->
              <br>
                <p> Total Puntos: {{totalPuntos}} </p>
              <br>
                  <label for="Soporte" class="ml-2">Soporte</label>
                  <input type="checkbox" id="Soporte" v-model="informacion" value="Soporte" class="mx-2">

                  <label for="Uat" class="ml-2">Uat</label>
                  <input type="checkbox" id="Uat" v-model="informacion" value="Uat" class="mx-2">

                  <label for="Compartida" class="ml-2">Compartida</label>
                  <input type="checkbox" id="Compartida" v-model="informacion" value="Compartida" class="mx-2">

                  <label for="PeerReview" class="ml-2">Peer Review</label>
                  <input type="checkbox" id="PeerReview" v-model="informacion" value="PeerReview" class="mx-2">

                  <label for="Rollout" class="ml-2">Rollout</label>
                  <input type="checkbox" id="Rollout" v-model="informacion" value="Rollout" class="mx-2">

            </div>
            <v-divider></v-divider>
            <div class="mt-4 backgroundpanel pre-formatted">Assignment Date: {{ wo.woassignmentdate }}
              <v-spacer></v-spacer> Sizing: {{wo.wosizing}}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>  

    </v-container>    
    
  </div>
</template>

<script>
import db from 'fb'

export default {
  data () {
    return {
      wos: [],
      sortBy: 'title',
      sortDirection: 'ascending',
      dialog: false,
      wotitle:'',
      wonumber:'',
      woassignmentdate: '',
      wosizing: '',
      loading: false,
      informacion: []
    };
  },
  methods: {
/*     sort (prop) {
      if (prop === this.sortBy) {
        // reverse sort order if requested sort is the same as current
        this.sortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending';
      } else {
        // otherwise sort order is ascending
        this.sortDirection = 'ascending';
      }
      this.sortBy = prop;
      this.querys.sort((a, b) => {
         if (a[prop] < b[prop]) {
          return this.sortDirection === 'ascending' ? -1 : 1;
        } else if (a[prop] > b[prop]) {
          return this.sortDirection === 'ascending' ? 1 : -1;
        }
      });
    }, */
    submit(){
     if(this.$refs.form.validate()){
       this.loading = true
       const wos = {
         wotitle: this.wotitle,
         wonumber: this.wonumber,
         woassignmentdate: this.woassignmentdate,
         wosizing: this.wosizing,
         informacion: this.informacion,
       }
       db.collection('wos').add(wos).then(() => {
         this.loading = false
         this.dialog = false
       })
      this.wotitle = ''
      this.wonumber = ''
      this.woassignmentdate = ''
      this.wosizing = ''
      this.informacion = ''
     }
    },
    clearform(){
      this.wotitle = ''
      this.wonumber = ''
      this.woassignmentdate = ''
      this.wosizing = ''
      this.informacion = ''
    }
  },
  created(){
    db.collection("wos").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added'){
          this.wos.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
  
};
</script>
