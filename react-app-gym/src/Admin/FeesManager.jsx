import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { allFees, updateFees } from '../service/FeesService'; // Assuming these are correctly implemented
import './FeesManager.css';

const FeesManager = () => {
  const [fees, setFees] = useState({ basic: '', pro: '', elite: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await allFees();
        if (response?.data) {
          const { basic, pro, elite } = response.data;
          setFees({ basic, pro, elite });
        } else {
          toast.error('Failed to fetch fee details');
        }
      } catch (err) {
        toast.error('An error occurred while fetching fees.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  const handleChange = (type, value) => {
    // Allow empty input to clear the field, but treat it as 0 for validation
    const numericValue = value === '' ? '' : Number(value);
    
    if (isNaN(numericValue) || numericValue < 0) return;

    setFees(prevFees => ({
      ...prevFees,
      [type]: numericValue,
    }));
  };

  const handleUpdateFees = async () => {
    // Validate that all fee values are present and greater than 0
    console.log(fees);
    if (Object.values(fees).some(fee => fee === '' || Number(fee) <= 0)) {
      toast.error('All fee fields are required and must be greater than zero.');
      return;
    }

    setSaving(true);
    try {
      await updateFees({
        basic: Number(fees.basic),
        pro: Number(fees.pro),
        elite: Number(fees.elite),
      });
      toast.success('Fees updated successfully!');
    } catch (err) {
      toast.error('Error saving fees. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="fees-container">Loading fees...</div>;
  }

  return (
    <section className="bg-dark fees-container">
      <div className="fees-card">
        <h2 className="fees-title">💸 Membership Fee Manager</h2>
        
        {['basic', 'pro', 'elite'].map((type) => (
          <div className="fees-field" key={type}>
            <label className="fees-label">
              {type.charAt(0).toUpperCase() + type.slice(1)} Fee:
            </label>
            <input
              className="fees-input"
              type="number"
              // value={fees[type]}
              value={fees[type] ?? ""}
              onChange={(e) => handleChange(type, e.target.value)}
              placeholder="Enter amount"
            />
          </div>
        ))}
        {/* <div className="d-flex"> */}
        <button 
          className="btn btn-primary" 
          style={{textAlign:'center'}}
          onClick={handleUpdateFees} 
          disabled={saving}
          >
          {saving ? 'Saving...' : 'Update Fees'}
          </button>
        {saving && <p className="fees-saving">Saving changes...</p>}
        {/* </div> */}
      </div>
    </section>
  );
};

export default FeesManager;