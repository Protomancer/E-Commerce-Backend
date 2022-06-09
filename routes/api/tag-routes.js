const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(allTags);
  } catch (error) {
    res.status(507).json(error);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const  tagId = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (tagId) {
      res.json(tagId);
    } else {
      res.status(404).json({ error: 'Invalid tag ID'});
    }
  } catch (error) {
    res.status(508).json(error);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const makeTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(makeTag);
   } catch (error) {
     res.status(507).json(error);
   }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    if (tagUpdate) {
      res.json(tagUpdate);
    } else {
      res.status(404).json({ error: 'Invalid tag ID'});
    }
  } catch (error) {
    res.status(509).json(error);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    if (tagUpdate) {
      res.json(tagDelete);
    } else {
      res.status(404).json({ error: 'Invalid tag ID'});
    }
  } catch (error) {
    res.status(510).json(error);
  }
});

module.exports = router;
