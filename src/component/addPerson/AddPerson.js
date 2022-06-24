import React, {useState, useEffect} from 'react'
import './addPerson.css'
import { Link, useParams } from 'react-router-dom';
import BookServices from '../../services/BookService'
import profile1 from '../../Assets/download1.jpg'
import profile2 from '../../Assets/download2.jpg'
import profile3 from '../../Assets/download3.jpg'
import profile4 from '../../Assets/download4.jpg'

const AddPerson = () =>{


let startValue = {
    name: "",
    profilePic:"",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    dob: "",
    isUpdate: false,
}
const [formValue, setForm] = useState(startValue)

const onReset = () => {
    setForm({
        ...startValue, id: formValue.id, isUpdate: formValue.isUpdate 
    });
};

const onNameChange = (event) => {
    setForm({ ...formValue, [event.target.name]: event.target.value });
    console.log('value for', event.target.name, event.target.value);
}
const params = useParams;

useEffect(() => {
    if (params.id) {
        getPersonId(params.id);
    }
},[params.id]);

const getPersonId = (bookId) => {
    console.log("Data Found")
    BookServices.getPersonById(bookId).then((response)=>{
        let obj = response.data.data;
        console.log(obj);
        setData(obj);
        });
    };
        
    const setData = (obj) => {
        let array = obj.dob;
        console.log()
            setForm({
                ...formValue,
               ...obj,
               id: obj.id,
               name: obj.name,
               profilePic: obj.profilePic,
               mobileNumber: obj.mobileNumber,
               address: obj.address,
               city: obj.city,
               email: obj.email,
               isUpdate :true,
               day: array[0]+array[1],
               month: array[3]+array[4]+array[5],
               year: array[7]+array[8]+array[9]+array[10]
            });
    };

const save = async (event) => {
    event.preventDefault();
    
    let object = {
        id: formValue.id,
        name: formValue.name,
        profilePic: formValue.profilePic,
        mobileNumber: formValue.mobileNumber,
        address: formValue.address,
        city: formValue.city,
        email: formValue.email,
        dob: `${formValue.day}-${formValue.month}-${formValue.year}`
    };
    
    if(formValue.isUpdate) {
        var answer = window.confirm("Data once modified can't be restored! Do you wish to continue?");
        if(answer === true) {
            BookServices.editPerson(params.id, object)
            alert("Data updated sucessfully!");
            this.props.history.push("");
            
        }
        else{
            window.location.reload();
        } 
    }
    else{
        BookServices.addPerson(object).then((response) => {
            console.log(response);
            alert("Data Added Successfully! ", response);
            window.location.reload();
        })
    }
    
}


  return (
    <div>
    
  <div className="home-button">
                    <Link to="/home">
                        <button variant="contained" size="large">Home</button></Link>
                </div>
      <div className="form-head">
          <span> PERSON ADDRESS FORM </span>
      </div>
      
      <form className="form" action="#" onSubmit={save}>
          <label className="label text" htmlFor="name">Full Name</label>
          <div className="row-content">
              <input className="input" type="text" id="name" name="name" placeholder="Enter Name" 
              onChange={onNameChange} value={formValue.name} required/>
              <error-output className="name-error" htmlFor="name"></error-output>
          </div>
          <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profilePic" checked={formValue.profilePic === '../../Assets/download1.jpg'}
                                    value="../../Assets/download1.jpg" onChange={onNameChange} />
                                <img className="profile" id="image1"
                                    src={profile1} />
                            </label>
                            <label>
                                <input type="radio" id="profile2"
                                    name="profilePic" checked={formValue.profilePic === '../../Assets/download2.jpg'}
                                    value="../../Assets/download2.jpg" onChange={onNameChange} />
                                <img className="profile" id="image2"
                                    src={profile2} />
                            </label>
                            <label>
                                <input type="radio" id="profil3"
                                    name="profilePic" checked={formValue.profilePic === '../../Assets/download3.jpg'}
                                    value="../../Assets/download3.jpg" onChange={onNameChange} />
                                <img className="profile" id="image3"
                                    src={profile3} />
                            </label>
                            <label>
                                <input type="radio" id="profile4"
                                    name="profilePic" checked={formValue.profilePic === '../../Assets/download4.jpg'}
                                    value="../../Assets/download4.jpg" onChange={onNameChange} />
                                <img className="profile" id="image4"
                                    src={profile4} />
                            </label>
                        </div>
                    </div>

          <label className="label text" htmlFor="phone">Phone Number</label>
          <div className="row-content">
              <input className="input" type="number" id="mobileNumber" name="mobileNumber" placeholder="Enter Phone Number" 
              onChange={onNameChange} value={formValue.mobileNumber} required/>
              <error-output className="phone-error" htmlFor="number"></error-output>
          </div>

          <label className="label text" htmlFor="address">Address</label>
          <div className="row-content">
              <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address" 
              onChange={onNameChange} value={formValue.address} ></textarea>
          </div>

          <label className="label text" htmlFor="city">City</label>
          <div className="row-content">
              <input className="input" type="text" id="city" name="city" placeholder="Enter city" 
              onChange={onNameChange} value={formValue.city} required/>
              <error-output className="city" htmlFor="city"></error-output>
          </div>
          <label className="label text" htmlFor="email">Email</label>
          <div className="row-content">
              <input className="input" type="text" id="email" name="email" placeholder="Enter Email" 
              onChange={onNameChange} value={formValue.email} required/>
              <error-output className="email" htmlFor="email"></error-output>
          </div>
          <div className="row-content">
                        <label className="label text" htmlFor="dob">Date of Birth</label>
                        <div>
                            <select id="day" name="day" value={formValue.day}
                                onChange={onNameChange}>
                                <option value="">Day</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select name="month" id="month" value={formValue.month}
                                onChange={onNameChange}>
                                <option value="" >Month</option>
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select name="year" id="year" value={formValue.year} onChange={onNameChange}>
                                <option value="" >Year</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2015">2016</option>
                                <option value="2015">2015</option>
                                <option value="2016">2014</option>
                                <option value="2016">2013</option>
                                <option value="2016">2012</option>
                                <option value="2016">2011</option>
                                <option value="2016">2010</option>
                                <option value="2016">2009</option>
                                <option value="2016">2008</option>
                                <option value="2016">2007</option>
                                <option value="2016">2006</option>
                                <option value="2016">2005</option>
                                <option value="2016">2004</option>
                                <option value="2016">2003</option>
                                <option value="2016">2002</option>
                                <option value="2016">2001</option>
                                <option value="2016">2000</option>
                                <option value="2016">1999</option>
                                <option value="2016">1998</option>
                                <option value="2016">1997</option>
                                <option value="2016">1996</option>
                                <option value="2016">1995</option>
                                <option value="2016">1994</option>
                                <option value="2016">1993</option>
                                <option value="2016">1992</option>
                                <option value="2016">1991</option>
                                <option value="2016">1990</option>
                                <option value="2016">1989</option>
                                <option value="2016">1988</option>
                            </select>
                        </div>
                    </div>
              
          <div className="buttonParent">
          <Link to="/home" className="resetButton
                        button cancelButton">Cancel</Link>
              <div className="add-reset">
                  <button type="submit" className="button addButton" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                  
                  <button type="reset" className="resetButton button" id="resetButton" onClick={onReset}>Reset</button>
              </div>
          </div>
      </form>
  </div>
  )
}

export default AddPerson;