//one way
// function wrapAsync(fn) {
//     return function(req, res, next) {
//         fn(req, res, next).catch(next);
//     };
// }

// module.exports = wrapAsync;

// second way 
// module.exports = function wrapAsync(fn) {
//     return function(req, res, next) {
//         fn(req, res, next).catch(next);
//     };
// };

//thirdway
module.exports = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};


