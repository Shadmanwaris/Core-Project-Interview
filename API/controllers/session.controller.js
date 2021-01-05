const pg = require("pg");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var path = require('path');
import { createClient } from '../connection';
var mailOptions, host, link;
var fromEmail = 'shadin4u@gmail.com';

export const addUser = async (req, res) => {
  try {
    var client = await createClient();
    console.log(req.body);
    client.connect();
    var token;
    function rand(length, current) {
      current = current ? current : '';
      return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
    }
    token = rand(25);

    host = req.get('host');

    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
    var text = 'INSERT into users (name,  hash, salt,email, mobile, date_of_birth, country, token) values($1, $2, $3, $4, $5, $6, $7, $8)';
    var value = [req.body.name, hash, salt, req.body.email, req.body.mobileno, req.body.dob, req.body.country, token];
    var responseData = await client.query(text, value);

    return res.json({ 'success': true, 'message': 'User Created' });
  }
  catch (err) {
    console.log(err);
    res.json({
      'success': false, 'message': 'User Not Created'
    });
  }
};

export const userVerifyWithToken = async (req, res) => {
  try {

    var reqToken = req.body.e_token;
    var client = await createClient();
    var Newtoken;
    function rand(length, current) {
      current = current ? current : '';
      return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
    }
    Newtoken = rand(25);
    client.connect();
    var result = await client.query(`select COUNT(*) FROM users WHERE token =$1`, [reqToken]);
    if (result) {

      if (result.rows[0].count > 0) {
        var response = await client.query('update users set active = true, token = $1 where token = $2', [Newtoken, reqToken]);
        await client.end();
        res.status(200).send({
          'success': true,
          'message': 'Account has been verified'
        });
      } else {
        await client.end();
        res.send({
          'success': false,
          'message': 'Invalid Token'
        });
      }
    }
    if (!result) {
      res.send({ 'success': false, 'message': 'Invalid Token' });
    }

  } catch (err) {
    await client.end();
    return res.json({
      'success': false,
      'message': 'Error catch block'
    });

    console.log(err);
  }
};

export const validateUser = async function (req, res) {
  try {

    var username = req.body.email;
    var password = req.body.password;
    if (!req.body.email)
      return res.json({
        'success': false,
        'message': 'Username  Not Found.'
      });
    if (!req.body.password)
      return res.json({
        'success': false,
        'message': 'Password Not Found.'
      });
    var client = await createClient();
    client.connect();
    var result = await client.query(`SELECT * FROM users WHERE email = $1`, [username]);
    console.log(result.rows);

    await client.end();

    if (result.rows.length === 0)
      return res.json({
        'success': false,
        'message': 'Username or Password Invalid'
      });

    var user = result.rows[0];
    var passwordResult = validPassword(password, user.salt, user.hash);
    if (!passwordResult)
      return res.json({
        'success': false,
        'message': 'Username or Password Invalid'
      });



    let userToken = generateJwt(user);
    var responseObj = {
      "token": userToken,
      'fullName': user.fullname,
      'userTypeId': user.usertypeid,
      'last_login': user.last_login
    };
    return res.json({
      'success': true,
      'data': responseObj
    });

  } catch (err) {
    console.log(err);
    await client.end();
    console.log("user login catch block found");
    return res.json({
      'success': false,
      'message': 'Eroor catch block'
    });

  }

};

export const getUser = async function (req, res) {
  try {
    var client = await createClient();
    client.connect();

    var result = `select * from users`;

    const dataStatus = await client.query(result);
    await client.end();
    console.log(dataStatus.rows);
    if (dataStatus.rows) {
      return res.json({ 'success': true, 'data': dataStatus.rows });
    } else {
      return res.json({ 'success': false, 'message': 'User  not found' });
    }
  }
  catch (err) {
    await client.end();
    console.log("catch found");
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log(req.params.id);
    var client = await createClient();
    client.connect();
    let sql = 'UPDATE users SET name=$1,mobile=$2,date_of_birth=$3 WHERE user_id = $4';
    let params = [req.body.name, req.body.mobileno, req.body.dob, req.params.id];
    let result = await client.query(sql, params);
    await client.end();
    console.log(result);
    return res.json({ 'success': true, 'message': 'Updated successfully' });
  } catch (err) {
    console.log(err.message);
    await client.end();
    res.json({ 'success': false, 'message': 'Not Updated' });
  }
};


export const addEducation = async (req, res) => {
  try {
    var client = await createClient();
    client.connect();
    var text = `INSERT into educations(user_id, school, board, class, year, marks, subjects) values($1, $2, $3, $4, $5, $6, $7)`;
    var value = [req.params.id, req.body.school, req.body.board, req.body.class, req.body.year, req.body.marks, req.body.subjects];
    var responseData = await client.query(text, value);
    await client.end();
    res.json({ 'success': true, 'message': 'Education added successfully' });
  } catch (err) {
    //await client.end();
    console.log(err);
    console.log("when User add then go to catch block");
    console.log(err);
    res.json({
      'success': false, 'message': 'Education Not Created'
    });
  }
};
export const getEducation = async (req, res) => {
  try {
    var client = await createClient();
    client.connect();
    var text = `select * from educations where user_id=$1 order by edu_id desc`;
    const values = [req.params.id];
    var responseData = await client.query(text, values);
    await client.end();
    if (responseData.rows) {
      return res.json({ 'success': true, 'data': responseData.rows });
    } else {
      return res.json({ 'success': false, 'message': 'Education not found' });
    }
  } catch (err) {
    //await client.end();
    console.log(err);

  }
};

export const deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    var client = await createClient();
    client.connect();
    var result = 'delete from users where user_id=$1';
    var value = [req.params.id];
    const dataStatus = await client.query(result, value);
    await client.end();
    if (dataStatus.rows) {
      return res.json({ 'success': true, 'message': 'User successfully deleted' });
    } else {
      return res.json({ 'success': false, 'message': 'User not found' });
    }
  } catch (err) {
    // await client.end();
    console.log("catch found");
  }
};

var validPassword = function (password, salt, hash) {
  var new_hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash === new_hash;
};
var generateJwt = function (user) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    id: user.id,
    username: user.name,
    fullName: user.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'llp');
};
