const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//create schema for user
const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    }
});
//user k andr plugin kren gy this will automatically implement the username, salting, hashing and hashpasswor
userSchema.plugin(passportLocalMongoose);
//create model from userSchema
const User = mongoose.model("User", userSchema);
//export this model
module.exports = User;