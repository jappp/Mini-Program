// 云函数入口文件
const cloud = require("wx-server-sdk");

// 初始化云开发SDK
cloud.init({
  // 指定当前运行环境
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 云数据库操作对象
const db = cloud.database();
exports.main = async (event, context) => {
  // 定位数据库集合goods
  const list = (
    await db
      .collection("goods")
      .field({
        title: true,
        price: true,
        origin: true,
        img: true,
      })
      .get()
  ).data; // 执行取出所有记录的指定字段，返回值中取data

  //返回取出的数据
  return list;
};
