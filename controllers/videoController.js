import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import Reply from "../models/Reply";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    res.render("search", { pageTitle: "Search", searchingBy, videos });
  } catch (error) {
    console.log(error);
  }
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: [{ path: "creator" }, { path: "replies" }],
      });
    res.render("videoDetail", { pageTitle: video.title, video, user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video.creator, req.user.id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate(id, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove(id);
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    res.json({
      resultCode: "S",
      resultData: {
        name: user.name,
        avatarUrl: user.avatarUrl,
        comment,
        id: newComment.id,
      },
    });
  } catch (error) {
    res.status(400).json({ resultCode: "E", resultData: { error } });
  } finally {
    res.end();
  }
};

// Delete Comment

export const postDeleteComment = async (req, res) => {
  const {
    body: { commentId: id },
  } = req;
  try {
    await Comment.findOneAndDelete({ _id: id });
    res.status(200);
  } catch (error) {
    res.status(400).json({ resultCode: "E", resultData: { error } });
  } finally {
    res.end();
  }
};

// Add Reply

export const postAddReply = async (req, res) => {
  const {
    // params: { id },
    body: { commentId: id, reply },
    user,
  } = req;
  try {
    const comment = await Comment.findById(id);
    const newReply = await Reply.create({
      text: reply,
      creator: user.id,
    });
    comment.replies.push(newReply.id);
    comment.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Like comment

export const postLikeComment = async (req, res) => {
  const {
    body: { commentId: id },
    user,
  } = req;
  try {
    const comment = await Comment.findById(id);
    const targetIndex = comment.likes.indexOf(user.id);
    if (targetIndex > -1) {
      comment.likes.splice(targetIndex, 1);
    } else {
      comment.likes.push(user.id);
    }

    comment.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
