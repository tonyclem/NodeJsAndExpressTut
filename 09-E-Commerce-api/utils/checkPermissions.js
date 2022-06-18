const CustomAPIError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(requestUser);
  //   console.log(resourceUserId);
  //   console.log(typeof resourceUser);

  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomAPIError.UnauthenticatedError(
    "Not authorized to access this route"
  );
};

module.exports = checkPermissions;
