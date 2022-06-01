module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'agendamentos',
  define: {
    timestamps: true,
    undercored: true,
    undercoredAll: true,
  }
}