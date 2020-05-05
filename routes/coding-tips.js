const express = require('express');
const router = express.Router();
const CodingTip = require('../models/coding-tip');

// Getting all
router.get('/', async (req, res) => {
    try {
        const codingTips = await CodingTip.find();
        res.json(codingTips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getCodingTip, (req, res) => {
    res.json(res.codingTip);
});

// Creating one
router.post('/', async (req, res) => {
    const codingTip = new CodingTip({
        name: req.body.name,
        language: req.body.language,
        desc: req.body.desc,
        content: req.body.content,
    });
    try {
        const newCodingTip = await codingTip.save();
        res.status(201).json(newCodingTip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch('/:id', getCodingTip, async (req, res) => {
    if (req.body.name != null) {
        res.codingTip.name = req.body.name;
    }
    if (req.body.desc != null) {
        res.codingTip.desc = req.body.desc;
    }
    if (req.body.language != null) {
        res.codingTip.language = req.body.language;
    }
    if (req.body.tipContent != null) {
        res.codingTip.content = req.body.content;
    }
    try {
        const updatedCodingTip = await res.codingTip.save();
        res.json(updatedCodingTip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One
router.delete('/:id', getCodingTip, async (req, res) => {
    try {
        await res.codingTip.remove();
        res.json({ message: 'Tip removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCodingTip(req, res, next) {
    let codingTip;
    try {
        codingTip = await CodingTip.findById(req.params.id);
        if (codingTip == null) {
            return res.status(404).json({ message: 'Cannot find codingTip' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.codingTip = codingTip;
    next();
}

module.exports = router;
