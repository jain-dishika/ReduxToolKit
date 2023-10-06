import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useDispatch } from "react-redux";
import { addUserData } from "../Slices/UserSlice";

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dateOfBirth, setdateOfBirth] = useState();
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  };
  const addUser = (name, email, dateOfBirth) => {
    navigate('/');
    // console.log('Input Value:', name, " ", email, " ", dob);
    dispatch(addUserData(name, email, dateOfBirth));
  };
  return (
    <div className="formParent">
      <Container className="formParent-container" style={{'display':'flex','justifyContent': 'center'}}>
        <Form style={{ width: "70%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={inputName}
              onChange={(e)=>setInputName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={inputEmail}
              onChange={(e)=>setInputEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="dob"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={dateOfBirth}
              onChange={(e)=>setdateOfBirth(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ margin: "20px" }}
            onClick={() => addUser(inputName, inputEmail, dateOfBirth)}
          >
            ADD
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddUser;



