require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 4000;

const whitelist = ['https://karipili.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST_PROD,
  user: process.env.USER_PROD,
  password: process.env.PASSWORD_PROD,
  database: process.env.DATABASE_PROD,
});

// Middleware untuk menangani koneksi ke database
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Koneksi database terputus");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Terlalu banyak koneksi database");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Koneksi database ditolak");
    }
  }
  if (connection) {
    console.log("Berhasil terhubung ke database MySQL");
    connection.release();
  }
});

// Endpoint untuk register user baru
app.post("/api/v1/register", (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: "Fullname, email, and password are required",
      error: true,
      data: null,
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
  pool.query(query, [fullname, email, hashedPassword], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          statusCode: 400,
          message: "Email is already in use",
          error: true,
          data: null,
        });
      }

      return res.status(500).json({
        statusCode: 500,
        message: "Server error",
        error: true,
        data: {
          error: err.message,
        },
      });
    }

    const userId = results.insertId;

    res.status(201).json({
      statusCode: 201,
      message: "Success register",
      error: null,
      data: {
        fullname: fullname,
        email: email,
        id: userId,
      },
    });
  });
});
app.post("/api/v1/register", (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname | !email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: "Fullname, email and password are required",
      error: true,
      data: null,
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
  pool.query(query, [email, hashedPassword], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          statusCode: 400,
          message: "Email is already in use",
          error: true,
          data: null,
        });
      }

      return res.status(500).json({
        statusCode: 500,
        message: "Server error",
        error: true,
        data: {
          error: err.message,
        },
      });
    }

    const userId = results.insertId;

    res.status(201).json({
      statusCode: 201,
      message: "Success register",
      error: null,
      data: {
        fullname: fullname,
        email: email,
        id: userId,
      },
    });
  });
});

// Endpoint untuk login user
app.post("/api/v1/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: "Email and password are required",
      error: true,
      data: null,
    });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  pool.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        statusCode: 500,
        message: "Server error",
        error: true,
        data: {
          error: err.message,
        },
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Email not found",
        error: true,
        data: null,
      });
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid password",
        error: true,
        data: null,
      });
    }

    // Generate token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      statusCode: 200,
      message: "Login successful",
      error: null,
      data: {
        token: token,
        email: user.email,
        id: user.id,
      },
    });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
