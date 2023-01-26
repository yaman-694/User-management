import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:developer';
// import 'package:cookie/cookie.dart' as cookie;

void main() {
  runApp(
    MaterialApp(
      home: MyForm()
    )
  );
}

class MyForm extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return MyFormState();
  }
}

class MyFormState extends State<MyForm>{
  bool _isLoading = false;
  final _myFormKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _confirmPassword = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Register User"),
      ),
        body: Container(
          padding: const EdgeInsets.symmetric(vertical: 25.0,horizontal: 15.0),
          child: Form(
            key: _myFormKey,
            child: Column(
              children: <Widget>[
                Padding(padding: const EdgeInsets.all(10.0),
                  child: TextFormField(
                    controller: _name,
                    validator: (input){
                      if(input != null){
                        return "Please enter your name";
                      }
                      return null;
                    },
                    decoration: const InputDecoration(
                      labelText: "Name",
                      hintText: "Your Name",
                    ),
                  ),
                ),
                Padding(padding: const EdgeInsets.all(10.0),
                  child: TextFormField(
                    controller: _email,
                    validator: (input){
                      if(input != null){
                        return "Please enter your email";
                      }
                      return null;
                    },
                    decoration: const InputDecoration(
                      labelText: "email",
                      hintText: "email",
                    ),
                  ),
                ),
                Padding(padding: const EdgeInsets.all(10.0),
                  child: TextFormField(
                    controller: _password,
                    validator: (input){
                      if(input != null){
                        return "Please enter your password";
                      }
                      return null;
                    },
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: "Password",
                      hintText: "Password",
                    ),
                  ),
                ),
                Padding(padding: const EdgeInsets.all(10.0),
                  child: TextFormField(
                    controller: _confirmPassword,
                    validator: (input){
                      if(input != _password.value.text){
                        return "confirm password not match";
                      }
                      return null;
                    },
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: "Confirm Password",
                      hintText: "Confirm Password",
                    ),
                  ),
                ),
                Padding(padding: const EdgeInsets.all(10.0),
                child: ElevatedButton(
                  child: const Text('submit'),
                  onPressed: (){
                    postData();
                  },
                ),
                ),
              ],
            ),
          ),
        ),

    );
  }

  postData() async{
    final data = {
      "name": _name.text,
      "email": _email.text,
      "password": _password.text,
      "confirm_password": _confirmPassword.text
    };
    try {
      var response = await http.post(
        Uri.parse("http://192.168.1.3:4545/api/v1/register"),
        body: {
          "name": _name.text,
          "email": _email.text,
          "password": _password.text,
          "confirm_password": _confirmPassword.text
        },
      );
      if (response.statusCode == 300) {
        print(response.body);
      } else {
        print(message);
      }
    }
    catch(e){
      print(e);
    }
  }

}







