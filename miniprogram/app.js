App({
  /**
   * 全局信息
   */
  globalData: {
    show: [{
      _id: "c5fab3435c489abf003a777a35be3868",
      title: "Smartisan 真无线TWS蓝牙耳机",
      price: 29,
      origin: 149,
      img: "https://resource.smartisan.com/resource/52fcdb420db14c83448475f650df06c4.png"
    }],
    list: {
      c5fab3435c489abf003a777a35be3868: {
        _id: "c5fab3435c489abf003a777a35be3868",
        img: "https://resource.smartisan.com/resource/52fcdb420db14c83448475f650df06c4.png",
        imgs: ["https://resource.smartisan.com/resource/52fcdb420db14c83448475f650df06c4.png",
          "https://resource.smartisan.com/resource/c3e8d0dbb61f41cbe86bd7684d58a968.png",
          "https://resource.smartisan.com/resource/e991f946530a7cfab3d9670dd8b1371b.png",
          "https://resource.smartisan.com/resource/465234ac5536cf3c5a8ab400e02d6b5f.png",
          "https://resource.smartisan.com/resource/46d45324f626b9ad40b4d49b74023f81.png"
        ],
        title: "Smartisan 真无线TWS蓝牙耳机",
        price: 29,
        origin: 149,
        purchased: 97,
        production: "锤子科技",
        options: [{
          id: 43,
          key: "color",
          name: "颜色",
          value: ["白色", "绿色"]
        },{
          id: 45,
          key: "size",
          name: "版本",
          value: ["4.0", "4.2"]
        }],
        descImgs: ["https://resource.smartisan.com/resource/8506a09cfe7ce79807df1347ead51386.png"]
      }
    }
  },
  /**
   * APP加载时运行回调
   */
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  /**
   * 加载商品列表
   * @param {*} obj 
   */
  getGoodSList: function (obj) {
    setTimeout(() => {                                //模拟网络延迟，等待1秒钟
      if (obj != null && obj.success != null) {       //判断是否有success回调写入
        obj.success(this.globalData.show);            //调用回调，将商品列表信息传回
      }
    }, 1000);
  },
  /**
   * 加载商品详情
   * @param {*} obj 
   */
  getGoodSDetail: function (obj) {
    let list = this.globalData.list;                  //从全局对象中取出商品详细信息
    setTimeout(() => { //模拟网络延迟，等待1秒钟
      if (obj != null && obj.success != null) {       //判断是否有success回调写入
        obj.success(list[obj.id]);                    //根据id拿到详情对象，传回
      }
    }, 1000);
  },
  /**
   * 添加商品到购物车
   * @param {*} obj 
   */
  addShopCart: function (obj) {
    let list = this.globalData.list;                  //从全局对象中取出商品信息
    let data = obj.data;                              //调用方传入的信息
    data._id = new Date().getTime();                  //使用时间戳构建购物车项目id
    data.type = 0;                                    //订单项目的状态 0-购物车中；1-已下单;2-已付款;3-收货完成
    if (obj.cart == false) {                          //是否为加入购物车，false为直接付款，也包含加入购物车的操作
      wx.setStorageSync('ids', [data._id]);           //将订单项目id放入存储里，以便在后续操作直接获取
    }
    data.title = list[data.commodityId].title;        //根据商品id获取有关信息，直接补充到data中
    data.price = list[data.commodityId].price;
    data.img = list[data.commodityId].img;
    obj.success();                                    //调用回调，已经成功了
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    CartList.push(data);                              //将订单数据push到订单列表里
    wx.setStorageSync('CartList', CartList);          //将订单存回去
  },
  /**
   * 获取购物车信息列表
   * @param {*} obj 
   */
  getShopCart: function (obj) {
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    if (obj.cart != false) {                          //如果不是订单列表加载
      CartList = CartList.filter(({                   //筛选所有type=0,意味着是购物车状态的商品
        type
      }) => type === 0);
    } else {                                          //如果是订单列表加载
      if (obj.done == 0) {                            //判断done=0，订单还在进行中的
        CartList = CartList.filter(({                 //筛选所有type不等于0或3的
          type
        }) => (type != 0 && type != 3));
      } else if (obj.done == 1) {                     //判断done=1，订单已经完成的
        CartList = CartList.filter(({                 //筛选所有type等于3的
          type
        }) => type == 3);
      }
    }
    if (obj != null && obj.success != null) {         //判断是否有success回调写入
      obj.success(CartList);                          //调用回调，将订单列表信息传回
    }
  },
  /**
   * 删除购物车商品
   * @param {*} obj 
   */
  delShopCart: function (obj) {
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    CartList = CartList.filter(item => !obj.list.includes(item._id)); //筛选，只保留没有包含在选择列表里的订单
    wx.setStorageSync('CartList', CartList);          //将订单存回去
    if (obj != null && obj.success != null) {         //判断是否有success回调写入
      obj.success();                                  //调用回调
    }
  },
  /**
   * 获取订单提交信息
   * @param {*} obj 
   */
  getBillList: function (obj) {
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    CartList = CartList.filter(item => obj.ids.includes(item._id));//筛选，只保留包含在选择列表里的订单
    obj.success(CartList);                            //调用回调，将订单列表信息传回
  },
  /**
   * 订单提交信息
   * @param {*} obj 
   */
  submitorder: function (obj) {
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    for (let i in CartList) {                         //遍历订单列表
      if (obj.ids.indexOf(CartList[i]._id) != -1) {   //如果订单id在传入数组中存在
        CartList[i].type = 1;                         //将订单状态置为1，未付款
        CartList[i].deliveryType = obj.deliveryType;  //订单配送类型设置
        CartList[i].remark = obj.remark;              //订单备注
        if (obj.deliveryType == 'fast') CartList[i].addressData = obj.addressData; //如果订单是配送，则设置地址
      }
    }
    wx.setStorageSync('CartList', CartList);          //将订单存回去
    obj.success();                                    //调用回调
  },
  /**
   * 模拟，为商品付款
   * @param {*} obj 
   */
  toPayTap: function (obj) {
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    for (let i in CartList) {                         //遍历订单列表
      if (obj.ids.indexOf(CartList[i]._id) != -1) {   //如果订单id在传入数组中存在
        CartList[i].type = 2;                         //更新type状态为已付款
      }
    }
    wx.setStorageSync('CartList', CartList);          //将订单存回去
    obj.success();                                    //调用回调
  },
  /**
   * 商品收货完成
   * @param {*} obj 
   */
  toDoneOrder: function (obj) {
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    for (let i in CartList) {                         //遍历订单列表
      if (obj.ids.indexOf(CartList[i]._id) != -1) {   //如果订单id在传入数组中存在
        CartList[i].type = 3;                         //更新type状态为已付款
      }
    }
    wx.setStorageSync('CartList', CartList);          //将订单存回去
    obj.success();                                    //调用回调
  },
  /**
   * 删除已完成的订单
   * @param {*} obj 
   */
  delOrderTap: function (obj) {
    let CartList = wx.getStorageSync('CartList');     //获取存储在CartList里的信息
    CartList = (CartList != "" ? CartList : []);      //如果一开始什么也没有，则构建一个
    CartList = CartList.filter(item => !obj.ids.includes(item._id));//筛选，只保留不包含在选择列表里的订单
    wx.setStorageSync('CartList', CartList);          //将订单存回去
    obj.success();                                    //调用回调
  }
})