import React from 'react'
import Header from '../components/Header'
import '../styles/Help.css'
import HelpImage from '../assets/help.svg'

function Help() {
    return (
        <div className="help">
            <div>
                <Header/>
            </div>
            <div className="help__body">
               <div className="body__heading">
                 <h1>How to use?</h1>
               </div>
               <div className="body__body">
                   <div className="body__image">
                        <img src={HelpImage}/>
                   </div>
                   <div className="body__text">
                       <h6>-Scan / select a image from you device.</h6>
                       <h6>-wait for image to process OCR</h6>
                       <h6>-nter the length of the summary you want(in lines)</h6>
                       <h6>-Then click on Get Summary to generate Summary</h6>
                   </div>
                    

               </div>
                
            </div>
        </div>
    )
}

export default Help
