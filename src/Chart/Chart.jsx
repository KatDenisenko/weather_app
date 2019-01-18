
import React from 'react';
import {Line} from 'react-chartjs-2'
import PropTypes from 'prop-types'
import moment from 'moment'


const Chart = ({average}) => 
  {
    let arr = [];
    for (let i=0; i<5; i++) {
        let a = moment().add(i, 'days').format("ll");
        arr.push(a)
    }

    // if (!isNaN(chartData.temperature[0])) {
    //   // console.log(chartData.temperature)
    // }

    let option = {
         title: {
            display: true,
            position: 'top',
            text: "Зміна погоди за п'ять днів",  
            fontSize: '20',
            fontColor: "white",
            fontFamily: 'Josefin Sans, sans-serif', 
        },
        scales: {
          yAxes: [{
            // gridLines: {
            //   display: true,
            //   color: "grey"
            // },
            scaleLabel: {
               display: true,
               labelString: "Одиниці виміру",  
               fontColor: "white",
               fontSize: '18',
               fontFamily: 'Josefin Sans, sans-serif',
               color: "white",
            },
            // ticks: {
              // suggestedMin: ,
              // suggestedMax: 60,
              // stepSize: 5,
            // },
          }],
          xAxes: [{
            gridLines: {
              color: "white",
              borderDash: [2, 5],
              
            },
            scaleLabel: {
              fontColor: "white",
               display: true,
               labelString: "Дні",  
               fontSize: '20',
               fontFamily: 'Josefin Sans, sans-serif',
               
            },
          }]
      }
    }

    let WetChart = {
        labels: arr,
        datasets: [
            {
                label: 'Середня температура,℃' ,
                color: 'white',
                data: average.temperature,
                fontColor: 'white',
                backgroundColor:'red',
                borderColor: 'red', 
                fill: null,
                hidden: false,
                type: 'line',
                usePointStyle: true,
                radius: '5',
                hoverBorderWidth: '15',
              }, {
                hidden: true,
                label: 'Швидкість вітру, м/с',
                fontColor: 'white',
                data: average.wind,
                backgroundColor:'orange',
                borderColor: 'orange',
                type: 'line',
                usePointStyle: true,
                radius: '5',
                hoverBorderWidth: '15',
                fill: null,
              }, {
                hidden: true,
                label: 'Вологість, %',
                fontColor: 'white',
                data: average.humidity,
                backgroundColor:'blue',
                borderColor: 'blue',
                type: 'line' ,
                fill: null,
              }, {
                hidden: true,
                label: 'Атмосферний тиск, hPa',
                fontColor: 'white',
                data: average.pressure,
                backgroundColor:'green',
                borderColor: 'green',
                type: 'line' ,
                fill: null,
              }],    
    }
    return (
           <Line data={WetChart} options={option}/>
    );
};

// Chart.propTypes = {
//   chartData: PropTypes.shape({
//     temperature: PropTypes.arrayOf(PropTypes.number),
//     pressure: PropTypes.arrayOf(PropTypes.number),
//     windSpeed: PropTypes.arrayOf(PropTypes.number),
//     humidity: PropTypes.arrayOf(PropTypes.number),
// }),
// }

export default Chart;






// import React from 'react';
// import moment from 'moment';
// import {Line} from 'react-chartjs-2';
// //import style from './Chart.css'

// const Chart = ({average}) => {

   
//      let myChart = {
//          type:'line',
//          labels: [moment().format('dddd, DD.MM.YYYY'),moment().add( 1,'d').format('dddd, DD.MM.YYYY'),moment().add( 2,'d').format('dddd, DD.MM.YYYY'),moment().add( 3,'d').format('dddd, DD.MM.YYYY'),moment().add( 4,'d').format('dddd, DD.MM.YYYY')],
//          fontColor: 'white',

//          datasets: [
//              {
//                  label:'Середня температура,℃',
//                  data:average.temperature,
//                  fontColor: 'white',
//                  fill:false,
//                  backgroundColor:'red',
//                  borderColor: 'red',   
//                  pointStyle: 'triangle',
//                  pointRadius: 6,
//                  pointHoverRadius: 10,
//                  //yAxisID:'first-y-axis'
//               },

//              { 
//                  label:'Вологість, %',
//                  data: average.humidity,
//                  backgroundColor:'blue',
//                  borderColor: 'blue',
//                  fill:false,
//                  hidden:true, 
//                  pointStyle: 'triangle',
//                  pointRadius: 6,
//                  pointHoverRadius: 10,
//                  //  yAxisID: 'second-y-axis',         
//              },

//              {
//                 label:'Швидкість вітру, м/с',
//                 data: average.wind,
//                 backgroundColor:'orange',
//                 borderColor: 'orange',
//                 fill:false,
//                 hidden:true,pointStyle: 'triangle',
//                 pointRadius: 6,
//                 pointHoverRadius: 10,
//                 //yAxisID: 'third-y-axis',        
//             },

//             {   
//                 label:'Атмосферний тиск, hPa',
//                 data: average.pressure,
//                 backgroundColor:'green',
//                 borderColor: 'green',
//                 color:'white',
//                 fill:false,
//                 hidden:true,
//                 pointStyle: 'triangle',
//                 pointRadius: 6,
//                 pointHoverRadius: 10,
//                 //yAxisID: 'fourth-y-axis',
//             }
//          ],
//      }

//      let option = {
//         // responsive: true,
//         legend: {
//             labels: {
//                 fontColor: "white",
//                 fontSize: 16
//             }
//         },
//         title: {
//             display: true,
//             text: 'Графік зміни погодних умов за п\'ять днів',
//             fontColor: 'white',
//             fontSize: 16
//            },
          
//         scales: {
            
//             yAxes: [{
//                 scaleLabel: {
//                   display: true,
//                     labelString: 'Значення показників',
//                     fontColor: 'white',
//                      fontSize: '1rem'
//                     },

//                     ticks: {
//                         fontColor:'white',
//                         lineWidth: 0.5,
//                     },
//                     gridLines: {
//                         color:'white',
//                         lineWidth: 0.5,
//                     },

//                 }
//               ],
              
//               xAxes: [{
//                 scaleLabel: {
//                   display: true,
//                   labelString: 'Дні',
//                   fontSize: '1rem',
//                   fontColor: 'white',
//                 },
//                 ticks: {
//                     fontColor:'white',
//                     lineWidth: 0.5,
//                 },
//                 gridLines: {
//                     color:'white',
//                     lineWidth: 0.5,
//                 },
                
//               }]
//          },
//           }

//     return (
        
//             <Line data = {myChart}  options= {option}/>
//     );
// };

// export default Chart;