import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

//FIREBASE
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function RegistroScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // Limpiar campos
            setCorreo('');
            setContrasenia('');
            // Mostrar mensaje de éxito
            Alert.alert("Registro exitoso", "Usuario registrado exitosamente");
            // Navegar a Login
            navigation.navigate("Login")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
      
            let titulo = ""; 
            let mensaje = "";
      
            // Manejo de errores con switch
            switch (errorCode) {
              case 'auth/email-already-in-use':
                titulo = "Correo en uso";
                mensaje = "El correo electrónico ya está registrado con otra cuenta";
                break;
              case 'auth/invalid-email':
                titulo = "Correo inválido";
                mensaje = "El formato del correo electrónico no es válido";
                break;
              case 'auth/operation-not-allowed':
                titulo = "Operación no permitida";
                mensaje = "El registro de usuarios no está habilitado en este momento";
                break;
              case 'auth/weak-password':
                titulo = "Contraseña débil";
                mensaje = "La contraseña debe tener al menos 6 caracteres";
                break;
              default:
                titulo = "Error de registro";
                mensaje = "Ha ocurrido un error desconocido durante el registro";
            }
      
            Alert.alert(titulo, mensaje);
          });
      }




    return (
        <ImageBackground source={require('../assets/bg2.png')} style={styles.container}>
        <Text style={styles.titulo}>REGISTRO</Text>
        <TextInput
          style={styles.containerimput}
          placeholder='Ingresa tu correo electrónico'
          onChangeText={(texto) => (setCorreo(texto))}
          keyboardType='email-address'
        />
        <TextInput
          style={styles.containerimput}
          placeholder='Ingresa contraseña'
          onChangeText={(texto) => (setContrasenia(texto))}
          secureTextEntry
        />
        <TouchableOpacity style={styles.Botones} onPress={() => registro()}>
          <Text style={styles.Botonestexto}>Registrar</Text>
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