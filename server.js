import express from 'express';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'))

var initials = 'VM';
var profile;

// profile = 'admin'

const profiles = [
    'admin', 'doctor', 'risk-classification', 'attendant'
]

app.get('/', (req, res) => {
    switch (profile) {
        case profiles[0]:
            res.render('register-user', {
                initials: initials
            });
            break;

        case profiles[1]:
            res.render('consultation-queue', {
                initials: initials
            });
            break;

        case profiles[2]:
            res.render('risk-classification', {
                initials: initials
            });
            break;

        case profiles[3]:
            res.render('register-patient', {
                initials: initials
                });
                break;

        default:
            res.render('login');
            break;
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Admin routes
app.get('/register-user', (req, res) => {
    res.render('register-user', {
        initials: initials
    });
});

app.get('/remove-user', (req, res) => {
    res.render('remove-user', {
        initials: initials
    });
});

app.get('/remove-patient', (req, res) => {
    res.render('remove-patient', {
        initials: initials
    });
});

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
app.get('/configurations', (req, res) => {
    res.render('configurations', {
        initials: initials
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});