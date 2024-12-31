<template>
    <router-view>
        <h1>WeatherPedia</h1>
        <div id = "center">
            <div id = "pad_bot"><input v-model = "input"  @input="find_close_city_names" type="text" id="input"/><button id = "search_button" @click="grasp(input)">search</button></div>
                <div v-for="city in close_cities" :key = "city.id" v-if="count > 0"  @click = "grasp(city)">
                    <div class="close_cities">{{city}}</div>
                </div>
            <div id="home_cities" v-for="x in num_list" :key="x.id" v-if="input == 0">
        
                <div class="home-city" @click = "grasp(city_list[x])">
                    
                    <h1 class="home-city-contents-city">{{city_list[x]}}</h1> 
                    <div class="home-city-contents-temp">{{temp_list[x]}}</div>
                </div>
            </div>
  
        </div>
    </router-view>
  </template>
  
  <script>
    import {cities} from './cities.js';
    export default {
        components:{
  
        },
  
        data(){
            let close_cities = []
            let city_list = []
            let temp_list = []
            let num_list = [0, 1, 2, 3]
            const options = {
            method: 'GET',          
            headers: {
              		'x-rapidapi-key': '9b0d3f9c88mshfd7b6445f1813e1p1aed44jsn0793638afda0',
			'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
			Accept: 'application/json'
	            }
        
            };

            let find_close_city_names = () => {
                this.close_cities = []
                this.count = this.input.length;
                console.log(close_cities)
                console.log(cities[1].slice(0, this.count) + " " + this.input)

                if(this.count > 0){
                    cities.forEach(element => {
                    if(element.toLowerCase().slice(0, this.count) == this.input.toLowerCase()){
                        this.close_cities.push(element)
                        console.log(close_cities)
                    }
                this.close_cities.forEach(x => {
                    let check = 0
                    if(x.toLowerCase().slice(0, this.count) == this.input.toLowerCase()){
                        return;
                    }
                    else{
                        this.close_cities.splice(check, 1);
                        console.log(close_cities)
                    }
                    check++
                })
               
                });
                }
            
            }
  
  
            
            return{
                city_list,
                temp_list,
                options,
                num_list,
                close_cities,
                input: "",
                count: 0,
                find_close_city_names
  
            }
         },
  
         mounted() {
           // console.log(cities)
            for (let index = 0; index < 5; index++) {
  
                var rand = Math.floor(Math.random() * 134);
                fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + cities[rand], this.options)
                .then(response => response.json())
                .then(response => {
                  //  console.log("fethed")
  
                    let vage_Data_temp =(response.current.temp_f + "°")
                    let vage_Data_city = "city"
                    if(response.location.country == "United States of America"){
                        vage_Data_city = (response.location.name + ", " +  response.location.region)
                        console.log("this country is in the us")       
                    }
                    else{
                        vage_Data_city = (response.location.name + ", " +  response.location.country) 
                        console.log("this country is not in the us")   
                    }
                  
                    this.temp_list.push(vage_Data_temp);
                    this.city_list.push(vage_Data_city);
                    rand = Math.floor(Math.random() * 40);
            
                })
                .catch(err =>{
                    console.log(err)
                }
                    
                )
            }


    
         },
  
        methods:{
            grasp(city){
                console.log(city)
                this.$router.push({ name: 'id', params: { id: city } })

            },
        },
  
  
    }
  
  </script>
  
  <style>
  #pad_bot{
    padding-bottom: 8%;
  }
    #center{
        text-align: center;
    }
    .close_cities{
        border-width: 0px;
        padding-top: 5%;
        height: 70%;
        border-radius: 10px;
        border:1px solid rgb(255, 255, 255);;
        background-color: gray;
        display: flex;
        justify-content: space-between;
        font-size: 300%;
    }
    #input{
        border-radius: 10px;
        width: 50%;
    }
    #search_button{
       
        border-radius: 10px;
        font-size: larger;
    }
    body{
    
    background-color: rgb(58, 56, 56);
    color: white;
    }
  
    .home-city{
    border-width: 0px;
    padding-top: 5%;
    height: 70%;
    border-radius: 10px;
    border:1px solid rgb(255, 255, 255);;
    background-color: gray;
    display: flex;
    justify-content: space-between;
    }
    .home-city-contents-city{
    display: inline;
    text-align: left;
    font-size: 300%;
    padding-bottom: 10%;
    }
    .home-city-contents-temp{
    display: inline;
    font-size: 400%;
    }
  
    #home_city_name{
    display: inline;
  }
  
  </style>
