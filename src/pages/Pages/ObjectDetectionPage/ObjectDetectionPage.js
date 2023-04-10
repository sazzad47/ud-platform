import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  UncontrolledDropdown,
  Modal,
  FormGroup,
  Input
} from "reactstrap";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Icons
import FeatherIcon from "feather-icons-react";
//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Link } from "react-router-dom";
// Import Images
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import {Basic} from "../../Charts/ApexCharts/TimelineCharts/TimelineCharts";
import Select from "react-select";
const ObjectDetection = () => {
    document.title="Object Detection | Velzon - React Admin & Dashboard Template";
    const [modal_board, setmodal_board] = useState(false);
    const [query, setQuery] = useState("");
    const [switchPlay, setSwitch] = useState(false);
    const [switchMute, setMuteSwitch] = useState(false);
    const [settings_Menu, setsettings_Menu] = useState(false);

    // Image Modal 
    function tog_board() {
        setmodal_board(!modal_board);
    }
    // For search functionality 
    const DetectedObjects = [
      {
        id: 1,
        name: "Car",
        color: "primary",
        number: 372
      },
      {
        id: 2,
        name: "Motorcycle",
        color: "secondary",
        number: 187
      },
      {
        id: 3,
        name: "Sail Boat",
        color: "success",
        number: 76
      },
      {
        id: 4,
        name: "Person",
        color: "info",
        number: 42
      },
      {
        id: 5,
        name: "Dog",
        color: "warning",
        number: 25
      }
    ]
    const StatusCheck = [
      {
        id: 1,
        name: "Ground Truth"
      },
      {
        id: 2,
        name: "Predict"
      },
      {
        id: 3,
        name: "Ignore"
      },
      {
        id: 4,
        name: "Working",
      },
    ]
    // Play pause icon .
    const togglePlay =() =>{
      switchPlay? setSwitch(false): setSwitch(true);
    }
    // Mute pause icon .
    const toggleMute =() =>{
      switchMute? setMuteSwitch(false): setMuteSwitch(true);
    }
    //Setting
    const toggleSettings = () => {
      setsettings_Menu(!settings_Menu);
    };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Object Detection " pageTitle="Pages" />
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            {/* Left Sidebar  */}
            <div className="chat-leftsidebar height-width">
              <div className="px-4 pt-4 mb-4">
                {/* Search Box  */}
                <div className="search-box">
                  <input
                    id="search"
                    type="text"
                    className="form-control bg-light border-light"
                    placeholder="Search here..."
                    onChange={e=>setQuery(e.target.value)}
                  />
                  <i className="ri-search-2-line search-icon"></i>
                </div>
              </div>

              <PerfectScrollbar className="chat-room-list">
              {/* Below Search Box */}
              <div className="chat-message-list">
                  <ul
                    className="list-unstyled chat-list chat-user-list mb-0 users-list"
                    id="channelList"
                  >
                    {StatusCheck.filter(status=> status.name.toLowerCase().includes(query)).map((status) => (
                    <li key={status.id}>
                      <Link to="#" className="unread-msg-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className="avatar-title bg-light rounded-circle text-body">-
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0">{status.name}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    ))}
                  </ul>
              </div>

              <hr />
              {/* From to */}
              <div>
                <div className="px-3  rounded-2 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h6 className="text-muted font-weight-normal">From</h6>
                    </div>
                    <div className="flex-shrink-0">
                      <h6 className="mb-0">00.00.00.00</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h6 className="text-muted font-weight-normal">To</h6>
                    </div>
                    <div className="flex-shrink-0">
                      <h6 className="mb-0">00.17.21.52</h6>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              
              {/* Instances  */}
              <div>
                <div className="px-3  rounded-2 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h6 className="mb-0 text-muted font-weight-normal">Instances</h6>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="input-light">
                          <Input type="select" className="border-0" name="select" id="exampleSelect" >
                            <option value="First">First</option>
                            <option value="Seocnd">Second</option>
                            <option value="Third">Third</option>
                          </Input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            
              {/* Longer than  */}
              <div>
                <div className="px-3  rounded-2 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h6 className="mb-0 text-muted font-weight-normal">Longer than</h6>
                    </div>
                    <div className="flex-shrink-0">
                      <Input type="select" className=" border-0" name="select" id="exampleSelect" >
                        <option value="5">5 Sec</option>
                        <option value="10">10 Sec</option>
                      </Input>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              
              {/* Detected Objects  */}
              <div  className="chat-message-list">
                  <ul
                    className="list-unstyled chat-list chat-user-list mb-0 users-list" id="channelList">
                    <li>
                      <Link to="#" className="unread-msg-user" >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-truncate mb-0 font-weight-bold">+</p>
                          </div>
                          <div className="flex-shrink-0">
                                  <span className="text-muted">
                                    All None
                                  </span>
                                </div>
                        </div>
                      </Link>
                    </li>
                    {DetectedObjects.filter(obj=> obj.name.toLowerCase().includes(query)).map((obj) => (
                    <li key={obj.id}>
                      <Link to="#" className="unread-msg-user" >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                            <div className="avatar-xxs">
                              <div className={`avatar-title bg-gradient   rounded-circle text-body bg-${obj.color}`}>
                              </div>
                            </div>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="mb-0 text-muted font-weight-normal">{obj.name}</p>
                          </div>
                          <div className="flex-shrink-0">
                                  <span>
                                    {obj.number}
                                  </span>
                                </div>
                        </div>
                      </Link>
                    </li>
                    ))}
                  </ul>
              </div>
              </PerfectScrollbar>
            </div>

            {/* Middle Component  */}
            <div className="w-100 overflow-hidden">
              <div className="chat-content d-lg-flex">
                <div className="w-100 overflow-hidden position-relative">
                  <div className="position-relative">
                    <Row>
                      <Col xl={12}>
                        <Card className="height-width mb-0">
                            <CardHeader>
                              <h4 className="card-title mb-0"> Device-name-01</h4>
                            </CardHeader>
                            <CardBody>
                                <div className="live-preview">
                                    {/* <!-- 16:9 aspect ratio --> */}
                                    <div className="ratio ratio-16x9">
                                        {/* <iframe className="rounded" src="https://www.youtube.com/embed/1y_kfWUCFDQ" title="YouTube video" allowFullScreen></iframe> */}
                                        <img src="https://media.wired.com/photos/5a31bcff41e00716c855d00e/16:9/w_2400,h_1350,c_limit/traffic-FA.jpg" className="img-thumbnail" alt="" />
                                    </div>
                                    <div className="py-2 mt-3   d-flex justify-content-between  align-items-center ">
                                      <div className="d-flex align-items-center">
                                        {/* <Link to="#"><i className="font-weight">1x</i></Link> */}
                                        {/* <Link to="#"><i className={`bx  bx bx-${switchMute?"volume-full ":"volume-mute"} bx-sm px-2`} onClick={toggleMute}></i></Link> */}
                                        <Link to="#"><i className="bx bx-skip-previous-circle bx-sm px-2"></i></Link>
                                        <Link to="#"><i className={`bx bx-${switchPlay?"play-circle":"pause-circle"} bx-md px-2`} onClick={togglePlay}></i></Link>
                                        <Link to="#"><i className='bx bx-skip-next-circle bx-sm px-2'></i></Link>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <div className="input-light ">
                                          <Input type="select" name="select" id="exampleSelect" className="border-0">
                                            <option value="First">100%</option>
                                            <option value="Seocnd">150%</option>
                                            <option value="Third">200%</option>
                                          </Input>
                                        </div>
                                        <Dropdown
                                          isOpen={settings_Menu}
                                          toggle={toggleSettings}
                                        >
                                          <DropdownToggle
                                            className="btn btn-ghost-secondary btn-icon"
                                            tag="button"
                                          >
                                            <FeatherIcon
                                              icon="more-vertical"
                                              className="icon-sm"
                                            />
                                          </DropdownToggle>
                                          <DropdownMenu>
                                            <DropdownItem
                                              href="#"
                                              className="d-block d-lg-none user-profile-show"
                                            >
                                              <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
                                              View Profile
                                            </DropdownItem>
                                            <DropdownItem href="#">
                                              <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
                                              Archive
                                            </DropdownItem>
                                            <DropdownItem href="#">
                                              <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
                                              Muted
                                            </DropdownItem>
                                            <DropdownItem href="#">
                                              {" "}
                                              <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
                                              Delete
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </Dropdown>
                                        <Link to="#"><i className="bx bxs-cog bx-sm px-2"></i></Link>
                                      </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>

            {/* Right-Sidebar  */}
            <div className="chat-leftsidebar height-width-right overflow-hidden">
              <div className="px-2 pt-4 mb-4">
                {/* Select Box  */}
                <div className="pb-2">
                  <div className="input-light">
                    <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                      <option value="">Objects</option>
                      <option defaultValue="all"  >Clip</option>
                      <option value="New">Bots</option>
                      <option value="Pending">Markers</option>
                      <option value="Inprogress">View</option>
                    </select>
                  </div>
                </div>
                {/* Search Box  */}
                <div className="search-box">
                  <input
                  id="search"
                    type="text"
                    className="form-control bg-light border-light"
                    placeholder="Search here..."
                  />
                  <i className="ri-search-2-line search-icon"></i>
                </div>
              </div>

              {/* Images  */}
              <PerfectScrollbar className="chat-room-list">
                <div className="px-1 container-fluid overflow-hidden ">
                  <Row className="py-2">
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt=""  onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-primary rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border-sucess border border-1 border-secondary rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-success rounded cursor-pointer" />
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-warning rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border-sucess border border-1 border-danger rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-dark rounded cursor-pointer" />
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-primary rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border-sucess border border-1 border-secondary rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-success rounded cursor-pointer" />
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-warning rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border-sucess border border-1 border-danger rounded cursor-pointer" />
                    </Col>
                    <Col xl={4} sm={4} md={4}>
                      <img src={avatar4} alt="" onClick={() => { tog_board(); }} className=" avatar-md border border-1 border-dark rounded cursor-pointer" />
                    </Col>
                  </Row>
                </div>
              </PerfectScrollbar>

              {/* View Image Modal*/}
              <Modal isOpen={modal_board} toggle={() => { tog_board(); }} centered id="createboardModal" className="border-0 modal-sm">
                <div className="modal-header p-3 detected-object-modal">
                  <h5 className="modal-title" id="addmemberModalLabel">Detected Object Close-up</h5>
                    <Button type="button" onClick={() => { setmodal_board(false); }} id="btn-close2" className="btn-close" aria-label="Close" >
                    </Button>
                </div>
                <div className="modal-body text-center">
                  <img src={avatar4} alt="" className="avatar-xxl border-sucess border border-1 border-secondary rounded cursor-pointer" />
                </div>
              </Modal>
            </div>
          </div>
        </Container>
        {/* Timeline  */}
        <Card>
              <CardBody>
                  <Basic dataColors='["--vz-primary"]'/>
              </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ObjectDetection;