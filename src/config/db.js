import mysql from 'mysql'

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'myapp'
});

export default connection;