import {Button,Input, Row,Space,Card} from "antd"
import react, {useState} from "react"
import socketIOClient from "socket.io-client";


export const ComplexCalculator=()=>{
    const ENDPOINT = "http://127.0.0.1:4001";
    let socket=socketIOClient(ENDPOINT,{ transports: ["websocket"] })
    const [input, setInput]=useState("")
    const [history,setHistory]=useState([])

    const calculateFib=()=>{
        
        socket.emit("fib",parseInt(input))
    }
    socket.on("fibout",(value)=>{
        setHistory((prev)=>[value, ...prev])
    })
    socket.on('disconnect', ()=> {
        socket.removeAllListeners();
        console.log("disconnected")
      })
    return (
        <>
    <div className="display">
    <Input className="input" onChange={(e)=>{
        setInput(e.target.value)
    }}/>
    </div>
    <Button className="btn" type="primary" onClick={calculateFib}>
    fib
  </Button>
  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Card title="History" size="small">
    {history.map(item=>{
    return <Row>
        <p>{item.function}  -  {item.input}  - {item.data}  </p>
         </Row>
  })}
    </Card>
  </Space>
  
  
  
  </>
    )
}