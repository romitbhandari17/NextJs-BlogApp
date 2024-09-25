"use client"
import React, { useState } from 'react'
import styles from "./contact.module.css";


const Contact = () => {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, desc, email, phone);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, desc, email, phone }),
        headers: myHeaders,
      });
      setDesc('')
      setName('')
      setEmail('')
      setPhone('')
      alert("Data Submitted Successfully")
    }catch(error){
      console.log("Error calling API", error);
    }
    


  }

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value);
    } else if (e.target.name == 'email') {
      setEmail(e.target.value);
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name == 'desc') {
      setDesc(e.target.value);
    }
  }
  return (
    <div className={styles.container}>
      <h1>
        Contact Us
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Name</label>
            <input type="text" value={name} onChange={handleChange} className={styles.formControl} id="name" placeholder="Name" name="name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email address</label>
            <input type="email" value={email} onChange={handleChange} className={styles.formControl} id="email" placeholder="Enter email" name="email" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>Phone</label>
            <input type="phone" value={phone} onChange={handleChange} className={styles.formControl} id="phone" placeholder="Phone" name="phone" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="desc" className={styles.formLabel}>Description</label>
            <textarea onChange={handleChange} className={styles.formControl} id="desc" name="desc" value={desc} rows="3" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </h1>
    </div>
  )
}

export default Contact