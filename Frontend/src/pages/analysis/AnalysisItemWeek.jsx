import  { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from "axios";
import { Link } from 'react-router-dom';
import domtoimage from 'dom-to-image';
import { IoMdDownload } from "react-icons/io";

function AnalysisItemToday() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [rawData ,setRawData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
      height: 500,
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: false,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
    '#f48024'],
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      style: {
        colors: ['#000'],
        
      },
      offsetX: 0,
      dropShadow: {
        enabled: false
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: currentData.map((data) => data.name),
      labels: {
        trim: false,
          rotate: -90,
          rotateAlways: false,
          style: {
            fontSize: '12px',
            whiteSpace: 'normal',  
            fontWeight: '600', 
            width: 'auto',
          },
      }
    },
    yaxis: {
      labels: {
        formatter: function(value){
          return value.toFixed(1);
        },
        show: true,
      },
      title: {
        style:{
        }
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        title: {
          text: 'Quantity',
        }
      }
    }
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
            ...prevOptions.xaxis,
            categories: currentData.map((data) => data.name),
        },
    }));
}, [currentData]);
  
 
  const [chartData, setChartData] = useState({
    chartSeries : [
      {
        data: [],
      }]
  });

  useEffect(() => {
    function handleResize(){
      const isMobile = window.innerWidth < 768;
      setChartOptions((preOptions) => ({
        ...preOptions,
        plotOptions:{
          bar:{
            horizontal: isMobile,
          },
        },yaxis: {
          title: {
            text: isMobile ? '' : 'Quantity',
            style:{
              fontSize: '12px',
            },
            show: true,
          },
        },

      }));
    }
    handleResize();

    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
    }, []);

  useEffect(() => {
    axios.get(`${API_URL}/week`,{withCredentials:true})
    .then(res => {
      setRawData(res.data);
      updateChartData(res.data); 
    })
    .catch(err => console.log(err));
  }, [])

  const updateChartData = (dataset) => {
    
    const chartValues = dataset.map(data => data.total_quantity);

    setChartData({
      chartSeries : [
        {
          data: chartValues,
          name: "Quantity",
        },
      ],       
    });
    setCurrentData(dataset);
  }

const downloadChart = () => {
  const chart = document.querySelector('.apexcharts-canvas');

  if (chart) {
      chart.classList.add('light-theme');
      domtoimage.toPng(chart)
      .then((dataUrl) => {
        chart.classList.remove('light-theme');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'chart.png';
        link.click();
      })
      .catch((error) => {
        chart.classList.remove('light-theme');
        console.error('Error generating chart image:', error);
      });
  }
};

  return (
      <div className='w-full h-screen border'>
          <hr className="border-t border-blue-800" />
          <div className='flex felx-row items-center xl:mt-1'>
            <button className='px-12 py-2 text-sm font-semibold text-white bg-[#007FA8] rounded border-[#007FA8] border-[1px] m-4 xl:m-6'>Item</button>
            <Link to="/app/analysis/weektime"><button className='px-12 py-2 text-sm font-semibold text-[#007FA8] bg-white rounded border-[#007FA8] border-[1px]'>Time</button></Link>
          </div>
          <div className='mx-2 flex justify-end'>
            <button onClick={downloadChart} className='border-2 rounded-xl mx-3 px-2 md:px-3 py-2 md:py-3 bg-white hover:bg-black text-black hover:text-white'><IoMdDownload /></button>
          </div>
          <div className='bar-chart mt-16'>
          <style>
          {`
            .apexcharts-canvas {
              overflow: hidden !important;
            }

            .apexcharts-menu-icon {
              display: none !important;
            }

            .bar-chart .apexcharts-yaxis-title text {
              letter-spacing: 5px !important;
            }
          `}
        </style>
            <ApexCharts options={chartOptions} series={chartData.chartSeries} type='bar' height={500}/>
          </div>
      </div>
    );
}

export default AnalysisItemToday;