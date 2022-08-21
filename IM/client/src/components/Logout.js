import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();
    useEffect(() => 
    {
        fetch('/dologout',
        {
            method:'GET',
            headers:
            {
                "Content-Type":"application/json"
            }
        }).then((res) => 
        {
            history.push('/signin', {replace:true})
            
        }).catch((err) => 
        {
            console.log(err);
        })
    })

  return (
    <div>
      <h1>LOUGOUT</h1>
    </div>
  )
}

export default Logout
