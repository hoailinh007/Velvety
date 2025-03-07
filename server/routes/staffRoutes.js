const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all staff members (Admin only)
router.get('/', authenticate, authorize(['Admin']), staffController.getAllStaff);

// Get staff member by ID
router.get('/:id', authenticate, authorize(['Admin', 'Staff']), staffController.getStaffById);

// Update staff member (Admin only)
router.put('/:id', authenticate, authorize(['Admin']), staffController.updateStaff);

// Delete staff member (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), staffController.deleteStaff);

// Creat staff member (Admin only)
router.post('/', authenticate, authorize(['Admin']), staffController.createStaff);

router.post("/:id/reset-password", authenticate, authorize(['Admin']),staffController.resetPassword);

module.exports = router;
