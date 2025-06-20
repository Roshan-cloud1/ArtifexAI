import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized, Login Again' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.userId = decoded.id; // ✅ attach to req.userId instead of req.body
      next();
    } else {
      return res.json({ success: false, message: 'Invalid Token' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Invalid Credentials' });
  }
};


export default authUser