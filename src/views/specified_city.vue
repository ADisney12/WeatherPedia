<template>
    <router-view>
        <div id = "specified_comp">
       <h1 class = "city_name_h1">{{data_location }}</h1>
       <h1 class = "city_name_h1" v-if="err">{{err}}</h1>
       <div id = "data_specifics" v-if = "temp_f">
            <p id = "kind">{{kind}}</p>
            <p id = "temp">
                {{temp_f}}°
            </p>
            <p id="feels_like">
                feels like {{feelslike_f}}°
            </p>

            <p id = "min_max">
                max: {{maxtemp_f}}°  min: {{mintemp_f}}°
            </p>

            <p id="wind_speed">
                wind: {{wind_mph}} mph
            </p>
            <p id="dir">
                wind dir: {{wind_dir}}
            </p>

            <p id="precip">
                precip: {{precip_in}}
            </p>

            <p id="humidity">
                humidity: {{humidity}}%
            </p>

            <p id="vis_miles">
                visibility: {{vis_miles}} mi.
            </p>
            <p id="date">
                {{date}}
            </p>
            <p id="localtime">
                {{localtime}}
            </p>

        
            <div>
                <button id = "past_button" @click="past_check()">check past weather</button>
                <p>   Explore past weather data from up to 40 years ago!!!</p>
             
            </div>
       </div>
    </div>
    </router-view>
</template>
<script>
import num_list from './home.vue';
export default {
    data(){

        let city_name = this.$route.params.id;
    
        let add_on_list = ["°", "%", " in.", " in.", "°", "", "mi.", "", " mph" ]
        const options = {
            method: 'GET',
            headers: {
              		'x-rapidapi-key': '9b0d3f9c88mshfd7b6445f1813e1p1aed44jsn0793638afda0',
            		'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
            		Accept: 'application/json'
            }
            };
        return{
            localtime: null,
            kind : null,
            err: null,
            city_name,  
            options,
            maxtemp_f: null,
            mintemp_f: null,
            feelslike_f: null,
            humidity: null,
            precip_in: null,
            pressure_mb: null,
            temp_f: null,
            uv: null,
            vis_miles: null,
            wind_dir: null,
            wind_mph: null,
            data_list: null,
            add_on_list,
            data_location: null,
            date: null
    
        }
    },
    mounted(){
        console.log(num_list)
        fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + this.city_name, this.options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)          
                    if(response.location.country == "United States of America"){
                        this.data_location = (response.location.name + ", " +  response.location.region) 
                        console.log("this country is in the us")       
                    }
                    else{
                        this.data_location = (response.location.name + ", " +  response.location.country) 
                        console.log("this country is not in the us")   
                    }
                    this.kind = response.current.condition.text
                    this.feelslike_f = response.current.feelslike_f
                    this.humidity = response.current.humidity
                    this.precip_in = response.current.precip_in
                    this.pressure_mb = response.current.pressure_mb
                    this.temp_f = response.current.temp_f
                    this.uv = response.current.uv
                    this.vis_miles = response.current.vis_miles
                    this.wind_dir = response.current.wind_dir
                    this.wind_mph = response.current.wind_mph
                    this.data_list = [this.feelslike_f, this.humidity, this.precip_in, this.pressure_mb, this.temp_f, this.uv, this.vis_miles, this.wind_dir, this.wind_mph]
                    this.maxtemp_f = response.forecast.forecastday[0].day.maxtemp_f
                    this.mintemp_f = response.forecast.forecastday[0].day.mintemp_f
                    this.localtime = response.location.localtime.slice(11)
                    let int_localtime = (parseInt(this.localtime.slice(0,3)))
                    if (int_localtime > 12){
                        int_localtime -= 12
                        this.localtime = (int_localtime + this.localtime.slice(2,5) + " pm")
                        int_localtime -= 12
                    }
                    else{
                        this.localtime = (this.localtime + " am")
                    }
                    if(int_localtime == 0){
                        this.localtime = ("12:" + this.localtime.slice(2,5) + " am")
                    }
                    this.date = response.location.localtime.slice(0, 10)

            
                })
                .catch(er => {
                    console.error(er)
                    this.err = "no city with this name has been found"
                })

    },

    methods: {
        past_check(){
            this.$router.push({ name: 'check_past', params: { id: this.data_location} })
        }
    },
}

</script>
<style>
   
    #kind{
        text-align: center;
        font-size: 600%;
    }
    #min_max{
        text-align: center;
        font-size: 200%;
    }
    
    .city_name_h1{
        text-align: center;
        font-size: 500%;
    }

    #temp{
        text-align: center;
        font-size: 500%;
    }
    #feels_like{
        text-align: center;
        font-size: 200%;
    }
    #wind_speed{
        text-align: center;
        font-size: 200%;
    }
    #precip{
        text-align: center;
        font-size: 200%;
    }
    #uv{
        text-align: center;
        font-size: 200%;
    }
    #dir{
        text-align: center;
        font-size: 200%;
    }
    #humidity{
        text-align: center;
        font-size: 200%;
    }
    #vis_miles{
        text-align: center;
        font-size: 200%;
    }
    #specified_comp{
        text-align: center;
    }
    #localtime{
        text-align: center;
        font-size: 200%;
    }
    #date{
        text-align: center;
        font-size: 200%;
    }
    #past_button{
        font-size: 100%;
        height: 50px;
        margin-top: 10%;
        border-radius: 20px;
    }
    
</style>
