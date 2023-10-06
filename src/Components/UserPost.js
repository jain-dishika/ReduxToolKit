import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getPostData, deletePostData, updatePostData } from '../Slices/PostSlice';
const UserPost = () => {
  const { posts, isLoading, error } = useSelector((state) => state.postList);
  const navigate = useNavigate();
  // console.log(posts);
  const {id} = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPostData(id));
  },[])

  const [description, setdescription] = useState("");

  const [pId, setpId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const deletePost = (index) => {
    dispatch(deletePostData(index, id));
  };

  const updatePost = (index, description, id) => {
    dispatch(updatePostData(index, description, id));
    handleClose();
  }

  const handleButtonClick = (item) => {
    setdescription(item.description);
    setpId(item.id);
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th>id</th>
              <th>Description</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            {posts !== undefined &&
              posts.map((item, index) => (
                // <div>{item.name}</div>
                // {item !== undefined}
                <tr key={index}>
                  <th>{item.id}</th>
                  <th>{item.description}</th>
                  <th>
                    <button
                      className="tableButton"
                      onClick={() => deletePost(item.id)}
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    <button className="tableButton"
                    onClick={() => handleButtonClick(item)}
                    >Edit</button>
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    defaultValue={description || ""}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </Form.Group>
                
                <Button
                  variant="primary"
                  type="submit"
                  style={{ margin: "20px" }}
                  onClick={() => updatePost(pId, description, id)}
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
        <div style={{'marginTop': "20px", "display":"flex", "justifyContent":"center","width":"100%"}}><Button variant='primary' onClick={()=>navigate(`/users/${id}/posts/addPost`)}>ADD POST</Button></div>
    </div>
  )
}

export default UserPost
