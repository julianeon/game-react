import React, { useState, useEffect} from 'react';
import { Grid, Image } from 'semantic-ui-react'

const BoxImage = (props) => (
    <Grid.Column>
      <Image src={props.img} />
    </Grid.Column>
)

const Item = () => {
    const top = 7;
    const [place,setPlace]=useState(0);
    const [dead,setDead]=useState(false);    
    
    useEffect(() => {
        const show = setInterval(() => {
            setPlace(placePrev=>placePrev+1);
        }, 1000);
        return () => (clearInterval(show));
    }, []);

    const Box = (props) => {
        const Blank=() => (
            <BoxImage img='white.png' />
        )
        const Mover=() => (
            <Grid.Column>
              <Image src='blade.png' onClick={() => setPlace(0-(Math.ceil(Math.random() * 3)))}/>
            </Grid.Column>
        )
        return (
            <div>
              {(props.order===place) ? (
                  <Mover />
              ) : (
                  <Blank />
              )}
            </div>        
        )
    }

    function checkIfDead(place,top) {
        if (dead) {
            return true;
        }  
        if (place===top) {
            setDead(true);
            setPlace(-10000000);            
        } else {
            return false;
        }
            
    }
    
    return  (
        <Grid>
          {[...Array(top)].map((x, i) =>
                              <Box key={i} order={i} />
                              )}
          <div>
            { checkIfDead(place,top, dead) ? (
                  <BoxImage img='skull.png' />                                                      
              ) : (
                  <BoxImage img='knight.png' />                                    
              )}
            
          </div>
        </Grid>
    )
}
    
function App() {
  return (
      <div style={{marginTop:'20vh',}}>
      <Item/>
    </div>
  );
}

export default App;


