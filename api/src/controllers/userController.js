const { Users } = require("../db"); // Sustituye con la ruta correcta a tu modelo de Users

const usersController = {
  
  // Crear un nuevo usuario
  async create(req, res) {
    try {
      const newUser = await Users.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ mensaje: "Error al crear nuevo usuario", error });
    }
  },

  // Actualizar un usuario existente
  async update(req, res) {
    try {
      const { id } = req.params;
      await Users.update(req.body, {
        where: { id },
      });
      res.status(200).json({ mensaje: "Usuario actualizado exitosamente" });
    } catch (error) {
      res.status(400).json({ mensaje: "Error al actualizar usuario", error });
    }
  },

  // Eliminar un usuario
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Users.destroy({
        where: { id },
      });
      res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(400).json({ mensaje: "Error al eliminar usuario", error });
    }
  },

  // Obtener todos los usuarios
  async getAll(req, res) {
    try {
      const usuarios = await Users.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ mensaje: "Error al obtener usuarios", error });
    }
  },

  // Obtener un solo usuario por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Users.findByPk(id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(400).json({ mensaje: "Error al obtener usuario", error });
    }
  },
};

module.exports = usersController;

