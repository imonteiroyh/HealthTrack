import express from 'express';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'))

var initials = 'VM';

const profiles = [
    'attendant', 'risk-classification', 'doctor', 'admin'
]

// Attendant routes
app.get('/register-patient', (req, res) => {
    res.render('register-patient', {
       initials: initials
    });
});

app.get('/register-consultation', (req, res) => {
    res.render('register-consultation', {
       initials: initials
    });
});

// Risk classification routes
app.get('/risk-classification', (req, res) => {
    res.render('risk-classification', {
        initials: initials
    });
});

// Doctor routes
app.get('/consultation-queue', (req, res) => {
    res.render('consultation-queue', {
        initials: initials
    });
});

app.get('/visualization', (req, res) => {
    res.render('visualization', {
        initials: initials
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});