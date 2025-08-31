const Category = require('../../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'name'],
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Category name is required.' });
        }
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'A category with this name already exists.' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Category.destroy({
            where: { id: id },
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        res.status(200).json({ message: 'Category has been successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};