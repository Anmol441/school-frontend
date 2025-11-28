import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { Button, Collapse } from '@mui/material';

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const address = "Admin";

  // 🟢 Hooks MUST be before any return statement.
  const [showTab, setShowTab] = useState(false);

  // Safe initialization (if currentUser is null temporarily)
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState(currentUser?.schoolName || "");

  // If user not loaded yet → show loader (AFTER hooks)
  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", padding: "40px", fontSize: "20px" }}>
        Loading Profile...
      </div>
    );
  }

  const fields =
    password === ""
      ? { name, email, schoolName }
      : { name, email, password, schoolName };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(fields, currentUser._id, address));
  };

  const deleteHandler = () => {
    dispatch(deleteUser(currentUser._id, "Students"));
    dispatch(deleteUser(currentUser._id, address));
    dispatch(authLogout());
    navigate('/');
  };

  return (
    <div style={styles.page}>

      {/* PROFILE CARD */}
      <div style={styles.card}>
        <div style={styles.header}>

          {/* Avatar hover animation */}
          <div
            style={styles.avatarWrapper}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Admin Avatar"
              style={styles.avatar}
            />
          </div>

          <div>
            <h2 style={styles.name}>{currentUser.name}</h2>
            <p style={styles.role}>School Administrator</p>
          </div>
        </div>

        {/* INFO */}
        <div style={styles.infoSection}>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>School:</strong> {currentUser.schoolName}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div style={styles.buttons}>
          <Button variant="contained" color="error" onClick={deleteHandler}>
            Delete Account
          </Button>

          <Button
            variant="contained"
            sx={styles.editButton}
            onClick={() => setShowTab(!showTab)}
          >
            {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            {showTab ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      {/* EDIT FORM */}
      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <div style={styles.editCard}>
          <form onSubmit={submitHandler}>
            <span style={styles.formTitle}>Edit Profile Details</span>

            <label>Name</label>
            <input
              style={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>School Name</label>
            <input
              style={styles.input}
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password (optional)</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.updateBtn} type="submit">
              Update
            </button>
          </form>
        </div>
      </Collapse>
    </div>
  );
};

export default AdminProfile;

/* ===========================
   INLINE STYLES
=========================== */

const styles = {
  page: {
    maxWidth: "650px",
    margin: "40px auto",
    padding: "0 15px",
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  avatarWrapper: {
    display: "inline-block",
    transition: "0.3s",
  },

  avatar: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    border: "3px solid #4a63e7",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  name: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },

  role: {
    marginTop: "5px",
    color: "#666",
    fontSize: "15px",
  },

  infoSection: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.6",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginTop: "25px",
    flexWrap: "wrap",
  },

  editButton: {
    backgroundColor: "#2e5bff !important",
    "&:hover": { backgroundColor: "#1f45cc !important" },
  },

  editCard: {
    marginTop: "20px",
    padding: "25px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  },

  formTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    display: "block",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "12px",
    fontSize: "15px",
  },

  updateBtn: {
    width: "100%",
    padding: "12px",
    background: "#2e5bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
