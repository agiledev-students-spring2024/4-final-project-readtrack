const server = require("./app");
const port = 3001;
const listener = server.listen(port, () => {
  console.log(`Server is listening on port ${listener.address().port}`);
});
const closeServer = () => {
  listener.close();
};
module.exports = closeServer;
