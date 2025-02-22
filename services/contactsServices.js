import { Contact } from "../models/contactModel.js";

export const listContacts = async () => {
    return await Contact.findAll();
};

export const getContactById = async (contactId) => {
    return await Contact.findByPk(contactId);
};

export const addContact = async ({ name, email, phone }) => {
    return await Contact.create({ name, email, phone });
};

export const updateContactById = async (contactId, data) => {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
    await contact.update(data);
    return contact;
};

export const removeContact = async (contactId) => {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
    await contact.destroy();
    return contact;
};

export const updateStatusContact = async (contactId, { favorite }) => {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
    return await contact.update({ favorite });
};
