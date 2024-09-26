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
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Name</label>
            <input className={styles.input} type="text" value={name} onChange={handleChange} id="name" placeholder="Name" name="name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email address</label>
            <input className={styles.input} type="email" value={email} onChange={handleChange} id="email" placeholder="Enter email" name="email" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>Phone</label>
            <input className={styles.input} type="phone" value={phone} onChange={handleChange} id="phone" placeholder="Phone" name="phone" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="desc" className={styles.formLabel}>Description</label>
            <textarea className={styles.input} onChange={handleChange} id="desc" name="desc" placeholder="Enter Description"  value={desc} rows="3" />
          </div>
          <button className={styles.btn} type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Contact