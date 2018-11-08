const DOMAIN = 'http://39.105.105.6/Api/';
// const DOMAIN = 'http://jtsport.net/Api/';

const API = {
  // 获取token get
  getToken: `${DOMAIN}Index/get_token`,

  // 获取用户详情 get
  getUser: `${DOMAIN}User/info_by_wxid`,

  // 获取球类列表 get
  getBallList: `${DOMAIN}Ball/get_list`,

  // 约运动 get
  getSportList: `${DOMAIN}Sport/get_list`,

  // 约运动详情 get
  getSportDetail: `${DOMAIN}Sport/info`,

  // 获取我的运动列表
  getMyExerciseList: `${DOMAIN}Sport/my_list`,

  // 加入运动
  joinSport: `${DOMAIN}Modelreluser/create_model_rel_user/model/sport`,

  // 退出运动
  existSport: `${DOMAIN}Modelreluser/delete_model_rel_user/model/sport`,

  // 发起约运动 post
  setSport: `${DOMAIN}Sport/create`,

  // 获取运动圈列表 get
  getPostList: `${DOMAIN}Post/get_list`,

  // 获取运动圈详情 get
  getPostDetail: `${DOMAIN}Post/info`,

  // 举报
  getReport: `${DOMAIN}Report/create`,

  // 发布运动圈 post
  createPost: `${DOMAIN}Post/create`,

  // 点赞 post
  addLike: `${DOMAIN}Post/create_like`,

  // 获取场馆列表 get
  getStadiumList: `${DOMAIN}Venue/get_list`,

  // 获取我的场馆 get
  getMyStadiumList: `${DOMAIN}Coachrelorder/my_list`,

  // 获取场馆详情 get
  getStadiumDetail: `${DOMAIN}Venue/info`,

  // 获取教练列表
  getCoachList: `${DOMAIN}Coach/get_list`,

  // 获取教练详情
  getCoachDetail: `${DOMAIN}Coach/info`,

  // 获取我的教练列表
  getMyCoachList: `${DOMAIN}Coachrelorder/my_list`,

  // 预约教练
  orderCoach: `${DOMAIN}Coachrelorder/create`,

  // 获取课程列表
  getCourseList: `${DOMAIN}Course/get_list`,

  // 获取课程详情
  getCourseDetail: `${ DOMAIN }Course/info`,

  // 报名课程
  orderCourse: `${DOMAIN}Courserelorder/create`,

  // 获取赛事列表
  getEventList: `${DOMAIN}Game/get_list`,

  // 获取赛事详情
  getEventDetail: `${DOMAIN}Game/info/id/`,

  // 获取我的赛事列表
  getMyEventList: `${DOMAIN}Gamerelorder/my_list`,

  // 报名赛事
  registerEvent: `${DOMAIN}Gamerelorder/create`,

  // 获取评论列表
  getCommentList: `${DOMAIN}Comment/get_list`,

  //创建评论
  createComment: `${DOMAIN}Comment/create_comment`,

  // 运动首页
  exerciseHomePage: `${DOMAIN}Sport/index`,

  // 支付
  payment: `${DOMAIN}Index/wx_notify_pay`,

  // 获取用户id
  getUserCode: `${DOMAIN}Index/login`

}

module.exports = API 