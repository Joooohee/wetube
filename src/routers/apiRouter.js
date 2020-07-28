import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  postDeleteComment,
  postAddReply,
  postLikeComment,
  postDeleteReply,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.register_view, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.addReply, postAddReply);
apiRouter.post(routes.likeComment, postLikeComment);
apiRouter.post(routes.deleteReply, postDeleteReply);

export default apiRouter;
