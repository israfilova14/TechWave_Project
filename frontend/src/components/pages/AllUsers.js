import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { MdDeleteOutline } from "react-icons/md";
import ChangeUserRole from '../ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: ''
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include'
      });
      const dataResponse = await fetchData.json();
      console.log(dataResponse);
      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="pb-4 bg-white">
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((element, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element?.name}</td>
              <td>{element?.email}</td>
              <td>{element?.role}</td>
              <td>{moment(element?.createdAt).format('l')}</td>
              <td className='flex gap-3 items-center justify-center'>
                <button
                  className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(element);
                    setOpenUpdateRole(true);
                  }}
                >
                  <MdOutlineModeEditOutline />
                </button>
                <button
                 className="bg-orange-100 p-2 rounded-full cursor-pointer hover:bg-orange-500 hover:text-white"
                 
                >
                  <MdDeleteOutline/>
                </button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          onRoleChange={(newRole) => handleRoleChange(updateUserDetails._id, newRole)}
        />
      )}
    </div>
  );
};
export default AllUsers;