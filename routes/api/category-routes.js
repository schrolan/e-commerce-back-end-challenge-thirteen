const router = require('express').Router();
const sequelize = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{model: Product}]
    })
    res.json(allCategories)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    })
  
    if (!categoryData) {
      res.status.json({ message: 'No category found with this id!'});
      return
    }
  
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData) 
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const result = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(result)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const result = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!result) {
      res.status.json({message: 'No product found with this id!'})
    }
    res.json(result)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
