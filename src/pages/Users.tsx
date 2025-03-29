import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers, updateUser, deleteUser } from '../services/api';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async (pageNumber: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await getUsers(pageNumber);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setLoading(false);
      toast.success('Users loaded successfully');
    } catch (err) {
      const errorMessage = 'Failed to fetch users';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  // Filter users based on search query
  useEffect(() => {
    const filtered = users.filter(user => 
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchQuery]);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      const errorMessage = 'Failed to delete user';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleUpdate = async () => {
    if (!editUser) return;

    try {
      await updateUser(editUser.id, editUser);
      setUsers(users.map(user => 
        user.id === editUser.id ? editUser : user
      ));
      setOpenDialog(false);
      toast.success('User updated successfully');
    } catch (err) {
      const errorMessage = 'Failed to update user';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditUser(null);
    setError('');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 1 }
          }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
        {(searchQuery ? filteredUsers : users).map((user) => (
          <Card key={user.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              sx={{
                height: 200,
                objectFit: 'contain',
                p: 2
              }}
              image={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography>
                {user.email}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {!searchQuery && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            value={editUser?.first_name || ''}
            onChange={(e) => setEditUser(prev => prev ? {...prev, first_name: e.target.value} : null)}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editUser?.last_name || ''}
            onChange={(e) => setEditUser(prev => prev ? {...prev, last_name: e.target.value} : null)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editUser?.email || ''}
            onChange={(e) => setEditUser(prev => prev ? {...prev, email: e.target.value} : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Users; 