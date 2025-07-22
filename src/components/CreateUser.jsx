import React, { useState } from 'react';
import './CreateUser.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateUser = () => {
  const [user, setUser] = useState({
    name: '',
    age: ''
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.age || !photoFile) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('age', user.age);
    formData.append('photo', photoFile);

    try {
      await axios.post('http://localhost:5000/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("User added successfully!");
      setUser({ name: '', age: '' });
      setPhotoFile(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="create-user-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="create-user-form">
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={user.age}
          onChange={handleChange}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default CreateUser;
