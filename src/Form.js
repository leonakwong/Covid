import React from 'react';
import { useState } from 'react';

export default function Form(){

    const [FormData, setFormData] = useState({
        zipcode: "",
        serviceType: "",
        type: ""
    })
    const {zipcode, serviceType, type} = FormData;
    const onFormChange = (e) => {
        setFormData(prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }
    
    const onFormSubmission = (e) => {
        e.preventDefault()
        console.log(FormData)
    } //conditionals for redirect

    return <>
    <form onSubmit = {onFormSubmission}> 
        <div>
            <h1>
                1. Enter your zipcode:
            </h1>
            <input type = "text" name = "zipcode" value = {zipcode} onChange = {onFormChange} placeholder = "Zipcode"/>
        </div>
        {zipcode && <div>
            <input type = "radio" name = "serviceType" value = "vaccine" onChange = {onFormChange}/>
            <label>
                "Vaccine"
            </label>
            <input type = "radio" name = "serviceType" value = "rapidtest" onChange = {onFormChange}/>
            <label>
                "Rapid Testing"
            </label>
            <input type = "radio" name = "serviceType" value = "hospitals" onChange = {onFormChange}/>
            <label>
                "Hospitals"
            </label>
        </div>}
        {serviceType === 'vaccine' && <div>
            <input type = "radio" name = "type" value = "moderna" onChange = {onFormChange}/>
            <label>
                "Moderna"
            </label>
            <input type = "radio" name = "type" value = "pfizer" onChange = {onFormChange}/>
            <label>
                "Pfizer BioTech"
            </label>
            <input type = "radio" name = "type" value = "jansenn" onChange = {onFormChange}/>
            <label>
                "Jansenn"
            </label>
        </div>}
        {serviceType === 'rapidtest' ? (<div> 
            <input type = "radio" name = "type" value = "moderna" onChange = {onFormChange}/>
            <label>
                "x"
            </label>
            <input type = "radio" name = "type" value = "pfizer" onChange = {onFormChange}/>
            <label>
                "y"
            </label>
            <input type = "radio" name = "type" value = "jansenn" onChange = {onFormChange}/>
            <label>
                "z"
            </label>
        </div>) : ('hello')}
        <button type = 'submit'>
            Submit
        </button>
    </form>
  </>

}