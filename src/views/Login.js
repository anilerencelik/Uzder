import React from 'react'
import './Login.css'

class Login extends React.Component  {

  constructor(){
    super()
    this.state = {
      apiToken: '',
      username: '',
      password: '',
      isLoggedIn: 0,
    }
    localStorage.clear()
  }

  //const [apiToken, stApiToken] = useContext(AuthContext)
  
  

  updateName = e => {
    this.setState({
      username: e.target.value
    })
  }
  updatePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit =  async()  => {

    if(this.state.username == '' || this.state.password == ''){
      return 
    }


    const responseLogin = await fetch(`http://localhost:2000/sessions?username=${this.state.username}&password=${this.state.password}`)
    const tempLogin = await responseLogin.json()
    if(await tempLogin.data[0]) {
      localStorage.setItem('token', tempLogin.data[0].APIKEY)
      this.setState({
        apiToken: tempLogin.data[0],
        isLoggedIn : 1
      })
      //window.location.reload(false);
    }
      
  }

  render(){

    return (
      <div className="containe">{console.log(localStorage.getItem('token'))}
        <div className="auth-wrapper">{console.log(this.state.apiToken)}
          <br/><br/>  
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="auth-inner">
              <label>Kullanıcı adınızı girin.</label><br/>
              <input
                type="text"
                placeholder="Kullanıcı adı"
                value={this.state.username}
                onChange={this.updateName.bind(this)}
                required
              />
              <br/><br/>
              <label>Şifrenizi girin.</label><br/>
              <input
                type="password"
                placeholder="Şifre"
                value={this.state.password}
                onChange={this.updatePassword.bind(this)}
                required
              />
              <br/><br/>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-infow" >Giriş yap</button>
              </div>
            </div>
          </form>
          <br/><br/><br/>
          <p>Hesap oluşturmak için iletişime geçin. anilerencelik@gmail.com</p>
        </div>
      </div>
      )
  }
}

export default Login
