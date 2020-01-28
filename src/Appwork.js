import React, { useState, useEffect} from 'react';
import _ from 'lodash'
import { Grid, Image } from 'semantic-ui-react'

function domath(limit,startpoint) {
    if (startpoint<limit) {
        return startpoint+1;
    } else {
        return 0;
    }
}

function ender(top,place) {
    if (place===5) {
        return true;
    }
    console.log(place);
}

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
            setPlace(placePrev=>domath(top,placePrev));
            setDead(ender(top,place));            
        }, 1000);
        return () => (clearInterval(show));
    }, []);

    const Box = (props) => {
        const Blank=() => (
            <BoxImage img='white.png' />
        )
        const Happy=() => (
            <Grid.Column>
              <Image src='happy.png' onClick={() => setPlace(0)}/>
            </Grid.Column>
        )
        return (
            <div>
              {(props.order==place) ? (
                  <Happy />
              ) : (
                  <Blank />
              )}
            </div>        
        )
    }

    
    return  (
        <Grid>
          {[...Array(top)].map((x, i) =>
                              <Box key={i} order={i} />
                              )}
          <div>
            {((place===top) || dead) ? (
                <Grid.Column>
                <Image src='skull.png' />
                </Grid.Column>
                
              ) : (
                  <BoxImage img='knight.png' />                                    
              )}
            
          </div>
        </Grid>
    )
}
    
function App() {
  return (
    <div>
      <Item/>
    </div>
  );
}

export default App;


