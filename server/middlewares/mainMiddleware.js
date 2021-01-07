
import {verifyJwtToken} from "../utils.js";

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = req.body.token || req.query.token || req.headers['x-access-token']||authHeader.split(' ')[1];
  console.log(token);
  // decode token
  if (token) {
    // Xác thực mã token và kiểm tra thời gian hết hạn của mã
    try {
      const decoded = verifyJwtToken(token, process.env.ACCESS_TOKEN_SECRETs);
      // Lưu thông tin giã mã được vào đối tượng req, dùng cho các xử lý ở sau
      req.decoded = decoded;
      next();
    } catch (err) {
      // Giải mã gặp lỗi: Không đúng, hết hạn...
      console.error(err);
      return res.status(401).json({
        message: 'Unauthorized access.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}
