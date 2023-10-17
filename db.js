const Sequelize = require('sequelize')

const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const copieModel = require('./models/copie');
const bookingModel = require('./models/booking');
/*
    1) Nombre de la base de datos
    2) Usuario
    3) Contraseña
    4) Objeto de configuración ORM
*/

const sequelize = new Sequelize('video-club','root','abcd1234',{
    host: '127.0.0.1',
    dialect:'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Copie = copieModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);

//un genero esta relacionado a muchas peliculas
Genre.hasMany(Movie, {as:'movies'});
//una pelicula tiene un genero
Movie.belongsTo(Genre, {as:'genre'});

//un director puede tener muchas peliculas
Director.hasMany(Movie, {as:'movies'});
//una pelicula tiene un director
Movie.belongsTo(Director, {as:'director'});

//un actor participa en muchas peliculas
MovieActor.belongsTo(Movie,{foreignKey:'movieId'});
//en una pelicula participan muchos actores
MovieActor.belongsTo(Actor,{foreignKey:'actorId'});

Movie.hasMany(Copie, {as:'copies'});

Copie.belongsTo(Movie, {as:'movie'});

Copie.hasMany(Booking, {as:'bookings'});

Booking.belongsTo(Copie, {as:'copy'});

Member.hasMany(Booking, {as:'bookings'});

Booking.belongsTo(Member, {as:'member'});

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

Actor.belongsToMany(Movie,{
    foreignKey: 'movieId',
    as: 'movies',
    through: 'movies_actors'
});

sequelize.sync({
    force:true
}).then(() => {
    console.log('Base de datos sincronizada.');
});

module.exports = {Director, Genre, Movie, Actor, Member, MovieActor, Copie, Booking};