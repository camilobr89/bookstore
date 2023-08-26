const { Books, Genres } = require("../db"); // Sustituye con la ruta correcta a tus modelos
const sequelize = require("../db");




const BooksController = {
  
   // Crear nuevos libros
    async create(req, res) {
        try {
            const librosInput = Array.isArray(req.body) ? req.body : [req.body];
            const librosCreados = [];

            for (const libroInput of librosInput) {
                // Crear un nuevo libro
                const nuevoLibro = await Books.create(libroInput);

                // Obtener géneros del libro
                const generos = libroInput.genres;

                if (generos && generos.length > 0) {
                    // Buscar géneros existentes
                    const generosExistentes = await Genres.findAll({
                        where: {
                            name: generos
                        }
                    });

                    // Filtrar géneros que no existen en la base de datos
                    const generosNoExistentes = generos.filter(
                        gen => !generosExistentes.map(g => g.name).includes(gen)
                    );

                    // Crear nuevos géneros
                    const nuevosGeneros = await Genres.bulkCreate(
                        generosNoExistentes.map(name => ({ name })),
                        { returning: true }
                    );

                    // Asociar géneros con el libro
                    await nuevoLibro.setGenres([...generosExistentes, ...nuevosGeneros]);
                }

                librosCreados.push(nuevoLibro);
            }

            res.status(201).json(librosCreados);

        } catch (error) {
            res.status(400).json({ mensaje: "Error al crear nuevos libros", error });
        }
    },

  

  // Actualizar un libro existente
    async update(req, res) {
        try {
        const { id } = req.params;
    
        // Actualizar los campos del libro
        await Books.update(req.body, {
            where: { id },
        });
    
        // Obtener el libro actualizado
        const libroActualizado = await Books.findByPk(id);
    
        // Obtener los géneros del cuerpo de la solicitud
        const generos = req.body.genres;
        
        if (generos && generos.length > 0) {
            // Buscar géneros existentes
            const generosExistentes = await Genres.findAll({
            where: {
                name: generos
            }
            });
    
            // Filtrar géneros que no existen en la base de datos
            const generosNoExistentes = generos.filter(
            gen => !generosExistentes.map(g => g.name).includes(gen)
            );
    
            // Crear nuevos géneros
            const nuevosGeneros = await Genres.bulkCreate(
            generosNoExistentes.map(name => ({ name })),
            { returning: true }
            );
    
            // Asociar géneros con el libro
            await libroActualizado.setGenres([...generosExistentes, ...nuevosGeneros]);
        }
    
        res.status(200).json({ mensaje: "Libro y géneros actualizados exitosamente" });
    
        } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar libro y/o géneros", error });
        }
    },
  

  // Eliminar un libro
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Books.destroy({
        where: { id },
      });
      res.status(200).json({ mensaje: "Libro eliminado exitosamente" });
    } catch (error) {
      res.status(400).json({ mensaje: "Error al eliminar libro", error });
    }
  },

  // Obtener todos los libros
  async getAll(req, res) {
    try {
      const libros = await Books.findAll({
        include: [Genres],
      });
      res.status(200).json(libros);
    } catch (error) {
      res.status(400).json({ mensaje: "Error al obtener libros", error });
    }
  },

  // Obtener un solo libro por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const libro = await Books.findByPk(id, {
        include: [Genres],
      });
      if (libro) {
        res.status(200).json(libro);
      } else {
        res.status(404).json({ mensaje: "Libro no encontrado" });
      }
    } catch (error) {
      res.status(400).json({ mensaje: "Error al obtener libro", error });
    }
  },
};

module.exports = BooksController;
