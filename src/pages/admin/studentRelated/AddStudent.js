// src/pages/admin/AddStudent.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { CircularProgress } from "@mui/material";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");                 // NEW
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const adminID = currentUser?._id; // safe access
  const role = "Student";
  const attendance = [];

  // fetch classes only when adminID available
  useEffect(() => {
    if (adminID) dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  // preselect class if route supplies id (situation === "Class")
  useEffect(() => {
    if (situation === "Class" && params.id) {
      setSclassName(params.id);
      const selected = sclassesList.find((c) => c._id === params.id);
      if (selected) setClassName(selected.sclassName);
    }
  }, [params.id, situation, sclassesList]);

  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class");
      setSclassName("");
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      if (selectedClass) {
        setClassName(selectedClass.sclassName);
        setSclassName(selectedClass._id);
      }
    }
  };

  // build payload ensuring types
  const buildFields = () => ({
    name: name.trim(),
    email: email.trim(),
    rollNum: Number(rollNum),
    password,
    sclassName,
    adminID,
    role,
    attendance,
  });

  const submitHandler = (event) => {
    event.preventDefault();

    // client-side validations
    if (!adminID) {
      setMessage("Admin not loaded yet. Try again in a moment.");
      setShowPopup(true);
      return;
    }
    if (!name || !email || !rollNum || !password) {
      setMessage("Please fill all fields (name, email, roll number, password).");
      setShowPopup(true);
      return;
    }
    if (!sclassName) {
      setMessage("Please select a class");
      setShowPopup(true);
      return;
    }

    setLoader(true);
    dispatch(registerUser(buildFields(), role));
  };

  useEffect(() => {
    // respond to register status from redux
    if (status === "added") {
      setLoader(false);
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      setMessage(response || "Failed to add student");
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage(error || "Network error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, response, error, dispatch]);

  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Student</span>

          <label>Name</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter student's name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter student's email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {situation === "Student" && (
            <>
              <label>Class</label>
              <select className="registerInput" value={className} onChange={changeHandler} required>
                <option value="Select Class">Select Class</option>
                {sclassesList.map((classItem) => (
                  <option key={classItem._id} value={classItem.sclassName}>
                    {classItem.sclassName}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>Roll Number</label>
          <input
            className="registerInput"
            type="number"
            placeholder="Enter student's Roll Number..."
            value={rollNum}
            onChange={(e) => setRollNum(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter student's password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
          </button>
        </form>
      </div>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddStudent;
