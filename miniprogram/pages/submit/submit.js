const app = getApp();
var that = null;
Page({
	data: {
		deliveryCost: 0,
		deliveryType: 'fast',
		addressData: {
			name: '张三',
			phone: '18912345678',
			address: "深圳市南山区"
		}
	},
	/**
	 * 记录备注信息
	 * @param {*} e 
	 */
	onDeliveryTypeChange(e) {
		this.setData({
			deliveryType: e.detail.value
		})
	},
	/**
	 * 记录备注信息
	 * @param {*} e 
	 */
	getremark(e){
		that.remark = e.detail.value;
	},
	/**
	 * 加载信息
	 */
	onLoad() {
		that = this;
		let ids = wx.getStorageSync('ids');
		//TODO 获取提交信息
		app.getBillList({
			ids:ids,
			success(list){
				const totalAmount = list.reduce((amount, good) => {
					return (amount + good.number * good.price);
				  }, 0);
				that.setData({
					ids:ids,
					billNum: list.length,
					billList: list,
					totalAmount
				})
			}
		});
	},
	/**
	 * 提交订单
	 */
	submitorder(){
		//TODO 提交订单接口
		app.submitorder({
			ids:that.data.ids,
			deliveryType:that.data.deliveryType,
			addressData:that.data.addressData,
			remark:that.remark,
			success(){
				wx.switchTab({
				  url: '../order/order',
				})
			}
		})
	}
})