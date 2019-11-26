/**
 * 请求地址
 */
const API_BASE = "https://www.mxnzp.com";//小程序合法request请求地址
module.exports={
  API_GET_TypeList : API_BASE +'/api/logistics/type/list',//查询支持的所有快递公司编号列表
  API_GET_TypeSearch: API_BASE +'/api/logistics/type/search',//根据公司名称查询对应的公司编号
  API_GET_DisCern: API_BASE + '/api/logistics/discern',//根据快递单号识别出所属快递公司编号
  API_GET_Detail:API_BASE+'/api/logistics/details/search',//获取物流信息
  API_GET_FULI:API_BASE+'/api/image/girl/list/random'//每日福利
}