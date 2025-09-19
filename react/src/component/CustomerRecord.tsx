import React, { useState } from "react";

const CustomerRecord: React.FC = () => {
    const initialFormObject: any = { name: 'name1', email: 'email1', password: 'password1' };
    const [formObject, setFormObject] = useState(initialFormObject);

    const changeHandler = function (event: any) {
        const name = event.target.name;
        const value = event.target.value;
        formObject[name] = value;
        setFormObject({ ...formObject })
    }

    const deleteSelected = () => {
        console.log("deleteSelected")
    }

    const saveSelected = () => {
        console.log("saveSelected")
    }

    const cancelSelected = () => {
        console.log("cancelSelected")
    }

    return (
        <div>
            <h2>Customer Record</h2>
            <button>Add</button>
            <button>Update</button>
            <div>
                <input type="text" name={"name"} value={formObject.name} placeholder="Name" onChange={(e) => changeHandler(e)} />
                <input type="email" name={"email"} value={formObject.email} placeholder="Email" onChange={(e) => changeHandler(e)} />
                <input type="password" name={"password"} value={formObject.password} placeholder="Password" onChange={(e) => changeHandler(e)} />
                <div>
                    <input type="button" value="delete" onClick={() => deleteSelected()} />
                    <input type="button" value="save" onClick={() => saveSelected()}/>
                    <input type="button" value="cancel" onClick={() => cancelSelected()}/>
                </div>
            </div>
        </div>
    );
};

export default CustomerRecord;
