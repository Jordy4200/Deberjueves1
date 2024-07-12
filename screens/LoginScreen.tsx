import { Button, StyleSheet, Text, View, TextInput, Alert, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

//FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // Mostrar mensaje de éxito
        Alert.alert("Ingreso exitoso", "Bienvenido al sistema");
        // Navegar al Drawer
        navigation.navigate("Drawer")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        let titulo = ""; 
        let mensaje = "";
  
        switch (errorCode) {
          case 'auth/invalid-email':
            titulo = "Correo inválido";
            mensaje = "Revisar que el email sea correcto";
            break;
          case 'auth/user-not-found':
            titulo = "Error de usuario";
            mensaje = "El usuario no se encuentra registrado";
            break;
          case 'auth/wrong-password':
            titulo = "Error de contraseña";
            mensaje = "Revisar si la contraseña está bien escrita";
            break;
          default:
            titulo = "Error";
            mensaje = "Revisar credenciales";
        }
  
        console.log(errorCode);
        console.log(errorMessage);
        
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <ImageBackground source={require('../assets/bg2.png')} style={styles.container}>
      <Text style={styles.titulo}>INGRESA TUS DATOS</Text>
      <TextInput
        style={styles.containerimput}
        placeholder="Correo electronico"
        autoCorrect={false} 
        onChangeText={(texto) => (setCorreo(texto))}
        
      />
      <TextInput
        style={styles.containerimput}
        placeholder="Contraseña"
        onChangeText={(texto) => (setContrasenia(texto))}
        secureTextEntry
      />
    <TouchableOpacity style={styles.Botones} onPress={() => login()}>
      <Text style={styles.Botonestexto}>Ingresar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.Botones2} onPress={() => navigation.navigate('Registro')}>
      <Text style={styles.Botonestexto2}>Registrarse</Text>
    </TouchableOpacity>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#587e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerB:{
    flexDirection:'row',
    marginTop:20,
    gap:20,
  },
  icon: { marginTop: -100, height: 150 },
  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    marginBottom: 50,
    marginTop: 50
  },
  containerimput: {
    
    height: 50,
    fontSize: 17,
    marginBottom: 15,
    width: 300,
    textAlign: 'center',
    color: '#333',
    fontWeight: '400',
    backgroundColor: 'rgba(255,255,255,.95)',
    borderRadius: 40,
  },
  button:{
    backgroundColor:''
  },
  Botones: {
    backgroundColor: '#DA70D6',
    width: '50%',
    height: 60,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  Botones2: {
    backgroundColor: '#DA70D6',
    width: '50%',
    height: 60,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  Botonestexto: {
    color: 'white',
    fontSize: 20,
  },
  Botonestexto2: {
    color: 'white',
    fontSize: 20,
  }
});