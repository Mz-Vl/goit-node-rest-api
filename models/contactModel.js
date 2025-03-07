import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./userModel.js";

export const Contact = sequelize.define(
    "Contact",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        owner: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        tableName: "contacts",
        timestamps: true,
    }
);

User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });
