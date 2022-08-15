const {parse} = require('csv-parse');
const fs = require('fs');


const habiTablePlanets = [];

function isHabiTablePlanet(planet){
    return planet['koi_disposition'] ==='CONFIRMED'
    && planet['koi_insol']> 0.36 && planet['koi_insol'] < 1.11 
    && planet['koi_prad'] < 1.6 ; 
}


fs.createReadStream('kapler_data.csv')
 .pipe(parse({
    comment : '#',
    columns : true,
}))
 .on('data',(data)=>{
    if (isHabiTablePlanet(data)){
        habiTablePlanets.push(data)
    }
    

 })
 .on('error',(err) =>{
    console.log(err);

 })
 .on('end',()=>{
    console.log(habiTablePlanets.map((planet)=>{
        return planet['kepler_name'];
    }));
    console.log(`${habiTablePlanets.length} habitable planets Found `);
    
 });




