import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserData, getUsersData, updateUserData} from "../Slices/UserSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const { users, isLoading, error } = useSelector((state) => state.usersList);
  console.log(users);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState();

  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  // console.log(users);
  const deleteUser = (index) => {
    dispatch(deleteUserData(index));
  };

  const updateUser = (id, name, email,dateOfBirth) => {
    console.log(name)
    dispatch(updateUserData(id, name, email, dateOfBirth));
    handleClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (item) => {
    setName(item.name);
    setEmail(item.email);
    setId(item.id);
    setdateOfBirth(item.dateOfBirth);
    setShow(true);
  };

  useEffect(() => {
    // console.log("hello");
    dispatch(getUsersData());
  },[]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <>
        <Table striped bordered hover variant="danger">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Description</th>
              <th>Post</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            {users !== undefined &&
              users.map((item, index) => (
                // <div>{item.name}</div>
                // {item !== undefined}
                <tr key={index}>
                  <th>{item.id}</th>
                  <th>{item.name}</th>
                  <th>{item.email}</th>
                  <th>{item.dateOfBirth}</th>
                  <th><ul>{item.posts && item.posts.map((desc)=>(
                      <li>{desc.description}</li>
                    ))}</ul></th>
                  <th>
                    <button className="tableButton"
                    onClick={()=>navigate(`/users/${item.id}/posts`)}>Post</button>
                  </th>
                  <th>
                    <button
                      className="tableButton"
                      onClick={() => deleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    <button className="tableButton"onClick={() => handleButtonClick(item)}>Edit</button>
                  </th>
                </tr>
              ))}
          </thead>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    defaultValue={name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-center">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    defaultValue={email || " "}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  controlId="dob"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={dateOfBirth}
                    onChange={(e) => setdateOfBirth(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ margin: "20px" }}
                  onClick={() => updateUser(id, name, email, dateOfBirth)}
                  // onClick={handleClose}
                >
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Table>
      </>
    </div>
  );
};

export default UserList;
