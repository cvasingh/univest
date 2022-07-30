import React, { Component, PropTypes, useState } from 'react';
import {
    WhatsappShareButton, WhatsappIcon,
    FacebookShareButton, FacebookIcon,
    EmailShareButton, EmailIcon
} from "react-share";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export default function Table({ datas }) {
    const [shareurl, setShareurl] = useState('download.pdf')
    //for download
    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                console.log('pdf');
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
    }
    return <>
        <div className='position-relative mb-4'>
            <div className='position-absolute top-0 end-0'>
                <WhatsappShareButton url={shareurl} className='mx-2' onClick={printDocument} >
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <FacebookShareButton url={shareurl} className='mx-2' onClick={printDocument} >
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <EmailShareButton url={shareurl} className='mx-2' onClick={printDocument} >
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <button className='btn btn-success btn-sm' onClick={printDocument}> Download </button>
            </div>
        </div>
        <table class="table table-success table-striped" id="divToPrint">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Age</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.age}</td>
                    </tr>
                ))}

            </tbody>
        </table>

    </>
}
