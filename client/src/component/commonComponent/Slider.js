import React ,{ Component } from 'react';
import logo from '../../assets/fb.jpg';
import logo2 from '../../assets/carousel.png';
import logo3 from '../../assets/carousel2.png';
import { Carousel  } from 'react-bootstrap';


class Slider extends Component {
     render(){
          return (
               <Carousel>
               <Carousel.Item>
               <img width={2000} height={500} alt="900x300" src={logo}/>
               <Carousel.Caption>
               <h3>First slide label</h3>
               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
               </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
               <img width={2000} height={500} alt="900x300" src={logo2} />
               <Carousel.Caption>
               <h3>Second slide label</h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
               <img width={2000} height={500} alt="900x300" src={logo3}/>
               <Carousel.Caption>
               <h3>Third slide label</h3>
               <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
               </Carousel.Caption>
               </Carousel.Item>
               </Carousel>
          )
     }
}

export default Slider ;
