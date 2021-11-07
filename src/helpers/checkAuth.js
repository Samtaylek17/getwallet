import jwt from 'jsonwebtoken';
/**
 * @desc verifies token
 * @param {string} token jwt token
 * @returns {object} object
 */
const checkAuth = (token) => {
  if (!token) {
    throw Error('no token');
  }
  const decoded = jwt.decode(token);
  if (decoded && decoded.exp > Date.now() / 1000) {
    return { userId: decoded.user_id };
  }
  throw Error('expired token');
};

export default checkAuth;
