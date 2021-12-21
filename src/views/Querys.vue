<template>
  <div class="dashboard">
    <p class="text-sm-center mt-4 teal--text">Querys</p>
    <v-container class="my-5">

<!-- botones para sorting -->

      <v-layout row justify-start class="mb-3">
        <div>
          <v-btn small color="teal lighten-3" class="mx-2" @click="sort('querytitle')">
            <v-icon small left>mdi-sort</v-icon>
            <span class="caption text-lowercase">By Query Name</span>
          </v-btn>
          <v-btn small color="teal lighten-3" class="mx-2" @click="sort('schemas')">
            <v-icon small left>mdi-sort</v-icon>
            <span class="caption text-lowercase">By Schema</span>
          </v-btn> 
          <v-btn small color="teal lighten-3" @click.stop="dialog = true">Add New Query</v-btn>
        </div> 

<!-- Popup new query -->

        

        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title >Add new Query</v-card-title>

            <v-card-text>
              <v-form class="px-3" ref="form">
                <v-text-field v-model="querytitle" label="Title" ></v-text-field>
                <v-textarea v-model="querycontent" label="Query" ></v-textarea>
                <v-textarea v-model="queryinfo" label="info" ></v-textarea>

                <label for="Customer" class="ml-2">Customer</label>
                <input type="radio" id="Customer" v-model="schemas" value="Customer" class="mx-2">
                <label for="Account" class="ml-2">Account</label>
                <input type="radio" id="Account" v-model="schemas" value="Account" class="mx-2">
                <label for="Letters" class="ml-2">Letters</label>
                <input type="radio" id="Letters" v-model="schemas" value="Letters" class="mx-2">
                <label for="Caps" class="ml-2">Caps</label>
                <input type="radio" id="Caps" v-model="schemas" value="Caps" class="mx-2">
                <label for="Market" class="ml-2">Market</label>
                <input type="radio" id="Market" v-model="schemas" value="Market" class="mx-2">
                <label for="Notify" class="ml-2">Notify</label>
                <input type="radio" id="Notify" v-model="schemas" value="Notify" class="mx-2">
                <br>
                <label for="Coll" class="ml-2">Coll</label>
                <input type="radio" id="Coll" v-model="schemas" value="Coll" class="mx-2">
                <label for="Iflow" class="ml-2">Iflow</label>
                <input type="radio" id="Iflow" v-model="schemas" value="Iflow" class="mx-2">
                <label for="Unwind" class="ml-2">Unwind</label>
                <input type="radio" id="Unwind" v-model="schemas" value="Unwind" class="mx-2">
                <label for="Ach" class="ml-2">Ach</label>
                <input type="radio" id="Ach" v-model="schemas" value="Ach" class="mx-2">
                <label for="Global" class="ml-2">Global</label>  
                <input type="radio" id="Global" v-model="schemas" value="Global" class="mx-2">
                <label for="Process" class="ml-2">Process</label>  
                <input type="radio" id="Process" v-model="schemas" value="Process" class="mx-2">                
                <label for="Detst01" class="ml-2">Detst01</label>  
                <input type="radio" id="Detst01" v-model="schemas" value="Detst01" class="mx-2"> 

                <v-spacer></v-spacer>
                <v-btn @click="submit" :loading="loading" color="teal lighten-3"  class="mx-0 mt-3">Add Query</v-btn>
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
    <v-expansion-panel v-for="query in querys" :key="query.id">
      <v-expansion-panel-header> 
        {{ query.querytitle }} <v-spacer></v-spacer> {{query.schemas}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="mb-4 backgroundpanel pre-formatted">{{ query.querycontent }}</div>
        <v-divider></v-divider>
        <div class="mt-4 backgroundpanel pre-formatted">{{ query.queryinfo }}</div>
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
      querys: [],
      sortBy: 'title',
      sortDirection: 'ascending',
      dialog: false,
      querytitle:'',
      querycontent:'',
      queryinfo: '',
      loading: false,
      schemas: []
    };
  },
  methods: {
    sort (prop) {
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
    },
    submit(){
     if(this.$refs.form.validate()){
       this.loading = true
       const querys = {
         querytitle: this.querytitle,
         querycontent: this.querycontent,
         queryinfo: this.queryinfo,
         schemas: this.schemas
       }
       db.collection('querys').add(querys).then(() => {
         this.loading = false
         this.dialog = false
       })
      this.querytitle = ''
      this.querycontent = ''
      this.queryinfo = ''
      this.schemas = ''
     }
    },
    clearform(){
      this.querytitle = ''
      this.querycontent = ''
      this.queryinfo = ''
      this.schemas = ''
    }
  },
  created(){
    db.collection("querys").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added'){
          this.querys.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
  
};
</script>

<style>

.backgroundpanel{
  background-color: #E0F2F1;
}
.pre-formatted {
  white-space: pre;
}


</style>
