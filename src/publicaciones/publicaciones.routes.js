"use strict";

import { Router } from "express";
import { createPublication, updatePublication, deletePublication, getPublications } from "../publicaciones/publicaciones.controller.js";
import { createPublicationValidator, updatePublicationValidator, deletePublicationValidator, getPublicationsValidator } from "../middlewares/publication.validators.js";

const router = Router();

/**
 * @swagger
 * /publications:
 *   get:
 *     summary: Get all publications
 *     tags: [Publications]
 *     responses:
 *       200:
 *         description: A list of publications
 */
router.get("/", getPublicationsValidator, getPublications)

/**
 * @swagger
 * /publications/createPublication:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publication created successfully
 */
router.post("/createPublication", createPublicationValidator, createPublication)

/**
 * @swagger
 * /publications/updatePublication:
 *   put:
 *     summary: Update a publication
 *     tags: [Publications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publication updated successfully
 */
router.put("/updatePublication", updatePublicationValidator, updatePublication)

/**
 * @swagger
 * /publications/deletePublication:
 *   delete:
 *     summary: Delete a publication
 *     tags: [Publications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 */
router.delete("/deletePublication", deletePublicationValidator, deletePublication)

export default router;
