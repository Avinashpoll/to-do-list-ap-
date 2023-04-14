import 'antd/dist/reset.css';
import './App.css';
import { Table ,Modal,Input} from "antd";
import { useState } from "react";
import { Button } from 'antd/es/radio'; 
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';


function App() {
  const [isEditing,  setIsEditing]  = useState(false);
  const [editingUser, setEditingUser] = useState( null)
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Ankit",
      email: "ankit123@gmail.com",
      address: "bhopal"
    },

    {
      id: 2,
      name: "Aditya ",
      email: "aditya2023@gmail.com",
      address: "indore"
    },
    {
      id: 3,
      name: "Piyush",
      email: "ankit12@gmail.com",
      address: "varansi"
    }, 
    {
      id: 4,
      name: "Ankur",
      email: "ankur0123@gmail.com",
      address: "lucknow"
    }

  ])

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
      
    },
{
  key: "5",
  title: "Actions",
  render: (record) => {
    return ( 
       <>
         <EditOutlined onClick={()=>{
          onEditUser(record);
         }} />
         <DeleteOutlined  onClick={()=>{
          onDeleteUser(record)}} style={{color:"red",marginLeft: 15}} />
    </>
    );
  },
},
];
  const onAddUser= () => {
    const randomNumber = parseInt(Math.random()*1000);
    const newUser = {
      id: randomNumber,
      name: "Name" + randomNumber,
      email: randomNumber+"@gmail.com",
      address: "Address+"+randomNumber,
    };
    setDataSource((pre) => {
      return [...pre,newUser];
    });
  };
  const onDeleteUser = (record) => {
    Modal.confirm({
      title:'Are You Sure ,You want to delete this user record?',
      okText: 'Yes',
      okType:'danger',
      onOk:()=> {
        setDataSource((pre) => {
          return pre.filter((user) => user.id !== record.id);
        });
      },
    });
  };

  const onEditUser=(record)=>{
    setIsEditing(true)
    setEditingUser({...record})
  };
const resetEditing=()=>{
  setIsEditing(false);
  setEditingUser(null);
}
  return (
    <>
    <div className="App">
<div className="container-xl">
	<div className="table-responsive">
		<div className="table-wrapper">
			<div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2> <b>Manage Employees  </b></h2>
      
        <Button onClick={onAddUser}   className="btn btn-success" data-toggle="modal" >
        <i className="material-icons">&#xE147;  </i> Add New Employee </Button>
        
         
          </div>
        </div>
			</div>

        <Table columns={columns} dataSource={dataSource}> </Table>
        <Modal
        title= "Edit User"
        visible = {isEditing}
        okText="Save"
        onCancel={()=>{
          resetEditing();
         
        } }
        onOk={()=>{
          setDataSource(pre=>{
            return pre.map(user=>{
              if (user.id === editingUser.id){
                return editingUser
              } else {
                return user
              }
            })
          })
          resetEditing();
          
        }}
        >
     <Input value={editingUser?.name} onChange={(e)=>{
      setEditingUser(pre=>{
        return {...pre, name:e.target.value}
      })
     }} />
     <Input value={editingUser?.email}onChange={(e)=>{
      setEditingUser(pre=>{
        return {...pre, email:e.target.value}
      })
     }} 
      />
     <Input value={editingUser?.address} onChange={(e)=>{
      setEditingUser(pre=>{
        return {...pre, address:e.target.value}
      })
     }}

     />



        </Modal>
     </div>
     </div>
     </div>
     
     </div>

    
    </>
  );
}

export default App;
