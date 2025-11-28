import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, Checkbox, Button } from '@mui/material';
import { getAllComplains, deleteComplain } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {

  const dispatch = useDispatch();
  const { complainsList, loading, error } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser?._id, dispatch]);

  if (error) console.log(error);

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 150 },
    { id: 'complaint', label: 'Complaint', minWidth: 200 },
    { id: 'date', label: 'Date', minWidth: 120 },
    { id: 'action', label: 'Action', minWidth: 120 }
  ];

  const complainRows =
    Array.isArray(complainsList)
      ? complainsList.map((complain) => {
          const dateString = complain.date
            ? new Date(complain.date).toISOString().substring(0, 10)
            : "No date";

          return {
            user: complain.user?.name || "Teacher",
            complaint: complain.complaint || "No complaint",
            date: dateString,
            id: complain._id,
            action: complain._id,
          };
        })
      : [];

  const ComplainButtonHaver = ({ row }) => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Checkbox />

        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => dispatch(deleteComplain(row.id))}
        >
          Delete
        </Button>
      </Box>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {complainRows.length > 0 ? (
            <TableTemplate
              buttonHaver={ComplainButtonHaver}
              columns={complainColumns}
              rows={complainRows}
            />
          ) : (
            <Box sx={{ padding: 2, textAlign: 'center' }}>No Complains Found</Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default SeeComplains;
