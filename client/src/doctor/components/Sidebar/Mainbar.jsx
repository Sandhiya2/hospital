import React from 'react';
import './Mainbar.css'
import {Link} from "react-router-dom";
import { FaUser,FaLockOpen } from "react-icons/fa";
const Mainbar = () => {
    return (  
        <>
        <div class="wrapper">
	<div class="navbar">
		<div class="logo">
		      <h2>Velan Hospital</h2>
		</div>
		<div class="nav_right">
			<ul>
				<li class="nr_li dd_main">
					<Link to={`/main/aprofile`} className="ap">
					<h4><FaUser />Doctor</h4>
                  </Link>
				</li>

				<li class="nr_li dd_main">
					<Link to={`/`} className="ap">
					<h4><FaLockOpen/>Logout</h4>
                  </Link>
				</li>
			</ul>
		</div>
	</div>
</div>	
</>
    );
}
 
export default Mainbar;