const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesAll = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categoriesAll);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (categoryId) {
      res.json(categoryId);
    } else {
      res.status(404).json({ error: 'No category with this ID'});
    }
  } catch (error){
    res.status(501).json(error);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryNew = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(categoryNew);
  } catch (error) {
    res.status(502).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
