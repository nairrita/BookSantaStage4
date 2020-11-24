import * as React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,ScrollView,Modal,KeyboardAvoidingView} from 'react-native';
import db from '../config'
import firebase from 'firebase'
import SantaAnimation from '../components/SantaAnimation'

export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            email: ' ',
            password: ' ',
            isModalVisible : false,
            firstName : ' ',
            lastName : ' ',
            address : ' ',
            contact : ' ',
            confirmPassword : ' '
        }
    }

userSignUp = (email,password,confirmPassword)=>{
    if(password !== confirmPassword){
        return Alert.alert("password doesnt match")
    }else{
firebase.auth().createUserWithEmailAndPassword(email,password)
.then(()=>{
    db.collection('user').add({
        first_name : this.state.firstName,
        last_name : this.state.lastName,
        contact : this.state.contact,
        email: this.state.email,
        address: this.state.address
    })
    return Alert.alert("User Added Succesfully")
})
.catch(error=>{
    var errorCode = error.code
    var errorMessage = error.message
    return Alert.alert(errorMessage)
})

    }
}
userlogIn=(email,password)=>{
firebase.auth().signInWithEmailAndPassword(email,password)
.then(()=>{
    this.props.navigation.navigate('DonateBooks')
    return Alert.alert("Successfully LoggedIn")
})
.catch(error=>{
    var errorCode = error.code
    var errorMessage = error.message
    return Alert.alert(errorMessage)
})
}

showModal = ()=>{
    return(
        <Modal 
        animationType = 'fade'
        transparent = {true}
        visible = {this.state.isModalVisible}
        >

<View style = {styles.modalContainer}>
<ScrollView style = {{width:'100%'}}>
<KeyboardAvoidingView style = {styles.keyboardView}>
<Text style = {styles.modalTitle}>
Registration
</Text>
<TextInput 
style = {styles.formBox}
placeholder = {'FirstName'}
maxLength = {8}
onChangeText = {(text)=>{
this.setState({
    firstName:text
})
}}/>

<TextInput 
style = {styles.formBox}
placeholder = {'LastName'}
maxLength = {8}
onChangeText = {(text)=>{
this.setState({
    lastName:text
})
}}/>

<TextInput 
style = {styles.formBox}
placeholder = {'contact'}
maxLength ={10}
keyboardType = {'numeric'}
onChangeText = {(text)=>{
this.setState({
    contact:text
})
}}/>

<TextInput 
style = {styles.formBox}
placeholder = {'Address'}
multiline = {true}
onChangeText = {(text)=>{
this.setState({
    address:text
})
}}/>

<TextInput 
style = {styles.formBox}
placeholder = {'Email'}
keyboardType = "email-address"
onChangeText = {(text)=>{
this.setState({
    email:text
})
}}/>

<TextInput 
style = {styles.formBox}
placeholder = {'Password'}
secureTextEntry = {true}
onChangeText = {(text)=>{
this.setState({
    password:text
})
}}/>

<TextInput 
style = {styles.formBox}
placeholder = {'ConfirmPassword'}
secureTextEntry = {true}
onChangeText = {(text)=>{
this.setState({
    confirmPassword:text
})
}}/>

<View style= {styles.modalBackButton}>
<TouchableOpacity style  = {styles.registerButton} 
onPress = {()=>{
    this.userSignUp(this.state.email,this.state.password,this.state.confirmPassword)
    
}}
>
<Text stylee= {styles.registerButtonText}>Register</Text>
</TouchableOpacity>
</View>
<View style = {styles.modalBackButton}>
<TouchableOpacity style = {styles.cancelButton} 
onPress = {()=>{
    this.setState({isModalVisible:false})
}}
>
<Text style = {{color:'black'}}>CANCEL</Text>
</TouchableOpacity>
</View>
</KeyboardAvoidingView>
</ScrollView>
</View>


        </Modal>
    )
}
  render(){
    return(
      <View style = {styles.container}>
          <View style = {{justifyContent:'center', alignItems:'center'}}>
{this.showModal()}
          </View>
          <View style = {styles.profileContainer}>
              <SantaAnimation/>
          <Text style = {styles.title}>BOOK SANTA</Text>
          </View>
          <View style = {styles.buttonContainer}>
<TextInput style  = {styles.inputBox}
placeholder = {'abc@example.com'}
keyboardType = "email-address"
onChangeText = {(text)=>{
this.setState({
    email:text
})
}}
/>
<TextInput style  = {styles.inputBox}
placeholder = {'password'}
secureTextEntry = {true}
onChangeText = {(text)=>{
this.setState({
    password:text
})
}}
/>
<TouchableOpacity style = {[styles.button,{marginBottom:20,marginTop:20}]} 
onPress ={()=>{
    this.userlogIn(this.state.email,this.state.password)
}}
>
<Text style = {styles.buttonText}>Login</Text>
</TouchableOpacity>
<TouchableOpacity style = {styles.button} 
onPress ={()=>{
   
    this.setState({isModalVisible  : true})
}}
>
<Text style = {styles.buttonText}>SignUp</Text>
</TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f8be85'
  },
  title:{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color:'#ff3d00'
  },
  inputBox:{
      width:300,
      height:40,
      borderBottomWidth:1.5,
      borderColor:'#ff8a65',
      fontSize:20,
      margin:10,
      paddingLeft:10
  },
  button:{
      width:300,
      height:50,
      justifyContent:'center',
      
      borderRadius:25,
      backgroundColor:'#ff9800',
      shadowColor:'#000',
      shadowOffset:{
          width:0,
          height:8
      },
      shadowOpacity: 0.30,
      shadowRadius:10.32,
      elevation:16
  },
  buttonText:{
      color:'#ffff',
      fontWeight:'bold',
      fontSize:20,
      marginLeft:10
  },
  buttonContainer:{
      flex:1,
      alignItems:'center'
  },
  profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
title :{
    fontSize: 65,
    fontWeight:'300',
    paddingBottom:30,
    color:'#ff3d00'
},
inputBox:{
    width:300,
    height:40,
    borderBottomWidth:1.5,
    borderColor: '#ff8a65',
    fontSize:20,
    margin:10,
    paddingLeft : 10
},
keyboardView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
modalTitle:{
    justifyContent:'center',
    alignSelf : 'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
},
modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffffff',
    marginRight:30,
    marginLeft:30,
    marginTop:80,
    marginBottom:80
},
formBox:{
    width:'75%',
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
},
registerButton:{
width:200,
height:40,
alignSelf:'center',
borderColor:'#ffab91',
borderRadius:10,
borderWidth:1,
marginTop:20,
padding:10
},
registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
},
registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
},
cancelButton:{
    width:200,
    height:300,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
    borderColor:'black'
},
button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:'#ff9800',
    shadowColor : '#000',
    shadowOffset:{
        width:0,
        height:8,
    },
    shadowOpacity : 0.30,
    shadowRadius:10.32,
    elevation:16,
    padding:10
},
buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
}

})