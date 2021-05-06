import React from 'react';
import { createWorker } from 'tesseract.js';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import '../styles/ScanScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
// import { Button } from '@material-ui/core';
import Button from '../components/Button';

registerPlugin(FilePondPluginImagePreview);



class ScanScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isProcessing: false,
            ocrText: '',
            pctg: '0.00'
        }
        this.state = {
            forecasts: [],
            Data: '',
            fulltext: '',
            num: ''


        };
        this.updateState = this.updateState.bind(this);
        this.onSubmitt = this.onSubmitt.bind(this);
        this.numbersub = this.numbersub.bind(this);

        this.pond = React.createRef();
        this.worker = React.createRef();
        this.updateProgressAndLog = this.updateProgressAndLog.bind(this);
    }


    async doOCR(file) {
        this.setState({
            isProcessing: true,
            ocrText: '',
            pctg: '0.00'
        })
        await this.worker.load();
        await this.worker.loadLanguage('eng');
        await this.worker.initialize('eng');
        const { data: { text } } = await this.worker.recognize(file.file);
        this.setState({
            isProcessing: false,
            ocrText: text
        })
    };
    updateProgressAndLog(m) {
        var MAX_PARCENTAGE = 1;
        var DECIMAL_COUNT = 2;

        if (m.status === "recognizing text") {
            var pctg = (m.progress / MAX_PARCENTAGE) * 100
            this.setState({
                pctg: pctg.toFixed(DECIMAL_COUNT)
            })

        }
    }
    componentDidMount() {
        this.worker = createWorker({
            logger: m => this.updateProgressAndLog(m),
        });

    }

    // added

    updateState(e) {
        this.setState({ fulltext: e.target.value });
        console.log(this.state.fulltext);
    }
    numbersub(e) {
        this.setState({ num: e.target.value });
        console.log(this.state.num);
    }

    onSubmitt() {
        console.log(this.state.fulltext, this.state.num);

        fetch('https://limitless-shelf-22412.herokuapp.com/summarizer/summary', {

            method: 'POST',
            body: JSON.stringify({
                url: this.state.ocrText,
                num: this.state.num
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
                ).then(res => {
                    console.log(res.data);
                    this.setState({ Data: res.data })
                    console.log(this.state.Data);
                }));
    }


    render() {
        return (
            <div className="App">
                <div className="scan__header">
                    <Header />
                </div>


                <div className="App__body">
                    <div className="container">
                        <div style={{ marginTop: "10%" }} className="row">
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-4">
                                <FilePond ref={ref => this.pond = ref}
                                    onaddfile={(err, file) => {
                                        this.doOCR(file);

                                    }}
                                    onremovefile={(err, fiile) => {
                                        this.setState({
                                            ocrText: ''
                                        })
                                    }}
                                />
                            </div>
                            <div className="col-md-4">

                            </div>
                        </div>
                        <div className="card">
                            <h5 className="card-header">
                                <div style={{ margin: "1%", textAlign: "left" }} className="row">
                                    <div className="col-md-12">
                                        <center><i className={"fas fa-sync fa-2x " + (this.state.isProcessing ? "fa-spin" : "")}></i> <span className="status-text">{this.state.isProcessing ? `Processing Image ( ${this.state.pctg} % )` : "Original Text"} </span></center>
                                    </div>

                                </div>

                            </h5>
                            <div class="card-body">
                                <p class="card-text">{(this.state.isProcessing) ?
                                    '...........'
                                    : this.state.ocrText?.length === 0 ? "Please Upload a File or Scan Image" : this.state.ocrText}</p>
                            </div>
                        </div>
                        {/* added */}

                        <div className="form-group">

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon">
                                        <i className="fas fa-pencil-alt prefix"></i>
                                    </span>
                                </div>
                                <textarea style={{ display: "none" }} className="form-control" id="noter-text-area" name="fulltext" value={this.state.ocrText} cols={60} rows={10} onChange={this.updateState} />
                            </div>
                            <span></span>
                            <div className="input-group">
                                <input id="num" type="numbers" className="form-control" name="num" value={this.state.num} placeholder="select from 1-10" max="10" onChange={this.numbersub} required/>
                            </div>
                            <div className="getSummerybtn">
                                {/* <Button variant="contained" color="secondary" onClick={this.onSubmitt}>
                                        Get Summery
                                </Button> */}
                                <Button name="Get Summary" txtColor="#ffffff" bgColor = "#828aed"/>
                            </div>

                           
                            {/* summery */}
                            <div className="card">
                                <h5 className="card-header">
                                    <div style={{ margin: "1%", textAlign: "left" }} className="row">
                                        <div className="col-md-12">
                                            <center><span className="status-text">Summarised text </span></center>
                                        </div>

                                    </div>

                                </h5>
                                <div class="card-body">
                                    <p class="card-text">{(this.state.isProcessing) ?
                                        '...........'
                                        : this.state.ocrText?.length === 0 ? "Please Upload a File or Scan Image" : this.state.Data}</p>
                                </div>
                            </div>

                        </div>

                        <div className="ocr-text">

                        </div>
                    </div>

                </div>
                {/* <div className = "scan__button">
                    <a><h4>Start</h4></a>
                </div> */}

                {/* <Scan/> */}

            </div>
        );
    }
}

export default ScanScreen;
