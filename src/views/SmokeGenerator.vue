<template>
  <div class="SmokeGenerator">
    <p class="text-sm-center mt-4 teal--text" >Smoke Generator</p>

    <v-container class="my-5">
      <div class="container">
        <v-form class="px-3" ref="form">           
          <v-text-field label="Add Tester Name" v-model="testername" @keydown.enter.prevent="assignApp()" ></v-text-field>
        </v-form>
        <v-simple-table>
          <template v-slot:default>
          <tbody>
            <tr v-for="li in lis" :key="li.id">
              <td class="teal lighten-4"> {{ li }}</td>
            </tr>
          </tbody>
        </template>
        </v-simple-table>

      </div>
    </v-container>    
  </div>
</template>

<script>




export default {

data(){
  return{
    apps: ['Cash( T01 to t05)/ BMA (T01 to T06)', 'Cash (Desde T06/TRN/HF)/ BMA(Desde T07/TRN/HF)', 
          'Caps/WCM', 'CAS', 'WEB Transactional', 'Boats'
          ],
    testername:'', 
    testers: [],
    loading: false,
    lis: [],
    randomnumber:'',
    value:'',
    todoinput:''
  };
},

methods: {
  getRndInteger(){
  this.randomnumber = Math.floor(Math.random() * this.apps.length);
  this.value = this.apps[this.randomnumber]
  this.apps.splice(this.randomnumber,1)
  return this.value;
  },
  assignApp(){
    this.getRndInteger();
    this.todoInput = this.testername
    this.testername = ''
    if(this.value != undefined){
      this.lis.push('(' + this.todoInput + ') ' + this.value) 
    }    
	}
},

};
</script>