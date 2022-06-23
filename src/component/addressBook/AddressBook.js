import React, { Component} from 'react'
import './addressbook.css'
import {Link, withRouter} from 'react-router-dom'
import Add from 'D:/React/addressbookreact/src/Assets/add.svg'
import Delete from 'D:/React/addressbookreact/src/Assets/delete.svg'
import Edit from 'D:/React/addressbookreact/src/Assets/edit.svg'
import BookService from '../../services/BookService'
import profile1 from '../../Assets/download1.jpg'
import profile2 from '../../Assets/download2.jpg'
import profile3 from '../../Assets/download3.jpg'
import profile4 from '../../Assets/download4.jpg'


class AddressBook extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            addressbook: [],
        };
    }

    componentDidMount() {
        this.fetchData();
        console.log(this.props)
    }

	fetchData() {
        BookService.getAll().then((response) => {
            this.setState({ addressbook: response.data.data });
        });
    }
    
    deletePerson = (personId) => {
        var answer = window.confirm("once deleted can't be restored! Do you want to continue?");
        if(answer === true){
            BookService.deletePerson(personId);
            alert("person deleted sucessfully");
            window.location.reload();
        }
        else {
            window.location.reload();
        }
};

    EditPerson = (id) => {
        this.props.history.push(`AddPerson/${id}`);
        console.log(id);
     };
    /*============================================================================================ */
    render() {
  return (
    <div>    
    <div className="main-content">
        <div className="header-content">
            <div className="person-detail-text">
                Person Details
            </div>
            <Link to="/add" className="add-button">
                <img src={Add} alt="Add User"/>Add User</Link>
        </div>
    
    <table id="table-display" className="table">
        <tr>
            
            <th>Name</th>
            <th>Profile Pic</th>
            <th>Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>dob</th>
            <th>Action</th>
        </tr>
        <tbody>
                    {this.state.addressbook.map((book,index) => (
                        <tr key={`${index}`}>                             
                            <td>{book.name}</td>
                            <td>
                                    <img src={ book.profilePic=== "../../Assets/download1.jpg" ? profile1 :
                                    book.profilePic=== "../../Assets/download2.jpg" ? profile2 :
                                    book.profilePic=== "../../Assets/download3.jpg" ? profile3 : profile4 
                                    } alt="ProfilePic" srcSet="" /></td>
                            <td>{book.mobileNumber}</td>
                            <td>{book.email}</td>
							<td>{book.address}</td>
							<td>{book.city}</td>
                            <td>{book.dob}</td>
                            <td>
                            <img src={Delete} alt="delete" onClick={() => this.deletePerson(book.id)}/>
                            <img src={Edit} alt="edit" onClick={() => this.EditPerson(book.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>      
            </table>
        </div>
    </div>
  )}
}
export default withRouter(AddressBook);