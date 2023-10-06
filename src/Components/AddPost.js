import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useDispatch } from "react-redux";
import { addPostData } from "../Slices/PostSlice";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {id} = useParams();
  // console.log(id)
  const [description, setdescription]= useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  };
  const addPost = (description) => {
    navigate(`/users/${id}/posts`);
    // console.log('Input Value:', name, " ", email, " ", dob);
    dispatch(addPostData(id, description));
  };
  return (
    <div>
      <div className="formParent">
      <Container className="formParent-container" style={{'display':'flex','justifyContent': 'center'}}>
        <Form className="formChild"style={{ width: "70%" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Name">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e)=>setdescription(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            style={{ margin: "20px" }}
            onClick={() => addPost(description)}
          >
            ADD
          </Button>
        </Form>
      </Container>
    </div>
    </div>
  )
}

export default AddPost
