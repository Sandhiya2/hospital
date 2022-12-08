import { NavLink } from "react-router-dom";
import { FaBars, FaDelicious, FaUserMd , FaMoneyBill, FaUser, FaClinicMedical, 
  FaMedrt, FaEye, FaUserNurse, FaExchangeAlt, FaNetworkWired, FaPlus, FaBook, FaPrint, FaHospital,FaBed,FaBell } from "react-icons/fa";
import { BiSearch} from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/admin/main",
    name: "Dashboard",
    icon: <FaDelicious />,
  },
  {
    path: "/admin/main/department",
    name: "Department",
    icon: <FaNetworkWired />,
    subRoutes: [
      {
        path: "/admin/main/viewdepartment",
        name: "View Departments",
        icon:  <FaEye />,
      },
      {
        path: "/admin/main/adddepartment",
        name: "Add Department",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "/admin/main/patient",
    name: "Patient",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/admin/main/addpatient",
        name: "Add Patient",
        icon: <FaPlus />,
      },
      {
        path: "/admin/main/outpatient",
        name: "OP Registration",
        icon: <FaPlus />,
      },
      {
        path: "/admin/main/inpatient",
        name: "Inpatient Admission",
        icon: <FaPlus />,
      },
      {
        path: "/admin/main/viewpatient",
        name: "View Patient List",
        icon:  <FaEye />,
      },
    ],
  },
  {
    path: "/admin/main/doctor",
    name: "Doctor",
    icon: <FaUserMd />,
    subRoutes: [
      {
        path: "/admin/main/viewdoctor",
        name: "View Doctor List",
        icon:  <FaEye />,
      },
      {
        path: "/admin/main/adddoctor",
        name: "Add Doctor",
        icon: <FaPlus />,
      },
      {
        path: "/admin/main/addconsult",
        name: "Consult Details",
        icon: <FaEye />,
      },
    ],
  },
  {
    path: "/admin/main/staff",
    name: "Staff",
    icon: <FaUserNurse />,
    subRoutes: [
      {
        path: "/admin/main/viewstaff",
        name: "View Staff details",
        icon:  <FaEye />,
      },
      {
        path: "/admin/main/addstaff",
        name: "Add Staff",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "/admin/main/room",
    name: "Room Management",
    icon: <FaHospital />,
    subRoutes: [
      {
        path: "/admin/main/roomcategory",
        name: "Room Category",
        icon: <FaHospital />,
      },
      {
        path: "/admin/main/bedstatus",
        name: "Bed Enquiry",
        icon: <FaBed />,
      },
    ],
  },
  {
    path: "/admin/main/pharmacy",
    name: "Pharmacy",
    icon: <FaClinicMedical />,
    subRoutes: [
      {
        path: "/admin/main/addmedicines",
        name: "Add Medicines",
        icon: <FaPlus />,
      },
      {
        path: "/admin/main/addsales",
        name: "Medicines Sales",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "/admin/main/lab",
    name: "Laboratory",
    icon: <FaMedrt />,
    subRoutes: [
      {
        path: "/admin/main/viewlab",
        name: "View Lab details",
        icon: <FaEye />,
      },
    ],
  },
  {
    path: "/admin/main/monitor",
    name: "Monitor",
    icon: <FaEye />,
    subRoutes: [
      {
        path: "/admin/main/appointment",
        name: "View Appointment",
        icon: <FaExchangeAlt />,
      },
      {
        path: "/admin/main/notification",
        name: "Notification",
        icon: <FaBell />,
      },
      {
        path: "/admin/main/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/main/summary",
        name: "Discharge Summary",
        icon: <FaBook />,
      },
    ],
  },
  {
    path: "/admin/main/report",
    name: "Report Generation",
    icon: <FaPrint />,
    subRoutes: [
      {
        path: "/admin/main/inreport",
        name: "Inpatient Report",
        icon: <FaExchangeAlt />,
      },
      {
        path: "/admin/main/opreport",
        name: "Outpatient Report",
        icon: <FaExchangeAlt />,
      },
      {
        path: "/admin/main/labreport",
        name: "Lab Report",
        icon: <FaExchangeAlt />,
      },
      {
        path: "/admin/main/salesreport",
        name: "Sales Report",
        icon: <FaExchangeAlt />,
      },
    ],
  },
  {
    path: "/admin/main/profile",
    name: "User Profile",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/admin/main/aprofile",
        name: "Admin Profile",
        icon: <FaUser />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                 Admin
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
