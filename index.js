const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

let tasks = [
    { id: 1, name: 'Learn angular', done: true },
    { id: 2, name: 'Create a todo app', done: true },
    { id: 3, name: 'Be hired at Nasa', done: false },
    { id: 4, name: 'Go to mars', done: false },
    { id: 5, name: 'Become king of galaxy', done: false }
];

let getid = 6;

// Middleware pour parser le JSON
app.use(express.json());

// Récupérer toutes les tâches
app.get('/todos', (req, res) => {
  res.send(tasks);
});

// Récupérer une tâche par son ID
app.get('/todos/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).send('Tâche non trouvée');
  }

  res.send(task);
});

// Ajouter une nouvelle tâche
app.post('/todos', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Titre manquant');
  }

  const newTask = {
    id: getid,
    name,
    done: false
  };

  getid+= 1
  tasks.push(newTask);

  res.status(201).send(newTask);
});

// Mettre à jour une tâche
app.put('/todos/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).send('Tâche non trouvée');
  }

  const { name, done } = req.body;

  if (name) {
    task.name = name;
  }

  if (done !== undefined) {
    task.done = done;
  }

  res.send(task);
});

// Supprimer une tâche
app.delete('/todos/:id', (req, res) => {
  console.log(req.params.id);
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.sendStatus(204);
  console.log(tasks);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
