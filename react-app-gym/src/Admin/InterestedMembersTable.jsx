import React, { useEffect, useState } from "react";
import { allInterstedMembers } from "../service/InterestedMembersService";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Gym-friendly SVG Logo Component
const GymLogo = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.44 8.56l-1-1a1 1 0 00-1.42 1.42l1 1a1 1 0 001.42-1.42zM3.56 15.44l1 1a1 1 0 001.42-1.42l-1-1a1 1 0 00-1.42 1.42zM7 12l-4 4v2h2l4-4H7zm10-8h-2v2l4 4h2v-2l-4-4zm0 16l4-4v-2h-2l-4 4h2zM9 4H7v2l4 4h2V8L9 4z" fill="#1F2937" />
  </svg>
);

const InterestedMembersTable = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.address.toLowerCase().includes(searchTerm.toLowerCase()))
                          

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await allInterstedMembers();
        setMembers(response.data);
      } catch (err) {
        setError("Failed to fetch members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="bg-dark flex flex-col items-center">
      {/* Header with Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center mb-8"
      >
        <GymLogo />
        <h1 className="text-3xl font-bold text-gray-800 ml-4" style={{ textAlign: 'center' }}>Gym Interested Members</h1>
      </motion.div>
      <div className="input-group mb-3" style={{ width: '80vw', textAlign: 'center', alignItems: 'center', margin: '10px auto', borderRadius: '10px' }}>
        <input
          type="text"
          id="keyword"
          name="keyword"
          className="form-control"
          placeholder="Search member..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <span className="input-group-text bg-warning">
          <i className="bi bi-search"></i>
        </span>
      </div>
      {loading && <p className="text-gray-600">Loading members...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <motion.table
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
          border={1}

          className="w-full max-w-4xl bg-dark shadow-lg rounded-2xl overflow-hidden"
          style={{ width: '80vw', textAlign: 'center', alignItems: 'center', margin: '0px auto', borderRadius: '10px' }}
        >
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (

              <motion.tr
                key={member.id || index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-50"
                style={{ backgroundColor: (index % 2 === 0 ? '#b48726e0' : '#3498db2d') }}
              >
                <td className="px-6 py-4 font-medium text-gray-700">{member.name}</td>
                <td className="px-6 py-4 text-gray-600">{member.contact}</td>
                <td className="px-6 py-4 text-gray-600">{member.address}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
};

export default InterestedMembersTable;
