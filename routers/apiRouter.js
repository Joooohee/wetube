import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  postDeleteComment,
  postAddReply,
  postLikeComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.register_view, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.addReply, postAddReply);
apiRouter.post(routes.likeComment, postLikeComment);

export default apiRouter;
