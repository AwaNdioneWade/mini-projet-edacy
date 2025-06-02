import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

function Produits() {
  const [produits, setProduits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, product: null });
  const navigate = useNavigate();
  const width = useWindowWidth();

  const fetchProduits = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduits(res.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/connexion');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ name: '', description: '', price: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditMode(true);
    setSelectedProduct(prod);
    setFormData({ name: prod.name, description: prod.description, price: prod.price });
    setModalOpen(true);
  };

  const handleCreateOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editMode && selectedProduct) {
        await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      toast.success('Produit créé avec succès !');
      setModalOpen(false);
      setFormData({ name: '', description: '', price: '' });
      setSelectedProduct(null);
      fetchProduits();
    } catch (error) {
      console.error('Erreur lors de la création/mise à jour du produit', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${deleteConfirm.product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteConfirm({ open: false, product: null });
      fetchProduits();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  const getHeaderCardStyle = () => {
    if (width <= 600) {
      return {
        width: 'calc(100% - 40px)',
        maxWidth: '100%',
        margin: '1rem 20px 0 20px',
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 2px 12px 0 rgba(31, 38, 135, 0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: '0.7rem 0.7rem',
        gap: '0.7rem',
      };
    } else if (width <= 900) {
      return {
        width: 'calc(100% - 40px)',
        maxWidth: '700px',
        margin: '1.5rem 20px 0 20px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 3px 18px 0 rgba(31, 38, 135, 0.12)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.2rem',
        gap: '0.7rem',
        flexWrap: 'wrap',
      };
    } else {
      return {
        width: 'calc(100% - 40px)',
        maxWidth: '950px',
        margin: '2.5rem 20px 0 20px',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2rem',
        gap: '1rem',
        flexWrap: 'wrap',
      };
    }
  };

  const getHeaderTitleStyle = () => {
    if (width <= 600) {
      return {
        color: '#7c3aed',
        fontWeight: 800,
        fontSize: '1.2rem',
        letterSpacing: '1px',
        margin: 0,
        textAlign: 'center',
        whiteSpace: 'normal',
      };
    } else if (width <= 900) {
      return {
        color: '#7c3aed',
        fontWeight: 800,
        fontSize: '1.6rem',
        letterSpacing: '1px',
        margin: 0,
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      };
    } else {
      return {
        color: '#7c3aed',
        fontWeight: 800,
        fontSize: '2.1rem',
        letterSpacing: '1px',
        margin: 0,
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      };
    }
  };

  const getHeaderBtnGroup = () => {
    if (width <= 600) {
      return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '0.5rem',
        width: '100%',
      };
    } else {
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        flexWrap: 'wrap',
      };
    }
  };

  return (
    <div style={styles.pageStyle}>
      <div style={getHeaderCardStyle()}>
        <h1 style={getHeaderTitleStyle()}>Produits</h1>
        <div style={getHeaderBtnGroup()}>
          <button style={styles.addBtn} onClick={handleOpenAdd}><FaPlus style={{ marginRight: 6 }} /> Ajouter</button>
          <button style={styles.buttonSecondary} onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>
      {produits.length === 0 ? (
        <p style={styles.noProductStyle}>Aucun produit pour le moment.</p>
      ) : (
        <div style={{
          width: 'calc(100% - 40px)',
          maxWidth: 950,
          margin: '2.5rem 20px 0 20px',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)',
          overflow: 'hidden',
          padding: 0,
        }}>
          <div style={{
            width: '100%',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              minWidth: 600,
              fontSize: '1rem',
            }}>
              <thead>
                <tr style={{ background: '#ede9fe' }}>
                  <th style={{...styles.thStyle, minWidth: 120}}>Nom</th>
                  <th style={{...styles.thStyle, minWidth: 180}}>Description</th>
                  <th style={{...styles.thStyle, minWidth: 100}}>Prix</th>
                  <th style={{...styles.thStyle, minWidth: 120}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {produits.map((prod, index) => (
                  <tr key={prod._id} style={{
                    ...((index % 2 === 0) ? styles.trAltStyle : {}),
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={e => e.currentTarget.style.background = (index % 2 === 0 ? '#f9fafb' : '#fff')}
                  >
                    <td style={{...styles.tdStyle, fontWeight: 500}}>{prod.name}</td>
                    <td style={styles.tdStyle}>{prod.description}</td>
                    <td style={styles.tdStyle}>{prod.price} fr cfa</td>
                    <td style={styles.tdStyle}>
                      <button style={styles.actionBtnEdit} onClick={() => handleOpenEdit(prod)}><FaEdit /></button>
                      <button style={styles.actionBtnDelete} onClick={() => setDeleteConfirm({ open: true, product: prod })}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div style={styles.modalOverlay}>
          <form style={styles.modalCard} onSubmit={handleCreateOrUpdateProduct}>
            <h2 style={{ marginBottom: '1rem', color: '#4b5563' }}>{editMode ? 'Modifier' : 'Ajouter'} un produit</h2>
            <input style={styles.inputStyle} type="text" name="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
            <textarea style={styles.textareaStyle} name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input style={styles.inputStyle} type="number" name="price" placeholder="Prix" value={formData.price} onChange={handleChange} required />
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button style={styles.buttonSecondary} type="button" onClick={() => setModalOpen(false)}>Annuler</button>
              <button style={styles.buttonStyle} type="submit">{editMode ? 'Mettre à jour' : 'Créer'}</button>
            </div>
          </form>
          <ToastContainer position="top-center" autoClose={2000} />
        </div>
      )}

      {deleteConfirm.open && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3>Supprimer ce produit ?</h3>
            <p style={{ color: '#4b5563', textAlign: 'center' }}>Cette action est irréversible.</p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button style={styles.buttonSecondary} onClick={() => setDeleteConfirm({ open: false, product: null })}>Annuler</button>
              <button style={{ ...styles.buttonStyle, background: '#dc2626', marginLeft: 8 }} onClick={handleDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageStyle: {
    minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0',
  },
  headerStyle: {
    width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem',
  },
  titleStyle: {
    color: '#7c3aed', marginBottom: 0, letterSpacing: '1px', fontWeight: 800, fontSize: '2.3rem',
  },
  buttonStyle: {
    background: 'linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.1rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginLeft: '0.6rem',
  },
  buttonSecondary: {
    background: '#f3f4f6', color: '#7c3aed', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.6rem 1.1rem', fontWeight: 500, fontSize: '1rem', cursor: 'pointer',
  },
  addBtn: {
    background: 'linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)', color: '#fff', border: 'none', borderRadius: '22px', padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: '1.08rem', cursor: 'pointer', marginRight: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: 8,
  },
  noProductStyle: {
    marginTop: '2.5rem', color: '#6b7280', fontWeight: 500, textAlign: 'center',
  },
  tableWrapper: {
    width: '100%', maxWidth: '950px', margin: '2.5rem auto 0 auto', background: '#fff', borderRadius: '22px', boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)', overflow: 'hidden',
  },
  tableStyle: {
    width: '100%', borderCollapse: 'separate', borderSpacing: 0,
  },
  thStyle: {
    background: '#ede9fe', color: '#7c3aed', fontWeight: 700, padding: '14px 10px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontSize: '1.07rem',
  },
  tdStyle: {
    padding: '13px 10px', borderBottom: '1px solid #f3f4f6', color: '#333', background: '#fff', verticalAlign: 'middle', fontSize: '1.01rem',
  },
  trAltStyle: {
    background: '#f9fafb',
  },
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
  },
  modalCard: {
    background: '#fff', padding: '2rem 1.5rem', margin: '8% auto', width: '340px', borderRadius: '14px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  inputStyle: {
    width: '100%', padding: '0.7rem 1rem', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '1rem', background: '#f9fafb', marginBottom: '1rem', marginTop: '0.2rem',
  },
  textareaStyle: {
    width: '100%', minHeight: '60px', padding: '0.7rem 1rem', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', fontSize: '1rem', background: '#f9fafb', marginBottom: '1rem', marginTop: '0.2rem', resize: 'vertical',
  },
  actionBtnEdit: {
    border: 'none', borderRadius: '50%', width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginRight: 8, cursor: 'pointer', background: '#ede9fe', color: '#7c3aed',
  },
  actionBtnDelete: {
    border: 'none', borderRadius: '50%', width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginRight: 0, cursor: 'pointer', background: '#fef2f2', color: '#dc2626',
  },
};


export default Produits;