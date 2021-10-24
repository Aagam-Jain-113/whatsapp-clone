import React from 'react';
import{ Button } from '@material-ui/core'
import './login.css'
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () =>{
        auth.signInWithPopup(provider).then((result)=>{
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error)=>{
            console.log(error);
        }
        )
    };
    
    return (
        <div className="login">
            <div className="login__container">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAb1BMVEX///8A5nYE5nj4/vv8//0R6H8J53so6ovL+uMk6ole76gX6ILz/vmd9crm/fKZ9cjd/O2++dyL9MFN7p9t8bHt/fXU++hE7Ztm8K2m9s9T7qPF+eCt99M165KU9cbi/O+A87u4+Nlj8Kt48raC87xpas/sAAAEUklEQVRoge1a2aKiMAxV9k3ZRTaX0f//xsHxqjQtaRtw5mE4j9J6aNokJymbzYoVK1asWLEcojQr8j7cPuD4fV7sPPPrpGUduFsehltcv0i+P1WGgPUHTl5/hzttENYn7OKwNKsZiywsQO4tytv5arQPVMtRt7067QPHchHa6KhHOyCsF+BNNaz8QTN30WZBoR3gzzvfZUXkHdx6jrkPJDO/cCPzpvYc3u22IPK2zjzewa+sf8M7MBN4vZl2fuKuzXsOl+DdbjtNXlMzSk7C0Yzc+mFyCr5WDNvxb27btjQfC/FLg3cPD9bt/Pg5yUnMGtsMCPz253fazofKxu7YiXbyfnIlLVnV2BHwpOvnkaUogFgYipnqzk5jIm5MWnKutmD2ZPnR+KFJiyspYcEx+/RCIu71FxwCkV7SUodC/AKxg8upAYlY4WADV73C5x6J2JH68gHMiLgRtPSRyYhv7PiQH3EiEUuPF5B3Lj+ipOWKM86bKLwozdYnnBjaUbBiInGFE8PE5/A68UwztYNX7ZzCS7ghDYlXEkPO3PAdHMKLE0Wgm9xxwxsw4kBWvQFGfOeGg5Czp1dTonP6hiAQM9kpmqF6HYxYUJUynkze4AewcC1SNmOROIsYE0AifeGOXDmaUzBzie4DSxgbxh41Z8lIi8AUTmBUF703gRFb4hljFZLQq1cuFo0wMaUdDam/QjwR/91xgL+Jx8wjnpKQTAPnF5EYK94mvWU8yaIVjcyGQUyeWWfs/SbtaGMBZFo0M4W9SRLXWMhEDk7FKAhBJeO4eJFhI7yor+QM8w46QBFtogwr6VDRBeU8g4bRXylL8kzzZjwdzPEGIxqXAoa5HIuv90ZY9VTKjgV0H+DnlWXepO8s2o/DeSuWg3jBKCl/G1ajWrunZf09+y/JkT9nId5QldWCFVDHVj3YyOY9tOQ6dKjW2yCxS7zmAdeLMDLAibKGvfQOot9L/kFMbMgK5FRGvA2xmPvGHsySNn4suaoy7gqNd1gayPuKmZR4OGJ8RQUBtgz2cARQaus4mWTRFgieKjcyaldcPd4zA0HfkfQD/iBR7GQ1iL1haad2EaR6q2cEU6ndA4Z21FywVFewubA66KDNVG++VA72C+4dbp+VwVSt3Ck39brSfTYyuVnzk9WvN1vd/oofZG2SJF5dCLZJrVv9xKxbVABbxZV+ANtss6Bz1zar/ga4aPASe9JCVFo3uQtdaA5wtS74UJGrBSjGJNAJIEvycp1UMq+GIz1gLXJXrq7O3miX4Q20v+7iG5oEGNLbDx4zOkpv+EpSlEW0xGcY/K2RHFfmL9yiOxw1k5WrdIfJ4dMVCJv46RBnnRjqXIjfDPYv0rGYa1U33rnpOtEL5ZBB8xMv4zz5R4rD65Jph0CdeRMJZZ/hksiovvRh5uOt7v3Euu08XuYTwUlE6aVxGXanDyattDTMc9vt4iyLd523/0ucK1asWLHi/8Fva3k6ADNpY5UAAAAASUVORK5CYII=" 
                alt="Google Logo" />
                <div className="login__text">
                    Sign in to Whatsupchat
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
            
        </div>
    )
}

export default Login
