import React, {Component} from 'react';
import Record from './Record';
// import {getJSON} from 'jquery';
// import axios from 'axios';
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'

class Records extends Component {
    constructor(){
        super();
        this.state={
            records:[],
            error:null,
            isLoaded:false
        }
    }

    componentDidMount(){
        //getJSON("https://5aa906004cf36300144e95db.mockapi.io/api/v1/records").then(
        // axios.get("https://5aa906004cf36300144e95db.mockapi.io/api/v1/records").then(
        // axios.get(`${RecordsAPI.api}/api/v1/records`).then(
        RecordsAPI.getAll().then(
            response=>this.setState({
                isLoaded:true,
                records:response.data
            })
        ).catch(
            error=>this.setState({
                 isLoaded:true,
                 error
            })
        )
    }

    addRecord(record){
        this.setState({
            records:[
                ...this.state.records,
                record
            ],
            error:null,
            isLoaded:true
        })
    }

    updateRecord(record,data){
        const recordIndex = this.state.records.indexOf(record);
        const newRecords=this.state.records.map((item,index)=>{
            if(index!==recordIndex){
                return item;
            }
            return {
                ...item,
                // todo:这里为何要...data,
                ...data
            }
        });
        this.setState({
            records:newRecords
        })
    }

    deleteRecord(record){
        console.log(record);
        const recordIndex = this.state.records.indexOf(record);
        const newRecords=this.state.records.filter((item,index)=>index!==recordIndex);
        this.setState({
            records:newRecords
        })
    }
    render() {
        const {error,isLoaded,records} = this.state;
        let recordsComponent;

        if(error){
            recordsComponent = <div>Error:{error.message}</div>
        }else if(!isLoaded){
            recordsComponent = <div>Loading...</div>
        }else{
            recordsComponent = (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{records.map((record)=><Record key={record.id} {...record} handleEditRecord={this.updateRecord.bind(this)} />)}*/}
                    {records.map((record)=>(
                        //这里包裹为什么不能用{}
                        <Record
                            key={record.id}
                            record={record}
                            handleEditRecord={this.updateRecord.bind(this)}
                            handleDeleteRecord={this.deleteRecord.bind(this)}/>
                        )
                    )}
                    </tbody>
                </table>
            );
        }

        return(
            <div>
                <h2>Records</h2>
                <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
                {recordsComponent}
            </div>
        )
    }
}

export default Records;
