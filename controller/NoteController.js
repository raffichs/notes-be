import Note from "../model/NoteModel.js";

function getNote(req, res) {
  try {
    Note.findAll().then((notes) => {
      res.status(200).json(notes);
    });
  } catch (error) {
    console.log(error.message);
  }
}

function createNote(req, res) {
  try {
    Note.create(req.body).then(() => {
      res.status(201).json({
        message: "Note created  successfully",
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

function updateNote(req, res) {
  try {
    Note.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(200).json({
        message: "Note updated successfully",
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

function deleteNote(req, res) {
  try {
    Note.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.status(200).json({
        message: "Note deleted successfully",
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

export { getNote, createNote, updateNote, deleteNote };
