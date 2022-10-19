<template>
    <router-view>
        <div id = "body">
            <h1 id = "title">
            Check past weather data
            </h1>
            <input v-model = "input_date" type="text" id = "date_input"><button id="button"  @click="search()">search</button>
            <div id = "hint">
                <p>
                    type a date that you want to retrieve weather data from.
                </p>
                <p>
                    for example, type 2003-08-07 instead of August 7, 2003 
                </p>
            </div>
        </div>
   
          

    </router-view>
</template>
<script>
export default {
    data(){
        let city_name = this.$route.params.id;
        return{
            input_date: "",
            city_name
        }
    }, 
    methods:{
        search(){
           this.$router.push({name: 'past_data', params: {id: this.city_name, date: this.input_date}})
        }
 }
}
</script>
<style>
body{
    background-color: rgb(58, 56, 56);
    color: white;
}
#title{
    text-align: center;
    
}
#date_input{
    margin-left: 35%;
    width: 30%;
    height: 10%;
    border-radius: 10px;
}
#hint{
    font-size: 200%;
    text-align: center;
}
#button{
    border-radius: 10px;
    height: 10%;
}
</style>
