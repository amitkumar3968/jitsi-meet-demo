
import axios from 'axios';


const baseurl = 'https://kodulive.com/api/';


export const signUp = function signup(email, password, callback) {
  axios.post(baseurl + 'auth/signup', {
    email: email,
    password: password
  })
    .then(function (response) {
      console.log(response);
      callback(response);
    })
    .catch(function (error) {
      console.log(error);
      callback(error);
    });
}



export const signIn = function signin(email, password, callback) {
  axios.post(baseurl + 'auth/signin', {
    email: email,
    password: password
  })
    .then(function (response) {
      console.log(response);
      callback(response);
    })
    .catch(function (error) {
      console.log(error);
      callback(error);
    });
}




export const userProfile = function getUserProfile(authToken, callback) {



  axios.get(baseurl + 'user/profile', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then((res) => {

      console.log(res.data);
      callback(res);
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}



export const getAllMeetings = function getAllMeetings(authToken, callback) {


  // paging later
  axios.get(baseurl + 'user/meetings?pageIndex=0&pageSize=10', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then((res) => {

      console.log(res.data);
      callback(res);
    })
    .catch((error) => {
      console.error(error);
      callback(error);
    });
}



export const createMeeting = function createMeeting(authToken, title, meetingDate,startTime, endTime,guests ,callback) {


  axios.post(baseurl + 'user/meeting', {
    title: title,
    meetingDate:meetingDate,
    startTime:startTime,
    endTime:endTime,
    guests:guests
  },{
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then(function (response) {
      console.log(response);
      callback(response);
    })
    .catch(function (error) {
      console.log(error);
      callback(error);
    });
}



export const getMeetingToken = function getMeetingToken(meetingCode,authToken,callback) {


  axios.post(baseurl + 'user/join-meeting', {
    meetingCode: meetingCode,
     },{
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then(function (response) {
      console.log(response);
      callback(response);
    })
    .catch(function (error) {
      console.log(error);
      callback(error);
    });
}

