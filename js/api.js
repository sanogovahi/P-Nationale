// API Configuration
const API_BASE_URL = '/api';

// Commissariats
export const getCommissariats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/commissariats`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des commissariats:', error);
    return [];
  }
};

export const searchCommissariats = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/commissariats/search/${query}`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return [];
  }
};

// Actualités
export const getActualites = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/actualites`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des actualités:', error);
    return [];
  }
};

// Urgences
export const getUrgences = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/urgences`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des urgences:', error);
    return [];
  }
};

// Contact
export const sendContact = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return { error: 'Erreur d\'envoi' };
  }
};

// Déclarations
export const sendDeclaration = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/declarations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return { error: 'Erreur d\'envoi' };
  }
};