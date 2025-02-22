import User from "../user/user.model.js"
import Category from "../categorias/categorias.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const nameCategoryExist = async (name= "") => {
    const exist = await Category.findOne({name})
    if(exist) {
        throw new Error(`La categoría: ${name} ya fue registrada`)
    }
}

export const categoryExistsByName = async (name = "") => {
    const exist = await Category.findOne({ name });
    if (!exist) {
        throw new Error(`No se encontró la categoría: ${name}`)
    }
}