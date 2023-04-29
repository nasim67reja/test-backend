const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product');
const { verify } = require('../middlewares/auth');

router.get('/all', ProductController.getAllProducts);

// router.use(verify);
router.get('/:id', ProductController.getProduct);
router.patch('/:id', ProductController.updateProduct);
router
  .route('/')
  .post(ProductController.createProduct)
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

module.exports = router;
