import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "AP-NorthEast-2",
});

// export const multerVideo = multer({ dest: "uploads/videos/" });
// export const multerAvatar = multer({ dest: "uploads/avatars/" });
export const multerVideo = multer({
  storage: multerS3({ s3, acl: "public-read", bucket: "joohee-wetube/video" }),
});
export const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "joohee-wetube/avatar",
  }),
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
