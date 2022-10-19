<template>
    <div>
        <div v-if = "visibility">
            <p id = "city">
                {{city}}
            </p>
            <p id = "cond">
                {{condtitions}}
            </p>
            <p id = "temp">
                average temp: {{temp}}°
            </p>
            <p id = "high_low">
                max: {{max}}° min: {{min}}°
            </p>
            <p id = "precip">
                precip: {{precip}} in.
            </p>
            <p id = "humidity">
              humidity: {{humidity}}%
            </p>
            <p  id = "visibility">
                visibility: {{visibility}} mi.
            </p>
            <p id = "date">
                {{date}}
            </p>
            
        </div>
    </div>
</template>
<script>
export default{
    data(){
        let date = this.$route.params.date;
        let city = this.$route.params.id;
        return{
            date,
            city,
            condtitions: null,
            humidity: null,
            max: null,
            min: null,
            precip: null,
            snow: null,
            temp: null,
            visibility: null

        }
    },
    mounted(){
        const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '9b0d3f9c88mshfd7b6445f1813e1p1aed44jsn0793638afda0',
                    'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
                }
            };
    
            fetch('https://visual-crossing-weather.p.rapidapi.com/history?startDateTime=' + this.date + 'T00%3A00%3A00&aggregateHours=24&location=' + this.city + '&endDateTime=' + this.date + 'T00%3A00%3A00&unitGroup=us&dayStartTime=8%3A00%3A00&contentType=json&dayEndTime=17%3A00%3A00&shortColumnNames=0', options)
                .then(response => response.json())
                .then(response => {
                    let info = response.locations[this.city].values[0]
                    console.log(info)
                    this.condtitions = info.conditions
                    this.humidity = info.humidity
                    this.max = info.maxt
                    this.min = info.mint
                    this.precip = info.precip
                    this.temp = info.temp
                    this.visibility = info.visibility

            
                })
                .catch(err => console.error(err));
        }
    }
</script>
<style>
#city{

    font-size: 400%;
    text-align: center;

}
body{
    background-color: rgb(58, 56, 56);
    color: white;
}
#cond{
    text-align: center;
    font-size: 300%;
}
#temp{
    text-align: center;
    font-size: 200%;
}
#high_low{
    text-align: center;
    font-size: 200%;
}
#precip{
    text-align: center;
    font-size: 200%;
}
#humidity{
    text-align: center;
    font-size: 200%;
}      
#visibility{
    text-align: center;
    font-size: 200%;
}
#date{
    text-align: center;
    font-size: 200%;
}
</style>
