import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import { 
  BottomNavigation, BottomNavigationAction, 
  Container, Paper, Table, TableBody, TableHead, Typography, Card, CardContent, Grid 
} from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';


const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading } = useSelector((state) => state.user);

  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState('table');

  const exams = ["Test", "Half-Yearly", "Final"]; // Exam types

  // Fetch user details
  useEffect(() => {
    if (currentUser?._id) dispatch(getUserDetails(currentUser._id, "Student"));
  }, [dispatch, currentUser]);

  // Set subject marks from userDetails
  useEffect(() => {
    setSubjectMarks(userDetails?.examResult || []);
  }, [userDetails]);

  // Fetch class subjects if empty
  useEffect(() => {
    if (subjectsList?.length === 0 && currentUser?.sclassName?._id) {
      dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
    }
  }, [subjectsList, dispatch, currentUser]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  // Class info card
  const renderClassCard = () => (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Class Information
        </Typography>
        <Typography variant="body1">
          Class: {userDetails?.sclassName?.sclassName || 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Subjects:
        </Typography>
        <Grid container spacing={1}>
          {subjectsList?.map((subject, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ padding: 1 }}>
                <Typography variant="subtitle2">{subject.subName} ({subject.subCode})</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  // Render per-exam marks tables
  const renderExamCards = () => (
    exams.map((exam) => (
      <Card key={exam} sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">{exam} Marks</Typography>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {subjectMarks
                .filter((m) => m.examType === exam)
                .map((result, idx) => (
                  <StyledTableRow key={idx}>
                    <StyledTableCell>{result.subName?.subName}</StyledTableCell>
                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                  </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    ))
  );

  // Chart card
  const renderChartSection = () => (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Subject Marks Chart
        </Typography>
        <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
      </CardContent>
    </Card>
  );

  return (
    <Container sx={{ marginTop: 3, marginBottom: 10 }}>
      {loading ? (
        <Typography variant="h6" align="center">Loading...</Typography>
      ) : (
        <>
          {renderClassCard()}

          {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
            <>
              {selectedSection === 'table' && renderExamCards()}
              {selectedSection === 'chart' && renderChartSection()}

              <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                  <BottomNavigationAction
                    label="Table"
                    value="table"
                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                  />
                  <BottomNavigationAction
                    label="Chart"
                    value="chart"
                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                  />
                </BottomNavigation>
              </Paper>
            </>
          ) : (
            <Typography variant="body1">No subject marks available yet.</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default StudentSubjects;
