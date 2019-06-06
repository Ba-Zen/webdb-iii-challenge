const express = require('express')
const knex = require('knex')

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.get('/api/cohorts', (req,res) => {
    db('cohorts')
    .then(cohorts => {
    res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .then(cohort => {
        if(cohort) {
            res.status(200).json(cohort)
        } else {
            res.status(404).json({ err: 'not valid id'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// function findHubMessages(hubId) {
//     return db('messages as m')
//       .join('hubs as h', 'm.hub_id', 'h.id')
//       .select('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as hub')
//       .where({ hub_id: hubId });
//   }
server.get('/api/cohorts/:id/students', (req, res) => {
    const cohortId = req.params.id;
    db('students')
    .join('cohorts', 'students.cohorts_id', 'cohorts.id')
    .select('students.id', 'students.name', 'cohorts.id as cohortId', 'cohorts.name as cohort')
    .where({ cohorts_id: cohortId })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


server.post('/api/cohorts', (req, res) => {
    db('cohorts')
    .insert(req.body, "name")
    .then(cohort => {
        res.status(201).json(cohort)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.put('/api/cohorts/:id', (req,res) => {
    const changes = req.body;
    db('cohorts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} record updated` })
        } else {
            res.status(404).json({ message: 'id not found'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} record removed`})
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

// Students 

server.get('/api/students', (req,res) => {
    db('students')
    .then(student => {
    res.status(200).json(student)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.get('/api/students/:id', (req, res) => {
    const cohortId = req.params.id;
    db('students')
    .join('cohorts', 'students.cohorts_id', 'cohorts.id')
    .select('students.id', 'students.name', 'cohorts.name as cohort')
    .where({ cohorts_id: cohortId })
    .then(student => {
        if(student) {
            res.status(200).json(student)
        } else {
            res.status(404).json({ err: 'not valid id'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// server.get('/api/cohorts/:id/students', (req, res) => {
//     const cohortId = req.params.id;
//     db('students')
//     .join('cohorts', 'students.cohorts_id', 'cohorts.id')
//     .select('students.id', 'students.name', 'cohorts.id as cohortId', 'cohorts.name as cohort')
//     .where({ cohorts_id: cohortId })
//     .then(response => {
//         res.status(200).json(response)
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
// })

server.post('/api/students', (req, res) => {
    db('students')
    .insert(req.body, "name")
    .then(cohort => {
        res.status(201).json(cohort)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.put('/api/students/:id', (req,res) => {
    const changes = req.body;
    db('students')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} record updated` })
        } else {
            res.status(404).json({ message: 'id not found'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/api/students/:id', (req, res) => {
    db('students')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} record removed`})
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})



const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})