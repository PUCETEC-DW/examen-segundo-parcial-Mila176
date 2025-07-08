 const model = require('../models/taskModel');

exports.getAll = (req, res) => res.json(model.getAll());

exports.create = (req, res) => {
  const { id, title, description, priority } = req.body;
  
  if (!id || !title || !description || !priority) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  
  if (priority < 1 || priority > 5) {
    return res.status(400).json({ error: 'Prioridad debe estar entre 1 y 5' });
  }

  if (model.getById(id)) {
    return res.status(400).json({ error: 'ID duplicado' });
  }

  const newTask = { 
    id, 
    title, 
    description, 
    completed: false, 
    priority 
  };
  
  const createdTask = model.add(newTask);
  res.status(201).json(createdTask);
};

exports.update = (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed debe ser un booleano' });
  }
  
  const updated = model.update(id, completed);
  if (!updated) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(updated);
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const deleted = model.delete(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json({ message: 'Tarea eliminada' });
};

exports.summary = (req, res) => res.json(model.summary());
