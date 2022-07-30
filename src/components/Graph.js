import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    WhatsappShareButton, WhatsappIcon,
    FacebookShareButton, FacebookIcon,
    EmailShareButton, EmailIcon
} from "react-share";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Overall Progress',
        },
    },
};


export default function Graph({ datas }) {
    const [loading, setLoading] = useState(true)
    var [age, setAge] = useState([])
    var [labels, setLabels] = useState([])
    useEffect(() => {
        for (let i = 0; i < datas.length; i++) {
            age[i] = datas[i].age
            labels[i] = datas[i].fname
        }
        setTimeout(() => setLoading(false), 500)
    }, [])
    console.log(age);
    console.log(labels);
    const [shareurl, setShareurl] = useState('chart.png')
    var refChart = useRef(null)
    const data = {
        datasets: [{
            data: age,
            label: '',
            backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(53, 162, 235, 0.3)',
                'rgba(245, 192, 17, 0.3)',
                'rgba(68, 242, 111, 0.3)'
            ],
            borderWidth: 1,
        }],
        labels
    };

    //for download
    const handleDownload = useCallback(() => {
        const chartLink = document.createElement('a');
        chartLink.download = 'chart.png';
        chartLink.href = refChart.current.toBase64Image();
        chartLink.click();
    },
        [],
    )

    return <>
        <div className='position-relative mb-4'>
            <div className='position-absolute top-0 end-0'>
                <WhatsappShareButton url={shareurl} className='mx-2' onClick={handleDownload} >
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <FacebookShareButton url={shareurl} className='mx-2' onClick={handleDownload} >
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <EmailShareButton url={shareurl} className='mx-2' onClick={handleDownload} >
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <button className='btn btn-success btn-sm' onClick={handleDownload}> Download </button>
            </div>
        </div>
        {!loading && <Bar ref={refChart} options={options} data={data} />}
    </>;
}
