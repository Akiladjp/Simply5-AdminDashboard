import React, { useEffect, useState, useCallback } from 'react';
import ApexCharts from 'react-apexcharts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import { IoMdDownload } from 'react-icons/io';

function AnalysisTimeToday() {
  const [data, setData] = useState({ names: [], todayData: [] });
  const [selectedOption, setSelectedOption] = useState('');
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
      height: 500,
      width: '100%',
      contextmenu: { enabled: false },
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: false,
        dataLabels: { position: 'bottom' },
      },
    },
    colors: [
      '#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024',
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      style: { colors: ['#000'] },
      offsetX: 0,
      dropShadow: { enabled: false },
    },
    stroke: { width: 1, colors: ['#fff'] },
    xaxis: {
      categories: [
        ['00.00', '-', '01.00'], ['01.00', '-', '02.00'], ['02.00', '-', '03.00'], ['03.00', '-', '04.00'],
        ['04.00', '-', '05.00'], ['05.00', '-', '06.00'], ['06.00', '-', '07.00'], ['07.00', '-', '08.00'],
        ['08.00', '-', '09.00'], ['09.00', '-', '10.00'], ['10.00', '-', '11.00'], ['11.00', '-', '12.00'],
        ['12.00', '-', '13.00'], ['13.00', '-', '14.00'], ['14.00', '-', '15.00'], ['15.00', '-', '16.00'],
        ['16.00', '-', '17.00'], ['17.00', '-', '18.00'], ['18.00', '-', '19.00'], ['19.00', '-', '20.00'],
        ['20.00', '-', '21.00'], ['21.00', '-', '22.00'], ['22.00', '-', '23.00'], ['23.00', '-', '24.00'],
      ],
      labels: {
        trim: false,
        rotate: 0,
        rotateAlways: false,
        style: {
          fontSize: '12px',
          whiteSpace: 'normal',
          fontWeight: '600',
          width: 'auto',
        },
      },
    },
    yaxis: {
      labels: { show: true },
      title: {
        style: { fontSize: '14px' },
      },
    },
    tooltip: {
      theme: 'dark',
      x: { show: true },
      y: {
        title: { text: 'Quantity' },
      },
    },
  });
  const [chartSeries, setChartSeries] = useState([{ data: [] }]);

  const updateChartData = useCallback((dataset) => {
    const chartValues = dataset?.map(data => data.value) || [];
    setChartSeries([{ data: chartValues, name: 'Quantity' }]);
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8081/timemonth?selectedOption=${selectedOption}`,{withCredentials:true})
      .then((res) => {
        const { names = [], monthData = [] } = res.data;
        setData({ names, monthData });

        if (!selectedOption && names.length > 0) {
          setSelectedOption(names[0].name);
          updateChartData(monthData);
        } else {
          updateChartData(monthData);
        }
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [selectedOption, updateChartData]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        yaxis: {
          ...prevOptions.yaxis,
          title: {
            ...prevOptions.yaxis.title,
            text: isMobile ? '' : 'Quantity',
          },
        },
      }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChangeDrop = (event) => {
    setSelectedOption(event.target.value);
    const selectedItemData = data.names.find((d) => d.name === event.target.value);
    updateChartData(selectedItemData?.todayData || []);
  };

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
      <hr className="my-0 border-t border-blue-800" />
      <div className='flex items-center xl:mt-1'>
        <Link to="/app/analysis/todayitem">
          <button className='px-12 py-2 text-sm font-semibold text-[#007FA8] bg-white rounded border-[#007FA8] border-[1px] m-4 xl:m-6'>
            Item
          </button>
        </Link>
        <button className='px-12 py-2 text-sm font-semibold text-white bg-[#007FA8] rounded border-[#007FA8] border-[1px]'>
          Time
        </button>
      </div>
      <div className='mx-2 flex justify-end xl:mr-16'>
        <select className='border-2 rounded-xl px-2 md:px-3 py-2 text-sm' id="dropdown" value={selectedOption} onChange={handleChangeDrop}>
          {data.names.map((option, index) => (
            <option key={index} value={option.name} className='text-xs'>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={downloadChart} className='border-2 rounded-xl mx-3 px-2 md:px-3 py-[9px] md:py-3 bg-white lg:hover:bg-black text-black lg:hover:text-white'>
          <IoMdDownload />
        </button>
      </div>
      <div className='bar-chart overflow-x-scroll xl:ml-16 mt-4 xl:mt-16'>
        <style>
          {`
            .apexcharts-canvas {
              overflow: hidden !important;
            }
            .apexcharts-menu-icon {
              display: none !important;
            }
            .bar-chart .apexcharts-yaxis-title text {
              letter-spacing: 4px !important;
            }
          `}
        </style>
        <ApexCharts options={chartOptions} series={chartSeries} type='bar' height={600} width={1380} />
      </div>
    </div>
  );
}

export default AnalysisTimeToday;
