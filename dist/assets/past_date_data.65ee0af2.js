import{_ as a,o as d,d as c,a as o,t as e,f as p}from"./index.0a433b6c.js";const r={data(){let n=this.$route.params.date,s=this.$route.params.id;return{date:n,city:s,condtitions:null,humidity:null,max:null,min:null,precip:null,snow:null,temp:null,visibility:null}},mounted(){const n={method:"GET",headers:{"X-RapidAPI-Key":"9b0d3f9c88mshfd7b6445f1813e1p1aed44jsn0793638afda0","X-RapidAPI-Host":"visual-crossing-weather.p.rapidapi.com"}};fetch("https://visual-crossing-weather.p.rapidapi.com/history?startDateTime="+this.date+"T00%3A00%3A00&aggregateHours=24&location="+this.city+"&endDateTime="+this.date+"T00%3A00%3A00&unitGroup=us&dayStartTime=8%3A00%3A00&contentType=json&dayEndTime=17%3A00%3A00&shortColumnNames=0",n).then(s=>s.json()).then(s=>{let t=s.locations[this.city].values[0];console.log(t),this.condtitions=t.conditions,this.humidity=t.humidity,this.max=t.maxt,this.min=t.mint,this.precip=t.precip,this.temp=t.temp,this.visibility=t.visibility}).catch(s=>console.error(s))}},l={key:0},h={id:"city"},m={id:"cond"},_={id:"temp"},u={id:"high_low"},y={id:"precip"},v={id:"humidity"},f={id:"visibility"},g={id:"date"};function A(n,s,t,b,i,x){return d(),c("div",null,[i.visibility?(d(),c("div",l,[o("p",h,e(i.city),1),o("p",m,e(i.condtitions),1),o("p",_," average temp: "+e(i.temp)+"\xB0 ",1),o("p",u," max: "+e(i.max)+"\xB0 min: "+e(i.min)+"\xB0 ",1),o("p",y," precip: "+e(i.precip)+" in. ",1),o("p",v," humidity: "+e(i.humidity)+"% ",1),o("p",f," visibility: "+e(i.visibility)+" mi. ",1),o("p",g,e(i.date),1)])):p("",!0)])}const w=a(r,[["render",A]]);export{w as default};
