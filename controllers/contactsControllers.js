import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
    updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactModel.js";


export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.findAll({
            where: { owner: req.user.id }
        });

        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};


export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);
        if (!contact) throw HttpError(404, "Not found");
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await removeContact(id);
        if (!contact) throw HttpError(404, "Not found");
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const owner = req.user.id;

        const contact = await Contact.create({ name, email, phone, owner });

        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};


export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, "Body must have at least one field");
        }
        const updatedContact = await updateContactById(id, req.body);
        if (!updatedContact) throw HttpError(404, "Not found");
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;
        const updatedContact = await updateContactById(id, { favorite });
        if (!updatedContact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};

