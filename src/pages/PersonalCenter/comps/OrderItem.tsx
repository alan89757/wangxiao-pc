import React, { useState, useEffect } from "react";
import { Col, Row } from 'antd';
import "../css/MyOrder.scss";

const statusList = ['待付款', '已付款', '已关闭', '退款中', '已退款', '拼团中'];
const expressList = ['待发货', '待收货', '已完成'];
const CountDown: React.FC<{ remainder: number }> = ({remainder}) => {
    let timer: any = null;
    const [timeData, setTimeData] = useState({
        hour: '0',
        minute: '0',
        second: '0'
    });
    const checkTime = (i:number)=> {
        let s = i.toString()
        if (i < 10) {
           s = '0' + i;
        }
        return s;
      }
    const  updateTimeData = (t:number)=> {
        let hour = Math.floor(t / 1000 / 60 / 60);
        let minute = Math.floor((t / 1000 / 60) % 60);
        let second = Math.floor((t / 1000) % 60);
        setTimeData({
            hour: checkTime(hour),
            minute: checkTime(minute),
            second: checkTime(second)  
        })
    }
    // 开启倒计时
    const startTimer = () => {
        if (timer) {
        clearInterval(timer);
        }
        if (remainder < 1000) {
        return;
        }
        let timeDown = remainder;
        timer = setInterval(() => {
        timeDown -= 1000;
        updateTimeData(timeDown);
        if (timeDown < 1000) {
            clearInterval(timer);
        }
        }, 1000);
    };
    useEffect(() => {
        updateTimeData(remainder)
        startTimer()
        return () => {
            if(timer){
                clearInterval(timer)
            }
        }
    } , [remainder]);    
    return (
        <div className="order-count-down">
            <div style={{marginTop:'4px',marginBottom:'4px'}}>
                <span>{ timeData.hour }:</span>
                <span>{ timeData.minute }:</span>
                <span>{ timeData.second }</span>
            </div>
            <p>后关闭</p>
        </div>
    )
}

const OrderItem: React.FC<{ odrer: any }> = ({ odrer }) => {
    let status = statusList[odrer.status]
    if(odrer.commodities && odrer.commodities[0]?.type===3 && odrer.status === 1){
        status = expressList[odrer.expressStatus]
    }
    return (
      <div className="order-item" key={odrer.id}>
        <div className="order-item-info">
            <span style={{marginLeft:'12px',marginRight:'20px'}}>订单编号:{odrer.id}</span>
            <span>下单时间:{odrer.createTime}</span>
        </div>
        <Row>
          <Col span={16}>
            {
                odrer.commodities &&  odrer.commodities.map((goods:any,index:number)=>{
                    return(
                        <Row key={goods.skuId}>
                            <Col className={ index===odrer.commodities.length-1?"order-goods order-border-right" :"order-goods order-border-right order-border-bottom"} span={18}>
                                <img className="order-goods-img" src={goods.url} alt=""></img>
                                <div>
                                    <p style={{marginBottom:'8px'}}>{goods.name}</p>
                                    <p className="order-color-gray order-min-font">{goods.skuName ? goods.skuName : ''}</p>
                                </div>
                            </Col>
                            <Col className={ index===odrer.commodities.length-1? "order-border-right order-center order-color-gray":"order-border-right order-border-bottom order-center order-color-gray"} span={6}>
                                <p>{ goods.price }</p>
                            </Col>
                        </Row>
                    )
                })
            }
          </Col>
          <Col className="order-border-right order-center" span={4}>{odrer.payAmount}</Col>
          <Col className="order-center" span={4}>
                <p>{status}</p>
                {
                    odrer.remainder?<CountDown remainder={odrer.remainder}></CountDown>:null
                }
               
          </Col>
        </Row>
      </div>
    )
  }
export default OrderItem;