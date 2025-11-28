import React, { useState, useRef } from "react";
import {
  Container,
  Paper,
  Grid,
  Avatar,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";

const StudentProfile = () => {
  // redux user
  const { currentUser } = useSelector((state) => state.user || {});

  // UI state
  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });

  // form states (safe init)
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [rollNum, setRollNum] = useState(currentUser?.rollNum || "");
  const [className, setClassName] = useState(currentUser?.sclassName?.sclassName || "");
  const [schoolName, setSchoolName] = useState(currentUser?.school?.schoolName || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [address, setAddress] = useState(currentUser?.address || "");

  // password change
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // avatar upload
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatarUrl || null);
  const fileInputRef = useRef();

  // helpers
  const showSnack = (msg, sev = "success") => setSnack({ open: true, message: msg, severity: sev });

  // ===== Edit profile submit (calls backend) =====
  const handleProfileSave = async () => {
    // build payload
    const payload = { name, email, rollNum, className, schoolName, phone, address };

    try {
      // replace URL with your actual backend endpoint
      const res = await fetch("/api/student/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showSnack("Profile updated successfully.");
        setEditOpen(false);
        // optionally dispatch redux action to update user in store
      } else {
        showSnack(data.message || "Failed to update profile", "error");
      }
    } catch (err) {
      console.error(err);
      showSnack("Could not reach server to update profile.", "error");
    }
  };

  // ===== Change Password =====
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showSnack("New password and confirm password do not match.", "error");
      return;
    }
    try {
      const res = await fetch("/api/student/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        showSnack("Password changed successfully.");
        setPwdOpen(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showSnack(data.message || "Password change failed", "error");
      }
    } catch (err) {
      console.error(err);
      showSnack("Could not reach server to change password.", "error");
    }
  };

  // ===== Upload Avatar =====
  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);

    // preview
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      showSnack("Select an image first", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      // replace URL with your actual backend upload endpoint
      const res = await fetch("/api/user/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showSnack("Avatar uploaded successfully.");
        // update avatar url from server response if provided
        // e.g. setAvatarPreview(data.avatarUrl);
      } else {
        showSnack(data.message || "Avatar upload failed", "error");
      }
    } catch (err) {
      console.error(err);
      showSnack("Could not reach server to upload avatar.", "error");
    }
  };

  // ===== Generate Student ID PDF using jsPDF =====
  const handleDownloadIdPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [340, 220],
    });

    // background
    doc.setFillColor(46, 91, 255); // blue band
    doc.rect(0, 0, 340, 60, "F");

    // School name
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(schoolName || "School Name", 20, 38);

    // title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Student ID Card", 240, 40, { align: "right" });

    // Avatar circle
    if (avatarPreview) {
      // try insert image (base64). put in top-left area
      doc.addImage(avatarPreview, "JPEG", 20, 70, 80, 80);
    } else {
      // draw placeholder circle
      doc.setDrawColor(0);
      doc.circle(60, 110, 40, "S");
    }

    // Student details
    doc.setFontSize(12);
    doc.text(`Name: ${name || currentUser?.name || "N/A"}`, 120, 90);
    doc.text(`Roll No: ${rollNum || currentUser?.rollNum || "N/A"}`, 120, 110);
    doc.text(`Class: ${className || currentUser?.sclassName?.sclassName || "N/A"}`, 120, 130);
    doc.text(`Phone: ${phone || currentUser?.phone || "N/A"}`, 120, 150);

    // footer
    doc.setFontSize(10);
    doc.text("ID issued by School Information System", 20, 200);

    doc.save(`${(name || currentUser?.name || "student").replace(/\s+/g, "_")}_ID.pdf`);
  };

  // ===== Render =====
  if (!currentUser) {
    return (
      <Box sx={{ textAlign: "center", p: 6 }}>
        <Typography variant="h6">Loading Student Profile...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          {/* Avatar and name */}
          <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box textAlign="center">
              <Avatar
                alt={currentUser.name}
                src={avatarPreview || currentUser.avatarUrl || ""}
                sx={{ width: 140, height: 140, mb: 1, bgcolor: "#3f51b5", fontSize: 48 }}
              >
                {!avatarPreview && !currentUser.avatarUrl && String(currentUser.name || " ")[0]}
              </Avatar>

              {/* Upload controls */}
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<UploadIcon />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarSelect}
                />
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<UploadIcon />}
                  onClick={handleUploadAvatar}
                >
                  Upload
                </Button>
              </Box>

              {/* Download ID */}
              <Box sx={{ mt: 1 }}>
                <Button
                  startIcon={<DownloadIcon />}
                  size="small"
                  variant="text"
                  onClick={handleDownloadIdPdf}
                >
                  Download ID (PDF)
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight={700}>{currentUser.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{currentUser?.school?.schoolName || schoolName}</Typography>
              </Box>

              <Box>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    // initialize form values from currentUser (safe)
                    setName(currentUser?.name || "");
                    setEmail(currentUser?.email || "");
                    setRollNum(currentUser?.rollNum || "");
                    setClassName(currentUser?.sclassName?.sclassName || "");
                    setSchoolName(currentUser?.school?.schoolName || "");
                    setPhone(currentUser?.phone || "");
                    setAddress(currentUser?.address || "");
                    setEditOpen(true);
                  }}
                  sx={{ mr: 1 }}
                >
                  Edit Profile
                </Button>

                <Button variant="outlined" startIcon={<LockIcon />} onClick={() => setPwdOpen(true)}>
                  Change Password
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Roll No:</strong> {currentUser.rollNum || "-"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Class:</strong> {currentUser?.sclassName?.sclassName || "-"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Email:</strong> {currentUser.email || "-"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2"><strong>Phone:</strong> {currentUser.phone || "-"}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2"><strong>Address:</strong> {currentUser.address || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* ---------- Edit Profile Dialog ---------- */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth type="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Roll Number" value={rollNum} onChange={(e) => setRollNum(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Class" value={className} onChange={(e) => setClassName(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="School" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth multiline rows={2} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleProfileSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* ---------- Change Password Dialog ---------- */}
      <Dialog open={pwdOpen} onClose={() => setPwdOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Old Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} fullWidth />
            <TextField label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} fullWidth />
            <TextField label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPwdOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>Change</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentProfile;
