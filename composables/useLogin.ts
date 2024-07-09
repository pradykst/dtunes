export default function () {
    const login = useCookie('username')
    if(login.value!=undefined && login.value!=null && login.value!=''){
        return true
    }
    else{
        return false

    }


  }
  