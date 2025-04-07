// module.exports = (req, res, next) => {
//   const coordinatorKey = req.header("X-Coordinator-Key");
//   if (coordinatorKey !== process.env.COORDINATOR_SECRET) {
//     return res.status(403).json({ error: "Unauthorized coordinator access" });
//   }
//   next();
// };
