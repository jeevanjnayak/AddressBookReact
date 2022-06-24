import React, { Component } from 'react'
import './Header.css'
import logo from '../../addressbookreact/src/Assets/icon.png'

export class Header extends Component {
  render() {
    return (
      <div>
          <header className="header-content header">
		    <div className="logo-content">
			    <img src={ logo } alt="" />
			    <div>
				    <span className="address-text">Address</span><br />
				    <span className="address-text address-book">Book</span>
			    </div>
		    </div>
            <div>
                <span className="head-text"></span>
            </div>
            </header>
        </div>
    )
  }
}

export default Header