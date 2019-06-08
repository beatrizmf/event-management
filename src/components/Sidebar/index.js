import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";

class Sidebar extends Component {

  handleLogout = async props => {
    try {
      await logout();
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <ul className="navbar-nav bg-warning sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Event Management</div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <span className="nav-link">
            <i className="fas fa-fw fa-home"></i>
            <Link className="text-decoration-none text-white" to="/">Home</Link>
          </span>
        </li>
        <hr className="sidebar-divider" />
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
            aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Administrator</span>
          </a>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="text-decoration-none" to="/admin/events"><span className="collapse-item">Events</span></Link>
              <Link className="text-decoration-none" to="/admin/events/create"><span className="collapse-item">New Event</span></Link>
            </div>
          </div>
        </li>
        <hr className="sidebar-divider" />
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <i className="fas fa-fw fa-user-alt"></i>
            <span>Profile</span>
          </a>
          <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">            
              <Link className="text-decoration-none" to="/user/events"><span className="collapse-item">My events</span></Link>
              <Link className="text-decoration-none" to="/user/settings"><span className="collapse-item">Settings</span></Link>
              <Link className="text-decoration-none" to="/"><span className="collapse-item" onClick={this.handleLogout}>Logout</span></Link>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

export default Sidebar;