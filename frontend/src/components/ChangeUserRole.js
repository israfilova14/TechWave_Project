import React, { useState } from 'react';
import ROLE from '../common/role';
import { MdClose } from 'react-icons/md';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, onRoleChange }) => {
  const [userRole, setUserRole] = useState(role);
  const [loading, setLoading] = useState(false);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    setLoading(true);
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
      });

      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! Status: ${fetchResponse.status}`);
      }

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onRoleChange(userRole); // Notify parent component about the role change
        onClose();
      } else {
        toast.error(responseData.message || 'Failed to update user role');
      }

      console.log('Role updated', responseData);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('An error occurred while updating the user role: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <MdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role:</p>
          <select className="border px-4 py-1" value={userRole} onChange={handleOnChangeSelect}>
            {Object.values(ROLE).map((element) => (
              <option value={element} key={element}>
                {element}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-orange-500 text-white hover:bg-orange-700"
          onClick={updateUserRole}
          disabled={loading}
        >
          {loading ? 'Changing...' : 'Change Role'}
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;

